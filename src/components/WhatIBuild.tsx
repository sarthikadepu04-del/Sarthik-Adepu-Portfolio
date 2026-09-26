import { Brain, Globe, Cpu, Sparkles } from 'lucide-react';
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
              Turning ideas, curiosity, and technology into practical digital experiences.
            </p>
          </div>
        </RevealOnScroll>

        {/* 4 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
