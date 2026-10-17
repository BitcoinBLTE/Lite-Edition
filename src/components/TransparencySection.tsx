import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

export const TransparencySection: React.FC = () => {
  const { t } = useLanguage();

  const explorerUrl = TOKEN_CONFIG.mintAddress
    ? `https://solscan.io/token/${TOKEN_CONFIG.mintAddress}`
    : `https://solscan.io`;

  const transparency3DTypes: Realistic3DIconType[] = [
    'transparency',
    'security',
    'lock',
    'architecture',
    'explorer',
    'verification',
  ];
  const links = [
    explorerUrl,
    explorerUrl,
    explorerUrl,
    explorerUrl,
    'https://explorer.solana.com',
    explorerUrl
  ];

  const cards = t.transparency.cards.map((card, idx) => ({
    ...card,
    iconType: transparency3DTypes[idx] || 'verification',
    link: links[idx] || explorerUrl,
  }));

  return (
    <section id="transparency" className="py-20 md:py-28 bg-[#FAF8F5]/60 dark:bg-[#0A0A0E] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.transparency.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.transparency.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.transparency.subtitle}
          </p>
        </div>

        {/* 6 Transparency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            return (
              <div
                key={card.title}
                className="bg-white/95 dark:bg-[#121217]/95 rounded-[28px] sm:rounded-[36px] p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-[2px]">
                      {card.subtitle}
                    </span>
                    <Realistic3DIcon type={card.iconType} size="md" />
                  </div>

                  <h3 className="text-xl font-[800] text-[#080808] dark:text-white font-display tracking-tight mb-2">
                    {card.title}
                  </h3>

                  <div className="text-base font-mono font-bold text-[#080808] dark:text-white my-2">
                    {card.primaryValue}
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.75] mt-2">
                    {card.detail}
                  </p>
                </div>

                <div className="mt-7 pt-3">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B8661B] dark:text-[#F59E0B] hover:text-[#964E10] dark:hover:text-[#FBBF24] transition-colors group/link"
                  >
                    <span>{card.linkLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2] group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
