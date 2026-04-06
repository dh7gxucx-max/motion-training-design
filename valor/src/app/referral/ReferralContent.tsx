"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Copy, Check, Users, IndianRupee, Gift, ArrowRight, Star, TrendingUp, Share2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  {
    icon: Share2,
    title: "Share Your Link",
    desc: "Copy your unique referral link and share it with friends, colleagues, or on social media.",
  },
  {
    icon: Users,
    title: "They Sign Up",
    desc: "Your friend registers on VALOR using your referral link and completes their first transaction.",
  },
  {
    icon: IndianRupee,
    title: "You Both Earn",
    desc: "You receive ₹200 and your friend gets ₹100 off their first order. Win-win!",
  },
];

const tiers = [
  {
    label: "Starter",
    referrals: "1–5",
    reward: "₹200 / referral",
    bonus: null,
    color: "from-card to-border",
    badge: "bg-card text-text-secondary",
  },
  {
    label: "Silver",
    referrals: "6–20",
    reward: "₹250 / referral",
    bonus: "+ ₹500 milestone bonus",
    color: "from-primary/5 to-primary/10",
    badge: "bg-primary/10 text-primary",
    popular: true,
  },
  {
    label: "Gold",
    referrals: "21–50",
    reward: "₹300 / referral",
    bonus: "+ ₹2,000 milestone bonus",
    color: "from-accent/5 to-accent/10",
    badge: "bg-accent/10 text-accent",
  },
  {
    label: "Platinum",
    referrals: "50+",
    reward: "₹400 / referral",
    bonus: "+ Exclusive VIP upgrade",
    color: "from-purple-50 to-purple-100",
    badge: "bg-purple-100 text-purple-600",
  },
];

const topEarners = [
  { name: "Suresh K.", city: "Bangalore", earned: "₹48,000", referrals: 120 },
  { name: "Anita M.", city: "Mumbai", earned: "₹36,400", referrals: 91 },
  { name: "Dev P.", city: "Hyderabad", earned: "₹24,800", referrals: 62 },
  { name: "Kavya R.", city: "Chennai", earned: "₹19,200", referrals: 48 },
];

export default function ReferralContent() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://valor.in/ref/YOUR_CODE";

  function handleCopy() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/5 via-bg to-accent/5">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6"
          >
            <Gift size={16} />
            Earn ₹200 per referral — unlimited
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold text-text leading-tight mb-6"
          >
            Share VALOR,
            <br />
            <span className="gradient-text">Earn Together</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary mb-10 max-w-xl mx-auto"
          >
            Invite friends to India&apos;s top freelance marketplace and earn rewards every time they join and transact.
          </motion.p>

          {/* Referral link box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto"
          >
            <div className="flex items-center bg-white rounded-2xl shadow-xl shadow-primary/10 border border-border p-2 gap-2">
              <div className="flex-1 px-4 py-2.5 text-sm text-text-secondary font-mono truncate">
                {referralLink}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopy}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all shrink-0 ${
                  copied
                    ? "bg-success text-white"
                    : "bg-accent hover:bg-accent-dark text-white hover:shadow-lg hover:shadow-accent/25"
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Link"}
              </motion.button>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              Sign in to get your personal referral link and start tracking earnings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "₹2.4 Cr+", label: "Paid out in referral rewards" },
              { value: "48,000+", label: "Referrals made this month" },
              { value: "₹400", label: "Max reward per referral" },
              { value: "24h", label: "Reward credited within" },
            ].map((stat, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.1} className="text-center">
                <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Three simple steps to start earning referral rewards.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 0.1}>
              <div className="relative text-center p-8 bg-white rounded-3xl border border-border hover:shadow-lg hover:shadow-primary/8 transition-all">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-5 mt-2">
                  <step.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Reward <span className="gradient-text">Tiers</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              The more people you refer, the higher your rewards per referral.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.label} direction="up" delay={i * 0.1}>
                <div className={`relative p-6 rounded-3xl bg-gradient-to-br ${tier.color} border ${tier.popular ? "border-primary shadow-xl shadow-primary/15" : "border-border"} transition-all hover:-translate-y-1`}>
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  )}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${tier.badge}`}>
                    {tier.label}
                  </span>
                  <div className="text-2xl font-bold text-text mb-1">{tier.reward}</div>
                  {tier.bonus && (
                    <div className="text-sm text-success font-medium mb-3">{tier.bonus}</div>
                  )}
                  <div className="text-xs text-text-secondary">
                    {tier.referrals} referrals
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Top Earners */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            <TrendingUp size={16} /> Top Earners This Month
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text">
            Real People, Real Earnings
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topEarners.map((earner, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 0.1}>
              <div className="bg-white rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {earner.name[0]}
                </div>
                <p className="font-semibold text-text">{earner.name}</p>
                <p className="text-xs text-text-secondary mb-3">{earner.city}</p>
                <p className="text-2xl font-bold text-success">{earner.earned}</p>
                <p className="text-xs text-text-secondary mt-1">{earner.referrals} referrals</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start Earning Today
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Create a free account and get your referral link in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2"
              >
                Get My Referral Link <ArrowRight size={18} />
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all backdrop-blur"
              >
                Sign In
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
