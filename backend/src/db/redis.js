const { createClient } = require('redis');

let redisClient;

async function connectRedis() {
  redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    password: process.env.REDIS_PASSWORD || undefined,
  });

  redisClient.on('error', (err) => console.error('Redis error:', err));
  await redisClient.connect();
  console.log('✅ Redis connected');
}

function getRedis() {
  if (!redisClient) throw new Error('Redis not initialised');
  return redisClient;
}

// OTP helpers
async function setOTP(phone, otp, ttlSeconds = 300) {
  await getRedis().set(`otp:${phone}`, otp, { EX: ttlSeconds });
}

async function getOTP(phone) {
  return getRedis().get(`otp:${phone}`);
}

async function deleteOTP(phone) {
  return getRedis().del(`otp:${phone}`);
}

// Session / token blacklist
async function blacklistToken(jti, ttlSeconds) {
  await getRedis().set(`bl:${jti}`, '1', { EX: ttlSeconds });
}

async function isTokenBlacklisted(jti) {
  return (await getRedis().get(`bl:${jti}`)) === '1';
}

module.exports = { connectRedis, getRedis, setOTP, getOTP, deleteOTP, blacklistToken, isTokenBlacklisted };
