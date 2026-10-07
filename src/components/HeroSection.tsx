import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { HeroCoin3D } from './HeroCoin3D';
import { useLanguage } from '../i18n/LanguageContext';
import { TOKEN_CONFIG } from '../config/tokenConfig';

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

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-white">
      {/* Subtle warm copper ambient background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full bg-gradient-to-b from-[#B8661B]/5 via-[#E9C9A5]/4 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Small gold eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EF] border border-[#EAB308]/5 text-[#B8661B] text-xs font-mono font-bold tracking-[2.5px] uppercase mb-4 sm:mb-5 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" />
          <span>{t.hero.eyebrow || 'BITCOIN LITE EDITION · BLTE'}</span>
        </div>

        {/* Large hero heading: occupying multiple lines naturally */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-[900] tracking-tight text-[#080808] font-display leading-[1.2] sm:leading-[1.15] mb-5 sm:mb-6 max-w-xl text-balance">
          {t.hero.title}
        </h1>

        {/* Large readable introduction: comfortable 18-21px reading text */}
        <p className="text-[18px] sm:text-[19px] md:text-[20px] text-[#4A4A4A] font-[450] leading-[1.75] sm:leading-[1.8] max-w-lg mx-auto mb-6 sm:mb-8 text-balance px-2">
          {t.hero.description}
        </p>

        {/* Rotating 3D Coin directly above Explore Token Architecture button */}
        <div className="mb-6 sm:mb-7 flex justify-center items-center w-full">
          <HeroCoin3D />
        </div>

        {/* Primary CTA: Full-width rounded black button with subtle gold accent/arrow */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto mb-4">
          <button
            onClick={onExploreToken}
            className="w-full py-4 px-6 sm:px-8 text-base font-bold text-white bg-[#111111] hover:bg-[#B8661B] active:bg-[#964E10] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none"
          >
            <span>{t.hero.btn_explore}</span>
            <ArrowRight className="w-5 h-5 stroke-[2] text-[#EAB308] group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Secondary Actions: Clean two-option row [ Read White Paper ] BUY / TRADE */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-between gap-3 mb-8">
          <button
            onClick={onOpenWhitePaper}
            className="flex-1 py-3.5 px-5 text-sm font-semibold text-[#111111] bg-[#FAF5EF] hover:bg-[#F2E8DC] border border-[#EAB308]/5 hover:border-[#B8661B] rounded-[18px] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-[#B8661B] stroke-[2]" />
            <span>{t.hero.btn_whitepaper}</span>
          </button>

          <button
            onClick={onOpenTradeModal}
            className="py-3 px-4 text-xs sm:text-sm font-mono font-bold text-[#080808] hover:text-[#B8661B] hover:bg-[#FAF5EF] rounded-[14px] transition-colors cursor-pointer uppercase tracking-[1.5px] whitespace-nowrap underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none"
          >
            {t.hero.btn_buy_trade}
          </button>
        </div>

        {/* Staking CTA: Prominent gold/orange rounded card with visible polished container and subtle pulse */}
        <a
          href={TOKEN_CONFIG.stakingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-sm sm:max-w-md mx-auto bg-[#FAF5EF] hover:bg-[#F5EADB] border border-[#EAB308]/5 rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(184,102,27,0.08)] flex items-center justify-between gap-3 transition-all duration-200 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none mb-8 sm:mb-10 animate-subtle-pulse hover:scale-[1.015]"
          title="Stake Bitcoin Lite Edition on Streamflow (40% APY)"
        >
          <div className="text-left">
            <span className="text-base sm:text-lg font-[900] text-[#080808] font-display tracking-tight group-hover:text-[#B8661B] transition-colors block">
              STAKE
            </span>
            <span className="text-xs sm:text-sm text-[#666666] font-medium block">
              Earn Rewards
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-sm sm:text-base font-mono font-black px-3.5 py-1.5 rounded-full bg-[#B8661B] text-white shadow-[0_2px_8px_rgba(184,102,27,0.25)] tracking-tight">
              {TOKEN_CONFIG.stakingApy} APY
            </span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#EAB308]/5 text-[#B8661B] flex items-center justify-center group-hover:translate-x-0.5 group-hover:bg-[#B8661B] group-hover:text-white transition-all shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </a>

        {/* Token Metrics: Supply information with polished container cards */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto pt-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <div className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-[#FAF5EF] border border-[#EAB308]/5 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-mono font-[900] text-[#080808] tabular-nums tracking-tight">
                420,000
              </span>
              <span className="text-[11px] font-mono font-bold text-[#888888] uppercase tracking-[2px] mt-1">
                {t.hero.stat_supply || 'TOTAL SUPPLY'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-[#FAF5EF] border border-[#EAB308]/5 shadow-2xs">
              <span className="text-xl sm:text-2xl md:text-3xl font-mono font-[900] text-[#B8661B] uppercase tracking-tight">
                {t.hero.stat_scarcity || 'FIXED SUPPLY'}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#888888] uppercase tracking-[2px] mt-1">
                {t.hero.max_supply || 'MAX SUPPLY'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
