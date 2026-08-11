import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* Figma Hexagon Icon with Indigo-Purple Gradient */}
      <div className={`${iconSizes[size]} bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-md shadow-indigo-500/30 ring-1 ring-white/20`}>
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm0 2.31l6.75 3.9-3.38 1.95L8.63 6.2 12 4.31zM4.75 8.81l6.25 3.61v7.22l-6.25-3.61V8.81zm8.25 10.83v-7.22l6.25-3.61v7.22l-6.25 3.61z" />
        </svg>
      </div>

      {/* Bold Typographic Brand Name: "Codentra" */}
      <span className={`font-extrabold tracking-tight ${textSizes[size]} ${variant === "dark" ? "text-white" : "text-slate-900"}`}>
        Codentra
      </span>
    </div>
  );
}
