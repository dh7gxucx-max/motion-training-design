"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Palette,
  Code,
  PenTool,
  Camera,
  Music,
  BarChart3,
  Megaphone,
  Film,
  Smartphone,
  Globe,
  BookOpen,
  Headphones,
} from "lucide-react";
import AnimatedSection from "../AnimatedSection";

const categories = [
  { icon: Palette, label: "Graphics & Design", count: 3240, color: "from-pink-500 to-rose-500" },
  { icon: Code, label: "Web Development", count: 2870, color: "from-blue-500 to-cyan-500" },
  { icon: PenTool, label: "Content Writing", count: 1950, color: "from-emerald-500 to-teal-500" },
  { icon: Camera, label: "Photography", count: 1120, color: "from-amber-500 to-orange-500" },
  { icon: Film, label: "Video & Animation", count: 1680, color: "from-purple-500 to-violet-500" },
  { icon: BarChart3, label: "Data & Analytics", count: 890, color: "from-indigo-500 to-blue-500" },
  { icon: Megaphone, label: "Digital Marketing", count: 2140, color: "from-red-500 to-pink-500" },
  { icon: Music, label: "Music & Audio", count: 760, color: "from-fuchsia-500 to-purple-500" },
  { icon: Smartphone, label: "Mobile Apps", count: 1430, color: "from-teal-500 to-green-500" },
  { icon: Globe, label: "Translation", count: 920, color: "from-sky-500 to-blue-500" },
  { icon: BookOpen, label: "Online Tutoring", count: 670, color: "from-lime-500 to-emerald-500" },
  { icon: Headphones, label: "Virtual Assistant", count: 540, color: "from-orange-500 to-red-500" },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Explore Popular Categories
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Browse through thousands of services across all major categories
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.label} delay={i * 0.05} direction="up">
              <Link href={`/catalog?category=${encodeURIComponent(cat.label)}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-card hover:bg-white rounded-2xl p-6 text-center cursor-pointer transition-all hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-border"
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <cat.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm text-text mb-1">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {cat.count.toLocaleString("en-IN")} services
                  </p>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
