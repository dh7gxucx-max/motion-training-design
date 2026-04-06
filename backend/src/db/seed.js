require('dotenv').config();
const { pool } = require('./pool');
const bcrypt = require('bcryptjs');

async function seed() {
  console.log('Seeding database…');

  // Categories
  await pool.query(`
    INSERT INTO categories (name, slug, icon, sort_order) VALUES
      ('Logo & Brand Identity', 'logo-brand', 'Palette', 1),
      ('Web Development', 'web-development', 'Code', 2),
      ('UI/UX Design', 'ui-ux-design', 'Layout', 3),
      ('Video & Animation', 'video-animation', 'Film', 4),
      ('Content Writing', 'content-writing', 'PenTool', 5),
      ('Digital Marketing', 'digital-marketing', 'TrendingUp', 6),
      ('Mobile App Development', 'mobile-app', 'Smartphone', 7),
      ('Data & Analytics', 'data-analytics', 'BarChart', 8),
      ('Photography', 'photography', 'Camera', 9),
      ('Music & Audio', 'music-audio', 'Music', 10)
    ON CONFLICT (slug) DO NOTHING
  `);

  // Admin user
  const adminHash = await bcrypt.hash('Admin@123', 12);
  await pool.query(`
    INSERT INTO users (email, password_hash, full_name, role, is_kyc_verified, kyc_status)
    VALUES ('admin@valor.in', $1, 'VALOR Admin', 'admin', TRUE, 'verified')
    ON CONFLICT (email) DO NOTHING
  `, [adminHash]);

  // Demo freelancer
  const hash = await bcrypt.hash('Demo@123', 12);
  await pool.query(`
    INSERT INTO users (phone, email, password_hash, full_name, role, bio, location, is_kyc_verified, kyc_status)
    VALUES ('+919876543210', 'priya@demo.com', $1, 'Priya Sharma', 'freelancer',
            'UI/UX designer with 5+ years experience.', 'Bangalore, India', TRUE, 'verified')
    ON CONFLICT (email) DO NOTHING
  `, [hash]);

  // Demo client
  await pool.query(`
    INSERT INTO users (phone, email, password_hash, full_name, role, location)
    VALUES ('+919345678901', 'arjun@demo.com', $1, 'Arjun Singh', 'client', 'Delhi, India')
    ON CONFLICT (email) DO NOTHING
  `, [hash]);

  console.log('✅ Seed complete');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
