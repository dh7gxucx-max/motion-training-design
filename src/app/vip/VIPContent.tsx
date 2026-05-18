"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Check,
  X,
  Crown,
  Zap,
  Star,
  TrendingUp,
  Award,
  ArrowRight,
  Gift,
  Sparkles,
  Clock,
  Gem,
} from "lucide-react";

const loyaltyTiers = [
  {
    name: "Bronze",
    spend: "₹0 – ₹4,999",
    bonus: "+10%",
    perks: ["Standard top-up bonuses", "Birthday gift bonus"],
    icon: Gem,
    color: "from-orange-300 to-orange-500",
    accent: "bg-orange-100 text-orange-700",
  },
  {
    name: "Silver",
    spend: "₹5,000 – ₹19,999",
    bonus: "+15%",
    perks: ["Priority support", "Weekly surprise rewards", "Early access to offers"],
    icon: Star,
    color: "from-gray-300 to-gray-500",
    accent: "bg-gray-100 text-gray-700",
  },
  {
    name: "Gold",
    spend: "₹20,000 – ₹49,999",
    bonus: "+22%",
    perks: ["Reserved VIP bonuses", "Dedicated account manager", "Exclusive flash deals"],
    icon: Crown,
    color: "from-yellow-400 to-accent",
    accent: "bg-accent/10 text-accent",
    popular: true,
  },
  {
    name: "Platinum",
    spend: "₹50,000+",
    bonus: "+30%",
    perks: ["Best-in-class bonuses", "Personal concierge", "Custom rewards on demand"],
    icon: Award,
    color: "from-purple-400 to-primary",
    accent: "bg-primary/10 text-primary",
  },
];

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

const plans = [
  {
    name: "Free",
    price: 0,
    period: "",
    desc: "Great for getting started",
    icon: Zap,
    gradient: "from-gray-400 to-gray-500",
    features: [
      { text: "Up to 5 active gigs", included: true },
      { text: "Basic profile", included: true },
      { text: "Standard search ranking", included: true },
      { text: "10% platform commission", included: true },
      { text: "Priority support", included: false },
      { text: "Featured badge", included: false },
      { text: "Analytics dashboard", included: false },
      { text: "Custom offers", included: false },
    ],
  },
  {
    name: "Pro",
    price: 499,
    period: "/month",
    desc: "For growing freelancers",
    icon: Star,
    gradient: "from-primary to-primary-light",
    popular: true,
    features: [
      { text: "Up to 20 active gigs", included: true },
      { text: "Enhanced profile", included: true },
      { text: "Priority search ranking", included: true },
      { text: "7% platform commission", included: true },
      { text: "Priority support", included: true },
      { text: "Featured badge", included: false },
      { text: "Analytics dashboard", included: true },
      { text: "Custom offers", included: true },
    ],
  },
  {
    name: "Premium",
    price: 999,
    period: "/month",
    desc: "For top professionals",
    icon: Crown,
    gradient: "from-accent to-accent-light",
    features: [
      { text: "Unlimited active gigs", included: true },
      { text: "Premium profile with badge", included: true },
      { text: "Top search ranking", included: true },
      { text: "5% platform commission", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Featured badge", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Unlimited custom offers", included: true },
    ],
  },
];

export default function VIPContent() {
  const [annual, setAnnual] = useState(false);
  const [audience, setAudience] = useState<"client" | "seller">("client");
  const router = useRouter();
  const flashTimer = useCountdown(7200);

  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-bg text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <Crown size={16} />
              Rewards & VIP Club
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              More <span className="gradient-text">value</span> the more you VALOR
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Earn bonuses on every top-up, climb VIP tiers and unlock exclusive perks — or upgrade as a seller to grow your business.
            </p>

            {/* Audience toggle */}
            <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5 shadow-sm border border-border">
              <button
                onClick={() => setAudience("client")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  audience === "client"
                    ? "bg-accent text-white shadow"
                    : "text-text-secondary"
                }`}
              >
                For Clients
              </button>
              <button
                onClick={() => setAudience("seller")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  audience === "seller"
                    ? "bg-primary text-white shadow"
                    : "text-text-secondary"
                }`}
              >
                For Sellers
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {audience === "client" && (
        <>
          {/* Flash offer */}
          <section className="bg-bg">
            <div className="max-w-6xl mx-auto px-4 -mt-4">
              <AnimatedSection direction="up">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent via-accent-dark to-primary p-6 sm:p-8 text-white shadow-xl shadow-accent/20">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                  <div className="relative flex flex-col md:flex-row md:items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                      <Sparkles size={26} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider opacity-90 mb-1">
                        Flash VIP offer
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">
                        +15% extra on any top-up over ₹2,000
                      </h3>
                      <p className="text-sm text-white/85 flex items-center gap-2">
                        <Clock size={14} />
                        Ends in{" "}
                        <span className="font-mono font-semibold">
                          {flashTimer}
                        </span>
                      </p>
                    </div>
                    <Link
                      href="/claim/VIP15"
                      className="px-5 py-3 bg-white text-accent rounded-xl font-semibold hover:bg-white/90 transition-all shrink-0 flex items-center justify-center gap-2"
                    >
                      Claim now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Loyalty Tiers */}
          <section className="py-16 bg-bg">
            <div className="max-w-6xl mx-auto px-4">
              <AnimatedSection className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text">
                  Climb the <span className="gradient-text">Loyalty Tiers</span>
                </h2>
                <p className="text-text-secondary mt-2 max-w-xl mx-auto">
                  Bigger bonuses, better perks. Your tier is unlocked
                  automatically as you spend.
                </p>
              </AnimatedSection>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {loyaltyTiers.map((tier, i) => (
                  <AnimatedSection key={tier.name} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className={`relative bg-white rounded-3xl p-6 border-2 transition-all h-full flex flex-col ${
                        tier.popular
                          ? "border-accent shadow-xl shadow-accent/15"
                          : "border-border hover:border-primary/30 hover:shadow-lg"
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                          MOST EARNED
                        </span>
                      )}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white mb-4`}
                      >
                        <tier.icon size={22} />
                      </div>
                      <h3 className="font-bold text-text text-lg">
                        {tier.name}
                      </h3>
                      <p className="text-xs text-text-secondary mb-3">
                        {tier.spend}
                      </p>
                      <div
                        className={`inline-flex w-fit items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold mb-4 ${tier.accent}`}
                      >
                        <Gift size={12} /> {tier.bonus} on top-ups
                      </div>
                      <ul className="space-y-2 flex-1">
                        {tier.perks.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2 text-sm text-text"
                          >
                            <Check
                              size={14}
                              className="text-success shrink-0 mt-1"
                            />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection delay={0.4} className="text-center mt-10">
                <Link
                  href="/dashboard/client/wallet"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-all shadow-lg shadow-accent/25"
                >
                  Top up to climb tiers <ArrowRight size={16} />
                </Link>
              </AnimatedSection>
            </div>
          </section>

          {/* How it works */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <AnimatedSection className="text-center mb-10">
                <h2 className="text-3xl font-bold text-text">
                  How rewards work
                </h2>
              </AnimatedSection>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Gem,
                    title: "Top up your wallet",
                    desc: "Add credits and earn an instant bonus based on your tier.",
                  },
                  {
                    icon: Sparkles,
                    title: "Use credits on any gig",
                    desc: "Spend at checkout — your credits stack with active bonuses.",
                  },
                  {
                    icon: Crown,
                    title: "Climb VIP tiers",
                    desc: "More spending unlocks bigger bonuses and exclusive perks.",
                  },
                ].map((s, i) => (
                  <AnimatedSection key={s.title} delay={i * 0.1}>
                    <div className="text-center p-6 bg-card rounded-2xl h-full">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-border flex items-center justify-center text-primary mb-3">
                        <s.icon size={22} />
                      </div>
                      <h3 className="font-semibold text-text mb-1">
                        {s.title}
                      </h3>
                      <p className="text-sm text-text-secondary">{s.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {audience === "seller" && (
        <>
        <section className="py-10 bg-bg">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AnimatedSection>
              <p className="text-text-secondary mb-4">
                Plans for freelancers who sell on VALOR.
              </p>
              <div className="inline-flex items-center gap-4 bg-white rounded-full p-1.5 shadow-sm border border-border">
                <button
                  onClick={() => setAnnual(false)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    !annual
                      ? "bg-primary text-white shadow"
                      : "text-text-secondary"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    annual
                      ? "bg-primary text-white shadow"
                      : "text-text-secondary"
                  }`}
                >
                  Annual
                  <span className="ml-1.5 text-xs text-success font-bold">
                    -20%
                  </span>
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

      {/* Plans grid */}
      <section className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, i) => {
              const displayPrice = annual
                ? Math.round(plan.price * 0.8)
                : plan.price;

              return (
                <AnimatedSection key={plan.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`relative bg-white rounded-3xl p-8 border-2 transition-all h-full flex flex-col ${
                      plan.popular
                        ? "border-primary shadow-xl shadow-primary/10"
                        : "border-border hover:border-primary/30 hover:shadow-lg"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full">
                        Most Popular
                      </div>
                    )}

                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white mb-6`}
                    >
                      <plan.icon size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-text">{plan.name}</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      {plan.desc}
                    </p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-text">
                        {displayPrice === 0 ? "Free" : `₹${displayPrice}`}
                      </span>
                      {plan.period && (
                        <span className="text-text-secondary">{plan.period}</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-center gap-3">
                          {f.included ? (
                            <Check size={18} className="text-success shrink-0" />
                          ) : (
                            <X
                              size={18}
                              className="text-gray-300 shrink-0"
                            />
                          )}
                          <span
                            className={`text-sm ${
                              f.included
                                ? "text-text"
                                : "text-text-secondary/50"
                            }`}
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => plan.price > 0 && router.push("/auth/register")}
                      className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25"
                          : plan.price === 0
                            ? "bg-card text-text hover:bg-border"
                            : "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/25"
                      }`}
                    >
                      {plan.price === 0 ? "Current Plan" : "Upgrade Now"}
                      {plan.price > 0 && <ArrowRight size={16} />}
                    </motion.button>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ-style benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text">Why Go VIP?</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Higher Visibility",
                desc: "VIP gigs appear at the top of search results, getting 3x more views.",
              },
              {
                icon: Award,
                title: "Lower Commissions",
                desc: "Keep more of your earnings with reduced platform fees.",
              },
              {
                icon: Star,
                title: "Trust Badge",
                desc: "Premium badge shows clients you're a verified top professional.",
              },
              {
                icon: Zap,
                title: "Priority Support",
                desc: "Get faster responses from our support team for any issues.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 p-5 bg-card rounded-2xl">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
}
