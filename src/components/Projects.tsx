import { useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import { PROJECTS_DATA, type Project } from '../data/portfolioData';
import ProjectVisual from './ProjectVisual';
import RevealOnScroll from './RevealOnScroll';

type ProjectFilter = 'All' | 'AI / ML' | 'Web' | 'Applications';

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All');

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'AI / ML') {
      return (
        project.category === 'AI & ML' ||
        project.id === 'studymate-ai' ||
        project.technologies.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini'))
      );
    }
    if (filter === 'Web') {
      return (
        project.id === 'cravingo-kitchen' ||
        project.id === 'hangman-game' ||
        project.category === 'Web Applications'
      );
    }
    if (filter === 'Applications') {
      return (
        project.id === 'stock-portfolio-tracker' ||
        project.id === 'hangman-game' ||
        project.id === 'studymate-ai' ||
        project.category === 'Tools' ||
        project.category === 'Web Applications'
      );
    }
    return true;
  });

  return (
    <section id="projects" className="py-20 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EBDCD3]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
                <span className="w-6 h-[2px] bg-[#FF8A65]" />
                <span>Portfolio Showcase</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
                Featured Engineering Projects
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
                Live applications engineered with modern frontend frameworks, AI integration,
                clean state management, and real cloud deployment.
              </p>
            </div>

            {/* Interactive Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FFF0E8] rounded-xl border border-[#F2DDD3] self-start md:self-end">
              {(['All', 'AI / ML', 'Web', 'Applications'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    filter === tab
                      ? 'bg-[#E66840] text-white shadow-xs'
                      : 'text-[#664D43] hover:text-[#241B16] hover:bg-white/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 2-Column Desktop Grid / 1-Column Mobile with Smooth Filter Transition */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 transition-all duration-500">
          {filteredProjects.map((project: Project, index: number) => (
            <RevealOnScroll
              key={`${filter}-${project.id}`}
              direction="up"
              staggerIndex={index % 2}
            >
              <article
                id={project.id}
                className="h-full group bg-white rounded-3xl overflow-hidden border-2 border-[#F3DFD5] hover:border-[#FFA587] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Preview Container */}
                  <div className="p-4 sm:p-5 pb-0">
                    <ProjectVisual projectId={project.id} name={project.name} />
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-8">
                    {/* Category and Tagline Kicker */}
                    <div className="flex items-center justify-between text-xs text-[#8C5542] mb-2 font-medium">
                      <span className="flex items-center gap-1.5 font-bold text-[#E66840]">
                        <Sparkles className="w-3.5 h-3.5" />
                        {project.category}
                      </span>
                      <span className="text-[#A38A80] text-[11px]">{project.tag}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#261A14] group-hover:text-[#E66840] transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-[#59443B]">
                      {project.description}
                    </p>

                    {/* Documented Key Features */}
                    <div className="mt-4 pt-3 border-t border-[#F5E6DF]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C5542] mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#FF8A65]" /> Key Capabilities
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#523E35]">
                        {project.features.map((feat, i) => (
                          <li key={i} className="flex items-baseline gap-1.5">
                            <span className="text-[#FF8A65] font-bold">›</span>
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Badges */}
                    <div className="mt-5 pt-3 border-t border-[#F5E6DF]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E8276] block mb-2">
                        Technologies & Libraries
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FFF3EE] text-[#6E4233] border border-[#F5DDD3]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: View Live & View Code */}
                <div className="px-6 sm:px-8 py-4 bg-[#FFF9F6] border-t border-[#F5E6DF] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E66840] hover:bg-[#D4552E] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live</span>
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFF2EC] text-[#3D251B] border border-[#EBD0C5] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-[#E66840]" />
                    <span>View Code</span>
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
