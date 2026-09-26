import React from 'react';
import { ArrowDown, Download, Send, Sparkles, Code2, Brain, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import ProfilePortrait from './ProfilePortrait';
import RevealOnScroll from './RevealOnScroll';
import { downloadResumePdf } from '../utils/generateResumePdf';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle organic floating peach background blurs */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FFE7DF] via-[#FFF0EB] to-[#FFE2D6] opacity-60 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-16 -left-20 w-80 h-80 bg-[#FFDED3]/40 rounded-full blur-2xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 bg-[#FFEFE8]/60 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Subtle editorial kicker */}
            <RevealOnScroll direction="up" delay={50}>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A05C46] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF8A65]" />
                <span>B.Tech CSE (AI & ML)</span>
                <span className="text-[#C8A89C]">·</span>
                <span>Marwadi University, Rajkot</span>
              </div>
            </RevealOnScroll>

            {/* Name */}
            <RevealOnScroll direction="up" delay={120}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#241B16] leading-[1.1] mb-3">
                {PERSONAL_INFO.name}
              </h1>
            </RevealOnScroll>

            {/* Professional Headline */}
            <RevealOnScroll direction="up" delay={180}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-lg sm:text-xl font-bold text-[#8C432A] mb-4">
                <span>CSE (AI & ML) Student</span>
                <span className="text-[#D8AFA0] hidden sm:inline">•</span>
                <span className="text-[#59443B] font-semibold text-base sm:text-lg">
                  Aspiring Software Developer
                </span>
                <span className="text-[#D8AFA0] hidden sm:inline">•</span>
                <span className="text-[#8C432A] font-semibold text-base sm:text-lg">
                  AI & ML Enthusiast
                </span>
              </div>
            </RevealOnScroll>

            {/* Tagline */}
            <RevealOnScroll direction="up" delay={240}>
              <blockquote className="text-base sm:text-lg italic font-medium text-[#4D3930] border-l-2 border-[#FF9E7D] pl-3.5 my-2 max-w-2xl bg-[#FFF6F2]/80 py-1.5 rounded-r-lg">
                "{PERSONAL_INFO.tagline}"
              </blockquote>
            </RevealOnScroll>

            {/* Short Supporting Text */}
            <RevealOnScroll direction="up" delay={300}>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5C483F] max-w-2xl">
                {PERSONAL_INFO.shortBio}
              </p>
            </RevealOnScroll>

            {/* Quick Context Highlights */}
            <RevealOnScroll direction="up" delay={360}>
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#70584E]">
                <div className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-[#FF8A65]" />
                  <span className="font-semibold text-[#2E1E17]">AI & Machine Learning Focus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#FF8A65]" />
                  <span className="font-semibold text-[#2E1E17]">Practical Software Engineering</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FF8A65]" />
                  <span className="font-semibold text-[#2E1E17]">CodeAlpha Alum</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Primary, Secondary & Additional CTAs */}
            <RevealOnScroll direction="up" delay={420}>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {/* Primary CTA */}
                <button
                  onClick={scrollToProjects}
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF8A65] to-[#E66840] hover:from-[#E66840] hover:to-[#D4552E] text-white font-semibold text-sm shadow-[0_6px_20px_rgba(230,104,64,0.28)] hover:shadow-[0_8px_25px_rgba(230,104,64,0.38)] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* View Resume Option */}
                <button
                  onClick={onOpenResume}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#FFF5F0] text-[#473026] border border-[#FFD0C0] font-semibold text-sm shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
                  title="View one-page ATS resume in preview modal"
                >
                  <FileText className="w-4 h-4 text-[#E66840]" />
                  <span>View Resume</span>
                </button>

                {/* Download Resume Option */}
                <button
                  onClick={downloadResumePdf}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FFF2EB] hover:bg-[#FFE6DC] text-[#3D2218] border border-[#FFCBB8] font-semibold text-sm shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
                  title="Download ATS-friendly PDF resume"
                >
                  <Download className="w-4 h-4 text-[#E66840]" />
                  <span>Download Resume</span>
                </button>

                {/* Additional CTA */}
                <button
                  onClick={scrollToContact}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-[#7F503E] hover:text-[#2A160E] hover:bg-[#FFEFE8]/70 font-semibold text-sm transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#FF8A65]" />
                  <span>Let's Connect</span>
                </button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Large Portrait in Peach Frame (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <RevealOnScroll direction="up" delay={200}>
              <ProfilePortrait />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
