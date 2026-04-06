const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { query, getClient } = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// ── GET /api/wallet/balance ────────────────────────────────────────────────
router.get('/balance', authenticate, async (req, res) => {
  const { rows } = await query(
    'SELECT wallet_balance, pending_balance, total_earned FROM users WHERE id=$1',
    [req.user.id]
  );
  res.json(rows[0]);
});

// ── GET /api/wallet/transactions ───────────────────────────────────────────
router.get('/transactions', authenticate, async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  const { rows } = await query(
    'SELECT * FROM wallet_transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [req.user.id, limit, offset]
  );
  res.json(rows);
});

// ── POST /api/wallet/topup ─────────────────────────────────────────────────
// Called after Razorpay payment captured for wallet top-up
router.post('/topup',
  authenticate, requireRole('client'),
  body('razorpay_payment_id').notEmpty(),
  body('amount').isFloat({ min: 100 }),
  validate,
  async (req, res) => {
    const { amount, razorpay_payment_id } = req.body;
    const client = await getClient();
    try {
      await client.query('BEGIN');
      await client.query(
        'UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2',
        [amount, req.user.id]
      );
      await client.query(`
        INSERT INTO wallet_transactions (user_id, type, amount, balance_after, description)
        SELECT $1, 'topup', $2, wallet_balance, $3 FROM users WHERE id=$1
      `, [req.user.id, amount, `Wallet top-up via Razorpay ${razorpay_payment_id}`]);
      await client.query('COMMIT');
      const { rows } = await client.query('SELECT wallet_balance FROM users WHERE id=$1', [req.user.id]);
      res.json({ wallet_balance: rows[0].wallet_balance });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
);

// ── POST /api/wallet/withdraw ──────────────────────────────────────────────
router.post('/withdraw',
  authenticate, requireRole('freelancer'),
  body('amount').isFloat({ min: 500 }),
  body('bank_name').optional().trim(),
  body('account_number').optional().trim(),
  body('ifsc_code').optional().trim(),
  body('upi_id').optional().trim(),
  validate,
  async (req, res) => {
    const { amount, bank_name, account_number, ifsc_code, upi_id } = req.body;

    const { rows: user } = await query('SELECT wallet_balance, is_kyc_verified FROM users WHERE id=$1', [req.user.id]);
    if (!user[0].is_kyc_verified) return res.status(403).json({ error: 'KYC verification required before withdrawal' });
    if (parseFloat(user[0].wallet_balance) < amount) return res.status(400).json({ error: 'Insufficient balance' });

    const client = await getClient();
    try {
      await client.query('BEGIN');
      await client.query('UPDATE users SET wallet_balance = wallet_balance - $1 WHERE id=$2', [amount, req.user.id]);
      const { rows } = await client.query(
        'INSERT INTO withdrawals (user_id, amount, bank_name, account_number, ifsc_code, upi_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [req.user.id, amount, bank_name, account_number, ifsc_code, upi_id]
      );
      await client.query(`
        INSERT INTO wallet_transactions (user_id, type, amount, balance_after, reference_id, description)
        SELECT $1, 'withdrawal', $2, wallet_balance, $3, 'Withdrawal request' FROM users WHERE id=$1
      `, [req.user.id, amount, rows[0].id]);
      await client.query('COMMIT');
      res.status(201).json(rows[0]);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
);

module.exports = router;
