"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Wallet, Shield, Clock, CheckCircle } from "lucide-react";

const transactions = [
  { id: "T001", type: "credit", desc: "Order #1040 – Brand Identity Pack", amount: "+₹10,800", date: "Mar 28", status: "Completed" },
  { id: "T002", type: "credit", desc: "Order #1039 – Social Media Kit", amount: "+₹1,980", date: "Mar 25", status: "Completed" },
  { id: "T003", type: "debit", desc: "Withdrawal to Bank ••4521", amount: "-₹8,000", date: "Mar 22", status: "Completed" },
  { id: "T004", type: "credit", desc: "Order #1036 – Logo Design", amount: "+₹2,975", date: "Mar 18", status: "Completed" },
  { id: "T005", type: "debit", desc: "VIP Silver Plan – Monthly", amount: "-₹999", date: "Mar 15", status: "Completed" },
  { id: "T006", type: "credit", desc: "Referral Bonus – Invited Karan P.", amount: "+₹200", date: "Mar 10", status: "Completed" },
];

export default function FreelancerWalletPage() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Wallet</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your earnings and withdrawals.</p>
      </motion.div>

      {/* Balance Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Available Balance", value: "₹12,400", sub: "Ready to withdraw", color: "from-primary to-primary-light", icon: Wallet },
          { label: "Pending Clearance", value: "₹9,300", sub: "Clears in 7–14 days", color: "from-accent to-accent-light", icon: Clock },
          { label: "Total Earned", value: "₹1,84,500", sub: "All time", color: "from-success to-green-400", icon: CheckCircle },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${card.color} text-white rounded-2xl p-5`}
          >
            <card.icon size={20} className="mb-3 opacity-80" />
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-xs opacity-75 mt-1">{card.sub}</p>
            <p className="text-sm font-medium mt-2">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Withdraw */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-border p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-text">Withdraw Funds</h2>
          <span className="text-xs text-success bg-success/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Shield size={12} /> KYC Verified
          </span>
        </div>

        {!showWithdraw ? (
          <div className="flex items-center gap-4">
            <div className="flex-1 p-4 bg-card rounded-xl">
              <p className="text-xs text-text-secondary">Linked Bank Account</p>
              <p className="font-medium text-text mt-1">HDFC Bank ••••4521</p>
            </div>
            <button
              onClick={() => setShowWithdraw(true)}
              className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-medium text-sm rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              Withdraw Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-text block mb-1.5">Amount (min ₹500)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowWithdraw(false)}
                className="flex-1 py-3 border border-border rounded-xl text-sm font-medium text-text-secondary hover:bg-card transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 bg-success hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-all">
                Confirm Withdrawal
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-border p-6"
      >
        <h2 className="font-semibold text-text mb-5">Transaction History</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                tx.type === "credit" ? "bg-success/10 text-success" : "bg-error/10 text-error"
              }`}>
                {tx.type === "credit" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{tx.desc}</p>
                <p className="text-xs text-text-secondary">{tx.date} · {tx.id}</p>
              </div>
              <p className={`font-semibold text-sm shrink-0 ${tx.type === "credit" ? "text-success" : "text-error"}`}>
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
