"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, CheckSquare, Users, Calendar, BarChart3, Bell, FileText, Settings, ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/projects/proj-101/kanban", icon: CheckSquare },
  { name: "Team", href: "/team", icon: Users },
  { name: "Calendar", href: "/billing", icon: Calendar },
  { name: "Reports", href: "/rbac", icon: BarChart3 },
  { name: "Notifications", href: "/settings", icon: Bell, badge: 6 },
  { name: "Files", href: "/settings", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 shrink-0 select-none font-sans">
      {/* Top Logo Container */}
      <div className="h-16 px-6 flex items-center shrink-0 border-b border-slate-100/60">
        <Link href="/dashboard" className="cursor-pointer hover:opacity-90 transition-opacity">
          <Logo size="md" variant="light" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all text-xs font-semibold ${
                isActive
                  ? "bg-[#EEF2FF] text-[#6366F1] font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#6366F1]" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-[#6366F1] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Card */}
      <div className="px-4 pb-3">
        <Link href="/settings" className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-100/80 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-indigo-500/20">
              AM
            </div>
            <div className="flex-1 truncate">
              <h4 className="text-xs font-bold text-slate-900 truncate">Atif Mughal</h4>
              <p className="text-[10px] text-slate-500 font-medium truncate">Owner</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

      {/* Bottom Workspace Subscription Card (Figma Exact Match) */}
      <div className="p-4 mx-4 mb-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-[11px] font-bold text-slate-900 leading-tight">Codentra Enterprise</h5>
            <span className="text-[10px] text-emerald-600 font-bold">Active</span>
          </div>
        </div>

        <div className="space-y-1.5 text-[11px] font-medium text-slate-600">
          <div className="flex justify-between">
            <span>Members</span>
            <span className="font-bold text-slate-900">18 / 50</span>
          </div>
          <div className="flex justify-between">
            <span>Projects</span>
            <span className="font-bold text-slate-900">12 / 100</span>
          </div>
        </div>

        <Link
          href="/billing"
          className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-[#6366F1] text-[11px] font-bold py-2 px-3 rounded-xl flex items-center justify-between transition-colors shadow-sm cursor-pointer"
        >
          <span>Manage Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
