import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
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

  // Track responsive screen size to mount a single WebGL coin instance in the correct container
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24 bg-white dark:bg-[#080808] transition-colors">
      {/* Subtle warm copper ambient background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] lg:w-[1040px] h-[520px] lg:h-[640px] rounded-full bg-gradient-to-b from-[#B8661B]/8 via-[#E9C9A5]/4 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 1: Balanced 2-Column Hero Showcase (Headline & CTAs on Left, 3D Token on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Heading, Prose, and Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Small gold brand eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#EAB308]/20 text-[#B8661B] dark:text-[#EAB308] text-xs font-mono font-bold tracking-[2.5px] uppercase mb-4 sm:mb-5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" />
              <span>{t.hero.eyebrow || 'BITCOIN LITE EDITION · BLTE'}</span>
            </div>

            {/* Main hero heading: naturally proportioned on desktop and mobile */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-[900] tracking-tight text-[#080808] dark:text-white font-display leading-[1.18] lg:leading-[1.12] mb-5 sm:mb-6 max-w-2xl text-balance">
              {t.hero.title}
            </h1>

            {/* Introduction with vertical orange-gold accent bar */}
            <div className="max-w-2xl mb-6 sm:mb-8 flex items-stretch gap-3.5 sm:gap-4 text-left">
              <div 
                className="w-[5px] rounded-full bg-gradient-to-b from-[#EAB308] via-[#B8661B] to-[#964E10] shrink-0 self-stretch my-0.5" 
                aria-hidden="true" 
              />
              <p className="text-[16px] sm:text-[18px] md:text-[19px] text-[#4A4A4A] dark:text-[#E4E4E7] font-[450] leading-[1.65] sm:leading-[1.7]">
                {t.hero.description}
              </p>
            </div>

            {/* Mobile / Tablet Rotating Coin ONLY (Hidden on Desktop) */}
            {!isDesktop && (
              <div className="mb-7 flex justify-center items-center w-full lg:hidden">
                <HeroCoin3D className="max-w-[220px] sm:max-w-[260px]" />
              </div>
            )}

            {/* Action Buttons: Unified, professional layout on desktop and mobile */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-xl">
              {/* Primary Explore CTA */}
              <button
                onClick={onExploreToken}
                className="py-4 px-6 sm:px-8 text-base font-bold text-white bg-[#111111] hover:bg-[#B8661B] active:bg-[#964E10] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none whitespace-nowrap"
              >
                <span>{t.hero.btn_explore}</span>
                <ArrowRight className="w-5 h-5 text-[#EAB308] group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              {/* Secondary CTA Group (Read White Paper & Buy/Trade) */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  onClick={onOpenWhitePaper}
                  data-btn-whitepaper="true"
                  style={{ color: isBlack ? '#FFFFFF' : '#111111' }}
                  className={`flex-1 sm:flex-initial py-3.5 px-5 text-sm font-semibold rounded-[18px] border transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none whitespace-nowrap shadow-xs ${
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
            </div>

          </div>

          {/* Right Column: Desktop 3D Token Showcase ONLY */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative">
            {/* Desktop ambient glow backdrop */}
            <div 
              className="absolute w-[440px] xl:w-[480px] h-[440px] xl:h-[480px] rounded-full bg-gradient-to-tr from-amber-500/15 via-[#B8661B]/10 to-transparent blur-3xl pointer-events-none -z-10" 
              aria-hidden="true"
            />
            <div 
              className="absolute w-[360px] xl:w-[400px] h-[360px] xl:h-[400px] rounded-full border border-[#EAB308]/10 pointer-events-none -z-10 animate-spin" 
              style={{ animationDuration: '60s' }}
              aria-hidden="true"
            />

            {/* Desktop Hero Coin 3D Container */}
            <div className="w-full max-w-[360px] xl:max-w-[420px] aspect-square relative flex items-center justify-center">
              {isDesktop && (
                <HeroCoin3D className="w-full max-w-[360px] xl:max-w-[420px] aspect-square" />
              )}
            </div>

            {/* Interactive hint beneath desktop coin */}
            <div className="mt-4 flex flex-col items-center gap-1.5 select-none text-center">
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

        {/* ROW 2: Balanced Protocol Metrics & Utilities (Staking Card on Left, Supply Stats on Right) */}
        <div className="mt-8 lg:mt-10 pt-5 lg:pt-6 border-t border-[#E5E5E5]/70 dark:border-[#1E1E24] max-w-4xl xl:max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            
            {/* Left Utility: Staking Card */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <a
                href={TOKEN_CONFIG.stakingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full bg-[#FAF5EF] dark:bg-[#1C150E] hover:bg-[#F5EADB] dark:hover:bg-[#281D12] border border-[#EAB308]/20 rounded-[16px] sm:rounded-[18px] px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xs hover:shadow-sm flex items-center justify-between gap-3 transition-all duration-200 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none hover:scale-[1.01]"
                title="Stake Bitcoin Lite Edition (11.61% APY)"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Realistic3DIcon type="staking" size="sm" className="shrink-0" />
                  <span className="text-sm sm:text-base font-[900] text-[#080808] dark:text-white font-display tracking-tight group-hover:text-[#B8661B] transition-colors block">
                    STAKE BLTE
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                  <span className="text-xs sm:text-sm font-mono font-black px-2.5 py-1 rounded-full bg-[#B8661B] text-white shadow-2xs tracking-tight">
                    {TOKEN_CONFIG.stakingApy} APY
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-[#121215] border border-[#EAB308]/15 text-[#B8661B] flex items-center justify-center group-hover:translate-x-0.5 group-hover:bg-[#B8661B] group-hover:text-white transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </a>
            </div>

            {/* Right Utility: Supply Statistics */}
            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
                {/* Stat 1: Total Supply */}
                <div className="flex flex-col items-center justify-center px-3 py-2.5 sm:px-4 sm:py-3 rounded-[16px] sm:rounded-[18px] bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#EAB308]/15 shadow-2xs text-center">
                  <Realistic3DIcon type="token-supply" size="sm" className="mb-1 shrink-0" />
                  <span className="text-xl sm:text-2xl font-mono font-[900] text-[#080808] dark:text-white tabular-nums tracking-tight leading-tight">
                    2.1M
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#888888] dark:text-[#71717A] uppercase tracking-[1.5px] mt-0.5 leading-tight">
                    {t.hero.stat_supply || 'TOTAL SUPPLY'}
                  </span>
                </div>

                {/* Stat 2: Fixed Scarcity */}
                <div className="flex flex-col items-center justify-center px-3 py-2.5 sm:px-4 sm:py-3 rounded-[16px] sm:rounded-[18px] bg-[#FAF5EF] dark:bg-[#1C150E] border border-[#EAB308]/15 shadow-2xs text-center">
                  <Realistic3DIcon type="security" size="sm" className="mb-1 shrink-0" />
                  <span className="text-base sm:text-lg md:text-xl font-mono font-[900] text-[#B8661B] dark:text-[#EAB308] uppercase tracking-tight leading-tight">
                    {t.hero.stat_scarcity || 'FIXED SUPPLY'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#888888] dark:text-[#71717A] uppercase tracking-[1.5px] mt-0.5 leading-tight">
                    {t.hero.max_supply || 'MAX SUPPLY: 2,100,000'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
