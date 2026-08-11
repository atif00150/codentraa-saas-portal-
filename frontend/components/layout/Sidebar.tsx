"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users, ShieldCheck, CreditCard, Settings, Layers, LogIn } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects & Kanban", href: "/projects", icon: FolderKanban },
  { name: "Team Members", href: "/team", icon: Users },
  { name: "RBAC Matrix", href: "/rbac", icon: ShieldCheck },
  { name: "Subscriptions", href: "/billing", icon: CreditCard },
  { name: "Sign In", href: "/login", icon: LogIn },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-white tracking-tight">CODENTRAA</h1>
          <p className="text-xs text-blue-400 font-medium">Enterprise SaaS</p>
        </div>
      </div>

      {/* Organization Switcher Banner */}
      <div className="px-4 py-3 mx-4 my-4 bg-slate-800/60 border border-slate-700/50 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Active Workspace</span>
          <span className="text-sm font-semibold text-slate-200">Acme Agency Inc.</span>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Badge */}
      <div className="p-4 border-t border-slate-800 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
          AM
        </div>
        <div className="flex-1 truncate">
          <h4 className="text-sm font-semibold text-white truncate">Atif Mughal</h4>
          <p className="text-xs text-slate-400 truncate">Owner (Admin)</p>
        </div>
      </div>
    </aside>
  );
}
