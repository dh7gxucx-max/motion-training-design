"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, IndianRupee, TrendingUp, CheckCircle, Clock } from "lucide-react";

const withdrawalRequests = [
  { seller: "Priya S.", amount: "₹12,400", bank: "HDFC ••4521", requested: "Mar 30", status: "Pending" },
  { seller: "Dev K.", amount: "₹8,200", bank: "SBI ••9923", requested: "Mar 30", status: "Pending" },
  { seller: "Anjali M.", amount: "₹4,800", bank: "ICICI ••1234", requested: "Mar 29", status: "Processing" },
  { seller: "Rahul V.", amount: "₹6,000", bank: "Axis ••5678", requested: "Mar 28", status: "Completed" },
];

const recentTx = [
  { type: "escrow", desc: "Order #9042 – Escrow Held", amount: "₹3,500", date: "Mar 28" },
  { type: "commission", desc: "Commission – Order #9038 (8%)", amount: "+₹1,200", date: "Mar 27" },
  { type: "payout", desc: "Payout – Priya S.", amount: "-₹10,800", date: "Mar 25" },
  { type: "commission", desc: "Commission – Order #9030 (8%)", amount: "+₹144", date: "Mar 22" },
  { type: "payout", desc: "Payout – Dev K.", amount: "-₹7,360", date: "Mar 20" },
];

const txColor: Record<string, string> = {
  escrow: "bg-primary/10 text-primary",
  commission: "bg-success/10 text-success",
  payout: "bg-error/10 text-error",
};

export default function AdminFinancePage() {
  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Finance</h1>
        <p className="text-text-secondary text-sm mt-1">Platform revenue, escrow, and payout management.</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Platform Revenue (MTD)", value: "₹48.2L", icon: IndianRupee, color: "from-primary to-primary-light" },
          { label: "Escrow Held", value: "₹1.84Cr", icon: Clock, color: "from-accent to-accent-light" },
          { label: "Payouts This Month", value: "₹3.2Cr", icon: ArrowUpRight, color: "from-success to-green-400" },
          { label: "Pending Withdrawals", value: "₹68,400", icon: TrendingUp, color: "from-purple-600 to-purple-400" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${card.color} text-white rounded-2xl p-5`}>
            <card.icon size={20} className="mb-3 opacity-80" />
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-xs text-white/70 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Withdrawal Requests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-text mb-5">Withdrawal Requests</h2>
          <div className="space-y-3">
            {withdrawalRequests.map((req, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {req.seller[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text">{req.seller}</p>
                  <p className="text-xs text-text-secondary">{req.bank} · {req.requested}</p>
                </div>
                <p className="font-semibold text-sm text-text">{req.amount}</p>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  req.status === "Completed" ? "bg-success/10 text-success" :
                  req.status === "Processing" ? "bg-primary/10 text-primary" :
                  "bg-accent/10 text-accent"
                }`}>
                  {req.status}
                </span>
                {req.status === "Pending" && (
                  <button className="p-1.5 rounded-lg hover:bg-success/10 text-success transition-colors">
                    <CheckCircle size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-text mb-5">Recent Transactions</h2>
          <div className="space-y-3">
            {recentTx.map((tx, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${txColor[tx.type]}`}>
                  {tx.type === "payout" ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{tx.desc}</p>
                  <p className="text-xs text-text-secondary">{tx.date}</p>
                </div>
                <p className={`text-sm font-semibold shrink-0 ${tx.amount.startsWith("+") ? "text-success" : tx.amount.startsWith("-") ? "text-error" : "text-text"}`}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
