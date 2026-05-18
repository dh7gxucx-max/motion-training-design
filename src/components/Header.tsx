"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Gem } from "lucide-react";

const navLinks = [
  { href: "/catalog", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/vip", label: "Rewards" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ top: "var(--promo-h, 0px)" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">V</span>
            </motion.div>
            <span className="text-2xl font-bold text-text group-hover:text-primary transition-colors">
              VALOR
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-text-secondary hover:text-primary font-medium transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/catalog"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-border text-text-secondary hover:text-text transition-all"
            >
              <Search size={16} />
              <span className="text-sm">Search services...</span>
            </Link>
            <Link
              href="/dashboard/client/wallet"
              className="group relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all"
            >
              <Gem size={14} className="text-primary" />
              <span className="text-sm font-semibold text-text">1,250</span>
              <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                VC
              </span>
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-accent text-white text-[9px] font-bold rounded-full leading-none animate-pulse">
                +25%
              </span>
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2.5 text-sm font-medium text-white bg-accent hover:bg-accent-dark rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-card transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-xl font-medium text-text py-3 border-b border-border hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center px-5 py-3 text-primary font-medium border border-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="text-center px-5 py-3 text-white font-medium bg-accent rounded-xl hover:bg-accent-dark transition-all"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
