import React, { useState, useRef, useEffect } from 'react';
import { Camera, Sparkles } from 'lucide-react';

export default function ProfilePortrait() {
  const [photoSrc, setPhotoSrc] = useState<string>('/image.png');
  const [triedFallback, setTriedFallback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize from localStorage if the user previously dropped/selected a custom file
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('sarthik_profile_photo');
      if (savedPhoto) {
        setPhotoSrc(savedPhoto);
      }
    } catch {
      // Ignore localStorage access issues
    }
  }, []);

  const handleImageError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
      setPhotoSrc('/profile.png');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoSrc(result);
          try {
            localStorage.setItem('sarthik_profile_photo', result);
          } catch {
            // Storage limit reached or private mode
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[420px] mx-auto select-none py-4 px-2">
      {/* Hidden file input for seamless photo testing/customization if desired */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload profile photo"
      />

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
      {/* Top-Right Decorative Alignment Crosshair */}
      <div
        className="absolute -top-1 right-4 flex items-center gap-1 pointer-events-none z-10 opacity-75 transition-transform duration-500 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        <span className="w-4 h-[1px] bg-[#FF8A65]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E66840]" />
      </div>

      {/* Left-Edge Decorative Vertical Line & Dots */}
      <div
        className="absolute top-1/2 -left-2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10 opacity-70 transition-transform duration-500 ease-out group-hover:-translate-x-1"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E7D]" />
        <span className="h-6 w-[1.5px] bg-gradient-to-b from-[#FF9E7D] to-transparent" />
        <span className="w-1 h-1 rounded-full bg-[#FFA07A]" />
      </div>

      {/* 4. Subtle Floating Technology Elements (Gentle Parallax on hover) */}
      {/* "AI" chip - Top Left */}
      <div
        className="absolute -top-2 left-2 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#FFD0BE] text-[11px] font-extrabold text-[#8C432A] shadow-xs transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:-translate-x-1"
        aria-hidden="true"
      >
        <span className="flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#E66840]" /> AI
        </span>
      </div>

      {/* "</>" Code chip - Top Right */}
      <div
        className="absolute -top-1.5 -right-1 z-20 px-2.5 py-1 rounded-lg bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] text-white text-[11px] font-mono font-bold shadow-xs transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:translate-x-1"
        aria-hidden="true"
      >
        &lt;/&gt;
      </div>

      {/* "Python" chip - Right Side */}
      <div
        className="absolute top-1/3 -right-4 sm:-right-5 z-20 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#FFC8B8] text-[10px] font-bold text-[#593E32] shadow-xs transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        Python
      </div>

      {/* "C++" chip - Left Side */}
      <div
        className="absolute bottom-1/3 -left-4 sm:-left-5 z-20 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#FFC8B8] text-[10px] font-bold text-[#593E32] shadow-xs transition-transform duration-500 ease-out group-hover:-translate-x-1.5 group-hover:translate-y-0.5"
        aria-hidden="true"
      >
        C++
      </div>

      {/* "ML" chip - Bottom Right */}
      <div
        className="absolute bottom-14 -right-2 z-20 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#FFD0BE] text-[11px] font-extrabold text-[#8C432A] shadow-xs transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:translate-y-1"
        aria-hidden="true"
      >
        ML
      </div>

      {/* 5. Subtle Cream Glass-Style Backing Card */}
      <div className="relative rounded-[32px] p-2 sm:p-2.5 bg-white/65 backdrop-blur-md border border-[#F3DFD5] shadow-[0_20px_45px_-12px_rgba(230,104,64,0.16)] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_60px_-15px_rgba(230,104,64,0.28)] group-hover:border-[#FFA587]">
        {/* Asymmetrical creative peach corner bracket - top right */}
        <div
          className="absolute -top-1.5 -right-1.5 w-7 h-7 border-t-2 border-r-2 border-[#FF8A65] rounded-tr-xl pointer-events-none z-10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />

        {/* Asymmetrical creative peach corner bracket - bottom left */}
        <div
          className="absolute -bottom-1.5 -left-1.5 w-7 h-7 border-b-2 border-l-2 border-[#FF8A65] rounded-bl-xl pointer-events-none z-10 transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
          aria-hidden="true"
        />

        {/* Elegant Layered Peach Border around the photo */}
        <div className="relative p-2 rounded-[26px] bg-gradient-to-b from-[#FFF9F6] via-[#FFEDE6] to-[#FFE2D6] border border-[#FFC8B8]">
          {/* Inner hairline border bezel */}
          <div className="relative rounded-[19px] overflow-hidden bg-[#FAF3EC] border border-[#FFBCA6]/70 shadow-inner">
            {/* Exact Photograph - Aspect Ratio 3:4.1 preserves head, arms, posture, shirt, and background */}
            {/* The photo remains 100% STABLE on hover (transform-none scale-100) */}
            <div className="relative w-full aspect-[3/4.1] overflow-hidden flex items-center justify-center bg-[#FAF3EC]">
              <img
                src={photoSrc}
                alt="Sarthik Adepu - CSE (AI & ML) Student & Aspiring Software Developer"
                className="w-full h-full object-cover object-top select-none transform-none"
                style={{
                  filter: 'none',
                  WebkitFilter: 'none',
                }}
                onError={handleImageError}
                loading="eager"
                decoding="async"
              />

              {/* Optional quick photo replacement button on hover */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Click to select another photo from your device"
                aria-label="Upload photo"
                className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-white/90 hover:bg-white text-[#523A30] hover:text-[#E66840] shadow-md border border-[#FFD0BE] opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
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
