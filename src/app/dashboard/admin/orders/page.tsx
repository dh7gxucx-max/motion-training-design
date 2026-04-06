"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Eye, MessageSquare } from "lucide-react";

const orders = [
  { id: "#9042", buyer: "Arjun S.", seller: "Priya S.", gig: "Logo Design Premium", amount: "₹3,500", date: "Mar 28", status: "Active", dispute: false },
  { id: "#9038", buyer: "Meera K.", seller: "Dev K.", gig: "Website Development", amount: "₹15,000", date: "Mar 22", status: "In Review", dispute: false },
  { id: "#9030", buyer: "Rohit T.", seller: "Vikram R.", gig: "Social Media Kit", amount: "₹1,800", date: "Mar 18", status: "Dispute", dispute: true },
  { id: "#9025", buyer: "Nisha P.", seller: "Anjali M.", gig: "Content Pack – 10 articles", amount: "₹4,000", date: "Mar 15", status: "Completed", dispute: false },
  { id: "#9020", buyer: "Karan P.", seller: "Sneha I.", gig: "SEO Setup", amount: "₹2,500", date: "Mar 10", status: "Dispute", dispute: true },
];

const statusStyle: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  "In Review": "bg-accent/10 text-accent",
  Completed: "bg-success/10 text-success",
  Dispute: "bg-error/10 text-error",
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? orders : orders.filter((o) => {
    if (filter === "Disputes") return o.dispute;
    return o.status === filter;
  });

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Orders</h1>
        <p className="text-text-secondary text-sm mt-1">Overview of platform transactions and disputes.</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Orders", value: "9,840", color: "text-primary" },
          { label: "Active", value: "3,204", color: "text-primary" },
          { label: "Completed", value: "6,424", color: "text-success" },
          { label: "Open Disputes", value: "12", color: "text-error" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {["All", "Active", "In Review", "Completed", "Disputes"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:text-text"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              {["Order ID", "Buyer", "Seller", "Gig", "Amount", "Date", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-text-secondary px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors">
                <td className="px-4 py-3 text-sm font-mono text-text">{order.id}</td>
                <td className="px-4 py-3 text-sm text-text">{order.buyer}</td>
                <td className="px-4 py-3 text-sm text-text">{order.seller}</td>
                <td className="px-4 py-3 text-sm text-text-secondary max-w-[200px] truncate">{order.gig}</td>
                <td className="px-4 py-3 text-sm font-semibold text-text">{order.amount}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{order.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-card transition-colors text-text-secondary"><Eye size={14} /></button>
                    {order.dispute && (
                      <button className="p-1.5 rounded-lg hover:bg-error/10 text-error transition-colors" title="Handle Dispute">
                        <AlertTriangle size={14} />
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"><MessageSquare size={14} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
