import React, { useState } from 'react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';

export const TokenOverview: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!TOKEN_CONFIG.mintAddress) return;
    navigator.clipboard.writeText(TOKEN_CONFIG.mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specs = [
    { label: t.token_overview.specs.token_name, value: TOKEN_CONFIG.name, mono: false },
    { label: t.token_overview.specs.token_symbol, value: TOKEN_CONFIG.symbol, mono: true },
    { label: t.token_overview.specs.blockchain_network, value: TOKEN_CONFIG.network, mono: false },
    { label: t.token_overview.specs.total_supply, value: `${TOKEN_CONFIG.shortSupply} ${t.token_overview.specs.tokens_suffix}`, mono: true },
    { label: t.token_overview.specs.token_standard, value: TOKEN_CONFIG.tokenStandard, mono: false },
    { label: t.token_overview.specs.decimals, value: TOKEN_CONFIG.decimals.toString(), mono: true },
  ];

  const explorerUrl = TOKEN_CONFIG.mintAddress
    ? `https://solscan.io/token/${TOKEN_CONFIG.mintAddress}`
    : `https://solscan.io`;

  return (
    <section id="token" className="py-20 md:py-28 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] mb-3.5 flex items-center gap-2.5">
            <span>{t.token_overview.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] font-display tracking-tight text-balance leading-[1.15]">
            {t.token_overview.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4A4A] font-[450] leading-[1.8] text-balance">
            {t.token_overview.subtitle}
          </p>
        </div>

        {/* Dashboard Editorial Container — Pure Minimalist Architectural Typography with Zero Icons */}
        <div className="bg-[#FCFCFC] rounded-[32px] sm:rounded-[40px] border border-[#E5E5E5] shadow-[0_4px_28px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Top Specification Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5] border-b border-[#E5E5E5]">
            {specs.map((spec, index) => (
              <div 
                key={index} 
                className={`p-7 sm:p-9 ${index >= 3 ? 'sm:border-t sm:border-[#E5E5E5]' : ''}`}
              >
                <div className="text-[10px] font-mono text-[#888888] font-bold uppercase tracking-[2px] mb-2.5">
                  {spec.label}
                </div>
                <div className={`text-xl sm:text-2xl font-[800] text-[#080808] ${spec.mono ? 'font-mono tabular-nums' : 'font-display tracking-tight'}`}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Contract / Mint Address Section */}
          <div className="p-7 sm:p-10 bg-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px] flex items-center gap-2.5">
                  <span>{t.token_overview.contract_label}</span>
                  <span aria-hidden="true" className="text-[#D9D9D9]">·</span>
                  <span className="text-[#888888]">{t.token_overview.authentic_id}</span>
                </div>

                {TOKEN_CONFIG.mintAddress ? (
                  <div className="font-mono text-sm sm:text-base font-bold text-[#080808] break-all bg-[#FCFCFC] p-4 rounded-[16px] border border-[#E5E5E5] select-all shadow-2xs">
                    {TOKEN_CONFIG.mintAddress}
                  </div>
                ) : (
                  <div className="bg-[#FAF5EF] border border-[#E9C9A5] rounded-[20px] p-5 text-xs sm:text-sm text-[#080808]">
                    <p className="font-bold text-[#080808] font-display text-sm">
                      {t.token_overview.deployment_pending_title}
                    </p>
                    <p className="mt-1 text-[#4A4A4A] font-[450] leading-[1.7]">
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
                  className={`px-5 py-3.5 text-xs font-bold rounded-[16px] border transition-all flex items-center justify-center whitespace-nowrap ${
                    TOKEN_CONFIG.mintAddress
                      ? 'bg-white hover:bg-[#F9F9F9] text-[#222222] border-[#D9D9D9] shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer'
                      : 'bg-[#F5F5F5] text-[#888888] border-[#E5E5E5] cursor-not-allowed'
                  }`}
                  title={TOKEN_CONFIG.mintAddress ? t.token_overview.copy_address : t.token_overview.deployment_pending_title}
                >
                  <span>{copied ? t.token_overview.copied_address : t.token_overview.copy_address}</span>
                </button>

                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 text-xs font-bold rounded-[16px] bg-[#111111] hover:bg-[#B8661B] text-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all flex items-center justify-center whitespace-nowrap cursor-pointer"
                >
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
