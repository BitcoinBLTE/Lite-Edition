import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon } from './Realistic3DIcon';

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF8F5]/60 dark:bg-[#0A0A0E] scroll-mt-16 transition-colors border-t border-[#EAE6DF] dark:border-[#1E1E26]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.faq.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List: Clean Editorial Cards */}
        <div className="space-y-4">
          {t.faq.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white dark:bg-[#121217] rounded-[22px] sm:rounded-[28px] border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#B8661B] dark:border-[#F59E0B] shadow-[0_6px_24px_rgba(184,102,27,0.08)]'
                    : 'border-[#E5E5E5] dark:border-[#22222A] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#CCCCCC] dark:hover:border-[#333340]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] dark:hover:bg-[#181820] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8661B] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-[800] text-[#080808] dark:text-white font-display tracking-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#888888] dark:text-[#94A3B8] stroke-[2] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B8661B] dark:text-[#F59E0B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] border-t border-[#E5E5E5] dark:border-[#22222A]">
                    <p>{faq.answer}</p>
                    {faq.isDisclaimer && (
                      <div className="mt-4 p-4 bg-[#FAF5EF] dark:bg-[#1C1712] rounded-[16px] border border-[#E9C9A5] dark:border-[#B8661B]/40 text-xs text-[#080808] dark:text-white font-medium flex items-center gap-3">
                        <Realistic3DIcon type="shield" size="sm" />
                        <span>{t.faq.notice_text}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
