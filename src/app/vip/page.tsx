import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Rewards & VIP Club | VALOR",
  description: "Earn bonuses on every top-up, unlock VIP tiers, claim exclusive rewards and grow your freelance business on VALOR.",
  openGraph: {
    title: "VALOR Rewards & VIP Club",
    description: "Bronze, Silver, Gold and Platinum loyalty tiers with exclusive top-up bonuses and seller plans.",
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
