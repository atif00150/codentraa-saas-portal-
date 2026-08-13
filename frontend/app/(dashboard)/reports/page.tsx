"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Download,
  CheckCircle2,
  Zap,
  ArrowUpRight
} from "lucide-react";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("Q3 2026");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const projectReports = [
    { name: "Codentraa Multi-Tenant Portal Revamp", tasks: 14, completed: 8, progress: 60, status: "On Track", velocity: "9.2/10" },
    { name: "Mobile API Integration", tasks: 9, completed: 4, progress: 45, status: "On Track", velocity: "8.8/10" },
    { name: "AI Engine & Analytics", tasks: 15, completed: 3, progress: 20, status: "Medium", velocity: "7.5/10" },
    { name: "Marketing Launch Site", tasks: 10, completed: 10, progress: 100, status: "Completed", velocity: "10/10" },
    { name: "Enterprise Security Audit", tasks: 8, completed: 3, progress: 35, status: "On Hold", velocity: "6.0/10" },
    { name: "Cloud K8s Migration", tasks: 12, completed: 9, progress: 80, status: "On Track", velocity: "9.5/10" },
  ];

  const handleExportCSV = () => {
    const headers = ["ProjectName", "TasksCount", "CompletedTasks", "ProgressPercentage", "Status", "VelocityScore"];
    const rows = projectReports.map((p) => [
      `"${p.name.replace(/"/g, '""')}"`,
      p.tasks,
      p.completed,
      `${p.progress}%`,
      p.status,
      p.velocity,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `codentraa_analytics_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMsg("Executive report exported to CSV successfully.");
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8 font-sans pb-12 text-[#0F172A] bg-[#F8FAFC]">
      {/* Toast Notification Alert */}
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
              Executive Analytics
            </span>
            <span className="text-[#64748B] text-xs font-medium">• Live Metrics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
            Reports & Velocity Performance <BarChart3 className="w-6 h-6 text-[#4F46E5]" />
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Analyze team productivity, delivery speed, sprint velocity, and resource utilization.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Velocity Index</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">4.8 / 5.0</div>
          <p className="text-[11px] text-[#10B981] font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% <span className="text-[#64748B] font-medium ml-1">vs last sprint</span>
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#ECFDF5] text-[#10B981] rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">On-Time Delivery</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">94%</div>
          <p className="text-[11px] text-[#10B981] font-bold">5 of 6 projects on schedule</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Total Task Output</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">142</div>
          <p className="text-[11px] text-[#4F46E5] font-bold">Tasks completed Q3</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Efficiency Score</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">98.2%</div>
          <p className="text-[11px] text-[#3B82F6] font-bold">Zero-defect deployment</p>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-extrabold text-[#0F172A]">Sprint Task Completion Trend</h3>
            <span className="text-xs font-medium text-[#64748B]">Weekly Output vs Targets</span>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="Q3 2026">Q3 2026</option>
            <option value="Q2 2026">Q2 2026</option>
          </select>
        </div>

        <div className="w-full h-56 relative pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180">
            <defs>
              <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="40" y1="60" x2="480" y2="60" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="40" y1="100" x2="480" y2="100" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="40" y1="140" x2="480" y2="140" stroke="#E2E8F0" strokeWidth="1" />

            <path
              d="M 60 140 Q 130 80, 200 90 T 340 40 T 480 130 L 480 160 L 60 160 Z"
              fill="url(#reportGrad)"
            />
            <path
              d="M 60 140 Q 130 80, 200 90 T 340 40 T 480 130"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Project Reports Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#0F172A]">Project Performance Breakdown</h3>
          <Link href="/projects" className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer">
            View All Projects
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase tracking-wider font-extrabold border-b border-[#E2E8F0]">
              <tr>
                <th className="p-4 pl-6">Project Name</th>
                <th className="p-4">Completed Tasks</th>
                <th className="p-4">Progress Rate</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4 pr-6 text-right">Sprint Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A] font-medium">
              {projectReports.map((p) => (
                <tr key={p.name} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="p-4 pl-6 font-extrabold text-[#0F172A]">{p.name}</td>
                  <td className="p-4 font-mono text-[#64748B]">
                    {p.completed} / {p.tasks} tasks
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-[#F8FAFC] border border-[#E2E8F0] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#4F46E5] h-full rounded-full"
                          style={{ width: `${p.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-[#4F46E5]">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase border ${
                        p.status === "Completed"
                          ? "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]"
                          : p.status === "On Track"
                          ? "bg-[#EEF2FF] text-[#4F46E5] border-indigo-100"
                          : "bg-[#FEF3C7] text-[#D97706] border-amber-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right font-bold text-[#0F172A]">{p.velocity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
