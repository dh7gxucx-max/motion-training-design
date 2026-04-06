"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { id: 1, seller: "Priya S.", avatar: "P", gig: "Brand Identity Pack", rating: 5, comment: "Outstanding work! The designs were exactly what we needed.", date: "Mar 12, 2026" },
  { id: 2, seller: "Dev K.", avatar: "D", gig: "Web Development – 5 pages", rating: 4, comment: "Good quality, met all requirements. Slight delay in delivery.", date: "Feb 28, 2026" },
  { id: 3, seller: "Anjali M.", avatar: "A", gig: "Content Writing – Blog Pack", rating: 5, comment: "Excellent writing! SEO-optimized and well-researched articles.", date: "Feb 15, 2026" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? "text-accent fill-accent" : "text-border"} />
      ))}
    </div>
  );
}

export default function ClientReviewsPage() {
  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">My Reviews</h1>
        <p className="text-text-secondary text-sm mt-1">Reviews you have left for freelancers.</p>
      </motion.div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold text-sm shrink-0">
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-text">{review.seller}</p>
                  <p className="text-xs text-text-secondary">{review.date}</p>
                </div>
                <p className="text-xs text-text-secondary mb-2">{review.gig}</p>
                <Stars count={review.rating} />
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-20 text-text-secondary">
          <Star size={40} className="mx-auto mb-3 opacity-20" />
          <p>You haven&apos;t left any reviews yet.</p>
        </div>
      )}
    </div>
  );
}
