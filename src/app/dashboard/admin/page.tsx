"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, ShoppingBag, IndianRupee, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Users", value: "54,280", sub: "+1,240 this week", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Active Gigs", value: "18,934", sub: "312 pending review", icon: Briefcase, color: "bg-accent/10 text-accent" },
  { label: "Orders This Month", value: "9,840", sub: "+23% vs last month", icon: ShoppingBag, color: "bg-success/10 text-success" },
  { label: "Platform Revenue", value: "₹48.2L", sub: "Month to date", icon: IndianRupee, color: "bg-purple-100 text-purple-600" },
];

const pendingActions = [
  { label: "Gigs pending moderation", count: 47, href: "/dashboard/admin/gigs", urgent: true },
  { label: "KYC verifications pending", count: 23, href: "/dashboard/admin/users", urgent: true },
  { label: "Open disputes", count: 12, href: "/dashboard/admin/orders", urgent: false },
  { label: "Withdrawal requests", count: 38, href: "/dashboard/admin/finance", urgent: false },
];

const recentUsers = [
  { name: "Suresh Kumar", email: "suresh@gmail.com", type: "Freelancer", joined: "2h ago", status: "Active" },
  { name: "Nisha Patel", email: "nisha@yahoo.com", type: "Client", joined: "4h ago", status: "Active" },
  { name: "Vikram Singh", email: "vikram@gmail.com", type: "Freelancer", joined: "6h ago", status: "KYC Pending" },
  { name: "Priya Rao", email: "priya.rao@gmail.com", type: "Client", joined: "8h ago", status: "Active" },
];

export default function AdminOverviewPage() {
  return (
    <div className="p-6 sm:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">Platform overview — April 2, 2026</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Actions required */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle size={18} className="text-error" />
            <h2 className="font-semibold text-text">Actions Required</h2>
          </div>
          <div className="space-y-3">
            {pendingActions.map((action, i) => (
              <Link key={i} href={action.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-card transition-colors group">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${action.urgent ? "bg-error/10 text-error" : "bg-primary/10 text-primary"}`}>
                    {action.count}
                  </span>
                  <span className="text-sm text-text">{action.label}</span>
                </div>
                <ArrowRight size={14} className="text-text-secondary group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-text">Recent Registrations</h2>
            <Link href="/dashboard/admin/users" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {user.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{user.name}</p>
                  <p className="text-xs text-text-secondary">{user.email}</p>
                </div>
                <span className="text-xs px-2 py-0.5 bg-card text-text-secondary rounded-full">{user.type}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${user.status === "Active" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}`}>
                  {user.status}
                </span>
                <span className="text-xs text-text-secondary shrink-0">{user.joined}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
