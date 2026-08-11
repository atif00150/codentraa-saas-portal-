"use client";

import Link from "next/link";
import { FolderKanban, CheckSquare, Users, TrendingUp, ArrowUpRight, ArrowRight, MoreVertical, Calendar, Globe, Smartphone, Cpu, Megaphone, ChevronDown } from "lucide-react";

export default function DashboardPage() {
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

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, Atif! <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Here's what's happening with your Codentra projects today.</p>
        </div>

        {/* Clickable Date Range Filter Dropdown */}
        <div className="flex items-center space-x-2 bg-white border border-slate-200/80 px-4 py-2 rounded-2xl shadow-sm text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer self-start md:self-auto">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>May 20 – May 26, 2024</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
        </div>
      </div>

      {/* 4 Clickable Top KPI Stat Cards (Matching Figma Screenshot) */}
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
        {/* Project Progress Donut Widget (Exact Figma Styling) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Project Progress</h3>
          
          <div className="flex items-center justify-between my-2 px-2">
            {/* Donut Chart Ring */}
            <div className="w-36 h-36 rounded-full border-[10px] border-[#6366F1] border-t-emerald-500 border-r-amber-500 border-b-[#818CF8] flex items-center justify-center bg-slate-50/50 shadow-inner">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900 block leading-none">75%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">Total</span>
              </div>
            </div>

            {/* Legend Status Breakdown */}
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

        {/* My Tasks List Widget (Exact Figma Styling) */}
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

        {/* Recent Projects Widget (Exact Figma Styling) */}
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
        {/* Activity Overview Spline Area Chart (Exact Figma Styling) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-slate-900">Activity Overview</h3>
            <span className="text-xs font-bold text-slate-400">Weekly Performance</span>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="w-full h-56 relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Y-Axis Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#F1F5F9" strokeWidth="1" />

              {/* Y-Axis Text */}
              <text x="15" y="24" fill="#94A3B8" fontSize="10" fontWeight="bold">100</text>
              <text x="15" y="64" fill="#94A3B8" fontSize="10" fontWeight="bold">80</text>
              <text x="15" y="104" fill="#94A3B8" fontSize="10" fontWeight="bold">60</text>
              <text x="15" y="144" fill="#94A3B8" fontSize="10" fontWeight="bold">40</text>
              <text x="25" y="174" fill="#94A3B8" fontSize="10" fontWeight="bold">0</text>

              {/* Filled Area Under Curve */}
              <path
                d="M 60 150 Q 130 110, 200 120 T 340 50 T 480 150 L 480 160 L 60 160 Z"
                fill="url(#areaGradient)"
              />

              {/* Smooth Curve Line */}
              <path
                d="M 60 150 Q 130 110, 200 120 T 340 50 T 480 150"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Points Dots */}
              <circle cx="60" cy="150" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="130" cy="110" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="200" cy="120" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="270" cy="80" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="340" cy="50" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="410" cy="100" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="480" cy="150" r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* X-Axis Labels */}
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

        {/* Latest Activities Timeline Widget (Exact Figma Styling) */}
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
