import { Brain, Globe, Cpu, Sparkles, Lightbulb, Code2, Rocket, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface WhatIBuildItem {
  title: string;
  description: string;
  icon: typeof Brain;
  kicker: string;
}

const ITEMS: WhatIBuildItem[] = [
  {
    title: 'AI-Powered Apps',
    description: 'Building applications that use AI to create useful and intelligent experiences.',
    icon: Brain,
    kicker: 'Intelligent Systems',
  },
  {
    title: 'Web Experiences',
    description: 'Creating responsive, modern, and user-friendly web interfaces.',
    icon: Globe,
    kicker: 'Frontend & UI',
  },
  {
    title: 'Problem Solving',
    description: 'Turning requirements and ideas into practical working software.',
    icon: Cpu,
    kicker: 'Software Logic',
  },
  {
    title: 'Learning Through Projects',
    description: 'Learning new technologies by building real projects and experimenting with ideas.',
    icon: Sparkles,
    kicker: 'Hands-on Growth',
  },
];

const JOURNEY_STEPS = [
  {
    emoji: '💡',
    title: 'Ideas',
    subtitle: 'Curiosity & Purpose',
    icon: Lightbulb,
  },
  {
    emoji: '💻',
    title: 'Code',
    subtitle: 'Clean Architectures',
    icon: Code2,
  },
  {
    emoji: '🤖',
    title: 'Intelligence',
    subtitle: 'AI & ML Integrations',
    icon: Brain,
  },
  {
    emoji: '🚀',
    title: 'Real Products',
    subtitle: 'Deployed & Accessible',
    icon: Rocket,
  },
];

export default function WhatIBuild() {
  return (
    <section id="what-i-build" className="py-20 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Core Focus</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              What I Build
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
              Turning curiosity into code, and ideas into intelligent experiences.
            </p>
          </div>
        </RevealOnScroll>

        {/* Compact Visual Journey: Ideas -> Code -> Intelligence -> Real Products */}
        <RevealOnScroll direction="up" delay={100}>
          <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FFF5F0] via-[#FFEDE6] to-[#FFE8DE] border border-[#FFD0BE] shadow-xs">
            <div className="text-center mb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C432A]">
                The Engineering Journey
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative">
              {JOURNEY_STEPS.map((step, idx) => (
                <div
                  key={step.title}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#FFD3C4] shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] border border-[#FFCBB8] flex items-center justify-center text-lg shrink-0">
                    <span role="img" aria-label={step.title}>
                      {step.emoji}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-extrabold text-[#261A14] block truncate">
                      {step.title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#7A6358] block truncate">
                      {step.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll
                key={item.title}
                direction="up"
                staggerIndex={index}
                className="h-full"
              >
                <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-[#F2DDD3] hover:border-[#FFA587] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF0EB] to-[#FFE2D6] border border-[#FFD0BE] flex items-center justify-center text-[#E66840] mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5542] block mb-1.5">
                      {item.kicker}
                    </span>

                    <h3 className="text-lg font-bold text-[#261A14] group-hover:text-[#E66840] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#59443B]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F7EBE5] flex items-center justify-between text-[11px] text-[#8C6D60]">
                    <span>Practical Execution</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A65]" />
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
