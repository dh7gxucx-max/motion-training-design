"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Crown, Users, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

const rewards = [
  {
    icon: Gift,
    title: "Welcome Bonus",
    badge: "+25%",
    desc: "Extra RS on your very first wallet top-up.",
    href: "/claim/WB25",
    gradient: "from-accent to-accent-light",
  },
  {
    icon: Sparkles,
    title: "Top-up Boost",
    badge: "+15-30%",
    desc: "Bigger bonuses as you add more to your wallet.",
    href: "/dashboard/client/wallet",
    gradient: "from-primary to-primary-light",
  },
  {
    icon: Crown,
    title: "VIP Rewards",
    badge: "Exclusive",
    desc: "Tiered perks and reserved bonuses for VIP members.",
    href: "/vip",
    gradient: "from-yellow-400 to-accent",
  },
  {
    icon: Users,
    title: "Refer & Earn",
    badge: "₹100 each",
    desc: "Invite friends, both of you earn RS.",
    href: "/referral",
    gradient: "from-success to-emerald-400",
  },
];

export default function RewardsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-bg via-white to-bg relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            <Gift size={16} />
            Rewards Program
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            More <span className="gradient-text">value</span> on every order
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Top up your wallet, earn bonuses, and stack rewards across welcome,
            VIP and referral programs.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rewards.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 0.08}>
              <Link href={r.href} className="block group h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-border p-6 h-full hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white`}
                    >
                      <r.icon size={22} />
                    </div>
                    <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">
                      {r.badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text mb-1.5">{r.title}</h3>
                  <p className="text-sm text-text-secondary mb-4">{r.desc}</p>
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={0.4}>
          <Link
            href="/vip"
            className="inline-flex items-center gap-2 px-6 py-3 bg-text text-white rounded-xl hover:bg-primary transition-all font-medium"
          >
            See all programs
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
