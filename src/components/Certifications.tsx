import { Award, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import RevealOnScroll from './RevealOnScroll';

export default function Certifications() {
  return (
    <section id="certificates" className="py-20 sm:py-24 bg-[#FFF9F6] border-y border-[#F3E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              Certifications & Verified Learning
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
              Professional learning milestones and industry-oriented simulations recorded in my professional profile.
            </p>
          </div>
        </RevealOnScroll>

        {/* Certifications Grid with Staggered Entrance */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <RevealOnScroll
              key={index}
              direction="up"
              staggerIndex={index % 3}
            >
              <div className="h-full bg-white rounded-2xl p-6 border border-[#F2DDD3] hover:border-[#FFA587] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFF0EB] to-[#FFE2D6] border border-[#FFD0BE] flex items-center justify-center text-[#E66840] mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#2A1B14] leading-snug">
                    {cert.title}
                  </h3>
                  {cert.subtitle && (
                    <p className="text-xs text-[#8C5542] font-medium mt-1">{cert.subtitle}</p>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-[#F7EBE5] flex items-center justify-between text-xs text-[#7A6358]">
                  <span className="flex items-center gap-1 text-[#488B49] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile Record
                  </span>
                  <span className="text-[#967C72]">Professional</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
