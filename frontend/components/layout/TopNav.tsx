"use client";

import { Bell, Search, CheckCircle2 } from "lucide-react";

export default function TopNav() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, tasks, members..."
          className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-colors"
        />
      </div>

      {/* Right Header Status & Profile */}
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-800 font-semibold text-[11px]">Codentra Enterprise Active</span>
        </div>

        {/* Notification Bell */}
        <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-[#6366F1] rounded-full absolute top-1.5 right-1.5 ring-2 ring-white"></span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center font-bold text-white text-xs shadow-sm shadow-indigo-500/30 ring-2 ring-indigo-50">
            AM
          </div>
          <div className="text-left hidden md:block">
            <h4 className="text-xs font-bold text-slate-900 leading-tight">Atif Mughal</h4>
            <span className="text-[10px] text-[#6366F1] font-bold">Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
