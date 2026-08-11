import { FolderKanban, CheckSquare, Users, TrendingUp, ArrowUpRight, CheckCircle2, Clock, PauseCircle, Circle } from "lucide-react";

export default function DashboardPage() {
  const myTasks = [
    { id: "t1", title: "Design landing page", project: "Website Redesign", status: "In Progress", statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { id: "t2", title: "API integration", project: "Mobile App", status: "To Do", statusColor: "bg-slate-800 text-slate-300 border-slate-700" },
    { id: "t3", title: "Setup database", project: "AI Platform", status: "In Progress", statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { id: "t4", title: "Write documentation", project: "Website Redesign", status: "Done", statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  ];

  const recentProjects = [
    { id: "p1", name: "Website Redesign", status: "In Progress", progress: 60, color: "bg-indigo-600" },
    { id: "p2", name: "Mobile App Development", status: "In Progress", progress: 45, color: "bg-blue-500" },
    { id: "p3", name: "AI Platform", status: "Planning", progress: 20, color: "bg-amber-500" },
    { id: "p4", name: "Marketing Website", status: "Completed", progress: 100, color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Welcome back, Atif! <span className="animate-bounce">👋</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Here's what's happening with your Codentra projects today.</p>
      </div>

      {/* 4 KPI Stat Cards (Matching Figma Design System) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Projects</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">12</div>
          <p className="text-[11px] text-emerald-400 flex items-center font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 26% from last month
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Tasks</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">48</div>
          <p className="text-[11px] text-emerald-400 flex items-center font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 15% from last month
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Team Members</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">18</div>
          <p className="text-[11px] text-emerald-400 flex items-center font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 10% from last month
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Progress</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">75%</div>
          <p className="text-[11px] text-emerald-400 flex items-center font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 5% from last month
          </p>
        </div>
      </div>

      {/* Grid Layout: Donut Chart + My Tasks + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Donut Widget (Figma Style) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-base font-bold text-white">Project Progress</h3>
          
          <div className="flex items-center justify-center relative my-4">
            <div className="w-36 h-36 rounded-full border-8 border-indigo-600 border-t-emerald-500 border-r-amber-500 flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-white block">75%</span>
                <span className="text-[10px] text-slate-400 font-medium">Total</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Completed
              </span>
              <span className="font-bold text-white">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span> In Progress
              </span>
              <span className="font-bold text-white">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> On Hold
              </span>
              <span className="font-bold text-white">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-slate-700 rounded-full"></span> Not Started
              </span>
              <span className="font-bold text-white">4</span>
            </div>
          </div>
        </div>

        {/* My Tasks List Widget (Figma Style) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">My Tasks</h3>
            <button className="text-xs text-indigo-400 font-semibold hover:underline">View All</button>
          </div>

          <div className="space-y-3">
            {myTasks.map((task) => (
              <div key={task.id} className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{task.title}</h4>
                  <span className="text-[10px] text-slate-400">{task.project}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${task.statusColor}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects Widget (Figma Style) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Recent Projects</h3>
            <button className="text-xs text-indigo-400 font-semibold hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {recentProjects.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">{proj.name}</span>
                  <span className="font-semibold text-slate-400">{proj.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
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
