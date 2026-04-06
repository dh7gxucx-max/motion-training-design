"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Eye, Star, Edit2, Trash2, MoreVertical, ToggleLeft, ToggleRight } from "lucide-react";

const gigs = [
  {
    id: 1,
    title: "I will design a modern logo for your brand",
    category: "Logo & Brand Identity",
    price: "₹1,500",
    rating: 4.9,
    reviews: 48,
    orders: 3,
    views: 820,
    status: "active",
  },
  {
    id: 2,
    title: "I will create a full UI/UX design for your app",
    category: "UX Design",
    price: "₹8,000",
    rating: 5.0,
    reviews: 31,
    orders: 2,
    views: 1240,
    status: "active",
  },
  {
    id: 3,
    title: "I will design a brand identity package",
    category: "Logo & Brand Identity",
    price: "₹12,000",
    rating: 4.8,
    reviews: 19,
    orders: 0,
    views: 340,
    status: "paused",
  },
];

export default function FreelancerGigsPage() {
  const [gigList, setGigList] = useState(gigs);

  function toggleStatus(id: number) {
    setGigList((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, status: g.status === "active" ? "paused" : "active" } : g
      )
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">My Gigs</h1>
          <p className="text-text-secondary text-sm mt-1">Manage and monitor your service listings.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25">
          <Plus size={16} /> Create Gig
        </button>
      </motion.div>

      <div className="space-y-4">
        {gigList.map((gig, i) => (
          <motion.div
            key={gig.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-all"
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 shrink-0 flex items-center justify-center text-2xl font-black text-primary/20">
                {gig.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-text line-clamp-1">{gig.title}</h3>
                    <p className="text-xs text-text-secondary mt-0.5">{gig.category}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        gig.status === "active" ? "bg-success/10 text-success" : "bg-card text-text-secondary"
                      }`}
                    >
                      {gig.status}
                    </span>
                    <button
                      onClick={() => toggleStatus(gig.id)}
                      className="text-text-secondary hover:text-primary transition-colors"
                    >
                      {gig.status === "active" ? <ToggleRight size={22} className="text-success" /> : <ToggleLeft size={22} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="text-sm font-bold text-text">From {gig.price}</span>
                  <span className="flex items-center gap-1 text-sm text-text-secondary">
                    <Star size={13} className="text-accent fill-accent" /> {gig.rating} ({gig.reviews})
                  </span>
                  <span className="flex items-center gap-1 text-sm text-text-secondary">
                    <Eye size={13} /> {gig.views} views
                  </span>
                  <span className="text-sm text-text-secondary">{gig.orders} active orders</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button className="p-2 rounded-lg hover:bg-card transition-colors text-text-secondary hover:text-primary">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-error/10 transition-colors text-text-secondary hover:text-error">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {gigList.length === 0 && (
        <div className="text-center py-20 text-text-secondary">
          <p className="mb-4">You have no gigs yet.</p>
          <button className="px-5 py-2.5 bg-accent text-white rounded-xl font-medium">
            Create Your First Gig
          </button>
        </div>
      )}
    </div>
  );
}
