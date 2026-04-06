const express = require('express');
const router = express.Router();
const { query } = require('../db/pool');
const { authenticate } = require('../middleware/auth');

// ── GET /api/messages/conversations ────────────────────────────────────────
router.get('/conversations', authenticate, async (req, res) => {
  const uid = req.user.id;
  const { rows } = await query(`
    SELECT DISTINCT ON (other_user)
      CASE WHEN m.sender_id = $1 THEN m.receiver_id ELSE m.sender_id END AS other_user,
      u.full_name, u.avatar_url,
      m.content AS last_message, m.created_at AS last_at,
      m.order_id,
      COUNT(*) FILTER (WHERE m.receiver_id = $1 AND m.is_read = FALSE) OVER (
        PARTITION BY CASE WHEN m.sender_id=$1 THEN m.receiver_id ELSE m.sender_id END
      ) AS unread_count
    FROM messages m
    JOIN users u ON u.id = CASE WHEN m.sender_id=$1 THEN m.receiver_id ELSE m.sender_id END
    WHERE m.sender_id=$1 OR m.receiver_id=$1
    ORDER BY other_user, m.created_at DESC
  `, [uid]);
  res.json(rows);
});

// ── GET /api/messages/:userId  — history with one user ─────────────────────
router.get('/:userId', authenticate, async (req, res) => {
  const { page = 1, limit = 40 } = req.query;
  const offset = (page - 1) * limit;
  const uid = req.user.id;

  const { rows } = await query(`
    SELECT m.*, u.full_name AS sender_name, u.avatar_url AS sender_avatar
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE (m.sender_id=$1 AND m.receiver_id=$2)
       OR (m.sender_id=$2 AND m.receiver_id=$1)
    ORDER BY m.created_at DESC
    LIMIT $3 OFFSET $4
  `, [uid, req.params.userId, limit, offset]);

  // Mark as read
  await query(
    'UPDATE messages SET is_read=TRUE WHERE sender_id=$1 AND receiver_id=$2 AND is_read=FALSE',
    [req.params.userId, uid]
  );

  res.json(rows.reverse());
});

// ── GET /api/messages/order/:orderId ───────────────────────────────────────
router.get('/order/:orderId', authenticate, async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const offset = (page - 1) * limit;

  // Verify user is part of this order
  const { rows: order } = await query(
    'SELECT id FROM orders WHERE id=$1 AND (buyer_id=$2 OR seller_id=$2)',
    [req.params.orderId, req.user.id]
  );
  if (!order.length) return res.status(403).json({ error: 'Access denied' });

  const { rows } = await query(`
    SELECT m.*, u.full_name AS sender_name, u.avatar_url AS sender_avatar
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.order_id = $1
    ORDER BY m.created_at ASC
    LIMIT $2 OFFSET $3
  `, [req.params.orderId, limit, offset]);

  res.json(rows);
});

module.exports = router;
