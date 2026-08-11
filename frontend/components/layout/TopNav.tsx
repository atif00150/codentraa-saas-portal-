"use client";

import Link from "next/link";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function TopNav() {
  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10 font-sans">
      {/* Search Input with ⌘K Badge */}
      <div className="relative w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, tasks, members..."
          className="w-full bg-slate-50/80 border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 rounded-2xl pl-10 pr-12 py-2.5 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all shadow-sm"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shadow-2xl">
          ⌘K
        </kbd>
      </div>

      {/* Right Header Status, Notifications & Profile */}
      <div className="flex items-center space-x-5">
        {/* Workspace Active Badge Dropdown */}
        <Link href="/billing" className="flex items-center space-x-2 bg-emerald-50/80 border border-emerald-200/60 px-3.5 py-1.5 rounded-2xl text-xs hover:bg-emerald-100/60 transition-colors cursor-pointer">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-emerald-800 font-bold text-[11px]">Codentra Enterprise Active</span>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-600 ml-1" />
        </Link>

        {/* Notification Bell with Badge */}
        <Link href="/settings" className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-colors relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="bg-[#6366F1] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center absolute -top-0.5 -right-0.5 shadow-sm">
            6
          </span>
        </Link>

        {/* User Profile Avatar */}
        <Link href="/settings" className="flex items-center space-x-3 pl-3 border-l border-slate-100 hover:opacity-90 transition-opacity cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-indigo-500/20">
            AM
          </div>
          <div className="text-left hidden md:block">
            <h4 className="text-xs font-bold text-slate-900 leading-tight">Atif Mughal</h4>
            <span className="text-[10px] text-slate-500 font-medium">Owner</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
