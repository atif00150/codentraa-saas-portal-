"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { getStoredNotifications } from "@/lib/notificationsStore";

interface TopNavProps {
  onMenuToggle?: () => void;
}

export default function TopNav({ onMenuToggle }: TopNavProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [userName, setUserName] = useState("Atif Mughal");
  const [userInitials, setUserInitials] = useState("AM");
  const [userRole, setUserRole] = useState("Owner");

  const updateCount = () => {
    const list = getStoredNotifications();
    const count = list.filter((n) => !n.read).length;
    setUnreadCount(count);
  };

  useEffect(() => {
    updateCount();

    // Read Dynamic User Data from LocalStorage
    try {
      const storedUserRaw = localStorage.getItem("codentraa_user");
      if (storedUserRaw) {
        const parsed = JSON.parse(storedUserRaw);
        const name = parsed.name || parsed.fullName || parsed.userEmail?.split("@")[0] || "Atif Mughal";
        setUserName(name);
        
        const initials = name
          .split(" ")
          .map((part: string) => part[0])
          .join("")
          .toUpperCase()
          .slice(0, 2) || "AM";
        setUserInitials(initials);

        if (parsed.role) {
          setUserRole(parsed.role);
        }
      }
    } catch (e) {
      console.error(e);
    }

    const handleUpdate = () => updateCount();
    window.addEventListener("notifications-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("notifications-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 font-sans text-[#0F172A]">
      {/* Left Section: Mobile Menu Toggle + Search Field */}
      <div className="flex items-center space-x-3 flex-1 max-w-lg">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onMenuToggle}
          className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl lg:hidden transition-colors cursor-pointer border border-[#E2E8F0] shrink-0"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Responsive Search Field */}
        <div className="relative w-full max-w-xs md:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] placeholder-[#64748B] rounded-xl pl-10 pr-10 md:pr-12 py-2 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all shadow-sm font-medium"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#64748B] bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded-md shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Header: Status, Notifications & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
        {/* Organization Status Pill */}
        <Link
          href="/settings"
          className="hidden sm:flex items-center space-x-2 bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1.5 rounded-xl text-xs hover:bg-[#D1FAE5] transition-colors cursor-pointer group shadow-sm"
        >
          <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
          <span className="text-[#047857] font-bold text-[11px] whitespace-nowrap">
            Codentraa Enterprise — Active
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#047857] ml-0.5" />
        </Link>

        {/* Dynamic Notification Bell Icon */}
        <Link
          href="/notifications"
          className="p-2 sm:p-2.5 text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F8FAFC] rounded-xl transition-colors relative cursor-pointer border border-transparent hover:border-[#E2E8F0]"
          title="Notification Center"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="bg-[#4F46E5] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center absolute -top-0.5 -right-0.5 shadow-sm">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Dynamic Logged-In User Avatar & Profile Menu */}
        <Link
          href="/settings"
          className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-3 border-l border-[#E2E8F0] hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
            {userInitials}
          </div>
          <div className="text-left hidden md:block">
            <h4 className="text-xs font-bold text-[#0F172A] leading-tight">{userName}</h4>
            <span className="text-[10px] text-[#64748B] font-medium">{userRole}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
