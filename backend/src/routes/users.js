const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { query } = require('../db/pool');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// ── GET /api/users/:slug  — public profile ─────────────────────────────────
router.get('/:id', async (req, res) => {
  const { rows } = await query(`
    SELECT u.id, u.full_name, u.avatar_url, u.bio, u.location,
           u.rating, u.total_reviews, u.total_orders, u.vip_plan,
           u.role, u.created_at
    FROM users u WHERE u.id = $1 AND u.is_active = TRUE
  `, [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: 'User not found' });
  res.json(rows[0]);
});

// ── PATCH /api/users/me  — update own profile ──────────────────────────────
router.patch('/me',
  authenticate,
  body('full_name').optional().trim().isLength({ min: 2 }),
  body('bio').optional().trim(),
  body('location').optional().trim(),
  validate,
  async (req, res) => {
    const { full_name, bio, location, avatar_url } = req.body;
    const { rows } = await query(`
      UPDATE users SET
        full_name  = COALESCE($1, full_name),
        bio        = COALESCE($2, bio),
        location   = COALESCE($3, location),
        avatar_url = COALESCE($4, avatar_url)
      WHERE id = $5 RETURNING *
    `, [full_name, bio, location, avatar_url, req.user.id]);
    const { password_hash, ...rest } = rows[0];
    res.json(rest);
  }
);

// ── GET /api/users/me/stats ────────────────────────────────────────────────
router.get('/me/stats', authenticate, async (req, res) => {
  const uid = req.user.id;
  const [wallet, orders, reviews] = await Promise.all([
    query('SELECT wallet_balance, pending_balance, total_earned FROM users WHERE id=$1', [uid]),
    query("SELECT COUNT(*) FILTER (WHERE status='active') AS active, COUNT(*) AS total FROM orders WHERE seller_id=$1 OR buyer_id=$1", [uid]),
    query('SELECT AVG(rating)::NUMERIC(3,2) AS avg_rating, COUNT(*) AS count FROM reviews WHERE reviewee_id=$1', [uid]),
  ]);
  res.json({
    wallet: wallet.rows[0],
    orders: orders.rows[0],
    reviews: reviews.rows[0],
  });
});

// ── GET /api/users/:id/gigs  — public gig list ────────────────────────────
router.get('/:id/gigs', async (req, res) => {
  const { rows } = await query(`
    SELECT g.*, c.name AS category_name
    FROM gigs g
    LEFT JOIN categories c ON c.id = g.category_id
    WHERE g.seller_id = $1 AND g.status = 'active'
    ORDER BY g.created_at DESC
  `, [req.params.id]);
  res.json(rows);
});

module.exports = router;
