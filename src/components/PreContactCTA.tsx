import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function PreContactCTA() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
      // Optionally focus the message input after scroll
      setTimeout(() => {
        const input = document.getElementById('name') || document.querySelector('input[name="name"]');
        if (input instanceof HTMLElement) {
          input.focus();
        }
      }, 600);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#FFF5F0] via-[#FFEDE6] to-[#FFE2D6] border-2 border-[#FFCBB8] shadow-[0_20px_50px_rgba(255,142,105,0.14)] overflow-hidden text-center flex flex-col items-center">
            {/* Subtle animated background aura */}
            <div
              className="absolute -top-24 -left-24 w-72 h-72 bg-[#FFA587]/30 rounded-full blur-3xl -z-0 pointer-events-none animate-pulse"
              style={{ animationDuration: '6s' }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FFD2C4]/40 rounded-full blur-3xl -z-0 pointer-events-none animate-pulse"
              style={{ animationDuration: '8s' }}
              aria-hidden="true"
            />

            {/* Sparkle badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#FFC8B8] text-xs font-semibold text-[#8C432A] mb-4 shadow-2xs z-10">
              <Sparkles className="w-3.5 h-3.5 text-[#E66840]" />
              <span>Let's Collaborate</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#261A14] tracking-tight max-w-2xl z-10 leading-[1.15]">
              Have an idea? Let's build it.
            </h2>

            {/* Supporting Text */}
            <p className="mt-4 text-base sm:text-lg text-[#5C483F] max-w-xl z-10 leading-relaxed">
              I'm always interested in learning, building, and exploring new opportunities.
            </p>

            {/* Primary Action Button */}
            <div className="mt-8 z-10">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF8A65] to-[#E66840] hover:from-[#E66840] hover:to-[#D4552E] text-white font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(230,104,64,0.28)] hover:shadow-[0_8px_25px_rgba(230,104,64,0.38)] hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
