import React from "react";
import { motion } from "motion/react";
import { Logo } from "./Logo";
import { Sparkles, ArrowDown, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FF5C8A]/20 via-[#FF80AB]/15 to-[#FFD1DC]/30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFD1DC]/40 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FF80AB]/20 blur-[80px] rounded-full pointer-events-none" />

      {/* Floating Pill Accent */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#FFD1DC] shadow-sm text-xs font-semibold text-[#FF5C8A] mb-8"
      >
        <Sparkles className="w-3.5 h-3.5 fill-[#FF5C8A]" />
        <span>University Demonstration Prototype • All Tools ₹5</span>
      </motion.div>

      {/* Large Brand Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 flex justify-center"
      >
        <Logo size="xl" showText={false} />
      </motion.div>

      {/* Main Brand Title & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-[#2B2B2B] tracking-tight mb-4">
          Snap<span className="pink-gradient-text">Solve</span>
        </h1>

        <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B2B2B] leading-tight space-y-1 my-4">
          <p className="text-[#2B2B2B]/90">Need it?</p>
          <p className="pink-gradient-text font-extrabold">Snap it.</p>
          <p className="text-[#2B2B2B]">Solve it.</p>
        </div>

        <p className="mt-6 text-lg sm:text-xl text-[#2B2B2B]/75 max-w-2xl mx-auto font-medium leading-relaxed">
          Powerful tools for everyday tasks, available whenever you need them.
        </p>
      </motion.div>

      {/* Large Rounded CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={onExploreClick}
          className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#FF5C8A] via-[#FF6F98] to-[#FF80AB] text-white text-base font-bold pink-button-glow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <Sparkles className="w-5 h-5 fill-white/30 group-hover:rotate-12 transition-transform duration-300" />
          <span>Explore Services</span>
          <span className="ml-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
            ₹5 Each
          </span>
        </button>
      </motion.div>

      {/* Trust Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-[#2B2B2B]/70"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 border border-[#FFD1DC]/40">
          <Zap className="w-4 h-4 text-[#FF5C8A]" />
          <span>Instant Generation</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 border border-[#FFD1DC]/40">
          <ShieldCheck className="w-4 h-4 text-[#FF5C8A]" />
          <span>10 Micro-Tools</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 border border-[#FFD1DC]/40">
          <CheckCircle2 className="w-4 h-4 text-[#FF5C8A]" />
          <span>No Subscription Required</span>
        </div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-16 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={onExploreClick}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF5C8A]/70 group-hover:text-[#FF5C8A] transition-colors">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full bg-white/80 border border-[#FFD1DC] text-[#FF5C8A] shadow-sm"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};
