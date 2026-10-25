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
    <section id="bitcoin-intro" className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-[#070709] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Card: Spans full max-w-7xl width with balanced 2-column desktop architecture */}
        <div className="bg-white/95 dark:bg-[#121217]/95 rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] p-7 sm:p-10 lg:p-14 xl:p-16 shadow-[0_12px_44px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_44px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Column (Badge, Decorative Icon, Heading, and Action Buttons) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                  <div className="text-xs font-mono font-bold tracking-[3px] uppercase text-[#B8661B] dark:text-[#EAB308] flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
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
                    className="px-5 sm:px-6 py-3.5 sm:py-4 text-sm font-semibold text-[#222222] dark:text-white bg-white dark:bg-[#18181D] hover:bg-[#FAF8F5] dark:hover:bg-[#222228] rounded-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B8661B] focus-visible:outline-none whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-[#B8661B] stroke-[2]" />
                    <span>{t.intro.explore_genesis}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column (Infographic Image moved directly above the text) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Infographic Photo moved above this text */}
              <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden bg-white dark:bg-[#0A0A0E] shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)] group/info">
                <img
                  src="/assets/aistudio/Btc_explain_de14705e.jpg"
                  alt="From Bitcoin to a Bigger Vision"
                  className="w-full h-auto object-contain rounded-[20px] sm:rounded-[28px] mx-auto transition-transform duration-700 group-hover/info:scale-[1.01]"
                  loading="lazy"
                />

                {/* Topic Animation: Historical Precedent & Architectural Evolution Shimmer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px] sm:rounded-[28px]"
                >
                  {/* Luminous timeline progression beam traveling from 2008 to present */}
                  <div className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#F59E0B]/15 dark:via-[#F59E0B]/25 to-transparent animate-timeline-scan" />
                  
                  {/* Subtle pulsing historical milestone beacons */}
                  <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-[#B8661B] dark:bg-[#EAB308] animate-node-pulse-a shadow-[0_0_8px_rgba(184,102,27,0.8)]" />
                  <div className="absolute top-[32%] left-[48%] w-2 h-2 rounded-full bg-[#10B981] animate-node-pulse-b shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <div className="absolute top-[22%] right-[16%] w-2 h-2 rounded-full bg-[#3B82F6] animate-node-pulse-a shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
              </div>

              {/* The Text */}
              <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-[#475569] dark:text-[#CBD5E1] font-[450] leading-[1.8] sm:leading-[1.85] font-sans">
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
