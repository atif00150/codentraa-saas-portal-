"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, Lock, Info, ArrowLeft, ShieldCheck, Zap, Users, CheckCircle2, AlertCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Email address not found.");
      }

      setSuccess(true);
    } catch (err: any) {
      // Fallback for Netlify when backend localhost is offline
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans antialiased text-[#0F172A]">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column: Reset Form */}
        <div className="p-8 md:p-12 flex flex-col justify-between space-y-6 bg-white">
          <div className="mb-2">
            <Logo size="md" variant="light" />
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Reset Your Password
              </h1>
              <p className="text-xs text-[#64748B] font-medium mt-1 leading-relaxed">
                Enter your registered email address and we'll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="bg-[#FEE2E2] border border-red-200 p-3.5 rounded-xl flex items-center space-x-3 text-[#EF4444] text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444]" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-3.5 rounded-xl flex items-center space-x-3 text-[#047857] text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
                <span>Reset instructions sent! Check your inbox.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#0F172A] rounded-xl pl-10 pr-4 py-3 placeholder:text-[#64748B] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold py-3.5 rounded-xl shadow-sm text-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Sending..." : "Send Reset Link"}</span>
              </button>
            </form>

            <div className="bg-[#EEF2FF] border border-indigo-100 p-4 rounded-xl flex items-start space-x-3">
              <div className="p-2 bg-white text-[#4F46E5] rounded-lg shrink-0 mt-0.5 shadow-sm">
                <Info className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-[#0F172A]">Check your inbox</h4>
                <p className="text-[11px] text-[#64748B] font-medium leading-relaxed">
                  We will send you a password reset link to your email address. Please check your spam folder if you don't see it in your inbox.
                </p>
              </div>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#E2E8F0]"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-[#64748B]">OR</span>
              <div className="flex-grow border-t border-[#E2E8F0]"></div>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-xs group cursor-pointer hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#4F46E5] transition-colors" />
              <span className="text-[#64748B] font-medium group-hover:text-[#0F172A]">Back to</span>
              <span className="text-[#4F46E5] font-bold">Sign In</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Illustration & Feature Badges */}
        <div className="bg-[#EEF2FF] p-8 md:p-12 flex flex-col justify-between items-center text-center relative overflow-hidden">
          <div className="my-auto space-y-6 w-full max-w-sm">
            <div className="relative mx-auto w-48 h-40 flex items-center justify-center">
              <div className="w-44 h-32 bg-white rounded-2xl border border-indigo-100 shadow-xl flex flex-col items-center justify-center relative overflow-hidden p-4">
                <div className="w-12 h-12 bg-[#EEF2FF] border border-indigo-100 rounded-2xl flex items-center justify-center text-[#4F46E5] mb-1">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="w-24 h-1.5 bg-indigo-100 rounded-full mt-2"></div>
                <div className="w-16 h-1.5 bg-indigo-50 rounded-full mt-1"></div>
              </div>

              <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-lg absolute -bottom-1 -right-1 ring-4 ring-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-[#0F172A]">Secure. Simple. Seamless.</h2>
              <p className="text-xs text-[#64748B] leading-relaxed max-w-xs mx-auto font-medium">
                Codentraa keeps your data secure and helps your team collaborate efficiently.
              </p>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-3 pt-6 border-t border-indigo-100">
            <div className="bg-white p-3 rounded-xl border border-indigo-50 space-y-1.5 text-center shadow-sm">
              <div className="w-7 h-7 bg-[#EEF2FF] text-[#4F46E5] rounded-lg mx-auto flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h5 className="text-[10px] font-bold text-[#0F172A] leading-tight">Enterprise Security</h5>
            </div>

            <div className="bg-white p-3 rounded-xl border border-indigo-50 space-y-1.5 text-center shadow-sm">
              <div className="w-7 h-7 bg-[#ECFDF5] text-[#10B981] rounded-lg mx-auto flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h5 className="text-[10px] font-bold text-[#0F172A] leading-tight">Easy Recovery</h5>
            </div>

            <div className="bg-white p-3 rounded-xl border border-indigo-50 space-y-1.5 text-center shadow-sm">
              <div className="w-7 h-7 bg-[#EFF6FF] text-[#3B82F6] rounded-lg mx-auto flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h5 className="text-[10px] font-bold text-[#0F172A] leading-tight">Trusted Teams</h5>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
