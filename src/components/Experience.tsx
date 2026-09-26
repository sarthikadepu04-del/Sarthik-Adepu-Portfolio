import React from 'react';
import { Calendar, CheckCircle2, ArrowRight, Sparkles, Bot, Presentation } from 'lucide-react';
import { EXPERIENCE_DATA, WORKSHOPS_DATA } from '../data/portfolioData';
import RevealOnScroll from './RevealOnScroll';

export default function Experience() {
  const scrollToProject = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activityIcons = [Sparkles, Bot];

  return (
    <section id="experience" className="py-20 sm:py-24 bg-[#FFF9F6] border-y border-[#F3E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Practical Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              Internship & Applied Engineering
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
              Hands-on software development experience building production-grade web applications,
              AI integration workflows, and responsive user experiences.
            </p>
          </div>
        </RevealOnScroll>

        {/* Timeline Container */}
        <div className="mt-12 relative max-w-4xl">
          {/* Subtle peach vertical guideline */}
          <div
            className="absolute left-4 sm:left-7 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#FFA587] via-[#FFC7B5] to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {EXPERIENCE_DATA.map((exp, index) => (
              <RevealOnScroll key={index} direction="up" delay={150}>
                <div className="relative pl-12 sm:pl-20 group">
                  {/* Node icon */}
                  <div className="absolute left-1.5 sm:left-4.5 top-1.5 w-6 h-6 rounded-full bg-[#E66840] border-4 border-[#FFF9F6] shadow-xs flex items-center justify-center -translate-x-1/2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Experience Card */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F2DDD3] hover:border-[#FFA587] shadow-xs hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F7EBE5]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl font-bold text-[#2A1B14]">
                            {exp.role}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-[#8C432A] mt-0.5">
                          {exp.company} · {exp.type}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A6358] bg-[#FAF3EF] px-3 py-1.5 rounded-lg border border-[#F2DDD3] self-start sm:self-center">
                        <Calendar className="w-3.5 h-3.5 text-[#E66840]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A3930]">
                      {exp.description}
                    </p>

                    {/* Highlighted Internship Projects */}
                    <div className="mt-6 pt-4 border-t border-[#F7EBE5]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8C5542] block mb-3">
                        Projects Built During Internship:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {exp.projectsDeveloped.map((proj, pIdx) => {
                          const projId = proj.toLowerCase().replace(/\s+/g, '-');
                          return (
                            <a
                              key={proj}
                              href={`#${projId}`}
                              onClick={(e) => scrollToProject(e, projId)}
                              style={{ animationDelay: `${pIdx * 100}ms` }}
                              className="flex items-center justify-between p-3 rounded-xl bg-[#FFF5F0] hover:bg-[#FFE9DF] border border-[#F5D5C6] transition-all group/proj text-xs font-semibold text-[#3B2219]"
                            >
                              <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#E66840]" />
                                {proj}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#E66840] opacity-60 group-hover/proj:opacity-100 group-hover/proj:translate-x-0.5 transition-all" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Existing Activities & Workshops Sub-block */}
        <div className="mt-16 pt-12 border-t border-[#F0DDD2] max-w-4xl">
          <RevealOnScroll direction="up">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C5542] block mb-1">
                Activities & Community Participation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2A1B14]">
                Technical Workshops & Seminars
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {WORKSHOPS_DATA.map((item, index) => {
                const Icon = activityIcons[index % activityIcons.length] || Presentation;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F2DDD3] hover:border-[#FFA587] shadow-2xs hover:shadow-xs transition-all flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFF0EB] to-[#FFE2D6] border border-[#FFD0BE] flex items-center justify-center text-[#E66840] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#2A1B14]">{item.title}</h4>
                      <p className="text-xs text-[#59443B] mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
