import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241B16] text-[#FAF7F2] py-12 sm:py-16 border-t-4 border-[#FF8A65]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#3D2E27]">
          {/* Brand & Title */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] flex items-center justify-center text-white font-bold text-sm">
                SA
              </div>
              <span className="text-xl font-bold tracking-tight text-[#FAF7F2]">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[#C8B6AD]">
              CSE (AI & ML) Student • Aspiring Software Developer
            </p>
          </div>

          {/* Socials & Email Link */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-[#362721] hover:bg-[#FF8A65] hover:text-[#241B16] text-[#E0D2CB] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-[#362721] hover:bg-[#FF8A65] hover:text-[#241B16] text-[#E0D2CB] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="p-2.5 rounded-xl bg-[#362721] hover:bg-[#FF8A65] hover:text-[#241B16] text-[#E0D2CB] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email Sarthik Adepu"
              className="p-2.5 rounded-xl bg-[#362721] hover:bg-[#FF8A65] hover:text-[#241B16] text-[#E0D2CB] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#362721] hover:bg-[#47332B] text-xs font-semibold text-[#FFB6A0] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer Subtext & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8948B]">
          <p className="italic">Designed & built with curiosity, code, and a little peach.</p>
          <p>© 2026 Sarthik Adepu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
