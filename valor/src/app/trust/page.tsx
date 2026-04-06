import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Flag } from "lucide-react";

export const metadata: Metadata = {
  title: "Trust & Safety — VALOR Freelance Marketplace",
  description: "How VALOR keeps freelancers and clients safe on our platform.",
};

const pillars = [
  {
    icon: Shield,
    title: "Escrow Protection",
    desc: "Client funds are held in secure escrow and only released when work is approved. You never pay without receiving what was promised.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Lock,
    title: "Identity Verification (KYC)",
    desc: "All freelancers who withdraw earnings must complete KYC verification. This ensures every professional on the platform is who they say they are.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Eye,
    title: "Gig Moderation",
    desc: "Every gig is reviewed by our moderation team before going live. We check for accuracy, quality, and compliance with our content guidelines.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: AlertTriangle,
    title: "Fraud Detection",
    desc: "Our automated systems monitor for suspicious activity 24/7. Unusual transactions, fake reviews, and account takeovers are flagged and investigated.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: CheckCircle,
    title: "Dispute Resolution",
    desc: "If something goes wrong, our dedicated resolution team steps in. We review evidence from both parties and make a fair, binding decision within 5 business days.",
    color: "text-teal-600 bg-teal-50",
  },
  {
    icon: Flag,
    title: "Community Reporting",
    desc: "Users can report suspicious profiles, fake reviews, or policy violations directly from any page. Reports are reviewed within 24 hours.",
    color: "text-rose-600 bg-rose-50",
  },
];

const guidelines = [
  { title: "No Fake Reviews", desc: "Buying, selling, or incentivizing reviews is strictly prohibited and results in permanent account suspension." },
  { title: "No Off-Platform Transactions", desc: "Moving transactions outside VALOR to bypass fees removes all buyer/seller protections. This is a bannable offence." },
  { title: "No Misleading Gig Descriptions", desc: "Gig titles and descriptions must accurately represent the service offered. Overpromising or using stolen portfolio samples is not allowed." },
  { title: "No Harassment or Abuse", desc: "VALOR has a zero-tolerance policy for harassment, hate speech, threats, or abusive behaviour of any kind." },
  { title: "No Intellectual Property Theft", desc: "Delivering work that you did not create or that infringes on copyright is a serious violation that will result in order cancellation and account suspension." },
  { title: "No Illegal Services", desc: "Services related to hacking, fake documents, academic dishonesty, or any illegal activity are strictly prohibited." },
];

export default function TrustPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">

        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Trust & Safety</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              VALOR's top priority is maintaining a safe, fair, and transparent marketplace. Here's how we protect every user on our platform.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-text text-center mb-12">How We Keep You Safe</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-border p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${p.color}`}>
                  <p.icon size={22} />
                </div>
                <h3 className="font-semibold text-text mb-2">{p.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Standards */}
        <div className="bg-card py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text text-center mb-4">Community Standards</h2>
            <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
              These rules apply to everyone on VALOR — freelancers and clients alike. Violations are taken seriously and may result in permanent suspension.
            </p>
            <div className="space-y-4">
              {guidelines.map((g) => (
                <div key={g.title} className="flex gap-4 bg-white rounded-2xl border border-border p-5">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs font-bold">✕</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">{g.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report section */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-red-50 border border-red-100 rounded-3xl p-10">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Flag size={24} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-3">See Something? Report It.</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              If you encounter a scam, fake review, stolen content, or any behaviour that violates our community standards, please report it immediately. All reports are confidential.
            </p>
            <a
              href="mailto:trust@valor.in"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              <Flag size={16} />
              Report a Violation
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
