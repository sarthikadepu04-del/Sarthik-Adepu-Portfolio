import React from 'react';
import { ArrowDown, Send, Sparkles, Code2, Brain, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import ProfilePortrait from './ProfilePortrait';
import RevealOnScroll from './RevealOnScroll';

interface HeroProps {
  onOpenAiChat?: () => void;
}

export default function Hero({ onOpenAiChat }: HeroProps) {
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

            {/* Primary & Additional CTAs */}
            <RevealOnScroll direction="up" delay={420}>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {/* Primary CTA */}
                <button
                  onClick={scrollToProjects}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8A65] to-[#E66840] hover:from-[#E66840] hover:to-[#D4552E] text-white font-semibold text-sm shadow-[0_6px_20px_rgba(230,104,64,0.28)] hover:shadow-[0_8px_25px_rgba(230,104,64,0.38)] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Additional CTA */}
                <button
                  onClick={scrollToContact}
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#FFF5F0] text-[#473026] border border-[#FFD0C0] font-semibold text-sm shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#FF8A65]" />
                  <span>Let's Connect</span>
                </button>
              </div>

              {/* Subtle Hero Visual Cue for Ask Sarthik AI */}
              {onOpenAiChat && (
                <div className="mt-6 pt-5 border-t border-[#F5E6DF] w-full max-w-xl">
                  <button
                    type="button"
                    onClick={onOpenAiChat}
                    className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-3 pr-4 rounded-2xl bg-white/95 hover:bg-white border border-[#FFD0BE] hover:border-[#FF9E7D] shadow-2xs hover:shadow-xs transition-all text-left cursor-pointer active:scale-98"
                    title="Open Ask Sarthik AI assistant"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-extrabold text-[#261A14] group-hover:text-[#E66840] transition-colors">
                            ✨ Ask Sarthik AI
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#FFF0EB] border border-[#FFD3C4] text-[10px] font-bold text-[#E66840]">
                            Live Assistant
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#7A6358] mt-0.5">
                          Explore my projects, skills &amp; journey.
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C8A89C] group-hover:text-[#E66840] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                </div>
              )}
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
