import React, { useState } from 'react';
import { X, Printer, Download, Check, Copy, ExternalLink, Mail, MapPin, FileDown } from 'lucide-react';
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  SKILL_CATEGORIES,
  CERTIFICATIONS_DATA,
  WORKSHOPS_DATA,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const { downloadResumePdf } = await import('../utils/generateResumePdf');
      downloadResumePdf();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generatePlainTextResume = () => {
    return `SARTHIK ADEPU
CSE (AI & ML) Student | Aspiring Software Developer
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}
LinkedIn: ${PERSONAL_INFO.socials.linkedin}
GitHub: ${PERSONAL_INFO.socials.github}
Instagram: ${PERSONAL_INFO.socials.instagram}

--------------------------------------------------
SUMMARY
--------------------------------------------------
${PERSONAL_INFO.shortBio}
${PERSONAL_INFO.aboutDetailed.replace(/\n\n/g, ' ')}

--------------------------------------------------
EDUCATION
--------------------------------------------------
${EDUCATION_DATA.institution}
${EDUCATION_DATA.degree}
Major: ${EDUCATION_DATA.major}
Status: ${EDUCATION_DATA.status}
Location: ${EDUCATION_DATA.location}

--------------------------------------------------
EXPERIENCE
--------------------------------------------------
${EXPERIENCE_DATA[0].company} - ${EXPERIENCE_DATA[0].role}
Period: ${EXPERIENCE_DATA[0].period} (${EXPERIENCE_DATA[0].type})
- ${EXPERIENCE_DATA[0].description}
- Key Projects Developed: ${EXPERIENCE_DATA[0].projectsDeveloped.join(', ')}

--------------------------------------------------
PROJECTS
--------------------------------------------------
1. Hangman Game
   Live: https://hangman-game-flax-eight.vercel.app/
   GitHub: https://github.com/sarthikadepu04-del/hangman-game
   Tech: React, TypeScript, Vite, Tailwind CSS, Web Audio API, Vercel Serverless Functions, localStorage
   Details: Modern interactive word-guessing game with difficulty modes, hints, scoring, streak tracking, keyboard controls, SVG rendering, and sound effects.

2. Stock Portfolio Tracker
   Live: https://stock-portfolio-tracker-pi.vercel.app/
   GitHub: https://github.com/sarthikadepu04-del/stock-portfolio-tracker
   Tech: React, TypeScript, Vite, Vercel, Serverless Functions
   Details: Modern responsive stock portfolio tracking app for monitoring portfolio holdings, profit/loss metrics, watchlists, analytics, and stock charts.

3. StudyMate AI
   Live: https://studymate-ai-gamma-livid.vercel.app/
   GitHub: https://github.com/sarthikadepu04-del/studymate-ai
   Tech: Gemini AI, React, TypeScript, AI application development, Vercel Serverless Backend
   Details: AI-powered educational chatbot built with Gemini AI for study assistance, general knowledge, conversations, Markdown/code support, and conversation history.

4. Cravingo Kitchen
   Live: https://cravingo-kitchen.vercel.app/
   GitHub: https://github.com/sarthikadepu04-del/Cravingo-Kitchen
   Tech: TypeScript, React, Vite, Modern responsive web development, Vercel
   Details: Modern food-ordering culinary website concept featuring an artisanal homestyle kitchen experience, dishes, drinks, desserts, and a delivery-focused interface.

--------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------
- Programming: Python, C++, C
- Web Development: React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Vite, Responsive Web Development
- AI / ML: Artificial Intelligence, Machine Learning, Gemini AI, Google AI Studio, AI-powered application development, Prompt-based application development
- Backend / APIs: Flask, REST APIs, Serverless Functions, API Integration
- Tools & Platforms: Git, GitHub, Vercel, Google AI Studio
- Database / Data: SQL, Data Analysis, Local Storage
- Core: Object-Oriented Programming, Problem Solving, Software Development

--------------------------------------------------
CERTIFICATIONS
--------------------------------------------------
- Google Cloud Certified Professional
- Cloud Architect
- Certified Forage and Grassland Professional (CFGP)
- Technology Job Simulation
- Computer Hardware and Software

--------------------------------------------------
WORKSHOPS & ACTIVITIES
--------------------------------------------------
- AI SPARKS: Attended an AI-focused event and workshop.
- Robotics Workshop: Explored robotics concepts and practical technology applications.
`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatePlainTextResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatePlainTextResume()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Sarthik_Adepu_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#241F1C]/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#F0DFD7] my-auto overflow-hidden">
        {/* Action Header bar (hidden during print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#FFF8F5] border-b border-[#F5E5DF] print:hidden">
          <div>
            <h2 id="resume-modal-title" className="text-base font-bold text-[#2E1E17]">
              Sarthik Adepu — One-Page Resume
            </h2>
            <p className="text-xs text-[#7A675F]">
              ATS-Optimized · B.Tech CSE (AI & ML) · Marwadi University
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#E66840] text-white hover:bg-[#D4552E] transition-colors shadow-xs cursor-pointer disabled:opacity-70"
            >
              <FileDown className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Preparing PDF...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E5D2CB] text-[#4A3728] hover:bg-[#FAF4F0] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#E66840]" />
              <span>Print / Save</span>
            </button>
            <button
              onClick={handleDownloadTxt}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#E5D2CB] text-[#4A3728] hover:bg-[#FAF4F0] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.txt</span>
            </button>
            <button
              onClick={handleCopyText}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#E5D2CB] text-[#4A3728] hover:bg-[#FAF4F0] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close resume preview"
              className="p-1.5 text-[#7A675F] hover:text-[#2E1E17] hover:bg-[#F3E6E0] rounded-lg transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto print:max-h-none print:p-0 print:overflow-visible bg-white text-[#1F1D1B]">
          {/* Header */}
          <div className="border-b-2 border-[#2E1E17] pb-4 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F1D1B] uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <span className="text-xs font-semibold text-[#8C4F3B]">
                {PERSONAL_INFO.headline}
              </span>
            </div>

            {/* Contact Row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#52443D]">
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#FF8A65]" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">
                  {PERSONAL_INFO.email}
                </a>
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#FF8A65]" />
                {PERSONAL_INFO.location}
              </span>
              <span>·</span>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-[#241F1C] font-medium"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-[#241F1C] font-medium"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-[#241F1C] font-medium"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-4">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#8C4F3B] border-b border-[#E8D4CC] pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-[#3B332F]">
              2nd-year B.Tech CSE (AI & ML) student at Marwadi University passionate about programming,
              Artificial Intelligence, Machine Learning, software development, and problem-solving.
              Experienced in building practical web applications and AI-driven interfaces with React,
              TypeScript, Python, and modern serverless platforms. Goal-oriented developer eager to apply
              technical skills and contribute effectively to impactful software engineering teams.
            </p>
          </section>

          {/* Education */}
          <section className="mb-4">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#8C4F3B] border-b border-[#E8D4CC] pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <span className="font-bold text-[#1F1D1B]">{EDUCATION_DATA.institution}</span>
                <span className="text-[#52443D]"> — {EDUCATION_DATA.degree}</span>
                <div className="text-[11px] text-[#63554F]">
                  Specialization: {EDUCATION_DATA.major} · {EDUCATION_DATA.status}
                </div>
              </div>
              <div className="text-right text-[11px] text-[#52443D] font-medium">
                {EDUCATION_DATA.location}
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-4">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#8C4F3B] border-b border-[#E8D4CC] pb-0.5 mb-1.5">
              Internship Experience
            </h2>
            {EXPERIENCE_DATA.map((exp, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-[#1F1D1B]">{exp.company}</span>
                    <span className="text-[#52443D]"> — {exp.role}</span>
                  </div>
                  <span className="text-[11px] text-[#52443D] font-medium">{exp.period}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#3B332F] mt-1">
                  {exp.description}
                </p>
                <div className="text-[11px] text-[#52443D] mt-0.5">
                  <span className="font-medium text-[#241F1C]">Key Projects Developed: </span>
                  {exp.projectsDeveloped.join(' · ')}
                </div>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="mb-4">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#8C4F3B] border-b border-[#E8D4CC] pb-0.5 mb-2">
              Featured Projects
            </h2>
            <div className="space-y-2.5">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-[#1F1D1B]">{proj.name}</span>
                    <span className="text-[10px] text-[#7A675F]">
                      <a href={proj.live} target="_blank" rel="noreferrer" className="text-[#8C4F3B] hover:underline mr-2">
                        Live Demo
                      </a>
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-[#52443D] hover:underline">
                        Source Code
                      </a>
                    </span>
                  </div>
                  <div className="text-[11px] text-[#8C4F3B] font-mono mt-0.5">
                    {proj.technologies.join(' · ')}
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#3B332F] mt-0.5">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-4">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#8C4F3B] border-b border-[#E8D4CC] pb-0.5 mb-1.5">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] leading-relaxed">
              <div>
                <span className="font-bold text-[#1F1D1B]">Programming: </span>
                <span className="text-[#3B332F]">Python, C++, C</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1D1B]">Web Development: </span>
                <span className="text-[#3B332F]">HTML, CSS, JavaScript, TypeScript, React, Vite, Tailwind CSS</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1D1B]">AI / ML: </span>
                <span className="text-[#3B332F]">Artificial Intelligence, Machine Learning, Gemini AI, Google AI Studio, AI-powered App Dev</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1D1B]">Backend & APIs: </span>
                <span className="text-[#3B332F]">Flask, REST APIs, Serverless Functions, API Integration</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1D1B]">Tools & Platforms: </span>
                <span className="text-[#3B332F]">Git, GitHub, Vercel, Google AI Studio</span>
              </div>
              <div>
                <span className="font-bold text-[#1F1D1B]">Databases & Core: </span>
                <span className="text-[#3B332F]">SQL, Data Analysis, Local Storage, OOP, Problem Solving</span>
              </div>
            </div>
          </section>

          {/* Certifications & Workshops */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <section>
              <h2 className="text-xs font-bold tracking-wider uppercase text-[#8C4F3B] border-b border-[#E8D4CC] pb-0.5 mb-1.5">
                Certifications
              </h2>
              <ul className="text-[11px] text-[#3B332F] space-y-1 list-disc list-inside">
                {CERTIFICATIONS_DATA.map((cert, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-[#1F1D1B]">{cert.title}</span>
                    {cert.subtitle && <span className="text-[#6B5A53]"> ({cert.subtitle})</span>}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-bold tracking-wider uppercase text-[#8C4F3B] border-b border-[#E8D4CC] pb-0.5 mb-1.5">
                Workshops & Activities
              </h2>
              <ul className="text-[11px] text-[#3B332F] space-y-1 list-disc list-inside">
                {WORKSHOPS_DATA.map((ws, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-[#1F1D1B]">{ws.title}: </span>
                    <span className="text-[#6B5A53]">{ws.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Modal Footer (hidden during print) */}
        <div className="px-6 py-3 bg-[#FAF4F0] border-t border-[#F0DFD7] flex items-center justify-between text-xs text-[#7A675F] print:hidden">
          <span>Sarthik Adepu · Resume Preview</span>
          <button
            onClick={onClose}
            type="button"
            className="text-xs font-medium text-[#8C4F3B] hover:text-[#5C2B1D] underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
