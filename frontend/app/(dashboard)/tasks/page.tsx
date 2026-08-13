"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  Plus,
  Search,
  ArrowRight,
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Check,
  Download,
  Upload,
  FileSpreadsheet
} from "lucide-react";

interface MasterTask {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  status: "Backlog" | "Todo" | "InProgress" | "Review" | "Done";
  priority: "Urgent" | "High" | "Medium" | "Low";
  assignee: { name: string; avatar: string; bg: string };
  dueDate: string;
}

export default function MasterTasksPage() {
  const [tasks, setTasks] = useState<MasterTask[]>([
    {
      id: "t-1",
      title: "Configure TenantDbContextInterceptor EF Core",
      description: "Auto-inject OrganizationId into EF Core DbContext queries and saves",
      projectId: "proj-101",
      projectName: "Codentraa Multi-Tenant Portal Revamp",
      status: "Done",
      priority: "Urgent",
      assignee: { name: "Atif Mughal", avatar: "AM", bg: "bg-[#4F46E5] text-white" },
      dueDate: "2026-08-15",
    },
    {
      id: "t-2",
      title: "Design Next.js 14 Responsive Sidebar Shell",
      description: "Construct dark/light mode layout shell with workspace switcher",
      projectId: "proj-101",
      projectName: "Codentraa Multi-Tenant Portal Revamp",
      status: "Done",
      priority: "High",
      assignee: { name: "Sarah Khan", avatar: "SK", bg: "bg-[#3B82F6] text-white" },
      dueDate: "2026-08-14",
    },
    {
      id: "t-3",
      title: "Implement JWT Token Rotation & Refresh Endpoint",
      description: "Return access token and refresh token in AuthController C# .NET 8",
      projectId: "proj-102",
      projectName: "Mobile API Integration",
      status: "InProgress",
      priority: "Urgent",
      assignee: { name: "Ali Ahmed", avatar: "AA", bg: "bg-[#3B82F6] text-white" },
      dueDate: "2026-08-16",
    },
    {
      id: "t-4",
      title: "SignalR WebSockets Real-Time Sync Hub",
      description: "Broadcast task move events to all organization members instantly",
      projectId: "proj-102",
      projectName: "Mobile API Integration",
      status: "Todo",
      priority: "High",
      assignee: { name: "Ali Ahmed", avatar: "AA", bg: "bg-[#3B82F6] text-white" },
      dueDate: "2026-08-18",
    },
    {
      id: "t-5",
      title: "AWS S3 Upload Pre-Signed URL Generator",
      description: "Allow direct client uploads to S3 bucket without bottlenecking API",
      projectId: "proj-103",
      projectName: "AI Engine & Analytics",
      status: "Backlog",
      priority: "Medium",
      assignee: { name: "Fatima Noor", avatar: "FN", bg: "bg-[#10B981] text-white" },
      dueDate: "2026-08-20",
    },
    {
      id: "t-6",
      title: "PyTorch Model Pipeline & FastAPI Analytics",
      description: "Train classification model for automated client report generation",
      projectId: "proj-103",
      projectName: "AI Engine & Analytics",
      status: "InProgress",
      priority: "High",
      assignee: { name: "Uman Tariq", avatar: "UT", bg: "bg-[#F59E0B] text-white" },
      dueDate: "2026-08-22",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New task form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<MasterTask["priority"]>("High");
  const [projectId, setProjectId] = useState("proj-101");

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask: MasterTask = {
      id: `t-${Date.now()}`,
      title,
      description: description || "Custom organization task item.",
      projectId,
      projectName:
        projectId === "proj-101"
          ? "Codentraa Multi-Tenant Portal Revamp"
          : projectId === "proj-102"
          ? "Mobile API Integration"
          : "AI Engine & Analytics",
      status: "Todo",
      priority,
      assignee: { name: "Atif Mughal", avatar: "AM", bg: "bg-[#4F46E5] text-white" },
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setDescription("");
    setShowModal(false);
    showNotification(`Task "${newTask.title}" created successfully.`);
  };

  // Export Tasks to CSV / JSON File
  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Project", "Status", "Priority", "Assignee", "DueDate"];
    const rows = tasks.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.projectName.replace(/"/g, '""')}"`,
      t.status,
      t.priority,
      t.assignee.name,
      t.dueDate,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `codentraa_tasks_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Tasks data exported to CSV successfully.");
  };

  // Import Tasks from JSON Text/File
  const handleImportTasks = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed)) {
        setTasks([...parsed, ...tasks]);
        showNotification(`Imported ${parsed.length} tasks successfully.`);
        setShowImportModal(false);
        setImportJsonText("");
      } else {
        alert("Invalid JSON format. Expected an array of task objects.");
      }
    } catch (err) {
      alert("Error parsing JSON text. Please check input format.");
    }
  };

  const toggleTaskDone = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "Done" ? "InProgress" : "Done" } : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && t.status === "Done") ||
      (filterStatus === "In Progress" && t.status === "InProgress") ||
      (filterStatus === "To Do" && t.status === "Todo") ||
      (filterStatus === "Backlog" && t.status === "Backlog");

    const matchesPriority =
      filterPriority === "All" || t.priority.toLowerCase() === filterPriority.toLowerCase();

    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "Done").length;
  const inProgressCount = tasks.filter((t) => t.status === "InProgress").length;
  const urgentCount = tasks.filter((t) => t.priority === "Urgent" || t.priority === "High").length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getPriorityBadge = (p: MasterTask["priority"]) => {
    switch (p) {
      case "Urgent":
        return "bg-[#FEE2E2] text-[#EF4444] border-red-200";
      case "High":
        return "bg-[#FEF3C7] text-[#D97706] border-amber-200";
      case "Medium":
        return "bg-[#EFF6FF] text-[#3B82F6] border-blue-200";
      case "Low":
        return "bg-slate-100 text-[#64748B] border-slate-200";
    }
  };

  return (
    <div className="space-y-8 font-sans pb-12 text-[#0F172A] bg-[#F8FAFC]">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-[#047857] text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              Tasks Management Engine
            </span>
            <span className="text-[#64748B] text-xs font-medium">• Live Synced</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
            Master Tasks <CheckSquare className="w-6 h-6 text-[#4F46E5]" />
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Track, filter, export, and execute tasks across all organization project boards in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            title="Export Tasks to CSV File"
          >
            <Download className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            title="Import Tasks JSON"
          >
            <Upload className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Total Tasks</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{totalCount}</div>
          <p className="text-[11px] text-[#4F46E5] font-bold">Across 6 projects</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">In Progress</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{inProgressCount}</div>
          <p className="text-[11px] text-[#3B82F6] font-bold">Active sprint items</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Urgent / High</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{urgentCount}</div>
          <p className="text-[11px] text-[#D97706] font-bold">Requires action</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#ECFDF5] text-[#10B981] rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Completion Rate</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{completionRate}%</div>
          <p className="text-[11px] text-[#10B981] font-bold">
            {completedCount} of {totalCount} done
          </p>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
          {["All", "In Progress", "To Do", "Completed", "Backlog"].map((tab) => {
            const isSelected = filterStatus === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#4F46E5] text-white shadow-sm font-extrabold"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-white"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search task or project..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-2 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Master Tasks Directory Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase tracking-wider font-extrabold border-b border-[#E2E8F0]">
              <tr>
                <th className="p-4 pl-6">Status</th>
                <th className="p-4">Task Title & Details</th>
                <th className="p-4">Project</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assignee</th>
                <th className="p-4">Due Date</th>
                <th className="p-4 pr-6 text-right">Kanban Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A] font-medium">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="p-4 pl-6">
                    <button
                      onClick={() => toggleTaskDone(t.id)}
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                        t.status === "Done"
                          ? "bg-[#10B981] border-[#10B981] text-white"
                          : "border-[#E2E8F0] hover:border-[#4F46E5] bg-white"
                      }`}
                    >
                      {t.status === "Done" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  </td>

                  <td className="p-4 max-w-xs">
                    <h4
                      className={`font-extrabold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors leading-tight ${
                        t.status === "Done" ? "line-through text-[#64748B] font-normal" : ""
                      }`}
                    >
                      {t.title}
                    </h4>
                    <p className="text-[11px] text-[#64748B] truncate mt-0.5">{t.description}</p>
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/projects/${t.projectId}/kanban`}
                      className="bg-[#EEF2FF] hover:bg-indigo-100 text-[#4F46E5] font-bold px-2.5 py-1 rounded-lg text-[10px] inline-flex items-center space-x-1 transition-colors cursor-pointer border border-indigo-100"
                    >
                      <FolderKanban className="w-3 h-3" />
                      <span className="truncate max-w-[140px]">{t.projectName}</span>
                    </Link>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border uppercase ${getPriorityBadge(
                        t.priority
                      )}`}
                    >
                      {t.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center space-x-2 shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full ${t.assignee.bg} flex items-center justify-center font-extrabold text-[9px] shadow-sm`}
                      >
                        {t.assignee.avatar}
                      </div>
                      <span className="text-xs font-bold text-[#0F172A] shrink-0">{t.assignee.name}</span>
                    </div>
                  </td>

                  <td className="p-4 font-mono text-[11px] text-[#64748B]">{t.dueDate}</td>

                  <td className="p-4 pr-6 text-right">
                    <Link
                      href={`/projects/${t.projectId}/kanban`}
                      className="bg-[#EEF2FF] hover:bg-[#4F46E5] text-[#4F46E5] hover:text-white px-3 py-1.5 rounded-lg font-extrabold text-[11px] inline-flex items-center space-x-1 transition-all shadow-sm cursor-pointer"
                    >
                      <span>Open Board</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Create Task Item</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Target Project
                </label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                >
                  <option value="proj-101">Codentraa Multi-Tenant Portal Revamp</option>
                  <option value="proj-102">Mobile API Integration</option>
                  <option value="proj-103">AI Engine & Analytics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task scope..."
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#0F172A] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#4F46E5] transition-all"
                />
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
                  <span>Create Task</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Tasks Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-[#4F46E5]" />
                <h2 className="text-lg font-extrabold text-[#0F172A]">Import Tasks (JSON)</h2>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleImportTasks} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Paste Tasks Array JSON
                </label>
                <textarea
                  rows={6}
                  required
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='[{"id":"t-9","title":"New Imported Task","description":"Imported task detail","projectId":"proj-101","projectName":"Codentraa Revamp","status":"Todo","priority":"High","assignee":{"name":"Atif","avatar":"AM","bg":"bg-[#4F46E5] text-white"},"dueDate":"2026-08-30"}]'
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#0F172A] rounded-xl p-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Upload className="w-4 h-4" />
                  <span>Parse & Import</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
