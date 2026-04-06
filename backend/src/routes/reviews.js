const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { query } = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// ── POST /api/reviews ─────────────────────────────────────────────────────
router.post('/',
  authenticate, requireRole('client'),
  body('order_id').isUUID(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().trim().isLength({ max: 1000 }),
  validate,
  async (req, res) => {
    const { order_id, rating, comment } = req.body;

    // Verify order is completed and belongs to this buyer
    const { rows: orders } = await query(
      "SELECT * FROM orders WHERE id=$1 AND buyer_id=$2 AND status='completed'",
      [order_id, req.user.id]
    );
    if (!orders.length) return res.status(400).json({ error: 'Order not completed or not yours' });

    const order = orders[0];
    const { rows } = await query(`
      INSERT INTO reviews (order_id, gig_id, reviewer_id, reviewee_id, rating, comment)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (order_id) DO NOTHING
      RETURNING *
    `, [order_id, order.gig_id, req.user.id, order.seller_id, rating, comment]);

    if (!rows.length) return res.status(409).json({ error: 'Review already submitted for this order' });

    // Update gig and seller rating
    await query(`
      UPDATE gigs SET
        rating = (SELECT AVG(rating) FROM reviews WHERE gig_id=$1),
        total_reviews = total_reviews + 1
      WHERE id=$1
    `, [order.gig_id]);

    await query(`
      UPDATE users SET
        rating = (SELECT AVG(rating) FROM reviews WHERE reviewee_id=$1),
        total_reviews = total_reviews + 1
      WHERE id=$1
    `, [order.seller_id]);

    res.status(201).json(rows[0]);
  }
);

// ── GET /api/reviews/user/:id ──────────────────────────────────────────────
router.get('/user/:id', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const { rows } = await query(`
    SELECT r.*, u.full_name AS reviewer_name, u.avatar_url AS reviewer_avatar,
           g.title AS gig_title
    FROM reviews r
    JOIN users u ON u.id = r.reviewer_id
    JOIN gigs g ON g.id = r.gig_id
    WHERE r.reviewee_id=$1
    ORDER BY r.created_at DESC
    LIMIT $2 OFFSET $3
  `, [req.params.id, limit, offset]);
  res.json(rows);
});

module.exports = router;
