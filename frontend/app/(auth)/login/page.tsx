"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/lib/api";
import Logo from "@/components/ui/Logo";
import AuthIllustration from "@/components/ui/AuthIllustration";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("test@codentraa.com");
  const [password, setPassword] = useState("Password123!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("codentraa_token", res.token);
      localStorage.setItem("codentraa_user", JSON.stringify(res));
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center p-4 md:p-8 font-sans antialiased">
      {/* Figma 2-Column Split Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-between space-y-6 bg-white">
          {/* Top Logo */}
          <div className="mb-2">
            <Logo size="md" variant="light" />
          </div>

          <div className="space-y-6">
            {/* Header Greeting */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Welcome Back! <span className="animate-bounce">👋</span>
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
                Please sign in to your account
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl flex items-center space-x-3 text-red-600 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center space-x-3 text-emerald-700 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Login successful! Redirecting to Dashboard...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-50/60 border border-slate-200 text-sm text-slate-900 rounded-xl px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-50/60 border border-slate-200 text-sm text-slate-900 rounded-xl px-4 pr-12 py-3 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-start">
                <Link href="/forgot-password" className="text-xs text-[#6366F1] font-bold hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-500/25 text-sm transition-all disabled:opacity-50 mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="text-center pt-4">
            <p className="text-xs text-slate-400 font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#6366F1] font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: Figma Illustration */}
        <div className="hidden md:block">
          <AuthIllustration />
        </div>

      </div>
    </div>
  );
}
