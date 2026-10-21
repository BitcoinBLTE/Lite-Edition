import React, { useState } from 'react';
import { Coins, CheckCircle2 } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';

interface TokenomicsCircleDesignProps {
  className?: string;
  showTitle?: boolean;
}

type AllocationId = 'fair-launch' | 'liquidity-pool' | 'staking-dev';

export const TokenomicsCircleDesign: React.FC<TokenomicsCircleDesignProps> = ({
  className = '',
  showTitle = true,
}) => {
  const { t } = useLanguage();
  const tok = t.tokenomics;

  // Selected slice state for interactive exploration: 'fair-launch' | 'liquidity-pool' | 'staking-dev' | null
  const [selectedId, setSelectedId] = useState<AllocationId | null>(null);

  // Exactly Three Distinct Sections as specified:
  // Section 1: 1,260,000 Fair Launch (60%)
  // Section 2: 630,000 Liquidity (30%)
  // Section 3: 210,000 Staking Rewards & Developer (10%)
  const allocations = [
    {
      id: 'fair-launch' as const,
      title: 'Fair Launch',
      amount: '1,260,000 BLTE',
      percentage: '60%',
      tag: 'COMMUNITY FAIR LAUNCH · 60%',
      color: '#F59E0B',
      lightColor: '#FCD34D',
      darkColor: '#D97706',
      gradientId: 'fairLaunchGradient',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      activeBorder: 'bg-[#F59E0B]/10 dark:bg-[#F59E0B]/15 shadow-[0_10px_32px_rgba(245,158,11,0.22)] ring-2 ring-[#F59E0B]/40',
      badgeBg: 'bg-[#F59E0B]/15 text-[#D97706] dark:text-[#FBBF24]',
    },
    {
      id: 'liquidity-pool' as const,
      title: 'Liquidity',
      amount: '630,000 BLTE',
      percentage: '30%',
      tag: 'RAYDIUM AMM DEX POOL · 30%',
      color: '#22C55E',
      lightColor: '#86EFAC',
      darkColor: '#16A34A',
      gradientId: 'liquidityGradient',
      glowColor: 'rgba(34, 197, 94, 0.45)',
      activeBorder: 'bg-[#22C55E]/10 dark:bg-[#22C55E]/15 shadow-[0_10px_32px_rgba(34,197,94,0.22)] ring-2 ring-[#22C55E]/40',
      badgeBg: 'bg-[#22C55E]/15 text-[#16A34A] dark:text-[#4ADE80]',
    },
    {
      id: 'staking-dev' as const,
      title: 'Staking Rewards & Developer',
      amount: '210,000 BLTE',
      percentage: '10%',
      tag: 'STAKING APY & CORE DEV · 10%',
      color: '#8B5CF6',
      lightColor: '#C4B5FD',
      darkColor: '#7C3AED',
      gradientId: 'stakingDevGradient',
      glowColor: 'rgba(139, 92, 246, 0.45)',
      activeBorder: 'bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 shadow-[0_10px_32px_rgba(139,92,246,0.22)] ring-2 ring-[#8B5CF6]/40',
      badgeBg: 'bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#A78BFA]',
    },
  ];

  // SVG Donut Calculations for 3 sections
  // ViewBox: 320 x 320, Center: 160, 160
  // Radius: 114, Base Stroke: 44, Active Stroke: 56
  // Circumference = 2 * PI * 114 = 716.283
  const radius = 114;
  const strokeWidth = 44;
  const activeStrokeWidth = 56;
  const circumference = 2 * Math.PI * radius;
  
  // Separation gap between segments for architectural precision
  const gap = 8;

  // Segment 1: Fair Launch (60%)
  const fairLaunchLength = (60 / 100) * circumference;
  const fairLaunchDash = fairLaunchLength - gap;
  const fairLaunchGap = circumference - fairLaunchDash;
  const fairLaunchOffset = 0;

  // Segment 2: Liquidity (30%)
  const liquidityLength = (30 / 100) * circumference;
  const liquidityDash = liquidityLength - gap;
  const liquidityGap = circumference - liquidityDash;
  const liquidityOffset = -fairLaunchLength;

  // Segment 3: Staking Rewards & Developer (10%)
  const stakingDevLength = (10 / 100) * circumference;
  const stakingDevDash = stakingDevLength - gap;
  const stakingDevGap = circumference - stakingDevDash;
  const stakingDevOffset = -(fairLaunchLength + liquidityLength);

  const selectedItem = allocations.find((a) => a.id === selectedId);

  const toggleSelect = (id: AllocationId) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`rounded-[24px] sm:rounded-[32px] bg-[#FAF5EF]/70 dark:bg-[#121217] p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] ${className}`}>
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-wider">
              <Coins className="w-4 h-4" />
              <span>{tok.kicker || 'CIRCULAR TOKENOMIC ARCHITECTURE · INVIOLABLE GENESIS DISTRIBUTION'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-[#080808] dark:text-white font-display tracking-tight mt-1.5">
              {tok.title || '2.1M TOTAL SUPPLY'}
            </h3>
          </div>
        </div>
      )}

      {/* Circulatory Indicator Badge */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[12px] sm:rounded-[14px] bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-mono font-bold shadow-2xs hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>100% Circulatory</span>
        </button>
      </div>

      {/* Main Container: Expanded Selectable Donut Chart on Left, Interactive Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left: Expanded, Selectable Donut Chart */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative select-none py-2 min-w-0">
          
          {/* Expanded Donut Graphic Container */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] max-w-full flex items-center justify-center aspect-square">
            
            {/* Dynamic ambient background glow tuned to active selection */}
            <div
              className="absolute inset-4 rounded-full blur-3xl transition-all duration-500 -z-10"
              style={{
                background: selectedId === 'fair-launch'
                  ? 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)'
                  : selectedId === 'liquidity-pool'
                  ? 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)'
                  : selectedId === 'staking-dev'
                  ? 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(34, 197, 94, 0.2) 40%, rgba(139, 92, 246, 0.2) 70%, transparent 80%)',
              }}
            />

            <svg
              className="w-full h-full -rotate-90 transform"
              viewBox="0 0 320 320"
            >
              <defs>
                {/* Segment 1 Gradient: Warm Solar Amber (60%) */}
                <linearGradient id="fairLaunchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>

                {/* Segment 2 Gradient: Radiant Light Green (30%) */}
                <linearGradient id="liquidityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="50%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>

                {/* Segment 3 Gradient: Electric Violet / Purple (10%) */}
                <linearGradient id="stakingDevGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C4B5FD" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>

                {/* Shadow Filters for Selection Pop */}
                <filter id="fairLaunchShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#F59E0B" floodOpacity="0.7" />
                </filter>
                <filter id="liquidityShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#22C55E" floodOpacity="0.7" />
                </filter>
                <filter id="stakingDevShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#8B5CF6" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* Underlying Track for Crisp Contrast */}
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="#E5E5E5"
                strokeWidth={strokeWidth}
                fill="none"
                className="opacity-25 dark:opacity-10"
              />

              {/* Segment 1: Fair Launch (60% · 1,260,000 BLTE) */}
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="url(#fairLaunchGradient)"
                strokeWidth={selectedId === 'fair-launch' ? activeStrokeWidth : strokeWidth}
                strokeDasharray={`${fairLaunchDash} ${fairLaunchGap}`}
                strokeDashoffset={fairLaunchOffset}
                strokeLinecap="round"
                fill="none"
                onClick={() => toggleSelect('fair-launch')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSelect('fair-launch');
                  }
                }}
                aria-label="Select Fair Launch allocation (1,260,000 BLTE · 60%)"
                filter={selectedId === 'fair-launch' ? 'url(#fairLaunchShadow)' : undefined}
                className={`transition-all duration-300 cursor-pointer outline-hidden ${
                  selectedId === 'fair-launch'
                    ? 'opacity-100'
                    : selectedId !== null
                    ? 'opacity-30 hover:opacity-75'
                    : 'opacity-100 hover:opacity-90'
                }`}
              />

              {/* Segment 2: Liquidity (30% · 630,000 BLTE) */}
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="url(#liquidityGradient)"
                strokeWidth={selectedId === 'liquidity-pool' ? activeStrokeWidth : strokeWidth}
                strokeDasharray={`${liquidityDash} ${liquidityGap}`}
                strokeDashoffset={liquidityOffset}
                strokeLinecap="round"
                fill="none"
                onClick={() => toggleSelect('liquidity-pool')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSelect('liquidity-pool');
                  }
                }}
                aria-label="Select Liquidity allocation (630,000 BLTE · 30%)"
                filter={selectedId === 'liquidity-pool' ? 'url(#liquidityShadow)' : undefined}
                className={`transition-all duration-300 cursor-pointer outline-hidden ${
                  selectedId === 'liquidity-pool'
                    ? 'opacity-100'
                    : selectedId !== null
                    ? 'opacity-30 hover:opacity-75'
                    : 'opacity-100 hover:opacity-90'
                }`}
              />

              {/* Segment 3: Staking Rewards & Developer (10% · 210,000 BLTE) */}
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="url(#stakingDevGradient)"
                strokeWidth={selectedId === 'staking-dev' ? activeStrokeWidth : strokeWidth}
                strokeDasharray={`${stakingDevDash} ${stakingDevGap}`}
                strokeDashoffset={stakingDevOffset}
                strokeLinecap="round"
                fill="none"
                onClick={() => toggleSelect('staking-dev')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSelect('staking-dev');
                  }
                }}
                aria-label="Select Staking Rewards & Developer allocation (210,000 BLTE · 10%)"
                filter={selectedId === 'staking-dev' ? 'url(#stakingDevShadow)' : undefined}
                className={`transition-all duration-300 cursor-pointer outline-hidden ${
                  selectedId === 'staking-dev'
                    ? 'opacity-100'
                    : selectedId !== null
                    ? 'opacity-30 hover:opacity-75'
                    : 'opacity-100 hover:opacity-90'
                }`}
              />
            </svg>

            {/* Center Disc: Interactive with Dynamic Inspection & Tap to Reset */}
            <div
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 m-auto w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-white dark:bg-[#121217] shadow-[0_12px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center text-center p-3 sm:p-4 cursor-pointer transition-all hover:scale-[1.02]"
              title={selectedId ? "Click to reset view" : "2.1M BLTE Hard Cap"}
            >
              {selectedItem ? (
                <div className="space-y-1 sm:space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
                  <span
                    className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full mb-0.5 sm:mb-1 shadow-xs"
                    style={{ backgroundColor: selectedItem.color }}
                  />
                  <div className="font-display font-[900] text-base sm:text-xl text-[#080808] dark:text-white tracking-tight leading-tight px-2">
                    {selectedItem.title}
                  </div>
                  <div
                    className="font-mono text-base sm:text-xl font-black tracking-tight"
                    style={{ color: selectedItem.color }}
                  >
                    {selectedItem.amount}
                  </div>
                  <div className="text-[9px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-[#111111]/5 dark:bg-white/10 text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider inline-block">
                    {selectedItem.percentage} OF SUPPLY
                  </div>
                </div>
              ) : (
                <div className="space-y-0.5 sm:space-y-1">
                  <span className="font-display font-[900] text-3xl sm:text-5xl text-[#080808] dark:text-white tracking-tight leading-none block">
                    2.1M
                  </span>
                  <span className="font-mono text-xs sm:text-base font-black text-[#B8661B] dark:text-[#EAB308] tracking-widest block">
                    BLTE
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#64748B] dark:text-[#94A3B8] font-bold block pt-0.5 sm:pt-1">
                    {tok.fixed_cap || 'HARD CAP · 3 SECTIONS'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Exactly 3 Selectable Breakdown Cards with Color Distinction */}
        <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
          {allocations.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={`p-5 sm:p-6 lg:p-7 rounded-[24px] bg-white/95 dark:bg-[#14141C]/95 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer space-y-3 group ${
                  isSelected
                    ? item.activeBorder
                    : 'hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <span
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 shadow-xs ring-4 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 14px ${item.glowColor}`,
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-base sm:text-xl font-bold text-[#080808] dark:text-white font-display truncate">
                        {item.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] tracking-wider font-semibold">
                        {item.tag}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span
                      className="text-sm sm:text-lg font-mono font-black"
                      style={{ color: item.color }}
                    >
                      {item.amount}
                    </span>
                    {isSelected && (
                      <span className="p-0.5 sm:p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
