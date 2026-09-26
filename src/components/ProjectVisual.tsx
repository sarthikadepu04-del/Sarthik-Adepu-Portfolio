import { useState } from 'react';
import { Play, TrendingUp, Bot, Utensils, Sparkles, Volume2, ArrowUpRight, Flame, Check } from 'lucide-react';

interface ProjectVisualProps {
  projectId: string;
  name: string;
}

export default function ProjectVisual({ projectId }: ProjectVisualProps) {
  // Interactive micro-states for each preview
  const [hangmanLetter, setHangmanLetter] = useState<string | null>('E');
  const [selectedStock, setSelectedStock] = useState('NVDA');
  const [copiedCode, setCopiedCode] = useState(false);
  const [cartCount, setCartCount] = useState(1);

  if (projectId === 'hangman-game') {
    return (
      <div className="relative w-full h-52 sm:h-64 bg-gradient-to-br from-[#FFF5F1] to-[#FFE8DF] rounded-xl overflow-hidden border border-[#F5D5C8] flex flex-col justify-between p-4 select-none">
        {/* Top game status bar */}
        <div className="flex items-center justify-between text-xs font-medium text-[#6E4F42]">
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#F3CDBE] shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-[#E66840]" />
            <span className="font-semibold text-[#8C432A]">Streak: 5</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#8C432A] font-semibold bg-white/70 px-2 py-0.5 rounded border border-[#F3CDBE]">
              Category: Tech & AI
            </span>
            <div className="w-6 h-6 rounded-full bg-white/80 border border-[#F3CDBE] flex items-center justify-center text-[#E66840]">
              <Volume2 className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Word guessing display */}
        <div className="text-center my-auto">
          <div className="text-[10px] uppercase tracking-widest text-[#946959] font-medium mb-2">
            Guess the Algorithm
          </div>
          <div className="flex justify-center items-center gap-1.5 sm:gap-2">
            {['N', 'E', 'U', 'R', 'A', 'L'].map((char, i) => (
              <div
                key={i}
                className="w-7 h-9 sm:w-9 sm:h-11 bg-white rounded-lg border-2 border-[#FFA07A] flex items-center justify-center text-sm sm:text-base font-bold text-[#3A2218] shadow-xs"
              >
                {i < 4 || hangmanLetter === char ? char : '_'}
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-[#A06C59]">
            Hint: Models inspired by biological brains
          </div>
        </div>

        {/* Interactive mini keyboard strip */}
        <div className="flex items-center justify-center gap-1 overflow-x-auto pt-2 border-t border-[#F5D5C8]/80">
          {['A', 'C', 'E', 'L', 'N', 'R', 'T'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setHangmanLetter(key)}
              className={`w-6 h-7 text-[11px] font-semibold rounded transition-all cursor-pointer ${
                hangmanLetter === key
                  ? 'bg-[#E66840] text-white shadow-xs scale-105'
                  : 'bg-white/90 text-[#543D34] hover:bg-[#FFE3D6]'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (projectId === 'stock-portfolio-tracker') {
    return (
      <div className="relative w-full h-52 sm:h-64 bg-[#1F1D1B] rounded-xl overflow-hidden border border-[#3D3530] flex flex-col justify-between p-4 select-none text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#A89890] font-medium">
              Portfolio Valuation
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#FAF7F2]">
                $24,680.40
              </span>
              <span className="text-xs font-semibold text-[#48BB78] flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +14.8%
              </span>
            </div>
          </div>
          <div className="flex gap-1 bg-[#2C2724] p-1 rounded-lg border border-[#443C37]">
            {['NVDA', 'AAPL', 'MSFT'].map((ticker) => (
              <button
                key={ticker}
                type="button"
                onClick={() => setSelectedStock(ticker)}
                className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
                  selectedStock === ticker ? 'bg-[#FF9E7D] text-[#241F1C]' : 'text-[#B8A8A0] hover:text-white'
                }`}
              >
                {ticker}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Sparkline Graph */}
        <div className="my-auto py-2">
          <svg className="w-full h-16 sm:h-20 overflow-visible" viewBox="0 0 300 80">
            <defs>
              <linearGradient id="peachGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF9E7D" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF9E7D" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,65 Q 40,55 75,40 T 150,45 T 225,25 T 300,10 L 300,80 L 0,80 Z"
              fill="url(#peachGrad)"
            />
            <path
              d="M 0,65 Q 40,55 75,40 T 150,45 T 225,25 T 300,10"
              fill="none"
              stroke="#FF9E7D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="300" cy="10" r="4" fill="#FF8A65" stroke="#FFF" strokeWidth="2" />
          </svg>
        </div>

        {/* Quick Holdings summary */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#362F2B] text-center text-[10px]">
          <div>
            <span className="text-[#968882] block">Today's P&L</span>
            <span className="font-semibold text-[#48BB78]">+$412.30</span>
          </div>
          <div>
            <span className="text-[#968882] block">Selected</span>
            <span className="font-semibold text-[#FAF7F2]">{selectedStock}</span>
          </div>
          <div>
            <span className="text-[#968882] block">Active Watchlist</span>
            <span className="font-semibold text-[#FF9E7D]">12 Stocks</span>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'studymate-ai') {
    return (
      <div className="relative w-full h-52 sm:h-64 bg-gradient-to-br from-[#FFF8F5] via-[#FFF3EE] to-[#FFEFE8] rounded-xl overflow-hidden border border-[#F5DDD3] flex flex-col justify-between p-4 select-none">
        {/* Gemini header badge */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F0D0C4]">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FF8A65] to-[#FFA726] flex items-center justify-center text-white">
              <Bot className="w-3 h-3" />
            </div>
            <span className="text-xs font-bold text-[#3B2219]">StudyMate AI Assistant</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8C432A] bg-white px-2 py-0.5 rounded-full border border-[#F3CDBE]">
            <Sparkles className="w-3 h-3 text-[#E66840]" /> Powered by Gemini
          </span>
        </div>

        {/* Message bubble preview */}
        <div className="space-y-2 my-auto">
          <div className="bg-[#FAF3EF] p-2 rounded-lg border border-[#F0DCD3] text-[11px] text-[#47342C]">
            <span className="font-semibold text-[#8C432A]">User: </span>
            Explain QuickSort time complexity simply.
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#F3C5B5] shadow-2xs text-[11px] text-[#2E201B]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-[#8C432A]">StudyMate:</span>
              <button
                type="button"
                onClick={() => {
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="text-[9px] text-[#7A6055] hover:text-[#2E201B] flex items-center gap-0.5 cursor-pointer"
              >
                {copiedCode ? <Check className="w-2.5 h-2.5 text-green-600" /> : null}
                {copiedCode ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[10px] leading-tight text-[#4A3932]">
              Average time is <span className="font-mono font-semibold text-[#8C432A]">O(n log n)</span>,
              dividing the array around a chosen pivot!
            </p>
          </div>
        </div>

        {/* Prompt chip recommendations */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-[#F0D0C4] text-[10px] text-[#6E4F42]">
          <span className="font-medium text-[#8C432A]">Try:</span>
          <span className="bg-white px-2 py-0.5 rounded border border-[#F0D0C4] truncate">
            "Generate practice quiz"
          </span>
          <span className="bg-white px-2 py-0.5 rounded border border-[#F0D0C4] hidden sm:inline truncate">
            "Summarize lecture notes"
          </span>
        </div>
      </div>
    );
  }

  // cravingo-kitchen
  return (
    <div className="relative w-full h-52 sm:h-64 bg-gradient-to-br from-[#FFFBF8] to-[#FFF1EA] rounded-xl overflow-hidden border border-[#F5DDD3] flex flex-col justify-between p-4 select-none">
      {/* Culinary Banner Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F2D7CB]">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-[#FF9E7D] text-[#341B12] flex items-center justify-center">
            <Utensils className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-[#3B2219]">Cravingo Homestyle Kitchen</span>
        </div>
        <span className="text-[10px] font-semibold text-[#8C432A] bg-white px-2 py-0.5 rounded border border-[#F3CDBE]">
          🛵 Delivery & Takeaway
        </span>
      </div>

      {/* Featured Dish Card */}
      <div className="bg-white rounded-lg p-2.5 border border-[#F3CFBF] shadow-xs my-auto flex items-center gap-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-[#FFE7DD] to-[#FFD1BF] border border-[#F5BCA6] flex items-center justify-center flex-shrink-0 text-2xl">
          🍲
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#2A1E19] truncate">Artisanal Truffle Pasta</h4>
            <span className="text-xs font-extrabold text-[#8C432A]">$16.50</span>
          </div>
          <p className="text-[10px] text-[#735D55] line-clamp-1 mt-0.5">
            Handcrafted pasta with wild mushrooms, shaved parmesan & thyme
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <button
              type="button"
              onClick={() => setCartCount((prev) => prev + 1)}
              className="px-2 py-0.5 rounded bg-[#FF9E7D] text-[#2E1810] text-[10px] font-semibold hover:bg-[#FF8A65] transition-colors cursor-pointer"
            >
              Add to Cart ({cartCount})
            </button>
            <span className="text-[9px] text-[#91756B]">Fresh daily prep</span>
          </div>
        </div>
      </div>

      {/* Menu Categories strip */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F2D7CB] text-[10px] text-[#6E4F42]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#8C432A]">Menu:</span>
          <span>Homestyle Mains</span>
          <span>·</span>
          <span>Craft Drinks</span>
          <span>·</span>
          <span>Desserts</span>
        </div>
        <span className="font-semibold text-[#8C432A]">★ 4.9 Kitchen</span>
      </div>
    </div>
  );
}
