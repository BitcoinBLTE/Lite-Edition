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
    <section id="token" className="py-20 md:py-28 bg-[#FAF8F5] dark:bg-[#070709] scroll-mt-16 transition-colors border-t border-[#D8D1C4] dark:border-[#1E1E26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.token_overview.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.token_overview.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.token_overview.subtitle}
          </p>
        </div>

        {/* Dashboard Editorial Container with Realistic 3D Crypto & Fintech Icons */}
        <div className="bg-white dark:bg-[#121217] rounded-[32px] sm:rounded-[40px] border-2 border-[#D8D1C4] dark:border-[#282836] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Top Specification Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D8D1C4] dark:divide-[#282836] border-b-2 border-[#D8D1C4] dark:border-[#282836]">
            {specs.map((spec, index) => (
              <div 
                key={index} 
                className={`p-7 sm:p-9 ${index >= 3 ? 'sm:border-t-2 sm:border-[#D8D1C4] dark:sm:border-[#282836]' : ''} flex items-start justify-between gap-4 group/spec hover:bg-[#FAF8F5] dark:hover:bg-[#181820] transition-colors`}
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
          <div className="p-7 sm:p-10 bg-[#FAF8F5] dark:bg-[#15151C]">
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
                  <div className="font-mono text-sm sm:text-base font-bold text-[#080808] dark:text-white break-all bg-white dark:bg-[#121217] p-4 rounded-[16px] border-2 border-[#D8D1C4] dark:border-[#282836] select-all shadow-2xs">
                    {TOKEN_CONFIG.mintAddress}
                  </div>
                ) : (
                  <div className="bg-[#FAF5EF] dark:bg-[#1C1712] border-2 border-[#E9C9A5] dark:border-[#B8661B]/40 rounded-[20px] p-5 text-xs sm:text-sm text-[#080808] dark:text-white">
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
                  className={`px-5 py-3.5 text-xs font-bold rounded-[16px] border-2 transition-all flex items-center justify-center whitespace-nowrap ${
                    TOKEN_CONFIG.mintAddress
                      ? 'bg-white dark:bg-[#181820] hover:bg-[#FAF8F5] dark:hover:bg-[#22222A] text-[#222222] dark:text-white border-[#D8D1C4] dark:border-[#333345] hover:border-[#B8661B] dark:hover:border-[#EAB308] shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer'
                      : 'bg-[#F5F5F5] dark:bg-[#181820] text-[#888888] dark:text-[#64748B] border-[#D8D1C4] dark:border-[#262633] cursor-not-allowed'
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
