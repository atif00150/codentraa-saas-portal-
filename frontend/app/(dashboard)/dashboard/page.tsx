"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  MoreVertical,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Plus,
  ExternalLink
} from "lucide-react";
import {
  ProjectItem,
  getStoredProjects
} from "@/lib/projectsStore";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS_RANGE = Array.from({ length: 51 }, (_, i) => 2000 + i);

export default function DashboardPage() {
  const today = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Real Dynamic Calendar State
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [startDay, setStartDay] = useState(1);
  const [endDay, setEndDay] = useState(7);
  const [activePreset, setActivePreset] = useState("This Week");

  // Selected Range Display Text
  const [selectedRangeText, setSelectedRangeText] = useState(
    `${MONTH_NAMES[today.getMonth()].slice(0, 3)} 1 – ${MONTH_NAMES[today.getMonth()].slice(0, 3)} 7, ${today.getFullYear()}`
  );

  // Live Projects loaded from localStorage
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  // Enterprise Linked Tasks Data
  const myTasks = [
    {
      id: "t1",
      title: "Design Next.js 14 Dashboard UI",
      project: "Codentraa Multi-Tenant Portal Revamp",
      projectId: "proj-101",
      status: "In Progress",
      statusColor: "bg-[#EEF2FF] text-[#4F46E5] border border-indigo-100",
    },
    {
      id: "t2",
      title: "SignalR WebSocket Push Notifications",
      project: "Mobile App Push Notifications",
      projectId: "proj-102",
      status: "Active",
      statusColor: "bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]",
    },
    {
      id: "t3",
      title: "Configure PyTorch Model Pipeline",
      project: "AI Analytics & Smart Insights",
      projectId: "proj-103",
      status: "On Hold",
      statusColor: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
    },
    {
      id: "t4",
      title: "Deploy Multi-Tenant EF Core Interceptor",
      project: "Codentraa Multi-Tenant Portal Revamp",
      projectId: "proj-101",
      status: "Completed",
      statusColor: "bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]",
    },
  ];

  const latestActivities = [
    {
      id: "a1",
      user: "Sarah Khan",
      action: 'completed "SignalR WebSockets Sync"',
      time: "2m ago",
      avatar: "SK",
      bg: "bg-[#4F46E5] text-white",
      projectId: "proj-101",
    },
    {
      id: "a2",
      user: "Ali Ahmed",
      action: "uploaded pre-signed S3 attachment",
      time: "15m ago",
      avatar: "AA",
      bg: "bg-[#3B82F6] text-white",
      projectId: "proj-102",
    },
    {
      id: "a3",
      user: "Fatima Noor",
      action: 'commented on "Mobile API Integration"',
      time: "1h ago",
      avatar: "FN",
      bg: "bg-[#10B981] text-white",
      projectId: "proj-102",
    },
    {
      id: "a4",
      user: "Uman Tariq",
      action: "created Kanban task #105",
      time: "2h ago",
      avatar: "UT",
      bg: "bg-[#4F46E5] text-white",
      projectId: "proj-103",
    },
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOffset = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDayOffset = getFirstDayOffset(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      if (currentYear > 2000) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      }
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      if (currentYear < 2050) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      }
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    if (day < startDay || (startDay !== endDay && day > endDay)) {
      setStartDay(day);
      setEndDay(day);
    } else {
      setEndDay(day);
    }
  };

  const handleApplyRange = () => {
    const monthShort = MONTH_NAMES[currentMonth].slice(0, 3);
    setSelectedRangeText(`${monthShort} ${startDay} – ${monthShort} ${endDay}, ${currentYear}`);
    setShowCalendar(false);
  };

  const totalProjectsCount = projects.length;
  const totalTasksCount = projects.reduce((acc, p) => acc + p.taskCount, 0);
  const completedTasksCount = projects.reduce((acc, p) => acc + p.completedTaskCount, 0);
  const overallProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className="space-y-8 font-sans relative pb-12 text-[#0F172A] bg-[#F8FAFC]">
      {/* Top Welcome Heading & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
            Welcome back, Atif! <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Here's what's happening with your Codentraa projects today.
          </p>
        </div>

        {/* Action Buttons: Generous Padding & No Text Overlap */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/projects"
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-2.5 rounded-xl font-extrabold text-xs flex items-center space-x-2.5 shadow-sm transition-all hover:scale-[1.01] cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="leading-none inline-block pt-0.5">Go to Projects Tab</span>
          </Link>

          {/* Date Picker Filter Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center space-x-2.5 bg-white border border-[#E2E8F0] px-5 py-2.5 rounded-xl shadow-sm text-xs font-bold text-[#0F172A] hover:border-[#4F46E5] transition-all cursor-pointer whitespace-nowrap"
            >
              <CalendarIcon className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <span>{selectedRangeText}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#64748B] transition-transform shrink-0 ${
                  showCalendar ? "rotate-180 text-[#4F46E5]" : ""
                }`}
              />
            </button>

            {/* Calendar Filter Dropdown Panel */}
            {showCalendar && (
              <div className="absolute right-0 top-12 w-80 md:w-96 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4 text-[#0F172A]">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-[#4F46E5]" />
                    <span className="text-sm font-extrabold text-[#0F172A]">Select Date Range</span>
                  </div>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {["Today", "This Week", "This Month", "Last 30 Days"].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setActivePreset(preset);
                        const curD = today.getDate();
                        setCurrentMonth(today.getMonth());
                        setCurrentYear(today.getFullYear());

                        if (preset === "Today") { setStartDay(curD); setEndDay(curD); }
                        else if (preset === "This Week") { setStartDay(Math.max(1, curD - 3)); setEndDay(Math.min(totalDays, curD + 3)); }
                        else if (preset === "This Month") { setStartDay(1); setEndDay(totalDays); }
                        else if (preset === "Last 30 Days") { setStartDay(1); setEndDay(totalDays); }
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        activePreset === preset
                          ? "bg-[#4F46E5] text-white shadow-sm"
                          : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Month & Year Selectors */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <select
                      value={currentMonth}
                      onChange={(e) => setCurrentMonth(Number(e.target.value))}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                    >
                      {MONTH_NAMES.map((m, idx) => (
                        <option key={m} value={idx}>{m}</option>
                      ))}
                    </select>

                    <select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(Number(e.target.value))}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                    >
                      {YEARS_RANGE.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Days Grid */}
                <div className="space-y-1">
                  <div className="grid grid-cols-7 text-center text-[10px] font-bold text-[#64748B] uppercase py-1">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {Array.from({ length: firstDayOffset }).map((_, idx) => (
                      <div key={`offset-${idx}`} className="h-8"></div>
                    ))}

                    {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
                      const isStart = day === startDay;
                      const isEnd = day === endDay;
                      const inRange = day >= startDay && day <= endDay;

                      return (
                        <button
                          key={day}
                          onClick={() => handleSelectDay(day)}
                          className={`h-8 rounded-xl font-bold transition-all text-xs flex items-center justify-center cursor-pointer ${
                            isStart || isEnd
                              ? "bg-[#4F46E5] text-white shadow-sm"
                              : inRange
                              ? "bg-[#EEF2FF] text-[#4F46E5]"
                              : "text-[#0F172A] hover:bg-[#F8FAFC]"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  <span className="text-[11px] font-bold text-[#64748B]">
                    {MONTH_NAMES[currentMonth].slice(0, 3)} {startDay} – {startDay === endDay ? startDay : endDay}, {currentYear}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="px-3 py-1.5 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApplyRange}
                      className="px-4 py-1.5 text-xs font-bold bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl shadow-sm transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Apply</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Enterprise KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          href="/projects"
          className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Active Projects</span>
            <MoreVertical className="w-4 h-4 text-[#64748B]" />
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{totalProjectsCount}</div>
          <p className="text-[11px] text-[#10B981] font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> Live Storage <span className="text-[#64748B] font-medium ml-1">synced</span>
          </p>
        </Link>

        <Link
          href="/tasks"
          className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl group-hover:scale-105 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Active Tasks</span>
            <MoreVertical className="w-4 h-4 text-[#64748B]" />
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{totalTasksCount}</div>
          <p className="text-[11px] text-[#4F46E5] font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 15% <span className="text-[#64748B] font-medium ml-1">from last month</span>
          </p>
        </Link>

        <Link
          href="/team"
          className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-xl group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Team Members</span>
            <MoreVertical className="w-4 h-4 text-[#64748B]" />
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">18</div>
          <p className="text-[11px] text-[#3B82F6] font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 10% <span className="text-[#64748B] font-medium ml-1">from last month</span>
          </p>
        </Link>

        <Link
          href="/projects"
          className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#ECFDF5] text-[#10B981] rounded-xl group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Overall Progress</span>
            <MoreVertical className="w-4 h-4 text-[#64748B]" />
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">{overallProgress}%</div>
          <p className="text-[11px] text-[#10B981] font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> {completedTasksCount} done <span className="text-[#64748B] font-medium ml-1">of {totalTasksCount}</span>
          </p>
        </Link>
      </div>

      {/* Main Dashboard Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Section */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#0F172A]">Project Progress</h3>
            <Link href="/projects" className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer">
              <span>View All</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="flex items-center justify-between my-2 px-2">
            <div className="w-36 h-36 rounded-full border-[10px] border-[#4F46E5] border-t-[#10B981] border-r-[#3B82F6] border-b-[#F59E0B] flex items-center justify-center bg-[#F8FAFC] shadow-inner shrink-0">
              <div className="text-center">
                <span className="text-2xl font-black text-[#0F172A] block leading-none">{overallProgress}%</span>
                <span className="text-[10px] text-[#64748B] font-bold uppercase mt-1 block">Completed</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pl-4">
              <Link href="/projects?status=Completed" className="flex items-center justify-between gap-6 hover:opacity-80 transition-opacity">
                <span className="text-[#64748B] font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full shrink-0"></span> Completed
                </span>
                <span className="font-bold text-[#0F172A]">
                  {projects.filter((p) => p.status === "Completed").length}
                </span>
              </Link>
              <Link href="/projects?status=Active" className="flex items-center justify-between gap-6 hover:opacity-80 transition-opacity">
                <span className="text-[#64748B] font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full shrink-0"></span> Active
                </span>
                <span className="font-bold text-[#0F172A]">
                  {projects.filter((p) => p.status === "Active").length}
                </span>
              </Link>
              <Link href="/projects?status=In%20Progress" className="flex items-center justify-between gap-6 hover:opacity-80 transition-opacity">
                <span className="text-[#64748B] font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#3B82F6] rounded-full shrink-0"></span> In Progress
                </span>
                <span className="font-bold text-[#0F172A]">
                  {projects.filter((p) => p.status === "In Progress").length}
                </span>
              </Link>
              <Link href="/projects?status=On%20Hold" className="flex items-center justify-between gap-6 hover:opacity-80 transition-opacity">
                <span className="text-[#64748B] font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-full shrink-0"></span> On Hold
                </span>
                <span className="font-bold text-[#0F172A]">
                  {projects.filter((p) => p.status === "On Hold").length}
                </span>
              </Link>
            </div>
          </div>

          <Link
            href="/projects"
            className="w-full text-center text-xs bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#4F46E5] font-extrabold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#E2E8F0] whitespace-nowrap"
          >
            <span>Explore All {projects.length} Projects</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>

        {/* My Tasks Section */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-[#0F172A]">My Tasks</h3>
            <Link
              href="/tasks"
              className="text-xs text-[#4F46E5] font-bold hover:underline cursor-pointer"
            >
              Master Tasks
            </Link>
          </div>

          <div className="space-y-3">
            {myTasks.map((task) => (
              <Link
                href={`/projects/${task.projectId}/kanban`}
                key={task.id}
                className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl flex items-center justify-between hover:bg-white transition-all cursor-pointer block group gap-3"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors truncate">
                    {task.title}
                  </h4>
                  <span className="text-[10px] text-[#64748B] font-medium block truncate">{task.project}</span>
                </div>
                <div className="shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${task.statusColor}`}>
                    {task.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/tasks"
            className="w-full text-center text-xs bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#4F46E5] font-extrabold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#E2E8F0] whitespace-nowrap"
          >
            <span>Open Tasks Engine</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>

        {/* Recent Projects Section */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-[#0F172A]">Recent Projects</h3>
            <Link href="/projects" className="text-xs text-[#4F46E5] font-bold hover:underline cursor-pointer">
              View Directory
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((proj) => {
              const progress =
                proj.taskCount > 0 ? Math.round((proj.completedTaskCount / proj.taskCount) * 100) : 0;
              return (
                <Link
                  href={`/projects/${proj.id}/kanban`}
                  key={proj.id}
                  className="space-y-2 group cursor-pointer block hover:bg-[#F8FAFC] p-2.5 rounded-xl transition-colors border border-transparent hover:border-[#E2E8F0]"
                >
                  <div className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#EEF2FF] text-[#4F46E5] shrink-0">
                        <FolderKanban className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors block truncate">
                          {proj.name}
                        </span>
                        <span className="text-[10px] text-[#64748B] font-medium block truncate">{proj.category}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#4F46E5] shrink-0">{progress}%</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
                    <div
                      className="bg-[#4F46E5] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/projects"
            className="w-full text-center text-xs bg-[#F8FAFC] hover:bg-[#EEF2FF] text-[#4F46E5] font-extrabold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#E2E8F0] whitespace-nowrap"
          >
            <span>All Projects Directory</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Bottom Activities Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-extrabold text-[#0F172A]">Latest Activities</h3>
          <Link href="/team" className="text-xs text-[#4F46E5] font-bold hover:underline cursor-pointer">
            View Team
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latestActivities.map((act) => (
            <Link
              href={`/projects/${act.projectId}/kanban`}
              key={act.id}
              className="flex items-center justify-between text-xs hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors cursor-pointer block border border-[#E2E8F0] gap-3"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full ${act.bg} flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm`}
                >
                  {act.avatar}
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-[#0F172A] leading-tight truncate">
                    {act.user} <span className="font-medium text-[#64748B]">{act.action}</span>
                  </h5>
                </div>
              </div>
              <span className="text-[10px] font-medium text-[#64748B] shrink-0 pl-2">{act.time}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
