"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FolderKanban, Plus, Layers, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  taskCount: number;
  completedTaskCount: number;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-101",
      name: "Acme SaaS Redesign",
      description: "Next.js 14 Frontend & C# .NET 8 Multi-Tenant Backend Integration",
      status: "Active",
      taskCount: 14,
      completedTaskCount: 8,
      createdAt: new Date().toISOString(),
    },
    {
      id: "proj-102",
      name: "Mobile API Integration",
      description: "JWT Auth Rotation & SignalR WebSocket Real-time Push Notifications",
      status: "Active",
      taskCount: 9,
      completedTaskCount: 3,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      description,
      status: "Active",
      taskCount: 0,
      completedTaskCount: 0,
      createdAt: new Date().toISOString(),
    };

    setProjects([newProject, ...projects]);
    setName("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Organization Projects</h1>
          <p className="text-sm text-slate-400">Manage client deliverables, milestones, and task boards</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-blue-600/25 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold text-white">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. E-Commerce Revamp"
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project scope and details..."
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
                />
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const progress = project.taskCount > 0 ? Math.round((project.completedTaskCount / project.taskCount) * 100) : 0;
          return (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {project.status}
                  </span>
                  <div className="flex items-center text-slate-400 text-xs space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{project.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{project.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Task Progress ({project.completedTaskCount}/{project.taskCount})</span>
                  <span className="font-semibold text-blue-400">{progress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                <Link
                  href={`/projects/${project.id}/kanban`}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors"
                >
                  <FolderKanban className="w-4 h-4 text-blue-400" />
                  <span>Open Kanban Board</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
