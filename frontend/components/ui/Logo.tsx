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
      {/* Exact Hexagonal "C" Brand Logo Mark (Non-overlapping, fully visible green piece) */}
      <div className={`${iconSizes[size]} shrink-0 transition-transform hover:scale-105`}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-sm">
          {/* Left Lime Green Piece */}
          <path d="M 12 36 L 28 24 L 28 38 L 22 46 L 22 54 L 28 62 L 28 76 L 12 64 Z" fill="#9FE855" />
          
          {/* Right Hexagonal Black/White C Body */}
          <path d="M 36 12 L 84 34 L 84 48 L 68 40 L 48 30 L 48 70 L 68 60 L 84 52 L 84 66 L 36 88 L 36 72 L 56 62 L 56 38 L 36 28 Z" fill={mainColor} />
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
