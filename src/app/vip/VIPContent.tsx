"use client";

import { useState } from "react";
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
} from "lucide-react";

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

  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-bg text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <Crown size={16} />
              VIP Plans
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              Boost Your <span className="gradient-text">Freelance Career</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Get more visibility, lower commissions, and premium features to
              stand out from the crowd.
            </p>

            {/* Billing toggle */}
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
    </div>
  );
}
