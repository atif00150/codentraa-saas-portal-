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

  const mainColor = variant === "dark" ? "#FFFFFF" : "#0F172A";

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* Exact Hexagonal "C" Brand Logo Mark from User Image */}
      <div className={`${iconSizes[size]} shrink-0 transition-transform hover:scale-105`}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-sm">
          {/* Left Accent Bracket (Vibrant Lime Green) */}
          <path d="M22 28 L40 18 L40 32 L30 40 L30 60 L40 68 L40 82 L22 72 Z" fill="#9FE855" />
          
          {/* Right Hexagonal C Body */}
          <path d="M46 15 L88 38 L88 62 L46 85 L46 68 L73 53 L73 47 L46 32 Z" fill={mainColor} />
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
