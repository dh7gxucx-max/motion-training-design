"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Star, Wallet, Bell, ArrowRight, Clock, Search, Gift } from "lucide-react";

const stats = [
  { label: "Active Orders", value: "3", sub: "2 awaiting delivery", icon: ShoppingBag, color: "bg-primary/10 text-primary" },
  { label: "Wallet Balance", value: "₹5,200", sub: "Available to spend", icon: Wallet, color: "bg-success/10 text-success" },
  { label: "Orders Completed", value: "18", sub: "All time", icon: Star, color: "bg-accent/10 text-accent" },
];

const activeOrders = [
  { id: "#1042", seller: "Priya S.", gig: "Logo Design – Premium", amount: "₹3,500", status: "In Progress", dueIn: "2 days", avatar: "P" },
  { id: "#1038", seller: "Dev K.", gig: "Website Development – Basic", amount: "₹15,000", status: "In Review", dueIn: "Today", avatar: "D" },
  { id: "#1035", seller: "Anjali M.", gig: "Content Writing – 5 articles", amount: "₹2,000", status: "In Progress", dueIn: "4 days", avatar: "A" },
];

const recommendations = [
  { title: "Social Media Management", seller: "Rahul V.", rating: 4.8, price: "₹1,200", category: "Marketing" },
  { title: "App UI Design – 10 screens", seller: "Sneha I.", rating: 5.0, price: "₹12,000", category: "Design" },
  { title: "SEO Optimization", seller: "Karan P.", rating: 4.9, price: "₹3,500", category: "SEO" },
];

const statusStyle: Record<string, string> = {
  "In Progress": "bg-primary/10 text-primary",
  "In Review": "bg-accent/10 text-accent",
  Completed: "bg-success/10 text-success",
};

function useBonusCountdown(seconds: number) {
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

export default function ClientOverviewPage() {
  const bonusTimer = useBonusCountdown(48000);
  return (
    <div className="p-6 sm:p-8 max-w-7xl">
      {/* Active bonus promo strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-5 mb-6 bg-gradient-to-r from-accent via-accent-dark to-primary text-white shadow-lg shadow-accent/20"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
            <Gift size={22} />
          </div>
          <div className="flex-1">
            <p className="font-semibold">
              Your +25% top-up bonus is active
            </p>
            <p className="text-sm text-white/80">
              Expires in{" "}
              <span className="font-mono font-semibold">{bonusTimer}</span> · top
              up now to lock in the boost.
            </p>
          </div>
          <Link
            href="/dashboard/client/wallet"
            className="px-4 py-2 bg-white text-accent rounded-xl text-sm font-semibold hover:bg-white/90 transition-all shrink-0"
          >
            Top up now
          </Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Good morning, Arjun!</h1>
          <p className="text-text-secondary text-sm mt-1">Track your orders and discover new services.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl bg-white border border-border hover:bg-card transition-colors">
            <Bell size={20} className="text-text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>
          <Link href="/catalog" className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25">
            <Search size={15} /> Browse Services
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-text">{stat.value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{stat.sub}</p>
            <p className="text-xs font-medium text-text mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Active Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="lg:col-span-3 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-text">Active Orders</h2>
            <Link href="/dashboard/client/orders" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {order.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{order.gig}</p>
                  <p className="text-xs text-text-secondary">{order.id} · by {order.seller}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-text">{order.amount}</p>
                  <p className="text-xs text-text-secondary flex items-center gap-1 justify-end">
                    <Clock size={10} /> {order.dueIn}
                  </p>
                </div>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[order.status]}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-text">Recommended</h2>
            <Link href="/catalog" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
              Browse <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recommendations.map((item, i) => (
              <div key={i} className="p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-text line-clamp-1">{item.title}</p>
                  <p className="text-sm font-bold text-accent shrink-0">{item.price}</p>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-text-secondary">{item.seller}</span>
                  <span className="text-xs text-text-secondary flex items-center gap-0.5">
                    <Star size={11} className="text-accent fill-accent" /> {item.rating}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-card rounded-full text-text-secondary">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
