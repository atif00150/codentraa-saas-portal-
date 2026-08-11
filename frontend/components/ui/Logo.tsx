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
      {/* Exact Hexagonal "C" Brand Logo Mark from User Right Image */}
      <div className={`${iconSizes[size]} shrink-0 transition-transform hover:scale-105`}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-sm">
          {/* Left Lime Green Bracket Piece */}
          <path d="M34 31 L18 39 L18 61 L34 69 L32 58 L25 50 L32 42 Z" fill="#9FE855" />
          
          {/* Right Hexagonal Black/White "C" Body */}
          <path d="M42 12 L82 32 L82 46 L68 39 L42 26 L42 74 L68 61 L82 54 L82 68 L42 88 L26 80 L26 20 Z" fill={mainColor} />
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
