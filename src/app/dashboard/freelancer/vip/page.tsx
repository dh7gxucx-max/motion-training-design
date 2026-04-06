"use client";

import { motion } from "framer-motion";
import { Crown, Check, Star, Zap, TrendingUp } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    color: "from-card to-border",
    badge: "bg-card text-text-secondary",
    features: ["3 active gigs", "Standard search ranking", "Basic analytics", "10% commission"],
    current: false,
  },
  {
    name: "Silver",
    price: "₹999",
    period: "/ month",
    color: "from-primary/5 to-primary/15",
    badge: "bg-primary/10 text-primary",
    features: ["10 active gigs", "Featured badge", "Priority search ranking", "Detailed analytics", "8% commission", "Priority support"],
    current: true,
    popular: true,
  },
  {
    name: "Gold",
    price: "₹1,999",
    period: "/ month",
    color: "from-accent/5 to-accent/15",
    badge: "bg-accent/10 text-accent",
    features: ["25 active gigs", "Gold badge + profile boost", "Top search placement", "Advanced analytics", "6% commission", "Dedicated support", "Early access to features"],
    current: false,
  },
  {
    name: "Platinum",
    price: "₹3,999",
    period: "/ month",
    color: "from-purple-50 to-purple-100",
    badge: "bg-purple-100 text-purple-600",
    features: ["Unlimited gigs", "Platinum verified badge", "#1 search placement", "Full analytics suite", "4% commission", "Personal account manager", "Custom profile URL", "Featured on homepage"],
    current: false,
  },
];

const perks = [
  { icon: TrendingUp, label: "3x more profile views", desc: "VIP profiles appear at the top of search results." },
  { icon: Star, label: "Trust badge", desc: "The VIP badge signals professionalism and builds buyer confidence." },
  { icon: Zap, label: "Faster payouts", desc: "VIP members get cleared funds in 7 days instead of 14." },
];

export default function FreelancerVipPage() {
  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-text">VIP Plans</h1>
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full flex items-center gap-1">
            <Crown size={12} /> Current: Silver
          </span>
        </div>
        <p className="text-text-secondary text-sm">Upgrade your plan to unlock more gigs, better placement, and lower commission.</p>
      </motion.div>

      {/* Plans */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`relative bg-gradient-to-br ${plan.color} rounded-2xl border p-5 ${
              plan.current ? "border-primary shadow-lg shadow-primary/15" : "border-border"
            }`}
          >
            {plan.popular && !plan.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                Popular
              </span>
            )}
            {plan.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-success text-white text-xs font-bold rounded-full">
                Current Plan
              </span>
            )}
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${plan.badge}`}>
              {plan.name}
            </span>
            <div className="mb-4">
              <span className="text-2xl font-bold text-text">{plan.price}</span>
              <span className="text-xs text-text-secondary ml-1">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                  <Check size={13} className="text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            {!plan.current ? (
              <button className="w-full py-2.5 text-sm font-medium rounded-xl transition-all bg-white border border-border hover:border-primary hover:text-primary">
                {plan.name === "Free" ? "Downgrade" : "Upgrade"}
              </button>
            ) : (
              <button disabled className="w-full py-2.5 text-sm font-medium rounded-xl bg-primary/10 text-primary cursor-default">
                Active
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Perks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-border p-6"
      >
        <h2 className="font-semibold text-text mb-5">Why Go VIP?</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {perks.map((perk, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <perk.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{perk.label}</p>
                <p className="text-xs text-text-secondary mt-0.5">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
