const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'valor_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected DB pool error:', err);
});

async function connectDB() {
  const client = await pool.connect();
  console.log('✅ PostgreSQL connected');
  client.release();
}

// Helper: run a query with automatic parameter binding
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development') {
    console.log('query', { text: text.slice(0, 60), duration, rows: res.rowCount });
  }
  return res;
}

// Helper: get a client for transactions
async function getClient() {
  return pool.connect();
}

module.exports = { pool, query, getClient, connectDB };
