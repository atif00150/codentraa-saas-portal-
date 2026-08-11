import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export default function Logo({ size = "md", variant = "dark", showText = true }: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* 100% Transparent PNG Logo Image */}
      <div className={`${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <img
          src="/logo.png"
          alt="Codentra Logo"
          className={`w-full h-full object-contain ${variant === "dark" ? "brightness-200 invert" : ""}`}
        />
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
