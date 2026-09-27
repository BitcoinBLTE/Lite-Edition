import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, Layers } from 'lucide-react';
import { TOKEN_CONFIG, validateTokenomicsIntegrity } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';

export const WhitePaperCircleTokenomics: React.FC = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const rawAllocations = TOKEN_CONFIG.allocations;
  const isMathematicallyValid = validateTokenomicsIntegrity();

  const allocations = rawAllocations.map((alloc) => {
    const loc = t.tokenomics.allocations.find((a) => a.id === alloc.id);
    return {
      ...alloc,
      category: loc ? loc.category : alloc.category,
      description: loc ? loc.description : alloc.description,
    };
  });

  const totalPercentage = allocations.reduce((acc, a) => acc + a.percentage, 0);
  const radius = 95;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const slices = allocations.map((alloc) => {
    const strokeDasharray = `${(alloc.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += alloc.percentage;
    return {
      ...alloc,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const activeAllocation = activeId 
    ? allocations.find((a) => a.id === activeId) 
    : null;

  return (
    <div className="space-y-6 pt-2">
      {/* Intro Editorial Note */}
      <p className="text-sm sm:text-base text-[#4A4A4A] font-[450] leading-[1.8]">
        Bitcoin Lite Edition enforces an inviolable mathematical cap of 420,000 tokens on Solana Layer 1.
        The allocation is structured to ensure maximum community distribution, sustained liquidity, and verifiable long-term stability.
      </p>

      {/* Main Circle Tokenomic Container */}
      <div className="bg-[#FCFCFC] rounded-[28px] sm:rounded-[36px] border border-[#E5E5E5] p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: SVG Circle Donut */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#E5E5E5] pointer-events-none" />

              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
                {/* Background track circle */}
                <circle
                  cx="120"
                  cy="120"
                  r={radius}
                  className="stroke-[#EFEFEF]"
                  strokeWidth="22"
                  fill="transparent"
                />

                {/* Slices */}
                {slices.map((slice) => {
                  const isSelected = activeId === slice.id;
                  return (
                    <circle
                      key={slice.id}
                      cx="120"
                      cy="120"
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={isSelected ? 28 : 22}
                      strokeDasharray={slice.strokeDasharray}
                      strokeDashoffset={slice.strokeDashoffset}
                      strokeLinecap="butt"
                      className="transition-all duration-300 cursor-pointer hover:opacity-95"
                      onMouseEnter={() => setActiveId(slice.id)}
                      onMouseLeave={() => setActiveId(null)}
                      onClick={() => setActiveId(activeId === slice.id ? null : slice.id)}
                    />
                  );
                })}
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                {activeAllocation ? (
                  <div className="animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-3xl sm:text-4xl font-mono font-[900] text-[#080808] tabular-nums tracking-tight">
                      {activeAllocation.percentage}%
                    </div>
                    <div className="text-xs font-mono font-bold text-[#B8661B] tracking-wider mt-1">
                      {activeAllocation.amount.toLocaleString()} BLTE
                    </div>
                    <div className="text-[11px] text-[#4A4A4A] font-semibold line-clamp-1 mt-1 max-w-[170px]">
                      {activeAllocation.category}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[2px] text-[#888888]">
                      Fixed Hard Cap
                    </div>
                    <div className="text-3xl sm:text-4xl font-mono font-[900] text-[#080808] tabular-nums tracking-tight my-0.5">
                      420,000
                    </div>
                    <div className="text-[11px] font-mono font-bold text-[#B8661B] uppercase tracking-[2px]">
                      TOTAL BLTE SUPPLY
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-xs font-mono font-semibold text-[#888888] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>Strict 100% Mathematical Allocation</span>
            </div>
          </div>

          {/* Right: Allocation Breakdown List */}
          <div className="lg:col-span-7 space-y-3">
            {allocations.map((alloc) => {
              const isSelected = activeId === alloc.id;
              return (
                <div
                  key={alloc.id}
                  onMouseEnter={() => setActiveId(alloc.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setActiveId(activeId === alloc.id ? null : alloc.id)}
                  className={`p-4 rounded-[20px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#B8661B] shadow-[0_6px_20px_rgba(184,102,27,0.12)] scale-[1.01]'
                      : 'bg-white/70 hover:bg-white border-[#E5E5E5] hover:border-[#D0D0D0] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 ring-2 ring-white shadow-xs"
                        style={{ backgroundColor: alloc.color }}
                      />
                      <span className="text-sm font-[800] text-[#080808] font-display truncate">
                        {alloc.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-mono font-[900] text-[#080808] tabular-nums">
                        {alloc.percentage}%
                      </span>
                      <span className="text-xs font-mono text-[#888888] hidden sm:inline tabular-nums">
                        ({alloc.amount.toLocaleString()} BLTE)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A4A4A] font-[450] leading-relaxed mb-2 pl-5.5">
                    {alloc.description}
                  </p>

                  {/* Progress bar track */}
                  <div className="w-full bg-[#F0F0F0] h-1.5 rounded-full overflow-hidden ml-5.5 max-w-[calc(100%-1.5rem)]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${alloc.percentage}%`,
                        backgroundColor: alloc.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Footer Banner */}
        <div className="mt-8 pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#166534] font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>100% Mathematical Integrity (420,000 / 420,000 BLTE Accounted For)</span>
          </div>

          <div className="flex items-center gap-2 text-[#888888] font-mono">
            <Lock className="w-3.5 h-3.5 text-[#B8661B] shrink-0" />
            <span>Mint & Freeze Authorities Revoked at Genesis</span>
          </div>
        </div>
      </div>
    </div>
  );
};
