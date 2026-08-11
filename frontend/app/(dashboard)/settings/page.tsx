"use client";

import { useState } from "react";
import { Settings, Building2, Key, Bell, Shield, Save, CheckCircle2, Copy } from "lucide-react";

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("Acme Agency Inc.");
  const [slug, setSlug] = useState("acme-agency");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [webhooksActive, setWebhooksActive] = useState(true);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiKey = "cdnt_live_89f2a0b1c2d3e4f5a6b7c8d9e0f1a2b3";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
            Workspace Configuration
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Organization & API Settings</h1>
          <p className="text-sm text-slate-400">Manage tenant profile, security credentials, and webhooks</p>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center space-x-3 text-emerald-400 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Workspace Settings Saved Successfully!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Organization Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Organization Profile</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Organization Slug</label>
              <div className="flex items-center">
                <span className="bg-slate-800 border border-r-0 border-slate-800 text-slate-400 text-xs px-3 py-2.5 rounded-l-xl">codentraa.io/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 text-sm text-white rounded-r-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Workspace Changes</span>
            </button>
          </form>
        </div>

        {/* API Credentials Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <Key className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">API Secret Key & Webhooks</h2>
          </div>

          <div className="space-y-3 max-w-xl">
            <p className="text-xs text-slate-400">Use this key to authenticate REST API requests from external integrations.</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-1 bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 rounded-xl px-4 py-2.5 focus:outline-none"
              />
              <button
                onClick={copyApiKey}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-blue-400" />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
