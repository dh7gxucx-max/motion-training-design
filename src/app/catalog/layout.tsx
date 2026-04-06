import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Services — VALOR Freelance Marketplace",
  description: "Find top freelancers for logo design, web development, writing, marketing, video editing and more. Filter by price, rating, and category.",
  openGraph: {
    title: "Browse Freelance Services on VALOR",
    description: "Thousands of professional services starting from ₹500. Hire India's best freelancers.",
    type: "website",
  },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
