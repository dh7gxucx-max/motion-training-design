"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Shield, Camera, Save } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function ClientSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("Arjun Singh");
  const [email, setEmail] = useState("arjun@example.com");

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your account preferences.</p>
      </motion.div>

      <div className="flex gap-6">
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-card hover:text-text"}`}>
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-2xl font-bold">A</div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-accent text-white rounded-full flex items-center justify-center shadow">
                    <Camera size={13} />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-text">{name}</p>
                  <p className="text-sm text-text-secondary">Client Account</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Phone</label>
                  <div className="flex">
                    <span className="px-3 py-3 bg-card border border-r-0 border-border rounded-l-xl text-sm text-text-secondary">+91</span>
                    <input defaultValue="93456 78901" className="flex-1 px-4 py-3 border border-border rounded-r-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">Location</label>
                  <input defaultValue="Delhi, India" className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-all">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "payment" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-text">Saved Payment Methods</h2>
              {[
                { label: "arjun@upi", type: "UPI", primary: true },
                { label: "Visa ••••3456", type: "Credit Card", primary: false },
              ].map((pm, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">{pm.label}</p>
                    <p className="text-xs text-text-secondary">{pm.type}</p>
                  </div>
                  {pm.primary && <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">Primary</span>}
                  <button className="text-xs text-error hover:underline">Remove</button>
                </div>
              ))}
              <button className="w-full py-3 border border-dashed border-border rounded-xl text-sm text-text-secondary hover:border-accent hover:text-accent transition-all">
                + Add New Payment Method
              </button>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-text mb-5">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Order updates", sub: "Delivery, revisions, and status changes" },
                  { label: "Messages from sellers", sub: "Chat and order updates" },
                  { label: "Promotions & offers", sub: "Discounts and special deals" },
                  { label: "Referral bonuses", sub: "When your referrals sign up" },
                  { label: "Platform news", sub: "New features and announcements" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-text">{item.label}</p>
                      <p className="text-xs text-text-secondary">{item.sub}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-border rounded-full peer peer-checked:bg-accent transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-border p-6 space-y-5">
              <h2 className="font-semibold text-text">Security Settings</h2>
              <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
                <p className="text-sm text-success font-medium">Account secured with Phone OTP</p>
                <p className="text-xs text-text-secondary mt-1">Last login: Today, 8:45 AM from Delhi, India</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text block mb-1.5">Change Password</label>
                <input type="password" placeholder="New password" className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm mb-3" />
                <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm" />
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-all">
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
