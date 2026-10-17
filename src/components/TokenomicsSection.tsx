import React from 'react';
import { TokenomicsCircleDesign } from './TokenomicsCircleDesign';
import { useLanguage } from '../i18n/LanguageContext';

export const TokenomicsSection: React.FC = () => {
  const { t } = useLanguage();
  const tok = t.tokenomics;

  return (
    <section id="tokenomics" className="py-16 md:py-24 bg-white dark:bg-[#08080C] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] dark:bg-[#EAB308] shrink-0" aria-hidden="true" />
            <span>{tok.kicker || 'DISTRIBUTION STRUCTURE · MATHEMATICAL SCARCITY'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-[#080808] dark:text-white font-display tracking-tight leading-[1.15]">
            {tok.title || '2.1M TOTAL SUPPLY'}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#475569] dark:text-[#CBD5E1] font-[450] leading-[1.75]">
            {tok.subtitle || 'A strictly capped token distribution configured across two strategic allocations only. No minting backdoor, zero hidden inflation.'}
          </p>
        </div>

        {/* Circular Tokenomic Architecture Design */}
        <TokenomicsCircleDesign showTitle={false} />
      </div>
    </section>
  );
};
