export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  category: "Web App" | "Mobile" | "AI & Data" | "DevOps" | "Security";
  status: "Active" | "In Progress" | "Completed" | "On Hold";
  taskCount: number;
  completedTaskCount: number;
  priority: "Urgent" | "High" | "Medium" | "Low";
  techStack: string[];
  teamMembers: { name: string; avatar: string; bg: string }[];
  createdAt: string;
}

const STORAGE_KEY = "codentraa_projects_v2";

export const DEFAULT_HUMANISTIC_PROJECTS: ProjectItem[] = [
  {
    id: "proj-101",
    name: "Codentra Multi-Tenant Portal Revamp",
    description: "Next.js 14 App Router integration with C# .NET 8 Web API & SignalR WebSockets for enterprise clients.",
    category: "Web App",
    status: "Active",
    taskCount: 12,
    completedTaskCount: 8,
    priority: "High",
    techStack: ["Next.js 14", ".NET 8 API", "SignalR", "PostgreSQL"],
    teamMembers: [
      { name: "Atif Mughal", avatar: "AM", bg: "bg-[#6366F1] text-white" },
      { name: "Sarah Khan", avatar: "SK", bg: "bg-slate-700 text-white" },
      { name: "Ali Ahmed", avatar: "AA", bg: "bg-[#4F46E5] text-white" },
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-102",
    name: "Mobile App Push Notifications & SignalR",
    description: "Real-time task synchronization, JWT auth token rotation, and iOS/Android mobile notification hub.",
    category: "Mobile",
    status: "In Progress",
    taskCount: 8,
    completedTaskCount: 3,
    priority: "Urgent",
    techStack: ["React Native", "SignalR", "JWT Token", "Redis"],
    teamMembers: [
      { name: "Ali Ahmed", avatar: "AA", bg: "bg-slate-700 text-white" },
      { name: "Fatima Noor", avatar: "FN", bg: "bg-[#6366F1] text-white" },
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-103",
    name: "AI Analytics & Smart Insights Engine",
    description: "Automated executive report generation, task velocity prediction, and PyTorch ML data pipeline.",
    category: "AI & Data",
    status: "Active",
    taskCount: 10,
    completedTaskCount: 4,
    priority: "Medium",
    techStack: ["Python", "FastAPI", "PyTorch", "Tailwind"],
    teamMembers: [
      { name: "Uman Tariq", avatar: "UT", bg: "bg-[#6366F1] text-white" },
      { name: "Atif Mughal", avatar: "AM", bg: "bg-slate-700 text-white" },
    ],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === "undefined") return DEFAULT_HUMANISTIC_PROJECTS;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to read projects from localStorage", e);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_HUMANISTIC_PROJECTS));
  } catch (e) {}

  return DEFAULT_HUMANISTIC_PROJECTS;
}

export function saveStoredProjects(projects: ProjectItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save projects to localStorage", e);
  }
}
