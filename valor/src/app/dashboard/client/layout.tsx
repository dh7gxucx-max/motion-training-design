import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <DashboardSidebar role="client" />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
