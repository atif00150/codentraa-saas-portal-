"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Radio,
  X,
  Check,
  LayoutDashboard
} from "lucide-react";
import NotificationToast from "@/components/notifications/NotificationToast";
import { getSignalRConnection } from "@/lib/signalr";
import { INITIAL_PROJECTS, ProjectItem } from "@/lib/projectsData";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "Backlog" | "Todo" | "InProgress" | "Review" | "Done";
  priority: "Low" | "Medium" | "High" | "Urgent";
}

const COLUMNS: { key: Task["status"]; label: string; badgeBg: string; textColor: string }[] = [
  { key: "Backlog", label: "Backlog", badgeBg: "bg-slate-100", textColor: "text-slate-700" },
  { key: "Todo", label: "To Do", badgeBg: "bg-blue-50", textColor: "text-blue-700" },
  { key: "InProgress", label: "In Progress", badgeBg: "bg-indigo-50", textColor: "text-[#6366F1]" },
  { key: "Review", label: "In Review", badgeBg: "bg-purple-50", textColor: "text-purple-700" },
  { key: "Done", label: "Completed", badgeBg: "bg-emerald-50", textColor: "text-emerald-700" },
];

export default function KanbanBoardPage() {
  const params = useParams();
  const projectId = (params.id as string) || "proj-101";

  // Find matching project from dataset or fallback
  const projectInfo =
    INITIAL_PROJECTS.find((p) => p.id === projectId) || {
      id: projectId,
      name: "Acme SaaS Redesign",
      category: "Web App",
      status: "Active",
      description: "Project Kanban Task Engine",
    };

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Configure TenantDbContextInterceptor",
      description: "Auto-inject OrganizationId into EF Core DbContext queries and saves",
      status: "Done",
      priority: "Urgent",
    },
    {
      id: "task-2",
      title: "Build Next.js App Router Sidebar Shell",
      description: "Construct modern sidebar layout with workspace switcher",
      status: "Done",
      priority: "High",
    },
    {
      id: "task-3",
      title: "Implement JWT Token Rotation Endpoint",
      description: "Return access token and refresh token in AuthController",
      status: "InProgress",
      priority: "Urgent",
    },
    {
      id: "task-4",
      title: "Add SignalR WebSockets Real-Time Sync",
      description: "Broadcast task move events to all organization members instantly",
      status: "Todo",
      priority: "High",
    },
    {
      id: "task-5",
      title: "AWS S3 Upload Pre-Signed URL Generator",
      description: "Allow direct client uploads to S3 bucket without bottlenecking API",
      status: "Backlog",
      priority: "Medium",
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [signalConnected, setSignalConnected] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState<Task["priority"]>("Medium");
  const [newStatus, setNewStatus] = useState<Task["status"]>("Todo");

  // SignalR WebSockets Subscriptions
  useEffect(() => {
    const connection = getSignalRConnection();

    async function startSignalR() {
      try {
        if (connection.state === "Disconnected") {
          await connection.start();
        }
        setSignalConnected(true);
        await connection.invoke("JoinProjectGroup", projectId);
      } catch (err) {
        console.warn("SignalR WebSockets Connection Note:", err);
      }
    }

    startSignalR();

    connection.on("TaskMoved", (data: { taskId: string; newStatus: Task["status"] }) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === data.taskId ? { ...t, status: data.newStatus } : t))
      );
      setToastMessage(`Task Moved: Status updated to ${data.newStatus}`);
    });

    connection.on("TaskCreated", (newTask: Task) => {
      setTasks((prev) => [newTask, ...prev]);
      setToastMessage(`New Task Added: ${newTask.title}`);
    });

    return () => {
      connection.off("TaskMoved");
      connection.off("TaskCreated");
    };
  }, [projectId]);

  const moveTask = (taskId: string, direction: "left" | "right") => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const currentIndex = COLUMNS.findIndex((c) => c.key === t.status);
        const newIndex =
          direction === "right"
            ? Math.min(currentIndex + 1, COLUMNS.length - 1)
            : Math.max(currentIndex - 1, 0);
        const nextStatus = COLUMNS[newIndex].key;

        try {
          const conn = getSignalRConnection();
          if (conn.state === "Connected") {
            conn.invoke("BroadcastTaskMoved", projectId, taskId, nextStatus);
          }
        } catch (e) {}

        return { ...t, status: nextStatus };
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDescription,
      status: newStatus,
      priority: newPriority,
    };

    setTasks([newTask, ...tasks]);
    setToastMessage(`New Task Created: ${newTitle}`);
    setNewTitle("");
    setNewDescription("");
    setShowModal(false);
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-50 text-red-600 border-red-100";
      case "High":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Medium":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Low":
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <NotificationToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Top Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb Links */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold mb-1">
            <Link href="/dashboard" className="hover:text-[#6366F1] flex items-center gap-1 cursor-pointer">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-[#6366F1] cursor-pointer">
              Projects
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{projectInfo.name}</span>
          </div>

          <div className="flex items-center space-x-3 mt-1">
            <Link
              href="/projects"
              className="p-2 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-2xl transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#EEF2FF] text-[#6366F1] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {projectInfo.category}
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-500" />
                  <span>WebSockets Real-Time Active</span>
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                {projectInfo.name} — Kanban Engine
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900">Create Kanban Task</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-[#6366F1] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Task details and scope..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-[#6366F1] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-2xl px-3 py-2.5 focus:outline-none focus:border-[#6366F1] cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Status Column
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-2xl px-3 py-2.5 focus:outline-none focus:border-[#6366F1] cursor-pointer"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="Todo">To Do</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Review">In Review</option>
                    <option value="Done">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Create Task</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5-Column Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start min-h-[600px]">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.key);
          return (
            <div
              key={column.key}
              className="bg-white border border-slate-100 rounded-3xl p-4 space-y-4 flex flex-col min-h-[520px] shadow-sm"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span
                  className={`text-xs font-extrabold px-3 py-1 rounded-xl ${column.badgeBg} ${column.textColor}`}
                >
                  {column.label}
                </span>
                <span className="text-xs font-mono font-extrabold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="flex-1 space-y-3">
                {columnTasks.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 text-xs font-medium">
                    No tasks in {column.label}
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-slate-50/70 border border-slate-200/80 p-4 rounded-2xl space-y-3 hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-[#6366F1] transition-colors leading-snug">
                          {task.title}
                        </h4>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-lg border uppercase shrink-0 ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {/* Transition Controls */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/60 text-xs">
                        <button
                          onClick={() => moveTask(task.id, "left")}
                          disabled={column.key === "Backlog"}
                          className="p-1 text-slate-400 hover:text-[#6366F1] disabled:opacity-20 transition-colors cursor-pointer"
                          title="Move Left"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">
                          Move
                        </span>
                        <button
                          onClick={() => moveTask(task.id, "right")}
                          disabled={column.key === "Done"}
                          className="p-1 text-slate-400 hover:text-[#6366F1] disabled:opacity-20 transition-colors cursor-pointer"
                          title="Move Right"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
