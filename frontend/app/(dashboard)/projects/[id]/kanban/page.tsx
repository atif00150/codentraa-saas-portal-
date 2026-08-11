"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Plus, FolderKanban, CheckCircle2, Clock, AlertCircle, Sparkles, ChevronRight, ChevronLeft, Radio } from "lucide-react";
import NotificationToast from "@/components/notifications/NotificationToast";
import { getSignalRConnection } from "@/lib/signalr";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "Backlog" | "Todo" | "InProgress" | "Review" | "Done";
  priority: "Low" | "Medium" | "High" | "Urgent";
}

const COLUMNS: { key: Task["status"]; label: string; badgeColor: string }[] = [
  { key: "Backlog", label: "Backlog", badgeColor: "bg-slate-800 text-slate-300 border-slate-700" },
  { key: "Todo", label: "To Do", badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { key: "InProgress", label: "In Progress", badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { key: "Review", label: "In Review", badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { key: "Done", label: "Completed", badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
];

export default function KanbanBoardPage() {
  const params = useParams();
  const projectId = params.id as string;

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
      description: "Construct dark-mode sidebar layout with workspace switcher",
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

  // SignalR WebSockets Real-Time Client Subscriptions
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
        const newIndex = direction === "right" ? Math.min(currentIndex + 1, COLUMNS.length - 1) : Math.max(currentIndex - 1, 0);
        const nextStatus = COLUMNS[newIndex].key;

        // Trigger SignalR WebSockets Broadcast
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

  const getPriorityStyle = (priority: Task["priority"]) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "High":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Medium":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Low":
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <NotificationToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/projects"
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider font-mono">
                Project #{projectId.slice(0, 8)}
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1.5">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                <span>WebSockets Real-Time Active</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Interactive Kanban Task Engine</h1>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-blue-600/25 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Task Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Create Kanban Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Task details..."
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Status Column</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="Todo">To Do</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Review">In Review</option>
                    <option value="Done">Completed</option>
                  </select>
                </div>
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
                  Create Task
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
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${column.badgeColor}`}>
                    {column.label}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="flex-1 space-y-3">
                {columnTasks.length === 0 ? (
                  <div className="border border-dashed border-slate-800 rounded-xl p-4 text-center text-slate-600 text-xs">
                    No tasks in {column.label}
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 hover:border-blue-500/40 transition-all shadow-md group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${getPriorityStyle(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-xs text-slate-400 line-clamp-2">{task.description}</p>
                      )}

                      {/* Transition Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                        <button
                          onClick={() => moveTask(task.id, "left")}
                          disabled={column.key === "Backlog"}
                          className="p-1 text-slate-500 hover:text-white disabled:opacity-20 transition-colors"
                          title="Move Left"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] text-slate-500 font-mono">Move Status</span>
                        <button
                          onClick={() => moveTask(task.id, "right")}
                          disabled={column.key === "Done"}
                          className="p-1 text-slate-500 hover:text-white disabled:opacity-20 transition-colors"
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
