const request = require('supertest');
const jwt = require('jsonwebtoken');

// ── Mocks ───────────────────────────────────────────────────────────────────

const mockQuery = jest.fn();
jest.mock('../src/db/pool', () => ({
  query: (...args) => mockQuery(...args),
  getClient: jest.fn(),
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

const mockIsBlacklisted = jest.fn().mockResolvedValue(false);
jest.mock('../src/db/redis', () => ({
  connectRedis: jest.fn().mockResolvedValue(undefined),
  setOTP: jest.fn(),
  getOTP: jest.fn(),
  deleteOTP: jest.fn(),
  blacklistToken: jest.fn(),
  isTokenBlacklisted: (...a) => mockIsBlacklisted(...a),
}));

const mockIndexGig = jest.fn().mockResolvedValue(undefined);
const mockDeleteGigIndex = jest.fn().mockResolvedValue(undefined);
jest.mock('../src/services/search', () => ({
  setupIndexes: jest.fn(),
  indexGig: (...a) => mockIndexGig(...a),
  deleteGigIndex: (...a) => mockDeleteGigIndex(...a),
  searchGigs: jest.fn().mockResolvedValue([]),
}));

jest.spyOn(console, 'log').mockImplementation(() => {});

process.env.JWT_SECRET = 'test-secret-key';
process.env.NODE_ENV = 'test';

const app = require('../src/app');

// ── Helpers ─────────────────────────────────────────────────────────────────

function makeToken(userId = 'user-1', role = 'client', vip = 'free') {
  return jwt.sign({ sub: userId, role, jti: 'jti-1' }, 'test-secret-key', { expiresIn: '1h' });
}

function makeFreelancerToken() {
  return jwt.sign({ sub: 'freelancer-1', role: 'freelancer', jti: 'jti-2' }, 'test-secret-key', { expiresIn: '1h' });
}

const mockGig = {
  id: 'gig-uuid-1',
  title: 'Professional Logo Design for Your Business',
  slug: 'professional-logo-design-for-your-business-1234567890',
  basic_price: 500,
  standard_price: 1000,
  premium_price: 2000,
  images: [],
  rating: 4.8,
  total_reviews: 12,
  orders_count: 30,
  tags: ['logo', 'design'],
  seller_name: 'Priya Sharma',
  seller_avatar: null,
  vip_plan: 'free',
  category_name: 'Logo Design',
  category_slug: 'logo-design',
  status: 'active',
  seller_id: 'freelancer-1',
  description: 'I will design a professional logo for your business with unlimited revisions.',
};

const mockFreelancerUser = {
  id: 'freelancer-1',
  role: 'freelancer',
  full_name: 'Priya Sharma',
  is_active: true,
  vip_plan: 'free',
};

// ── Tests: GET /api/gigs ─────────────────────────────────────────────────────

describe('GET /api/gigs', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns paginated gig list', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [mockGig] })          // data query
      .mockResolvedValueOnce({ rows: [{ count: '1' }] });   // count query

    const res = await request(app).get('/api/gigs');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('gigs');
    expect(res.body.gigs).toHaveLength(1);
    expect(res.body.total).toBe(1);
    expect(res.body.page).toBe(1);
  });

  it('supports category filter', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ count: '0' }] });

    const res = await request(app).get('/api/gigs?category=logo-design&min_price=200');
    expect(res.status).toBe(200);
    // Verify filter params were passed (mockQuery was called with conditions)
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });

  it('returns empty array when no gigs match', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ count: '0' }] });

    const res = await request(app).get('/api/gigs?min_price=99999');
    expect(res.status).toBe(200);
    expect(res.body.gigs).toHaveLength(0);
    expect(res.body.total).toBe(0);
  });
});

// ── Tests: GET /api/gigs/:id ─────────────────────────────────────────────────

describe('GET /api/gigs/:id', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns a single gig by id', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [mockGig] })  // SELECT
      .mockResolvedValueOnce({ rows: [] });          // UPDATE views (fire-and-forget)

    const res = await request(app).get('/api/gigs/gig-uuid-1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('gig-uuid-1');
    expect(res.body.title).toBe(mockGig.title);
  });

  it('returns 404 for unknown gig', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/api/gigs/nonexistent-id');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

// ── Tests: POST /api/gigs ────────────────────────────────────────────────────

describe('POST /api/gigs', () => {
  beforeEach(() => jest.clearAllMocks());

  const validGigPayload = {
    title: 'Professional Logo Design for Your Business Brand',
    description: 'I will create a stunning professional logo for your business brand with unlimited revisions included.',
    category_id: 1,
    basic_title: 'Basic Package',
    basic_desc: 'Simple logo design',
    basic_price: 500,
    basic_delivery: 3,
    basic_revisions: 2,
    tags: ['logo', 'branding'],
  };

  it('returns 401 without authentication', async () => {
    const res = await request(app).post('/api/gigs').send(validGigPayload);
    expect(res.status).toBe(401);
  });

  it('returns 403 for client role', async () => {
    const clientUser = { id: 'user-1', role: 'client', full_name: 'Client', is_active: true, vip_plan: 'free' };
    mockIsBlacklisted.mockResolvedValue(false);
    mockQuery.mockResolvedValueOnce({ rows: [clientUser] });

    const res = await request(app)
      .post('/api/gigs')
      .set('Authorization', `Bearer ${makeToken()}`)
      .send(validGigPayload);

    expect(res.status).toBe(403);
  });

  it('creates a gig for freelancer and indexes it', async () => {
    mockIsBlacklisted.mockResolvedValue(false);
    mockQuery
      .mockResolvedValueOnce({ rows: [mockFreelancerUser] }) // authenticate
      .mockResolvedValueOnce({ rows: [mockGig] });            // INSERT gig

    const res = await request(app)
      .post('/api/gigs')
      .set('Authorization', `Bearer ${makeFreelancerToken()}`)
      .send(validGigPayload);

    expect(res.status).toBe(201);
    expect(mockIndexGig).toHaveBeenCalledTimes(1);
  });

  it('returns 422 for short title', async () => {
    mockIsBlacklisted.mockResolvedValue(false);
    mockQuery.mockResolvedValueOnce({ rows: [mockFreelancerUser] });

    const res = await request(app)
      .post('/api/gigs')
      .set('Authorization', `Bearer ${makeFreelancerToken()}`)
      .send({ ...validGigPayload, title: 'Too short' });

    expect(res.status).toBe(422);
  });
});

// ── Tests: DELETE /api/gigs/:id ──────────────────────────────────────────────

describe('DELETE /api/gigs/:id', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deletes own gig successfully', async () => {
    mockIsBlacklisted.mockResolvedValue(false);
    mockQuery
      .mockResolvedValueOnce({ rows: [mockFreelancerUser] }) // authenticate
      .mockResolvedValueOnce({ rowCount: 1 });               // DELETE

    const res = await request(app)
      .delete('/api/gigs/gig-uuid-1')
      .set('Authorization', `Bearer ${makeFreelancerToken()}`);

    expect(res.status).toBe(200);
    expect(mockDeleteGigIndex).toHaveBeenCalledWith('gig-uuid-1');
  });

  it('returns 404 when gig not found or not owned', async () => {
    mockIsBlacklisted.mockResolvedValue(false);
    mockQuery
      .mockResolvedValueOnce({ rows: [mockFreelancerUser] }) // authenticate
      .mockResolvedValueOnce({ rowCount: 0 });               // DELETE — no rows

    const res = await request(app)
      .delete('/api/gigs/other-gig-id')
      .set('Authorization', `Bearer ${makeFreelancerToken()}`);

    expect(res.status).toBe(404);
  });
});

// ── Tests: GET /api/gigs/:id/reviews ─────────────────────────────────────────

describe('GET /api/gigs/:id/reviews', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns reviews for a gig', async () => {
    const reviews = [
      { id: 'rev-1', rating: 5, comment: 'Excellent work!', reviewer_name: 'Arjun Kumar' },
    ];
    mockQuery.mockResolvedValueOnce({ rows: reviews });

    const res = await request(app).get('/api/gigs/gig-uuid-1/reviews');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].rating).toBe(5);
  });
});
