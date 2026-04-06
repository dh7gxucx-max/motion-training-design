"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Bell, Image, Plus, Edit2, Trash2 } from "lucide-react";

const tabs = ["Blog Posts", "Banners", "Notifications"];

const blogPosts = [
  { id: 1, title: "Top 10 Freelance Skills in Demand for 2026", status: "Published", date: "Feb 28, 2026", views: 4820 },
  { id: 2, title: "How to Create a Winning Gig", status: "Published", date: "Mar 28, 2026", views: 3241 },
  { id: 3, title: "Referral Program Announcement", status: "Draft", date: "Apr 1, 2026", views: 0 },
];

const banners = [
  { id: 1, title: "Spring Sale – 20% off VIP Silver", placement: "Homepage Hero", active: true, expires: "Apr 15, 2026" },
  { id: 2, title: "New Freelancer Bonus – ₹500 welcome reward", placement: "Dashboard Banner", active: true, expires: "Apr 30, 2026" },
  { id: 3, title: "Refer 5 friends, get VIP Silver free", placement: "Referral Page", active: false, expires: "Expired" },
];

const notifications = [
  { id: 1, title: "Platform maintenance on April 5", target: "All Users", sent: "Mar 30, 2026" },
  { id: 2, title: "New gig categories are live!", target: "Freelancers", sent: "Mar 25, 2026" },
  { id: 3, title: "Your referral earned ₹250", target: "Referrers", sent: "Mar 20, 2026" },
];

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("Blog Posts");

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Content Management</h1>
          <p className="text-text-secondary text-sm mt-1">Manage blog posts, banners, and platform notifications.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-all">
          <Plus size={16} /> Create New
        </button>
      </motion.div>

      <div className="flex gap-1 bg-card p-1 rounded-xl w-fit mb-6">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-white text-primary shadow" : "text-text-secondary hover:text-text"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Blog Posts" && (
        <div className="space-y-3">
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text truncate">{post.title}</p>
                <p className="text-xs text-text-secondary">{post.date} · {post.views.toLocaleString()} views</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${post.status === "Published" ? "bg-success/10 text-success" : "bg-card text-text-secondary"}`}>
                {post.status}
              </span>
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-card transition-colors text-text-secondary"><Edit2 size={15} /></button>
                <button className="p-2 rounded-lg hover:bg-error/10 transition-colors text-error"><Trash2 size={15} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "Banners" && (
        <div className="space-y-3">
          {banners.map((banner, i) => (
            <motion.div key={banner.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Image size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text truncate">{banner.title}</p>
                <p className="text-xs text-text-secondary">{banner.placement} · Expires: {banner.expires}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${banner.active ? "bg-success/10 text-success" : "bg-card text-text-secondary"}`}>
                {banner.active ? "Active" : "Inactive"}
              </span>
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-card transition-colors text-text-secondary"><Edit2 size={15} /></button>
                <button className="p-2 rounded-lg hover:bg-error/10 transition-colors text-error"><Trash2 size={15} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="space-y-3">
          {notifications.map((notif, i) => (
            <motion.div key={notif.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Bell size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text truncate">{notif.title}</p>
                <p className="text-xs text-text-secondary">Sent to: {notif.target} · {notif.sent}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">Sent</span>
              <button className="p-2 rounded-lg hover:bg-error/10 transition-colors text-error"><Trash2 size={15} /></button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
