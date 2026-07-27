import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", showText = true, className = "" }) => {
  const sizeMap = {
    sm: { icon: "w-7 h-7", text: "text-lg", glow: "w-7 h-7" },
    md: { icon: "w-9 h-9", text: "text-xl", glow: "w-9 h-9" },
    lg: { icon: "w-14 h-14", text: "text-3xl", glow: "w-14 h-14" },
    xl: { icon: "w-20 h-20", text: "text-5xl", glow: "w-20 h-20" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      <div className={`relative ${currentSize.icon} flex items-center justify-center`}>
        {/* Soft pink ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5C8A] to-[#FF80AB] rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
        
        {/* Main Logo Container */}
        <div className="relative w-full h-full bg-gradient-to-tr from-[#FF5C8A] via-[#FF6F98] to-[#FF80AB] rounded-2xl shadow-lg shadow-[#FF5C8A]/25 border border-white/40 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
          {/* Subtle glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          
          {/* Stylized Flowing 'S' with Lightning / Sparkle Core */}
          <svg
            viewBox="0 0 100 100"
            className="w-3/5 h-3/5 text-white drop-shadow-md"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Flowing S curve */}
            <path d="M 68 28 C 65 18, 32 18, 32 36 C 32 54, 68 46, 68 64 C 68 82, 32 82, 32 72" />
            {/* Sparkle / Lightning accent */}
            <path d="M 72 16 L 76 22 M 76 16 L 72 22" stroke="#FFD1DC" strokeWidth="4" />
            <circle cx="28" cy="74" r="3" fill="#FFD1DC" stroke="none" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-extrabold tracking-tight text-[#2B2B2B] ${currentSize.text}`}>
            Snap<span className="pink-gradient-text">Solve</span>
          </span>
        </div>
      )}
    </div>
  );
};
