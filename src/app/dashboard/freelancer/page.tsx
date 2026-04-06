"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Star,
  Wallet,
  ArrowRight,
  Eye,
  MessageSquare,
  Bell,
  Clock,
} from "lucide-react";

const stats = [
  { label: "Active Orders", value: "8", sub: "+2 this week", icon: ShoppingBag, color: "bg-primary/10 text-primary" },
  { label: "Balance", value: "₹12,400", sub: "Available to withdraw", icon: Wallet, color: "bg-success/10 text-success" },
  { label: "Avg Rating", value: "4.9", sub: "From 124 reviews", icon: Star, color: "bg-accent/10 text-accent" },
  { label: "Gig Views", value: "2,840", sub: "Last 30 days", icon: Eye, color: "bg-purple-100 text-purple-600" },
];

const recentOrders = [
  { id: "#1042", buyer: "Arjun S.", gig: "Logo Design – Premium", amount: "₹3,500", status: "In Progress", dueIn: "2 days" },
  { id: "#1041", buyer: "Meera K.", gig: "UI/UX Design – 5 screens", amount: "₹8,000", status: "In Review", dueIn: "Today" },
  { id: "#1040", buyer: "Rohan D.", gig: "Brand Identity Pack", amount: "₹12,000", status: "Completed", dueIn: null },
  { id: "#1039", buyer: "Fatima N.", gig: "Social Media Kit", amount: "₹2,200", status: "Completed", dueIn: null },
];

const statusStyle: Record<string, string> = {
  "In Progress": "bg-primary/10 text-primary",
  "In Review": "bg-accent/10 text-accent",
  "Completed": "bg-success/10 text-success",
  "Dispute": "bg-error/10 text-error",
};

const notifications = [
  { text: "New order from Arjun S. for Logo Design", time: "2h ago" },
  { text: "Meera K. sent a revision request", time: "5h ago" },
  { text: "Your balance of ₹8,000 is ready to withdraw", time: "1d ago" },
];

export default function FreelancerOverviewPage() {
  return (
    <div className="p-6 sm:p-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-text">Good morning, Priya!</h1>
          <p className="text-text-secondary text-sm mt-1">Here&apos;s what&apos;s happening with your freelance business.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl bg-white border border-border hover:bg-card transition-colors">
            <Bell size={20} className="text-text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>
          <Link
            href="/dashboard/freelancer/gigs"
            className="px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            + New Gig
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-text">{stat.value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{stat.sub}</p>
            <p className="text-xs font-medium text-text mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-text">Recent Orders</h2>
            <Link href="/dashboard/freelancer/orders" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{order.gig}</p>
                  <p className="text-xs text-text-secondary">{order.id} · {order.buyer}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-text">{order.amount}</p>
                  {order.dueIn && (
                    <p className="text-xs text-text-secondary flex items-center gap-1 justify-end">
                      <Clock size={10} /> {order.dueIn}
                    </p>
                  )}
                </div>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[order.status]}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-text">Notifications</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">3 new</span>
          </div>
          <div className="space-y-4">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-text">{n.text}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-text mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard/freelancer/messages" className="p-3 bg-card rounded-xl text-center hover:bg-border transition-colors">
                <MessageSquare size={18} className="text-primary mx-auto mb-1" />
                <p className="text-xs text-text">Messages</p>
              </Link>
              <Link href="/dashboard/freelancer/wallet" className="p-3 bg-card rounded-xl text-center hover:bg-border transition-colors">
                <Wallet size={18} className="text-success mx-auto mb-1" />
                <p className="text-xs text-text">Withdraw</p>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
