import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Coins, 
  Network, 
  Sparkles, 
  Key, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Flame,
  Zap,
  Globe2,
  FileText,
  Download
} from 'lucide-react';
import { TOKEN_CONFIG, getWhitepaperPdfUrl, downloadWhitepaperPdf } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

interface BitcoinEducationSectionProps {
  onOpenWhitePaper: () => void;
  onOpenEducationModal?: () => void;
}

export const BitcoinEducationSection: React.FC<BitcoinEducationSectionProps> = ({
  onOpenWhitePaper,
  onOpenEducationModal
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'how-it-works' | 'supply' | 'genesis'>('overview');

  const mechanismIcons = [Layers, Coins, Network, Cpu, FileText, Key];
  const mechanism3DIcons: Realistic3DIconType[] = ['architecture', 'utxo', 'mining', 'keys', 'halving', 'decentralization'];

  return (
    <section id="bitcoin-education" className="py-20 md:py-28 bg-[#FAF8F5] dark:bg-[#070709] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] dark:text-white font-display tracking-tight text-balance leading-[1.15]">
            {t.education.title}
          </h2>

          {/* Infographic Photo: Learn More About Bitcoin & The Genesis of Lite Edition */}
          <div className="my-6 sm:my-8 rounded-[20px] sm:rounded-[30px] overflow-hidden bg-white dark:bg-[#0A0A0E] shadow-[0_10px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_44px_rgba(0,0,0,0.5)]">
            <img
              src="/assets/aistudio/Learn_more_d3ca6810.jpg"
              alt="Learn More About Bitcoin & The Genesis of Lite Edition - Distributed Ledgers, Solana, and BLTE"
              className="w-full h-auto object-contain rounded-[20px] sm:rounded-[30px] mx-auto"
              loading="lazy"
            />
          </div>

          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-balance">
            {t.education.description}
          </p>
        </div>

        {/* Tab Navigation / Filter */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EFECE6]/70 dark:bg-[#15151B] rounded-[20px] mb-10 w-fit shadow-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-[#20202A] text-[#080808] dark:text-white shadow-sm'
                : 'text-[#475569] hover:text-[#080808] hover:bg-white/60 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            {t.education.tabs.overview}
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer ${
              activeTab === 'how-it-works'
                ? 'bg-white dark:bg-[#20202A] text-[#080808] dark:text-white shadow-sm'
                : 'text-[#475569] hover:text-[#080808] hover:bg-white/60 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            {t.education.tabs.how_it_works}
          </button>
          <button
            onClick={() => setActiveTab('supply')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer ${
              activeTab === 'supply'
                ? 'bg-white dark:bg-[#20202A] text-[#080808] dark:text-white shadow-sm'
                : 'text-[#475569] hover:text-[#080808] hover:bg-white/60 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            {t.education.tabs.supply}
          </button>
          <button
            onClick={() => setActiveTab('genesis')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'genesis'
                ? 'bg-[#B8661B] text-white shadow-[0_2px_8px_rgba(184,102,27,0.25)]'
                : 'text-[#475569] hover:text-[#B8661B] hover:bg-white/60 dark:text-[#94A3B8] dark:hover:text-[#F59E0B] dark:hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.education.tabs.genesis}</span>
          </button>
        </div>

        {/* TAB 1: WHAT IS BITCOIN & INFLUENCE */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white/95 dark:bg-[#121217]/95 rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.45)] space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-[2.5px]">
                    {t.education.tab1.def_kicker}
                  </div>
                  <Realistic3DIcon type="bitcoin" size="md" />
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] dark:text-white font-display tracking-tight">
                  {t.education.tab1.def_title}
                </h3>
                <p className="text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-sm sm:text-base">
                  {t.education.tab1.p1}
                </p>
                <p className="text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-sm sm:text-base">
                  {t.education.tab1.p2}
                </p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[18px] bg-[#FAF8F5] dark:bg-[#181820] shadow-xs">
                    <span className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">{t.education.tab1.asset_class_label}</span>
                    <strong className="text-sm font-bold text-[#080808] dark:text-white block mt-1">{t.education.tab1.asset_class_val}</strong>
                  </div>
                  <div className="p-4 rounded-[18px] bg-[#FAF8F5] dark:bg-[#181820] shadow-xs">
                    <span className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">{t.education.tab1.settlement_label}</span>
                    <strong className="text-sm font-bold text-[#080808] dark:text-white block mt-1">{t.education.tab1.settlement_val}</strong>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/95 dark:bg-[#121217]/95 rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.45)] space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-[2.5px]">
                    {t.education.tab1.shift_kicker}
                  </div>
                  <Realistic3DIcon type="solana" size="md" />
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] dark:text-white font-display tracking-tight">
                  {t.education.tab1.shift_title}
                </h3>
                <p className="text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] text-sm sm:text-base">
                  {t.education.tab1.shift_intro}
                </p>
                <ul className="space-y-3.5 text-sm text-[#475569] dark:text-[#94A3B8] font-[450]">
                  {t.education.tab1.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#B8661B] dark:text-[#F59E0B] shrink-0 mt-1 stroke-[2.5]" />
                      <span className="leading-relaxed"><strong className="text-[#080808] dark:text-white font-bold">{pt.title}</strong> {pt.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOW BITCOIN WORKS (DEEP DIVE INTO COMPONENTS) */}
        {activeTab === 'how-it-works' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] font-[450] max-w-2xl leading-[1.8]">
              {t.education.tab2.intro}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.education.tab2.mechanisms.map((mech, index) => {
                return (
                  <div key={index} className="bg-white/95 dark:bg-[#121217]/95 rounded-[28px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300 space-y-3">
                    <Realistic3DIcon type={mechanism3DIcons[index] || 'ledger'} size="md" />
                    <div className="text-xs font-mono text-[#B8661B] dark:text-[#EAB308] uppercase font-bold tracking-[2px]">{mech.num}</div>
                    <h4 className="text-lg font-[800] text-[#080808] dark:text-white font-display tracking-tight">{mech.title}</h4>
                    <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.75]">
                      {mech.desc}
                    </p>
                    {index === 5 && (
                      <div className="pt-2">
                        <div className="p-3 rounded-[16px] bg-[#FAF5EF] dark:bg-[#1C1712] border border-[#E9C9A5] dark:border-[#B8661B]/40 flex items-center gap-2.5 shadow-2xs">
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF5EF] dark:bg-[#221A12] text-[#B8661B] dark:text-[#EAB308] border border-[#E9C9A5] dark:border-[#B8661B]/40 shrink-0">
                            OFFICIAL WALLET
                          </span>
                          <span className="text-[11px] font-semibold text-[#B8661B] dark:text-[#EAB308]">
                            BLTE Wallet client for Bitcoin Lite Edition
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SUPPLY & DECENTRALIZATION COMPARISON */}
        {activeTab === 'supply' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Supply Card */}
              <div className="bg-white/95 dark:bg-[#121217]/95 rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.45)] space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-[2.5px]">
                    {t.education.tab3.supply_kicker}
                  </div>
                  <Realistic3DIcon type="token-supply" size="md" />
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] dark:text-white font-display tracking-tight">
                  {t.education.tab3.supply_title}
                </h3>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8]">
                  {t.education.tab3.supply_p1}
                </p>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8]">
                  {t.education.tab3.supply_p2}
                </p>

                <div className="p-5 rounded-[20px] bg-[#FAF8F5] dark:bg-[#181820] space-y-3 font-mono text-xs shadow-xs">
                  <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.04] dark:border-white/[0.06]">
                    <span className="text-[#64748B] dark:text-[#94A3B8]">{t.education.tab3.btc_supply_label}:</span>
                    <strong className="text-[#080808] dark:text-white text-sm font-bold">21.M BTC</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.04] dark:border-white/[0.06]">
                    <span className="text-[#64748B] dark:text-[#94A3B8]">{t.education.tab3.ble_supply_label}:</span>
                    <strong className="text-[#B8661B] dark:text-[#F59E0B] text-sm font-bold">2.1M BLTE</strong>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[#166534] dark:text-[#4ADE80] font-bold">
                    <span>{t.education.tab3.ratio_label}:</span>
                    <span>{t.education.tab3.ratio_val}</span>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-[450]">
                  {t.education.tab3.supply_footer}
                </p>
              </div>

              {/* Decentralization Card */}
              <div className="bg-white/95 dark:bg-[#121217]/95 rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.45)] space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-[2.5px]">
                    {t.education.tab3.decent_kicker}
                  </div>
                  <Realistic3DIcon type="decentralization" size="md" />
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] dark:text-white font-display tracking-tight">
                  {t.education.tab3.decent_title}
                </h3>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8]">
                  {t.education.tab3.decent_desc}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-[16px] bg-[#FAF8F5] dark:bg-[#181820] shadow-xs">
                    <strong className="text-xs font-mono uppercase text-[#080808] dark:text-white font-bold block mb-1">
                      {t.education.tab3.btc_decent_title}
                    </strong>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.7]">
                      {t.education.tab3.btc_decent_desc}
                    </p>
                  </div>
                  <div className="p-4 rounded-[16px] bg-[#FAF8F5] dark:bg-[#181820] shadow-xs">
                    <strong className="text-xs font-mono uppercase text-[#B8661B] dark:text-[#F59E0B] font-bold block mb-1">
                      {t.education.tab3.sol_decent_title}
                    </strong>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.7]">
                      {t.education.tab3.sol_decent_desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: THE GENESIS OF BITCOIN LITE EDITION */}
        {activeTab === 'genesis' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Main Genesis Narrative */}
            <div className="bg-white/95 dark:bg-[#121217]/95 rounded-[32px] sm:rounded-[42px] p-8 sm:p-12 shadow-[0_12px_44px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_44px_rgba(0,0,0,0.45)] space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-[3px]">
                  <Sparkles className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308]" />
                  <span>{t.education.tab4.archive_kicker}</span>
                </div>
                <Realistic3DIcon type="blte" size="md" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                {t.education.tab4.title}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.8] sm:leading-[1.85]">
                <p>
                  {t.education.tab4.p1}
                  <em className="text-[#080808] dark:text-[#F1F5F9] font-serif block p-4 my-3 bg-[#FAF8F5] dark:bg-[#181820] border-l-3 border-[#B8661B] rounded-r-[12px] shadow-2xs">
                    {t.education.tab4.quote}
                  </em>
                  {t.education.tab4.p2}
                </p>

                <p>
                  <strong className="text-[#080808] dark:text-white font-bold">{t.education.tab4.question_label}</strong> {t.education.tab4.question_body}
                </p>

                <p>
                  {t.education.tab4.conclusion}
                </p>
              </div>

              {/* Infographic Photo: Genesis & Technical Architecture */}
              <div className="pt-2">
                <div className="rounded-[22px] sm:rounded-[30px] overflow-hidden border border-[#E9C9A5]/60 dark:border-[#B8661B]/35 shadow-[0_8px_30px_rgba(184,102,27,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] bg-white dark:bg-[#0A0A0E]">
                  <img
                    src="/assets/aistudio/Btc_explain_de14705e.jpg"
                    alt="Genesis & Technical Architecture: From Bitcoin to a Bigger Vision, One Idea. A Global Movement."
                    className="w-full h-auto object-contain mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Core Invariants of Genesis */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.education.tab4.invariants.map((inv, idx) => (
                  <div key={idx} className="p-6 rounded-[22px] bg-[#FAF5EF] dark:bg-[#1C1712] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono font-bold text-[#B8661B] dark:text-[#EAB308] uppercase tracking-[2px] block">{inv.tag}</span>
                      <Realistic3DIcon type={['token-supply', 'execution', 'security'][idx] || 'token-supply'} size="sm" />
                    </div>
                    <h4 className="text-base font-[800] text-[#080808] dark:text-white font-display">{inv.title}</h4>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] font-[450] leading-[1.75]">
                      {inv.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Comparison & Action CTA */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono font-medium text-[#64748B] dark:text-[#94A3B8]">
                  <span>{t.education.tab4.immutable_state}</span>
                  <span className="mx-2">·</span>
                  <span>{t.education.tab4.token_standard}</span>
                  <span className="mx-2">·</span>
                  <span className="text-[#B8661B] dark:text-[#EAB308] font-bold">{t.education.tab4.on_chain_verifiable}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenWhitePaper}
                    className="px-5 py-3 text-xs font-semibold text-[#222222] dark:text-white bg-white dark:bg-[#18181D] hover:bg-[#F9F9F9] dark:hover:bg-[#222228] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#B8661B]" />
                    <span>{t.education.tab4.btn_whitepaper}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadWhitepaperPdf()}
                    className="p-3 text-[#4A4A4A] dark:text-[#A1A1AA] hover:text-[#B8661B] dark:hover:text-[#F59E0B] hover:bg-[#FAF5EF] dark:hover:bg-[#1C1712] bg-white dark:bg-[#18181D] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer flex items-center justify-center group"
                    title="Download White Paper PDF"
                    aria-label="Download White Paper PDF"
                  >
                    <Download className="w-4 h-4 text-[#B8661B] group-hover:scale-110 transition-transform" />
                  </button>

                  {onOpenEducationModal && (
                    <button
                      onClick={onOpenEducationModal}
                      className="px-5 py-3 text-xs font-bold text-white bg-[#111111] dark:bg-[#B8661B] hover:bg-[#B8661B] dark:hover:bg-[#D97706] rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-colors cursor-pointer"
                    >
                      {t.education.tab4.btn_deep_dive}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
