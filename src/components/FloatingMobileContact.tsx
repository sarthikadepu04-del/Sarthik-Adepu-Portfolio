import { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingMobileContact() {
  const [isContactInView, setIsContactInView] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  useEffect(() => {
    // 1. Observe when user scrolls down past the hero slightly (e.g. 150px)
    const handleScroll = () => {
      setHasScrolledPastHero(window.scrollY > 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Hide button when Contact section is already in view so it doesn't duplicate
    const contactElem = document.getElementById('contact');
    if (!contactElem || !('IntersectionObserver' in window)) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(contactElem);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hidden on tablets & desktops (sm:hidden ensures visibility ONLY on small mobile screens < 640px)
  const isVisible = hasScrolledPastHero && !isContactInView;

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 sm:hidden transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label="Scroll to contact section - Let's Talk"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FF9E7D] via-[#FF8A65] to-[#E66840] text-[#241F1C] font-extrabold text-xs tracking-tight shadow-[0_6px_20px_rgba(230,104,64,0.38)] border border-[#FFCBB8] active:scale-95 transition-transform duration-200 cursor-pointer"
      >
        <span className="w-6 h-6 rounded-full bg-white/35 flex items-center justify-center shrink-0">
          <MessageSquare className="w-3.5 h-3.5 text-[#241F1C]" />
        </span>
        <span className="text-[#241F1C]">Let's Talk</span>
      </button>
    </div>
  );
}
