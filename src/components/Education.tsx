import { GraduationCap, MapPin, Calendar, Check } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';
import RevealOnScroll from './RevealOnScroll';

export default function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 bg-[#FFF9F6] border-y border-[#F3E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Academic Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              Education & Academic Track
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
              Rigorous undergraduate computer science engineering education with a dedicated
              specialization in Artificial Intelligence and Machine Learning.
            </p>
          </div>
        </RevealOnScroll>

        {/* Education Hero Card */}
        <RevealOnScroll direction="up" delay={150}>
          <div className="mt-10 max-w-4xl bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#F2DDD3] shadow-xs relative overflow-hidden">
            {/* Subtle peach corner glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFE7DF] rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#F7EBE5]">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8A65] to-[#FFA07A] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#291A14]">
                      {EDUCATION_DATA.institution}
                    </h3>
                    <div className="text-base font-bold text-[#8C432A] mt-0.5">
                      {EDUCATION_DATA.degree} in {EDUCATION_DATA.major}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#735D54] mt-2">
                      <span className="flex items-center gap-1 font-semibold text-[#3B251D]">
                        <Calendar className="w-3.5 h-3.5 text-[#E66840]" />
                        {EDUCATION_DATA.status}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E66840]" />
                        {EDUCATION_DATA.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFF2EB] border border-[#FFD3C4] text-xs font-semibold text-[#8C432A] self-start">
                  <span className="w-2 h-2 rounded-full bg-[#E66840]" />
                  <span>Currently Enrolled</span>
                </div>
              </div>

              {/* Overview & Key Course Areas */}
              <div className="mt-6">
                <p className="text-sm leading-relaxed text-[#4A3930]">
                  {EDUCATION_DATA.description}
                </p>

                <div className="mt-6 pt-5 border-t border-[#F7EBE5]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C5542] block mb-3">
                    Core Academic Focus Areas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-[#3E2B23]">
                    {[
                      'Artificial Intelligence & ML Fundamentals',
                      'Data Structures & Algorithms',
                      'Object-Oriented Programming (C++ & Python)',
                      'Database Management Systems & SQL',
                      'Web Technologies & Responsive Systems',
                      'Computer Architecture & System Design',
                    ].map((subject, sIdx) => (
                      <div
                        key={subject}
                        className="p-2.5 rounded-lg bg-[#FAF5F1] border border-[#F2E5DC] flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
                        style={{ transitionDelay: `${sIdx * 50}ms` }}
                      >
                        <Check className="w-3.5 h-3.5 text-[#E66840] shrink-0" />
                        <span className="font-medium">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
