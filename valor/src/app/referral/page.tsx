import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Referral Program — Earn ₹200 Per Invite | VALOR",
  description: "Invite friends to VALOR and earn up to ₹400 per referral. The more you refer, the more you earn. Unlimited rewards.",
  openGraph: {
    title: "VALOR Referral Program — Earn Together",
    description: "Share VALOR and earn ₹200–₹400 for every successful referral. No limit.",
    type: "website",
  },
};

import Footer from "@/components/Footer";
import ReferralContent from "./ReferralContent";

export default function ReferralPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <ReferralContent />
      </main>
      <Footer />
    </>
  );
}
