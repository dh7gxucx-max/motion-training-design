"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const reviews = [
  { id: 1, buyer: "Arjun S.", avatar: "A", gig: "Logo Design – Premium", rating: 5, comment: "Absolutely stunning work! Priya understood the brief perfectly and delivered beyond expectations. Will definitely hire again.", date: "Mar 28, 2026" },
  { id: 2, buyer: "Meera K.", avatar: "M", gig: "UI/UX Design – 5 screens", rating: 5, comment: "Professional, fast, and highly creative. The designs were pixel-perfect and ready to hand off to developers.", date: "Mar 20, 2026" },
  { id: 3, buyer: "Rohan D.", avatar: "R", gig: "Brand Identity Pack", rating: 5, comment: "Best designer I've found on VALOR! The brand identity she created truly represents our company values.", date: "Mar 12, 2026" },
  { id: 4, buyer: "Fatima N.", avatar: "F", gig: "Social Media Kit", rating: 4, comment: "Great work overall! A few small revisions were needed but she was responsive and fixed everything quickly.", date: "Mar 5, 2026" },
  { id: 5, buyer: "Karan P.", avatar: "K", gig: "Logo Design – Basic", rating: 5, comment: "Quick turnaround and beautiful result. Exactly what I needed for my startup.", date: "Feb 28, 2026" },
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

export default function FreelancerReviewsPage() {
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: reviews.filter((r) => r.rating === n).length,
    pct: Math.round((reviews.filter((r) => r.rating === n).length / reviews.length) * 100),
  }));

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-text">Reviews</h1>
        <p className="text-text-secondary text-sm mt-1">All reviews left by your clients.</p>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-6 mb-6 flex flex-col sm:flex-row gap-8"
      >
        <div className="text-center">
          <p className="text-5xl font-bold text-text">{avg}</p>
          <Stars count={5} />
          <p className="text-sm text-text-secondary mt-2">{reviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {dist.map((d) => (
            <div key={d.n} className="flex items-center gap-3">
              <span className="text-xs text-text-secondary w-4 text-right">{d.n}</span>
              <Star size={12} className="text-accent fill-accent" />
              <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="text-xs text-text-secondary w-6">{d.count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border p-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-text">{review.buyer}</p>
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
    </div>
  );
}
