import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — VALOR Freelance Marketplace",
  description: "Read the Terms of Service for VALOR — India's trusted freelance marketplace.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using VALOR ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Platform. These terms apply to all visitors, registered users, freelancers, and clients on the Platform.`,
  },
  {
    title: "2. Eligibility",
    body: `You must be at least 18 years of age and legally capable of entering into contracts under applicable Indian law to register on VALOR. By creating an account, you represent and warrant that you meet these requirements.`,
  },
  {
    title: "3. User Accounts",
    body: `You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately at support@valor.in of any unauthorized use of your account. VALOR is not liable for any loss resulting from unauthorized use of your credentials.`,
  },
  {
    title: "4. Services & Orders",
    body: `Freelancers offer services ("Gigs") on the Platform. Clients may place orders for these services. Once an order is accepted, both parties are bound to fulfill their obligations. VALOR acts solely as an intermediary and is not a party to any agreement between freelancers and clients.`,
  },
  {
    title: "5. Payments & Escrow",
    body: `All payments are processed through Razorpay. Client funds are held in escrow until the order is marked as complete. VALOR charges a platform fee of 10% on each successful transaction. Payments are released to the freelancer within 7 business days after order completion.`,
  },
  {
    title: "6. Cancellations & Refunds",
    body: `Orders may be cancelled by mutual agreement before work has commenced. If a freelancer fails to deliver within the agreed timeframe, the client may request a cancellation and full refund. Refunds are processed within 5–7 business days to the original payment method.`,
  },
  {
    title: "7. Prohibited Conduct",
    body: `Users may not: (a) post false, misleading, or fraudulent content; (b) engage in any form of harassment or abuse; (c) circumvent the Platform to conduct transactions outside VALOR; (d) use the Platform for any unlawful purpose; (e) impersonate any person or entity.`,
  },
  {
    title: "8. Intellectual Property",
    body: `Upon full payment, the client receives ownership of the deliverables created exclusively for them. Freelancers retain the right to display work in their portfolio unless otherwise agreed. VALOR's trademarks, logos, and platform code remain the exclusive property of VALOR Technologies Pvt. Ltd.`,
  },
  {
    title: "9. Dispute Resolution",
    body: `In the event of a dispute between a client and a freelancer, either party may raise a formal dispute through the Platform within 14 days of order completion. VALOR's resolution team will review evidence submitted by both parties and make a final decision within 5 business days.`,
  },
  {
    title: "10. Limitation of Liability",
    body: `VALOR's total liability to any user for any claim arising out of or relating to these Terms shall not exceed the total fees paid by that user to VALOR in the 3 months preceding the claim. VALOR is not liable for indirect, incidental, or consequential damages.`,
  },
  {
    title: "11. Governing Law",
    body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra. These Terms are compliant with the Information Technology Act, 2000 and Consumer Protection Act, 2019.`,
  },
  {
    title: "12. Changes to Terms",
    body: `VALOR reserves the right to modify these Terms at any time. We will notify registered users via email and an in-app notification at least 15 days before changes take effect. Continued use of the Platform after changes constitutes acceptance of the revised Terms.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Terms of Service</h1>
            <p className="text-blue-100 text-lg">Last updated: January 1, 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Intro */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
            <p className="text-text-secondary leading-relaxed">
              Welcome to <strong className="text-primary">VALOR</strong> — India's freelance marketplace connecting talented professionals with clients across the country. Please read these Terms of Service carefully before using our Platform. These terms constitute a legally binding agreement between you and VALOR Technologies Pvt. Ltd.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-border pb-8 last:border-0">
                <h2 className="text-xl font-semibold text-text mb-3">{section.title}</h2>
                <p className="text-text-secondary leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-14 bg-card rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-text mb-2">Questions about our Terms?</h3>
            <p className="text-text-secondary mb-4">
              Our legal team is happy to help with any questions.
            </p>
            <a
              href="mailto:legal@valor.in"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
