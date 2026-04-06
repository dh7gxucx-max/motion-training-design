const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { query } = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { indexGig } = require('../services/search');

const isAdmin = [authenticate, requireRole('admin')];

// ── GET /api/admin/stats ────────────────────────────────────────────────────
router.get('/stats', ...isAdmin, async (req, res) => {
  const [users, gigs, orders, revenue] = await Promise.all([
    query("SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE role='freelancer') AS freelancers, COUNT(*) FILTER (WHERE role='client') AS clients, COUNT(*) FILTER (WHERE kyc_status='pending') AS kyc_pending FROM users"),
    query("SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status='pending') AS pending_moderation, COUNT(*) FILTER (WHERE status='active') AS active FROM gigs"),
    query("SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status='active') AS active, COUNT(*) FILTER (WHERE status='dispute_open') AS disputes FROM orders"),
    query("SELECT COALESCE(SUM(platform_fee),0) AS total_revenue, COALESCE(SUM(platform_fee) FILTER (WHERE DATE_TRUNC('month',created_at)=DATE_TRUNC('month',NOW())),0) AS month_revenue FROM orders WHERE payment_status='paid'"),
  ]);
  res.json({ users: users.rows[0], gigs: gigs.rows[0], orders: orders.rows[0], revenue: revenue.rows[0] });
});

// ── GET /api/admin/users ────────────────────────────────────────────────────
router.get('/users', ...isAdmin, async (req, res) => {
  const { page = 1, limit = 50, search, role, kyc_status } = req.query;
  const params = [];
  const conditions = ["u.role != 'admin'"];
  if (search) { params.push(`%${search}%`); conditions.push(`(u.full_name ILIKE $${params.length} OR u.email ILIKE $${params.length} OR u.phone ILIKE $${params.length})`); }
  if (role) { params.push(role); conditions.push(`u.role=$${params.length}`); }
  if (kyc_status) { params.push(kyc_status); conditions.push(`u.kyc_status=$${params.length}`); }
  params.push(limit, (page - 1) * limit);
  const { rows } = await query(`
    SELECT u.id, u.full_name, u.email, u.phone, u.role, u.vip_plan,
           u.kyc_status, u.is_active, u.rating, u.total_orders, u.created_at
    FROM users u WHERE ${conditions.join(' AND ')}
    ORDER BY u.created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `, params);
  res.json(rows);
});

// ── PATCH /api/admin/users/:id ─────────────────────────────────────────────
router.patch('/users/:id', ...isAdmin,
  body('is_active').optional().isBoolean(),
  body('kyc_status').optional().isIn(['none','pending','verified','rejected']),
  validate,
  async (req, res) => {
    const { is_active, kyc_status, admin_note } = req.body;
    const updates = []; const vals = [];
    if (is_active !== undefined) { vals.push(is_active); updates.push(`is_active=$${vals.length}`); }
    if (kyc_status) {
      vals.push(kyc_status); updates.push(`kyc_status=$${vals.length}`);
      if (kyc_status === 'verified') updates.push('is_kyc_verified=TRUE');
    }
    if (!updates.length) return res.status(400).json({ error: 'Nothing to update' });
    vals.push(req.params.id);
    const { rows } = await query(`UPDATE users SET ${updates.join(',')} WHERE id=$${vals.length} RETURNING id,full_name,kyc_status,is_active`, vals);
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  }
);

// ── GET /api/admin/gigs/pending ────────────────────────────────────────────
router.get('/gigs/pending', ...isAdmin, async (req, res) => {
  const { rows } = await query(`
    SELECT g.*, u.full_name AS seller_name, u.email AS seller_email, c.name AS category_name
    FROM gigs g
    JOIN users u ON u.id=g.seller_id
    LEFT JOIN categories c ON c.id=g.category_id
    WHERE g.status='pending'
    ORDER BY g.created_at ASC
  `);
  res.json(rows);
});

// ── PATCH /api/admin/gigs/:id ─────────────────────────────────────────────
router.patch('/gigs/:id', ...isAdmin,
  body('status').isIn(['active','rejected']),
  validate,
  async (req, res) => {
    const { rows } = await query(
      "UPDATE gigs SET status=$1 WHERE id=$2 RETURNING *",
      [req.body.status, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Gig not found' });
    if (req.body.status === 'active') await indexGig(rows[0]);
    res.json(rows[0]);
  }
);

// ── GET /api/admin/disputes ────────────────────────────────────────────────
router.get('/disputes', ...isAdmin, async (req, res) => {
  const { rows } = await query(`
    SELECT o.*, g.title AS gig_title,
           buyer.full_name AS buyer_name, seller.full_name AS seller_name
    FROM orders o
    JOIN gigs g ON g.id=o.gig_id
    JOIN users buyer ON buyer.id=o.buyer_id
    JOIN users seller ON seller.id=o.seller_id
    WHERE o.status='dispute_open'
    ORDER BY o.updated_at DESC
  `);
  res.json(rows);
});

// ── PATCH /api/admin/disputes/:id ─────────────────────────────────────────
router.patch('/disputes/:id', ...isAdmin,
  body('resolution').isIn(['refund_buyer','release_seller']),
  validate,
  async (req, res) => {
    const { resolution } = req.body;
    const { rows } = await query("SELECT * FROM orders WHERE id=$1 AND status='dispute_open'", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Dispute not found' });
    const order = rows[0];

    if (resolution === 'refund_buyer') {
      await query("UPDATE orders SET status='refunded' WHERE id=$1", [order.id]);
      await query('UPDATE users SET wallet_balance=wallet_balance+$1 WHERE id=$2', [order.amount, order.buyer_id]);
    } else {
      await query("UPDATE orders SET status='dispute_resolved', completed_at=NOW() WHERE id=$1", [order.id]);
      await query('UPDATE users SET wallet_balance=wallet_balance+$1,pending_balance=pending_balance-$1 WHERE id=$2', [order.seller_earnings, order.seller_id]);
    }
    res.json({ resolved: true, resolution });
  }
);

// ── GET /api/admin/withdrawals/pending ────────────────────────────────────
router.get('/withdrawals/pending', ...isAdmin, async (req, res) => {
  const { rows } = await query(`
    SELECT w.*, u.full_name, u.email FROM withdrawals w
    JOIN users u ON u.id=w.user_id
    WHERE w.status IN ('pending','processing')
    ORDER BY w.created_at ASC
  `);
  res.json(rows);
});

// ── PATCH /api/admin/withdrawals/:id ──────────────────────────────────────
router.patch('/withdrawals/:id', ...isAdmin,
  body('status').isIn(['processing','completed','failed']),
  validate,
  async (req, res) => {
    const { rows } = await query(
      "UPDATE withdrawals SET status=$1, admin_note=$2, processed_at=CASE WHEN $1='completed' THEN NOW() ELSE NULL END WHERE id=$3 RETURNING *",
      [req.body.status, req.body.admin_note || null, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Withdrawal not found' });
    // If failed, refund balance
    if (req.body.status === 'failed') {
      await query('UPDATE users SET wallet_balance=wallet_balance+$1 WHERE id=$2', [rows[0].amount, rows[0].user_id]);
    }
    res.json(rows[0]);
  }
);

module.exports = router;
