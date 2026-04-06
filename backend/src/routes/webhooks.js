const express = require('express');
const router = express.Router();
const { verifyWebhookSignature, verifyPaymentSignature } = require('../services/razorpay');
const { query, getClient } = require('../db/pool');
const { getIO } = require('../socket');

// ── POST /api/webhooks/razorpay ─────────────────────────────────────────────
router.post('/razorpay', async (req, res) => {
  const sig = req.headers['x-razorpay-signature'];
  const rawBody = req.body; // raw buffer

  if (!verifyWebhookSignature(rawBody, sig)) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(rawBody.toString());
  const entity = event.payload?.payment?.entity;

  if (event.event === 'payment.captured' && entity) {
    const razorpay_order_id = entity.order_id;
    const razorpay_payment_id = entity.id;

    const client = await getClient();
    try {
      await client.query('BEGIN');

      // Find the order
      const { rows } = await client.query(
        "SELECT * FROM orders WHERE razorpay_order_id=$1 AND payment_status='pending'",
        [razorpay_order_id]
      );
      if (!rows.length) { await client.query('COMMIT'); return res.json({ ok: true }); }

      const order = rows[0];

      // Mark payment captured, activate order
      await client.query(`
        UPDATE orders SET
          payment_status='paid',
          razorpay_payment_id=$1,
          status='active',
          due_at = NOW() + (delivery_days * INTERVAL '1 day')
        WHERE id=$2
      `, [razorpay_payment_id, order.id]);

      // Deduct from buyer wallet (already paid via Razorpay — track escrow hold)
      await client.query(`
        UPDATE users SET pending_balance = pending_balance + $1 WHERE id = $2
      `, [order.seller_earnings, order.seller_id]);

      await client.query(`
        INSERT INTO wallet_transactions (user_id, type, amount, balance_after, reference_id, description)
        SELECT $1, 'escrow_hold', $2, pending_balance, $3, 'Escrow held for order'
        FROM users WHERE id=$1
      `, [order.seller_id, order.seller_earnings, order.id]);

      await client.query('COMMIT');

      // Notify seller via socket
      try {
        getIO().to(`user:${order.seller_id}`).emit('order:new', { orderId: order.id });
      } catch {}
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Webhook error:', err);
    } finally {
      client.release();
    }
  }

  if (event.event === 'payment.failed' && entity) {
    await query(
      "UPDATE orders SET payment_status='failed', status='cancelled' WHERE razorpay_order_id=$1",
      [entity.order_id]
    );
  }

  res.json({ ok: true });
});

// ── POST /api/webhooks/payment/verify  — client-side verify ────────────────
router.post('/payment/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return res.status(400).json({ error: 'Payment verification failed' });
  }

  const { rows } = await query(
    "UPDATE orders SET payment_status='paid', razorpay_payment_id=$1, status='active' WHERE razorpay_order_id=$2 AND payment_status='pending' RETURNING id",
    [razorpay_payment_id, razorpay_order_id]
  );

  res.json({ verified: true, orderId: rows[0]?.id });
});

module.exports = router;
