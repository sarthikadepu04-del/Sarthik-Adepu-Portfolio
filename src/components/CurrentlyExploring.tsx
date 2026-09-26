import { Compass, Sparkles, Brain, Cpu, Code2, Layers } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const CORE_EXPLORING_TOPICS = [
  {
    name: 'AI & Machine Learning',
    desc: 'Foundational concepts, data structures, and practical model exploration',
    icon: Brain,
    status: 'Active Track',
  },
  {
    name: 'Gemini AI',
    desc: 'LLM prompting, context grounding, and serverless AI applications',
    icon: Sparkles,
    status: 'Integration Focus',
  },
  {
    name: 'React & TypeScript',
    desc: 'Modern component systems, clean state flows, and strict type safety',
    icon: Code2,
    status: 'Architecture',
  },
  {
    name: 'Software Development',
    desc: 'Algorithmic problem solving, end-to-end delivery, and cloud deployment',
    icon: Layers,
    status: 'Core Engineering',
  },
];

export default function CurrentlyExploring() {
  return (
    <section className="py-12 bg-gradient-to-b from-[#FAF7F2] via-[#FFF9F6] to-[#FAF7F2] border-y border-[#F3E5DD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] border border-[#FFD0BE] flex items-center justify-center text-[#E66840]">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#261A14] tracking-tight">
                    Currently Exploring
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0EB] text-[#E66840] border border-[#FFD3C4] text-[10px] font-bold">
                    Continuous Learning
                  </span>
                </div>
                <p className="text-xs text-[#7A6358] mt-0.5">
                  Domains and technologies I am actively studying, practicing, and building with
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#8C6D60]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Hands-on Focus</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 4 Premium Cards Grid with elegant visual indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CORE_EXPLORING_TOPICS.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <RevealOnScroll key={topic.name} direction="up" staggerIndex={i}>
                <div className="h-full p-5 rounded-2xl bg-white border border-[#F2DDD3] hover:border-[#FFA587] shadow-2xs hover:shadow-xs transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF2EB] border border-[#FFD5C6] flex items-center justify-center text-[#E66840]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF5F0] border border-[#EFE1D9] text-[10px] font-semibold text-[#8C5542]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A65]" />
                        {topic.status}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-[#2A1B14] group-hover:text-[#E66840] transition-colors">
                      {topic.name}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-[#6E5549]">
                      {topic.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F8ECE6] flex items-center justify-between text-[11px] text-[#A8948B]">
                    <span>In-depth Study</span>
                    <span className="text-[#FF8A65] font-semibold">● Active</span>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
