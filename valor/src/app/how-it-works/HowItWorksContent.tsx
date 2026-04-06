"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Search,
  UserCheck,
  CreditCard,
  ThumbsUp,
  ShieldCheck,
  Headphones,
  Zap,
  ArrowRight,
  MessageSquare,
  Star,
  Lock,
} from "lucide-react";

const buyerSteps = [
  {
    icon: Search,
    title: "Browse & Search",
    desc: "Explore thousands of services across 50+ categories. Use filters to find exactly what you need.",
  },
  {
    icon: UserCheck,
    title: "Choose a Freelancer",
    desc: "Compare portfolios, ratings, reviews, and pricing packages to pick the best match for your project.",
  },
  {
    icon: CreditCard,
    title: "Place Order & Pay",
    desc: "Select a package and pay securely. Your payment is held in escrow — safe until you approve the work.",
  },
  {
    icon: MessageSquare,
    title: "Collaborate",
    desc: "Chat with your freelancer, share files, and track progress in real-time through our messaging system.",
  },
  {
    icon: ThumbsUp,
    title: "Approve & Review",
    desc: "Once satisfied, approve the delivery. Leave a review and help the community find great talent.",
  },
];

const sellerSteps = [
  {
    icon: UserCheck,
    title: "Create Your Profile",
    desc: "Sign up, complete your profile with skills, portfolio, and bio. Verify your identity via KYC.",
  },
  {
    icon: Zap,
    title: "Create Gigs",
    desc: "List your services with clear descriptions, portfolio samples, and 3 pricing tiers (Basic/Standard/Premium).",
  },
  {
    icon: MessageSquare,
    title: "Get Orders & Communicate",
    desc: "Receive orders and chat with clients. Clarify requirements and deliver exceptional work.",
  },
  {
    icon: Star,
    title: "Deliver & Earn",
    desc: "Submit your deliverables, earn great reviews, and get paid. Withdraw to your bank account anytime.",
  },
];

const trustFeatures = [
  {
    icon: Lock,
    title: "Escrow Payments",
    desc: "Payments are held securely until work is approved. Both buyers and sellers are protected.",
  },
  {
    icon: ShieldCheck,
    title: "KYC Verified Sellers",
    desc: "All professional sellers go through identity verification for a trusted marketplace.",
  },
  {
    icon: Headphones,
    title: "Dispute Resolution",
    desc: "Our support team mediates any disputes to ensure fair outcomes for both parties.",
  },
];

export default function HowItWorksContent() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              How <span className="gradient-text">VALOR</span> Works
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Whether you&apos;re hiring talent or offering your skills, VALOR
              makes it simple, secure, and fast.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              For Clients
            </span>
            <h2 className="text-3xl font-bold text-text">
              Hiring Made Simple
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {buyerSteps.map((step, i) => (
              <AnimatedSection
                key={step.title}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <motion.div
                      whileHover={{ rotate: 12 }}
                      className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative"
                    >
                      <step.icon size={28} />
                      <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-1">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-20 bg-bg">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              For Freelancers
            </span>
            <h2 className="text-3xl font-bold text-text">
              Start Earning Today
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6">
            {sellerSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                    <step.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-text mb-2">
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
      </section>

      {/* Trust & Safety */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text mb-4">
              Your Trust & Safety
            </h2>
            <p className="text-text-secondary">
              Built-in protections for every transaction
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6">
            {trustFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-success/10 flex items-center justify-center text-success">
                    <f.icon size={28} />
                  </div>
                  <h3 className="font-semibold text-text mb-2">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-text mb-4">
              Ready to get started?
            </h2>
            <p className="text-text-secondary mb-8">
              Join VALOR for free and start connecting with talent today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/25"
                >
                  Create Free Account
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary border border-border font-semibold rounded-xl hover:shadow-md transition-all"
                >
                  Browse Services
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
