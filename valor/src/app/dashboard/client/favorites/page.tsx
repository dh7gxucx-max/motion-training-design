"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart } from "lucide-react";

const favorites = [
  { id: 1, title: "Professional Logo Design for Your Business", seller: "Priya S.", rating: 4.9, reviews: 124, price: "₹1,500", category: "Logo Design" },
  { id: 2, title: "Full-Stack Web Development – React & Node.js", seller: "Dev K.", rating: 4.8, reviews: 87, price: "₹12,000", category: "Web Dev" },
  { id: 3, title: "SEO Content Writing – 5 Articles", seller: "Anjali M.", rating: 5.0, reviews: 63, price: "₹2,200", category: "Writing" },
  { id: 4, title: "Social Media Marketing Strategy & Execution", seller: "Rahul V.", rating: 4.9, reviews: 45, price: "₹3,500", category: "Marketing" },
  { id: 5, title: "Video Editing – YouTube Channel Package", seller: "Sneha I.", rating: 4.7, reviews: 38, price: "₹4,000", category: "Video" },
  { id: 6, title: "Brand Identity Package – Logo + Guidelines", seller: "Karan P.", rating: 5.0, reviews: 29, price: "₹8,000", category: "Branding" },
];

export default function ClientFavoritesPage() {
  const [saved, setSaved] = useState(favorites.map((f) => f.id));

  function toggleFav(id: number) {
    setSaved((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }

  const visible = favorites.filter((f) => saved.includes(f.id));

  return (
    <div className="p-6 sm:p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Favorites</h1>
        <p className="text-text-secondary text-sm mt-1">{visible.length} saved services.</p>
      </motion.div>

      {visible.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">
          <Heart size={40} className="mx-auto mb-3 opacity-20" />
          <p>No favorites yet. Browse services and save the ones you like!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((fav, i) => (
            <motion.div key={fav.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/8 transition-all group">
              <div className="h-36 bg-gradient-to-br from-primary/10 to-accent/10 relative">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-text/5 select-none">
                  {fav.title[0]}
                </div>
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 text-xs font-medium rounded-full text-text-secondary">
                  {fav.category}
                </span>
                <button onClick={() => toggleFav(fav.id)}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow hover:scale-110 transition-all">
                  <Heart size={14} className="text-error fill-error" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-text line-clamp-2 mb-1 group-hover:text-primary transition-colors">{fav.title}</h3>
                <p className="text-xs text-text-secondary mb-3">{fav.seller}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-text-secondary">
                    <Star size={11} className="text-accent fill-accent" /> {fav.rating} ({fav.reviews})
                  </span>
                  <span className="text-sm font-bold text-text">From {fav.price}</span>
                </div>
                <button className="w-full mt-3 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5">
                  <ShoppingCart size={13} /> Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
