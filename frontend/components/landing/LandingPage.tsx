"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Shield,
  LayoutGrid,
  Users,
  CheckCircle2,
  Lock,
  Layers,
  BarChart3,
  Check,
  ChevronDown,
  Globe,
  Clock,
  Menu,
  X,
  Zap,
  Building2,
  FolderKanban,
  UserCheck,
  ShieldCheck,
  HelpCircle,
  Star
} from "lucide-react";

import Logo from "@/components/ui/Logo";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Codentra SaaS Portal?",
      a: "Codentra is a multi-tenant enterprise portal designed for software agencies, dev teams, and freelancers to manage client projects, Kanban task boards, RBAC permissions, and team collaboration in one unified dashboard."
    },
    {
      q: "How does multi-tenant data isolation work?",
      a: "Every organization operates in its own securely isolated tenant database sandbox with strict Tenant-ID filtering on all API requests, ensuring zero risk of cross-tenant data leaks."
    },
    {
      q: "Can I assign custom roles to my team members?",
      a: "Yes! Codentra includes 5 built-in granular RBAC roles: Owner, Admin, Manager, Developer, and Client. Each role comes with enforced permissions for task creation, project editing, billing, and member invites."
    },
    {
      q: "Is there a free trial available?",
      a: "Absolutely. You can start with our 100% Free plan forever (1 workspace, 5 team members) or evaluate our Pro plan with a 14-day risk-free trial."
    },
    {
      q: "Can I connect my existing backend or API?",
      a: "Yes! Codentra is backed by a high-performance C# .NET 8 Web API Clean Architecture with JWT authentication and SignalR real-time updates."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#0F172A] font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-800 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          New Release v2.4
        </span>
        <span>Multi-Tenant Enterprise Workspaces & SignalR Real-Time Kanban are now live!</span>
        <Link href="/login" className="underline font-bold hover:text-indigo-200 ml-1 inline-flex items-center gap-1">
          Try Now <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Codentra Logo */}
            <Logo size="md" variant="light" subtitle="Multi-Tenant Agency SaaS" />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
              <a href="#solutions" className="hover:text-indigo-600 transition-colors">Why Codentra</a>
              <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-slate-700 hover:text-indigo-600 text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-700 font-semibold py-2 hover:text-indigo-600"
            >
              Features
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-700 font-semibold py-2 hover:text-indigo-600"
            >
              Why Crewforge
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-700 font-semibold py-2 hover:text-indigo-600"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-700 font-semibold py-2 hover:text-indigo-600"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full text-center text-slate-700 font-bold py-2.5 border border-slate-200 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="w-full text-center bg-indigo-600 text-white font-bold py-2.5 rounded-xl shadow-md"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-[#F8FAFD]">
        {/* Glowing Ambient Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-200/40 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-200/30 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 rounded-full text-indigo-700 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Now supporting unlimited workspaces</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Run your agency{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  without the chaos
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Crewforge brings projects, tasks, teams, and clients into one multi-tenant workspace, with Kanban boards, RBAC, and reporting built in from day one.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/register"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base px-7 py-4 rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-7 py-4 rounded-2xl border border-slate-200 shadow-sm transition-all text-center"
                >
                  Sign In
                </Link>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-5 border-0" fill="#10B981" color="#FFFFFF" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-5 border-0" fill="#10B981" color="#FFFFFF" />
                  <span>Instant organization setup</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive App Preview Card */}
            <div className="lg:col-span-6 relative">
              {/* Card Container with Floating Shadow */}
              <div className="relative mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-4 sm:p-6 overflow-hidden">
                
                {/* Mock Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs text-slate-400 font-mono ml-2">codentraa.app/dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-extrabold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Workspace Active
                  </div>
                </div>

                {/* Mock Breadcrumb & Board Header */}
                <div className="space-y-3 mb-6">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <span>Dashboard</span>
                    <span>/</span>
                    <span>Projects</span>
                    <span>/</span>
                    <span className="text-indigo-600 font-bold">Crewforge Portal Revamp</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                        Crewforge Portal Revamp — Kanban Engine
                      </h3>
                    </div>
                    <button className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                      + New Task
                    </button>
                  </div>
                </div>

                {/* Mock Kanban Columns Preview */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Column 1: To Do */}
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>To Do</span>
                      <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.5 rounded-full">2</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm space-y-1.5">
                      <span className="bg-sky-100 text-sky-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Medium</span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">Wire up real-time Kanban sync</p>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                        <span>👤 Unassigned</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm space-y-1.5">
                      <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Low</span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">Set up billing & subscriptions</p>
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                      <span>In Progress</span>
                      <span className="bg-indigo-200 text-indigo-900 text-[10px] px-1.5 py-0.5 rounded-full">1</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-indigo-200 shadow-sm space-y-1.5 ring-2 ring-indigo-500/20">
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">High</span>
                      <p className="text-xs font-semibold text-slate-900 leading-snug">Design multi-tenant dashboard UI</p>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-indigo-600 font-bold">
                        <span>👤 Atif Mughal</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Completed */}
                  <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                      <span>Completed</span>
                      <span className="bg-emerald-200 text-emerald-900 text-[10px] px-1.5 py-0.5 rounded-full">1</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-emerald-200 shadow-sm space-y-1.5 opacity-90">
                      <span className="bg-rose-100 text-rose-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Urgent</span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug line-through text-slate-400">Implement RBAC permission matrix</p>
                    </div>
                  </div>
                </div>

                {/* Floating RBAC Pill Badge over preview */}
                <div className="absolute bottom-4 left-6 bg-white/95 backdrop-blur border border-indigo-200 shadow-lg px-4 py-2 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">RBAC Enforced</div>
                    <div className="text-[10px] text-slate-500 font-semibold">5 roles permission matrix</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR */}
      <section className="bg-white border-y border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">5</div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">RBAC Roles</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">99.9%</div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">Uptime Target</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">50+</div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">Teams Onboarded</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">24/7</div>
              <div className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">Support Coverage</div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CREWFORGE / FEATURES SECTION */}
      <section id="features" className="py-20 bg-[#F8FAFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-indigo-600 text-xs font-extrabold tracking-widest uppercase bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full">
              WHY CREWFORGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything your agency needs,{" "}
              <span className="text-indigo-600">nothing it doesn't</span>
            </h2>
            <p className="text-slate-600 text-base">
              Built specifically for modern agencies to eliminate tool sprawl, manage multi-tenant permissions, and keep projects moving forward seamlessly.
            </p>
          </div>

          {/* Feature 1: Kanban Boards */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <FolderKanban className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Kanban Boards That Keep Up
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Drag-and-drop task boards per project, with priority tags, status updates, assignee tracking, and real-time SignalR sync built in from day one.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Real-time WebSocket task status updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Priority levels (Low, Medium, High, Urgent)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Granular assignee tracking & deadline alerts</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200/70 p-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-bold text-xs text-slate-800">Sprint Board — Frontend Polish</span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">Live Board</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 space-y-2">
                    <div className="font-bold text-indigo-900">In Progress</div>
                    <div className="bg-white p-2 rounded border border-indigo-200 shadow-xs font-medium text-slate-800">
                      Integrate SignalR Notification Hub
                    </div>
                  </div>
                  <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 space-y-2">
                    <div className="font-bold text-emerald-900">Completed</div>
                    <div className="bg-white p-2 rounded border border-emerald-200 shadow-xs font-medium text-slate-500 line-through">
                      Setup JWT Auth Middleware
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Multi-Tenant By Design */}
          <div id="solutions" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 bg-slate-50 rounded-2xl border border-slate-200/70 p-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Team Members & Access Control</h4>
                    <p className="text-[11px] text-slate-500">Invite organization members, assign roles, and manage workloads.</p>
                  </div>
                  <span className="text-xs font-bold bg-indigo-600 text-white px-3 py-1 rounded-lg">+ Invite Member</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="text-slate-400 text-[10px] font-bold">Total Members</div>
                    <div className="text-base font-extrabold text-slate-900">12</div>
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    <div className="text-emerald-700 text-[10px] font-bold">Active Members</div>
                    <div className="text-base font-extrabold text-emerald-800">12</div>
                  </div>
                  <div className="bg-indigo-50 p-2.5 rounded-lg border border-indigo-200">
                    <div className="text-indigo-700 text-[10px] font-bold">Admins & Owners</div>
                    <div className="text-base font-extrabold text-indigo-900">3</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Multi-Tenant By Design
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every organization's data is isolated automatically at the API layer. Invite clients and contractors without worrying about cross-tenant data leaks.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Strict Tenant-ID boundary checks on every request</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Custom subdomains and organization workspaces</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Secure client portal invitation links</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3: Role-Based Access Control (RBAC) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Role-Based Access Control
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Five built-in roles (Owner, Admin, Manager, Developer, Client) with a granular permission matrix your team actually understands.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Owner: Complete organization & billing control</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Admin & Manager: Full project & task lifecycle</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Developer & Client: Read/update scoped tasks</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200/70 p-6 overflow-x-auto">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 min-w-[400px]">
                <div className="text-xs font-bold text-slate-900 mb-3 flex items-center justify-between">
                  <span>Role-Based Access Control (RBAC) Matrix</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-extrabold">Active</span>
                </div>
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                      <th className="py-2">Capability</th>
                      <th className="text-center">Owner</th>
                      <th className="text-center">Admin</th>
                      <th className="text-center">Manager</th>
                      <th className="text-center">Dev</th>
                      <th className="text-center">Client</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    <tr>
                      <td className="py-2">Manage SaaS Billing</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-slate-300">✕</td>
                      <td className="text-center text-slate-300">✕</td>
                      <td className="text-center text-slate-300">✕</td>
                      <td className="text-center text-slate-300">✕</td>
                    </tr>
                    <tr>
                      <td className="py-2">Invite / Remove Members</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-slate-300">✕</td>
                      <td className="text-center text-slate-300">✕</td>
                      <td className="text-center text-slate-300">✕</td>
                    </tr>
                    <tr>
                      <td className="py-2">Create Projects & Boards</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-slate-300">✕</td>
                      <td className="text-center text-slate-300">✕</td>
                    </tr>
                    <tr>
                      <td className="py-2">Update Task Status</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                      <td className="text-center text-emerald-600 font-bold">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-indigo-600 text-xs font-extrabold tracking-widest uppercase bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full">
              PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Plans that scale with your team
            </h2>
            <p className="text-slate-600 text-base">
              Start free. Upgrade when you outgrow it. Transparent pricing for teams of any size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1: Free */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Free</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Ideal for small side projects & early evaluation</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500 font-bold">/forever</span>
                </div>
                <ul className="space-y-3 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 Organization Workspace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Up to 5 Users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>3 Active Projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>500 MB File Storage</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-3.5 rounded-xl transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Tier 2: Pro (Most Popular) */}
            <div className="bg-white rounded-3xl border-2 border-indigo-600 p-8 flex flex-col justify-between space-y-6 shadow-xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>
              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Pro</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Best for growing agencies & software teams</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$29</span>
                  <span className="text-xs text-slate-500 font-bold">/month</span>
                </div>
                <ul className="space-y-3 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>3 Organization Workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Up to 50 Users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>25 Active Projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>50 GB File Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>SignalR Real-Time Kanban Updates</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md shadow-indigo-500/30 transition-all"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Enterprise</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Full power for large enterprise agencies</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$99</span>
                  <span className="text-xs text-slate-500 font-bold">/month</span>
                </div>
                <ul className="space-y-3 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited Workspaces & Users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited Projects & Kanban Boards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 TB High-Speed Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>24/7 Dedicated Account Manager</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/login"
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-3.5 rounded-xl transition-colors"
              >
                Contact Sales
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-[#F8FAFD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-indigo-600 text-xs font-extrabold tracking-widest uppercase bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Got questions? We've got answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left font-bold text-slate-900 text-base flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-600 shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to streamline your agency workflow?
          </h2>
          <p className="text-indigo-200 text-base max-w-2xl mx-auto">
            Join 50+ software teams managing their projects, tasks, and multi-tenant client portals with Codentra Crewforge today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="bg-white text-indigo-900 hover:bg-slate-100 font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl transition-all"
            >
              Get Started Free Now
            </Link>
            <Link
              href="/login"
              className="bg-indigo-700/60 hover:bg-indigo-700 text-white border border-indigo-500/50 font-bold text-base px-8 py-4 rounded-2xl transition-all"
            >
              Sign In to Your Workspace
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
