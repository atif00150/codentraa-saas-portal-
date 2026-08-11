"use client";

import { ShieldCheck, Check, X, Info } from "lucide-react";

export default function RbacMatrixPage() {
  const permissions = [
    { action: "Manage SaaS Billing & Subscriptions", owner: true, admin: false, manager: false, dev: false, client: false },
    { action: "Invite / Remove Team Members", owner: true, admin: true, manager: false, dev: false, client: false },
    { action: "Create & Archive Projects", owner: true, admin: true, manager: true, dev: false, client: false },
    { action: "Create & Assign Tasks", owner: true, admin: true, manager: true, dev: true, client: false },
    { action: "Update Task Status & Drag Kanban", owner: true, admin: true, manager: true, dev: true, client: false },
    { action: "Add Task Comments & View Board", owner: true, admin: true, manager: true, dev: true, client: true },
    { action: "View Audit Logs & System Traces", owner: true, admin: true, manager: false, dev: false, client: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
            Security & Permission Enforcement
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Role-Based Access Control (RBAC) Matrix</h1>
          <p className="text-sm text-slate-400">Strict permission boundaries across 5 organizational roles</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="p-4">System Capability / Action</th>
              <th className="p-4 text-center">Owner</th>
              <th className="p-4 text-center">Admin</th>
              <th className="p-4 text-center">Manager</th>
              <th className="p-4 text-center">Developer</th>
              <th className="p-4 text-center">Client</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {permissions.map((p) => (
              <tr key={p.action} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-semibold text-white">{p.action}</td>
                <td className="p-4 text-center">{p.owner ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}</td>
                <td className="p-4 text-center">{p.admin ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}</td>
                <td className="p-4 text-center">{p.manager ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}</td>
                <td className="p-4 text-center">{p.dev ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}</td>
                <td className="p-4 text-center">{p.client ? <Check className="w-5 h-5 text-blue-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
