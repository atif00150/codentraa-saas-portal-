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

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-101",
    name: "Acme SaaS Redesign",
    description: "Next.js 14 Frontend & C# .NET 8 Multi-Tenant Backend Integration with SignalR WebSockets.",
    category: "Web App",
    status: "Active",
    taskCount: 14,
    completedTaskCount: 8,
    priority: "Urgent",
    techStack: ["Next.js 14", ".NET 8", "SignalR", "PostgreSQL"],
    teamMembers: [
      { name: "Atif Mughal", avatar: "AM", bg: "bg-[#6366F1] text-white" },
      { name: "Sarah Khan", avatar: "SK", bg: "bg-purple-500 text-white" },
      { name: "Ali Ahmed", avatar: "AA", bg: "bg-blue-500 text-white" },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-102",
    name: "Mobile API Integration",
    description: "JWT Auth Rotation & SignalR WebSocket Real-time Push Notifications for iOS/Android apps.",
    category: "Mobile",
    status: "In Progress",
    taskCount: 9,
    completedTaskCount: 4,
    priority: "High",
    techStack: ["React Native", ".NET 8 API", "JWT", "Redis"],
    teamMembers: [
      { name: "Ali Ahmed", avatar: "AA", bg: "bg-blue-500 text-white" },
      { name: "Fatima Noor", avatar: "FN", bg: "bg-emerald-500 text-white" },
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-103",
    name: "AI Engine & Analytics",
    description: "Automated report generation and machine learning data pipeline with PyTorch & FastAPI.",
    category: "AI & Data",
    status: "In Progress",
    taskCount: 15,
    completedTaskCount: 3,
    priority: "Medium",
    techStack: ["Python", "FastAPI", "PyTorch", "TailwindCSS"],
    teamMembers: [
      { name: "Uman Tariq", avatar: "UT", bg: "bg-amber-500 text-white" },
      { name: "Atif Mughal", avatar: "AM", bg: "bg-[#6366F1] text-white" },
      { name: "Sarah Khan", avatar: "SK", bg: "bg-purple-500 text-white" },
    ],
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-104",
    name: "Marketing & Launch Website",
    description: "High-converting responsive landing page with SEO optimization and dynamic analytics tracking.",
    category: "Web App",
    status: "Completed",
    taskCount: 10,
    completedTaskCount: 10,
    priority: "Low",
    techStack: ["Next.js 14", "TailwindCSS", "Framer Motion"],
    teamMembers: [
      { name: "Fatima Noor", avatar: "FN", bg: "bg-emerald-500 text-white" },
      { name: "Ali Ahmed", avatar: "AA", bg: "bg-blue-500 text-white" },
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-105",
    name: "Enterprise Security Audit",
    description: "RBAC tenant security layer, zero-trust tokens, and automated vulnerability scanner.",
    category: "Security",
    status: "On Hold",
    taskCount: 8,
    completedTaskCount: 3,
    priority: "Urgent",
    techStack: ["OAuth2", "OpenID", "Docker", ".NET 8"],
    teamMembers: [
      { name: "Atif Mughal", avatar: "AM", bg: "bg-[#6366F1] text-white" },
      { name: "Uman Tariq", avatar: "UT", bg: "bg-amber-500 text-white" },
    ],
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-106",
    name: "Cloud K8s Migration",
    description: "Multi-region Kubernetes deployment with automated CI/CD pipeline and load balancing.",
    category: "DevOps",
    status: "Active",
    taskCount: 12,
    completedTaskCount: 9,
    priority: "High",
    techStack: ["AWS", "Kubernetes", "Docker", "Terraform"],
    teamMembers: [
      { name: "Sarah Khan", avatar: "SK", bg: "bg-purple-500 text-white" },
      { name: "Fatima Noor", avatar: "FN", bg: "bg-emerald-500 text-white" },
    ],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
