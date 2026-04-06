require('dotenv').config();
const { pool } = require('./pool');

const schema = `
-- ═══════════════════════════════════════════
--  VALOR DATABASE SCHEMA
-- ═══════════════════════════════════════════

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ── Users ──────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone         VARCHAR(15) UNIQUE,
  email         VARCHAR(255) UNIQUE,
  password_hash TEXT,
  full_name     VARCHAR(255) NOT NULL,
  avatar_url    TEXT,
  bio           TEXT,
  location      VARCHAR(255),
  role          VARCHAR(20) NOT NULL DEFAULT 'client'
                  CHECK (role IN ('client','freelancer','admin')),
  vip_plan      VARCHAR(20) NOT NULL DEFAULT 'free'
                  CHECK (vip_plan IN ('free','silver','gold','platinum')),
  vip_expires_at TIMESTAMPTZ,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  is_kyc_verified BOOLEAN NOT NULL DEFAULT FALSE,
  kyc_status    VARCHAR(20) NOT NULL DEFAULT 'none'
                  CHECK (kyc_status IN ('none','pending','verified','rejected')),
  referral_code VARCHAR(20) UNIQUE NOT NULL DEFAULT UPPER(SUBSTR(MD5(RANDOM()::TEXT),1,8)),
  referred_by   UUID REFERENCES users(id),
  wallet_balance NUMERIC(12,2) NOT NULL DEFAULT 0,
  pending_balance NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_earned  NUMERIC(12,2) NOT NULL DEFAULT 0,
  rating        NUMERIC(3,2) NOT NULL DEFAULT 0,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  total_orders  INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ── Categories ─────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) UNIQUE NOT NULL,
  slug        VARCHAR(100) UNIQUE NOT NULL,
  icon        VARCHAR(50),
  parent_id   INTEGER REFERENCES categories(id),
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ── Gigs ───────────────────────────────────
CREATE TABLE IF NOT EXISTS gigs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id   INTEGER REFERENCES categories(id),
  title         VARCHAR(255) NOT NULL,
  slug          VARCHAR(300) NOT NULL,
  description   TEXT NOT NULL,
  tags          TEXT[] DEFAULT '{}',
  status        VARCHAR(20) NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','active','paused','rejected')),
  -- Packages
  basic_title       VARCHAR(150),
  basic_desc        TEXT,
  basic_price       NUMERIC(10,2) NOT NULL DEFAULT 0,
  basic_delivery    INTEGER NOT NULL DEFAULT 3,
  basic_revisions   INTEGER NOT NULL DEFAULT 1,
  standard_title    VARCHAR(150),
  standard_desc     TEXT,
  standard_price    NUMERIC(10,2),
  standard_delivery INTEGER,
  standard_revisions INTEGER,
  premium_title     VARCHAR(150),
  premium_desc      TEXT,
  premium_price     NUMERIC(10,2),
  premium_delivery  INTEGER,
  premium_revisions INTEGER,
  -- Stats
  views         INTEGER NOT NULL DEFAULT 0,
  orders_count  INTEGER NOT NULL DEFAULT 0,
  rating        NUMERIC(3,2) NOT NULL DEFAULT 0,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  -- Media
  images        TEXT[] DEFAULT '{}',
  video_url     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gigs_seller ON gigs(seller_id);
CREATE INDEX IF NOT EXISTS idx_gigs_category ON gigs(category_id);
CREATE INDEX IF NOT EXISTS idx_gigs_status ON gigs(status);
CREATE INDEX IF NOT EXISTS idx_gigs_title_trgm ON gigs USING GIN(title gin_trgm_ops);

-- ── Orders ─────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number    VARCHAR(20) UNIQUE NOT NULL
                    DEFAULT 'ORD-' || UPPER(SUBSTR(MD5(RANDOM()::TEXT),1,8)),
  gig_id          UUID NOT NULL REFERENCES gigs(id),
  buyer_id        UUID NOT NULL REFERENCES users(id),
  seller_id       UUID NOT NULL REFERENCES users(id),
  package         VARCHAR(20) NOT NULL DEFAULT 'basic'
                    CHECK (package IN ('basic','standard','premium')),
  -- Snapshot of prices at order time
  amount          NUMERIC(10,2) NOT NULL,
  platform_fee    NUMERIC(10,2) NOT NULL,
  seller_earnings NUMERIC(10,2) NOT NULL,
  delivery_days   INTEGER NOT NULL,
  revisions       INTEGER NOT NULL,
  -- State machine
  status          VARCHAR(30) NOT NULL DEFAULT 'pending_payment'
                    CHECK (status IN (
                      'pending_payment','active','in_review',
                      'revision_requested','completed','cancelled',
                      'dispute_open','dispute_resolved','refunded'
                    )),
  requirements    TEXT,
  delivery_note   TEXT,
  revision_note   TEXT,
  due_at          TIMESTAMPTZ,
  delivered_at    TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  -- Razorpay
  razorpay_order_id   VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  razorpay_signature  VARCHAR(300),
  payment_status  VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (payment_status IN ('pending','paid','refunded','failed')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_gig ON orders(gig_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ── Messages ───────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id    UUID REFERENCES orders(id) ON DELETE CASCADE,
  sender_id   UUID NOT NULL REFERENCES users(id),
  receiver_id UUID NOT NULL REFERENCES users(id),
  content     TEXT NOT NULL,
  file_url    TEXT,
  file_name   TEXT,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_order ON messages(order_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

-- ── Reviews ────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id    UUID UNIQUE NOT NULL REFERENCES orders(id),
  gig_id      UUID NOT NULL REFERENCES gigs(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  reviewee_id UUID NOT NULL REFERENCES users(id),
  rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_gig ON reviews(gig_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee ON reviews(reviewee_id);

-- ── Wallet Transactions ─────────────────────
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id),
  type        VARCHAR(30) NOT NULL
                CHECK (type IN (
                  'order_payment','escrow_hold','escrow_release',
                  'platform_fee','withdrawal','topup',
                  'refund','referral_bonus','vip_purchase'
                )),
  amount      NUMERIC(10,2) NOT NULL,
  balance_after NUMERIC(12,2) NOT NULL,
  reference_id  UUID,          -- order_id or withdrawal_id
  description   TEXT,
  status      VARCHAR(20) NOT NULL DEFAULT 'completed'
                CHECK (status IN ('pending','completed','failed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_user ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_type ON wallet_transactions(type);
CREATE INDEX IF NOT EXISTS idx_wallet_created ON wallet_transactions(created_at DESC);

-- ── Withdrawals ────────────────────────────
CREATE TABLE IF NOT EXISTS withdrawals (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id),
  amount        NUMERIC(10,2) NOT NULL,
  bank_name     VARCHAR(100),
  account_number VARCHAR(50),
  ifsc_code     VARCHAR(20),
  upi_id        VARCHAR(100),
  status        VARCHAR(20) NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','processing','completed','failed')),
  admin_note    TEXT,
  processed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Referrals ──────────────────────────────
CREATE TABLE IF NOT EXISTS referrals (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id   UUID NOT NULL REFERENCES users(id),
  referee_id    UUID NOT NULL UNIQUE REFERENCES users(id),
  status        VARCHAR(20) NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','qualified','rewarded')),
  -- 'qualified' = referee completed first transaction
  referrer_reward NUMERIC(10,2) NOT NULL DEFAULT 0,
  referee_reward  NUMERIC(10,2) NOT NULL DEFAULT 0,
  rewarded_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);

-- ── KYC Documents ──────────────────────────
CREATE TABLE IF NOT EXISTS kyc_documents (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL UNIQUE REFERENCES users(id),
  doc_type      VARCHAR(30) NOT NULL
                  CHECK (doc_type IN ('aadhaar','pan','passport','voter_id')),
  doc_number    VARCHAR(50),
  front_url     TEXT NOT NULL,
  back_url      TEXT,
  selfie_url    TEXT,
  status        VARCHAR(20) NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','verified','rejected')),
  admin_note    TEXT,
  verified_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── VIP Subscriptions ──────────────────────
CREATE TABLE IF NOT EXISTS vip_subscriptions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id),
  plan          VARCHAR(20) NOT NULL CHECK (plan IN ('silver','gold','platinum')),
  started_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at    TIMESTAMPTZ NOT NULL,
  razorpay_payment_id VARCHAR(100),
  amount        NUMERIC(10,2) NOT NULL,
  status        VARCHAR(20) NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active','expired','cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_vip_user ON vip_subscriptions(user_id);

-- ── Trigger: updated_at ────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['users','gigs','orders','kyc_documents']
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_updated_%1$s ON %1$s;
       CREATE TRIGGER trg_updated_%1$s
       BEFORE UPDATE ON %1$s
       FOR EACH ROW EXECUTE FUNCTION set_updated_at()', t);
  END LOOP;
END $$;
`;

async function migrate() {
  console.log('Running migrations…');
  await pool.query(schema);
  console.log('✅ Schema applied');
  await pool.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
