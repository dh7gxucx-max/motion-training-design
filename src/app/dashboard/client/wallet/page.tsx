"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  CreditCard,
  Smartphone,
  Gift,
  Sparkles,
  Clock,
  TrendingUp,
} from "lucide-react";

const transactions = [
  { type: "debit", desc: "Order #1042 – Logo Design Premium", amount: "-₹3,500", date: "Mar 28" },
  { type: "credit", desc: "Welcome Bonus +25%", amount: "+₹5,000", date: "Mar 25" },
  { type: "debit", desc: "Order #1038 – Website Development", amount: "-₹15,000", date: "Mar 22" },
  { type: "credit", desc: "Wallet Top-up via UPI", amount: "+₹20,000", date: "Mar 20" },
  { type: "credit", desc: "Referral Bonus – Invited Meera K.", amount: "+₹100", date: "Mar 15" },
  { type: "debit", desc: "Order #1035 – Content Writing", amount: "-₹2,000", date: "Mar 10" },
  { type: "credit", desc: "Wallet Top-up via Debit Card", amount: "+₹5,000", date: "Mar 5" },
];

const paymentMethods = [
  { type: "UPI", label: "arjun@upi", icon: Smartphone, primary: true },
  { type: "Card", label: "Visa ••••3456", icon: CreditCard, primary: false },
];

const topupTiers = [
  { amount: 500, bonus: 15, label: "Starter" },
  { amount: 1000, bonus: 20, label: "Saver" },
  { amount: 2000, bonus: 25, label: "Smart", popular: true },
  { amount: 5000, bonus: 30, label: "Pro" },
];

const activeBonuses = [
  {
    title: "Welcome Bonus",
    perc: "+25%",
    desc: "On your next top-up",
    expiresInSec: 86400,
    tone: "accent" as const,
  },
  {
    title: "VIP Boost",
    perc: "+15%",
    desc: "Reserved for VIP members",
    expiresInSec: 172800,
    tone: "primary" as const,
  },
];

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(left / 3600)).padStart(2, "0");
  const mm = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function BonusCard({
  bonus,
}: {
  bonus: (typeof activeBonuses)[number];
}) {
  const timer = useCountdown(bonus.expiresInSec);
  const gradient =
    bonus.tone === "accent"
      ? "from-accent to-accent-dark"
      : "from-primary to-primary-light";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} text-white p-5`}
    >
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="opacity-80" />
          <span className="text-xs uppercase tracking-wider opacity-90">
            {bonus.title}
          </span>
        </div>
        <p className="text-3xl font-bold leading-none mb-1">{bonus.perc}</p>
        <p className="text-xs opacity-80 mb-3">{bonus.desc}</p>
        <div className="flex items-center gap-1.5 text-xs">
          <Clock size={12} />
          <span className="font-mono font-semibold">{timer}</span>
        </div>
      </div>
    </div>
  );
}

export default function ClientWalletPage() {
  const [showTopup, setShowTopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("upi");
  const router = useRouter();

  const amountNum = parseInt(amount || "0", 10);
  const matchedTier =
    [...topupTiers].reverse().find((t) => amountNum >= t.amount) ?? null;

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Wallet</h1>
        <p className="text-text-secondary text-sm mt-1">Add funds and track your spending.</p>
      </motion.div>

      {/* Balance */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-accent to-accent-dark text-white rounded-2xl p-6">
          <Wallet size={24} className="mb-3 opacity-80" />
          <p className="text-3xl font-bold">₹5,200</p>
          <p className="text-sm text-white/70 mt-1">Available Balance</p>
          <button onClick={() => setShowTopup(!showTopup)}
            className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl transition-all backdrop-blur">
            + Add Funds
          </button>
        </motion.div>

        {/* Payment Methods */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-border p-5">
          <h2 className="font-semibold text-text mb-4">Payment Methods</h2>
          <div className="space-y-3">
            {paymentMethods.map((pm, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center text-text-secondary">
                  <pm.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{pm.label}</p>
                  <p className="text-xs text-text-secondary">{pm.type}</p>
                </div>
                {pm.primary && (
                  <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">Primary</span>
                )}
              </div>
            ))}
            <button className="w-full py-2.5 border border-dashed border-border rounded-xl text-sm text-text-secondary hover:border-primary hover:text-primary transition-all">
              + Add Payment Method
            </button>
          </div>
        </motion.div>
      </div>

      {/* Active Bonuses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-text flex items-center gap-2">
            <Sparkles size={16} className="text-accent" /> Active Bonuses
          </h2>
          <span className="text-xs text-text-secondary">
            {activeBonuses.length} active
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {activeBonuses.map((b) => (
            <BonusCard key={b.title} bonus={b} />
          ))}
        </div>
      </motion.div>

      {/* Top-up Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="bg-white rounded-2xl border border-border p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-text flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" /> Top up & save
          </h2>
          <span className="text-xs text-text-secondary">
            Bigger top-ups, bigger bonuses
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {topupTiers.map((tier) => (
            <button
              key={tier.amount}
              onClick={() => {
                setAmount(String(tier.amount));
                setShowTopup(true);
              }}
              className={`relative p-4 rounded-xl border-2 text-left transition-all hover:-translate-y-1 hover:shadow-md ${
                tier.popular
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2 left-3 px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full">
                  POPULAR
                </span>
              )}
              <p className="text-xs text-text-secondary mb-1">{tier.label}</p>
              <p className="text-lg font-bold text-text">₹{tier.amount.toLocaleString()}</p>
              <div
                className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  tier.popular
                    ? "bg-accent text-white"
                    : "bg-success/10 text-success"
                }`}
              >
                +{tier.bonus}%
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top-up Form */}
      {showTopup && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="bg-white rounded-2xl border border-border p-6 mb-6">
          <h2 className="font-semibold text-text mb-4">Add Funds</h2>
          <div className="flex gap-2 mb-4">
            {["upi", "card"].map((m) => (
              <button key={m} onClick={() => setMethod(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${method === m ? "bg-accent text-white" : "bg-card text-text-secondary hover:bg-border"}`}>
                {m === "upi" ? "UPI" : "Debit/Credit Card"}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-text block mb-1.5">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              placeholder="Min ₹100"
              className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" />
            <div className="flex gap-2 mt-2">
              {["500", "1000", "2000", "5000"].map((v) => (
                <button key={v} onClick={() => setAmount(v)}
                  className="px-3 py-1 text-xs bg-card hover:bg-border rounded-lg text-text-secondary transition-all">
                  ₹{v}
                </button>
              ))}
            </div>
            {matchedTier && (
              <div className="flex items-center gap-2 mt-3 p-2.5 bg-success/5 border border-success/20 rounded-lg">
                <Gift size={14} className="text-success shrink-0" />
                <p className="text-xs text-text">
                  You unlock a{" "}
                  <span className="font-semibold text-success">
                    +{matchedTier.bonus}% bonus
                  </span>{" "}
                  — adds{" "}
                  <span className="font-semibold">
                    ₹{Math.round((amountNum * matchedTier.bonus) / 100).toLocaleString()}
                  </span>{" "}
                  free credits.
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowTopup(false)} className="flex-1 py-3 border border-border rounded-xl text-sm font-medium text-text-secondary hover:bg-card transition-all">Cancel</button>
            <button onClick={() => router.push("/auth/register")} className="flex-1 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-sm font-medium transition-all">
              Pay ₹{amount || "0"}
            </button>
          </div>
        </motion.div>
      )}

      {/* Transactions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-border p-6">
        <h2 className="font-semibold text-text mb-5">Transaction History</h2>
        <div className="space-y-3">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tx.type === "credit" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                {tx.type === "credit" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{tx.desc}</p>
                <p className="text-xs text-text-secondary">{tx.date}</p>
              </div>
              <p className={`font-semibold text-sm shrink-0 ${tx.type === "credit" ? "text-success" : "text-error"}`}>{tx.amount}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
