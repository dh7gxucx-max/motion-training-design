import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers — VALOR Freelance Marketplace",
  description: "Join the team building India's most trusted freelance marketplace.",
};

const openRoles = [
  {
    title: "Senior Frontend Engineer",
    team: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Engineer (Node.js)",
    team: "Engineering",
    location: "Bangalore / Remote",
    type: "Full-time",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Product Designer (UI/UX)",
    team: "Design",
    location: "Mumbai / Remote",
    type: "Full-time",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Growth Marketing Manager",
    team: "Marketing",
    location: "Delhi / Remote",
    type: "Full-time",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Community Manager",
    team: "Operations",
    location: "Remote",
    type: "Full-time",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Customer Support Specialist",
    team: "Support",
    location: "Remote",
    type: "Full-time",
    color: "from-fuchsia-500 to-purple-500",
  },
];

const perks = [
  { icon: "💰", title: "Competitive Pay", desc: "Market-rate salaries with ESOP options for early team members." },
  { icon: "🏠", title: "Remote First", desc: "Work from anywhere in India. We trust you to manage your time." },
  { icon: "📚", title: "Learning Budget", desc: "₹50,000 per year for courses, books, conferences, and certifications." },
  { icon: "🏥", title: "Health Insurance", desc: "Comprehensive health cover for you and your immediate family." },
  { icon: "🌴", title: "Flexible Leaves", desc: "Unlimited casual leaves. We care about results, not attendance." },
  { icon: "🚀", title: "Early Stage Impact", desc: "Your work will directly shape a product used by lakhs of Indians." },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">

        {/* Hero */}
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-violet-200 font-medium mb-4 uppercase tracking-widest text-sm">We're Hiring</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Build Something That Matters</h1>
            <p className="text-violet-100 text-lg max-w-2xl mx-auto">
              Join a small, ambitious team on a mission to transform how India works. We're looking for people who care deeply about craft and impact.
            </p>
          </div>
        </div>

        {/* Perks */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-text text-center mb-12">Why VALOR?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((p) => (
              <div key={p.title} className="bg-card rounded-2xl p-6 border border-border">
                <p className="text-3xl mb-3">{p.icon}</p>
                <h3 className="font-semibold text-text mb-2">{p.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div className="bg-card py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text text-center mb-4">Open Positions</h2>
            <p className="text-text-secondary text-center mb-12">Don't see your role? Email us at <a href="mailto:careers@valor.in" className="text-primary hover:underline">careers@valor.in</a></p>
            <div className="space-y-4">
              {openRoles.map((role) => (
                <div key={role.title} className="bg-white rounded-2xl border border-border p-6 flex items-center justify-between gap-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white text-lg font-bold shrink-0`}>
                      {role.team[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text group-hover:text-primary transition-colors">{role.title}</h3>
                      <p className="text-text-secondary text-sm">{role.team} · {role.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{role.type}</span>
                    <a
                      href={`mailto:careers@valor.in?subject=Application: ${role.title}`}
                      className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Not ready to apply yet?</h2>
          <p className="text-text-secondary mb-6">Follow our journey on LinkedIn and be the first to know about new openings.</p>
          <a href="#" className="inline-flex items-center gap-2 bg-text text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
            Follow VALOR on LinkedIn
          </a>
        </div>

      </main>
      <Footer />
    </>
  );
}
