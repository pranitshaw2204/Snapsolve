// SnapSolve Global Configuration & Master Data

export const DEMO_MODE = true;

// Paste your OpenRouter API Key below or supply it via VITE_OPENROUTER_API_KEY env variable
export const OPENROUTER_API_KEY = ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_OPENROUTER_API_KEY as string) || "";

// Default OpenRouter model (e.g. 'openai/gpt-4o-mini', 'anthropic/claude-3.5-haiku', 'google/gemini-2.0-flash-001')
export const OPENROUTER_MODEL = "openai/gpt-4o-mini";

// Service Interface definition
export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  icon: string;
  category: string;
  popular?: boolean;
  sampleInput: string;
  sampleOutput: string;
  inputFields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'image';
    placeholder?: string;
    options?: string[];
    defaultValue?: string;
  }[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "resume-builder",
    title: "Resume Builder",
    tagline: "Turn rough notes into an executive ATS-ready resume",
    description: "Generates clean, professionally formatted resume sections with impact bullets, action verbs, and ATS optimization.",
    price: 5,
    currency: "₹",
    icon: "FileText",
    category: "Career & Productivity",
    popular: true,
    sampleInput: "John Doe, CS Grad at Delhi Tech. Interned at Infosys doing React & Node. Built a weather app with 5k users. Skills: JS, Python, SQL.",
    sampleOutput: "JOHN DOE\nSoftware Engineer | Computer Science Graduate\n\nPROFESSIONAL SUMMARY\nDetail-oriented Computer Science graduate with hands-on experience building scalable web applications using React, Node.js, and SQL. Proven track record of delivering user-centric software products.\n\nEXPERIENCE\nSoftware Engineering Intern | Infosys\n• Architected modern React components improving render performance by 35%.\n• Collaborated with backend teams to integrate Node.js APIs and optimize SQL queries.\n\nPROJECTS\nWeather Analytics Platform (5,000+ Active Users)\n• Engine framework using JavaScript and Python to fetch real-time atmospheric data.\n\nSKILLS\nLanguages: JavaScript, Python, SQL\nFrameworks & Tools: React.js, Node.js, Express, Git",
    inputFields: [
      { key: "fullName", label: "Full Name & Contact Info", type: "text", placeholder: "e.g., Alex Rivers | alex@example.com | +91 98765 43210" },
      { key: "targetRole", label: "Target Job Title", type: "text", placeholder: "e.g., Product Designer / Frontend Developer" },
      { key: "rawExperience", label: "Work & Education Notes", type: "textarea", placeholder: "Paste your raw bullet points, past roles, projects, degree details, and key achievements..." },
      { key: "skills", label: "Key Skills", type: "text", placeholder: "e.g., Figma, React, TypeScript, User Research, Tailwind" }
    ]
  },
  {
    id: "grammar-checker",
    title: "Grammar Checker",
    tagline: "Polish your writing to flawlessness instantly",
    description: "Detects subtle grammatical slips, awkward phrasing, and spelling issues while enhancing vocabulary and clarity.",
    price: 5,
    currency: "₹",
    icon: "Sparkles",
    category: "Writing",
    popular: true,
    sampleInput: "Me and my team has finished the presentation for tomorrow's client meeting, but we didnt double checked the financial data's.",
    sampleOutput: "✨ Corrected Version:\n\"My team and I have finished the presentation for tomorrow's client meeting, but we didn't double-check the financial data.\"\n\n🔍 Improvements Made:\n1. Fixed subject pronoun: 'Me and my team' ➔ 'My team and I'\n2. Subject-verb agreement: 'has finished' ➔ 'have finished'\n3. Contraction spelling: 'didnt' ➔ 'didn't'\n4. Verb tense after auxiliary: 'double checked' ➔ 'double-check'\n5. Plural noun correction: 'financial data's' ➔ 'financial data'",
    inputFields: [
      { key: "text", label: "Text to Review", type: "textarea", placeholder: "Paste your draft, essay, or paragraph here to fix grammar and improve tone..." },
      { key: "tone", label: "Desired Tone", type: "select", options: ["Professional", "Academic", "Casual & Friendly", "Formal Executive"], defaultValue: "Professional" }
    ]
  },
  {
    id: "plagiarism-checker",
    title: "Plagiarism Checker",
    tagline: "Ensure 100% academic and content originality",
    description: "Deep scans text against billions of web sources to verify uniqueness, compute originality index, and highlight matches.",
    price: 5,
    currency: "₹",
    icon: "ShieldCheck",
    category: "Academic",
    sampleInput: "Artificial Intelligence is transforming modern healthcare by enabling faster diagnostic tools and predictive patient care models.",
    sampleOutput: "📊 Originality Score: 96% UNIQUE\n\n✅ Audit Summary:\n• Total Words Analyzed: 184 words\n• Plagiarized Sentences: 0\n• Paraphrase Match Risk: Low (4% common phrasing standard in bio-tech literature)\n\n📌 Detailed Analysis:\nAll major clauses show unique structural composition. Citations recommended for standard medical definitions included in paragraph 2.",
    inputFields: [
      { key: "documentText", label: "Document Content", type: "textarea", placeholder: "Paste essay, paper draft, or article text to check for plagiarism and uniqueness..." }
    ]
  },
  {
    id: "notes-summarizer",
    title: "Notes Summarizer",
    tagline: "Digest hours of lecture or meeting notes in 10 seconds",
    description: "Transforms unstructured notes and lengthy transcripts into executive summaries, bullet points, and key takeaways.",
    price: 5,
    currency: "₹",
    icon: "FileSearch",
    category: "Student Essentials",
    popular: true,
    sampleInput: "Meeting about Q3 Marketing Launch: We discussed increasing social ad spend by 20% on Instagram. Priya will design 5 ad creatives by Thursday. Budget cap is 50,000 INR. Need approval from Raj before going live.",
    sampleOutput: "📌 EXECUTIVE SUMMARY\nQ3 Marketing campaign kick-off focused on expanding Instagram ad reach with a strict budget cap of ₹50,000.\n\n🔑 KEY ACTION ITEMS\n• Social Spend: Boost Instagram budget allocation by +20%.\n• Design Assets: Priya to deliver 5 ad creatives by Thursday.\n• Approvals: Final sign-off required from Raj prior to launch.\n\n🎯 NEXT STEPS\nFinalize creative concepts by Wednesday evening.",
    inputFields: [
      { key: "notesContent", label: "Raw Lecture / Meeting Notes", type: "textarea", placeholder: "Paste your lecture slides, meeting transcript, or bullet points..." },
      { key: "formatStyle", label: "Summary Format", type: "select", options: ["Executive Bullet Points", "Deep Dive Breakdown", "Q&A Revision Sheet", "TL;DR Single Paragraph"], defaultValue: "Executive Bullet Points" }
    ]
  },
  {
    id: "translator",
    title: "Translator",
    tagline: "Natural, context-aware translation across 30+ languages",
    description: "Translates idioms and technical terms naturally without stiff machine phrasing.",
    price: 5,
    currency: "₹",
    icon: "Languages",
    category: "Writing",
    sampleInput: "Please let me know if you are free for a quick call tomorrow afternoon to discuss the proposal.",
    sampleOutput: "🌐 Hindi Translation:\n\"कृपया मुझे बताएं कि क्या आप प्रस्ताव पर चर्चा करने के लिए कल दोपहर एक त्वरित कॉल के लिए उपलब्ध हैं।\"\n\nPhonetic Pronunciation:\n\"Kripya mujhe batayein ki kya aap prastav par charcha karne ke liye kal dopahar ek tvarit call ke liye uplabdha hain.\"",
    inputFields: [
      { key: "sourceText", label: "Text to Translate", type: "textarea", placeholder: "Enter text in any language..." },
      { key: "targetLanguage", label: "Target Language", type: "select", options: ["Hindi", "Spanish", "French", "German", "Japanese", "Mandarin Chinese", "Arabic", "Portuguese", "Russian", "Italian"], defaultValue: "Hindi" },
      { key: "style", label: "Translation Style", type: "select", options: ["Natural Conversational", "Formal Business", "Literal Word-for-Word"], defaultValue: "Natural Conversational" }
    ]
  },
  {
    id: "background-remover",
    title: "Background Remover",
    tagline: "Studio-grade transparent background isolation",
    description: "Isolates subjects from images with crisp edge retention, perfect for product photos and profile shots.",
    price: 5,
    currency: "₹",
    icon: "Image",
    category: "Design Tools",
    popular: true,
    sampleInput: "[Uploaded Profile Photo or Product Image]",
    sampleOutput: "✨ Background isolated with 100% transparency. Edge softness smoothed for portrait subject.",
    inputFields: [
      { key: "imageFile", label: "Upload Image", type: "image", placeholder: "Drag and drop your JPG/PNG image here or click to browse..." }
    ]
  },
  {
    id: "speech-writer",
    title: "Speech Writer",
    tagline: "Captivate any audience with unforgettable speeches",
    description: "Crafts engaging speeches tailored for keynotes, wedding toasts, debates, graduation ceremonies, or pitches.",
    price: 5,
    currency: "₹",
    icon: "Mic",
    category: "Public Speaking",
    sampleInput: "Topic: Future of AI in Education. Audience: High School Students. Length: 3 Minutes. Tone: Inspiring & Energetic.",
    sampleOutput: "🎤 INTRO (0:00 - 0:45)\n\"Look at your phones for a second. Ten years ago, the app you rely on today to solve complex calculus problems didn't even exist...\"\n\nBODY (0:45 - 2:15)\nAI isn't here to replace your curiosity; it's here to give you a bicycle for your mind...\n\nCONCLUSION (2:15 - 3:00)\n\"So don't just consume the future—build it. Thank you!\"",
    inputFields: [
      { key: "topic", label: "Speech Topic / Event", type: "text", placeholder: "e.g., Best Man Toast, Product Keynote, College Graduation" },
      { key: "audience", label: "Target Audience", type: "text", placeholder: "e.g., University students, Tech investors, Family members" },
      { key: "tone", label: "Tone & Energy", type: "select", options: ["Inspiring & Energetic", "Humorous & Witty", "Formal & Authoritative", "Emotional & Heartfelt"], defaultValue: "Inspiring & Energetic" },
      { key: "duration", label: "Estimated Length", type: "select", options: ["1 Minute Quick Pitch", "3 Minute Keynote", "5 Minute Feature Speech", "10 Minute Deep Address"], defaultValue: "3 Minute Keynote" }
    ]
  },
  {
    id: "email-writer",
    title: "Email Writer",
    tagline: "Draft high-converting, polite emails in seconds",
    description: "Generates high-converting cold emails, polite follow-ups, resignation letters, and client proposals.",
    price: 5,
    currency: "₹",
    icon: "Mail",
    category: "Communication",
    popular: true,
    sampleInput: "Subject: Following up on proposal. Purpose: Politely ask client if they reviewed the design quote sent last Tuesday.",
    sampleOutput: "Subject: Gentle follow-up regarding design proposal for SnapSolve\n\nHi [Client Name],\n\nHope you're having a great week!\n\nI wanted to quickly bump this to the top of your inbox to see if you had a chance to review the design quote sent over last Tuesday.\n\nWe're eager to collaborate with your team. Let me know if you have any questions or need adjustments to the scope.\n\nBest regards,\n[Your Name]",
    inputFields: [
      { key: "purpose", label: "What is this email about?", type: "text", placeholder: "e.g., Requesting sick leave / Following up on invoice / Pitching design agency" },
      { key: "recipient", label: "Who are you emailing?", type: "text", placeholder: "e.g., Hiring Manager, Client, Professor, Boss" },
      { key: "tone", label: "Tone", type: "select", options: ["Polite & Professional", "Assertive & Direct", "Warm & Friendly", "Urgent"], defaultValue: "Polite & Professional" },
      { key: "keyDetails", label: "Key Points to Include", type: "textarea", placeholder: "Add any specific dates, amounts, or attachments to reference..." }
    ]
  },
  {
    id: "instagram-caption",
    title: "Instagram Caption",
    tagline: "Generate viral captions, hooks & hashtag groups",
    description: "Creates engaging social media captions with scroll-stopping hooks, line breaks, emojis, and viral hashtag sets.",
    price: 5,
    currency: "₹",
    icon: "Instagram",
    category: "Social Media",
    sampleInput: "Photo: Sunset at Goa beach with coffee. Vibe: Aesthetic aesthetic, chill weekend, relaxed.",
    sampleOutput: "Option 1 (Minimal & Aesthetic):\nSipping golden hour ☕✨\n\nOption 2 (Engaging Story):\nSome places just make time slow down. Sunset, warm sea breeze, and fresh coffee in hand 🌅\nWhich one is your go-to weekend vibe: Beach or Mountains? Drop a comment below! 👇\n\n#GoaDiaries #GoldenHour #AestheticVibes #CoffeeLover #Wanderlust #BeachVibes #SunsetChaser",
    inputFields: [
      { key: "photoDescription", label: "Photo / Video Details", type: "textarea", placeholder: "Describe what is in your photo or reel (e.g. New sneaker unboxing, coffee date, college graduation)..." },
      { key: "vibe", label: "Vibe / Style", type: "select", options: ["Aesthetic & Chill", "Witty & Funny", "Motivational", "Short & Minimalist", "Storytelling"], defaultValue: "Aesthetic & Chill" },
      { key: "includeHashtags", label: "Hashtags & Emojis", type: "select", options: ["Include Trending Hashtags + Emojis", "Emojis Only", "Clean Text Only"], defaultValue: "Include Trending Hashtags + Emojis" }
    ]
  },
  {
    id: "business-name-generator",
    title: "Business Name Generator",
    tagline: "Memorable brand names with taglines and domain checks",
    description: "Creates brandable, modern startup names with matching taglines, brand vibes, and simulated domain availability.",
    price: 5,
    currency: "₹",
    icon: "Lightbulb",
    category: "Startup & Marketing",
    sampleInput: "Industry: AI Design Tools. Keywords: Fast, Pink, Creative, Solutions. Style: Modern single-word or compound.",
    sampleOutput: "🚀 TOP BRAND CONCEPTS:\n\n1. SnapSolve\n   • Tagline: Need it? Snap it. Solve it.\n   • Vibe: Friendly, ultra-fast, modern\n   • Domain Check: SnapSolve.com (Taken), SnapSolve.app (AVAILABLE ✅)\n\n2. LuminaFlow\n   • Tagline: Design at the speed of thought.\n   • Vibe: Sleek, premium, dark-mode focused\n\n3. VelvetCraft\n   • Tagline: Soft touch. Hard results.\n   • Vibe: Elegant, artisanal, creative",
    inputFields: [
      { key: "industry", label: "Industry / Niche", type: "text", placeholder: "e.g., Organic Coffee Shop, AI Writing Assistant, Fitness App" },
      { key: "keywords", label: "Keywords / Vibe Words", type: "text", placeholder: "e.g., Fresh, Velocity, Bloom, Minimal, Zen" },
      { key: "namingStyle", label: "Naming Style", type: "select", options: ["Modern Tech (Notion, Linear style)", "Compound Words (SnapSolve, AirBnb)", "Abstract & Short (Koda, Vercel)", "Classic & Descriptive"], defaultValue: "Modern Tech (Notion, Linear style)" }
    ]
  }
];

// Payment integration placeholder for DEMO_MODE = false
export async function processPaymentPlaceholder(serviceId: string, amount: number) {
  if (DEMO_MODE) {
    return { success: true, transactionId: "DEMO_" + Date.now() };
  }
  
  console.log(`[Payment Integration Hook] Ready for Stripe / Razorpay API for service ${serviceId} - ₹${amount}`);
  // Hook for Razorpay / Stripe backend call:
  /*
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serviceId, amount })
  });
  return await response.json();
  */
  return { success: false, error: "Payment gateway integration required in non-demo mode" };
}
