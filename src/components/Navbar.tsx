import React, { useState } from "react";
import { Logo } from "./Logo";
import { DEMO_MODE } from "../config";
import { Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  onScrollToServices: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToServices,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#FFF8FB]/80 border-b border-[#FFD1DC]/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Logo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onScrollToServices}
            className="text-sm font-semibold text-[#2B2B2B]/80 hover:text-[#FF5C8A] transition-colors cursor-pointer"
          >
            All Services
          </button>
          
          <a
            href="#how-it-works"
            className="text-sm font-semibold text-[#2B2B2B]/80 hover:text-[#FF5C8A] transition-colors cursor-pointer"
          >
            How it Works
          </a>

          {/* Demo Mode Badge */}
          {DEMO_MODE && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD1DC]/50 border border-[#FF80AB]/30 text-xs font-bold text-[#FF5C8A]">
              <span className="w-2 h-2 rounded-full bg-[#FF5C8A] animate-pulse" />
              DEMO MODE
            </div>
          )}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onScrollToServices}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF5C8A] to-[#FF80AB] text-white text-xs font-bold shadow-md shadow-[#FF5C8A]/20 hover:shadow-lg hover:shadow-[#FF5C8A]/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-white/20" />
            <span>Explore Services</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {DEMO_MODE && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD1DC]/60 text-[10px] font-bold text-[#FF5C8A]">
              DEMO
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/80 border border-[#FFD1DC] text-[#2B2B2B]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#FFF8FB] border-b border-[#FFD1DC]/60 flex flex-col gap-3 animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              onScrollToServices();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 text-sm font-semibold text-[#2B2B2B]"
          >
            All Services
          </button>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-semibold text-[#2B2B2B]"
          >
            How it Works
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onScrollToServices();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF5C8A] to-[#FF80AB] text-white text-xs font-bold text-center"
            >
              Explore Services (₹5)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
