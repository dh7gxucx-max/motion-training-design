const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ── Mocks ───────────────────────────────────────────────────────────────────

const mockQuery = jest.fn();
jest.mock('../src/db/pool', () => ({
  query: (...args) => mockQuery(...args),
  getClient: jest.fn(),
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

const mockSetOTP = jest.fn().mockResolvedValue(undefined);
const mockGetOTP = jest.fn();
const mockDeleteOTP = jest.fn().mockResolvedValue(undefined);
const mockIsBlacklisted = jest.fn().mockResolvedValue(false);
jest.mock('../src/db/redis', () => ({
  connectRedis: jest.fn().mockResolvedValue(undefined),
  setOTP: (...a) => mockSetOTP(...a),
  getOTP: (...a) => mockGetOTP(...a),
  deleteOTP: (...a) => mockDeleteOTP(...a),
  blacklistToken: jest.fn().mockResolvedValue(undefined),
  isTokenBlacklisted: (...a) => mockIsBlacklisted(...a),
}));

jest.mock('../src/services/search', () => ({
  setupIndexes: jest.fn(),
  indexGig: jest.fn().mockResolvedValue(undefined),
  deleteGigIndex: jest.fn().mockResolvedValue(undefined),
  searchGigs: jest.fn().mockResolvedValue([]),
}));

// MSG91 — just log in dev, no real call; mock console to keep output clean
jest.spyOn(console, 'log').mockImplementation(() => {});

process.env.JWT_SECRET = 'test-secret-key';
process.env.NODE_ENV = 'test';

const app = require('../src/app');

// ── Helper ──────────────────────────────────────────────────────────────────

function makeUser(overrides = {}) {
  return {
    id: 'user-uuid-1',
    email: 'test@example.com',
    password_hash: bcrypt.hashSync('Password1', 1),
    full_name: 'Test User',
    role: 'client',
    is_active: true,
    vip_plan: 'free',
    referral_code: 'REF123',
    wallet_balance: 0,
    ...overrides,
  };
}

function makeToken(userId = 'user-uuid-1', role = 'client') {
  return jwt.sign({ sub: userId, role, jti: 'test-jti' }, 'test-secret-key', { expiresIn: '1h' });
}

// ── Tests: POST /api/auth/register ──────────────────────────────────────────

describe('POST /api/auth/register', () => {
  beforeEach(() => jest.clearAllMocks());

  it('creates a new user and returns tokens', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [] })           // email exists check
      .mockResolvedValueOnce({ rows: [makeUser()] }); // INSERT user

    const res = await request(app).post('/api/auth/register').send({
      email: 'newuser@example.com',
      password: 'Password1',
      full_name: 'New User',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.user).not.toHaveProperty('password_hash');
  });

  it('returns 409 if email already registered', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ id: 'existing' }] });

    const res = await request(app).post('/api/auth/register').send({
      email: 'exists@example.com',
      password: 'Password1',
      full_name: 'Exists',
    });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/already registered/i);
  });

  it('returns 422 for weak password', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'a@b.com',
      password: 'weak',
      full_name: 'Someone',
    });
    expect(res.status).toBe(422);
  });

  it('registers with referral_code', async () => {
    const referrer = makeUser({ id: 'referrer-id', referral_code: 'MYREF' });
    mockQuery
      .mockResolvedValueOnce({ rows: [] })              // email check
      .mockResolvedValueOnce({ rows: [referrer] })       // referral lookup
      .mockResolvedValueOnce({ rows: [makeUser()] })     // INSERT user
      .mockResolvedValueOnce({ rows: [] });              // INSERT referral

    const res = await request(app).post('/api/auth/register').send({
      email: 'referred@example.com',
      password: 'Password1',
      full_name: 'Referred User',
      referral_code: 'MYREF',
    });

    expect(res.status).toBe(201);
  });
});

// ── Tests: POST /api/auth/login ─────────────────────────────────────────────

describe('POST /api/auth/login', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns tokens on valid credentials', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [makeUser()] });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password1',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('returns 401 for wrong password', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [makeUser()] });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'WrongPass1',
    });

    expect(res.status).toBe(401);
  });

  it('returns 401 for unknown email', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).post('/api/auth/login').send({
      email: 'nobody@example.com',
      password: 'Password1',
    });

    expect(res.status).toBe(401);
  });

  it('returns 403 for suspended account', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [makeUser({ is_active: false })] });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password1',
    });

    expect(res.status).toBe(403);
  });

  it('returns 422 for invalid email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'not-an-email',
      password: 'Password1',
    });
    expect(res.status).toBe(422);
  });
});

// ── Tests: GET /api/auth/me ──────────────────────────────────────────────────

describe('GET /api/auth/me', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns user profile with valid token', async () => {
    const user = makeUser();
    mockIsBlacklisted.mockResolvedValue(false);
    mockQuery
      .mockResolvedValueOnce({ rows: [user], rowCount: 1 }) // authenticate — user lookup
      .mockResolvedValueOnce({ rows: [user] });              // /me query

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${makeToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@example.com');
    expect(res.body).not.toHaveProperty('password_hash');
  });

  it('returns 401 without token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('returns 401 with invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid.token.here');
    expect(res.status).toBe(401);
  });
});

// ── Tests: POST /api/auth/refresh ───────────────────────────────────────────

describe('POST /api/auth/refresh', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns new access token for valid refresh token', async () => {
    const refreshToken = jwt.sign(
      { sub: 'user-uuid-1', type: 'refresh' },
      'test-secret-key',
      { expiresIn: '30d' }
    );
    mockQuery.mockResolvedValueOnce({ rows: [{ id: 'user-uuid-1', role: 'client' }] });

    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('returns 401 for invalid refresh token', async () => {
    const res = await request(app).post('/api/auth/refresh').send({ refreshToken: 'bad.token' });
    expect(res.status).toBe(401);
  });
});

// ── Tests: POST /api/auth/otp/send ──────────────────────────────────────────

describe('POST /api/auth/otp/send', () => {
  beforeEach(() => jest.clearAllMocks());

  it('accepts valid Indian phone number', async () => {
    mockSetOTP.mockResolvedValue(undefined);

    const res = await request(app).post('/api/auth/otp/send').send({ phone: '+919876543210' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('OTP sent');
  });

  it('rejects invalid phone number', async () => {
    const res = await request(app).post('/api/auth/otp/send').send({ phone: '1234567890' });
    expect(res.status).toBe(422);
  });
});
