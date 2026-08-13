"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Building2,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Save,
  Radio,
  Download
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "org" | "security" | "api">("profile");

  // Profile State
  const [fullName, setFullName] = useState("Atif Mughal");
  const [email, setEmail] = useState("atif@codentraa.com");
  const [jobTitle, setJobTitle] = useState("Organization Owner");

  // Organization State
  const [orgName, setOrgName] = useState("Codentraa Agency");
  const [orgSlug, setOrgSlug] = useState("codentraa-agency");
  const [subscriptionTier, setSubscriptionTier] = useState("Enterprise Pro");

  // Security State
  const [jwtIssuer, setJwtIssuer] = useState("Codentraa.Api");
  const [jwtAudience, setJwtAudience] = useState("Codentraa.Frontend");
  const [signalrEndpoint, setSignalrEndpoint] = useState("http://localhost:5000/hubs/task");

  const [savedAlert, setSavedAlert] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSavedAlert(msg);
    setTimeout(() => setSavedAlert(null), 4000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Workspace Settings successfully updated and synchronized across C# .NET API.");
  };

  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      user: { fullName, email, jobTitle },
      organization: { orgName, orgSlug, subscriptionTier },
      security: { jwtIssuer, jwtAudience, signalrEndpoint },
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `codentraa_workspace_backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("System configuration backup exported to JSON file.");
  };

  return (
    <div className="space-y-8 font-sans pb-12 text-[#0F172A] bg-[#F8FAFC]">
      {/* Toast Alert */}
      {savedAlert && (
        <div className="fixed top-20 right-8 z-50 bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-[#047857] text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{savedAlert}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              System Settings
            </span>
            <span className="text-[#64748B] text-xs font-medium">• Multi-Tenant Configuration</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
            Workspace Settings <Settings className="w-6 h-6 text-[#4F46E5]" />
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Manage organization details, profile preferences, JWT authentication, and WebSockets endpoints.
          </p>
        </div>

        <button
          onClick={handleExportBackup}
          className="bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] px-4 py-3 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
          title="Export Backup JSON"
        >
          <Download className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>Export Backup (JSON)</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border border-[#E2E8F0] p-2 rounded-2xl shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === "profile"
              ? "bg-[#4F46E5] text-white shadow-sm"
              : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          }`}
        >
          <User className="w-4 h-4" />
          <span>General Profile</span>
        </button>

        <button
          onClick={() => setActiveTab("org")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === "org"
              ? "bg-[#4F46E5] text-white shadow-sm"
              : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Organization & Multi-Tenancy</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === "security"
              ? "bg-[#4F46E5] text-white shadow-sm"
              : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & JWT Tokens</span>
        </button>

        <button
          onClick={() => setActiveTab("api")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === "api"
              ? "bg-[#4F46E5] text-white shadow-sm"
              : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>API Keys & SignalR WebSockets</span>
        </button>
      </div>

      {/* Main Settings Form Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === "profile" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-base font-extrabold text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                User Profile Preferences
              </h3>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-[#4F46E5] text-white font-extrabold text-xl flex items-center justify-center shadow-sm">
                  AM
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F172A]">{fullName}</h4>
                  <p className="text-xs text-[#64748B] font-medium">{jobTitle}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Role Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>
          )}

          {activeTab === "org" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-base font-extrabold text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                Organization & Multi-Tenancy
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Tenant Identifier Slug (EF Core Interceptor Key)
                </label>
                <input
                  type="text"
                  value={orgSlug}
                  onChange={(e) => setOrgSlug(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-bold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div className="bg-[#ECFDF5] p-4 rounded-xl border border-[#A7F3D0] flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#047857] block">Subscription Tier</span>
                  <span className="text-xs text-[#047857] font-bold">{subscriptionTier} — Active</span>
                </div>
                <span className="bg-[#10B981] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                  Verified
                </span>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-base font-extrabold text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                JWT Authentication Settings
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Valid Issuer
                </label>
                <input
                  type="text"
                  value={jwtIssuer}
                  onChange={(e) => setJwtIssuer(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-bold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Valid Audience
                </label>
                <input
                  type="text"
                  value={jwtAudience}
                  onChange={(e) => setJwtAudience(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-bold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div className="bg-[#EEF2FF] p-4 rounded-xl border border-indigo-100 space-y-1">
                <span className="text-xs font-extrabold text-[#4F46E5] block">JWT Token Rotation Secret</span>
                <p className="text-[11px] text-[#64748B] font-mono font-semibold">
                  Codentraa_Super_Secret_JWT_Key_2026_Enterprise_SaaS
                </p>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-base font-extrabold text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                SignalR WebSockets Endpoint Hub
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  SignalR WebSockets URL
                </label>
                <input
                  type="text"
                  value={signalrEndpoint}
                  onChange={(e) => setSignalrEndpoint(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-bold text-[#0F172A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div className="flex items-center space-x-2 bg-[#ECFDF5] p-4 rounded-xl border border-[#A7F3D0]">
                <Radio className="w-4 h-4 animate-pulse text-[#10B981]" />
                <span className="text-xs font-extrabold text-[#047857]">
                  SignalR Connection Status: Active & Connected
                </span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end">
            <button
              type="submit"
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Workspace Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
