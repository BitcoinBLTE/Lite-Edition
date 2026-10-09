import React, { useState } from 'react';
import { TOKEN_CONFIG, validateTokenomicsIntegrity } from '../config/tokenConfig';
import { ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

export const TokenomicsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const rawAllocations = TOKEN_CONFIG.allocations;
  const isMathematicallyValid = validateTokenomicsIntegrity();
  const alloc3DTypes: Record<string, Realistic3DIconType> = {
    'fair-launch': 'fair-launch',
    'liquidity-pool': 'liquidity',
    'staking-dev-dex': 'staking',
  };

  const allocations = rawAllocations.map((alloc) => {
    const loc = t.tokenomics.allocations.find((a) => a.id === alloc.id);
    return {
      ...alloc,
      category: loc ? loc.category : alloc.category,
      description: loc ? loc.description : alloc.description,
    };
  });

  // Calculate SVG donut segments
  const totalPercentage = allocations.reduce((acc, a) => acc + a.percentage, 0);
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const slices = allocations.map((alloc) => {
    const strokeDasharray = `${(alloc.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += alloc.percentage;
    return {
      ...alloc,
      strokeDasharray,
      strokeDashoffset
    };
  });

  const activeAllocation = activeId 
    ? allocations.find((a) => a.id === activeId) 
    : null;

  return (
    <section id="tokenomics" className="py-20 md:py-28 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.tokenomics.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] font-display tracking-tight text-balance leading-[1.15]">
            {t.tokenomics.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4A4A] font-[450] leading-[1.8] text-balance">
            {t.tokenomics.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Interactive Donut Chart in Editorial Card */}
          <div className="lg:col-span-6 bg-[#FCFCFC] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 border border-[#E5E5E5] shadow-[0_4px_28px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
              {/* SVG Donut */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 260 260">
                <circle
                  cx="130"
                  cy="130"
                  r={radius}
                  className="stroke-[#EFEFEF] dark:stroke-[#222227]"
                  strokeWidth="24"
                  fill="transparent"
                />
                {slices.map((slice) => {
                  const isSelected = activeId === slice.id;
                  return (
                    <circle
                      key={slice.id}
                      cx="130"
                      cy="130"
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={isSelected ? 28 : 24}
                      strokeDasharray={slice.strokeDasharray}
                      strokeDashoffset={slice.strokeDashoffset}
                      className="transition-all duration-300 cursor-pointer hover:opacity-90"
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
                  <div className="animate-in fade-in duration-200 flex flex-col items-center">
                    <Realistic3DIcon type={alloc3DTypes[activeAllocation.id] || 'token-supply'} size="sm" className="mb-1" />
                    <div className="text-3xl sm:text-4xl font-mono font-[900] text-[#080808] tabular-nums">
                      {activeAllocation.percentage}%
                    </div>
                    <div className="text-xs font-mono font-bold text-[#B8661B] tracking-wider mt-1">
                      {activeAllocation.amount.toLocaleString()} BLTE
                    </div>
                    <div className="text-xs text-[#4A4A4A] font-semibold line-clamp-1 mt-1">
                      {activeAllocation.category}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Realistic3DIcon type="token-supply" size="sm" className="mb-1" />
                    <div className="text-[10px] font-mono uppercase tracking-[2px] text-[#888888]">
                      {t.tokenomics.fixed_cap}
                    </div>
                    <div className="text-3xl sm:text-4xl font-mono font-[900] text-[#080808] tabular-nums tracking-tight my-1">
                      {TOKEN_CONFIG.shortSupply}
                    </div>
                    <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2px]">
                      {t.tokenomics.total_supply}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 text-xs font-mono font-semibold text-[#666666] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>{t.tokenomics.verified_alloc} ({totalPercentage}%)</span>
            </div>
          </div>

          {/* Right: Allocation Breakdown List */}
          <div className="lg:col-span-6 space-y-4">
            {allocations.map((alloc) => {
              const isSelected = activeId === alloc.id;
              return (
                <div
                  key={alloc.id}
                  onMouseEnter={() => setActiveId(alloc.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setActiveId(activeId === alloc.id ? null : alloc.id)}
                  className={`p-6 rounded-[22px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#B8661B] shadow-[0_6px_24px_rgba(184,102,27,0.12)] scale-[1.01]'
                      : 'bg-[#FCFCFC] hover:bg-white border-[#E5E5E5] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#CCCCCC]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Realistic3DIcon type={alloc3DTypes[alloc.id] || 'scarcity'} size="sm" />
                      <h4 className="text-base font-[800] text-[#080808] font-display">
                        {alloc.category}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-mono font-[800] text-[#080808] tabular-nums">
                        {alloc.percentage}%
                      </span>
                      <span className="text-xs font-mono text-[#888888] block tabular-nums">
                        {alloc.amount.toLocaleString()} BLTE
                      </span>
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#4A4A4A] font-[450] leading-[1.7] pl-7">
                    {alloc.description}
                  </p>
                </div>
              );
            })}

            {/* Central Data Source Integrity Note */}
            <div className="pt-2 text-xs font-mono text-[#888888] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#888888]" />
              <span>{t.tokenomics.data_source}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
