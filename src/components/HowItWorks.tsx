import React from "react";
import { motion } from "motion/react";
import { MousePointerClick, Zap, CheckCircle2, ShieldAlert } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: MousePointerClick,
      title: "Select Any Micro-Tool",
      desc: "Choose from 10 everyday tools including Resume Builder, Grammar Checker, and Notes Summarizer.",
    },
    {
      num: "02",
      icon: Zap,
      title: "Snap & Input Data",
      desc: "Paste your raw notes, draft text, or upload an image. No complex menus or training required.",
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: "Instant Solved Workspace",
      desc: "Receive beautifully formatted, export-ready solutions instantly. Copy, export, or iterate.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFD1DC]/60 border border-[#FF80AB]/30 text-xs font-bold text-[#FF5C8A] mb-3"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Streamlined Workflow</span>
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2B2B2B] tracking-tight">
          How Snap<span className="pink-gradient-text">Solve</span> Works
        </h2>
        <p className="mt-3 text-sm text-[#2B2B2B]/70 font-medium">
          Three effortless steps to solve everyday student and office tasks at ₹5 per service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card glass-card-hover rounded-3xl p-8 relative flex flex-col justify-between border border-white/80"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5C8A] to-[#FF80AB] text-white flex items-center justify-center shadow-md shadow-[#FF5C8A]/20">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-heading font-black text-[#FFD1DC]/80">
                  {step.num}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-[#2B2B2B] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#2B2B2B]/70 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
