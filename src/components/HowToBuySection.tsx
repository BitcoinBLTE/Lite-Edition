import React, { useState } from 'react';
import { 
  Wallet, 
  Key, 
  Coins, 
  ArrowRightLeft, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Check, 
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { RaydiumIcon } from './PlatformIcons';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

interface HowToBuySectionProps {
  onOpenTradeModal: () => void;
}

export const HowToBuySection: React.FC<HowToBuySectionProps> = ({
  onOpenTradeModal
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const step3DIcons: Realistic3DIconType[] = [
    'acquisition',
    'token-supply',
    'liquidity',
    'mint',
    'slippage',
    'verification',
    'transactions',
  ];

  const handleCopy = () => {
    if (!TOKEN_CONFIG.mintAddress) return;
    navigator.clipboard.writeText(TOKEN_CONFIG.mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepIcons = [Wallet, Key, Coins, ArrowRightLeft, Search, ShieldCheck, CheckCircle2];

  const steps = t.how_to_buy.steps.map((st, index) => {
    let actionLabel: string | null = null;
    let action: (() => void) | null = null;

    if (index === 3) {
      actionLabel = t.how_to_buy.venue_action;
      action = onOpenTradeModal;
    } else if (index === 4) {
      actionLabel = TOKEN_CONFIG.mintAddress ? (copied ? t.common.copied : t.common.copy) : t.how_to_buy.pending_action;
      action = handleCopy;
    } else if (index === 5) {
      actionLabel = t.how_to_buy.portal_action;
      action = onOpenTradeModal;
    }

    return {
      ...st,
      icon: stepIcons[index] || Wallet,
      actionLabel,
      action,
    };
  });

  return (
    <section id="how-to-buy" className="py-20 md:py-28 bg-[#FAF8F5] dark:bg-[#08080C] scroll-mt-16 transition-colors border-t border-[#D8D1C4] dark:border-[#1E1E26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.how_to_buy.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.how_to_buy.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.how_to_buy.subtitle}
          </p>
        </div>

        {/* 7-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {steps.map((st, index) => {
            const Icon = st.icon;
            const isLast = index === steps.length - 1;
            const isDexStep = index === 3;

            return (
              <div
                key={st.step}
                className={`rounded-[28px] sm:rounded-[36px] p-7 sm:p-8 border-2 border-[#D8D1C4] dark:border-[#282836] shadow-[0_6px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.4)] hover:border-[#B8661B] dark:hover:border-[#EAB308] hover:shadow-[0_10px_32px_rgba(184,102,27,0.12)] transition-all flex flex-col justify-between group ${
                  isLast ? 'md:col-span-2 lg:col-span-1 xl:col-span-2 card-last-step' : 'bg-white dark:bg-[#121217]'
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-8 h-8 rounded-[10px] bg-[#FAF8F5] dark:bg-[#181820] border-2 border-[#D8D1C4] dark:border-[#2E2E3E] flex items-center justify-center font-mono text-xs font-bold text-[#080808] dark:text-white group-hover:bg-[#FAF5EF] dark:group-hover:bg-[#1C1712] group-hover:text-[#B8661B] dark:group-hover:text-[#F59E0B] group-hover:border-[#B8661B] dark:group-hover:border-[#EAB308] transition-colors">
                      {st.step}
                    </span>
                    <Realistic3DIcon type={step3DIcons[index] || 'wallet'} size="md" />
                  </div>

                  <h3 className="text-base sm:text-lg font-[800] text-[#080808] dark:text-white font-display tracking-tight mb-1.5">
                    {st.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#1E293B] dark:text-[#E2E8F0] mb-2 leading-relaxed">
                    {st.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.75]">
                    {st.description}
                  </p>

                  {/* DEX Platform Logos on Step 4 */}
                  {isDexStep && (
                    <div className="mt-4 pt-3.5 border-t-2 border-[#D8D1C4] dark:border-[#282836] flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-[#FAF8F5] dark:bg-[#181820] border-2 border-[#D8D1C4] dark:border-[#282836] text-[11px] font-mono font-bold text-[#080808] dark:text-white shadow-2xs">
                        <RaydiumIcon size={16} />
                        <span>Raydium</span>
                      </div>
                    </div>
                  )}
                </div>

                {st.actionLabel && (
                  <div className="mt-6 pt-4 border-t-2 border-[#D8D1C4] dark:border-[#282836]">
                    <button
                      onClick={st.action || undefined}
                      className="text-xs sm:text-sm font-bold text-[#B8661B] dark:text-[#F59E0B] hover:text-[#964E10] dark:hover:text-[#FBBF24] flex items-center gap-1.5 transition-colors cursor-pointer group"
                    >
                      <span>{st.actionLabel}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Safety, Security & Anti-Phishing Advisory Notice Box */}
        <div className="bg-white dark:bg-[#121217] rounded-[32px] sm:rounded-[40px] border-2 border-[#B8661B] dark:border-[#F59E0B]/70 p-8 sm:p-12 shadow-[0_8px_32px_rgba(184,102,27,0.10)] dark:shadow-[0_8px_32px_rgba(245,158,11,0.16)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <Realistic3DIcon type="shield" size="lg" className="shrink-0 mt-0.5" />

              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold uppercase tracking-[2.5px] text-[#B8661B] dark:text-[#EAB308] flex items-center gap-2">
                  <span>{t.how_to_buy.advisory_kicker}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                  {t.how_to_buy.advisory_title}
                </h4>

                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] max-w-3xl">
                  {t.how_to_buy.advisory_desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs font-semibold text-[#080808] dark:text-white">
                  {t.how_to_buy.security_items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] dark:bg-[#4ADE80] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <button
                onClick={onOpenTradeModal}
                className="px-7 py-4 text-xs sm:text-sm font-bold rounded-[16px] bg-[#111111] dark:bg-[#B8661B] hover:bg-[#B8661B] dark:hover:bg-[#D97706] text-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <span>{t.how_to_buy.btn_trade_portal}</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>

              <a
                href={TOKEN_CONFIG.stakingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 text-xs sm:text-sm font-bold rounded-[16px] bg-[#FAF5EF] dark:bg-[#1C1712] hover:bg-[#F2E8DC] dark:hover:bg-[#251E17] text-[#B8661B] dark:text-[#F59E0B] border border-[#E9C9A5] dark:border-[#B8661B]/40 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap group"
                title="Stake BLTE on Streamflow (11.61% APY)"
              >
                <span>STAKE</span>
                <span className="text-[10px] font-sans font-extrabold px-1.5 py-0.5 rounded-full bg-[#B8661B] text-white leading-none">
                  11.61% APY
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
