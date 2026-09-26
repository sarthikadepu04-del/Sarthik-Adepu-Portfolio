import { Sparkles } from 'lucide-react';
import profilePhoto from '../sarthik-profile.jpg.png';

export default function ProfilePortrait() {
  return (
    <div className="relative group w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px] mx-auto select-none py-4 px-2">
      {/* 1. Soft Peach Gradient Halo / Glow behind the composition */}
      <div
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#FF9E7D]/35 via-[#FFD3C4]/40 to-[#FF7A50]/25 rounded-[44px] blur-2xl -z-20 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-95"
        aria-hidden="true"
      />

      {/* 2. Thin Curved Peach Orbit partially surrounding the frame */}
      <svg
        className="absolute -inset-5 sm:-inset-7 w-[calc(100%+40px)] sm:w-[calc(100%+56px)] h-[calc(100%+40px)] sm:h-[calc(100%+56px)] pointer-events-none -z-10 transition-transform duration-700 ease-out group-hover:rotate-1"
        viewBox="0 0 460 580"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="peachOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8A65" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#FFA07A" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#FF9E7D" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E66840" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer elliptical orbit arc */}
        <path
          d="M 70,70 C 200,-25 390,20 430,170 C 470,320 410,490 270,545 C 130,595 30,470 25,370"
          stroke="url(#peachOrbitGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Orbit planetary node accents */}
        <circle cx="420" cy="140" r="4.5" fill="#FF8A65" className="animate-pulse" />
        <circle cx="420" cy="140" r="8" stroke="#FF8A65" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="50" cy="420" r="3.5" fill="#FFA07A" />
      </svg>

      {/* 3. Minimal Peach Decorative Dots, Lines & Crosshairs */}
      <div
        className="absolute -top-1 right-4 flex items-center gap-1 pointer-events-none z-10 opacity-75 transition-transform duration-500 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        <span className="w-4 h-[1px] bg-[#FF8A65]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E66840]" />
      </div>

      <div
        className="absolute top-1/2 -left-2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10 opacity-70 transition-transform duration-500 ease-out group-hover:-translate-x-1"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A65]" />
        <span className="h-8 w-[1px] bg-gradient-to-b from-[#FF8A65] to-transparent" />
        <span className="w-1 h-1 rounded-full bg-[#E66840]" />
      </div>

      {/* 4. Subtle Floating Technology Elements */}
      <div
        className="absolute -top-2 left-2 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#FFD0BE] text-[11px] font-extrabold text-[#8C432A] shadow-xs transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:-translate-x-1"
        aria-hidden="true"
      >
        <span className="flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#E66840]" /> AI
        </span>
      </div>

      <div
        className="absolute -top-1.5 -right-1 z-20 px-2.5 py-1 rounded-lg bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] text-white text-[11px] font-mono font-bold shadow-xs transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:translate-x-1"
        aria-hidden="true"
      >
        &lt;/&gt;
      </div>

      <div
        className="absolute top-1/3 -right-4 sm:-right-5 z-20 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#FFC8B8] text-[10px] font-bold text-[#593E32] shadow-xs transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        Python
      </div>

      <div
        className="absolute bottom-1/3 -left-4 sm:-left-5 z-20 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#FFC8B8] text-[10px] font-bold text-[#593E32] shadow-xs transition-transform duration-500 ease-out group-hover:-translate-x-1.5 group-hover:translate-y-0.5"
        aria-hidden="true"
      >
        C++
      </div>

      {/* 5. Main Hero Profile Frame: Layered borders, cream backing card & static photo */}
      <div className="relative">
        <div
          className="absolute -inset-2 rounded-[32px] bg-[#FFF5EE] border border-[#F2DFD7] shadow-sm -rotate-1 transition-transform duration-500 ease-out group-hover:rotate-0"
          aria-hidden="true"
        />

        <div className="relative p-2 rounded-[26px] bg-gradient-to-b from-[#FFF9F6] via-[#FFEDE6] to-[#FFE2D6] border border-[#FFC8B8]">
          <div className="relative rounded-[19px] overflow-hidden bg-[#FAF3EC] border border-[#FFBCA6]/70 shadow-inner">
            <div className="relative w-full aspect-[3/4.1] overflow-hidden flex items-center justify-center bg-[#FAF3EC]">
              {/* Exact photograph imported from src/sarthik-profile.jpg.png */}
              <img
                src={profilePhoto}
                alt="Sarthik Adepu"
                className="w-full h-full object-cover object-top select-none"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Tasteful "Open to Opportunities" Status Badge cleanly below the frame */}
      <div className="mt-4 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#FFC8B8] shadow-xs text-xs text-[#523D34] transition-transform duration-500 group-hover:scale-[1.02]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A65] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E66840]" />
          </span>
          <span className="font-semibold text-[#3D251C]">
            Open to Opportunities
          </span>
          <span className="text-[#C8A89C]">·</span>
          <span className="text-[11px] text-[#7A6358] font-medium">
            CSE (AI & ML)
          </span>
        </div>
      </div>
    </div>
  );
}
