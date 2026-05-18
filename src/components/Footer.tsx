"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

// Brand icons removed from lucide-react v1+ — using inline SVGs
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);
import AnimatedSection from "./AnimatedSection";

const footerSections = [
  {
    title: "For Clients",
    links: [
      { label: "Browse Services", href: "/catalog" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Referral Program", href: "/referral" },
    ],
  },
  {
    title: "Rewards",
    links: [
      { label: "Welcome Bonus", href: "/claim/WB25" },
      { label: "Top-up & Save", href: "/dashboard/client/wallet" },
      { label: "VIP Club", href: "/vip" },
      { label: "Refer & Earn", href: "/referral" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Trust & Safety", href: "/trust" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socials = [
  { icon: FacebookIcon, href: "#" },
  { icon: TwitterIcon, href: "#" },
  { icon: InstagramIcon, href: "#" },
  { icon: LinkedinIcon, href: "#" },
  { icon: YoutubeIcon, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-text text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <AnimatedSection className="col-span-2 md:col-span-1" direction="up">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-2xl font-bold">VALOR</span>
            </Link>
            <p className="text-gray-400 text-sm mb-3">
              India&apos;s trusted freelance marketplace. Find top talent or
              showcase your skills.
            </p>
            <p className="text-gray-600 text-xs mb-6">Operated by Zolo Trends</p>
          </AnimatedSection>

          {/* Link Columns */}
          {footerSections.map((section, i) => (
            <AnimatedSection key={section.title} delay={i * 0.1} direction="up">
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} VALOR. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <Mail size={14} /> support@valor.in
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} /> +91 92344 08700
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-xs text-center md:text-left">
            VALOR is operated by <span className="text-gray-500">ZOLO TRENDS PRIVATE LIMITED</span> &nbsp;|&nbsp; CIN: U47820BR2025PTC079961 &nbsp;|&nbsp; GSTIN: 10AACCZ7944H1Z9 &nbsp;|&nbsp; Registered in Bihar, India
          </p>
        </div>
      </div>
    </footer>
  );
}
