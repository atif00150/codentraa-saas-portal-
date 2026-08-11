import React from "react";

export default function AuthIllustration() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#F0F4FF] via-[#EEF2FF] to-[#E0E7FF] p-8 flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Ambient Radial Blur */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-indigo-400/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-400/20 blur-3xl rounded-full pointer-events-none"></div>

      {/* Vector Illustration Container */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center space-y-6">
        {/* Floating Analytics Chart Graphic */}
        <div className="w-full bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100/80 shadow-xl shadow-indigo-500/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-[11px] font-bold text-slate-700">Project Performance</span>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">+28%</span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="flex items-end space-x-2 h-20 pt-2 px-1">
            <div className="flex-1 bg-indigo-200 h-10 rounded-t-md"></div>
            <div className="flex-1 bg-indigo-300 h-14 rounded-t-md"></div>
            <div className="flex-1 bg-indigo-400 h-8 rounded-t-md"></div>
            <div className="flex-1 bg-[#6366F1] h-18 rounded-t-md"></div>
            <div className="flex-1 bg-purple-500 h-12 rounded-t-md"></div>
          </div>
        </div>

        {/* Developer Working SVG Graphics */}
        <div className="w-full flex justify-center">
          <svg className="w-64 h-48 text-indigo-600" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Desk */}
            <rect x="30" y="150" width="240" height="8" rx="4" fill="#6366F1" opacity="0.3" />
            <rect x="50" y="158" width="6" height="50" fill="#6366F1" opacity="0.3" />
            <rect x="244" y="158" width="6" height="50" fill="#6366F1" opacity="0.3" />

            {/* Laptop */}
            <rect x="110" y="110" width="75" height="40" rx="4" fill="#4F46E5" />
            <path d="M100 150H195L190 152H105L100 150Z" fill="#312E81" />
            <rect x="116" y="115" width="63" height="30" rx="2" fill="#EEF2FF" />

            {/* Developer Person */}
            <circle cx="210" cy="75" r="16" fill="#4F46E5" />
            <path d="M190 150C190 115 230 115 230 150H190Z" fill="#6366F1" />
            <path d="M185 105C185 95 235 95 235 105L230 140H190L185 105Z" fill="#818CF8" />

            {/* Plant Container */}
            <path d="M45 150L48 125H62L65 150H45Z" fill="#A5B4FC" />
            <circle cx="50" cy="115" r="10" fill="#10B981" opacity="0.8" />
            <circle cx="60" cy="110" r="12" fill="#059669" opacity="0.8" />
          </svg>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-sm font-extrabold text-slate-800">Enterprise Multi-Tenant SaaS</h3>
          <p className="text-[11px] text-slate-500">Real-time collaboration, RBAC & Kanban task engine</p>
        </div>
      </div>
    </div>
  );
}
