import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us — VALOR Freelance Marketplace",
  description: "Learn about VALOR's mission to empower Indian freelancers and connect them with clients nationwide.",
};

const stats = [
  { value: "50,000+", label: "Registered Freelancers" },
  { value: "1,20,000+", label: "Completed Orders" },
  { value: "28", label: "States Covered" },
  { value: "4.8★", label: "Average Rating" },
];

const team = [
  { name: "Arjun Mehta", role: "CEO & Co-founder", initials: "AM", color: "from-blue-500 to-cyan-500" },
  { name: "Priya Sharma", role: "CTO & Co-founder", initials: "PS", color: "from-pink-500 to-rose-500" },
  { name: "Rahul Verma", role: "Head of Product", initials: "RV", color: "from-purple-500 to-violet-500" },
  { name: "Neha Gupta", role: "Head of Growth", initials: "NG", color: "from-amber-500 to-orange-500" },
  { name: "Vikram Singh", role: "Head of Engineering", initials: "VS", color: "from-emerald-500 to-teal-500" },
  { name: "Kavita Desai", role: "Head of Operations", initials: "KD", color: "from-fuchsia-500 to-purple-500" },
];

const values = [
  { title: "Trust First", desc: "Every transaction on VALOR is protected by escrow. We only release funds when work is delivered and approved.", icon: "🛡️" },
  { title: "Empower Creators", desc: "We believe every skilled Indian professional deserves a fair opportunity to earn, regardless of their city or background.", icon: "🚀" },
  { title: "Quality Over Quantity", desc: "Our moderation team reviews every gig before it goes live. No race to the bottom — only professional-grade services.", icon: "⭐" },
  { title: "Made for India", desc: "UPI payments, Hindi support, local pricing in INR, and a team that understands the Indian freelance ecosystem.", icon: "🇮🇳" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-blue-700 to-violet-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-blue-200 font-medium mb-4 uppercase tracking-widest text-sm">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Building India's Most Trusted<br />Freelance Marketplace</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              VALOR was founded in 2025 by a team of engineers and designers who were frustrated with existing platforms that didn't truly serve the Indian market. We set out to build something better.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">{s.value}</p>
                  <p className="text-text-secondary text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text mb-4">Our Mission</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                India has over 15 million freelancers — the second largest in the world. Yet most platforms are designed for Western markets with dollar-based pricing, complex payment rails, and no local support.
              </p>
              <p className="text-text-secondary leading-relaxed">
                VALOR is built from the ground up for India. INR pricing, UPI & Razorpay payments, vernacular support, and a support team available in English and Hindi. We want every freelancer in Tier-2 and Tier-3 cities to have the same opportunities as those in metros.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-violet-500/5 rounded-3xl p-8 border border-border">
              <p className="text-4xl mb-4">🎯</p>
              <h3 className="text-xl font-semibold text-text mb-3">Vision 2027</h3>
              <p className="text-text-secondary leading-relaxed">
                Become the #1 platform for professional services in India, enabling 5 lakh freelancers to earn their full income through VALOR with ₹500 Cr+ in annual GMV.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-card py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text text-center mb-12">What We Stand For</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-border">
                  <p className="text-3xl mb-4">{v.icon}</p>
                  <h3 className="font-semibold text-text mb-2">{v.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-text text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
                  {member.initials}
                </div>
                <p className="font-medium text-text text-sm">{member.name}</p>
                <p className="text-text-secondary text-xs mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="bg-card border-t border-border py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-text mb-4">Legal Information</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white rounded-xl border border-border p-4">
                <p className="text-text-secondary text-xs mb-1">Legal Entity</p>
                <p className="font-medium text-text">ZOLO TRENDS PRIVATE LIMITED</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-4">
                <p className="text-text-secondary text-xs mb-1">CIN</p>
                <p className="font-medium text-text">U47820BR2025PTC079961</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-4">
                <p className="text-text-secondary text-xs mb-1">GSTIN</p>
                <p className="font-medium text-text">10AACCZ7944H1Z9</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-4">
                <p className="text-text-secondary text-xs mb-1">Registered Address</p>
                <p className="font-medium text-text">Desri Road, Sadapur Mahua, Vaishali, Bihar – 844122</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-white py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the VALOR Community</h2>
            <p className="text-blue-100 mb-8">Whether you're a freelancer looking for clients or a business looking for talent — VALOR is the place to be.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/register" className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Start Freelancing
              </a>
              <a href="/catalog" className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                Hire a Freelancer
              </a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
