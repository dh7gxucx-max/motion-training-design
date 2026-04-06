import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Details — VALOR",
  description: "View packages, portfolio and reviews for this freelance service on VALOR. Order with confidence.",
};

export default function GigLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
