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

  const transparency3DTypes: Realistic3DIconType[] = ['ledger', 'keys', 'lock', 'shield', 'speed', 'verification'];
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
    <section id="transparency" className="py-20 md:py-28 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.transparency.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] font-display tracking-tight text-balance leading-[1.15]">
            {t.transparency.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4A4A] font-[450] leading-[1.8] text-balance">
            {t.transparency.subtitle}
          </p>
        </div>

        {/* 6 Transparency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            return (
              <div
                key={card.title}
                className="bg-[#FCFCFC] rounded-[28px] sm:rounded-[36px] p-7 sm:p-8 border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:border-[#D0D0D0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-[2px]">
                      {card.subtitle}
                    </span>
                    <Realistic3DIcon type={card.iconType} size="md" />
                  </div>

                  <h3 className="text-xl font-[800] text-[#080808] font-display tracking-tight mb-2">
                    {card.title}
                  </h3>

                  <div className="text-base font-mono font-bold text-[#080808] my-2">
                    {card.primaryValue}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A4A4A] font-[450] leading-[1.75] mt-2">
                    {card.detail}
                  </p>
                </div>

                <div className="mt-7 pt-4 border-t border-[#E5E5E5]">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B8661B] hover:text-[#964E10] transition-colors group/link"
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
