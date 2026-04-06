"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Ban, CheckCircle, Filter } from "lucide-react";

const users = [
  { id: 1, name: "Priya Sharma", email: "priya@gmail.com", type: "Freelancer", joined: "Jan 15, 2026", status: "Active", kyc: "Verified", orders: 124 },
  { id: 2, name: "Arjun Singh", email: "arjun@gmail.com", type: "Client", joined: "Feb 3, 2026", status: "Active", kyc: "N/A", orders: 18 },
  { id: 3, name: "Vikram R.", email: "vikram@yahoo.com", type: "Freelancer", joined: "Mar 10, 2026", status: "Active", kyc: "Pending", orders: 4 },
  { id: 4, name: "Meera K.", email: "meera@gmail.com", type: "Client", joined: "Mar 18, 2026", status: "Active", kyc: "N/A", orders: 7 },
  { id: 5, name: "Rohit T.", email: "rohit@gmail.com", type: "Freelancer", joined: "Mar 25, 2026", status: "Suspended", kyc: "Rejected", orders: 0 },
  { id: 6, name: "Anita M.", email: "anita@gmail.com", type: "Freelancer", joined: "Mar 28, 2026", status: "Active", kyc: "Verified", orders: 91 },
];

const kycStyle: Record<string, string> = {
  Verified: "bg-success/10 text-success",
  Pending: "bg-accent/10 text-accent",
  Rejected: "bg-error/10 text-error",
  "N/A": "bg-card text-text-secondary",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || u.type === filter || u.kyc === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">User Management</h1>
        <p className="text-text-secondary text-sm mt-1">Manage users, KYC, and account status.</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-xl outline-none focus:border-primary text-sm bg-white text-text transition-all">
          <option value="All">All Users</option>
          <option value="Freelancer">Freelancers</option>
          <option value="Client">Clients</option>
          <option value="Pending">KYC Pending</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="text-left text-xs font-semibold text-text-secondary px-5 py-3">User</th>
              <th className="text-left text-xs font-semibold text-text-secondary px-5 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-text-secondary px-5 py-3">Joined</th>
              <th className="text-left text-xs font-semibold text-text-secondary px-5 py-3">KYC</th>
              <th className="text-left text-xs font-semibold text-text-secondary px-5 py-3">Orders</th>
              <th className="text-left text-xs font-semibold text-text-secondary px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-text-secondary px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="border-b border-border/50 last:border-0 hover:bg-card/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{user.name}</p>
                      <p className="text-xs text-text-secondary">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-text-secondary">{user.type}</td>
                <td className="px-5 py-3 text-sm text-text-secondary">{user.joined}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${kycStyle[user.kyc]}`}>{user.kyc}</span>
                </td>
                <td className="px-5 py-3 text-sm text-text">{user.orders}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${user.status === "Active" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    {user.kyc === "Pending" && (
                      <button className="p-1.5 rounded-lg hover:bg-success/10 text-success transition-colors" title="Approve KYC">
                        <CheckCircle size={15} />
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-error/10 text-error transition-colors" title={user.status === "Active" ? "Suspend" : "Unsuspend"}>
                      <Ban size={15} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors" title="View Profile">
                      <Shield size={15} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-secondary text-sm">No users found.</div>
        )}
      </div>
    </div>
  );
}
