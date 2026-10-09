import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { HeroCoin3D } from './HeroCoin3D';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { Realistic3DIcon } from './Realistic3DIcon';

interface HeroSectionProps {
  onOpenTradeModal: () => void;
  onExploreToken: () => void;
  onOpenWhitePaper: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTradeModal,
  onExploreToken,
  onOpenWhitePaper
}) => {
  const { t } = useLanguage();
  const { isBlack } = useTheme();

  // Track responsive screen size to mount a single WebGL coin instance in the correct layout container
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-white dark:bg-[#080808] transition-colors">
      {/* Subtle warm copper ambient background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] lg:w-[980px] h-[520px] lg:h-[640px] rounded-full bg-gradient-to-b from-[#B8661B]/6 via-[#E9C9A5]/4 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column (Desktop & Mobile Content) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Small gold eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#EAB308]/15 text-[#B8661B] text-xs font-mono font-bold tracking-[2.5px] uppercase mb-4 sm:mb-5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" />
              <span>{t.hero.eyebrow || 'BITCOIN LITE EDITION · BLTE'}</span>
            </div>

            {/* Large hero heading: occupying multiple lines naturally */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-[900] tracking-tight text-[#080808] dark:text-white font-display leading-[1.2] lg:leading-[1.12] mb-5 sm:mb-6 max-w-xl text-balance">
              {t.hero.title}
            </h1>

            {/* Large readable introduction with vertical orange-gold accent line */}
            <div className="max-w-xl mb-6 sm:mb-8 flex items-stretch gap-3.5 sm:gap-4 text-left">
              <div 
                className="w-[5px] rounded-full bg-gradient-to-b from-[#EAB308] via-[#B8661B] to-[#964E10] shrink-0 self-stretch my-0.5" 
                aria-hidden="true" 
              />
              <p className="text-[17px] sm:text-[18px] md:text-[19px] text-[#4A4A4A] dark:text-[#E4E4E7] font-[450] leading-[1.65] sm:leading-[1.7] max-w-[530px]">
                {t.hero.description}
              </p>
            </div>

            {/* Mobile / Tablet Rotating Coin ONLY (Hidden on Desktop to prevent duplicate WebGL contexts) */}
            {!isDesktop && (
              <div className="mb-6 sm:mb-7 flex justify-center items-center w-full">
                <HeroCoin3D className="max-w-[220px] sm:max-w-[260px]" />
              </div>
            )}

            {/* Primary CTA: Full-width / Desktop-width rounded black button with gold accent/arrow */}
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mb-4">
              <button
                onClick={onExploreToken}
                className="w-full py-4 px-6 sm:px-8 text-base font-bold text-white bg-[#111111] hover:bg-[#B8661B] active:bg-[#964E10] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none"
              >
                <span>{t.hero.btn_explore}</span>
                <ArrowRight className="w-5 h-5 stroke-[2] text-[#EAB308] group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Secondary Actions: Clean two-option row [ Read White Paper ] BUY / TRADE */}
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-between gap-3 mb-7">
              <button
                onClick={onOpenWhitePaper}
                data-btn-whitepaper="true"
                style={{ color: isBlack ? '#FFFFFF' : '#111111' }}
                className={`flex-1 py-3.5 px-5 text-sm font-semibold rounded-[18px] border transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none whitespace-nowrap shadow-xs ${
                  isBlack
                    ? 'bg-[#1C150E] hover:bg-[#281D12] border-[#EAB308]/30 hover:border-[#B8661B] text-white'
                    : 'bg-[#FAF5EF] hover:bg-[#F2E8DC] border-[#EAB308]/20 hover:border-[#B8661B] text-[#111111]'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#B8661B] stroke-[2]" />
                <span style={{ color: isBlack ? '#FFFFFF' : '#111111' }}>{t.hero.btn_whitepaper}</span>
              </button>

              <button
                onClick={onOpenTradeModal}
                className="py-3 px-4 text-xs sm:text-sm font-mono font-bold text-[#080808] dark:text-[#F4F4F5] hover:text-[#B8661B] hover:bg-[#FAF5EF] dark:hover:bg-[#1C150E] rounded-[14px] transition-colors cursor-pointer uppercase tracking-[1.5px] whitespace-nowrap underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none"
              >
                {t.hero.btn_buy_trade}
              </button>
            </div>

            {/* Staking CTA: Prominent gold/orange rounded card with visible container and subtle pulse */}
            <a
              href={TOKEN_CONFIG.stakingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-[#FAF5EF] dark:bg-[#1C150E] hover:bg-[#F5EADB] dark:hover:bg-[#281D12] border border-[#EAB308]/15 rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(184,102,27,0.08)] flex items-center justify-between gap-3 transition-all duration-200 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none mb-7 animate-subtle-pulse hover:scale-[1.015]"
              title="Stake Bitcoin Lite Edition on Streamflow (11.61% APY)"
            >
              <div className="flex items-center gap-3.5">
                <Realistic3DIcon type="staking" size="md" className="shrink-0" />
                <div className="text-left">
                  <span className="text-base sm:text-lg font-[900] text-[#080808] dark:text-white font-display tracking-tight group-hover:text-[#B8661B] transition-colors block">
                    STAKE
                  </span>
                  <span className="text-xs sm:text-sm text-[#666666] dark:text-[#A1A1AA] font-medium block">
                    Earn Rewards
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-sm sm:text-base font-mono font-black px-3.5 py-1.5 rounded-full bg-[#B8661B] text-white shadow-[0_2px_8px_rgba(184,102,27,0.25)] tracking-tight">
                  {TOKEN_CONFIG.stakingApy} APY
                </span>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-[#121215] border border-[#EAB308]/15 text-[#B8661B] flex items-center justify-center group-hover:translate-x-0.5 group-hover:bg-[#B8661B] group-hover:text-white transition-all shadow-xs">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </a>

            {/* Token Metrics: Supply information with polished container cards */}
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#EAB308]/15 shadow-2xs">
                  <Realistic3DIcon type="token-supply" size="sm" className="mb-1" />
                  <span className="text-2xl sm:text-3xl font-mono font-[900] text-[#080808] dark:text-white tabular-nums tracking-tight">
                    2.1M
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#888888] dark:text-[#71717A] uppercase tracking-[2px] mt-1">
                    {t.hero.stat_supply || 'TOTAL SUPPLY'}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#EAB308]/15 shadow-2xs">
                  <Realistic3DIcon type="security" size="sm" className="mb-1" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-mono font-[900] text-[#B8661B] uppercase tracking-tight">
                    {t.hero.stat_scarcity || 'FIXED SUPPLY'}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#888888] dark:text-[#71717A] uppercase tracking-[2px] mt-1">
                    {t.hero.max_supply || 'MAX SUPPLY'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop Showcase ONLY: Large Interactive 3D Coin with Orbital Backdrop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative">
            {/* Desktop ambient luxury backdrop */}
            <div 
              className="absolute w-[440px] xl:w-[480px] h-[440px] xl:h-[480px] rounded-full bg-gradient-to-tr from-amber-500/15 via-[#B8661B]/10 to-transparent blur-3xl pointer-events-none -z-10" 
              aria-hidden="true"
            />
            <div 
              className="absolute w-[360px] xl:w-[400px] h-[360px] xl:h-[400px] rounded-full border border-[#EAB308]/10 pointer-events-none -z-10 animate-spin" 
              style={{ animationDuration: '60s' }}
              aria-hidden="true"
            />

            {/* Desktop Hero Coin 3D Container (Sized generously at 420px - 460px) */}
            <div className="w-full max-w-[420px] xl:max-w-[460px] aspect-square relative flex items-center justify-center">
              {isDesktop && (
                <HeroCoin3D className="w-full max-w-[420px] xl:max-w-[460px] aspect-square" />
              )}
            </div>

            {/* Interactive hint pills beneath desktop coin */}
            <div className="mt-4 flex flex-col items-center gap-1.5 select-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EF]/90 dark:bg-[#1C150E]/90 border border-[#EAB308]/20 text-[#B8661B] text-[11px] font-mono font-bold tracking-wider uppercase shadow-2xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>Interactive 3D Mint · Drag to Rotate 360°</span>
              </div>
              <span className="text-[11px] font-mono text-[#888888] dark:text-[#71717A]">
                Fixed Supply: 2,100,000 BLTE minted on Solana Mainnet
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
