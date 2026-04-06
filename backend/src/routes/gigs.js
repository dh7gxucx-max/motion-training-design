const express = require('express');
const router = express.Router();
const { body, query: qv } = require('express-validator');
const { query } = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { indexGig, deleteGigIndex } = require('../services/search');

// ── GET /api/gigs  — catalog with filters ─────────────────────────────────
router.get('/', async (req, res) => {
  const {
    category, min_price, max_price, rating,
    sort = 'created_at', order = 'desc',
    page = 1, limit = 20
  } = req.query;

  const offset = (page - 1) * limit;
  const params = [];
  const conditions = ["g.status = 'active'"];

  if (category) { params.push(category); conditions.push(`c.slug = $${params.length}`); }
  if (min_price) { params.push(min_price); conditions.push(`g.basic_price >= $${params.length}`); }
  if (max_price) { params.push(max_price); conditions.push(`g.basic_price <= $${params.length}`); }
  if (rating) { params.push(rating); conditions.push(`g.rating >= $${params.length}`); }

  const where = conditions.join(' AND ');
  const validSort = { created_at: 'g.created_at', rating: 'g.rating', orders: 'g.orders_count', price: 'g.basic_price' };
  const sortCol = validSort[sort] || 'g.created_at';
  const sortDir = order === 'asc' ? 'ASC' : 'DESC';

  params.push(limit, offset);
  const sql = `
    SELECT g.id, g.title, g.slug, g.basic_price, g.standard_price, g.premium_price,
           g.images, g.rating, g.total_reviews, g.orders_count, g.tags,
           u.full_name AS seller_name, u.avatar_url AS seller_avatar, u.vip_plan,
           c.name AS category_name, c.slug AS category_slug
    FROM gigs g
    LEFT JOIN users u ON u.id = g.seller_id
    LEFT JOIN categories c ON c.id = g.category_id
    WHERE ${where}
    ORDER BY ${sortCol} ${sortDir}
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `;

  const countSql = `SELECT COUNT(*) FROM gigs g LEFT JOIN categories c ON c.id=g.category_id WHERE ${where}`;
  const [data, count] = await Promise.all([
    query(sql, params),
    query(countSql, params.slice(0, -2)),
  ]);

  res.json({
    gigs: data.rows,
    total: parseInt(count.rows[0].count),
    page: parseInt(page),
    pages: Math.ceil(count.rows[0].count / limit),
  });
});

// ── GET /api/gigs/:id  — single gig ────────────────────────────────────────
router.get('/:id', async (req, res) => {
  const { rows } = await query(`
    SELECT g.*,
           u.full_name AS seller_name, u.avatar_url AS seller_avatar,
           u.bio AS seller_bio, u.rating AS seller_rating,
           u.total_reviews AS seller_reviews, u.total_orders AS seller_orders,
           u.vip_plan AS seller_vip, u.location AS seller_location,
           c.name AS category_name, c.slug AS category_slug
    FROM gigs g
    LEFT JOIN users u ON u.id = g.seller_id
    LEFT JOIN categories c ON c.id = g.category_id
    WHERE g.id = $1 OR g.slug = $1
  `, [req.params.id]);

  if (!rows.length) return res.status(404).json({ error: 'Gig not found' });

  // Increment view count (fire-and-forget)
  query('UPDATE gigs SET views = views + 1 WHERE id = $1', [rows[0].id]);

  res.json(rows[0]);
});

// ── POST /api/gigs  — create ────────────────────────────────────────────────
router.post('/',
  authenticate, requireRole('freelancer'),
  [
    body('title').trim().isLength({ min: 15, max: 255 }),
    body('description').trim().isLength({ min: 50 }),
    body('category_id').isInt(),
    body('basic_price').isFloat({ min: 100 }),
    body('basic_delivery').isInt({ min: 1 }),
    body('tags').optional().isArray({ max: 5 }),
  ],
  validate,
  async (req, res) => {
    const {
      title, description, category_id, tags,
      basic_title, basic_desc, basic_price, basic_delivery, basic_revisions,
      standard_title, standard_desc, standard_price, standard_delivery, standard_revisions,
      premium_title, premium_desc, premium_price, premium_delivery, premium_revisions,
      images,
    } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 250) + '-' + Date.now();

    const { rows } = await query(`
      INSERT INTO gigs (
        seller_id, category_id, title, slug, description, tags,
        basic_title, basic_desc, basic_price, basic_delivery, basic_revisions,
        standard_title, standard_desc, standard_price, standard_delivery, standard_revisions,
        premium_title, premium_desc, premium_price, premium_delivery, premium_revisions,
        images, status
      ) VALUES (
        $1,$2,$3,$4,$5,$6,
        $7,$8,$9,$10,$11,
        $12,$13,$14,$15,$16,
        $17,$18,$19,$20,$21,
        $22,
        CASE WHEN $23 THEN 'active' ELSE 'pending' END
      ) RETURNING *
    `, [
      req.user.id, category_id, title, slug, description, tags || [],
      basic_title, basic_desc, basic_price, basic_delivery, basic_revisions || 1,
      standard_title, standard_desc, standard_price, standard_delivery, standard_revisions,
      premium_title, premium_desc, premium_price, premium_delivery, premium_revisions,
      images || [],
      req.user.vip_plan !== 'free', // VIP sellers auto-approved
    ]);

    await indexGig(rows[0]);
    res.status(201).json(rows[0]);
  }
);

// ── PATCH /api/gigs/:id ─────────────────────────────────────────────────────
router.patch('/:id',
  authenticate, requireRole('freelancer'),
  async (req, res) => {
    const { rows: existing } = await query('SELECT * FROM gigs WHERE id=$1 AND seller_id=$2', [req.params.id, req.user.id]);
    if (!existing.length) return res.status(404).json({ error: 'Gig not found' });

    const allowed = ['title','description','tags','basic_price','basic_delivery','basic_revisions',
      'standard_price','standard_delivery','standard_revisions','premium_price','premium_delivery',
      'premium_revisions','images','status'];

    const updates = [];
    const vals = [];
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        vals.push(req.body[key]);
        updates.push(`${key} = $${vals.length}`);
      }
    }
    if (!updates.length) return res.status(400).json({ error: 'Nothing to update' });

    vals.push(req.params.id);
    const { rows } = await query(
      `UPDATE gigs SET ${updates.join(', ')} WHERE id = $${vals.length} RETURNING *`,
      vals
    );
    await indexGig(rows[0]);
    res.json(rows[0]);
  }
);

// ── DELETE /api/gigs/:id ────────────────────────────────────────────────────
router.delete('/:id', authenticate, requireRole('freelancer'), async (req, res) => {
  const { rowCount } = await query('DELETE FROM gigs WHERE id=$1 AND seller_id=$2', [req.params.id, req.user.id]);
  if (!rowCount) return res.status(404).json({ error: 'Gig not found' });
  await deleteGigIndex(req.params.id);
  res.json({ message: 'Gig deleted' });
});

// ── GET /api/gigs/:id/reviews ───────────────────────────────────────────────
router.get('/:id/reviews', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const { rows } = await query(`
    SELECT r.*, u.full_name AS reviewer_name, u.avatar_url AS reviewer_avatar
    FROM reviews r
    LEFT JOIN users u ON u.id = r.reviewer_id
    WHERE r.gig_id = $1
    ORDER BY r.created_at DESC
    LIMIT $2 OFFSET $3
  `, [req.params.id, limit, offset]);
  res.json(rows);
});

module.exports = router;
