// Mock DB and Redis before requiring the app
jest.mock('../src/db/pool', () => ({
  query: jest.fn(),
  getClient: jest.fn(),
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../src/db/redis', () => ({
  connectRedis: jest.fn().mockResolvedValue(undefined),
  setOTP: jest.fn(),
  getOTP: jest.fn(),
  deleteOTP: jest.fn(),
  blacklistToken: jest.fn(),
  isTokenBlacklisted: jest.fn().mockResolvedValue(false),
}));

// Mock search service so MeiliSearch doesn't connect
jest.mock('../src/services/search', () => ({
  setupIndexes: jest.fn(),
  indexGig: jest.fn().mockResolvedValue(undefined),
  deleteGigIndex: jest.fn().mockResolvedValue(undefined),
  searchGigs: jest.fn().mockResolvedValue([]),
}));

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('ts');
  });
});

describe('404 handling', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.status).toBe(404);
  });
});
