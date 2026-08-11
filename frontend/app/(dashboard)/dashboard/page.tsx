import { FolderKanban, CheckSquare, Users, TrendingUp, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const myTasks = [
    { id: "t1", title: "Design landing page", project: "Website Redesign", status: "In Progress", statusColor: "bg-indigo-50 text-[#6366F1] border-indigo-200" },
    { id: "t2", title: "API integration", project: "Mobile App", status: "To Do", statusColor: "bg-slate-100 text-slate-700 border-slate-200" },
    { id: "t3", title: "Setup database", project: "AI Platform", status: "In Progress", statusColor: "bg-indigo-50 text-[#6366F1] border-indigo-200" },
    { id: "t4", title: "Write documentation", project: "Website Redesign", status: "Done", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ];

  const recentProjects = [
    { id: "p1", name: "Website Redesign", status: "In Progress", progress: 60, color: "bg-[#6366F1]" },
    { id: "p2", name: "Mobile App Development", status: "In Progress", progress: 45, color: "bg-blue-500" },
    { id: "p3", name: "AI Platform", status: "Planning", progress: 20, color: "bg-amber-500" },
    { id: "p4", name: "Marketing Website", status: "Completed", progress: 100, color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Welcome back, Atif! <span className="animate-bounce">👋</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Here's what's happening with your Codentra projects today.</p>
      </div>

      {/* 4 KPI Stat Cards (Matching Figma Design System) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Projects</span>
            <div className="p-2.5 bg-indigo-50 text-[#6366F1] rounded-xl">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">12</div>
          <p className="text-[11px] text-emerald-600 flex items-center font-bold">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 26% from last month
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tasks</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">48</div>
          <p className="text-[11px] text-emerald-600 flex items-center font-bold">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 15% from last month
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Team Members</span>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">18</div>
          <p className="text-[11px] text-emerald-600 flex items-center font-bold">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 10% from last month
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Overall Progress</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">75%</div>
          <p className="text-[11px] text-emerald-600 flex items-center font-bold">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 5% from last month
          </p>
        </div>
      </div>

      {/* Grid Layout: Donut Chart + My Tasks + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Donut Widget (Figma Style) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Project Progress</h3>
          
          <div className="flex items-center justify-center relative my-4">
            <div className="w-36 h-36 rounded-full border-8 border-[#6366F1] border-t-emerald-500 border-r-amber-500 flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-slate-900 block">75%</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Total</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Completed
              </span>
              <span className="font-bold text-slate-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 bg-[#6366F1] rounded-full"></span> In Progress
              </span>
              <span className="font-bold text-slate-900">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> On Hold
              </span>
              <span className="font-bold text-slate-900">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 bg-slate-300 rounded-full"></span> Not Started
              </span>
              <span className="font-bold text-slate-900">4</span>
            </div>
          </div>
        </div>

        {/* My Tasks List Widget (Figma Style) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">My Tasks</h3>
            <button className="text-xs text-[#6366F1] font-bold hover:underline">View All</button>
          </div>

          <div className="space-y-3">
            {myTasks.map((task) => (
              <div key={task.id} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl flex items-center justify-between hover:bg-slate-100/50 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{task.project}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${task.statusColor}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects Widget (Figma Style) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Recent Projects</h3>
            <button className="text-xs text-[#6366F1] font-bold hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {recentProjects.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">{proj.name}</span>
                  <span className="font-bold text-[#6366F1]">{proj.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
                  <div className={`${proj.color} h-full rounded-full transition-all duration-500`} style={{ width: `${proj.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
