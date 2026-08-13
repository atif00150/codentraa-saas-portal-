"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Search,
  MoreVertical,
  FolderKanban,
  Check,
  X,
  Radio,
  Download
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Manager" | "Developer" | "Client";
  assignedProject: string;
  status: "Active" | "Away" | "Offline";
  joinedDate: string;
  avatarBg: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "mem-1",
      name: "Atif Mughal",
      email: "atif@codentraa.com",
      role: "Owner",
      assignedProject: "Codentraa Multi-Tenant Portal Revamp",
      status: "Active",
      joinedDate: "2026-08-10",
      avatarBg: "bg-[#4F46E5] text-white",
    },
    {
      id: "mem-2",
      name: "Sarah Khan",
      email: "sarah@codentraa.com",
      role: "Admin",
      assignedProject: "Codentraa SaaS & Cloud K8s",
      status: "Active",
      joinedDate: "2026-08-11",
      avatarBg: "bg-[#3B82F6] text-white",
    },
    {
      id: "mem-3",
      name: "Ali Ahmed",
      email: "ali@codentraa.com",
      role: "Manager",
      assignedProject: "Mobile API Integration",
      status: "Active",
      joinedDate: "2026-08-11",
      avatarBg: "bg-[#3B82F6] text-white",
    },
    {
      id: "mem-4",
      name: "Fatima Noor",
      email: "fatima@codentraa.com",
      role: "Developer",
      assignedProject: "Marketing & Launch Site",
      status: "Away",
      joinedDate: "2026-08-12",
      avatarBg: "bg-[#10B981] text-white",
    },
    {
      id: "mem-5",
      name: "Uman Tariq",
      email: "uman@codentraa.com",
      role: "Developer",
      assignedProject: "AI Engine & Analytics",
      status: "Offline",
      joinedDate: "2026-08-13",
      avatarBg: "bg-[#F59E0B] text-white",
    },
  ]);

  const [filterRole, setFilterRole] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamMember["role"]>("Developer");
  const [invitedAlert, setInvitedAlert] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setInvitedAlert(msg);
    setTimeout(() => setInvitedAlert(null), 4000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const newMember: TeamMember = {
      id: `mem-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      assignedProject: "Codentraa Multi-Tenant Portal Revamp",
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
      avatarBg: "bg-[#4F46E5] text-white",
    };

    setMembers([...members, newMember]);
    showNotification(`Invitation link & security token dispatched to ${email}`);
    setEmail("");
    setShowModal(false);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "AssignedProject", "Status", "JoinedDate"];
    const rows = members.map((m) => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      m.email,
      m.role,
      `"${m.assignedProject.replace(/"/g, '""')}"`,
      m.status,
      m.joinedDate,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `codentraa_team_directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Team directory exported to CSV successfully.");
  };

  const filteredMembers = members.filter((m) => {
    const matchesRole = filterRole === "All" || m.role === filterRole;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.assignedProject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });

  const getRoleBadge = (r: TeamMember["role"]) => {
    switch (r) {
      case "Owner":
        return "bg-[#EEF2FF] text-[#4F46E5] border-indigo-100";
      case "Admin":
        return "bg-[#EFF6FF] text-[#3B82F6] border-blue-100";
      case "Manager":
        return "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]";
      case "Developer":
        return "bg-[#FEF3C7] text-[#D97706] border-amber-200";
      case "Client":
        return "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]";
    }
  };

  return (
    <div className="space-y-8 font-sans pb-12 text-[#0F172A] bg-[#F8FAFC]">
      {/* Toast Alert */}
      {invitedAlert && (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-2xl flex items-center space-x-3 text-[#047857] text-xs font-bold shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{invitedAlert}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              Workspace Membership
            </span>
            <span className="text-[#64748B] text-xs font-medium">• Multi-Tenant RBAC Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
            Team Members & Access Control <Users className="w-6 h-6 text-[#4F46E5]" />
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Invite organization members, assign RBAC permissions, and manage project workloads.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] px-4 py-3 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            title="Export Team Roster CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Export Roster</span>
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Total Members</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{members.length}</div>
          <p className="text-[11px] text-[#4F46E5] font-bold">18 max capacity plan</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#ECFDF5] text-[#10B981] rounded-xl">
              <Radio className="w-5 h-5 animate-pulse text-[#10B981]" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Active Online</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">
            {members.filter((m) => m.status === "Active").length}
          </div>
          <p className="text-[11px] text-[#10B981] font-bold">Collaborating live</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Admins & Owners</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">
            {members.filter((m) => m.role === "Owner" || m.role === "Admin").length}
          </div>
          <p className="text-[11px] text-[#4F46E5] font-bold">Full admin security</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Pending Invites</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">2</div>
          <p className="text-[11px] text-[#D97706] font-bold">Tokens valid 48h</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
          {["All", "Owner", "Admin", "Manager", "Developer"].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterRole === r
                  ? "bg-[#4F46E5] text-white shadow-sm font-extrabold"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member or email..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Members Cards Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4F46E5] transition-all duration-200 space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase ${getRoleBadge(m.role)}`}>
                  {m.role}
                </span>

                <span className="flex items-center space-x-1 text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span>{m.status}</span>
                </span>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <div
                  className={`w-12 h-12 rounded-xl ${m.avatarBg} flex items-center justify-center font-extrabold text-sm shadow-sm shrink-0`}
                >
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="truncate">
                  <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors truncate">
                    {m.name}
                  </h3>
                  <p className="text-xs text-[#64748B] font-medium truncate">{m.email}</p>
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs space-y-1">
                <div className="flex justify-between text-[#64748B] font-medium">
                  <span>Assigned Project:</span>
                  <span className="font-bold text-[#4F46E5] truncate max-w-[130px]">{m.assignedProject}</span>
                </div>
                <div className="flex justify-between text-[#64748B] font-medium">
                  <span>Joined Date:</span>
                  <span className="font-mono text-[#0F172A]">{m.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
              <Link
                href="/projects/proj-101/kanban"
                className="text-xs text-[#4F46E5] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>View Tasks</span>
              </Link>
              <button
                onClick={() => alert(`Managing permissions for ${m.name}`)}
                className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Member Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Invite Team Member</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Member Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@codentraa.com"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  RBAC System Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Client">Client</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Send Invite Token</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
