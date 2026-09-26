import { BookOpen, Code, Compass, Lightbulb, MapPin, Building2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import RevealOnScroll from './RevealOnScroll';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#FFF9F6] border-y border-[#F3E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>About Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              Passionate about intelligence, driven by clean code.
            </h2>
          </div>
        </RevealOnScroll>

        {/* Main Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Bio Prose (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-[#4A3930]">
            <RevealOnScroll direction="up" delay={100}>
              <p className="bg-white/80 p-6 sm:p-7 rounded-2xl border border-[#F2DDD3] shadow-xs">
                I’m Sarthik Adepu, a B.Tech CSE (AI & ML) student at{' '}
                <strong className="text-[#261A14] font-semibold">Marwadi University</strong>. I’m
                passionate about programming, Artificial Intelligence, Machine Learning, software
                development, and problem-solving.
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={200}>
              <p className="bg-white/80 p-6 sm:p-7 rounded-2xl border border-[#F2DDD3] shadow-xs">
                I enjoy learning by building practical projects and experimenting with modern
                technologies. My goal is to gain real-world experience, contribute to meaningful
                projects, continuously improve my technical skills, and grow as a software developer.
              </p>
            </RevealOnScroll>

            {/* University & Location Badges */}
            <RevealOnScroll direction="up" delay={250}>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#6B554B]">
                <div className="flex items-center gap-1.5 bg-[#FFF0E8] px-3 py-1.5 rounded-lg border border-[#F5D5C6]">
                  <Building2 className="w-3.5 h-3.5 text-[#E66840]" />
                  <span className="font-semibold text-[#3D251C]">Marwadi University</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#FFF0E8] px-3 py-1.5 rounded-lg border border-[#F5D5C6]">
                  <MapPin className="w-3.5 h-3.5 text-[#E66840]" />
                  <span className="font-semibold text-[#3D251C]">Rajkot, Gujarat, India</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: 4 Portfolio Highlights Cards (5 cols) with Staggered Entrance */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {PERSONAL_INFO.highlights.map((item, index) => {
              const icons = [BookOpen, Code, Compass, Lightbulb];
              const Icon = icons[index % icons.length];
              return (
                <RevealOnScroll
                  key={item.label}
                  direction="up"
                  staggerIndex={index + 1}
                >
                  <div className="h-full p-5 rounded-2xl bg-white border border-[#F5D7CA] hover:border-[#FF9E7D] transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF1EB] border border-[#FFD0BE] flex items-center justify-center text-[#E66840] mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#291A14] tracking-tight">
                        {item.value}
                      </div>
                      <div className="text-xs font-semibold text-[#8C5542] mt-1">
                        {item.label}
                      </div>
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
