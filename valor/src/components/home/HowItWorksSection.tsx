"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { Search, UserCheck, CreditCard, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Services",
    desc: "Browse through thousands of services or search for exactly what you need.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: UserCheck,
    title: "Choose a Freelancer",
    desc: "Compare portfolios, reviews, and packages to find your perfect match.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: CreditCard,
    title: "Place Your Order",
    desc: "Pay securely through escrow. Funds are held safely until work is delivered.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: ThumbsUp,
    title: "Get Quality Work",
    desc: "Receive your deliverables, request revisions if needed, and leave a review.",
    color: "from-purple-500 to-violet-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            How It Works
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Get started in minutes. Our simple process connects you with the
            right talent.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 via-amber-200 to-purple-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.15} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative text-center group"
                >
                  {/* Step number */}
                  <div className="relative z-10 mx-auto mb-6">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <step.icon size={32} />
                    </motion.div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full text-sm font-bold flex items-center justify-center shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
