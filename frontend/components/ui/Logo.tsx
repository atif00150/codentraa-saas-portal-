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
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* Figma Hexagon 3D Logo Icon */}
      <div className={`${iconSizes[size]} shrink-0 transition-transform hover:scale-105`}>
        <img src="/logo.svg" alt="Codentra Logo" className="w-full h-full drop-shadow-md" />
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
