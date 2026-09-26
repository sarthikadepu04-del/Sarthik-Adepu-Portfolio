import {
  Terminal,
  Globe,
  Brain,
  Layers,
  Compass,
  Rocket,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface RoadmapStage {
  number: string;
  title: string;
  items: string[];
  icon: typeof Terminal;
  badge: string;
  isFuture?: boolean;
}

const ROADMAP_STAGES: RoadmapStage[] = [
  {
    number: '01',
    title: 'Foundation',
    items: ['C Programming', 'C++', 'Python', 'Problem Solving'],
    icon: Terminal,
    badge: 'Core Base',
  },
  {
    number: '02',
    title: 'Development',
    items: ['Web Development', 'React', 'TypeScript', 'Git & GitHub'],
    icon: Globe,
    badge: 'Hands-on',
  },
  {
    number: '03',
    title: 'AI & ML',
    items: ['Artificial Intelligence', 'Machine Learning', 'Gemini AI', 'AI Applications'],
    icon: Brain,
    badge: 'Specialization',
  },
  {
    number: '04',
    title: 'Building',
    items: ['Real-world Projects', 'APIs', 'Serverless Applications', 'Deployment'],
    icon: Layers,
    badge: 'Applied Engineering',
  },
  {
    number: '05',
    title: 'Growth',
    items: ['Internships', 'Workshops', 'Collaboration', 'Continuous Learning'],
    icon: Compass,
    badge: 'Industry Readiness',
  },
  {
    number: '06',
    title: 'Future',
    items: ['Advanced AI/ML', 'Software Development', 'Meaningful Products'],
    icon: Rocket,
    badge: 'Upcoming Goal',
    isFuture: true,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 sm:py-24 bg-[#FFF9F6] border-y border-[#F3E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Engineering Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              My Roadmap
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
              Learning, building, and growing one step at a time.
            </p>
          </div>
        </RevealOnScroll>

        {/* ========================================================================= */}
        {/* DESKTOP HORIZONTAL ROADMAP (Visible on lg and larger screens)            */}
        {/* ========================================================================= */}
        <div className="hidden lg:block mt-16 relative">
          {/* Horizontal Connecting Guide Line running through the node points */}
          <div
            className="absolute top-5 left-8 right-8 h-0.5 bg-gradient-to-r from-[#FF8A65] via-[#FFB299] to-[#FFD0C0]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-6 gap-4 relative">
            {ROADMAP_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <RevealOnScroll
                  key={stage.number}
                  direction="up"
                  staggerIndex={index}
                  className="flex flex-col"
                >
                  {/* Step Milestone Node & Number on the Horizontal Track */}
                  <div className="flex flex-col items-center mb-6 relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs z-10 ${
                        stage.isFuture
                          ? 'bg-[#FFF2EB] border-2 border-dashed border-[#FF8A65] text-[#E66840]'
                          : 'bg-white border-2 border-[#E66840] text-[#E66840] ring-4 ring-[#FFF9F6]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Small Connector Pip beneath Node */}
                    <div className="w-0.5 h-3 bg-[#FFC1AE] mt-1" />
                  </div>

                  {/* Milestone Card */}
                  <div
                    className={`h-full rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-md ${
                      stage.isFuture
                        ? 'bg-gradient-to-b from-[#FFFDFB] to-[#FFF5F0] border-2 border-dashed border-[#FFA88B] hover:border-[#E66840]'
                        : 'bg-white border border-[#F2DDD3] hover:border-[#FFA587]'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Number badge & Status chip */}
                      <div className="flex items-center justify-between gap-1 mb-3">
                        <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#FFF0EB] text-[#E66840] border border-[#FFD3C4]">
                          {stage.number}
                        </span>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            stage.isFuture
                              ? 'bg-[#FFEADA] text-[#A65134] border border-[#FFC8B8]'
                              : 'bg-[#FAF4F0] text-[#7A6054] border border-[#F0DFD7]'
                          }`}
                        >
                          {stage.badge}
                        </span>
                      </div>

                      {/* Stage Title */}
                      <h3 className="text-base font-extrabold text-[#261A14] flex items-center gap-1.5">
                        {stage.title}
                        {stage.isFuture && (
                          <Sparkles className="w-3.5 h-3.5 text-[#E66840] shrink-0" />
                        )}
                      </h3>

                      {/* Bulleted / Delimited Learning Items */}
                      <ul className="mt-3.5 space-y-2 text-xs text-[#523E35]">
                        {stage.items.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-[#FF8A65] font-bold text-[13px] leading-none shrink-0 mt-0.5">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Status / Vision Indicator */}
                    <div className="mt-4 pt-3 border-t border-[#F5E6DF] text-[11px]">
                      {stage.isFuture ? (
                        <span className="font-semibold text-[#D4552E] flex items-center gap-1">
                          <span>Upcoming Vision</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="text-[#8C6D60] font-medium">Stage {stage.number}</span>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET VERTICAL TIMELINE (Visible below lg screens)              */}
        {/* ========================================================================= */}
        <div className="block lg:hidden mt-12 relative max-w-2xl mx-auto">
          {/* Vertical Connecting Guide Line */}
          <div
            className="absolute left-5 sm:left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#FF8A65] via-[#FFB299] to-[#FFD0C0]"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {ROADMAP_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <RevealOnScroll
                  key={stage.number}
                  direction="up"
                  staggerIndex={index % 4}
                >
                  <div className="relative pl-12 sm:pl-16 group">
                    {/* Node on the Vertical Track */}
                    <div
                      className={`absolute left-5 sm:left-6 top-5 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs z-10 ${
                        stage.isFuture
                          ? 'bg-[#FFF2EB] border-2 border-dashed border-[#FF8A65] text-[#E66840]'
                          : 'bg-white border-2 border-[#E66840] text-[#E66840] ring-4 ring-[#FFF9F6]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    {/* Milestone Card */}
                    <div
                      className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xs hover:shadow-md ${
                        stage.isFuture
                          ? 'bg-gradient-to-b from-[#FFFDFB] to-[#FFF5F0] border-2 border-dashed border-[#FFA88B]'
                          : 'bg-white border border-[#F2DDD3] hover:border-[#FFA587]'
                      }`}
                    >
                      {/* Card Header: Stage Number, Title & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#F7EBE5]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-[#FFF0EB] text-[#E66840] border border-[#FFD3C4]">
                            {stage.number}
                          </span>
                          <h3 className="text-base sm:text-lg font-extrabold text-[#261A14] flex items-center gap-1.5">
                            {stage.title}
                            {stage.isFuture && (
                              <Sparkles className="w-3.5 h-3.5 text-[#E66840]" />
                            )}
                          </h3>
                        </div>

                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            stage.isFuture
                              ? 'bg-[#FFEADA] text-[#A65134] border border-[#FFC8B8]'
                              : 'bg-[#FAF4F0] text-[#7A6054] border border-[#F0DFD7]'
                          }`}
                        >
                          {stage.badge}
                        </span>
                      </div>

                      {/* Items formatted with bullet points */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#523E35]">
                        {stage.items.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A65] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {stage.isFuture && (
                        <div className="mt-4 pt-3 border-t border-[#F5E6DF] flex items-center justify-between text-xs text-[#8C5542]">
                          <span className="font-medium text-[#7A5B50]">
                            Forward-looking objective & ongoing aspiration
                          </span>
                          <span className="font-semibold text-[#D4552E] flex items-center gap-1">
                            <span>Upcoming Vision</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
