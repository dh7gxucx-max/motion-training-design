"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, ArrowRight, User, Briefcase, Gift } from "lucide-react";
import { signIn } from "@/lib/auth";

function RegisterContent() {
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard/client";

  const handleCreateAccount = () => {
    signIn({
      userId: "demo-user",
      name: name || "Arjun",
      role,
    });
    router.push(next);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative animated-gradient items-center justify-center p-12">
        <div className="relative z-10 text-white max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-2xl font-bold">V</span>
              </div>
              <span className="text-3xl font-bold">VALOR</span>
            </Link>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Join thousands of professionals on VALOR
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Create your free account and start earning or hiring in minutes.
            </p>

            <div className="space-y-4">
              {[
                "No upfront fees — only pay when you get results",
                "Secure escrow payments protect both parties",
                "Join 50,000+ happy users across India",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-bg">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <Link
              href="/"
              className="lg:hidden flex items-center gap-2 mb-8"
            >
              <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-2xl font-bold text-text">VALOR</span>
            </Link>
            <h1 className="text-2xl font-bold text-text mb-2">
              Create Account
            </h1>
            <p className="text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-medium hover:text-primary-dark"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Welcome bonus banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-primary/10 border border-accent/20 p-4 mb-6"
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
            <div className="relative flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white flex items-center justify-center shadow-lg shadow-accent/30">
                <Gift size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text leading-tight">
                  Sign up & unlock{" "}
                  <span className="text-accent">+25% welcome bonus</span>
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  Applied automatically on your first top-up.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Steps indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step >= s
                      ? "bg-primary text-white"
                      : "bg-card text-text-secondary"
                  }`}
                >
                  {s}
                </div>
                {s < 2 && (
                  <div
                    className={`flex-1 h-0.5 rounded transition-all ${
                      step > s ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              {/* Role selection */}
              <div>
                <label className="block text-sm font-medium text-text mb-3">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      key: "client" as const,
                      icon: User,
                      label: "Hire Talent",
                      desc: "Find freelancers",
                    },
                    {
                      key: "freelancer" as const,
                      icon: Briefcase,
                      label: "Work as Freelancer",
                      desc: "Offer services",
                    },
                  ].map((r) => (
                    <motion.button
                      key={r.key}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRole(r.key)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        role === r.key
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <r.icon
                        size={24}
                        className={
                          role === r.key
                            ? "text-primary mb-2"
                            : "text-text-secondary mb-2"
                        }
                      />
                      <p className="font-medium text-text text-sm">
                        {r.label}
                      </p>
                      <p className="text-xs text-text-secondary">{r.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 bg-card border border-r-0 border-border rounded-l-xl text-sm text-text-secondary">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="flex-1 px-4 py-3 border border-border rounded-r-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-border accent-primary focus:ring-2 focus:ring-primary/20 cursor-pointer shrink-0"
                />
                <span className="text-xs text-text-secondary leading-relaxed">
                  Yes, I&apos;d like to receive updates, offers and notifications about new gigs, orders and account activity via email and SMS. You can unsubscribe at any time.
                </span>
              </label>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Phone size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text mb-1">Verify Your Phone</h3>
                <p className="text-sm text-text-secondary">
                  We sent a 6-digit code to +91 {phone || "98765 43210"}
                </p>
              </div>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-4 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 tracking-[0.5em] text-center text-xl font-mono transition-all"
              />

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCreateAccount}
                className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight size={18} />
              </motion.button>

              <div className="text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  ← Back
                </button>
                <span className="mx-3 text-border">|</span>
                <button className="text-sm text-text-secondary hover:text-text">
                  Resend OTP
                </button>
              </div>
            </motion.div>
          )}

          <div className="mt-8 text-center text-xs text-text-secondary">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
}
