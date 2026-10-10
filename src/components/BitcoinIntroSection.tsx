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
    <section id="bitcoin-intro" className="py-16 md:py-24 bg-white dark:bg-[#080808] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Card: Spans full max-w-7xl width with balanced 2-column desktop architecture */}
        <div className="bg-[#FCFCFC] dark:bg-[#0E0E12] border border-[#E5E5E5] dark:border-[#1E1E24] rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] p-7 sm:p-10 lg:p-14 xl:p-16 shadow-[0_4px_28px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Column (Badge, Decorative Icon, Heading, and Action Buttons) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                  <div className="text-xs font-mono font-bold tracking-[3px] uppercase text-[#B8661B] dark:text-[#EAB308] flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" aria-hidden="true" />
                    <span>{t.intro.badge}</span>
                  </div>
                  <Realistic3DIcon type="bitcoin" size="lg" />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight leading-[1.18] mb-6 sm:mb-8 text-balance">
                  {t.intro.title || 'A New Era in Digital Finance'}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-3.5">
                <button
                  onClick={onLearnMore}
                  className="px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-[#111111] hover:bg-[#B8661B] active:bg-[#964E10] rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all flex items-center justify-center gap-2.5 group whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none cursor-pointer"
                >
                  <span>{t.intro.learn_more}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform duration-200 text-[#E9C9A5]" />
                </button>

                {onOpenEducationModal && (
                  <button
                    onClick={onOpenEducationModal}
                    className="px-5 sm:px-6 py-3.5 sm:py-4 text-sm font-semibold text-[#222222] dark:text-white bg-white dark:bg-[#18181D] hover:bg-[#F9F9F9] dark:hover:bg-[#222228] hover:border-[#CCCCCC] dark:hover:border-[#B8661B]/40 border border-[#D9D9D9] dark:border-[#333339] rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-[#B8661B] stroke-[2]" />
                    <span>{t.intro.explore_genesis}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column (Contextual Body with Vertical Accent Bar) */}
            <div className="lg:col-span-7">
              <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-[#4A4A4A] dark:text-[#D4D4D8] font-[450] leading-[1.8] sm:leading-[1.85] font-sans border-l-2 border-[#B8661B]/60 pl-6 sm:pl-8">
                <p>{t.intro.p1}</p>
                <p>{t.intro.p2}</p>
                <p>{t.intro.p3}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
