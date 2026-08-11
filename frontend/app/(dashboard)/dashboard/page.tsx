"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderKanban, CheckSquare, Users, TrendingUp, ArrowUpRight, ArrowRight, MoreVertical, Calendar as CalendarIcon, Globe, Smartphone, Cpu, Megaphone, ChevronDown, ChevronLeft, ChevronRight, X, Check } from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate years from 2000 up to 2050 (Future-ready)
const YEARS_RANGE = Array.from({ length: 51 }, (_, i) => 2000 + i);

export default function DashboardPage() {
  const today = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Real Dynamic Calendar State (Default to current real date: Aug 2026)
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [startDay, setStartDay] = useState(1);
  const [endDay, setEndDay] = useState(7);
  const [activePreset, setActivePreset] = useState("This Week");

  // Selected Range Display Text
  const [selectedRangeText, setSelectedRangeText] = useState(
    `${MONTH_NAMES[today.getMonth()].slice(0, 3)} 1 – ${MONTH_NAMES[today.getMonth()].slice(0, 3)} 7, ${today.getFullYear()}`
  );

  const myTasks = [
    { id: "t1", title: "Design landing page", project: "Website Redesign", status: "In Progress", statusColor: "bg-[#EEF2FF] text-[#6366F1]", dotColor: "bg-[#6366F1]" },
    { id: "t2", title: "API integration", project: "Mobile App", status: "To Do", statusColor: "bg-blue-50 text-blue-600", dotColor: "bg-blue-500" },
    { id: "t3", title: "Setup database", project: "AI Platform", status: "In Progress", statusColor: "bg-[#EEF2FF] text-[#6366F1]", dotColor: "bg-[#6366F1]" },
    { id: "t4", title: "Write documentation", project: "Website Redesign", status: "Done", statusColor: "bg-emerald-50 text-emerald-600", dotColor: "bg-emerald-500" },
  ];

  const recentProjects = [
    { id: "p1", name: "Website Redesign", progress: 60, icon: Globe, iconBg: "bg-indigo-50 text-[#6366F1]", barBg: "bg-[#6366F1]" },
    { id: "p2", name: "Mobile App Development", progress: 45, icon: Smartphone, iconBg: "bg-blue-50 text-blue-600", barBg: "bg-blue-500" },
    { id: "p3", name: "AI Platform", progress: 20, icon: Cpu, iconBg: "bg-amber-50 text-amber-600", barBg: "bg-amber-500" },
    { id: "p4", name: "Marketing Website", progress: 100, icon: Megaphone, iconBg: "bg-emerald-50 text-emerald-600", barBg: "bg-emerald-500" },
  ];

  const latestActivities = [
    { id: "a1", user: "Sarah Khan", action: 'completed "API integration"', time: "2m ago", avatar: "SK", bg: "bg-purple-100 text-purple-700" },
    { id: "a2", user: "Ali Ahmed", action: "uploaded a new file", time: "15m ago", avatar: "AA", bg: "bg-blue-100 text-blue-700" },
    { id: "a3", user: "Fatima Noor", action: 'commented on "Design landing page"', time: "1h ago", avatar: "FN", bg: "bg-emerald-100 text-emerald-700" },
    { id: "a4", user: "Uman Tariq", action: "created a new task", time: "2h ago", avatar: "UT", bg: "bg-amber-100 text-amber-700" },
  ];

  // Dynamic Date Calculation Utilities
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

  return (
    <div className="space-y-6 font-sans relative">
      {/* Top Header & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, Atif! <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Here's what's happening with your Codentra projects today.</p>
        </div>

        {/* Real Dynamic Calendar Picker Button */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`flex items-center space-x-2 bg-white border px-4 py-2.5 rounded-2xl shadow-sm text-xs font-semibold text-slate-800 hover:border-[#6366F1] transition-all cursor-pointer ${
              showCalendar ? "border-[#6366F1] ring-2 ring-indigo-100" : "border-slate-200/80"
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-[#6366F1]" />
            <span>{selectedRangeText}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showCalendar ? "rotate-180 text-[#6366F1]" : ""}`} />
          </button>

          {/* Real Dynamic Calendar Modal (2000 - 2050+) */}
          {showCalendar && (
            <div className="absolute right-0 top-12 w-80 md:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-[#6366F1]" />
                  <span className="text-sm font-extrabold text-slate-900">Select Date Range</span>
                </div>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Preset Range Pills */}
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
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                      activePreset === preset
                        ? "bg-[#6366F1] text-white shadow-sm"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Month & Year Selectors Header (2000 -> Future 2050+) */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  {/* Month Dropdown */}
                  <select
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-900 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6366F1] cursor-pointer"
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={idx}>{m}</option>
                    ))}
                  </select>

                  {/* Year Dropdown (2000 -> 2050) */}
                  <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-900 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6366F1] cursor-pointer"
                  >
                    {YEARS_RANGE.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {/* Next / Previous Month Navigation Arrows */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    title="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Calendar Days Grid */}
              <div className="space-y-1">
                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase py-1">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {/* Empty cells for starting day offset */}
                  {Array.from({ length: firstDayOffset }).map((_, idx) => (
                    <div key={`offset-${idx}`} className="h-8"></div>
                  ))}

                  {/* Real Days of Month */}
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
                            ? "bg-[#6366F1] text-white shadow-md shadow-indigo-500/30"
                            : inRange
                            ? "bg-[#EEF2FF] text-[#6366F1]"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500">
                  {MONTH_NAMES[currentMonth].slice(0, 3)} {startDay} – {startDay === endDay ? startDay : endDay}, {currentYear}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyRange}
                    className="px-4 py-1.5 text-xs font-bold bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center space-x-1 cursor-pointer"
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

      {/* 4 Clickable Top KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects KPI */}
        <Link href="/projects" className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group cursor-pointer">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Projects</span>
            <MoreVertical className="w-4 h-4 text-slate-300" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 my-1">12</div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 26% <span className="text-slate-400 font-normal ml-1">from last month</span>
          </p>
        </Link>

        {/* Tasks KPI */}
        <Link href="/projects/proj-101/kanban" className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group cursor-pointer">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-105 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Tasks</span>
            <MoreVertical className="w-4 h-4 text-slate-300" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 my-1">48</div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 15% <span className="text-slate-400 font-normal ml-1">from last month</span>
          </p>
        </Link>

        {/* Team Members KPI */}
        <Link href="/team" className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group cursor-pointer">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Team Members</span>
            <MoreVertical className="w-4 h-4 text-slate-300" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 my-1">18</div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 10% <span className="text-slate-400 font-normal ml-1">from last month</span>
          </p>
        </Link>

        {/* Overall Progress KPI */}
        <Link href="/projects" className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group cursor-pointer">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Overall Progress</span>
            <MoreVertical className="w-4 h-4 text-slate-300" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 my-1">75%</div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 5% <span className="text-slate-400 font-normal ml-1">from last month</span>
          </p>
        </Link>
      </div>

      {/* Middle Row (3 Widgets): Donut Chart + My Tasks + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Donut Widget */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Project Progress</h3>
          
          <div className="flex items-center justify-between my-2 px-2">
            <div className="w-36 h-36 rounded-full border-[10px] border-[#6366F1] border-t-emerald-500 border-r-amber-500 border-b-[#818CF8] flex items-center justify-center bg-slate-50/50 shadow-inner">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900 block leading-none">75%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">Total</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pl-4">
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Completed
                </span>
                <span className="font-bold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#6366F1] rounded-full"></span> In Progress
                </span>
                <span className="font-bold text-slate-900">8</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> On Hold
                </span>
                <span className="font-bold text-slate-900">2</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-slate-300 rounded-full"></span> Not Started
                </span>
                <span className="font-bold text-slate-900">4</span>
              </div>
            </div>
          </div>

          <Link href="/projects" className="w-full text-center text-xs text-[#6366F1] font-bold hover:underline py-2 flex items-center justify-center gap-1 cursor-pointer">
            <span>View all projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* My Tasks List Widget */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-slate-900">My Tasks</h3>
            <Link href="/projects/proj-101/kanban" className="text-xs text-[#6366F1] font-bold hover:underline cursor-pointer">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {myTasks.map((task) => (
              <Link href="/projects/proj-101/kanban" key={task.id} className="bg-slate-50/60 border border-slate-100 p-3.5 rounded-2xl flex items-center justify-between hover:bg-slate-100/60 transition-colors cursor-pointer block">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{task.project}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl ${task.statusColor}`}>
                    {task.status}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${task.dotColor}`}></span>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/projects/proj-101/kanban" className="w-full text-center text-xs text-[#6366F1] font-bold hover:underline py-1 flex items-center justify-center gap-1 cursor-pointer">
            <span>View all tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Recent Projects Widget */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-slate-900">Recent Projects</h3>
            <Link href="/projects" className="text-xs text-[#6366F1] font-bold hover:underline cursor-pointer">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentProjects.map((proj) => {
              const Icon = proj.icon;
              return (
                <Link href="/projects" key={proj.id} className="space-y-2 group cursor-pointer block">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${proj.iconBg}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-[#6366F1] transition-colors">{proj.name}</span>
                    </div>
                    <span className="font-bold text-[#6366F1]">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${proj.barBg} h-full rounded-full transition-all duration-500`} style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row (2 Widgets): Activity Overview Curve Chart + Latest Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Overview Spline Area Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-slate-900">Activity Overview</h3>
            <span className="text-xs font-bold text-slate-400">Weekly Performance</span>
          </div>

          <div className="w-full h-56 relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="40" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#F1F5F9" strokeWidth="1" />

              <text x="15" y="24" fill="#94A3B8" fontSize="10" fontWeight="bold">100</text>
              <text x="15" y="64" fill="#94A3B8" fontSize="10" fontWeight="bold">80</text>
              <text x="15" y="104" fill="#94A3B8" fontSize="10" fontWeight="bold">60</text>
              <text x="15" y="144" fill="#94A3B8" fontSize="10" fontWeight="bold">40</text>
              <text x="25" y="174" fill="#94A3B8" fontSize="10" fontWeight="bold">0</text>

              <path
                d="M 60 150 Q 130 110, 200 120 T 340 50 T 480 150 L 480 160 L 60 160 Z"
                fill="url(#areaGradient)"
              />

              <path
                d="M 60 150 Q 130 110, 200 120 T 340 50 T 480 150"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <circle cx="60" cy="150" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="130" cy="110" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="200" cy="120" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="270" cy="80" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="340" cy="50" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="410" cy="100" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="480" cy="150" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            <div className="flex justify-between pl-10 pr-4 text-[11px] font-bold text-slate-400 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Latest Activities Timeline Widget */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-slate-900">Latest Activities</h3>
            <Link href="/team" className="text-xs text-[#6366F1] font-bold hover:underline cursor-pointer">
              View All
            </Link>
          </div>

          <div className="space-y-3.5">
            {latestActivities.map((act) => (
              <Link href="/team" key={act.id} className="flex items-center justify-between text-xs hover:bg-slate-50 p-2 rounded-2xl transition-colors cursor-pointer block">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${act.bg} flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm`}>
                    {act.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 leading-tight">
                      {act.user} <span className="font-medium text-slate-500">{act.action}</span>
                    </h5>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-slate-400 shrink-0 pl-2">{act.time}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
