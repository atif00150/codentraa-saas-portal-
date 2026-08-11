"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { registerUser } from "@/lib/api";
import Logo from "@/components/ui/Logo";
import AuthIllustration from "@/components/ui/AuthIllustration";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser({
        email,
        password,
        firstName,
        lastName,
        organizationName,
      });
      localStorage.setItem("codentraa_token", res.token);
      localStorage.setItem("codentraa_user", JSON.stringify(res));
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center p-4 md:p-8 font-sans antialiased">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-between space-y-6 bg-white">
          <div className="mb-2">
            <Logo size="md" variant="light" />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
              <p className="text-xs text-slate-400 font-medium mt-1">Launch your Codentra portal workspace</p>
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
                <span>Workspace Created! Redirecting...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Atif"
                    className="w-full bg-slate-50/60 border border-slate-200 text-xs text-slate-900 rounded-xl px-3.5 py-2.5 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Mughal"
                    className="w-full bg-slate-50/60 border border-slate-200 text-xs text-slate-900 rounded-xl px-3.5 py-2.5 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Codentra Agency"
                  className="w-full bg-slate-50/60 border border-slate-200 text-xs text-slate-900 rounded-xl px-3.5 py-2.5 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atif@codentra.com"
                  className="w-full bg-slate-50/60 border border-slate-200 text-xs text-slate-900 rounded-xl px-3.5 py-2.5 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-50/60 border border-slate-200 text-xs text-slate-900 rounded-xl px-3.5 py-2.5 placeholder:text-slate-400 focus:outline-none focus:border-[#6366F1] focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold py-3 rounded-xl shadow-md shadow-indigo-500/25 text-xs transition-all disabled:opacity-50 mt-2"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-400 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-[#6366F1] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="hidden md:block">
          <AuthIllustration />
        </div>

      </div>
    </div>
  );
}
