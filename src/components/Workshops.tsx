import { Sparkles, Bot, Presentation } from 'lucide-react';
import { WORKSHOPS_DATA } from '../data/portfolioData';
import RevealOnScroll from './RevealOnScroll';

export default function Workshops() {
  const workshopIcons = [Sparkles, Bot];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Community & Learning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#241B16]">
              Workshops & Activities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6E5549]">
              Active participation in technology events and specialized workshops.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORKSHOPS_DATA.map((item, index) => {
            const Icon = workshopIcons[index % workshopIcons.length] || Presentation;
            return (
              <RevealOnScroll
                key={item.title}
                direction="up"
                staggerIndex={index + 1}
              >
                <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-[#F2DDD3] hover:border-[#FFA587] shadow-xs hover:shadow-md transition-all flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF0EB] to-[#FFE2D6] border border-[#FFD0BE] flex items-center justify-center text-[#E66840] shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2A1B14]">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[#59443B] mt-1.5">
                      {item.description}
                    </p>
                    <span className="inline-block mt-3 text-xs font-semibold text-[#8C432A]">
                      Workshop Participant
                    </span>
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
