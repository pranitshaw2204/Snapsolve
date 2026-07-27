import React from "react";
import { Logo } from "./Logo";
import { Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/60 border-t border-[#FFD1DC]/50 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo size="md" />
          <p className="text-xs font-semibold text-[#FF5C8A]">
            Need it? Snap it. Solve it.
          </p>
          <p className="text-xs text-[#2B2B2B]/60 max-w-sm text-center md:text-left">
            Powerful micro-tools for everyday student and workplace tasks. Instant, reliable, and accessible anytime.
          </p>
        </div>

        {/* Center Banner / Tag */}
        <div className="flex flex-col items-center text-center gap-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF8FB] border border-[#FFD1DC] text-xs font-bold text-[#2B2B2B]/80">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5C8A] fill-[#FF5C8A]/20" />
            <span>University Demonstration Project</span>
          </div>
          <span className="text-[11px] text-[#2B2B2B]/50 font-medium">
            Designed for prototype evaluation & academic demonstration
          </span>
        </div>

        {/* Right Copyright & Craft Note */}
        <div className="flex flex-col items-center md:items-end gap-1 text-xs text-[#2B2B2B]/70 font-medium">
          <div className="flex items-center gap-1 text-[#2B2B2B]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF5C8A] text-[#FF5C8A] inline" />
            <span>for SnapSolve</span>
          </div>
          <span className="text-[11px] text-[#2B2B2B]/50">
            © {new Date().getFullYear()} SnapSolve Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
