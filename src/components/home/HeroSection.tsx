"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight, Star, Users, Briefcase } from "lucide-react";
import { useState } from "react";

const popularSearches = [
  "Logo Design",
  "Web Development",
  "Video Editing",
  "Content Writing",
  "Social Media",
  "App Development",
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-bg to-accent/5" />
        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-success/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Trusted by 50,000+ professionals
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Find the{" "}
              <span className="gradient-text">perfect freelance</span> services
              for your business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-text-secondary mb-8 max-w-lg"
            >
              Connect with India&apos;s top freelancers. From design to
              development — get quality work delivered on time.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-xl"
            >
              <div className="flex items-center bg-white rounded-2xl shadow-xl shadow-primary/10 border border-border p-2">
                <Search
                  size={20}
                  className="text-text-secondary ml-4 shrink-0"
                />
                <input
                  type="text"
                  placeholder='Try "logo design" or "web developer"'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 bg-transparent outline-none text-text placeholder-text-secondary"
                />
                <Link
                  href={`/catalog?q=${encodeURIComponent(searchQuery)}`}
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-accent/25 shrink-0"
                >
                  Search
                </Link>
              </div>
            </motion.div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-text-secondary">Popular:</span>
              {popularSearches.map((tag) => (
                <Link
                  key={tag}
                  href={`/catalog?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 text-sm bg-white border border-border rounded-lg hover:border-primary hover:text-primary transition-all"
                >
                  {tag}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Cards */}
          <div className="hidden lg:block relative">
            <div className="relative h-[500px]">
              {/* Main card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-8 left-8 right-8 bg-white rounded-3xl shadow-2xl p-6 animate-float"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xl font-bold">
                    P
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">Priya Sharma</h3>
                    <p className="text-sm text-text-secondary">
                      UI/UX Designer
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-accent">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold">4.9</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {["Figma", "UI Design", "Prototyping"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["/gig-images/logo-design.svg", "/gig-images/react-website.svg", "/gig-images/brand-identity.svg"].map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={["Logo design work", "Web development project", "Brand identity package"][i]}
                      className="aspect-square rounded-xl object-cover w-full"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-10"
                style={{ animation: "float 4s ease-in-out infinite 1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">
                      Orders Completed
                    </p>
                    <p className="font-bold text-text">2,453</p>
                  </div>
                </div>
              </motion.div>

              {/* Active users card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute bottom-16 -left-4 bg-white rounded-2xl shadow-xl p-4 z-10"
                style={{ animation: "float 4s ease-in-out infinite 0.5s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">
                      Active Freelancers
                    </p>
                    <p className="font-bold text-text">12,800+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
