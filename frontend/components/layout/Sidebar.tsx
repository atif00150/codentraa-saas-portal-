"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Calendar,
  BarChart3,
  Bell,
  FileText,
  Settings,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  X
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { getStoredNotifications } from "@/lib/notificationsStore";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Team", href: "/team", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Files", href: "/files", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  const updateCount = () => {
    const list = getStoredNotifications();
    const count = list.filter((n) => !n.read).length;
    setUnreadCount(count);
  };

  useEffect(() => {
    updateCount();

    const handleUpdate = () => updateCount();
    window.addEventListener("notifications-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("notifications-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Dark Overlay Backdrop (Closed by default on mobile/tablet) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 animate-in fade-in"
        />
      )}

      {/* Sidebar Container: Desktop Sticky Sidebar + Mobile/iPad Sliding Drawer */}
      <aside
        className={`w-64 bg-white border-r border-[#E2E8F0] flex flex-col h-screen fixed lg:sticky top-0 left-0 z-50 shrink-0 select-none font-sans text-[#0F172A] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Logo Container & Mobile Close Button */}
        <div className="h-16 px-6 flex items-center justify-between shrink-0 border-b border-[#E2E8F0]">
          <Link href="/dashboard" onClick={handleLinkClick} className="cursor-pointer hover:opacity-90 transition-opacity">
            <Logo size="md" variant="dark" />
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl lg:hidden transition-colors cursor-pointer"
            title="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const isNotificationTab = item.name === "Notifications";

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
                  isActive
                    ? "bg-[#EEF2FF] text-[#4F46E5] font-extrabold"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#4F46E5]" : "text-[#64748B]"}`} />
                  <span>{item.name}</span>
                </div>

                {/* Dynamic Notification Badge */}
                {isNotificationTab && unreadCount > 0 && (
                  <span className="bg-[#4F46E5] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="px-3 pb-2">
          <Link
            href="/settings"
            onClick={handleLinkClick}
            className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between hover:bg-[#EEF2FF] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
                AM
              </div>
              <div className="flex-1 truncate">
                <h4 className="text-xs font-bold text-[#0F172A] truncate">Atif Mughal</h4>
                <p className="text-[10px] text-[#64748B] font-medium truncate">Organization Owner</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
          </Link>
        </div>

        {/* Organization / Subscription Card */}
        <div className="p-3.5 mx-3 mb-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl space-y-2.5">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-[#ECFDF5] text-[#10B981] rounded-lg border border-[#A7F3D0]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-[11px] font-bold text-[#0F172A] leading-tight">Codentraa Enterprise</h5>
              <span className="text-[10px] text-[#10B981] font-bold">Active Tier</span>
            </div>
          </div>

          <div className="space-y-1 text-[11px] font-medium text-[#64748B]">
            <div className="flex justify-between">
              <span>Team Seats</span>
              <span className="font-bold text-[#0F172A]">18 / 50</span>
            </div>
            <div className="flex justify-between">
              <span>API Storage</span>
              <span className="font-bold text-[#10B981]">Live Synced</span>
            </div>
          </div>

          <Link
            href="/settings"
            onClick={handleLinkClick}
            className="w-full bg-white border border-[#E2E8F0] hover:border-[#4F46E5] text-[#4F46E5] text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-between transition-colors shadow-sm cursor-pointer"
          >
            <span>Manage Plan</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </aside>
    </>
  );
}
