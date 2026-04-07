"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageSquare, HelpCircle, AlertCircle } from "lucide-react";

const contactOptions = [
  {
    icon: MessageSquare,
    title: "General Enquiries",
    desc: "Questions about the platform, features, or pricing.",
    email: "hello@valor.in",
    color: "text-primary bg-primary/10",
  },
  {
    icon: HelpCircle,
    title: "Customer Support",
    desc: "Order issues, account problems, payment help.",
    email: "support@valor.in",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: AlertCircle,
    title: "Trust & Safety",
    desc: "Report fraud, abuse, or policy violations.",
    email: "trust@valor.in",
    color: "text-amber-600 bg-amber-50",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">

        {/* Hero */}
        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
            <p className="text-teal-100 text-lg">We typically respond within 24 hours on business days.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left: Info */}
            <div>
              <h2 className="text-2xl font-bold text-text mb-6">Contact Options</h2>
              <div className="space-y-4 mb-10">
                {contactOptions.map((opt) => (
                  <div key={opt.title} className="flex gap-4 p-4 bg-card rounded-2xl border border-border">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.color}`}>
                      <opt.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">{opt.title}</h3>
                      <p className="text-text-secondary text-sm mb-1">{opt.desc}</p>
                      <a href={`mailto:${opt.email}`} className="text-primary text-sm hover:underline">{opt.email}</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
                <h3 className="font-semibold text-text text-sm">Company Details</h3>
                <div className="flex items-start gap-3 text-text-secondary text-sm">
                  <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                  <a href="tel:+919234408700" className="hover:text-primary transition-colors">+91 92344 08700</a>
                </div>
                <div className="flex items-start gap-3 text-text-secondary text-sm">
                  <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
                  <a href="mailto:hello@valor.in" className="hover:text-primary transition-colors">hello@valor.in</a>
                </div>
                <div className="flex items-start gap-3 text-text-secondary text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                  <span>ZOLO TRENDS PRIVATE LIMITED<br />Desri Road, Sadapur Mahua,<br />Vaishali, Bihar – 844122</span>
                </div>
                <p className="text-xs text-text-secondary pt-1 border-t border-border">
                  CIN: U47820BR2025PTC079961 &nbsp;·&nbsp; GSTIN: 10AACCZ7944H1Z9
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-border p-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Mail size={28} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-3xl border border-border p-8 space-y-5">
                  <h2 className="text-2xl font-bold text-text mb-2">Send a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your question or issue in detail..."
                      className="w-full px-4 py-3 bg-white rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
