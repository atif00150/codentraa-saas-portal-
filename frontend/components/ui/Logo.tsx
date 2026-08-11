import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export default function Logo({ size = "md", variant = "dark", showText = true }: LogoProps) {
  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="inline-flex items-center gap-1 select-none">
      {/* Tight Trimmed Logo PNG Icon Right Next to Codentra Text */}
      <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Codentra Logo"
          className="w-full h-full object-contain block"
        />
      </div>

      {/* Codentra Text */}
      {showText && (
        <span className={`font-black tracking-tight leading-none ${textSizes[size]} ${variant === "dark" ? "text-white" : "text-slate-900"}`}>
          Codentra
        </span>
      )}
    </div>
  );
}
