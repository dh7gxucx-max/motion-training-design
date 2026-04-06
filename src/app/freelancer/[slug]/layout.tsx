import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelancer Profile — VALOR",
  description: "Browse portfolio, reviews, and services of top freelancers on VALOR.",
};

export default function FreelancerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
