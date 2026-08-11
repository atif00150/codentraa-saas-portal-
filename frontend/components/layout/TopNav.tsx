"use client";

import { Bell, Search, PlusCircle, CheckCircle2 } from "lucide-react";

export default function TopNav() {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Search Input */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, tasks, members..."
          className="w-full bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-400 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Actions & Status */}
      <div className="flex items-center space-x-4">
        {/* Multi-tenant Context Status */}
        <div className="flex items-center space-x-2 bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300 font-mono">Tenant Isolation Active</span>
        </div>

        {/* Quick Add Task */}
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors shadow-md shadow-blue-600/20">
          <PlusCircle className="w-4 h-4" />
          <span>New Project</span>
        </button>

        {/* Notification Bell */}
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 bg-blue-500 rounded-full absolute top-1.5 right-1.5"></span>
        </button>
      </div>
    </header>
  );
}
