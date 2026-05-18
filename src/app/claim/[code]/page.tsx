"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Sparkles,
  Wallet,
  Check,
  Clock,
  ArrowRight,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type RewardConfig = {
  amount: string;
  unit: "RS" | "%";
  label: string;
  description: string;
};

function decodeReward(code: string): RewardConfig {
  const upper = code.toUpperCase();
  if (upper.startsWith("WB")) {
    return {
      amount: "25",
      unit: "%",
      label: "Welcome Bonus",
      description: "Get +25% extra RS on your very first top-up.",
    };
  }
  if (upper.startsWith("VIP")) {
    return {
      amount: "15",
      unit: "%",
      label: "Exclusive VIP Bonus",
      description: "An extra boost reserved for our VIP members.",
    };
  }
  if (upper.startsWith("WIN")) {
    return {
      amount: "150",
      unit: "RS",
      label: "We Miss You Bonus",
      description: "A little something to welcome you back to VALOR.",
    };
  }
  if (upper.startsWith("TOP")) {
    return {
      amount: "200",
      unit: "RS",
      label: "Top-up Reward",
      description: "A free credit boost — no top-up required.",
    };
  }
  return {
    amount: "150",
    unit: "RS",
    label: "Surprise Reward",
    description: "Your personalised reward is ready to be claimed.",
  };
}

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(left / 3600)).padStart(2, "0");
  const mm = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function ClaimPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const reward = decodeReward(code);
  const timer = useCountdown(86400);
  const [claimed, setClaimed] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16 relative overflow-hidden">
        {/* Floating background orbs */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-border overflow-hidden"
          >
            {/* Top gradient banner */}
            <div className="relative animated-gradient text-white p-8 sm:p-10 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (i % 2 ? 1 : -1) * (50 + i * 20)],
                      y: [0, (i % 3 ? 1 : -1) * (30 + i * 15)],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <Sparkles size={20} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="relative w-20 h-20 mx-auto mb-5 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center animate-pulse-glow"
              >
                <Gift size={36} />
              </motion.div>

              <p className="text-sm font-medium opacity-90 uppercase tracking-wider mb-2">
                {reward.label}
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold mb-3">
                {reward.amount}
                <span className="text-3xl sm:text-4xl ml-1">{reward.unit}</span>
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto">
                {reward.description}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10">
              {/* Code chip */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-xs text-text-secondary">Reward code:</span>
                <span className="px-3 py-1 bg-card border border-border rounded-lg font-mono text-xs text-text">
                  {code.toUpperCase()}
                </span>
              </div>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-2 text-sm text-text-secondary mb-6 bg-accent/5 border border-accent/20 rounded-xl py-3">
                <Clock size={16} className="text-accent" />
                <span>
                  Expires in{" "}
                  <span className="font-mono font-semibold text-accent">
                    {timer}
                  </span>
                </span>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {[
                  "RS credited instantly to your Valor wallet",
                  "Use on any service in the catalog",
                  "Stacks with other active bonuses",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-success" />
                    </div>
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <AnimatePresence mode="wait">
                {!claimed ? (
                  <motion.button
                    key="claim"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setClaimed(true)}
                    className="w-full py-4 bg-accent hover:bg-accent-dark text-white text-base font-semibold rounded-xl transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
                  >
                    Claim Now
                    <ArrowRight size={18} />
                  </motion.button>
                ) : (
                  <motion.div
                    key="claimed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-center gap-2 p-4 bg-success/10 border border-success/20 rounded-xl text-success">
                      <Check size={20} />
                      <span className="font-medium">
                        Reward added to your wallet!
                      </span>
                    </div>
                    <Link
                      href="/dashboard/client/wallet"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-primary hover:bg-primary-dark text-white text-base font-semibold rounded-xl transition-all shadow-lg shadow-primary/25"
                    >
                      <Wallet size={18} />
                      Open Wallet
                      <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer note */}
              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-text-secondary">
                <Shield size={12} />
                Secure claim · One use per account
              </div>
            </div>
          </motion.div>

          {/* Bottom links */}
          <div className="text-center mt-6 text-sm text-text-secondary">
            New to VALOR?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:text-primary-dark"
            >
              Create an account
            </Link>{" "}
            to lock in your reward.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
