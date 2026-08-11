"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, CheckSquare, Users, BarChart3, Calendar, Bell, Settings, LogIn } from "lucide-react";

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
    <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Figma Logo Brand: Hexagon Icon + "Codentra" */}
      <div className="p-6 flex items-center space-x-3">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L18.6 8 12 11.2 5.4 8 12 4.8zM4 9.6l7 3.5v7l-7-3.5v-7zm16 7l-7 3.5v-7l7-3.5v7z" />
          </svg>
        </div>
        <span className="font-extrabold text-xl text-white tracking-tight">Codentra</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Badge */}
      <div className="p-4 border-t border-slate-800 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
          AM
        </div>
        <div className="flex-1 truncate">
          <h4 className="text-xs font-bold text-white truncate">Atif Mughal</h4>
          <p className="text-[10px] text-slate-400 truncate">Owner (Admin)</p>
        </div>
      </div>
    </aside>
  );
}
