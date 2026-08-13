"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  FolderKanban,
  X,
  Check,
  CheckCircle2
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  project: string;
  projectId: string;
  date: number;
  time: string;
  type: "Milestone" | "Deadline" | "Deployment";
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed 7)
  const [currentYear, setCurrentYear] = useState(2026);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "ev-1",
      title: "Codentraa Portal Sprint 2 Final Review",
      project: "Codentraa Multi-Tenant Portal Revamp",
      projectId: "proj-101",
      date: 14,
      time: "10:00 AM",
      type: "Milestone",
    },
    {
      id: "ev-2",
      title: "SignalR WebSockets Endpoint Push",
      project: "Mobile API Integration",
      projectId: "proj-102",
      date: 18,
      time: "02:30 PM",
      type: "Deployment",
    },
    {
      id: "ev-3",
      title: "PyTorch Analytics Model Training",
      project: "AI Engine & Analytics",
      projectId: "proj-103",
      date: 22,
      time: "11:00 AM",
      type: "Deadline",
    },
  ]);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(15);
  const [eventType, setEventType] = useState<CalendarEvent["type"]>("Milestone");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;

    const newEv: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: eventTitle,
      project: "Codentraa Multi-Tenant Portal Revamp",
      projectId: "proj-101",
      date: Number(eventDate),
      time: "09:00 AM",
      type: eventType,
    };

    setEvents([...events, newEv]);
    setEventTitle("");
    setShowModal(false);
    showNotification(`Milestone "${newEv.title}" added to schedule.`);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);

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
              Sprint Calendar
            </span>
            <span className="text-[#64748B] text-xs font-medium">• Milestone Tracker</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
            Project Schedule & Milestones <CalendarIcon className="w-6 h-6 text-[#4F46E5]" />
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Clean, minimal calendar interface for tracking sprint deliverables and deadlines.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Month Calendar Grid */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-extrabold text-[#0F172A]">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-xs font-extrabold text-[#64748B] uppercase py-2">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
              const dayEvents = events.filter((e) => e.date === day);
              const isToday = day === 14;

              return (
                <div
                  key={day}
                  className={`min-h-[76px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                    isToday
                      ? "bg-[#EEF2FF] border-[#4F46E5]"
                      : "bg-white border-[#E2E8F0] hover:border-[#4F46E5]"
                  }`}
                >
                  <span
                    className={`text-xs font-extrabold inline-block w-6 h-6 rounded-full text-center leading-6 ${
                      isToday ? "bg-[#4F46E5] text-white shadow-sm" : "text-[#0F172A]"
                    }`}
                  >
                    {day}
                  </span>

                  <div className="space-y-1 mt-1">
                    {dayEvents.map((ev) => (
                      <span
                        key={ev.id}
                        title={ev.title}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-md block truncate bg-[#EEF2FF] text-[#4F46E5] border border-indigo-100"
                      >
                        {ev.title}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Milestones Sidebar */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#0F172A] mb-1">Upcoming Deliverables</h3>
            <p className="text-xs text-[#64748B] font-medium mb-4">Sprint schedule milestones</p>

            <div className="space-y-3">
              {events.map((ev) => (
                <Link
                  href={`/projects/${ev.projectId}/kanban`}
                  key={ev.id}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl space-y-1 hover:bg-[#EEF2FF] transition-all cursor-pointer block group"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#4F46E5] border border-indigo-100">
                      {ev.type}
                    </span>
                    <span className="text-[#64748B] font-mono">Aug {ev.date}, 2026 • {ev.time}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                    {ev.title}
                  </h4>
                  <span className="text-[10px] text-[#64748B] font-medium block">{ev.project}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/projects"
            className="w-full text-center text-xs bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#4F46E5] font-extrabold py-3 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer mt-4 border border-[#E2E8F0]"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Manage Project Boards</span>
          </Link>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Add Milestone Event</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Sprint Release Demo"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    August Day (1 - 31)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={eventDate}
                    onChange={(e) => setEventDate(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                  >
                    <option value="Milestone">Milestone</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Deployment">Deployment</option>
                  </select>
                </div>
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
                  <span>Save Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
