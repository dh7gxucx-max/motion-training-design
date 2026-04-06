const express = require('express');
const router = express.Router();
const { query, getClient } = require('../db/pool');
const { authenticate } = require('../middleware/auth');

// Commission tiers for referrers
function getReferrerReward(totalReferrals) {
  if (totalReferrals >= 50) return 400;
  if (totalReferrals >= 21) return 300;
  if (totalReferrals >= 6) return 250;
  return 200;
}

// ── GET /api/referrals ─────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  const { rows } = await query(`
    SELECT r.*, u.full_name AS referee_name, u.avatar_url AS referee_avatar, u.created_at AS referee_joined
    FROM referrals r
    JOIN users u ON u.id = r.referee_id
    WHERE r.referrer_id = $1
    ORDER BY r.created_at DESC
  `, [req.user.id]);

  const { rows: stats } = await query(`
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status='rewarded') AS rewarded,
      COALESCE(SUM(referrer_reward) FILTER (WHERE status='rewarded'), 0) AS total_earned
    FROM referrals WHERE referrer_id=$1
  `, [req.user.id]);

  const { rows: me } = await query('SELECT referral_code FROM users WHERE id=$1', [req.user.id]);

  res.json({
    referral_code: me[0].referral_code,
    referral_link: `${process.env.FRONTEND_URL || 'https://valor.in'}/ref/${me[0].referral_code}`,
    stats: stats[0],
    referrals: rows,
  });
});

// ── POST /api/referrals/qualify/:refereeId  — called after first order ──────
// Internal: called from order completion flow
router.post('/qualify/:refereeId', authenticate, async (req, res) => {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      "SELECT * FROM referrals WHERE referee_id=$1 AND status='pending'",
      [req.params.refereeId]
    );
    if (!rows.length) { await client.query('COMMIT'); return res.json({ message: 'No pending referral' }); }

    const referral = rows[0];

    // Count referrer's total successful referrals for tiered reward
    const { rows: countRows } = await client.query(
      "SELECT COUNT(*) FROM referrals WHERE referrer_id=$1 AND status='rewarded'",
      [referral.referrer_id]
    );
    const referrerReward = getReferrerReward(parseInt(countRows[0].count));
    const refereeReward = parseFloat(process.env.REFERRAL_REWARD_REFEREE || 100);

    // Update referral
    await client.query(
      "UPDATE referrals SET status='rewarded', referrer_reward=$1, referee_reward=$2, rewarded_at=NOW() WHERE id=$3",
      [referrerReward, refereeReward, referral.id]
    );

    // Credit referrer
    await client.query('UPDATE users SET wallet_balance=wallet_balance+$1 WHERE id=$2', [referrerReward, referral.referrer_id]);
    await client.query(`
      INSERT INTO wallet_transactions (user_id,type,amount,balance_after,reference_id,description)
      SELECT $1,'referral_bonus',$2,wallet_balance,$3,'Referral reward' FROM users WHERE id=$1
    `, [referral.referrer_id, referrerReward, referral.id]);

    // Credit referee (discount/bonus on wallet)
    await client.query('UPDATE users SET wallet_balance=wallet_balance+$1 WHERE id=$2', [refereeReward, referral.referee_id]);
    await client.query(`
      INSERT INTO wallet_transactions (user_id,type,amount,balance_after,reference_id,description)
      SELECT $1,'referral_bonus',$2,wallet_balance,$3,'Welcome referral bonus' FROM users WHERE id=$1
    `, [referral.referee_id, refereeReward, referral.id]);

    await client.query('COMMIT');
    res.json({ referrerReward, refereeReward });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

module.exports = router;
