import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function FreelancerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <DashboardSidebar role="freelancer" />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
