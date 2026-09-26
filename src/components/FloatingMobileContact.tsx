import { useEffect, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function FloatingMobileContact() {
  const [isContactInView, setIsContactInView] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolledPastHero(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const contactElem = document.getElementById('contact');
    if (!contactElem || !('IntersectionObserver' in window)) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(contactElem);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isVisible = hasScrolledPastHero && !isContactInView && !isDismissed;

  return (
    <div
      className={`fixed bottom-[calc(18px+env(safe-area-inset-bottom,0px))] right-4 z-30 sm:hidden transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/95 backdrop-blur-md border border-[#FFCBB8] shadow-[0_4px_16px_rgba(230,104,64,0.22)]">
        {/* Floating Let's Talk CTA */}
        <button
          type="button"
          onClick={scrollToContact}
          aria-label="Let's Talk - Contact Sarthik"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF2EB] text-[#3D251C] hover:text-[#B8401C] font-bold text-xs active:scale-95 transition-transform cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#E66840]" />
          <span>Let's Talk</span>
        </button>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss floating contact button"
          className="p-1 rounded-full text-[#A8948B] hover:text-[#3D251C] transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
