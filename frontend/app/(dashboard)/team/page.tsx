"use client";

import { useState } from "react";
import { Users, UserPlus, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Manager" | "Developer" | "Client";
  joinedDate: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: "mem-1", name: "Atif Mughal", email: "atif@codentraa.com", role: "Owner", joinedDate: "2026-08-10" },
    { id: "mem-2", name: "Sarah Jenkins", email: "sarah@codentraa.com", role: "Admin", joinedDate: "2026-08-11" },
    { id: "mem-3", name: "Michael Vance", email: "michael@codentraa.com", role: "Manager", joinedDate: "2026-08-11" },
    { id: "mem-4", name: "David Miller", email: "david@codentraa.com", role: "Developer", joinedDate: "2026-08-11" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Member["role"]>("Developer");
  const [invitedMessage, setInvitedMessage] = useState("");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const newMember: Member = {
      id: `mem-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setMembers([...members, newMember]);
    setInvitedMessage(`Invite email token sent to ${email} with role ${role}`);
    setEmail("");
    setShowModal(false);

    setTimeout(() => {
      setInvitedMessage("");
    }, 4000);
  };

  const getRoleBadge = (role: Member["role"]) => {
    switch (role) {
      case "Owner":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Admin":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Manager":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Developer":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Client":
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-500/20">
            Workspace Membership
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Team Members & Access Control</h1>
          <p className="text-sm text-slate-400">Invite team members and manage organization roles</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-blue-600/25 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {invitedMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center space-x-3 text-emerald-400 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>{invitedMessage}</span>
        </div>
      )}

      {/* Invite Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Invite Team Member</h2>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Member Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">RBAC System Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Client">Client</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl"
                >
                  Send Invite Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members Directory */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="p-4">Member Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-semibold text-white flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30">
                    {m.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span>{m.name}</span>
                </td>
                <td className="p-4 text-slate-400">{m.email}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase ${getRoleBadge(m.role)}`}>
                    {m.role}
                  </span>
                </td>
                <td className="p-4 text-slate-400 font-mono">{m.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
