import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { ServiceItem } from "../config";
import { generateServiceOutput } from "../services/ai";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { AtsResumeViewer } from "./AtsResumeViewer";
import {
  X,
  Sparkles,
  Copy,
  Check,
  Download,
  RotateCcw,
  UploadCloud,
  FileText,
  ShieldCheck,
  FileSearch,
  Languages,
  Image as ImageIcon,
  Mic,
  Mail,
  Instagram,
  Lightbulb,
  ArrowLeft,
  Share2
} from "lucide-react";

interface WorkspaceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectOtherService: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Sparkles,
  ShieldCheck,
  FileSearch,
  Languages,
  Image: ImageIcon,
  Mic,
  Mail,
  Instagram,
  Lightbulb,
};

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({
  service,
  onClose,
  onSelectOtherService,
}) => {
  // State for dynamic field values
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    if (!service) return {};
    const initial: Record<string, string> = {};
    service.inputFields.forEach((f) => {
      initial[f.key] = f.defaultValue || "";
    });
    return initial;
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [bgRemoveMode, setBgRemoveMode] = useState<"isolated" | "original">("isolated");
  const [edgeSmoothness, setEdgeSmoothness] = useState(85);

  // Reset form state when service changes
  useEffect(() => {
    if (!service) return;
    const initial: Record<string, string> = {};
    service.inputFields.forEach((f) => {
      initial[f.key] = f.defaultValue || "";
    });
    setFormValues(initial);
    setOutputResult(null);
    setUploadedImage(null);
    setIsGenerating(false);
  }, [service]);

  const IconComponent = service ? (iconMap[service.icon] || Sparkles) : Sparkles;

  const handleInputChange = (key: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setIsGenerating(true);
    setOutputResult(null);

    const result = await generateServiceOutput(service.id, formValues);

    setIsGenerating(false);
    setOutputResult(result);

    try {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.7 },
        colors: ["#FF5C8A", "#FF80AB", "#FFD1DC"],
      });
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!outputResult || !service) return;
    const blob = new Blob([outputResult], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${service.id}-output.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMd = () => {
    if (!outputResult || !service) return;
    const blob = new Blob([outputResult], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${service.id}-output.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!outputResult || !service) return;
    const printWindow = window.open("", "_blank", "width=850,height=1100");
    if (!printWindow) {
      alert("Please allow popups to download or print your PDF document.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${service.title} - SnapSolve Export</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              color: #1e293b;
              background-color: #ffffff;
              margin: 0;
              padding: 32px 40px;
              font-size: 13px;
              line-height: 1.6;
            }
            h1, h2, h3, h4 {
              color: #0f172a;
              margin-top: 18px;
              margin-bottom: 8px;
            }
            h1 { font-size: 22px; font-weight: 800; border-bottom: 2px solid #0f172a; pb: 4px; }
            h2 { font-size: 16px; font-weight: 700; border-bottom: 1px solid #cbd5e1; pb: 2px; }
            p { margin-bottom: 10px; }
            ul, ol { margin: 6px 0 12px 0; padding-left: 20px; }
            li { margin-bottom: 4px; }
            hr { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }
            @media print {
              @page { size: A4 portrait; margin: 15mm; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div style="white-space: pre-wrap; font-family: monospace, sans-serif;">${outputResult.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 250);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <AnimatePresence>
      {service && (
        <div key="workspace-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#2B2B2B]/50 backdrop-blur-lg animate-in fade-in duration-200">
          <motion.div
            key="workspace-modal-content"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl bg-[#FFF8FB] rounded-3xl shadow-2xl border border-[#FFD1DC] p-5 sm:p-8 text-[#2B2B2B] my-6 max-h-[92vh] flex flex-col overflow-y-auto custom-scrollbar"
          >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#FFD1DC]/60 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={onSelectOtherService}
                className="p-2 rounded-xl bg-white border border-[#FFD1DC] text-[#2B2B2B]/70 hover:text-[#FF5C8A] hover:border-[#FF80AB] transition-all flex items-center gap-1.5 text-xs font-bold"
                title="Back to All Services"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">All Services</span>
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF5C8A] to-[#FF80AB] text-white flex items-center justify-center shadow-md shadow-[#FF5C8A]/20">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-extrabold text-[#2B2B2B]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#FF5C8A] font-medium hidden sm:block">
                    {service.tagline}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FFD1DC]/60 text-[#FF5C8A] text-xs font-extrabold">
                Workspace Active
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white border border-[#FFD1DC] text-[#2B2B2B]/60 hover:text-[#FF5C8A] hover:bg-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main 2-Column Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Form Column */}
            <form
              onSubmit={handleGenerate}
              className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-[#FFD1DC]/70 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#FFD1DC]/40">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#FF5C8A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-[#FF5C8A]" />
                  Input Details
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const sample: Record<string, string> = {};
                    service.inputFields.forEach((f) => {
                      sample[f.key] = service.sampleInput;
                    });
                    setFormValues(sample);
                  }}
                  className="text-[11px] text-[#FF5C8A] font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Load Sample
                </button>
              </div>

              {/* Dynamic Input Fields */}
              {service.inputFields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2B2B2B]/90 flex items-center justify-between">
                    <span>{field.label}</span>
                  </label>

                  {field.type === "text" && (
                    <input
                      type="text"
                      value={formValues[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#FFF8FB] rounded-xl border border-[#FFD1DC] focus:outline-none focus:border-[#FF5C8A] focus:ring-2 focus:ring-[#FF5C8A]/20 transition-all"
                    />
                  )}

                  {field.type === "textarea" && (
                    <textarea
                      rows={service.id === "grammar-checker" || service.id === "notes-summarizer" ? 7 : 4}
                      value={formValues[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#FFF8FB] rounded-xl border border-[#FFD1DC] focus:outline-none focus:border-[#FF5C8A] focus:ring-2 focus:ring-[#FF5C8A]/20 transition-all resize-none custom-scrollbar"
                    />
                  )}

                  {field.type === "select" && (
                    <select
                      value={formValues[field.key] || field.defaultValue || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#FFF8FB] rounded-xl border border-[#FFD1DC] focus:outline-none focus:border-[#FF5C8A] focus:ring-2 focus:ring-[#FF5C8A]/20 transition-all cursor-pointer"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "image" && (
                    <div className="space-y-3">
                      <div className="relative border-2 border-dashed border-[#FF80AB]/40 hover:border-[#FF5C8A] bg-[#FFF8FB] rounded-2xl p-6 text-center transition-all group cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-[#FFD1DC]/50 text-[#FF5C8A] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-[#2B2B2B]">
                            {uploadedImage ? "Click to change photo" : "Upload Image or Drag & Drop"}
                          </span>
                          <span className="text-[10px] text-[#2B2B2B]/60">
                            Supports JPG, PNG, WEBP (Up to 10MB)
                          </span>
                        </div>
                      </div>

                      {uploadedImage && (
                        <div className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FFD1DC] flex items-center gap-3">
                          <img
                            src={uploadedImage}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded-lg border border-[#FF80AB]/30"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-[#2B2B2B] block">Image Loaded</span>
                            <span className="text-[10px] text-emerald-600 font-semibold">
                              Ready for background isolation
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF5C8A] via-[#FF6F98] to-[#FF80AB] text-white text-xs font-extrabold pink-button-glow hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white/20" />
                    <span>Generate Solution</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Result Output Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#FFD1DC]/80 shadow-md flex flex-col min-h-[420px] justify-between">
              <div>
                {/* Result Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#FFD1DC]/40 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C8A] animate-pulse" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2B2B2B]">
                      Workspace Output
                    </h4>
                  </div>

                  {outputResult && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-xl bg-[#FFF8FB] border border-[#FFD1DC] text-xs font-bold text-[#FF5C8A] hover:bg-[#FFD1DC]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Copy to Clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDownloadMd}
                        className="p-2 px-2.5 rounded-xl bg-[#FFF8FB] border border-[#FFD1DC] text-xs font-bold text-[#FF5C8A] hover:bg-[#FFD1DC]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Download Markdown (.md)"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>.MD</span>
                      </button>

                      <button
                        onClick={handleDownloadTxt}
                        className="p-2 px-2.5 rounded-xl bg-[#FFF8FB] border border-[#FFD1DC] text-xs font-bold text-[#2B2B2B]/80 hover:text-[#FF5C8A] hover:bg-[#FFD1DC]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Download Plain Text (.txt)"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>.TXT</span>
                      </button>

                      <button
                        onClick={handleDownloadPdf}
                        className="p-2 px-2.5 rounded-xl bg-[#FF5C8A] text-white text-xs font-bold shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Download PDF Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>.PDF</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Background Remover Custom Live Interactive Canvas UI */}
                {service.id === "background-remover" && (
                  <div className="space-y-4 my-2">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setBgRemoveMode("isolated")}
                              className={`px-3 py-1.5 rounded-xl border transition-all ${
                                bgRemoveMode === "isolated"
                                  ? "bg-[#FF5C8A] text-white border-[#FF5C8A]"
                                  : "bg-[#FFF8FB] text-[#2B2B2B] border-[#FFD1DC]"
                              }`}
                            >
                              Isolated Transparent PNG
                            </button>
                            <button
                              onClick={() => setBgRemoveMode("original")}
                              className={`px-3 py-1.5 rounded-xl border transition-all ${
                                bgRemoveMode === "original"
                                  ? "bg-[#FF5C8A] text-white border-[#FF5C8A]"
                                  : "bg-[#FFF8FB] text-[#2B2B2B] border-[#FFD1DC]"
                              }`}
                            >
                              Original Image
                            </button>
                          </div>

                          <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                            Alpha Mask 100%
                          </span>
                        </div>

                        {/* Transparency Grid Canvas Container */}
                        <div className="relative w-full h-64 rounded-2xl border border-[#FFD1DC] overflow-hidden flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100">
                          {bgRemoveMode === "isolated" ? (
                            <div className="relative flex items-center justify-center p-4">
                              <img
                                src={uploadedImage}
                                alt="Isolated Output"
                                className="max-h-56 object-contain rounded-xl drop-shadow-xl transition-all"
                                style={{
                                  filter: `contrast(${edgeSmoothness}%) drop-shadow(0 10px 15px rgba(255, 92, 138, 0.2))`,
                                }}
                              />
                            </div>
                          ) : (
                            <img
                              src={uploadedImage}
                              alt="Original"
                              className="max-h-56 object-contain rounded-xl"
                            />
                          )}
                        </div>

                        {/* Edge Adjustment Slider */}
                        <div className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FFD1DC]/60 flex items-center justify-between text-xs gap-4">
                          <span className="font-semibold text-[#2B2B2B]">Edge Precision Smoothing:</span>
                          <input
                            type="range"
                            min="50"
                            max="120"
                            value={edgeSmoothness}
                            onChange={(e) => setEdgeSmoothness(Number(e.target.value))}
                            className="accent-[#FF5C8A] flex-1 cursor-pointer"
                          />
                          <span className="font-bold text-[#FF5C8A]">{edgeSmoothness}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-[#FFF8FB] rounded-2xl border border-dashed border-[#FF80AB]/40">
                        <ImageIcon className="w-12 h-12 text-[#FF80AB]/50 mb-3" />
                        <p className="text-xs font-bold text-[#2B2B2B]">No image uploaded yet</p>
                        <p className="text-[11px] text-[#2B2B2B]/60 max-w-xs mt-1">
                          Upload a photo on the left panel to isolate the subject with transparent background.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Text Generation Skeleton Loader */}
                {isGenerating && service.id !== "background-remover" && (
                  <div className="space-y-3 py-6 animate-pulse">
                    <div className="h-4 bg-[#FFD1DC]/50 rounded-lg w-3/4" />
                    <div className="h-4 bg-[#FFD1DC]/30 rounded-lg w-full" />
                    <div className="h-4 bg-[#FFD1DC]/40 rounded-lg w-5/6" />
                    <div className="h-4 bg-[#FFD1DC]/30 rounded-lg w-2/3" />
                    <div className="h-20 bg-[#FFD1DC]/20 rounded-xl w-full mt-4" />
                  </div>
                )}

                {/* Generated Text Output Box */}
                {!isGenerating && outputResult && service.id !== "background-remover" && (
                  service.id === "resume-builder" ? (
                    <AtsResumeViewer
                      markdownText={outputResult}
                      onCopy={handleCopy}
                      copied={copied}
                    />
                  ) : (
                    <div className="my-2 p-5 bg-white rounded-2xl border border-[#FFD1DC] font-sans text-xs text-[#2B2B2B] leading-relaxed max-h-[460px] overflow-y-auto custom-scrollbar select-text shadow-sm space-y-3">
                      <Markdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-lg font-extrabold text-[#2B2B2B] border-b border-[#FFD1DC] pb-2 mt-2 mb-3 tracking-tight">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-sm font-bold text-[#FF5C8A] border-b border-[#FFD1DC]/50 pb-1 mt-4 mb-2 tracking-tight">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xs font-bold text-[#2B2B2B] mt-3 mb-1">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-xs text-[#2B2B2B]/90 leading-relaxed mb-2">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-[#2B2B2B]/90">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside space-y-1 my-2 pl-1 text-[#2B2B2B]/90">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-xs leading-relaxed">
                              {children}
                            </li>
                          ),
                          hr: () => (
                            <hr className="my-3 border-t border-[#FFD1DC]/60" />
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-[#FF5C8A] bg-[#FFF8FB] pl-3 py-1.5 my-2 italic text-[#2B2B2B]/80 rounded-r-lg">
                              {children}
                            </blockquote>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-[#2B2B2B]">
                              {children}
                            </strong>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FF5C8A] font-semibold underline hover:text-[#FF80AB]"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="bg-[#FFF8FB] border border-[#FFD1DC] px-1.5 py-0.5 rounded text-[11px] font-mono text-[#FF5C8A]">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {outputResult}
                      </Markdown>
                    </div>
                  )
                )}

                {/* Empty Initial State Prompt */}
                {!isGenerating && !outputResult && service.id !== "background-remover" && (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-[#FFF8FB] rounded-2xl border border-dashed border-[#FF80AB]/30">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFD1DC]/40 text-[#FF5C8A] flex items-center justify-center mb-3">
                      <Sparkles className="w-6 h-6 fill-[#FF5C8A]/20" />
                    </div>
                    <h5 className="text-sm font-bold text-[#2B2B2B]">Ready to Solve</h5>
                    <p className="text-xs text-[#2B2B2B]/70 max-w-sm mt-1">
                      Fill out the parameters on the left and click <strong>Generate Solution</strong> to run this tool.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Controls */}
              <div className="pt-4 mt-4 border-t border-[#FFD1DC]/50 flex items-center justify-between text-xs">
                <span className="text-[#2B2B2B]/60 font-medium">
                  SnapSolve Workspace • High Precision Engine
                </span>
                <button
                  onClick={onSelectOtherService}
                  className="text-[#FF5C8A] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Try Another Service
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
