"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FolderKanban,
  Plus,
  Trash2,
  Search,
  Grid,
  List,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  Code2,
  X,
  Check,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import {
  ProjectItem,
  getStoredProjects,
  saveStoredProjects,
  DEFAULT_HUMANISTIC_PROJECTS
} from "@/lib/projectsStore";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialStatusFilter = searchParams.get("status") || "All";

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>(initialStatusFilter);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Create Project Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProjectItem["category"]>("Web App");
  const [priority, setPriority] = useState<ProjectItem["priority"]>("High");
  const [techStackInput, setTechStackInput] = useState("Next.js 14, .NET 8 API, SignalR");

  // Quick View Drawer State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Delete Confirmation Modal State
  const [projectToDelete, setProjectToDelete] = useState<ProjectItem | null>(null);

  // Notification Toast State
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  useEffect(() => {
    if (initialStatusFilter && initialStatusFilter !== filterStatus) {
      setFilterStatus(initialStatusFilter);
    }
  }, [initialStatusFilter]);

  const showNotification = (msg: string) => {
    setToastAlert(msg);
    setTimeout(() => setToastAlert(null), 4000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const techArray = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name,
      description: description || "Humanistic project workspace created in Codentraa portal.",
      category,
      status: "Active",
      taskCount: 6,
      completedTaskCount: 1,
      priority,
      techStack: techArray.length > 0 ? techArray : ["Next.js 14", "TypeScript"],
      teamMembers: [
        { name: "Atif Mughal", avatar: "AM", bg: "bg-[#4F46E5] text-white" },
        { name: "Sarah Khan", avatar: "SK", bg: "bg-[#3B82F6] text-white" },
      ],
      createdAt: new Date().toISOString(),
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);

    setName("");
    setDescription("");
    setShowCreateModal(false);
    showNotification(`Project "${newProject.name}" created and saved.`);
  };

  const handleDeleteConfirm = () => {
    if (!projectToDelete) return;

    const updated = projects.filter((p) => p.id !== projectToDelete.id);
    setProjects(updated);
    saveStoredProjects(updated);

    showNotification(`Project "${projectToDelete.name}" deleted permanently.`);
    setProjectToDelete(null);
  };

  const handleResetToDefault = () => {
    setProjects(DEFAULT_HUMANISTIC_PROJECTS);
    saveStoredProjects(DEFAULT_HUMANISTIC_PROJECTS);
    showNotification("Projects reset to default enterprise state.");
  };

  const filteredProjects = projects.filter((p) => {
    const matchesStatus =
      filterStatus === "All" || p.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalProjectsCount = projects.length;
  const activeCount = projects.filter((p) => p.status === "Active" || p.status === "In Progress").length;
  const totalTasks = projects.reduce((acc, p) => acc + p.taskCount, 0);
  const completedTasks = projects.reduce((acc, p) => acc + p.completedTaskCount, 0);
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8 font-sans pb-12 text-[#0F172A] bg-[#F8FAFC]">
      {/* Toast Notification Alert */}
      {toastAlert && (
        <div className="fixed top-20 right-8 z-50 bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-[#047857] text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{toastAlert}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              Enterprise Projects Directory
            </span>
            <span className="text-[#64748B] text-xs font-medium">• Live Synced</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
            Projects Overview <FolderKanban className="w-6 h-6 text-[#4F46E5]" />
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Manage client deliverables, team allocation, and task boards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetToDefault}
            className="bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] px-4 py-3 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            title="Reset to default projects"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* 4 Hero Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Total Projects</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{totalProjectsCount}</div>
          <p className="text-[11px] text-[#4F46E5] font-bold">
            <span>{activeCount} active currently</span>
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Active & In Progress</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{activeCount}</div>
          <p className="text-[11px] text-[#10B981] font-bold">
            <span>Persistent across reloads</span>
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#ECFDF5] text-[#10B981] rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Completion Rate</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{overallProgress}%</div>
          <p className="text-[11px] text-[#10B981] font-bold">
            {completedTasks} of {totalTasks} tasks done
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Team Members</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">18</div>
          <p className="text-[11px] text-[#3B82F6] font-bold">Collaborating live</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
          {["All", "Active", "In Progress", "Completed", "On Hold"].map((tab) => {
            const count =
              tab === "All"
                ? projects.length
                : projects.filter((p) => p.status.toLowerCase() === tab.toLowerCase()).length;
            const isSelected = filterStatus.toLowerCase() === tab.toLowerCase();

            return (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-[#4F46E5] text-white shadow-sm font-extrabold"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-white"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? "bg-white text-[#4F46E5]" : "bg-[#E2E8F0] text-[#64748B]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Category Filter, View Mode */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project or tech..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-2 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Web App">Web App</option>
            <option value="Mobile">Mobile</option>
            <option value="AI & Data">AI & Data</option>
            <option value="DevOps">DevOps</option>
            <option value="Security">Security</option>
          </select>

          <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-white text-[#4F46E5] shadow-sm border border-[#E2E8F0]" : "text-[#64748B] hover:text-[#0F172A]"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "list" ? "bg-white text-[#4F46E5] shadow-sm border border-[#E2E8F0]" : "text-[#64748B] hover:text-[#0F172A]"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List View Container */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-[#0F172A]">No Projects Found</h3>
          <p className="text-xs text-[#64748B] font-medium max-w-sm mx-auto">
            No projects matched your active search filters. Add a new project or reset to defaults.
          </p>
          <button
            onClick={() => {
              setFilterStatus("All");
              setFilterCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-[#4F46E5] font-bold hover:underline cursor-pointer pt-2 inline-block"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const progress =
              project.taskCount > 0
                ? Math.round((project.completedTaskCount / project.taskCount) * 100)
                : 0;

            return (
              <div
                key={project.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4F46E5] transition-all duration-200 flex flex-col justify-between space-y-5 group relative"
              >
                <div className="space-y-3">
                  {/* Top Bar: Category & Delete Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border bg-[#EEF2FF] text-[#4F46E5] border-indigo-100">
                      {project.category}
                    </span>

                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] font-bold text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-full">
                        {project.status}
                      </span>
                      
                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => setProjectToDelete(project)}
                        className="p-1.5 text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <Link
                      href={`/projects/${project.id}/kanban`}
                      className="text-lg font-extrabold text-[#0F172A] hover:text-[#4F46E5] transition-colors line-clamp-1 block cursor-pointer"
                    >
                      {project.name}
                    </Link>
                    <p className="text-xs text-[#64748B] font-medium leading-relaxed mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1"
                      >
                        <Code2 className="w-3 h-3 text-[#4F46E5]" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#64748B] text-[11px]">
                      Tasks ({project.completedTaskCount}/{project.taskCount})
                    </span>
                    <span className="font-extrabold text-[#4F46E5]">{progress}%</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#E2E8F0]">
                    <div
                      className="bg-[#4F46E5] h-full rounded-full transition-all duration-700 shadow-sm"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Footer: Team Avatars & Action Link */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex -space-x-2 overflow-hidden">
                    {project.teamMembers.map((member, idx) => (
                      <div
                        key={idx}
                        title={member.name}
                        className={`w-7 h-7 rounded-full ${member.bg} border-2 border-white flex items-center justify-center font-extrabold text-[10px] shadow-sm`}
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-[#64748B] hover:text-[#0F172A] p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer text-xs font-bold"
                    >
                      Preview
                    </button>

                    <Link
                      href={`/projects/${project.id}/kanban`}
                      className="bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <FolderKanban className="w-3.5 h-3.5" />
                      <span>Kanban</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-[#E2E8F0]">
            {filteredProjects.map((project) => {
              const progress =
                project.taskCount > 0
                  ? Math.round((project.completedTaskCount / project.taskCount) * 100)
                  : 0;

              return (
                <div
                  key={project.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 rounded-xl shrink-0 mt-1 bg-[#EEF2FF] text-[#4F46E5]">
                      <FolderKanban className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase border bg-[#EEF2FF] text-[#4F46E5] border-indigo-100">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E2E8F0] bg-white text-[#64748B]">
                          {project.status}
                        </span>
                      </div>
                      <Link
                        href={`/projects/${project.id}/kanban`}
                        className="text-base font-extrabold text-[#0F172A] hover:text-[#4F46E5] transition-colors block cursor-pointer"
                      >
                        {project.name}
                      </Link>
                      <p className="text-xs text-[#64748B] font-medium line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 shrink-0">
                    <div className="w-36 space-y-1 hidden sm:block">
                      <div className="flex justify-between text-[10px] font-bold text-[#64748B]">
                        <span>Progress</span>
                        <span className="text-[#4F46E5]">{progress}%</span>
                      </div>
                      <div className="w-full bg-[#F8FAFC] h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
                        <div
                          className="bg-[#4F46E5] h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-3 py-2 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-lg cursor-pointer"
                      >
                        Details
                      </button>
                      <Link
                        href={`/projects/${project.id}/kanban`}
                        className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                      >
                        <span>Open Board</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => setProjectToDelete(project)}
                        className="p-2 text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-center space-x-3 text-[#EF4444]">
              <div className="p-3 bg-[#FEE2E2] rounded-xl">
                <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
              </div>
              <h2 className="text-lg font-extrabold text-[#0F172A]">Delete Project?</h2>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed font-medium">
              Are you sure you want to delete <strong className="text-[#0F172A]">"{projectToDelete.name}"</strong>? This will permanently remove the project from storage.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2.5 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="bg-[#EF4444] hover:bg-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW PROJECT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-lg space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-[#EEF2FF] text-[#4F46E5] rounded-lg">
                  <Plus className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-extrabold text-[#0F172A]">Create Project</h2>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Next.js E-Commerce Revamp"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-3 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-3 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline client goals, scope, and key deliverables..."
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="e.g. Next.js 14, .NET 8 API, SignalR"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK PREVIEW DRAWER MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-xl space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold bg-[#EEF2FF] text-[#4F46E5] px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
                  {selectedProject.category}
                </span>
                <h2 className="text-xl font-extrabold text-[#0F172A] mt-2">{selectedProject.name}</h2>
                <p className="text-xs text-[#64748B] font-medium">
                  Created on {new Date(selectedProject.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#0F172A] uppercase tracking-wider mb-1">Description</h4>
                <p className="text-[#64748B] leading-relaxed font-medium">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <div>
                  <span className="text-[#64748B] font-bold block mb-1">Status</span>
                  <span className="font-extrabold text-[#0F172A]">{selectedProject.status}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold block mb-1">Priority</span>
                  <span className="font-extrabold text-[#4F46E5]">{selectedProject.priority}</span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold block mb-1">Tasks Completed</span>
                  <span className="font-extrabold text-[#0F172A]">
                    {selectedProject.completedTaskCount} / {selectedProject.taskCount}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] font-bold block mb-1">Completion Progress</span>
                  <span className="font-extrabold text-[#10B981]">
                    {Math.round((selectedProject.completedTaskCount / selectedProject.taskCount) * 100)}%
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] uppercase tracking-wider mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="bg-[#EEF2FF] text-[#4F46E5] font-bold px-3 py-1 rounded-lg text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
              >
                Close
              </button>
              <Link
                href={`/projects/${selectedProject.id}/kanban`}
                onClick={() => setSelectedProject(null)}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer flex items-center space-x-2"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Open Kanban Task Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#64748B] font-bold text-xs">Loading Projects...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
