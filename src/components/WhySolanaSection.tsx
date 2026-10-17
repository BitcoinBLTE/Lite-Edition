import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

export const WhySolanaSection: React.FC = () => {
  const { t } = useLanguage();
  const solana3DIcons: Realistic3DIconType[] = ['solana', 'token-supply', 'transactions', 'architecture'];

  const features = t.why_solana.pillars.map((item, idx) => ({
    ...item,
    iconType: solana3DIcons[idx] || 'speed',
  }));

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#080808] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.why_solana.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.why_solana.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.why_solana.subtitle}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            return (
              <div
                key={item.title}
                className="bg-[#FCFCFC] dark:bg-[#121217] rounded-[28px] sm:rounded-[36px] p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <Realistic3DIcon type={item.iconType} size="lg" className="mb-6" />

                  <h3 className="text-lg font-[800] text-[#080808] dark:text-white font-display tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#1E293B] dark:text-[#E2E8F0] mb-2 leading-relaxed">
                    {item.lead}
                  </div>

                  <p className="text-xs text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.75]">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-7 pt-3 text-[10px] font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-[2px]">
                  {item.badge}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
