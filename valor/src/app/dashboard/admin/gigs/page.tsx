"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";

const gigs = [
  { id: 1, title: "I will design a professional logo for your business", seller: "Priya S.", category: "Logo Design", price: "₹1,500", submitted: "Mar 30, 2026", status: "Pending" },
  { id: 2, title: "I will build a React website with Next.js", seller: "Dev K.", category: "Web Dev", price: "₹8,000", submitted: "Mar 30, 2026", status: "Pending" },
  { id: 3, title: "I will write SEO-optimized blog content", seller: "Anjali M.", category: "Writing", price: "₹800", submitted: "Mar 29, 2026", status: "Pending" },
  { id: 4, title: "I will create Instagram reels for your brand", seller: "Rahul V.", category: "Video", price: "₹2,500", submitted: "Mar 29, 2026", status: "Approved" },
  { id: 5, title: "I will set up your Google Ads campaign", seller: "Sneha I.", category: "Marketing", price: "₹3,000", submitted: "Mar 28, 2026", status: "Rejected" },
];

const statusStyle: Record<string, string> = {
  Pending: "bg-accent/10 text-accent",
  Approved: "bg-success/10 text-success",
  Rejected: "bg-error/10 text-error",
};

export default function AdminGigsPage() {
  const [filter, setFilter] = useState("All");
  const [gigList, setGigList] = useState(gigs);

  const filtered = filter === "All" ? gigList : gigList.filter((g) => g.status === filter);

  function updateStatus(id: number, status: "Approved" | "Rejected") {
    setGigList((prev) => prev.map((g) => g.id === id ? { ...g, status } : g));
  }

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Gig Moderation</h1>
        <p className="text-text-secondary text-sm mt-1">Review and approve or reject gig submissions.</p>
      </motion.div>

      <div className="flex gap-2 mb-6">
        {["All", "Pending", "Approved", "Rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "bg-primary text-white shadow" : "bg-white border border-border text-text-secondary hover:text-text"}`}>
            {f}
            {f === "Pending" && <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">{gigs.filter(g => g.status === "Pending").length}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((gig, i) => (
          <motion.div key={gig.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl font-black text-text/10 shrink-0">
              {gig.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text truncate">{gig.title}</p>
              <p className="text-xs text-text-secondary mt-0.5">{gig.seller} · {gig.category} · {gig.submitted}</p>
            </div>
            <p className="font-semibold text-text shrink-0">From {gig.price}</p>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${statusStyle[gig.status]}`}>
              {gig.status}
            </span>
            {gig.status === "Pending" && (
              <div className="flex gap-1 shrink-0">
                <button onClick={() => updateStatus(gig.id, "Approved")}
                  className="p-2 rounded-lg hover:bg-success/10 text-success transition-colors" title="Approve">
                  <CheckCircle size={18} />
                </button>
                <button onClick={() => updateStatus(gig.id, "Rejected")}
                  className="p-2 rounded-lg hover:bg-error/10 text-error transition-colors" title="Reject">
                  <XCircle size={18} />
                </button>
              </div>
            )}
            <button className="p-2 rounded-lg hover:bg-card transition-colors text-text-secondary shrink-0" title="Preview">
              <Eye size={16} />
            </button>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-secondary">
            <CheckCircle size={40} className="mx-auto mb-3 opacity-20" />
            <p>No gigs in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
