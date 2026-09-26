import { Compass, Sparkles } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const EXPLORING_TOPICS = [
  { name: 'AI & ML', desc: 'Neural architectures & practical models' },
  { name: 'Generative AI', desc: 'LLM prompting, Gemini API & embeddings' },
  { name: 'Full-Stack Development', desc: 'Modern React, TypeScript & backend integrations' },
  { name: 'Cloud Technologies', desc: 'Serverless deployment & cloud infrastructure' },
  { name: 'Problem Solving', desc: 'Algorithmic thinking, data structures & clean logic' },
];

export default function CurrentlyExploring() {
  return (
    <div className="py-10 bg-gradient-to-b from-[#FAF7F2] via-[#FFF9F6] to-[#FAF7F2] border-y border-[#F3E5DD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF0EB] border border-[#FFD0BE] flex items-center justify-center text-[#E66840]">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#261A14] tracking-tight">
                    Currently Exploring
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0EB] text-[#E66840] border border-[#FFD3C4] text-[10px] font-bold">
                    Learning Track
                  </span>
                </div>
                <p className="text-xs text-[#7A6358] mt-0.5">
                  Technologies and domains I am actively exploring, practicing, and building with
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#8C6D60]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8A65]" />
              <span>Continuous Growth Mindset</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Animated Horizontal Marquee on Desktop / Smooth Horizontal Scroll on Mobile */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left & Right gradient edge fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Marquee Track: duplicated items for seamless infinite scroll on desktop */}
        <div className="flex w-max gap-4 px-4 hover:[animation-play-state:paused] animate-[marquee_35s_linear_infinite] motion-reduce:animate-none">
          {[...EXPLORING_TOPICS, ...EXPLORING_TOPICS].map((topic, i) => (
            <div
              key={`${topic.name}-${i}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#F2DDD3] hover:border-[#FFA587] shadow-2xs hover:shadow-xs transition-all duration-300 shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF8A65]" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#2A1B14] block">
                  {topic.name}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#7A6358] block">
                  {topic.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
