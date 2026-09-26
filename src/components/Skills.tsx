import { useState } from 'react';
import {
  Code2,
  Globe,
  Brain,
  Server,
  Wrench,
  Database,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import RevealOnScroll from './RevealOnScroll';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, typeof Code2> = {
    Programming: Code2,
    'Web Development': Globe,
    'AI / ML': Brain,
    'Backend / APIs': Server,
    'Tools & Platforms': Wrench,
    'Database / Data': Database,
    'Core Engineering': Cpu,
  };

  const filteredCategories =
    selectedCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.title === selectedCategory);

  return (
    <section id="skills" className="py-20 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Technical Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              Technologies & Tools I Work With
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
              A hands-on toolkit developed through academic study, real project development, and
              internship experience. Categorized by domain with practical focus areas.
            </p>
          </div>
        </RevealOnScroll>

        {/* Category Filter Controls */}
        <RevealOnScroll direction="up" delay={150}>
          <div className="mt-8 flex flex-wrap gap-2 pb-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#E66840] text-white shadow-xs'
                  : 'bg-white text-[#5C483F] border border-[#ECD9CF] hover:bg-[#FFF0E8]'
              }`}
            >
              All Disciplines
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                type="button"
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.title
                    ? 'bg-[#E66840] text-white shadow-xs'
                    : 'bg-white text-[#5C483F] border border-[#ECD9CF] hover:bg-[#FFF0E8]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Categorized Skills Grid with Staggered Entrance */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => {
            const Icon = categoryIcons[category.title] || Code2;
            return (
              <RevealOnScroll
                key={category.title}
                direction="up"
                staggerIndex={index % 6}
              >
                <div className="h-full bg-white rounded-2xl p-6 border border-[#F2DDD3] hover:border-[#FFA587] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#F7EBE5]">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFF0EB] to-[#FFE2D6] border border-[#FFD0BE] flex items-center justify-center text-[#E66840]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#2A1B14]">{category.title}</h3>
                        <p className="text-[11px] text-[#7A6358]">{category.description}</p>
                      </div>
                    </div>

                    {/* Skills List without fake percentages */}
                    <div className="space-y-2.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-2.5 rounded-xl bg-[#FAF5F1] hover:bg-[#FFF1EB] border border-[#F2E5DC] transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#2E1E17] flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8A65]" />
                              {skill.name}
                            </span>
                            {skill.level && (
                              <span className="text-[11px] text-[#8C5542] font-medium">
                                {skill.level}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F7EBE5] flex items-center justify-between text-[11px] text-[#8C6D60]">
                    <span>Applied in projects & coursework</span>
                    <span className="font-semibold text-[#E66840]">Verified Skill</span>
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
