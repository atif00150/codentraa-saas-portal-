"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, Lock, Info, ArrowLeft, ShieldCheck, Zap, Users, CheckCircle2, AlertCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""); // Empty by default
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Email address not found.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center p-4 md:p-8 font-sans antialiased">
      {/* Figma 2-Column Split Card for Reset Password */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column: Reset Form */}
        <div className="p-8 md:p-12 flex flex-col justify-between space-y-6 bg-white">
          {/* Top Logo */}
          <div>
            <Logo size="md" variant="light" />
          </div>

          <div className="space-y-5">
            {/* Heading without Lock Icon */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Reset Your Password
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Enter your registered email address and we'll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl flex items-center space-x-3 text-red-600 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center space-x-3 text-emerald-700 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Reset token sent! Check your inbox for instructions.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-slate-50/60 border border-slate-200 text-sm text-slate-900 rounded-xl pl-10 pr-4 py-3 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-500/25 text-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Sending..." : "Send Reset Link"}</span>
              </button>
            </form>

            {/* Check Your Inbox Info Container */}
            <div className="bg-[#F0F4FF] border border-indigo-100 p-4 rounded-2xl flex items-start space-x-3">
              <div className="p-2 bg-indigo-100/60 text-[#6366F1] rounded-xl shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">Check your inbox</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  We will send you a password reset link to your email address. Please check your spam folder if you don't see it in your inbox.
                </p>
              </div>
            </div>

            {/* OR Separator */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Entire Row Clickable Back to Sign In Link */}
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-xs group cursor-pointer hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#6366F1] transition-colors" />
              <span className="text-slate-500 font-medium group-hover:text-slate-700">Back to</span>
              <span className="text-[#6366F1] font-bold">Sign In</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Illustration & Feature Badges */}
        <div className="bg-gradient-to-br from-[#F0F4FF] via-[#EEF2FF] to-[#E0E7FF] p-8 md:p-12 flex flex-col justify-between items-center text-center relative overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-10 right-10 w-48 h-48 bg-indigo-400/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-400/20 blur-3xl rounded-full pointer-events-none"></div>

          {/* Graphic Envelope & Lock Illustration */}
          <div className="my-auto space-y-6 w-full max-w-sm">
            <div className="relative mx-auto w-48 h-40 flex items-center justify-center">
              {/* Envelope Container */}
              <div className="w-44 h-32 bg-white/90 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-500/10 flex flex-col items-center justify-center relative overflow-hidden p-4">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-center text-[#6366F1] mb-1">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="w-24 h-1.5 bg-indigo-100 rounded-full mt-2"></div>
                <div className="w-16 h-1.5 bg-indigo-50 rounded-full mt-1"></div>
              </div>

              {/* Green Verified Checkmark Circle */}
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 absolute -bottom-1 -right-1 ring-4 ring-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-slate-900">Secure. Simple. Seamless.</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                Codentra keeps your data secure and helps your team collaborate efficiently.
              </p>
            </div>
          </div>

          {/* 3 Bottom Feature Badges */}
          <div className="w-full grid grid-cols-3 gap-3 pt-6 border-t border-indigo-100/60">
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-indigo-50 space-y-1.5 text-center">
              <div className="w-7 h-7 bg-indigo-50 text-[#6366F1] rounded-xl mx-auto flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h5 className="text-[10px] font-bold text-slate-800 leading-tight">Enterprise Grade Security</h5>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-indigo-50 space-y-1.5 text-center">
              <div className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-xl mx-auto flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h5 className="text-[10px] font-bold text-slate-800 leading-tight">Quick & Easy Recovery</h5>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-indigo-50 space-y-1.5 text-center">
              <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-xl mx-auto flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h5 className="text-[10px] font-bold text-slate-800 leading-tight">Trusted by Teams</h5>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
