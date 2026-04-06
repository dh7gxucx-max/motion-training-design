import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — VALOR Freelance Marketplace",
  description: "Learn how VALOR collects, uses, and protects your personal data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    items: [
      {
        subtitle: "Account Information",
        text: "When you register, we collect your name, email address, phone number, and profile photo. Freelancers additionally provide their skills, bio, portfolio samples, and bank account details for payouts.",
      },
      {
        subtitle: "Transaction Data",
        text: "We collect details of orders placed, payments made, and services delivered on the Platform, including amounts, dates, and parties involved.",
      },
      {
        subtitle: "Communication Data",
        text: "Messages exchanged between users through our chat system are stored to facilitate dispute resolution and improve Platform safety.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information such as your IP address, browser type, device identifiers, pages visited, and actions taken on the Platform to improve our services.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      {
        subtitle: "Service Delivery",
        text: "To create and manage your account, process payments, facilitate orders, and provide customer support.",
      },
      {
        subtitle: "Safety & Trust",
        text: "To verify identities (KYC), prevent fraud, enforce our Terms of Service, and keep the Platform secure.",
      },
      {
        subtitle: "Communications",
        text: "To send order notifications, account alerts, promotional offers, and important policy updates. You may opt out of marketing communications at any time.",
      },
      {
        subtitle: "Platform Improvement",
        text: "To analyze usage patterns, conduct research, and improve the features, performance, and design of the Platform.",
      },
    ],
  },
  {
    title: "3. Sharing Your Information",
    items: [
      {
        subtitle: "With Other Users",
        text: "Your public profile, ratings, and reviews are visible to all users. When you place or receive an order, your name and contact information are shared with the other party to facilitate the transaction.",
      },
      {
        subtitle: "Payment Partners",
        text: "Payment data is processed by Razorpay in accordance with PCI DSS standards. VALOR does not store full card numbers or UPI PINs.",
      },
      {
        subtitle: "Legal Obligations",
        text: "We may disclose your information to law enforcement or regulatory authorities when required by applicable Indian law, including under the Information Technology Act, 2000.",
      },
    ],
  },
  {
    title: "4. Data Storage & Security",
    items: [
      {
        subtitle: "Storage",
        text: "Your data is stored on secure servers located in India, in compliance with data localization requirements under applicable regulations.",
      },
      {
        subtitle: "Security Measures",
        text: "We implement industry-standard security measures including TLS encryption, hashed passwords, and regular security audits to protect your personal information.",
      },
      {
        subtitle: "Retention",
        text: "We retain your personal data for as long as your account is active or as required by law. You may request deletion of your account and data at any time.",
      },
    ],
  },
  {
    title: "5. Your Rights",
    items: [
      {
        subtitle: "Access & Correction",
        text: "You have the right to access, review, and correct the personal information we hold about you through your account settings.",
      },
      {
        subtitle: "Data Portability",
        text: "You may request a copy of your personal data in a machine-readable format by contacting privacy@valor.in.",
      },
      {
        subtitle: "Deletion",
        text: "You may request deletion of your account and associated personal data. Note that some data may be retained as required by law or for legitimate business purposes.",
      },
      {
        subtitle: "Opt-Out",
        text: "You may opt out of marketing communications at any time by clicking the unsubscribe link in any email or by updating your notification preferences in settings.",
      },
    ],
  },
  {
    title: "6. Cookies",
    items: [
      {
        subtitle: "What We Use",
        text: "We use essential cookies to keep you logged in and remember your preferences. We also use analytics cookies (e.g., Google Analytics) to understand how the Platform is used.",
      },
      {
        subtitle: "Your Choices",
        text: "You can control cookies through your browser settings. Disabling essential cookies may affect your ability to use certain features of the Platform.",
      },
    ],
  },
  {
    title: "7. Children's Privacy",
    items: [
      {
        subtitle: "Age Restriction",
        text: "VALOR is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has registered, we will promptly delete their account.",
      },
    ],
  },
  {
    title: "8. Changes to This Policy",
    items: [
      {
        subtitle: "Notification",
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email and an in-app notification at least 15 days before changes take effect. Your continued use of the Platform after the effective date constitutes acceptance.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-emerald-100 text-lg">Last updated: January 1, 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Intro */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-10">
            <p className="text-text-secondary leading-relaxed">
              At <strong className="text-emerald-700">VALOR</strong>, your privacy matters. This Privacy Policy explains how VALOR Technologies Pvt. Ltd. collects, uses, and safeguards your personal information when you use our Platform. We are committed to transparency and compliance with Indian data protection laws.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-border pb-10 last:border-0">
                <h2 className="text-xl font-semibold text-text mb-6">{section.title}</h2>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.subtitle} className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <h3 className="font-medium text-text mb-1">{item.subtitle}</h3>
                        <p className="text-text-secondary leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-14 bg-card rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-text mb-2">Privacy Questions?</h3>
            <p className="text-text-secondary mb-4">
              Contact our Data Protection Officer for any privacy-related requests.
            </p>
            <a
              href="mailto:privacy@valor.in"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
