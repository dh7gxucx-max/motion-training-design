const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');

const { query } = require('../db/pool');
const { sendOTP, verifyOTP } = require('../services/otp');
const { signAccessToken, signRefreshToken, revokeToken } = require('../services/token');
const { validate } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

const otpLimiter = rateLimit({ windowMs: 60 * 1000, max: 3, message: { error: 'Too many OTP requests' } });

// ── POST /api/auth/otp/send ─────────────────────────────────────────────────
router.post('/otp/send',
  otpLimiter,
  body('phone').matches(/^\+91[6-9]\d{9}$/),
  validate,
  async (req, res) => {
    const { phone } = req.body;
    await sendOTP(phone);
    res.json({ message: 'OTP sent' });
  }
);

// ── POST /api/auth/otp/verify ───────────────────────────────────────────────
router.post('/otp/verify',
  body('phone').matches(/^\+91[6-9]\d{9}$/),
  body('otp').isLength({ min: 6, max: 6 }),
  body('full_name').optional().trim().isLength({ min: 2 }),
  validate,
  async (req, res) => {
    const { phone, otp, full_name } = req.body;

    const result = await verifyOTP(phone, otp);
    if (!result.valid) return res.status(400).json({ error: result.reason });

    // Find or create user
    let { rows } = await query('SELECT * FROM users WHERE phone = $1', [phone]);
    let user = rows[0];
    let isNew = false;

    if (!user) {
      if (!full_name) return res.status(400).json({ error: 'full_name required for new users' });
      const ins = await query(
        'INSERT INTO users (phone, full_name, role) VALUES ($1, $2, $3) RETURNING *',
        [phone, full_name, 'client']
      );
      user = ins.rows[0];
      isNew = true;
    }

    if (!user.is_active) return res.status(403).json({ error: 'Account suspended' });

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);

    res.json({ accessToken, refreshToken, user: publicUser(user), isNew });
  }
);

// ── POST /api/auth/login (email+password) ──────────────────────────────────
router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];

    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    if (!user.is_active) return res.status(403).json({ error: 'Account suspended' });

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);
    res.json({ accessToken, refreshToken, user: publicUser(user) });
  }
);

// ── POST /api/auth/register ─────────────────────────────────────────────────
router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Z])(?=.*\d)/),
  body('full_name').trim().isLength({ min: 2 }),
  body('role').optional().isIn(['client', 'freelancer']),
  validate,
  async (req, res) => {
    const { email, password, full_name, role = 'client', referral_code } = req.body;

    const exists = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);

    let referrerId = null;
    if (referral_code) {
      const ref = await query('SELECT id FROM users WHERE referral_code = $1', [referral_code]);
      referrerId = ref.rows[0]?.id || null;
    }

    const { rows } = await query(
      `INSERT INTO users (email, password_hash, full_name, role, referred_by)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [email, hash, full_name, role, referrerId]
    );
    const user = rows[0];

    // Record referral
    if (referrerId) {
      await query(
        'INSERT INTO referrals (referrer_id, referee_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [referrerId, user.id]
      );
    }

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);
    res.status(201).json({ accessToken, refreshToken, user: publicUser(user) });
  }
);

// ── POST /api/auth/refresh ──────────────────────────────────────────────────
router.post('/refresh',
  body('refreshToken').notEmpty(),
  validate,
  async (req, res) => {
    const jwt = require('jsonwebtoken');
    try {
      const payload = jwt.verify(req.body.refreshToken, process.env.JWT_SECRET);
      if (payload.type !== 'refresh') throw new Error();

      const { rows } = await query('SELECT id, role FROM users WHERE id = $1 AND is_active = TRUE', [payload.sub]);
      if (!rows.length) return res.status(401).json({ error: 'User not found' });

      const accessToken = signAccessToken(rows[0].id, rows[0].role);
      res.json({ accessToken });
    } catch {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
);

// ── POST /api/auth/logout ───────────────────────────────────────────────────
router.post('/logout', authenticate, async (req, res) => {
  const header = req.headers.authorization;
  if (header) await revokeToken(header.slice(7));
  res.json({ message: 'Logged out' });
});

// ── GET /api/auth/me ────────────────────────────────────────────────────────
router.get('/me', authenticate, async (req, res) => {
  const { rows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  res.json(publicUser(rows[0]));
});

function publicUser(u) {
  const { password_hash, ...rest } = u;
  return rest;
}

module.exports = router;
