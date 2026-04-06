"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Users, IndianRupee, Gift } from "lucide-react";

const referrals = [
  { name: "Meera K.", joined: "Mar 20, 2026", status: "Active", earned: "₹100" },
  { name: "Rohit T.", joined: "Feb 15, 2026", status: "Active", earned: "₹100" },
  { name: "Nisha P.", joined: "Jan 30, 2026", status: "Pending", earned: "—" },
];

export default function ClientReferralsPage() {
  const [copied, setCopied] = useState(false);
  const link = "https://valor.in/ref/ARJUN2024";

  function handleCopy() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Referral Program</h1>
        <p className="text-text-secondary text-sm mt-1">Invite friends and earn ₹100 per successful referral.</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Referrals", value: "3", icon: Users, color: "bg-accent/10 text-accent" },
          { label: "Total Earned", value: "₹200", icon: IndianRupee, color: "bg-success/10 text-success" },
          { label: "Pending Bonus", value: "₹100", icon: Gift, color: "bg-primary/10 text-primary" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-border p-4 text-center">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
              <stat.icon size={18} />
            </div>
            <p className="text-xl font-bold text-text">{stat.value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-border p-5 mb-6">
        <h2 className="font-semibold text-text mb-3">Your Referral Link</h2>
        <div className="flex items-center gap-2 bg-card rounded-xl p-2">
          <span className="flex-1 text-sm font-mono text-text-secondary px-2 truncate">{link}</span>
          <button onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${copied ? "bg-success text-white" : "bg-accent text-white hover:bg-accent-dark"}`}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-text-secondary mt-2">Your friend gets ₹100 off their first order when they sign up with your link.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-border p-5">
        <h2 className="font-semibold text-text mb-4">Your Referrals</h2>
        <div className="space-y-3">
          {referrals.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-sm font-bold shrink-0">
                {r.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text">{r.name}</p>
                <p className="text-xs text-text-secondary">Joined {r.joined}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${r.status === "Active" ? "bg-success/10 text-success" : "bg-card text-text-secondary"}`}>
                {r.status}
              </span>
              <p className="text-sm font-semibold text-text">{r.earned}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
