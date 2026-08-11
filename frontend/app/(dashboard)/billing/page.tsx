"use client";

import { useState } from "react";
import { CreditCard, Check, Zap, ShieldCheck, Sparkles, HardDrive } from "lucide-react";

export default function BillingPage() {
  const [selectedCycle, setSelectedCycle] = useState<"monthly" | "yearly">("monthly");
  const [upgraded, setUpgraded] = useState(false);

  const plans = [
    {
      name: "Free Tier",
      price: "$0",
      description: "Ideal for small side projects & early evaluation",
      features: ["1 Workspace", "Up to 5 Users", "3 Active Projects", "500 MB Storage", "Basic Audit Logs"],
      buttonText: "Current Plan",
      current: false,
    },
    {
      name: "Pro Tier",
      price: "$29",
      period: "/month",
      description: "Best for growing agencies & software teams",
      features: [
        "3 Workspaces",
        "Up to 50 Users",
        "25 Active Projects",
        "50 GB S3 Storage",
        "SignalR WebSockets Real-Time Sync",
        "Advanced RBAC Permissions Matrix",
        "Priority Support",
      ],
      buttonText: "Active Subscription",
      current: true,
      popular: true,
    },
    {
      name: "Enterprise Tier",
      price: "$99",
      period: "/month",
      description: "Full power for large enterprise agencies & SOC2 compliance",
      features: [
        "Unlimited Workspaces & Users",
        "Unlimited Projects",
        "1 TB Dedicated S3 Storage",
        "Custom EF Core Interceptors",
        "24/7 Dedicated Account Manager",
        "Custom SLA Agreement",
      ],
      buttonText: "Upgrade to Enterprise",
      current: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div>
          <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
            SaaS Monetization & Subscriptions
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Billing & Subscription Tiers</h1>
          <p className="text-sm text-slate-400">Manage workspace subscription plans and resource usage</p>
        </div>
      </div>

      {/* Active Usage Meters Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Workspaces Used</span>
            <span className="font-semibold text-white">1 / 3 Workspaces</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-1/3 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Team Seats Used</span>
            <span className="font-semibold text-white">18 / 50 Users</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-1/3 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>AWS S3 Storage</span>
            <span className="font-semibold text-white">12.4 GB / 50 GB</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full w-[25%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between relative ${
              plan.popular ? "border-blue-500 shadow-xl shadow-blue-500/10" : "border-slate-800"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Current Active Plan
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.period && <span className="text-sm text-slate-400">{plan.period}</span>}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={plan.current}
              className={`w-full mt-6 py-3 rounded-xl font-bold text-xs transition-colors ${
                plan.current
                  ? "bg-slate-800 text-slate-400 cursor-default border border-slate-700"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
