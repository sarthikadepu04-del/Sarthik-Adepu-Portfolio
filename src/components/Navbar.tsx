import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Github, Linkedin, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Education', href: '#education' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }: NavbarProps) {
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
          className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#FF8A65] rounded-lg p-1"
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

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'text-[#E66840]'
                    : 'text-[#5C4A42] hover:text-[#261A14] hover:bg-[#F3E7E0]/50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#FF8A65] rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Action Icons & Resume CTA */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          {/* Socials */}
          <div className="flex items-center gap-1 border-r border-[#E8D7CF] pr-2.5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-1.5 rounded-lg text-[#6E5950] hover:text-[#1F140E] hover:bg-[#F3E7E0] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-1.5 rounded-lg text-[#6E5950] hover:text-[#0A66C2] hover:bg-[#F3E7E0] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="p-1.5 rounded-lg text-[#6E5950] hover:text-[#E1306C] hover:bg-[#F3E7E0] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Resume Button */}
          <button
            onClick={onOpenResume}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF8A65] hover:bg-[#E66840] text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            type="button"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FF8A65] text-white text-xs font-semibold cursor-pointer"
          >
            <FileText className="w-3 h-3" />
            <span>Resume</span>
          </button>

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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EBDCD3] px-5 py-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'bg-[#FFE8DE] text-[#C84F2A] font-semibold'
                    : 'text-[#544139] hover:bg-[#F3E7E0]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#EBDCD3] flex items-center justify-between">
            <span className="text-xs text-[#7F6B62] font-medium">Connect with me:</span>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#544139] hover:text-[#C84F2A]"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#544139] hover:text-[#C84F2A]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[#544139] hover:text-[#C84F2A]"
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
