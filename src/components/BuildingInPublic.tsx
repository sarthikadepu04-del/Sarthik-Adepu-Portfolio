import { Github, ExternalLink, Code2, FolderGit2, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface RepoItem {
  name: string;
  repoName: string;
  githubUrl: string;
  description: string;
  primaryTech: string;
  tag: string;
}

const REPOSITORIES: RepoItem[] = [
  {
    name: 'Cravingo-Kitchen',
    repoName: 'sarthikadepu04-del/Cravingo-Kitchen',
    githubUrl: 'https://github.com/sarthikadepu04-del/Cravingo-Kitchen',
    description: 'Food ordering & culinary interface concept featuring a warm homestyle kitchen theme.',
    primaryTech: 'React • TypeScript • Tailwind',
    tag: 'Web Interface',
  },
  {
    name: 'Hangman Game',
    repoName: 'sarthikadepu04-del/hangman-game',
    githubUrl: 'https://github.com/sarthikadepu04-del/hangman-game',
    description: 'Interactive word-guessing game with dynamic difficulty, hints, streaks, and Web Audio.',
    primaryTech: 'React • TypeScript • Web Audio API',
    tag: 'Web Application',
  },
  {
    name: 'Stock Portfolio Tracker',
    repoName: 'sarthikadepu04-del/stock-portfolio-tracker',
    githubUrl: 'https://github.com/sarthikadepu04-del/stock-portfolio-tracker',
    description: 'Portfolio tracking tool designed to monitor holdings, PnL calculations, watchlists, and charts.',
    primaryTech: 'React • TypeScript • Charts',
    tag: 'Finance Tool',
  },
  {
    name: 'StudyMate AI',
    repoName: 'sarthikadepu04-del/studymate-ai',
    githubUrl: 'https://github.com/sarthikadepu04-del/studymate-ai',
    description: 'AI educational chatbot powered by Gemini AI for student guidance, explanations, and practice questions.',
    primaryTech: 'Gemini AI • React • TypeScript',
    tag: 'AI Application',
  },
];

export default function BuildingInPublic() {
  return (
    <section id="building-in-public" className="py-20 sm:py-24 bg-[#FFF9F6] border-y border-[#F3E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EBDCD3]">
          <RevealOnScroll direction="up">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
                <span className="w-6 h-[2px] bg-[#FF8A65]" />
                <span>Open Source Repositories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
                Building in Public
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
                Explore the projects and experiments I'm building.
              </p>
            </div>
          </RevealOnScroll>

          {/* Prominent Explore GitHub Button */}
          <RevealOnScroll direction="up" delay={150}>
            <a
              href="https://github.com/sarthikadepu04-del"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#241F1C] hover:bg-[#3D251C] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
            >
              <Github className="w-4 h-4 text-[#FF8A65]" />
              <span>Explore My GitHub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </RevealOnScroll>
        </div>

        {/* 4 Repository Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {REPOSITORIES.map((repo, index) => (
            <RevealOnScroll
              key={repo.name}
              direction="up"
              staggerIndex={index}
              className="h-full"
            >
              <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-[#F2DDD3] hover:border-[#FFA587] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-[#E66840]" />
                      <span className="text-xs font-mono text-[#8C5542]">{repo.repoName}</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF0EB] text-[#8C432A] border border-[#FFD0BE]">
                      {repo.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#261A14] group-hover:text-[#E66840] transition-colors">
                    {repo.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#59443B] leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F7EBE5] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#7A6358]">
                    <Code2 className="w-3.5 h-3.5 text-[#FF8A65]" />
                    <span className="font-medium">{repo.primaryTech}</span>
                  </div>

                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E66840] hover:text-[#D4552E] transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
