import React, { useState } from "react";
import { ServiceItem, DEMO_MODE, processPaymentPlaceholder } from "../config";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  FileText,
  ShieldCheck,
  FileSearch,
  Languages,
  Image,
  Mic,
  Mail,
  Instagram,
  Lightbulb,
  CreditCard
} from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenWorkspace: (service: ServiceItem) => void;
}

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

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenWorkspace,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const IconComponent = service ? (iconMap[service.icon] || Sparkles) : Sparkles;

  const handlePayNow = async () => {
    if (!service) return;
    setIsProcessing(true);
    setErrorMessage(null);

    // Fire confetti for instant user delight
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FF5C8A", "#FF80AB", "#FFD1DC", "#FFFFFF"],
      });
    } catch {
      // ignore
    }

    if (DEMO_MODE) {
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
        onOpenWorkspace(service);
      }, 400);
    } else {
      const res = await processPaymentPlaceholder(service.id, service.price);
      setIsProcessing(false);
      if (res.success) {
        onClose();
        onOpenWorkspace(service);
      } else {
        setErrorMessage(res.error || "Payment gateway setup required.");
      }
    }
  };

  return (
    <AnimatePresence>
      {service && (
        <div key="service-detail-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2B2B2B]/40 backdrop-blur-md animate-in fade-in duration-200">
          <motion.div
            key="service-detail-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#FFD1DC] p-6 sm:p-8 text-[#2B2B2B] my-8 max-h-[90vh] flex flex-col overflow-y-auto custom-scrollbar"
          >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#FFF8FB] border border-[#FFD1DC] text-[#2B2B2B]/60 hover:text-[#FF5C8A] hover:bg-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Icon Header */}
          <div className="flex flex-col items-center text-center pt-2 pb-6 border-b border-[#FFD1DC]/50">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#FF5C8A] via-[#FF6F98] to-[#FF80AB] text-white flex items-center justify-center shadow-lg shadow-[#FF5C8A]/30 mb-4 border border-white/60">
              <IconComponent className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD1DC]/60 text-xs font-bold text-[#FF5C8A] mb-2">
              <Zap className="w-3.5 h-3.5 fill-[#FF5C8A]" />
              {service.category}
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#2B2B2B]">
              {service.title}
            </h2>

            <p className="text-sm font-semibold text-[#FF5C8A] mt-1 max-w-md">
              {service.tagline}
            </p>
          </div>

          {/* Simple Explanation */}
          <div className="py-5 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5C8A] mb-1">
                About this tool
              </h4>
              <p className="text-sm text-[#2B2B2B]/80 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>

            {/* Input Example Box */}
            <div className="p-4 rounded-2xl bg-[#FFF8FB] border border-[#FFD1DC]/60">
              <span className="text-xs font-bold text-[#FF5C8A] flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5C8A]" />
                EXAMPLE INPUT
              </span>
              <p className="text-xs text-[#2B2B2B]/80 font-mono bg-white p-3 rounded-xl border border-[#FFD1DC]/40 whitespace-pre-wrap leading-relaxed">
                {service.sampleInput}
              </p>
            </div>

            {/* Output Example Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#FF5C8A]/5 to-[#FF80AB]/10 border border-[#FF80AB]/30">
              <span className="text-xs font-bold text-[#FF5C8A] flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 fill-[#FF5C8A]" />
                EXAMPLE OUTPUT PREVIEW
              </span>
              <div className="text-xs text-[#2B2B2B] font-mono bg-white/90 p-3 rounded-xl border border-[#FF80AB]/30 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                {service.sampleOutput}
              </div>
            </div>
          </div>

          {/* Pricing & Guarantee Banner */}
          <div className="my-2 p-3 rounded-2xl bg-[#FFF8FB] border border-[#FFD1DC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-medium text-[#2B2B2B]/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Instant AI Workspace Access • No Subscription</span>
            </div>
            {DEMO_MODE && (
              <span className="text-[10px] font-bold uppercase bg-[#FF5C8A]/10 text-[#FF5C8A] px-2 py-0.5 rounded-md">
                Demo Bypass Active
              </span>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 mb-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600 text-center">
              {errorMessage}
            </div>
          )}

          {/* Large Centered Button */}
          <div className="pt-4 flex flex-col items-center">
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full sm:w-auto min-w-[280px] group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C8A] via-[#FF6F98] to-[#FF80AB] text-white text-base font-extrabold pink-button-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-75"
            >
              <CreditCard className="w-5 h-5 text-white/90" />
              <span>
                {isProcessing
                  ? "Unlocking Workspace..."
                  : `Pay Now • ${service.currency}${service.price}`}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] font-medium text-[#2B2B2B]/60 mt-3 flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#FF5C8A]" />
              {DEMO_MODE
                ? "Demo Mode enabled: Click opens workspace instantly without charge."
                : "Secure payment processing powered by Stripe / Razorpay."}
            </p>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
