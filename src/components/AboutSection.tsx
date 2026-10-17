import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const pillar3DIcons: Realistic3DIconType[] = [
    'token-supply',
    'execution',
    'security',
    'transparency',
    'decentralization',
    'verification',
    'architecture',
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF8F5] dark:bg-[#08080C] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.about.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.about.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.about.description}
          </p>
        </div>

        {/* Architectural Foundation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {t.about.pillars.map((feat, index) => {
            const isWide = index === t.about.pillars.length - 1; // 7th feature spans across
            return (
              <div
                key={feat.kicker}
                className={`rounded-[28px] sm:rounded-[36px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${
                  isWide ? 'md:col-span-2 lg:col-span-3 pillar-distinction-card' : 'bg-white dark:bg-[#121218]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Realistic3DIcon type={pillar3DIcons[index] || 'scarcity'} size="lg" />
                    <span className="text-xs font-mono font-semibold text-[#64748B] dark:text-[#A1A1AA] tracking-wider uppercase">
                      {feat.highlight}
                    </span>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-[2.5px] text-[#B8661B] dark:text-[#EAB308] font-bold mb-2">
                    {feat.kicker}
                  </div>
                  
                  <h3 className="text-xl font-[800] text-[#080808] dark:text-white font-display tracking-tight mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#1E293B] dark:text-[#E2E8F0] mb-2 leading-relaxed">
                    {feat.summary}
                  </p>

                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.75]">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#166534] dark:text-[#4ADE80]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] dark:text-[#4ADE80]" />
                    <span>{feat.verified || 'Verified'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
