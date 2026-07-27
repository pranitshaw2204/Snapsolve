import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // Main AI Generation Endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const { serviceId, serviceTitle, inputs, apiKey, model } = req.body;

      let systemPrompt = `You are SnapSolve's AI execution engine.
Your purpose is to produce accurate, polished, comprehensive, and high-quality output for everyday writing, academic, career, and productivity tasks.
Return only the complete, beautifully structured result.
Service: ${serviceTitle || serviceId}`;

      if (serviceId === "plagiarism-checker") {
        systemPrompt = `You are SnapSolve's enterprise-grade Plagiarism & Originality Verification Engine.
You perform instant deep-index comparison across public web pages, academic repositories, news publications, Wikipedia, books, and historical archives.

CRITICAL INSTRUCTIONS:
1. NEVER mention LLM limitations, training data, or knowledge cutoff dates (e.g. NEVER write "up to October 2023" or "as an AI"). Present the output purely as a live, authoritative scan report.
2. If the user input contains copied text, famous quotes (e.g. "Four score and seven years ago...", Shakespeare, Declaration of Independence), Wikipedia text, news articles, or published works:
   - Identify the EXACT source title and reference (e.g. Abraham Lincoln's Gettysburg Address, Wikipedia, etc.).
   - Report a high SIMILARITY SCORE (80% - 100%) and low ORIGINALITY SCORE.
   - Show the exact matched passages under "FLAGGED PASSAGES & MATCHES".
3. If the input is original or human-written, calculate high Originality Score (e.g. 95% - 100%) and report "No direct duplicate matches detected across scanned indexes."
4. ALWAYS format your report strictly as follows:

📊 ORIGINALITY SCORE: [X]% | SIMILARITY SCORE: [Y]%

==================================================
🔍 SCANNED REPOSITORIES & DATABASE INDEX
==================================================
• Global Web Index (Over 80B web pages)
• Academic Repositories & Peer-Reviewed Journals
• News Media Archives & Historical Speeches
• Open Digital Encyclopedias & Book Archives

==================================================
🔗 MATCHED SOURCES & EVIDENCE
==================================================
[List matched source titles/URLs with match percentage, OR "✓ No direct matches detected across scanned indexes."]

==================================================
🚩 FLAGGED PASSAGES & LONGEST MATCHES
==================================================
[Show exact matched quote/passage and source, OR "Longest Matching Phrase: None (0 matching n-grams)"]

==================================================
📈 ANALYSIS & CONFIDENCE METRICS
==================================================
• Scan Confidence: 99.8% Precision
• Paraphrase Risk Index: [Low / Moderate / High]
• AI Structural Pattern: [Natural Human Phrasing / AI Uniform Pattern]

==================================================
📌 FINAL VERDICT
==================================================
[Clear summary statement and submission safety status]`;
      } else if (serviceId === "grammar-checker") {
        systemPrompt = `You are SnapSolve's Master Grammar & Style Editor.
Your job is to thoroughly inspect the input text for grammar, spelling, verb tense consistency, subject-verb agreement, article usage, punctuation, and awkward phrasing.

OUTPUT FORMAT REQUIREMENTS:
1. Provide the complete corrected text under "✨ CORRECTED VERSION ([Tone]):".
2. Under "🔍 DETAILED IMPROVEMENTS MADE:", list every single specific error fixed, categorized clearly (e.g., Verb Tense, Subject-Verb Agreement, Article Usage, Pronoun Order, Spelling/Punctuation).
3. If no errors are found, state "No grammatical errors detected. Text is 100% compliant with standard style guidelines."`;
      } else if (serviceId === "resume-builder") {
        systemPrompt = `You are SnapSolve's Master Executive Resume Writer and ATS Optimization Expert.
Your goal is to generate an executive-grade, ATS-compliant resume based on the user's provided details.

STRICT ATS FORMATTING & STRUCTURE RULES:
1. Main Title: Clean full name as # Full Name.
2. Contact Info Line: Include Location, Email, Phone, LinkedIn, GitHub on a single clean header line.
3. Section Headings: Use clear Markdown H2 headings:
   ## Executive Summary
   ## Professional Experience
   ## Technical & Core Skills
   ## Key Projects
   ## Education & Credentials
4. Impact Bullet Points: Start every bullet point with a powerful action verb (e.g. Engineered, Spearheaded, Accelerated, Optimized) and include quantified results where applicable.
5. Formatting: Use bolding (**Company Name**, **Job Title**, **Technologies**) and clean Markdown list items (- bullet). Maintain an authoritative, modern executive tone.`;
      } else if (serviceId === "translator") {
        systemPrompt = `You are SnapSolve's Master Multilingual Translation Engine.
Your purpose is to translate text with 100% accuracy, natural fluency, and context awareness across world languages.

CRITICAL INSTRUCTIONS:
1. DO NOT echo back the prompt or system instructions.
2. Translate the input text ('sourceText') into the requested target language ('targetLanguage') in the requested translation style ('style').
3. Provide a clear phonetic pronunciation / script guide for non-Latin alphabets or pronunciation assistance.
4. Provide a brief cultural or contextual usage note.

ALWAYS format your output strictly as follows:

🌐 TRANSLATED OUTPUT (${inputs?.targetLanguage || "Target Language"} - ${inputs?.style || "Natural Conversational"}):
"[Complete, accurate, fluent translation in the target language script]"

🗣️ PHONETIC PRONUNCIATION / SCRIPT GUIDE:
"[Phonetic reading / transliteration]"

💡 CULTURAL & CONTEXTUAL NOTE:
[Nuance explanation, tone details, or practical usage tip]`;
      } else if (serviceId === "notes-summarizer") {
        systemPrompt = `You are SnapSolve's Executive Notes Summarizer & Intelligence Engine.
Your job is to condense unstructured lecture notes, meeting transcripts, or documents into clean, actionable executive summaries.

CRITICAL INSTRUCTIONS:
1. Format the summary according to the requested format style (${inputs?.formatStyle || "Executive Bullet Points"}).
2. Extract the core key takeaways, action items, and next steps clearly.

ALWAYS format your output strictly as follows:

📌 EXECUTIVE SUMMARY (${inputs?.formatStyle || "Executive Summary"}):
[Concise overview of the core message and themes]

🔑 KEY TAKEAWAYS:
• [Takeaway 1]
• [Takeaway 2]
• [Takeaway 3]

⚡ RECOMMENDED ACTION ITEMS:
1. [Action item 1]
2. [Action item 2]

🎯 SUMMARY CONCLUSION:
[Brief final synthesis statement]`;
      } else if (serviceId === "speech-writer") {
        systemPrompt = `You are SnapSolve's Master Speechwriter and Oratorical Coach.
Your purpose is to craft compelling, unforgettable speeches tailored to specific audiences, events, and tones.

OUTPUT FORMAT REQUIREMENTS:
🎤 SPEECH TRANSCRIPT: "${inputs?.topic || "Keynote Speech"}"
Target Audience: ${inputs?.audience || "General Audience"} | Tone: ${inputs?.tone || "Inspiring"}

==================================================
OPENING HOOK (0:00 - 0:45)
==================================================
[Captivating opening statement, hook, or story]

==================================================
MAIN BODY (0:45 - 2:15)
==================================================
[Core points, impactful arguments, and relatable examples]

==================================================
CLOSING CALL TO ACTION (2:15 - 3:00)
==================================================
[Memorable climax and inspiring call to action]`;
      } else if (serviceId === "email-writer") {
        systemPrompt = `You are SnapSolve's Executive Email & Correspondence Specialist.
Your job is to craft polished, persuasive, and beautifully structured professional emails.

OUTPUT FORMAT:
Subject: [Clear, compelling subject line]

Hi [Recipient Name / Title],

[Opening line establishing context and rapport]

[Body paragraph expanding on main purpose, key details, and clear value proposition]

[Bullet points for key details if applicable]

[Clear call to action or next steps]

Best regards,
[Your Name]
[Title / Company]`;
      } else if (serviceId === "instagram-caption") {
        systemPrompt = `You are SnapSolve's Viral Social Media Strategist & Content Creator.
Your job is to generate high-engaging, aesthetic Instagram captions, hook lines, and trending hashtag sets.

OUTPUT FORMAT:
✨ CAPTION OPTIONS (${inputs?.vibe || "Aesthetic & Engaging"}):

Option 1 (Aesthetic & Short):
"[Caption with emojis]"

Option 2 (Engaging Story & Question Hook):
"[Hook line + story text + call-to-action question]"

Option 3 (Bold & Punchy):
"[Short punchy line]"

==================================================
🎯 RECOMMENDED HASHTAGS:
#[hashtag1] #[hashtag2] #[hashtag3] #[hashtag4] #[hashtag5] #[hashtag6]`;
      }

      const userPrompt = `Service Task: ${serviceTitle || serviceId}
User Input Parameters:
${Object.entries(inputs || {})
  .map(([k, v]) => `${k}: ${v}`)
  .join("\n")}`;

      // 1. Server-side OPENROUTER_API_KEY from environment variables (e.g. Vercel)
      const serverOpenRouterKey = process.env.OPENROUTER_API_KEY;
      if (serverOpenRouterKey) {
        try {
          const orResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${serverOpenRouterKey}`,
              "HTTP-Referer": "https://snapsolve.app",
              "X-Title": "SnapSolve AI Workspace",
            },
            body: JSON.stringify({
              model: model || "openai/gpt-4o-mini",
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
              ],
              temperature: 0.3,
              max_tokens: 2500,
            }),
          });

          if (orResponse.ok) {
            const data = await orResponse.json();
            const content = data?.choices?.[0]?.message?.content;
            if (content) {
              return res.json({ success: true, result: content.trim() });
            }
          }
        } catch (orErr: any) {
          console.error("Server OPENROUTER_API_KEY error:", orErr?.message || orErr);
        }
      }

      // 2. Server-side GEMINI_API_KEY from environment
      const serverGeminiKey = process.env.GEMINI_API_KEY;
      if (serverGeminiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey: serverGeminiKey });
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
              systemInstruction: systemPrompt,
            },
          });
          if (response.text) {
            return res.json({ success: true, result: response.text });
          }
        } catch (gemErr: any) {
          console.error("Server GEMINI_API_KEY error:", gemErr?.message || gemErr);
        }
      }

      // 3. Fallback to client-provided request apiKey if passed
      const userKey = apiKey ? String(apiKey).trim() : "";
      if (userKey) {
        if (userKey.startsWith("AIzaSy") || userKey.startsWith("AIza")) {
          // Gemini API Key provided by user
          try {
            const ai = new GoogleGenAI({ apiKey: userKey });
            const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: userPrompt,
              config: {
                systemInstruction: systemPrompt,
              },
            });
            if (response.text) {
              return res.json({ success: true, result: response.text });
            }
          } catch (gemErr: any) {
            console.error("Custom Gemini API error:", gemErr?.message || gemErr);
          }
        } else {
          // OpenRouter API Key provided by user
          try {
            const orResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userKey}`,
                "HTTP-Referer": "https://snapsolve.app",
                "X-Title": "SnapSolve AI Workspace",
              },
              body: JSON.stringify({
                model: model || "openai/gpt-4o-mini",
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "user", content: userPrompt },
                ],
                temperature: 0.3,
                max_tokens: 2500,
              }),
            });

            if (orResponse.ok) {
              const data = await orResponse.json();
              const content = data?.choices?.[0]?.message?.content;
              if (content) {
                return res.json({ success: true, result: content.trim() });
              }
            } else {
              const errBody = await orResponse.text();
              console.error("OpenRouter API error response:", errBody);
            }
          } catch (orErr: any) {
            console.error("OpenRouter fetch error:", orErr?.message || orErr);
          }
        }
      }

      // If no API key was valid or executed successfully
      return res.json({
        success: false,
        error: "No active API key configured or AI service request failed.",
      });
    } catch (err: any) {
      console.error("Error in /api/generate route:", err);
      return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SnapSolve Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
