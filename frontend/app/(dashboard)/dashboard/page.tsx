import { FolderKanban, CheckCircle2, Clock, Users, ArrowUpRight, ShieldCheck, Server } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Clean Architecture Foundation</span>
          <h2 className="text-2xl font-bold text-white mt-2">Welcome to Codentraa Portal</h2>
          <p className="text-sm text-slate-400 mt-1">Multi-tenant C# .NET 8 Web API + Next.js 14 App Router Platform</p>
        </div>
        <div className="flex space-x-3">
          <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center space-x-2 text-xs">
            <Server className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-mono">API Status: Healthy</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center space-x-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300 font-mono">RBAC: 5 Active Roles</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Active Projects</span>
            <FolderKanban className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">12</div>
          <p className="text-xs text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +2 this week
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Completed Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">148</div>
          <p className="text-xs text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 89% completion rate
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Pending Tasks</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">34</div>
          <p className="text-xs text-amber-400">5 urgent priority</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Organization Members</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">18</div>
          <p className="text-xs text-slate-400">across 3 departments</p>
        </div>
      </div>

      {/* Modules Architecture Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">System Architecture & Active Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-blue-400">1. Auth & RBAC Security</h4>
              <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded font-mono">Module 01</span>
            </div>
            <p className="text-xs text-slate-400">JWT Token Rotation, Password Hashing, 5 RBAC System Roles.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-emerald-400">2. Multi-Tenant Engine</h4>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono">Module 02</span>
            </div>
            <p className="text-xs text-slate-400">DbContext Interceptor & Global Query Filtering for Data Isolation.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-indigo-400">3. Kanban Task Engine</h4>
              <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-2 py-0.5 rounded font-mono">Module 03</span>
            </div>
            <p className="text-xs text-slate-400">MediatR CQRS Task CRUD, Status State Machine, SignalR WebSockets.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
