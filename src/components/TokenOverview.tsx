import React, { useState } from 'react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

export const TokenOverview: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!TOKEN_CONFIG.mintAddress) return;
    navigator.clipboard.writeText(TOKEN_CONFIG.mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specs: Array<{
    label: string;
    value: string;
    mono: boolean;
    iconType: Realistic3DIconType;
  }> = [
    { label: t.token_overview.specs.token_name, value: TOKEN_CONFIG.name, mono: false, iconType: 'blte' },
    { label: t.token_overview.specs.token_symbol, value: TOKEN_CONFIG.symbol, mono: true, iconType: 'bitcoin' },
    { label: t.token_overview.specs.blockchain_network, value: TOKEN_CONFIG.network, mono: false, iconType: 'solana' },
    { label: t.token_overview.specs.total_supply, value: `${TOKEN_CONFIG.shortSupply} ${t.token_overview.specs.tokens_suffix}`, mono: true, iconType: 'token-supply' },
    { label: t.token_overview.specs.token_standard, value: TOKEN_CONFIG.tokenStandard, mono: false, iconType: 'architecture' },
    { label: t.token_overview.specs.decimals, value: TOKEN_CONFIG.decimals.toString(), mono: true, iconType: 'verification' },
  ];

  const explorerUrl = TOKEN_CONFIG.mintAddress
    ? `https://solscan.io/token/${TOKEN_CONFIG.mintAddress}`
    : `https://solscan.io`;

  return (
    <section id="token" className="py-20 md:py-28 bg-[#FAF8F5] dark:bg-[#070709] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-14">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.token_overview.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.token_overview.title}
          </h2>

          {/* Infographic Photo: Architectural Overview & Token Specifications */}
          <div className="relative my-6 sm:my-8 rounded-[20px] sm:rounded-[30px] overflow-hidden bg-white dark:bg-[#0A0A0E] shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_44px_rgba(0,0,0,0.5)] group/archInfo">
            <img
              src="/assets/aistudio/Learn_more_e8898747.jpg"
              alt="Architectural Overview & Token Specifications - Built on Solana, 2.1M Tokens"
              className="w-full h-auto object-contain rounded-[20px] sm:rounded-[30px] mx-auto transition-transform duration-700 group-hover/archInfo:scale-[1.01]"
              loading="lazy"
            />
            {/* Topic Animation: Project Architecture & Connected Systems Movement */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px] sm:rounded-[30px]"
            >
              <div className="absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-[#EAB308]/15 dark:via-[#EAB308]/20 to-transparent animate-speed-sweep" />
              {/* Architecture cross-section nodes */}
              <div className="absolute top-[30%] left-[25%] w-2 h-2 rounded-full bg-[#B8661B] animate-node-pulse-a shadow-[0_0_8px_rgba(184,102,27,0.8)]" />
              <div className="absolute top-[30%] left-[50%] w-2.5 h-2.5 rounded-full bg-[#10B981] animate-node-pulse-b shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
              <div className="absolute top-[30%] right-[25%] w-2 h-2 rounded-full bg-[#3B82F6] animate-node-pulse-a shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </div>
          </div>

          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.token_overview.subtitle}
          </p>
        </div>

        {/* Dashboard Editorial Container with Realistic 3D Crypto & Fintech Icons */}
        <div className="bg-white/95 dark:bg-[#121217]/95 rounded-[32px] sm:rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden backdrop-blur-sm">
          {/* Top Specification Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.04] dark:divide-white/[0.06] border-b border-black/[0.04] dark:border-white/[0.06]">
            {specs.map((spec, index) => (
              <div 
                key={index} 
                className={`p-7 sm:p-9 ${index >= 3 ? 'sm:border-t sm:border-black/[0.04] dark:sm:border-white/[0.06]' : ''} flex items-start justify-between gap-4 group/spec hover:bg-[#FAF8F5]/80 dark:hover:bg-[#181820]/80 transition-colors`}
              >
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] font-bold uppercase tracking-[2px] mb-2.5">
                    {spec.label}
                  </div>
                  <div className={`text-xl sm:text-2xl font-[800] text-[#080808] dark:text-white ${spec.mono ? 'font-mono tabular-nums' : 'font-display tracking-tight'}`}>
                    {spec.value}
                  </div>
                </div>

                <Realistic3DIcon type={spec.iconType} size="md" className="shrink-0 mt-0.5" />
              </div>
            ))}
          </div>

          {/* Contract / Mint Address Section */}
          <div className="p-7 sm:p-10 bg-[#FAF8F5]/70 dark:bg-[#15151C]/70">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <Realistic3DIcon type="contract" size="sm" />
                  <div className="text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-[2.5px] flex items-center gap-2.5">
                    <span>{t.token_overview.contract_label}</span>
                    <span aria-hidden="true" className="text-[#D9D9D9] dark:text-[#33333F]">·</span>
                    <span className="text-[#64748B] dark:text-[#94A3B8]">{t.token_overview.authentic_id}</span>
                  </div>
                </div>

                {TOKEN_CONFIG.mintAddress ? (
                  <div className="font-mono text-sm sm:text-base font-bold text-[#080808] dark:text-white break-all bg-white dark:bg-[#121217] p-4 rounded-[18px] shadow-sm select-all">
                    {TOKEN_CONFIG.mintAddress}
                  </div>
                ) : (
                  <div className="bg-[#FAF5EF] dark:bg-[#1C1712] rounded-[20px] p-5 text-xs sm:text-sm text-[#080808] dark:text-white shadow-sm">
                    <p className="font-bold text-[#080808] dark:text-white font-display text-sm">
                      {t.token_overview.deployment_pending_title}
                    </p>
                    <p className="mt-1 text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.7]">
                      {t.token_overview.deployment_pending_desc}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                <button
                  onClick={handleCopy}
                  disabled={!TOKEN_CONFIG.mintAddress}
                  className={`px-5 py-3.5 text-xs font-bold rounded-[16px] transition-all flex items-center justify-center whitespace-nowrap shadow-sm hover:shadow-md cursor-pointer ${
                    TOKEN_CONFIG.mintAddress
                      ? 'bg-white dark:bg-[#181820] hover:bg-[#FAF8F5] dark:hover:bg-[#22222A] text-[#222222] dark:text-white'
                      : 'bg-[#F5F5F5] dark:bg-[#181820] text-[#888888] dark:text-[#64748B] cursor-not-allowed'
                  }`}
                  title={TOKEN_CONFIG.mintAddress ? t.token_overview.copy_address : t.token_overview.deployment_pending_title}
                >
                  <span>{copied ? t.token_overview.copied_address : t.token_overview.copy_address}</span>
                </button>

                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-bold rounded-[16px] bg-[#111111] dark:bg-[#B8661B] hover:bg-[#B8661B] dark:hover:bg-[#D97706] text-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer group"
                >
                  <Realistic3DIcon type="explorer" size="sm" className="-my-1" />
                  <span>{t.token_overview.view_explorer}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
