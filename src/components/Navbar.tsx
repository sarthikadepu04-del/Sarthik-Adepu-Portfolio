import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Send,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Code2 },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Projects', href: '#projects', icon: FolderGit2 },
  { label: 'Contact', href: '#contact', icon: Send },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          // Determine active section
          const sectionIds = NAV_ITEMS.map((item) => item.href.substring(1));
          const scrollPosition = window.scrollY + 200;

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const section = document.getElementById(sectionIds[i]);
            if (section && section.offsetTop <= scrollPosition) {
              const currentId = sectionIds[i];
              setActiveSection((prev) => (prev !== currentId ? currentId : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-[#FAF7F2]/90 backdrop-blur-md shadow-xs border-b border-[#F0E2DA]'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[#FF8A65] rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] flex items-center justify-center text-white font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
            SA
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-[#261A14] group-hover:text-[#E66840] transition-colors">
              Sarthik Adepu
            </span>
            <span className="text-[10px] text-[#806B62] font-medium hidden sm:inline leading-none">
              CSE (AI & ML)
            </span>
          </div>
        </a>

        {/* Desktop Nav Items with Enlarged Icons (22px visual weight with scale transform & vertical centering) */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative inline-flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#E66840] bg-[#FFF2EB]'
                    : 'text-[#5C4A42] hover:text-[#261A14] hover:bg-[#F3E7E0]/60'
                }`}
              >
                <span className="inline-flex items-center justify-center shrink-0">
                  <Icon
                    className={`w-[22px] h-[22px] text-[22px] scale-105 shrink-0 transform-gpu transition-transform duration-200 group-hover:scale-115 ${
                      isActive ? 'text-[#E66840]' : 'text-[#8C6D60] group-hover:text-[#E66840]'
                    }`}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </span>
                <span className="inline-flex items-center leading-none">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#FF8A65] rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Action Icons (Socials only — Resume completely removed) */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-xl text-[#6E5950] hover:text-[#1F140E] hover:bg-[#F3E7E0] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-xl text-[#6E5950] hover:text-[#0A66C2] hover:bg-[#F3E7E0] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
            className="p-2 rounded-xl text-[#6E5950] hover:text-[#E1306C] hover:bg-[#F3E7E0] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle (No Resume button) */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="p-2 rounded-lg text-[#3B2922] bg-[#F5EAE4] hover:bg-[#EEDFD7] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu with Enlarged Icons (22px visual weight with scale transform & vertical centering) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EBDCD3] px-5 py-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#FFE8DE] text-[#C84F2A]'
                      : 'text-[#544139] hover:bg-[#F3E7E0]'
                  }`}
                >
                  <span className="inline-flex items-center justify-center shrink-0">
                    <Icon
                      className={`w-[22px] h-[22px] text-[22px] scale-105 shrink-0 transform-gpu ${
                        isActive ? 'text-[#C84F2A]' : 'text-[#8C6D60]'
                      }`}
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="inline-flex items-center leading-none">{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#EBDCD3] flex items-center justify-between">
            <span className="text-xs text-[#7F6B62] font-medium">Connect with me:</span>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#544139] hover:text-[#C84F2A] p-1"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#544139] hover:text-[#C84F2A] p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[#544139] hover:text-[#C84F2A] p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
