"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import {
  NotificationItem,
  getStoredNotifications,
  saveStoredNotifications,
  DEFAULT_NOTIFICATIONS
} from "@/lib/notificationsStore";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setNotifications(getStoredNotifications());
  }, []);

  const showNotificationToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveStoredNotifications(updated);
    showNotificationToast("All notifications marked as read.");
  };

  const markSingleRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    saveStoredNotifications(updated);
    showNotificationToast(`Notification deleted permanently.`);
  };

  const handleResetNotifications = () => {
    setNotifications(DEFAULT_NOTIFICATIONS);
    saveStoredNotifications(DEFAULT_NOTIFICATIONS);
    showNotificationToast("Reset notifications to initial state.");
  };

  const filtered = notifications.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Tasks") return n.type === "task";
    if (filter === "Projects") return n.type === "project";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#EEF2FF] border border-indigo-200 p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-[#6366F1] text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#6366F1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#EEF2FF] text-[#6366F1] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              Notification Center
            </span>
            <span className="text-slate-500 text-xs font-bold">• Live Synchronization</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            Activity & Notifications <Bell className="w-6 h-6 text-[#6366F1]" />
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time workspace alerts. Deleted items stay permanently removed across page reloads.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetNotifications}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all cursor-pointer"
            title="Reset default notifications"
          >
            Reset Default
          </button>

          <button
            onClick={markAllAsRead}
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-500/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100">
          {["All", "Unread", "Tasks", "Projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#6366F1] text-white shadow-sm font-extrabold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab} {tab === "Unread" && `(${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs font-bold bg-slate-50/50">
            No notifications in this filter view.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                !n.read ? "bg-slate-50/80 border-l-4 border-l-[#6366F1]" : "hover:bg-slate-50/40"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-10 h-10 rounded-2xl ${n.avatarBg} flex items-center justify-center font-extrabold text-xs shadow-md shrink-0 mt-0.5`}
                >
                  {n.avatar}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs text-slate-900">{n.user}</span>
                    <span className="text-[10px] text-slate-400 font-medium font-mono">{n.time}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#6366F1] inline-block animate-pulse"></span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{n.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <Link
                  href={n.link}
                  className="bg-[#EEF2FF] hover:bg-[#6366F1] text-[#6366F1] hover:text-white px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
                >
                  Open Board
                </Link>

                {!n.read && (
                  <button
                    onClick={() => markSingleRead(n.id)}
                    className="p-2 text-slate-400 hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-xl transition-colors cursor-pointer"
                    title="Mark as Read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Delete Notification Permanently"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
