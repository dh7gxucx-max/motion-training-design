const express = require('express');
const router = express.Router();
const { query } = require('../db/pool');
const { searchGigs } = require('../services/search');

// ── GET /api/search?q=logo&category=logo-brand&min_price=500 ───────────────
router.get('/', async (req, res) => {
  const { q = '', category, min_price, max_price, rating, sort, order, page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  // Try Meilisearch first
  if (q.trim()) {
    const meiliResult = await searchGigs(q, { category, min_price, max_price, rating, sort, order, limit, offset });
    if (meiliResult) return res.json({ ...meiliResult, query: q });
  }

  // Fallback: PostgreSQL full-text / trigram search
  const params = [];
  const conditions = ["g.status = 'active'"];

  if (q.trim()) {
    params.push(`%${q}%`);
    conditions.push(`(g.title ILIKE $${params.length} OR g.description ILIKE $${params.length})`);
  }
  if (category) { params.push(category); conditions.push(`c.slug = $${params.length}`); }
  if (min_price) { params.push(min_price); conditions.push(`g.basic_price >= $${params.length}`); }
  if (max_price) { params.push(max_price); conditions.push(`g.basic_price <= $${params.length}`); }
  if (rating) { params.push(rating); conditions.push(`g.rating >= $${params.length}`); }

  const validSort = { price: 'g.basic_price', rating: 'g.rating', orders: 'g.orders_count', created_at: 'g.created_at' };
  const sortCol = validSort[sort] || 'g.orders_count';
  const sortDir = order === 'asc' ? 'ASC' : 'DESC';

  params.push(limit, offset);
  const where = conditions.join(' AND ');

  const [data, count] = await Promise.all([
    query(`
      SELECT g.id, g.title, g.slug, g.basic_price, g.images, g.rating, g.total_reviews, g.orders_count, g.tags,
             u.full_name AS seller_name, u.avatar_url AS seller_avatar, u.vip_plan,
             c.name AS category_name, c.slug AS category_slug
      FROM gigs g
      LEFT JOIN users u ON u.id = g.seller_id
      LEFT JOIN categories c ON c.id = g.category_id
      WHERE ${where}
      ORDER BY ${sortCol} ${sortDir}
      LIMIT $${params.length - 1} OFFSET $${params.length}
    `, params),
    query(`SELECT COUNT(*) FROM gigs g LEFT JOIN categories c ON c.id=g.category_id WHERE ${where}`, params.slice(0, -2)),
  ]);

  res.json({ gigs: data.rows, total: parseInt(count.rows[0].count), query: q, source: 'db' });
});

// ── GET /api/search/categories ─────────────────────────────────────────────
router.get('/categories', async (req, res) => {
  const { rows } = await query('SELECT * FROM categories WHERE parent_id IS NULL ORDER BY sort_order');
  res.json(rows);
});

module.exports = router;
