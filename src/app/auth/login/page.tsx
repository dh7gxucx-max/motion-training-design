"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/auth";

function LoginContent() {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard/client";

  const handleSignIn = () => {
    signIn({ userId: "demo-user", name: "Arjun", role: "client" });
    router.push(next);
  };

  const handlePhoneSubmit = () => {
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    handleSignIn();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative panel */}
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
              Welcome back to India&apos;s top freelance marketplace
            </h2>
            <p className="text-lg text-white/70">
              Sign in to manage your orders, connect with freelancers, and grow
              your business.
            </p>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-32 left-16 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Right — form */}
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
            <h1 className="text-2xl font-bold text-text mb-2">Sign In</h1>
            <p className="text-text-secondary">
              Don&apos;t have an account?{" "}
              <Link
                href={`/auth/register${next !== "/dashboard/client" ? `?next=${encodeURIComponent(next)}` : ""}`}
                className="text-primary font-medium hover:text-primary-dark"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Method toggle */}
          <div className="flex bg-card rounded-xl p-1 mb-6">
            <button
              onClick={() => setMethod("phone")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                method === "phone"
                  ? "bg-white text-primary shadow"
                  : "text-text-secondary"
              }`}
            >
              <Phone size={16} />
              Phone OTP
            </button>
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                method === "email"
                  ? "bg-white text-primary shadow"
                  : "text-text-secondary"
              }`}
            >
              <Mail size={16} />
              Email
            </button>
          </div>

          {method === "phone" ? (
            <div className="space-y-4">
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

              {otpSent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 tracking-[0.5em] text-center text-lg font-mono transition-all"
                  />
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handlePhoneSubmit}
                className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
              >
                {otpSent ? "Verify OTP" : "Send OTP"}
                <ArrowRight size={18} />
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-12 transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <Link
                  href="/help"
                  className="text-sm text-primary hover:text-primary-dark mt-2 inline-block"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSignIn}
                className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight size={18} />
              </motion.button>
            </div>
          )}

          <div className="mt-8 text-center text-xs text-text-secondary">
            By signing in, you agree to our{" "}
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

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
