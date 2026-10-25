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
        <div className="max-w-4xl mb-14 sm:mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.about.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.about.title}
          </h2>

          {/* Infographic Photo: What is Bitcoin Lite Edition? */}
          <div className="relative my-6 sm:my-8 rounded-[20px] sm:rounded-[30px] overflow-hidden bg-white dark:bg-[#0A0A0E] shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_44px_rgba(0,0,0,0.5)] group/aboutInfo">
            <img
              src="/assets/aistudio/BLTE_explain_e0101186.jpg"
              alt="What is Bitcoin Lite Edition? Ultra-scarce supply, sub-second speed, negligible fees, and radical transparency on Solana."
              className="w-full h-auto object-contain rounded-[20px] sm:rounded-[30px] mx-auto transition-transform duration-700 group-hover/aboutInfo:scale-[1.01]"
              loading="lazy"
            />
            {/* Topic Animation: Ongoing Innovation & Connected Systems Data Wave */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px] sm:rounded-[30px]"
            >
              <div className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-[#EAB308]/15 dark:via-[#EAB308]/20 to-transparent animate-speed-sweep" />
              {/* Interconnected circuit beacons */}
              <div className="absolute top-[28%] left-[20%] w-2 h-2 rounded-full bg-[#B8661B] animate-node-pulse-a shadow-[0_0_8px_rgba(184,102,27,0.8)]" />
              <div className="absolute top-[28%] left-[42%] w-2 h-2 rounded-full bg-[#10B981] animate-node-pulse-b shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div className="absolute top-[28%] left-[64%] w-2 h-2 rounded-full bg-[#3B82F6] animate-node-pulse-a shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <div className="absolute top-[28%] left-[84%] w-2 h-2 rounded-full bg-[#8B5CF6] animate-node-pulse-b shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            </div>
          </div>

          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.about.description}
          </p>
        </div>

        {/* Architectural Foundation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {t.about.pillars.map((feat, index) => {
            const isWide = index === t.about.pillars.length - 1; // 7th feature spans across
            const isScarcity = index === 0;
            const isTransparency = index === 3;
            const isDecentralization = index === 4;

            return (
              <div
                key={feat.kicker}
                className={`relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${
                  isWide ? 'md:col-span-2 lg:col-span-3 pillar-distinction-card' : 'bg-white dark:bg-[#121218]'
                }`}
              >
                {/* Topic Specific Animation Overlays */}
                {isDecentralization && (
                  <div aria-hidden="true" className="absolute top-4 right-4 w-28 h-20 pointer-events-none opacity-40 group-hover:opacity-85 transition-opacity">
                    <svg viewBox="0 0 100 70" className="w-full h-full">
                      {/* Interconnected filaments without a single central hub */}
                      <line x1="20" y1="20" x2="50" y2="15" stroke="#B8661B" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="50" y1="15" x2="85" y2="30" stroke="#B8661B" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="85" y1="30" x2="65" y2="58" stroke="#B8661B" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="65" y1="58" x2="25" y2="52" stroke="#B8661B" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="25" y1="52" x2="20" y2="20" stroke="#B8661B" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="50" y1="15" x2="25" y2="52" stroke="#B8661B" strokeWidth="0.8" strokeDasharray="2 2" />
                      <line x1="20" y1="20" x2="85" y2="30" stroke="#B8661B" strokeWidth="0.8" strokeDasharray="2 2" />
                      {/* Distributed Nodes */}
                      <circle cx="20" cy="20" r="3.5" fill="#B8661B" className="animate-node-pulse-a" />
                      <circle cx="50" cy="15" r="3" fill="#EAB308" className="animate-node-pulse-b" />
                      <circle cx="85" cy="30" r="3.5" fill="#B8661B" className="animate-node-pulse-a" />
                      <circle cx="65" cy="58" r="3" fill="#EAB308" className="animate-node-pulse-b" />
                      <circle cx="25" cy="52" r="3.5" fill="#B8661B" className="animate-node-pulse-a" />
                    </svg>
                  </div>
                )}

                {isTransparency && (
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent -translate-y-full group-hover:translate-y-[400%] transition-transform duration-1000 ease-in-out" />
                  </div>
                )}

                {isScarcity && (
                  <div aria-hidden="true" className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#B8661B]/15 to-transparent blur-2xl pointer-events-none animate-circuit-pulse" />
                )}

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
