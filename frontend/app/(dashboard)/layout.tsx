import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-hidden">
      {/* Minimal White Left Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        {/* Top Header */}
        <TopNav />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
