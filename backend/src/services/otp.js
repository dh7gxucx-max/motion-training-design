const { setOTP, getOTP, deleteOTP } = require('../db/redis');

// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via MSG91
async function sendOTP(phone) {
  const otp = generateOTP();
  await setOTP(phone, otp, 300); // 5 min TTL

  if (process.env.NODE_ENV === 'development') {
    // In dev, just log it — no real SMS
    console.log(`[DEV] OTP for ${phone}: ${otp}`);
    return { success: true, dev: true };
  }

  // MSG91 integration
  const url = 'https://api.msg91.com/api/v5/otp';
  const payload = {
    template_id: process.env.MSG91_TEMPLATE_ID,
    mobile: phone.replace('+', ''),
    authkey: process.env.MSG91_AUTH_KEY,
    otp,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to send OTP via MSG91');
  }

  return { success: true };
}

async function verifyOTP(phone, otp) {
  const stored = await getOTP(phone);
  if (!stored) return { valid: false, reason: 'OTP expired' };
  if (stored !== otp) return { valid: false, reason: 'Invalid OTP' };
  await deleteOTP(phone);
  return { valid: true };
}

module.exports = { sendOTP, verifyOTP };
