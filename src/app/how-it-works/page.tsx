import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "How It Works — VALOR Freelance Marketplace",
  description: "Learn how VALOR works for freelancers and clients — browse services, place orders, and receive quality work fast.",
  openGraph: {
    title: "How VALOR Works",
    description: "Step-by-step guide to finding freelancers and getting quality work on VALOR.",
    type: "website",
  },
};

import Footer from "@/components/Footer";
import HowItWorksContent from "./HowItWorksContent";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <HowItWorksContent />
      </main>
      <Footer />
    </>
  );
}
