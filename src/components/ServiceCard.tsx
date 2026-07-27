import React from "react";
import { ServiceItem } from "../config";
import { motion } from "motion/react";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  FileSearch,
  Languages,
  Image,
  Mic,
  Mail,
  Instagram,
  Lightbulb,
  ArrowRight,
  Zap
} from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  index: number;
}

// Icon mapping dictionary
const iconMap: Record<string, React.ElementType> = {
  FileText,
  Sparkles,
  ShieldCheck,
  FileSearch,
  Languages,
  Image,
  Mic,
  Mail,
  Instagram,
  Lightbulb,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, index }) => {
  const IconComponent = iconMap[service.icon] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onSelect(service)}
      className="group relative glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer border border-white/80 overflow-hidden"
    >
      {/* Background soft pink gradient aura on hover */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-[#FF80AB]/20 to-[#FFD1DC]/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div>
        {/* Top Header Row: Icon + Price Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5C8A]/10 to-[#FF80AB]/20 border border-[#FF80AB]/30 flex items-center justify-center text-[#FF5C8A] group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-[#FF5C8A] group-hover:to-[#FF80AB] group-hover:text-white transition-all duration-300 shadow-sm">
            <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
          </div>

          <div className="flex items-center gap-2">
            {service.popular && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF5C8A] bg-[#FFD1DC]/60 px-2.5 py-0.5 rounded-full border border-[#FF80AB]/30">
                <Zap className="w-3 h-3 fill-[#FF5C8A]" />
                Popular
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF5C8A] to-[#FF80AB] text-white font-extrabold text-xs shadow-sm shadow-[#FF5C8A]/20">
              {service.currency}{service.price}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-[#2B2B2B] group-hover:text-[#FF5C8A] transition-colors duration-200 mb-2">
          {service.title}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-xs font-semibold text-[#FF5C8A] mb-3 line-clamp-1">
          {service.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-[#2B2B2B]/70 leading-relaxed line-clamp-2 mb-6">
          {service.description}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 border-t border-[#FFD1DC]/40 flex items-center justify-between text-xs font-bold text-[#FF5C8A]">
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Try Service
        </span>
        <div className="w-8 h-8 rounded-full bg-[#FFD1DC]/50 flex items-center justify-center text-[#FF5C8A] group-hover:bg-[#FF5C8A] group-hover:text-white transition-all duration-300">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};
