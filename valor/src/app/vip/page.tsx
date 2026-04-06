import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "VIP Plans — Grow Your Freelance Business | VALOR",
  description: "Unlock featured placements, lower commission, and priority support with VALOR VIP plans. Starting at ₹999/month.",
  openGraph: {
    title: "VALOR VIP Plans",
    description: "Silver, Gold & Platinum plans to supercharge your freelancing on VALOR.",
    type: "website",
  },
};

import Footer from "@/components/Footer";
import VIPContent from "./VIPContent";

export default function VIPPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <VIPContent />
      </main>
      <Footer />
    </>
  );
}
