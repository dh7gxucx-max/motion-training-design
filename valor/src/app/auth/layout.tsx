import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In or Register — VALOR",
  description: "Join VALOR — India's top freelance marketplace. Sign in with phone OTP or email. Free to join.",
  openGraph: {
    title: "Join VALOR",
    description: "Create your free account and start hiring or selling services on VALOR.",
    type: "website",
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
