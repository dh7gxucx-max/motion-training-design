"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Star, MessageSquare, CheckCircle } from "lucide-react";

const tabs = ["All", "Active", "In Review", "Completed", "Disputes"];

const orders = [
  { id: "#1042", seller: "Priya S.", gig: "Logo Design – Premium", amount: "₹3,500", status: "Active", due: "2 days", avatar: "P", canReview: false },
  { id: "#1038", seller: "Dev K.", gig: "Website Development – Basic", amount: "₹15,000", status: "In Review", due: "Today", avatar: "D", canReview: false },
  { id: "#1035", seller: "Anjali M.", gig: "Content Writing – 5 articles", amount: "₹2,000", status: "Active", due: "4 days", avatar: "A", canReview: false },
  { id: "#1030", seller: "Rahul V.", gig: "Social Media Kit", amount: "₹1,800", status: "Completed", due: null, avatar: "R", canReview: true },
  { id: "#1025", seller: "Sneha I.", gig: "Brand Identity Pack", amount: "₹8,000", status: "Completed", due: null, avatar: "S", canReview: false },
];

const statusStyle: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  "In Review": "bg-accent/10 text-accent",
  Completed: "bg-success/10 text-success",
  Dispute: "bg-error/10 text-error",
};

export default function ClientOrdersPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? orders : orders.filter((o) => {
    if (activeTab === "Disputes") return o.status === "Dispute";
    return o.status === activeTab;
  });

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">My Orders</h1>
        <p className="text-text-secondary text-sm mt-1">Track all your service orders in one place.</p>
      </motion.div>

      <div className="flex gap-1 bg-card p-1 rounded-xl w-fit mb-6">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? "bg-white text-primary shadow" : "text-text-secondary hover:text-text"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold text-sm shrink-0">
              {order.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text truncate">{order.gig}</p>
              <p className="text-xs text-text-secondary mt-0.5">{order.id} · by {order.seller}</p>
            </div>
            {order.due && (
              <div className="hidden sm:flex items-center gap-1 text-xs text-text-secondary shrink-0">
                <Clock size={12} /> Due in {order.due}
              </div>
            )}
            <p className="font-semibold text-text shrink-0">{order.amount}</p>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${statusStyle[order.status]}`}>
              {order.status}
            </span>
            <div className="flex gap-1 shrink-0">
              <button className="p-2 rounded-lg hover:bg-card transition-colors text-text-secondary">
                <MessageSquare size={15} />
              </button>
              {order.canReview && (
                <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors text-accent">
                  <Star size={15} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-secondary">
            <CheckCircle size={40} className="mx-auto mb-3 opacity-20" />
            <p>No orders here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
