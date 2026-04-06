"use client";

import { motion } from "framer-motion";
import { Save, Shield, Bell, Globe, Percent } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Platform Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Configure global platform parameters.</p>
      </motion.div>

      <div className="space-y-6">
        {/* Commission */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Percent size={18} className="text-primary" />
            <h2 className="font-semibold text-text">Commission Rates</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Free Plan Commission", value: "10%" },
              { label: "VIP Silver Commission", value: "8%" },
              { label: "VIP Gold Commission", value: "6%" },
              { label: "VIP Platinum Commission", value: "4%" },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-sm font-medium text-text block mb-1.5">{item.label}</label>
                <input defaultValue={item.value}
                  className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform Rules */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe size={18} className="text-accent" />
            <h2 className="font-semibold text-text">Platform Rules</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Min Order Amount", value: "₹100" },
              { label: "Max Order Amount", value: "₹5,00,000" },
              { label: "Escrow Release (days)", value: "7" },
              { label: "Dispute Resolution (days)", value: "14" },
              { label: "Min Withdrawal Amount", value: "₹500" },
              { label: "Max Withdrawal / Day", value: "₹50,000" },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-sm font-medium text-text block mb-1.5">{item.label}</label>
                <input defaultValue={item.value}
                  className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield size={18} className="text-success" />
            <h2 className="font-semibold text-text">Security & Maintenance</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "Maintenance Mode", desc: "Show maintenance page to all users" },
              { label: "New Registrations", desc: "Allow new user signups" },
              { label: "KYC Required for Withdrawal", desc: "Mandatory KYC before first withdrawal" },
              { label: "Auto-approve Gigs (Trusted Sellers)", desc: "Skip manual moderation for trusted sellers" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text">{item.label}</p>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i !== 0} className="sr-only peer" />
                  <div className="w-10 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all shadow-lg shadow-primary/25">
            <Save size={16} /> Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
