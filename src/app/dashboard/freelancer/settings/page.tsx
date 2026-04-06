"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Globe, Shield, Camera, Save } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "bank", label: "Bank Details", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function FreelancerSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("Priya Sharma");
  const [bio, setBio] = useState("UI/UX designer with 5+ years of experience creating beautiful digital experiences.");
  const [location, setLocation] = useState("Bangalore, India");
  const [email, setEmail] = useState("priya@example.com");

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your account preferences.</p>
      </motion.div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-card hover:text-text"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6 space-y-5"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                    P
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center shadow">
                    <Camera size={13} />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-text">{name}</p>
                  <p className="text-sm text-text-secondary">UI/UX Designer · VIP Silver</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Location</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Phone</label>
                  <div className="flex">
                    <span className="px-3 py-3 bg-card border border-r-0 border-border rounded-l-xl text-sm text-text-secondary">+91</span>
                    <input defaultValue="98765 43210"
                      className="flex-1 px-4 py-3 border border-border rounded-r-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text block mb-1.5">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                  className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none" />
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-all">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "bank" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6 space-y-5"
            >
              <h2 className="font-semibold text-text">Bank Account Details</h2>
              {[
                { label: "Account Holder Name", placeholder: "As per bank records" },
                { label: "Bank Name", placeholder: "e.g. HDFC Bank" },
                { label: "Account Number", placeholder: "Enter account number" },
                { label: "IFSC Code", placeholder: "e.g. HDFC0001234" },
                { label: "UPI ID (optional)", placeholder: "yourname@upi" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-sm font-medium text-text block mb-1.5">{field.label}</label>
                  <input placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
                </div>
              ))}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-all">
                  <Save size={15} /> Save Bank Details
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h2 className="font-semibold text-text mb-5">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "New order received", sub: "Get notified when a buyer places an order" },
                  { label: "Order messages", sub: "Chat messages from buyers" },
                  { label: "Order status updates", sub: "Delivery deadlines and reminders" },
                  { label: "Reviews", sub: "When a buyer leaves a review" },
                  { label: "Wallet & payments", sub: "Balance credited or withdrawn" },
                  { label: "Platform updates", sub: "New features and announcements" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-text">{item.label}</p>
                      <p className="text-xs text-text-secondary">{item.sub}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6 space-y-5"
            >
              <h2 className="font-semibold text-text">Security Settings</h2>
              <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
                <p className="text-sm text-success font-medium">Your account is secured with Phone OTP</p>
                <p className="text-xs text-text-secondary mt-1">Last login: Today, 9:30 AM from Bangalore, India</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text block mb-1.5">Change Password</label>
                <input type="password" placeholder="New password" className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm mb-3" />
                <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-sm font-medium text-text">Two-Factor Authentication</p>
                  <p className="text-xs text-text-secondary">Extra layer of security via authenticator app</p>
                </div>
                <button className="px-4 py-2 text-sm border border-primary text-primary rounded-xl hover:bg-primary/5 transition-all">
                  Enable
                </button>
              </div>
              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-all">
                  <Save size={15} /> Save
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
