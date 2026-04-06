const Razorpay = require('razorpay');
const crypto = require('crypto');

let rzInstance;

function getRazorpay() {
  if (!rzInstance) {
    rzInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return rzInstance;
}

async function createRazorpayOrder(amountInRupees, notes = '') {
  const rz = getRazorpay();
  return rz.orders.create({
    amount: Math.round(amountInRupees * 100), // paise
    currency: 'INR',
    notes: { description: notes },
  });
}

function verifyPaymentSignature(orderId, paymentId, signature) {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');
  return expected === signature;
}

function verifyWebhookSignature(rawBody, signature) {
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
}

module.exports = { createRazorpayOrder, verifyPaymentSignature, verifyWebhookSignature };
