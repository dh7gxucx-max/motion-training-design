const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { blacklistToken } = require('../db/redis');

function signAccessToken(userId, role) {
  return jwt.sign(
    { sub: userId, role, jti: uuidv4() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function signRefreshToken(userId) {
  return jwt.sign(
    { sub: userId, type: 'refresh', jti: uuidv4() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );
}

async function revokeToken(token) {
  try {
    const payload = jwt.decode(token);
    if (payload?.jti && payload?.exp) {
      const ttl = payload.exp - Math.floor(Date.now() / 1000);
      if (ttl > 0) await blacklistToken(payload.jti, ttl);
    }
  } catch {}
}

module.exports = { signAccessToken, signRefreshToken, revokeToken };
