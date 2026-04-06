const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { query, getClient } = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { createRazorpayOrder } = require('../services/razorpay');
const { getIO } = require('../socket');

// Commission by VIP plan
function getCommission(vipPlan) {
  const rates = { free: 0.10, silver: 0.08, gold: 0.06, platinum: 0.04 };
  return rates[vipPlan] || 0.10;
}

// ── POST /api/orders  — initiate order ─────────────────────────────────────
router.post('/',
  authenticate, requireRole('client'),
  body('gig_id').isUUID(),
  body('package').isIn(['basic', 'standard', 'premium']),
  body('requirements').optional().trim(),
  validate,
  async (req, res) => {
    const { gig_id, package: pkg, requirements } = req.body;

    const { rows: gigs } = await query(`
      SELECT g.*, u.vip_plan AS seller_vip FROM gigs g
      JOIN users u ON u.id = g.seller_id
      WHERE g.id = $1 AND g.status = 'active'
    `, [gig_id]);
    if (!gigs.length) return res.status(404).json({ error: 'Gig not found or unavailable' });

    const gig = gigs[0];
    const priceMap = { basic: gig.basic_price, standard: gig.standard_price, premium: gig.premium_price };
    const deliveryMap = { basic: gig.basic_delivery, standard: gig.standard_delivery, premium: gig.premium_delivery };
    const revMap = { basic: gig.basic_revisions, standard: gig.standard_revisions, premium: gig.premium_revisions };

    const amount = parseFloat(priceMap[pkg]);
    if (!amount) return res.status(400).json({ error: `Package ${pkg} not available` });

    const commission = getCommission(gig.seller_vip);
    const platform_fee = +(amount * commission).toFixed(2);
    const seller_earnings = +(amount - platform_fee).toFixed(2);
    const due_at = new Date(Date.now() + deliveryMap[pkg] * 86400000);

    // Create Razorpay order
    const rzOrder = await createRazorpayOrder(amount, `Order for: ${gig.title}`);

    const { rows } = await query(`
      INSERT INTO orders (
        gig_id, buyer_id, seller_id, package,
        amount, platform_fee, seller_earnings,
        delivery_days, revisions, requirements, due_at,
        razorpay_order_id, status, payment_status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'pending_payment','pending')
      RETURNING *
    `, [
      gig_id, req.user.id, gig.seller_id, pkg,
      amount, platform_fee, seller_earnings,
      deliveryMap[pkg], revMap[pkg] || 1, requirements, due_at,
      rzOrder.id,
    ]);

    res.status(201).json({ order: rows[0], razorpay: { id: rzOrder.id, amount: rzOrder.amount, currency: rzOrder.currency } });
  }
);

// ── GET /api/orders  — list (buyer or seller) ──────────────────────────────
router.get('/', authenticate, async (req, res) => {
  const { status, role = 'buyer', page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  const conditions = [role === 'seller' ? 'o.seller_id = $1' : 'o.buyer_id = $1'];
  const params = [req.user.id];

  if (status) { params.push(status); conditions.push(`o.status = $${params.length}`); }

  params.push(limit, offset);
  const { rows } = await query(`
    SELECT o.*,
      g.title AS gig_title, g.images[1] AS gig_image,
      buyer.full_name AS buyer_name, buyer.avatar_url AS buyer_avatar,
      seller.full_name AS seller_name, seller.avatar_url AS seller_avatar
    FROM orders o
    JOIN gigs g ON g.id = o.gig_id
    JOIN users buyer ON buyer.id = o.buyer_id
    JOIN users seller ON seller.id = o.seller_id
    WHERE ${conditions.join(' AND ')}
    ORDER BY o.created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `, params);
  res.json(rows);
});

// ── GET /api/orders/:id ─────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  const { rows } = await query(`
    SELECT o.*,
      g.title AS gig_title, g.images AS gig_images,
      buyer.full_name AS buyer_name, buyer.avatar_url AS buyer_avatar,
      seller.full_name AS seller_name, seller.avatar_url AS seller_avatar
    FROM orders o
    JOIN gigs g ON g.id = o.gig_id
    JOIN users buyer ON buyer.id = o.buyer_id
    JOIN users seller ON seller.id = o.seller_id
    WHERE o.id = $1 AND (o.buyer_id = $2 OR o.seller_id = $2)
  `, [req.params.id, req.user.id]);
  if (!rows.length) return res.status(404).json({ error: 'Order not found' });
  res.json(rows[0]);
});

// ── POST /api/orders/:id/deliver ────────────────────────────────────────────
router.post('/:id/deliver',
  authenticate, requireRole('freelancer'),
  body('delivery_note').trim().notEmpty(),
  validate,
  async (req, res) => {
    const { rows } = await query(
      "UPDATE orders SET status='in_review', delivery_note=$1, delivered_at=NOW() WHERE id=$2 AND seller_id=$3 AND status='active' RETURNING *",
      [req.body.delivery_note, req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Order not found or not active' });
    getIO().to(`order:${req.params.id}`).emit('order:delivered', rows[0]);
    res.json(rows[0]);
  }
);

// ── POST /api/orders/:id/accept ─────────────────────────────────────────────
router.post('/:id/accept', authenticate, requireRole('client'), async (req, res) => {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      "UPDATE orders SET status='completed', completed_at=NOW() WHERE id=$1 AND buyer_id=$2 AND status='in_review' RETURNING *",
      [req.params.id, req.user.id]
    );
    if (!rows.length) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'Order not found' }); }

    const order = rows[0];

    // Release escrow to seller
    await client.query(
      'UPDATE users SET wallet_balance = wallet_balance + $1, pending_balance = pending_balance - $1, total_earned = total_earned + $1, total_orders = total_orders + 1 WHERE id = $2',
      [order.seller_earnings, order.seller_id]
    );
    await client.query(
      "INSERT INTO wallet_transactions (user_id, type, amount, balance_after, reference_id, description) SELECT $1,'escrow_release',$2, wallet_balance,$3,'Escrow released for order' FROM users WHERE id=$1",
      [order.seller_id, order.seller_earnings, order.id]
    );
    // Increment gig order count
    await client.query('UPDATE gigs SET orders_count = orders_count + 1 WHERE id = $1', [order.gig_id]);

    await client.query('COMMIT');
    getIO().to(`order:${req.params.id}`).emit('order:completed', order);
    res.json(order);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

// ── POST /api/orders/:id/revision ───────────────────────────────────────────
router.post('/:id/revision',
  authenticate, requireRole('client'),
  body('revision_note').trim().notEmpty(),
  validate,
  async (req, res) => {
    const { rows } = await query(
      "UPDATE orders SET status='revision_requested', revision_note=$1 WHERE id=$2 AND buyer_id=$3 AND status='in_review' RETURNING *",
      [req.body.revision_note, req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Order not found' });
    getIO().to(`order:${req.params.id}`).emit('order:revision', rows[0]);
    res.json(rows[0]);
  }
);

// ── POST /api/orders/:id/dispute ─────────────────────────────────────────────
router.post('/:id/dispute',
  authenticate,
  body('reason').trim().isLength({ min: 20 }),
  validate,
  async (req, res) => {
    const { rows } = await query(
      "UPDATE orders SET status='dispute_open' WHERE id=$1 AND (buyer_id=$2 OR seller_id=$2) AND status NOT IN ('completed','cancelled','dispute_open','dispute_resolved') RETURNING *",
      [req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Order not found or cannot open dispute' });
    res.json(rows[0]);
  }
);

module.exports = router;
