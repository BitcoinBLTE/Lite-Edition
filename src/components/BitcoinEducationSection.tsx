import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Coins, 
  Network, 
  Sparkles, 
  AlertTriangle, 
  Key, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Flame,
  Zap,
  Globe2,
  FileText
} from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';

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

  return (
    <section id="bitcoin-education" className="py-20 md:py-28 bg-white border-b border-[#E5E5E5] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] mb-3.5 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] font-display tracking-tight text-balance leading-[1.15]">
            {t.education.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4A4A] font-[450] leading-[1.8] text-balance">
            {t.education.description}
          </p>
        </div>

        {/* Tab Navigation / Filter (Styled to exact reference) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-[18px] mb-10 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-[#080808] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E5E5]'
                : 'text-[#4A4A4A] hover:text-[#080808] hover:bg-white/60 dark:text-[#A1A1AA] dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            {t.education.tabs.overview}
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer ${
              activeTab === 'how-it-works'
                ? 'bg-white text-[#080808] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E5E5]'
                : 'text-[#4A4A4A] hover:text-[#080808] hover:bg-white/60 dark:text-[#A1A1AA] dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            {t.education.tabs.how_it_works}
          </button>
          <button
            onClick={() => setActiveTab('supply')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer ${
              activeTab === 'supply'
                ? 'bg-white text-[#080808] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E5E5]'
                : 'text-[#4A4A4A] hover:text-[#080808] hover:bg-white/60 dark:text-[#A1A1AA] dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            {t.education.tabs.supply}
          </button>
          <button
            onClick={() => setActiveTab('genesis')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-[14px] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'genesis'
                ? 'bg-[#B8661B] text-white shadow-[0_2px_8px_rgba(184,102,27,0.25)]'
                : 'text-[#4A4A4A] hover:text-[#B8661B] hover:bg-white/60 dark:text-[#A1A1AA] dark:hover:text-[#B8661B] dark:hover:bg-white/10'
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
              <div className="lg:col-span-7 bg-[#FCFCFC] rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.05)] space-y-5">
                <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px]">
                  {t.education.tab1.def_kicker}
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] font-display tracking-tight">
                  {t.education.tab1.def_title}
                </h3>
                <p className="text-[#4A4A4A] font-[450] leading-[1.8] text-sm sm:text-base">
                  {t.education.tab1.p1}
                </p>
                <p className="text-[#4A4A4A] font-[450] leading-[1.8] text-sm sm:text-base">
                  {t.education.tab1.p2}
                </p>

                <div className="pt-4 border-t border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[16px] bg-white border border-[#E5E5E5]">
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider block">{t.education.tab1.asset_class_label}</span>
                    <strong className="text-sm font-bold text-[#080808] block mt-1">{t.education.tab1.asset_class_val}</strong>
                  </div>
                  <div className="p-4 rounded-[16px] bg-white border border-[#E5E5E5]">
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider block">{t.education.tab1.settlement_label}</span>
                    <strong className="text-sm font-bold text-[#080808] block mt-1">{t.education.tab1.settlement_val}</strong>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FCFCFC] rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.05)] space-y-5">
                <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px]">
                  {t.education.tab1.shift_kicker}
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] font-display tracking-tight">
                  {t.education.tab1.shift_title}
                </h3>
                <p className="text-[#4A4A4A] font-[450] leading-[1.8] text-sm sm:text-base">
                  {t.education.tab1.shift_intro}
                </p>
                <ul className="space-y-3.5 text-sm text-[#4A4A4A] font-[450]">
                  {t.education.tab1.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#B8661B] shrink-0 mt-1 stroke-[2.5]" />
                      <span className="leading-relaxed"><strong className="text-[#080808] font-bold">{pt.title}</strong> {pt.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Non-Affiliation Box */}
            <div className="p-7 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#FCFCFC] border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-[12px] bg-[#FAF5EF] border border-[#E9C9A5] text-[#B8661B] flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-[#4A4A4A] leading-[1.8]">
                <strong className="font-bold text-[#080808] block text-base font-display">{t.education.tab1.boundary_title}</strong>
                <p>
                  {t.education.tab1.boundary_desc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOW BITCOIN WORKS (DEEP DIVE INTO COMPONENTS) */}
        {activeTab === 'how-it-works' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="text-sm sm:text-base text-[#4A4A4A] font-[450] max-w-2xl leading-[1.8]">
              {t.education.tab2.intro}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.education.tab2.mechanisms.map((mech, index) => {
                const Icon = mechanismIcons[index] || Layers;
                return (
                  <div key={index} className="bg-[#FCFCFC] rounded-[28px] p-7 border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:border-[#D0D0D0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-all space-y-3">
                    <div className="w-11 h-11 rounded-[12px] bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#080808]">
                      <Icon className="w-5 h-5 stroke-[2] text-[#B8661B]" />
                    </div>
                    <div className="text-xs font-mono text-[#B8661B] uppercase font-bold tracking-[2px]">{mech.num}</div>
                    <h4 className="text-lg font-[800] text-[#080808] font-display tracking-tight">{mech.title}</h4>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] font-[450] leading-[1.75]">
                      {mech.desc}
                    </p>
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
              <div className="bg-[#FCFCFC] rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.05)] space-y-4">
                <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px]">
                  {t.education.tab3.supply_kicker}
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] font-display tracking-tight">
                  {t.education.tab3.supply_title}
                </h3>
                <p className="text-sm text-[#4A4A4A] font-[450] leading-[1.8]">
                  {t.education.tab3.supply_p1}
                </p>
                <p className="text-sm text-[#4A4A4A] font-[450] leading-[1.8]">
                  {t.education.tab3.supply_p2}
                </p>

                <div className="p-5 rounded-[20px] bg-white border border-[#E5E5E5] space-y-3 font-mono text-xs shadow-2xs">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E5E5]">
                    <span className="text-[#666666]">{t.education.tab3.btc_supply_label}:</span>
                    <strong className="text-[#080808] text-sm font-bold">21,000,000 BTC</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E5E5]">
                    <span className="text-[#666666]">{t.education.tab3.ble_supply_label}:</span>
                    <strong className="text-[#B8661B] text-sm font-bold">420,000 BLTE</strong>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[#166534] font-bold">
                    <span>{t.education.tab3.ratio_label}:</span>
                    <span>{t.education.tab3.ratio_val}</span>
                  </div>
                </div>

                <p className="text-xs text-[#888888] font-[450]">
                  {t.education.tab3.supply_footer}
                </p>
              </div>

              {/* Decentralization Card */}
              <div className="bg-[#FCFCFC] rounded-[32px] sm:rounded-[38px] p-7 sm:p-10 border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.05)] space-y-4">
                <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px]">
                  {t.education.tab3.decent_kicker}
                </div>
                <h3 className="text-2xl font-[800] text-[#080808] font-display tracking-tight">
                  {t.education.tab3.decent_title}
                </h3>
                <p className="text-sm text-[#4A4A4A] font-[450] leading-[1.8]">
                  {t.education.tab3.decent_desc}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-[16px] bg-white border border-[#E5E5E5]">
                    <strong className="text-xs font-mono uppercase text-[#080808] font-bold block mb-1">
                      {t.education.tab3.btc_decent_title}
                    </strong>
                    <p className="text-xs text-[#4A4A4A] font-[450] leading-[1.7]">
                      {t.education.tab3.btc_decent_desc}
                    </p>
                  </div>
                  <div className="p-4 rounded-[16px] bg-white border border-[#E5E5E5]">
                    <strong className="text-xs font-mono uppercase text-[#B8661B] font-bold block mb-1">
                      {t.education.tab3.sol_decent_title}
                    </strong>
                    <p className="text-xs text-[#4A4A4A] font-[450] leading-[1.7]">
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
            <div className="bg-[#FCFCFC] rounded-[32px] sm:rounded-[42px] p-8 sm:p-12 border border-[#E5E5E5] shadow-[0_4px_28px_rgba(0,0,0,0.05)] space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[3px]">
                <Sparkles className="w-4 h-4 text-[#B8661B]" />
                <span>{t.education.tab4.archive_kicker}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-[#080808] font-display tracking-tight">
                {t.education.tab4.title}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#4A4A4A] font-[450] leading-[1.8] sm:leading-[1.85]">
                <p>
                  {t.education.tab4.p1}
                  <em className="text-[#080808] font-serif block p-4 my-3 bg-white border-l-3 border-[#B8661B] rounded-r-[12px] shadow-2xs">
                    {t.education.tab4.quote}
                  </em>
                  {t.education.tab4.p2}
                </p>

                <p>
                  <strong className="text-[#080808] font-bold">{t.education.tab4.question_label}</strong> {t.education.tab4.question_body}
                </p>

                <p>
                  {t.education.tab4.conclusion}
                </p>
              </div>

              {/* Core Invariants of Genesis */}
              <div className="pt-6 border-t border-[#E5E5E5] grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.education.tab4.invariants.map((inv, idx) => (
                  <div key={idx} className="p-6 rounded-[22px] bg-[#FAF5EF] border border-[#E9C9A5]/80 space-y-2">
                    <span className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2px] block">{inv.tag}</span>
                    <h4 className="text-base font-[800] text-[#080808] font-display">{inv.title}</h4>
                    <p className="text-xs text-[#4A4A4A] font-[450] leading-[1.75]">
                      {inv.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Comparison & Action CTA */}
              <div className="pt-6 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono font-medium text-[#666666]">
                  <span>{t.education.tab4.immutable_state}</span>
                  <span className="mx-2">·</span>
                  <span>{t.education.tab4.token_standard}</span>
                  <span className="mx-2">·</span>
                  <span className="text-[#B8661B] font-bold">{t.education.tab4.on_chain_verifiable}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenWhitePaper}
                    className="px-5 py-3 text-xs font-semibold text-[#222222] bg-white hover:bg-[#F9F9F9] hover:border-[#CCCCCC] border border-[#D9D9D9] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#B8661B]" />
                    <span>{t.education.tab4.btn_whitepaper}</span>
                  </button>

                  {onOpenEducationModal && (
                    <button
                      onClick={onOpenEducationModal}
                      className="px-5 py-3 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-colors cursor-pointer"
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
