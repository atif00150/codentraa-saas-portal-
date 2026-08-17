import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
  subtitle?: string;
}

export default function Logo({ size = "md", variant = "light", showText = true, subtitle }: LogoProps) {
  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const imageSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 select-none hover:opacity-95 transition-opacity group">
      {/* Codentra Logo PNG */}
      <div className={`${imageSizes[size]} shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform`}>
        <img
          src="/logo.png"
          alt="Codentra Logo"
          className="w-full h-full object-contain block drop-shadow-sm"
        />
      </div>

      {/* Codentra Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-extrabold tracking-tight leading-none ${textSizes[size]} ${variant === "dark" ? "text-white" : "text-slate-900"}`}>
              Codentra
            </span>
          </div>
          {subtitle && (
            <span className={`text-[11px] font-semibold -mt-0.5 ${variant === "dark" ? "text-slate-400" : "text-slate-500"}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
