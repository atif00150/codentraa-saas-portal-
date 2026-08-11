import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export default function Logo({ size = "md", variant = "dark", showText = true }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const rightColor = variant === "dark" ? "#FFFFFF" : "#0F172A";

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* Exact Code Chevron Hexagon Logo Mark from User Image */}
      <div className={`${iconSizes[size]} shrink-0 transition-transform hover:scale-105`}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-sm">
          {/* Left Green Chevron (<) */}
          <path d="M40 16 L20 28 L20 72 L40 84 L40 68 L32 62 L32 38 L40 32 Z" fill="#84CC16" />
          
          {/* Right Dark Chevron (>) */}
          <path d="M48 16 L88 50 L48 84 L48 68 L70 50 L48 32 Z" fill={rightColor} />
        </svg>
      </div>

      {/* Bold Typographic Brand Name: "Codentra" */}
      {showText && (
        <span className={`font-extrabold tracking-tight ${textSizes[size]} ${variant === "dark" ? "text-white" : "text-slate-900"}`}>
          Codentra
        </span>
      )}
    </div>
  );
}
