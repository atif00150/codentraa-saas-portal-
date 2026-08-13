export interface NotificationItem {
  id: string;
  user: string;
  avatar: string;
  avatarBg: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "task" | "project" | "security" | "comment";
  link: string;
}

const STORAGE_KEY = "codentraa_notifications_v2";

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    user: "Sarah Khan",
    avatar: "SK",
    avatarBg: "bg-[#52A442] text-white",
    title: 'Completed Task: "Configure TenantDbContextInterceptor"',
    description: "Auto-injected OrganizationId filter across EF Core queries in .NET 8 API.",
    time: "2 minutes ago",
    read: false,
    type: "task",
    link: "/projects/proj-101/kanban",
  },
  {
    id: "n-2",
    user: "Ali Ahmed",
    avatar: "AA",
    avatarBg: "bg-[#3B7A33] text-white",
    title: 'New Kanban Card Added: "SignalR Real-Time Sync"',
    description: "Added SignalR WebSockets real-time sync task to Mobile API Integration board.",
    time: "15 minutes ago",
    read: false,
    type: "project",
    link: "/projects/proj-102/kanban",
  },
  {
    id: "n-3",
    user: "System Security",
    avatar: "SYS",
    avatarBg: "bg-[#52A442] text-white",
    title: "JWT Auth Token Rotated Successfully",
    description: "OAuth2 & JWT Token refresh pair generated for organization owner Atif Mughal.",
    time: "1 hour ago",
    read: false,
    type: "security",
    link: "/settings",
  },
  {
    id: "n-4",
    user: "Fatima Noor",
    avatar: "FN",
    avatarBg: "bg-[#3B7A33] text-white",
    title: 'Commented on "Mobile API Integration"',
    description: '"Added pre-signed AWS S3 upload generator endpoint in C# backend."',
    time: "2 hours ago",
    read: true,
    type: "comment",
    link: "/projects/proj-102/kanban",
  },
  {
    id: "n-5",
    user: "Uman Tariq",
    avatar: "UT",
    avatarBg: "bg-[#52A442] text-white",
    title: 'Created New Project: "AI Analytics & Smart Insights Engine"',
    description: "PyTorch & FastAPI automated analytics pipeline project initialized.",
    time: "5 hours ago",
    read: true,
    type: "project",
    link: "/projects/proj-103/kanban",
  },
];

export function getStoredNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load notifications from localStorage", e);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
  } catch (e) {}

  return DEFAULT_NOTIFICATIONS;
}

export function saveStoredNotifications(list: NotificationItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("notifications-updated"));
  } catch (e) {
    console.error("Failed to save notifications to localStorage", e);
  }
}
