import React, { useState } from "react";
import { OPENROUTER_MODEL } from "../config";
import { motion, AnimatePresence } from "motion/react";
import { X, Key, Check, ShieldCheck, Sparkles, Cpu } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string, model: string) => void;
  currentKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaveKey,
  currentKey,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(currentKey || "");
  const [selectedModel, setSelectedModel] = useState(OPENROUTER_MODEL || "openai/gpt-4o-mini");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(apiKeyInput.trim(), selectedModel);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="api-key-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2B2B]/40 backdrop-blur-md animate-in fade-in duration-200">
          <motion.div
            key="api-key-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#FFD1DC] p-6 sm:p-7 text-[#2B2B2B]"
          >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF8FB] border border-[#FFD1DC] text-[#2B2B2B]/60 hover:text-[#FF5C8A] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF5C8A] to-[#FF80AB] text-white flex items-center justify-center shadow-md shadow-[#FF5C8A]/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-extrabold text-[#2B2B2B]">
                Engine Configuration
              </h3>
              <p className="text-xs text-[#FF5C8A] font-semibold">
                Set custom key for unlimited execution
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2B2B]">
                AI API Key (Gemini or OpenRouter)
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-or-v1-... or AIzaSy..."
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#FFF8FB] rounded-xl border border-[#FFD1DC] focus:outline-none focus:border-[#FF5C8A] focus:ring-2 focus:ring-[#FF5C8A]/20"
              />
              <p className="text-[10px] text-[#2B2B2B]/60">
                Supports Gemini keys (AIza...) & OpenRouter keys (sk-or-v1...). Stored locally in browser.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2B2B] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#FF5C8A]" />
                Select Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#FFF8FB] rounded-xl border border-[#FFD1DC] focus:outline-none focus:border-[#FF5C8A] cursor-pointer"
              >
                <option value="openai/gpt-4o-mini">OpenAI GPT-4.1 Mini (Fast & Smart)</option>
                <option value="anthropic/claude-3.5-haiku">Claude 3.5 Haiku (High Accuracy)</option>
                <option value="google/gemini-2.0-flash-001">Gemini 2.0 Flash (Ultra Speed)</option>
                <option value="meta-llama/llama-3.3-70b-instruct">Llama 3.3 70B (Open Weights)</option>
              </select>
            </div>

            <div className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FFD1DC]/60 flex items-center gap-2 text-[11px] text-[#2B2B2B]/80 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                If left blank, SnapSolve uses instant built-in fallback engine for seamless demo.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF5C8A] to-[#FF80AB] text-white text-xs font-extrabold pink-button-glow hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Configuration Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white/20" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
