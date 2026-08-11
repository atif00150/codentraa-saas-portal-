"use client";

import { Bell, Search, PlusCircle, CheckCircle2 } from "lucide-react";

export default function TopNav() {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Actions & Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300 font-mono text-[11px]">Codentra Multi-Tenant Active</span>
        </div>

        {/* Notification Bell */}
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-indigo-500 rounded-full absolute top-1.5 right-1.5"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            AM
          </div>
          <div className="text-left hidden md:block">
            <h4 className="text-xs font-bold text-white leading-tight">Atif Mughal</h4>
            <span className="text-[10px] text-indigo-400 font-medium">Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
