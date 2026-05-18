"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useSession } from "@/lib/auth";

export default function FreelancerDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthed, ready } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !isAuthed) {
      router.replace(
        `/auth/login?next=${encodeURIComponent(pathname || "/dashboard/freelancer")}`
      );
    }
  }, [ready, isAuthed, router, pathname]);

  if (!ready || !isAuthed) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-text-secondary text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <DashboardSidebar role="freelancer" />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
