const request = require('supertest');
const jwt = require('jsonwebtoken');

// ── Mocks ───────────────────────────────────────────────────────────────────

const mockQuery = jest.fn();
const mockGetClient = jest.fn();
jest.mock('../src/db/pool', () => ({
  query: (...args) => mockQuery(...args),
  getClient: () => mockGetClient(),
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

const mockIsBlacklisted = jest.fn();
jest.mock('../src/db/redis', () => ({
  connectRedis: jest.fn().mockResolvedValue(undefined),
  setOTP: jest.fn(),
  getOTP: jest.fn(),
  deleteOTP: jest.fn(),
  blacklistToken: jest.fn(),
  isTokenBlacklisted: (...a) => mockIsBlacklisted(...a),
}));

jest.mock('../src/services/search', () => ({
  setupIndexes: jest.fn(),
  indexGig: jest.fn(),
  deleteGigIndex: jest.fn(),
  searchGigs: jest.fn(),
}));

const mockCreateRazorpayOrder = jest.fn();
jest.mock('../src/services/razorpay', () => ({
  createRazorpayOrder: (...a) => mockCreateRazorpayOrder(...a),
  verifyPaymentSignature: jest.fn().mockReturnValue(true),
  verifyWebhookSignature: jest.fn().mockReturnValue(true),
}));

jest.mock('../src/socket', () => ({
  initSocket: jest.fn(),
  getIO: jest.fn().mockReturnValue({
    to: jest.fn().mockReturnValue({ emit: jest.fn() }),
  }),
}));

jest.spyOn(console, 'log').mockImplementation(() => {});

process.env.JWT_SECRET = 'test-secret-key';
process.env.NODE_ENV = 'test';

const app = require('../src/app');

// ── Helpers ─────────────────────────────────────────────────────────────────

const VALID_GIG_UUID = '550e8400-e29b-41d4-a716-446655440001';
const VALID_ORDER_UUID = '550e8400-e29b-41d4-a716-446655440002';

function makeToken(userId, role) {
  return jwt.sign({ sub: userId, role, jti: 'jti-1' }, 'test-secret-key', { expiresIn: '1h' });
}

const clientUser = { id: 'client-1', role: 'client', full_name: 'Arjun Kumar', is_active: true, vip_plan: 'free' };
const freelancerUser = { id: 'freelancer-1', role: 'freelancer', full_name: 'Priya Sharma', is_active: true, vip_plan: 'free' };

const mockGig = {
  id: VALID_GIG_UUID,
  title: 'Professional Logo Design',
  seller_id: 'freelancer-1',
  status: 'active',
  basic_price: 500,
  standard_price: 1000,
  premium_price: 2000,
  basic_delivery: 3,
  standard_delivery: 5,
  premium_delivery: 7,
  basic_revisions: 2,
  standard_revisions: 3,
  premium_revisions: 5,
  seller_vip: 'free',
};

const mockOrder = {
  id: VALID_ORDER_UUID,
  gig_id: VALID_GIG_UUID,
  buyer_id: 'client-1',
  seller_id: 'freelancer-1',
  package: 'basic',
  amount: 500,
  platform_fee: 50,
  seller_earnings: 450,
  status: 'active',
  payment_status: 'paid',
  razorpay_order_id: 'rzp_order_1',
  delivery_days: 3,
  revisions: 2,
};

// ── Tests: POST /api/orders ──────────────────────────────────────────────────

describe('POST /api/orders', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockIsBlacklisted.mockResolvedValue(false);
  });

  it('returns 401 without token', async () => {
    const res = await request(app).post('/api/orders').send({
      gig_id: VALID_GIG_UUID,
      package: 'basic',
    });
    expect(res.status).toBe(401);
  });

  it('returns 403 for freelancer role (only clients can order)', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [freelancerUser] });

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${makeToken('freelancer-1', 'freelancer')}`)
      .send({ gig_id: VALID_GIG_UUID, package: 'basic' });

    expect(res.status).toBe(403);
  });

  it('returns 422 for invalid gig_id (not UUID)', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [clientUser] });

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${makeToken('client-1', 'client')}`)
      .send({ gig_id: 'not-a-uuid', package: 'basic' });

    expect(res.status).toBe(422);
  });

  it('creates order and returns razorpay data', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [clientUser] })
      .mockResolvedValueOnce({ rows: [mockGig] })
      .mockResolvedValueOnce({ rows: [mockOrder] });

    mockCreateRazorpayOrder.mockResolvedValue({
      id: 'rzp_order_test',
      amount: 50000,
      currency: 'INR',
    });

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${makeToken('client-1', 'client')}`)
      .send({ gig_id: VALID_GIG_UUID, package: 'basic', requirements: 'Please make it blue' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('order');
    expect(res.body).toHaveProperty('razorpay');
    expect(res.body.razorpay.id).toBe('rzp_order_test');
  });

  it('returns 404 when gig not active', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [clientUser] })
      .mockResolvedValueOnce({ rows: [] });

    mockCreateRazorpayOrder.mockResolvedValue({ id: 'rzp', amount: 50000, currency: 'INR' });

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${makeToken('client-1', 'client')}`)
      .send({ gig_id: VALID_GIG_UUID, package: 'basic' });

    expect(res.status).toBe(404);
  });
});

// ── Tests: GET /api/orders ───────────────────────────────────────────────────

describe('GET /api/orders', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockIsBlacklisted.mockResolvedValue(false);
  });

  it('returns order list for authenticated user', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [clientUser] })
      .mockResolvedValueOnce({ rows: [{ ...mockOrder, gig_title: 'Logo Design', buyer_name: 'Arjun' }] });

    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${makeToken('client-1', 'client')}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].id).toBe(VALID_ORDER_UUID);
  });
});

// ── Tests: GET /api/orders/:id ───────────────────────────────────────────────

describe('GET /api/orders/:id', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockIsBlacklisted.mockResolvedValue(false);
  });

  it('returns single order for participant', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [clientUser] })
      .mockResolvedValueOnce({ rows: [mockOrder] });

    const res = await request(app)
      .get(`/api/orders/${VALID_ORDER_UUID}`)
      .set('Authorization', `Bearer ${makeToken('client-1', 'client')}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(VALID_ORDER_UUID);
  });

  it('returns 404 for order user is not part of', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [clientUser] })
      .mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .get('/api/orders/550e8400-e29b-41d4-a716-446655440099')
      .set('Authorization', `Bearer ${makeToken('client-1', 'client')}`);

    expect(res.status).toBe(404);
  });
});

// ── Tests: POST /api/orders/:id/deliver ─────────────────────────────────────

describe('POST /api/orders/:id/deliver', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockIsBlacklisted.mockResolvedValue(false);
  });

  it('marks order as in_review', async () => {
    const deliveredOrder = { ...mockOrder, status: 'in_review', delivery_note: 'Done!' };
    mockQuery
      .mockResolvedValueOnce({ rows: [freelancerUser] })
      .mockResolvedValueOnce({ rows: [deliveredOrder] });

    const { getIO } = require('../src/socket');
    getIO.mockReturnValue({ to: jest.fn().mockReturnValue({ emit: jest.fn() }) });

    const res = await request(app)
      .post(`/api/orders/${VALID_ORDER_UUID}/deliver`)
      .set('Authorization', `Bearer ${makeToken('freelancer-1', 'freelancer')}`)
      .send({ delivery_note: 'Done!' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('in_review');
  });

  it('returns 422 if delivery_note is missing', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [freelancerUser] });

    const res = await request(app)
      .post(`/api/orders/${VALID_ORDER_UUID}/deliver`)
      .set('Authorization', `Bearer ${makeToken('freelancer-1', 'freelancer')}`)
      .send({});

    expect(res.status).toBe(422);
  });
});

// ── Tests: commission calculation ───────────────────────────────────────────

describe('Commission rates by VIP plan', () => {
  const plans = [
    { vip: 'free', rate: 0.10 },
    { vip: 'silver', rate: 0.08 },
    { vip: 'gold', rate: 0.06 },
    { vip: 'platinum', rate: 0.04 },
  ];

  test.each(plans)('$vip plan applies $rate commission rate', async ({ vip, rate }) => {
    jest.resetAllMocks();
    mockIsBlacklisted.mockResolvedValue(false);

    const gigWithVip = { ...mockGig, seller_vip: vip };
    const expectedFee = +(500 * rate).toFixed(2);
    const expectedEarnings = +(500 - expectedFee).toFixed(2);

    mockQuery
      .mockResolvedValueOnce({ rows: [clientUser] })
      .mockResolvedValueOnce({ rows: [gigWithVip] })
      .mockImplementationOnce(async (sql, params) => {
        expect(params[5]).toBe(expectedFee);
        expect(params[6]).toBe(expectedEarnings);
        return { rows: [mockOrder] };
      });

    mockCreateRazorpayOrder.mockResolvedValue({ id: 'rzp_test', amount: 50000, currency: 'INR' });

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${makeToken('client-1', 'client')}`)
      .send({ gig_id: VALID_GIG_UUID, package: 'basic' });

    expect(res.status).toBe(201);
  });
});
