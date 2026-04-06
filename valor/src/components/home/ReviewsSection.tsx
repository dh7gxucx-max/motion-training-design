"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Amit Gupta",
    role: "Startup Founder",
    initials: "AG",
    text: "VALOR helped me find an incredible designer for my startup. The quality of work exceeded my expectations, and the process was seamless.",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sneha Reddy",
    role: "Marketing Manager",
    initials: "SR",
    text: "I've been using VALOR for all our content needs. The freelancers here are professional, responsive, and deliver on time. Highly recommended!",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Karthik Nair",
    role: "E-commerce Owner",
    initials: "KN",
    text: "The escrow payment system gives me peace of mind. I only pay when I'm satisfied with the work. Great platform for finding talent.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Deepa Joshi",
    role: "Freelance Developer",
    initials: "DJ",
    text: "As a freelancer, VALOR has been a game-changer. The platform is easy to use, clients are genuine, and payments are always on time.",
    rating: 5,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    name: "Rohan Malhotra",
    role: "Agency Director",
    initials: "RM",
    text: "We use VALOR to scale our team with specialized freelancers. The VIP features are worth every rupee for the visibility they provide.",
    rating: 4,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Meera Kapoor",
    role: "YouTuber",
    initials: "MK",
    text: "Found my video editor on VALOR and couldn't be happier. The packages system makes pricing transparent and easy to compare.",
    rating: 5,
    gradient: "from-red-500 to-pink-500",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            What Our Users Say
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join thousands of satisfied clients and freelancers on VALOR
          </p>
        </AnimatedSection>
      </div>

      {/* Scrolling row */}
      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 w-max"
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="w-[360px] shrink-0 bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className={
                      j < review.rating ? "text-accent" : "text-gray-300"
                    }
                    fill={j < review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote
                  size={24}
                  className="absolute -top-1 -left-1 text-primary/10"
                />
                <p className="text-text-secondary text-sm leading-relaxed pl-5">
                  {review.text}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-medium text-sm text-text">{review.name}</p>
                  <p className="text-xs text-text-secondary">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
