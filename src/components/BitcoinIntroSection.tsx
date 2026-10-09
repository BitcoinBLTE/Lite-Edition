import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon } from './Realistic3DIcon';

interface BitcoinIntroSectionProps {
  onLearnMore: () => void;
  onOpenEducationModal?: () => void;
}

export const BitcoinIntroSection: React.FC<BitcoinIntroSectionProps> = ({
  onLearnMore,
  onOpenEducationModal
}) => {
  const { t } = useLanguage();

  return (
    <section id="bitcoin-intro" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Card: 38-42px rounded, #FCFCFC background, 1px solid #E5E5E5 border, subtle shadow */}
        <div className="max-w-4xl mx-auto bg-[#FCFCFC] border border-[#E5E5E5] rounded-[32px] sm:rounded-[42px] p-8 sm:p-12 md:p-14 shadow-[0_4px_28px_rgba(0,0,0,0.05)]">
          {/* Section Header with 3D Medallion Icon */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] flex items-center gap-2.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
              <span>{t.intro.badge}</span>
            </div>
            <Realistic3DIcon type="bitcoin" size="lg" />
          </div>

          {/* Section Heading: Oversized futuristic geometric heading, near-black #080808, 900 weight */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] font-display tracking-tight text-balance leading-[1.15] mb-8">
            {t.intro.title}
          </h2>

          {/* Context Body: #4A4A4A with generous 1.8-1.85 line-height */}
          <div className="space-y-6 text-base sm:text-lg text-[#4A4A4A] font-[450] leading-[1.8] sm:leading-[1.85] font-sans border-l-2 border-[#B8661B]/60 pl-6 my-8">
            <p>{t.intro.p1}</p>
            <p>{t.intro.p2}</p>
            <p>{t.intro.p3}</p>
          </div>

          {/* Action Buttons: 14-18px radius with smooth hover toward #B8661B */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onLearnMore}
              className="px-7 py-4 text-sm sm:text-base font-bold text-white bg-[#111111] hover:bg-[#B8661B] active:bg-[#964E10] rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 flex items-center gap-2.5 group whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none cursor-pointer"
            >
              <span>{t.intro.learn_more}</span>
              <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform duration-200 text-[#E9C9A5]" />
            </button>

            {onOpenEducationModal && (
              <button
                onClick={onOpenEducationModal}
                className="px-6 py-4 text-sm font-semibold text-[#222222] dark:text-white bg-white dark:bg-[#18181D] hover:bg-[#F9F9F9] dark:hover:bg-[#222228] hover:border-[#CCCCCC] dark:hover:border-[#B8661B]/40 border border-[#D9D9D9] dark:border-[#333339] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none"
              >
                <BookOpen className="w-4 h-4 text-[#B8661B] stroke-[2]" />
                <span>{t.intro.explore_genesis}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
