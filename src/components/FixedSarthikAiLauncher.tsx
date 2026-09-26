import { Sparkles, X } from 'lucide-react';

interface FixedSarthikAiLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FixedSarthikAiLauncher({ isOpen, onToggle }: FixedSarthikAiLauncherProps) {
  return (
    <aside aria-label="Sarthik AI Assistant Launcher">
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? 'Close Sarthik AI assistant' : 'Open Sarthik AI assistant'}
        aria-expanded={isOpen}
        className="fixed right-4 bottom-[calc(80px+env(safe-area-inset-bottom,0px))] sm:right-7 sm:bottom-7 z-40 inline-flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#3D251C] border border-[#FFCBB8] hover:border-[#FF9E7D] shadow-[0_4px_16px_rgba(230,104,64,0.18)] hover:shadow-[0_8px_24px_rgba(230,104,64,0.26)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF8A65] animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] text-white flex items-center justify-center shrink-0 shadow-2xs">
          {isOpen ? <X className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-sm font-extrabold text-[#261A14]">
            {isOpen ? 'Close AI' : 'Ask Sarthik AI'}
          </span>
          {!isOpen && (
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
              title="AI Assistant Online"
              aria-label="Online"
            />
          )}
        </div>
      </button>
    </aside>
  );
}
