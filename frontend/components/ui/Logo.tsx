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

  const logoSrc = variant === "dark" ? "/logo-white.png" : "/logo.png";

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      {/* 100% Crisp Transparent Logo (White C body on dark, Dark C body on light) */}
      <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center">
        <img
          src={logoSrc}
          alt="Codentra Logo"
          className="w-full h-full object-contain block drop-shadow-sm"
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
