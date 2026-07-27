import React from "react";
import Markdown from "react-markdown";
import { Download, Printer, Copy, Check, FileText } from "lucide-react";

interface AtsResumeViewerProps {
  markdownText: string;
  onCopy: () => void;
  copied: boolean;
}

export const AtsResumeViewer: React.FC<AtsResumeViewerProps> = ({
  markdownText,
  onCopy,
  copied,
}) => {
  const handlePrintPdf = () => {
    const printWindow = window.open("", "_blank", "width=850,height=1100");
    if (!printWindow) {
      alert("Please allow popups to download/print your PDF resume.");
      return;
    }

    const resumeNode = document.getElementById("ats-resume-paper");
    const contentHtml = resumeNode ? resumeNode.innerHTML : "";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ATS Formatted</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            
            * {
              box-sizing: border-box;
            }

            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #1e293b;
              background-color: #ffffff;
              margin: 0;
              padding: 24px 32px;
              font-size: 12.5px;
              line-height: 1.5;
            }

            h1 {
              font-size: 22px;
              font-weight: 800;
              margin: 0 0 6px 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #0f172a;
              text-align: center;
            }

            h2 {
              font-size: 13.5px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.8px;
              color: #0f172a;
              border-bottom: 1.5px solid #0f172a;
              padding-bottom: 3px;
              margin-top: 16px;
              margin-bottom: 8px;
            }

            h3 {
              font-size: 12.5px;
              font-weight: 700;
              margin-top: 8px;
              margin-bottom: 2px;
              color: #0f172a;
            }

            p {
              margin: 0 0 6px 0;
              color: #334155;
            }

            ul, ol {
              margin: 4px 0 8px 0;
              padding-left: 18px;
            }

            li {
              margin-bottom: 3px;
              color: #334155;
            }

            strong {
              font-weight: 700;
              color: #0f172a;
            }

            a {
              color: #0284c7;
              text-decoration: none;
            }

            hr {
              border: none;
              border-top: 1px solid #cbd5e1;
              margin: 12px 0;
            }

            /* ATS Header formatting */
            .contact-info {
              text-align: center;
              font-size: 11.5px;
              color: #475569;
              margin-bottom: 12px;
            }

            @media print {
              @page {
                size: A4 portrait;
                margin: 12mm 15mm;
              }
              body {
                padding: 0;
                background: #ffffff;
              }
            }
          </style>
        </head>
        <body>
          <div>
            ${contentHtml}
          </div>
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
    <div className="space-y-4 my-2">
      {/* Top Action Toolbar for Resume */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#FFF8FB] rounded-2xl border border-[#FFD1DC]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-[#2B2B2B]">
            ATS-Compliant Document Format
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            Ready to Upload
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#FFD1DC] text-xs font-bold text-[#FF5C8A] hover:bg-[#FFD1DC]/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrintPdf}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF5C8A] to-[#FF80AB] text-white text-xs font-bold shadow-md shadow-[#FF5C8A]/20 hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download ATS PDF</span>
          </button>
        </div>
      </div>

      {/* Styled Printable ATS Paper Container */}
      <div className="p-1 bg-slate-100 rounded-2xl border border-[#FFD1DC] shadow-inner max-h-[520px] overflow-y-auto custom-scrollbar">
        <div
          id="ats-resume-paper"
          className="bg-white p-6 sm:p-10 rounded-xl shadow-md max-w-3xl mx-auto font-sans text-xs text-[#1e293b] leading-relaxed select-text border border-slate-200"
        >
          <Markdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] text-center uppercase tracking-wide mb-1 border-b border-transparent">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xs sm:text-sm font-bold text-[#0f172a] uppercase tracking-wider border-b-2 border-[#0f172a] pb-1 mt-5 mb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xs font-bold text-[#0f172a] mt-3 mb-1">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-xs text-[#334155] leading-relaxed mb-2">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside space-y-1.5 my-2 pl-4 text-[#334155]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside space-y-1.5 my-2 pl-4 text-[#334155]">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-xs leading-relaxed text-[#334155]">
                  {children}
                </li>
              ),
              hr: () => (
                <hr className="my-3 border-t border-slate-300" />
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-[#0f172a]">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 font-medium underline hover:text-sky-800"
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdownText}
          </Markdown>
        </div>
      </div>
    </div>
  );
};
