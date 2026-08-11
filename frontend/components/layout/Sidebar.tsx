"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, CheckSquare, Users, BarChart3, Calendar, Bell, Settings } from "lucide-react";
import Logo from "@/components/ui/Logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/projects/proj-101/kanban", icon: CheckSquare },
  { name: "Team", href: "/team", icon: Users },
  { name: "Reports", href: "/rbac", icon: BarChart3 },
  { name: "Calendar", href: "/billing", icon: Calendar },
  { name: "Notifications", href: "/settings", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Seamless White Header Logo Container (Matching Top Header Height & White Background) */}
      <div className="h-16 bg-white border-b border-slate-200 border-r border-slate-200 px-6 flex items-center shrink-0">
        <Logo size="md" variant="light" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3.5 px-4 py-3 rounded-xl transition-all text-xs font-semibold ${
                isActive
                  ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-600/30 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 mx-3 mb-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-indigo-500/20">
          AM
        </div>
        <div className="flex-1 truncate">
          <h4 className="text-xs font-bold text-white truncate">Atif Mughal</h4>
          <p className="text-[10px] text-indigo-300 font-medium truncate">Owner (Admin)</p>
        </div>
      </div>
    </aside>
  );
}
