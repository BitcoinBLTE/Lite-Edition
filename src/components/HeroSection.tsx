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
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24 bg-white border-b border-[#E5E5E5]">
      {/* Subtle warm copper ambient background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full bg-gradient-to-b from-[#B8661B]/5 via-[#E9C9A5]/4 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* 1. Rotating Coin at the top */}
        <div className="mb-6 flex justify-center items-center w-full">
          <HeroCoin3D />
        </div>

        {/* 2. Oversized Futuristic Heading (800-900 weight, near-black #080808) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-[900] tracking-[-0.03em] text-[#080808] font-display text-balance leading-[1.12] mb-4">
          {t.hero.title}
        </h1>

        {/* 3. Sub Header - Clean & punchy */}
        <p className="text-base sm:text-lg md:text-xl font-semibold text-[#080808] font-display tracking-tight text-balance max-w-2xl mb-4">
          {t.hero.subtitle}
        </p>

        {/* 4. Supporting Editorial Description (#4A4A4A with generous line-height) */}
        <p className="text-sm sm:text-base text-[#4A4A4A] font-[450] leading-[1.8] sm:leading-[1.85] max-w-2xl mb-8">
          {t.hero.description}
        </p>

        {/* 5. Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
          <button
            onClick={onExploreToken}
            className="px-6 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-bold text-white bg-[#111111] hover:bg-[#B8661B] active:bg-[#964E10] rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 flex items-center gap-2.5 group whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none"
          >
            <span>{t.hero.btn_explore}</span>
            <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform duration-200 text-[#E9C9A5]" />
          </button>

          <button
            onClick={onOpenWhitePaper}
            className="px-6 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-semibold text-[#222222] bg-white hover:bg-[#F9F9F9] hover:border-[#CCCCCC] border border-[#D9D9D9] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none"
          >
            <BookOpen className="w-4 h-4 text-[#B8661B] stroke-[2]" />
            <span>{t.hero.btn_whitepaper}</span>
          </button>

          <button
            onClick={onOpenTradeModal}
            className="px-5 py-3.5 sm:py-4 text-xs font-mono font-bold text-[#080808] hover:text-[#B8661B] hover:bg-[#FAF5EF] rounded-[16px] transition-colors cursor-pointer"
          >
            {t.hero.btn_buy_trade}
          </button>
        </div>

        {/* Dedicated Stake Action - Positioned Below */}
        <div className="flex justify-center mb-10">
          <a
            href={TOKEN_CONFIG.stakingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-[#B8661B] hover:bg-[#964E10] active:bg-[#7D3E08] rounded-[16px] shadow-[0_4px_16px_rgba(184,102,27,0.25)] transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none group"
            title="Stake Bitcoin Lite Edition on Streamflow Finance (40% APY)"
          >
            <span>STAKE</span>
            <span className="text-[10px] sm:text-[11px] font-mono font-extrabold px-1.5 py-0.5 rounded-full bg-black/25 text-amber-200 border border-amber-300/30 leading-none">
              40% APY
            </span>
          </a>
        </div>

        {/* 6. Secondary Technical Monospace Metadata (Strict Zero-Pill) */}
        <div className="pt-6 border-t border-[#E5E5E5] w-full flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-xs font-mono font-semibold text-[#4A4A4A] uppercase tracking-[2.5px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" />
            <span className="text-[#080808] font-bold tabular-nums">420,000</span>
            <span>{t.hero.stat_supply}</span>
          </div>
          <span className="text-[#D9D9D9] hidden sm:inline" aria-hidden="true">/</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-[#E9C9A5]" />
            <span>{t.hero.stat_network}</span>
          </div>
          <span className="text-[#D9D9D9] hidden sm:inline" aria-hidden="true">/</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" />
            <span>{t.hero.stat_scarcity}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
