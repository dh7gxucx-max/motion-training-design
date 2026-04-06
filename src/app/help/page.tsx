"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const categories = [
  { label: "Getting Started", icon: "🚀" },
  { label: "Orders & Delivery", icon: "📦" },
  { label: "Payments & Billing", icon: "💳" },
  { label: "Account & Profile", icon: "👤" },
  { label: "Disputes & Refunds", icon: "⚖️" },
  { label: "Freelancer Guide", icon: "💼" },
];

const faqs = [
  {
    category: "Getting Started",
    q: "What is VALOR?",
    a: "VALOR is India's freelance marketplace where clients can hire skilled professionals for digital services such as design, development, writing, marketing, and more. All transactions are protected by our escrow system.",
  },
  {
    category: "Getting Started",
    q: "How do I create an account?",
    a: "Click 'Get Started' on the homepage and enter your mobile number. You'll receive a 6-digit OTP via SMS. Verify it to create your account. You can choose to register as a Client or a Freelancer.",
  },
  {
    category: "Getting Started",
    q: "Is VALOR free to join?",
    a: "Yes, registering on VALOR is completely free. Clients pay only for the services they order. Freelancers pay a 10% platform fee on each completed order. VIP plans offer reduced fees and additional benefits.",
  },
  {
    category: "Orders & Delivery",
    q: "How do I place an order?",
    a: "Browse the catalog, click on a service you like, choose a package (Basic, Standard, or Premium), and click 'Order Now'. You'll be prompted to complete the payment via Razorpay before the order is sent to the freelancer.",
  },
  {
    category: "Orders & Delivery",
    q: "What happens after I place an order?",
    a: "The freelancer receives a notification and has 24 hours to accept the order. Once accepted, the delivery clock starts. You can track progress and communicate with the freelancer through the built-in chat.",
  },
  {
    category: "Orders & Delivery",
    q: "Can I request revisions?",
    a: "Yes. Each package includes a specified number of revision rounds. If you need additional revisions beyond the included amount, you can discuss extra charges with the freelancer through the chat.",
  },
  {
    category: "Payments & Billing",
    q: "What payment methods are accepted?",
    a: "We accept UPI, credit/debit cards, net banking, and VALOR Wallet balance — all processed securely through Razorpay. International cards are also accepted.",
  },
  {
    category: "Payments & Billing",
    q: "How does escrow work?",
    a: "When you place an order, your payment is held in secure escrow. The funds are only released to the freelancer after you mark the order as complete. If something goes wrong, you can raise a dispute.",
  },
  {
    category: "Payments & Billing",
    q: "When do freelancers receive their earnings?",
    a: "Earnings are released to the freelancer's VALOR Wallet within 7 business days after the client marks the order as complete. Freelancers can then withdraw to their bank account (subject to KYC verification).",
  },
  {
    category: "Disputes & Refunds",
    q: "What if I'm not satisfied with the delivered work?",
    a: "First, request a revision through the order chat. If the issue isn't resolved, you can raise a formal dispute from your order page within 14 days of delivery. Our resolution team will review both sides and make a decision within 5 business days.",
  },
  {
    category: "Disputes & Refunds",
    q: "How do I get a refund?",
    a: "Refunds are issued if: (1) the freelancer fails to deliver within the agreed timeframe, (2) a dispute is resolved in the client's favour, or (3) an order is mutually cancelled before work begins. Refunds are processed within 5–7 business days.",
  },
  {
    category: "Account & Profile",
    q: "How do I complete KYC verification?",
    a: "Go to your Dashboard > Wallet > KYC Verification. Upload a government-issued ID (Aadhaar, PAN, or Passport) and a selfie. Verification typically takes 1–2 business days.",
  },
  {
    category: "Freelancer Guide",
    q: "How do I create my first gig?",
    a: "Go to Dashboard > My Services > Create New Gig. Fill in the title, category, description, pricing packages (Basic/Standard/Premium), delivery time, and upload portfolio samples. Submit for review — our team approves gigs within 24 hours.",
  },
  {
    category: "Freelancer Guide",
    q: "What is the VIP plan?",
    a: "VIP plans offer reduced platform fees, priority placement in search results, a verified badge, and access to premium buyer requests. Plans start at ₹999/month. Visit our VIP Plans page for details.",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Getting Started");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filtered = faqs.filter((f) => {
    if (search) return f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return f.category === activeCategory;
  });

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-blue-100 mb-8">Find answers to the most common questions about VALOR.</p>
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-text outline-none focus:ring-4 focus:ring-white/30 text-base"
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {!search && (
            <>
              {/* Category Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-sm font-medium ${
                      activeCategory === cat.label
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-white border-border text-text hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-center leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* FAQ List */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="text-center py-16 text-text-secondary">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg">No results for "{search}"</p>
                <p className="text-sm mt-2">Try different keywords or <a href="/contact" className="text-primary hover:underline">contact support</a>.</p>
              </div>
            )}
            {filtered.map((faq) => (
              <div key={faq.q} className="bg-white border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-card transition-colors"
                >
                  <span className="font-medium text-text">{faq.q}</span>
                  {openFaq === faq.q
                    ? <ChevronUp size={18} className="text-primary shrink-0" />
                    : <ChevronDown size={18} className="text-text-secondary shrink-0" />
                  }
                </button>
                {openFaq === faq.q && (
                  <div className="px-5 pb-5">
                    <p className="text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still need help */}
          <div className="mt-16 bg-card rounded-3xl border border-border p-8 text-center">
            <p className="text-2xl mb-3">🤝</p>
            <h3 className="text-xl font-bold text-text mb-2">Still need help?</h3>
            <p className="text-text-secondary mb-6">Our support team is available Monday–Friday, 10 AM–7 PM IST.</p>
            <a href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Contact Support
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
