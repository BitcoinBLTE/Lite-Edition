import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Printer, 
  Copy, 
  Check
} from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { useLanguage } from '../i18n/LanguageContext';
import { Realistic3DIcon, Realistic3DIconType } from './Realistic3DIcon';

interface BitcoinEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitePaper: () => void;
}

export const BitcoinEducationModal: React.FC<BitcoinEducationModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitePaper
}) => {
  const { t } = useLanguage();
  const [activeChapter, setActiveChapter] = useState<'intro' | 'mechanisms' | 'scarcity' | 'genesis' | 'distinction'>('intro');
  const [copied, setCopied] = useState(false);

  const mechanism3DTypes: Realistic3DIconType[] = ['ledger', 'utxo', 'mining', 'keys', 'halving', 'nodes'];

  if (!isOpen) return null;

  const edu = t.modals.education_modal;

  const handleCopyGuide = () => {
    const text = `${edu.title}\n\n` +
      `1. ${edu.chapters.intro.title}\n${edu.chapters.intro.p1}\n${edu.chapters.intro.p2}\n\n` +
      `2. ${edu.chapters.mechanisms.title}\n` +
      edu.chapters.mechanisms.items.map((it, idx) => `${idx + 1}. ${it.title}: ${it.desc}`).join('\n') + '\n\n' +
      `3. ${edu.chapters.scarcity.title}\n${edu.chapters.scarcity.p1}\n${edu.chapters.scarcity.stat_btc}\n${edu.chapters.scarcity.stat_ble}\n\n` +
      `4. ${edu.chapters.genesis.title}\n${edu.chapters.genesis.p1}\n\n` +
      `5. ${edu.chapters.distinction.title}\n${edu.chapters.distinction.p1}\n${edu.chapters.distinction.p2}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={edu.title}
      subtitle={edu.subtitle}
      icon={<Realistic3DIcon type="ledger" size="sm" />}
      maxWidthClass="max-w-4xl"
      maxHeightClass="h-[88vh]"
      ariaLabelledBy="bitcoin-education-modal-title"
      headerActions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#080808] dark:text-white bg-[#FCFCFC] dark:bg-[#1E1E26] hover:bg-[#F5F5F5] dark:hover:bg-[#282834] border border-[#D9D9D9] dark:border-[#333342] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-colors cursor-pointer"
            title={t.common.copy}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#16A34A] dark:text-[#4ADE80]" />
                <span className="hidden sm:inline">{t.common.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#4A4A4A] dark:text-[#CBD5E1]" />
                <span className="hidden sm:inline">{t.common.copy}</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#080808] dark:text-white bg-[#FCFCFC] dark:bg-[#1E1E26] hover:bg-[#F5F5F5] dark:hover:bg-[#282834] border border-[#D9D9D9] dark:border-[#333342] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-colors cursor-pointer"
            title={t.common.print}
          >
            <Printer className="w-3.5 h-3.5 text-[#4A4A4A] dark:text-[#CBD5E1]" />
            <span>{t.common.print}</span>
          </button>
        </div>
      }
      footer={
        <div className="px-6 py-4 bg-[#FCFCFC] dark:bg-[#121217] border-t border-[#E5E5E5] dark:border-[#22222C] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#888888] dark:text-[#94A3B8] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] dark:bg-[#4ADE80]" />
            <span>{t.common.drag_hint}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenWhitePaper();
              }}
              className="text-[#B8661B] hover:text-[#964E10] dark:text-[#EAB308] dark:hover:text-[#FBBF24] font-bold underline underline-offset-4 cursor-pointer"
            >
              {t.nav.whitepaper}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 font-bold text-white bg-[#111111] hover:bg-[#B8661B] dark:bg-[#22222C] dark:hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      }
    >
      <div className="p-6 sm:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F5F5] dark:bg-[#14141A] border border-[#E5E5E5] dark:border-[#22222C] rounded-[16px]">
          <button
            onClick={() => setActiveChapter('intro')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-[12px] transition-all cursor-pointer ${
              activeChapter === 'intro' ? 'bg-white dark:bg-[#1F1F28] text-[#080808] dark:text-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-[#E5E5E5] dark:border-[#2E2E3C]' : 'text-[#4A4A4A] dark:text-[#94A3B8] hover:text-[#080808] dark:hover:text-white'
            }`}
          >
            {edu.tabs.intro}
          </button>
          <button
            onClick={() => setActiveChapter('mechanisms')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-[12px] transition-all cursor-pointer ${
              activeChapter === 'mechanisms' ? 'bg-white dark:bg-[#1F1F28] text-[#080808] dark:text-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-[#E5E5E5] dark:border-[#2E2E3C]' : 'text-[#4A4A4A] dark:text-[#94A3B8] hover:text-[#080808] dark:hover:text-white'
            }`}
          >
            {edu.tabs.mechanisms}
          </button>
          <button
            onClick={() => setActiveChapter('scarcity')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-[12px] transition-all cursor-pointer ${
              activeChapter === 'scarcity' ? 'bg-white dark:bg-[#1F1F28] text-[#080808] dark:text-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-[#E5E5E5] dark:border-[#2E2E3C]' : 'text-[#4A4A4A] dark:text-[#94A3B8] hover:text-[#080808] dark:hover:text-white'
            }`}
          >
            {edu.tabs.scarcity}
          </button>
          <button
            onClick={() => setActiveChapter('genesis')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-[12px] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeChapter === 'genesis' ? 'bg-[#B8661B] text-white shadow-[0_2px_8px_rgba(184,102,27,0.25)]' : 'text-[#4A4A4A] dark:text-[#94A3B8] hover:text-[#B8661B] dark:hover:text-[#EAB308]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{edu.tabs.genesis}</span>
          </button>
          <button
            onClick={() => setActiveChapter('distinction')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-[12px] transition-all cursor-pointer ${
              activeChapter === 'distinction' ? 'bg-white dark:bg-[#1F1F28] text-[#080808] dark:text-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-[#E5E5E5] dark:border-[#2E2E3C]' : 'text-[#4A4A4A] dark:text-[#94A3B8] hover:text-[#080808] dark:hover:text-white'
            }`}
          >
            {edu.tabs.distinction}
          </button>
        </div>

        {/* CHAPTER: WHAT IS BITCOIN */}
        {activeChapter === 'intro' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="border-b border-[#E5E5E5] dark:border-[#22222C] pb-4">
              <h4 className="text-xl sm:text-2xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                {edu.chapters.intro.title}
              </h4>
            </div>

            <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#CBD5E1] font-[450] leading-[1.8]">
              {edu.chapters.intro.p1}
            </p>

            <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#CBD5E1] font-[450] leading-[1.8]">
              {edu.chapters.intro.p2}
            </p>

            <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#CBD5E1] font-[450] leading-[1.8]">
              {edu.chapters.intro.p3}
            </p>
          </div>
        )}

        {/* CHAPTER: HOW BITCOIN WORKS */}
        {activeChapter === 'mechanisms' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="border-b border-[#E5E5E5] dark:border-[#22222C] pb-3">
              <h4 className="text-xl sm:text-2xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                {edu.chapters.mechanisms.title}
              </h4>
            </div>

            <div className="space-y-3">
              {edu.chapters.mechanisms.items.map((item, idx) => {
                const isWalletItem = item.title.toLowerCase().includes('wallet');
                return (
                  <div key={idx} className="p-5 rounded-[20px] bg-[#FCFCFC] dark:bg-[#15151C] border border-[#E5E5E5] dark:border-[#22222E] flex flex-col gap-2.5 shadow-xs hover:border-[#B8661B]/30 transition-colors">
                    <div className="flex items-start gap-3.5">
                      <Realistic3DIcon type={mechanism3DTypes[idx] || 'ledger'} size="sm" className="mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-[800] text-[#080808] dark:text-white font-display">
                          {item.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#CBD5E1] font-[450] mt-1 leading-[1.75]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {isWalletItem && (
                      <div className="mt-2 p-3 rounded-[16px] bg-gradient-to-r from-[#FAF5EF] to-white dark:from-[#201812] dark:to-[#161622] border-2 border-[#B8661B]/40 dark:border-[#EAB308]/50 flex items-center justify-between gap-3 shadow-[0_4px_16px_rgba(184,102,27,0.10)]">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Realistic3DIcon type="wallet" size="sm" className="shrink-0" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-mono font-black text-[#B8661B] dark:text-[#EAB308] uppercase tracking-wide truncate">
                                BLTE Wallet
                              </span>
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#B8661B] text-white shrink-0">
                                OFFICIAL CLIENT
                              </span>
                            </div>
                            <span className="text-[11px] text-[#475569] dark:text-[#CBD5E1] font-semibold block leading-tight mt-0.5">
                              Bitcoin Lite Edition dedicated client
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHAPTER: SUPPLY & DECENTRALIZATION */}
        {activeChapter === 'scarcity' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="border-b border-[#E5E5E5] dark:border-[#22222C] pb-3">
              <h4 className="text-xl sm:text-2xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                {edu.chapters.scarcity.title}
              </h4>
            </div>

            <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#CBD5E1] font-[450] leading-[1.8]">
              {edu.chapters.scarcity.p1}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-[20px] bg-[#FCFCFC] dark:bg-[#15151C] border border-[#E5E5E5] dark:border-[#22222E] space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#888888] dark:text-[#94A3B8] uppercase block font-bold">Bitcoin (BTC)</span>
                  <Realistic3DIcon type="ledger" size="sm" />
                </div>
                <div className="text-xl font-mono font-[900] text-[#080808] dark:text-white">{edu.chapters.scarcity.stat_btc}</div>
              </div>

              <div className="p-5 rounded-[20px] bg-[#FAF5EF] dark:bg-[#1C1712] border border-[#E9C9A5] dark:border-[#B8661B]/40 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#B8661B] dark:text-[#EAB308] uppercase block font-bold">Bitcoin Lite Edition (BLTE)</span>
                  <Realistic3DIcon type="scarcity" size="sm" />
                </div>
                <div className="text-xl font-mono font-[900] text-[#B8661B] dark:text-[#EAB308]">{edu.chapters.scarcity.stat_ble}</div>
              </div>
            </div>

            <div className="p-5 rounded-[20px] bg-white dark:bg-[#15151C] border border-[#E5E5E5] dark:border-[#22222E] space-y-2 text-xs sm:text-sm text-[#4A4A4A] dark:text-[#CBD5E1] leading-[1.8]">
              <span className="font-bold text-[#080808] dark:text-white block font-mono uppercase tracking-wider">
                {edu.chapters.scarcity.ratio}
              </span>
              <p>{edu.chapters.scarcity.p2}</p>
            </div>
          </div>
        )}

        {/* CHAPTER: GENESIS OF BITCOIN LITE EDITION */}
        {activeChapter === 'genesis' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="border-b border-[#E5E5E5] dark:border-[#22222C] pb-3">
              <h4 className="text-xl sm:text-2xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                {edu.chapters.genesis.title}
              </h4>
            </div>

            {/* Infographic Photo */}
            <div className="rounded-[20px] overflow-hidden border border-[#E9C9A5]/60 dark:border-[#B8661B]/30 shadow-md bg-white dark:bg-[#0A0A0E]">
              <img
                src="/assets/aistudio/Btc_explain_de14705e.jpg"
                alt="Genesis & Technical Architecture: From Bitcoin to a Bigger Vision, One Idea. A Global Movement."
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#4A4A4A] dark:text-[#CBD5E1] font-[450] leading-[1.8]">
              <p>{edu.chapters.genesis.p1}</p>

              {edu.chapters.genesis.quote && (
                <blockquote className="p-5 rounded-[18px] bg-[#FAF5EF] dark:bg-[#1C1712] border-l-4 border-[#B8661B] font-serif italic text-[#080808] dark:text-white">
                  {edu.chapters.genesis.quote}
                </blockquote>
              )}

              <p>{edu.chapters.genesis.p2}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {edu.chapters.genesis.invariants.map((inv, idx) => (
                  <div key={idx} className="p-4 rounded-[16px] bg-[#FCFCFC] dark:bg-[#15151C] border border-[#E5E5E5] dark:border-[#22222E] space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#080808] dark:text-white text-xs block font-display">{inv.title}</span>
                      <Realistic3DIcon type={['scarcity', 'execution', 'security'][idx] || 'scarcity'} size="sm" />
                    </div>
                    <p className="text-xs text-[#4A4A4A] dark:text-[#CBD5E1] leading-[1.7]">{inv.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER: FORMAL NON-AFFILIATION */}
        {activeChapter === 'distinction' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="border-b border-[#E5E5E5] dark:border-[#22222C] pb-3">
              <h4 className="text-xl sm:text-2xl font-[900] text-[#080808] dark:text-white font-display tracking-tight">
                {edu.chapters.distinction.title}
              </h4>
            </div>

            <div className="p-6 rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151C] border border-[#E5E5E5] dark:border-[#22222E] text-xs sm:text-sm text-[#4A4A4A] dark:text-[#CBD5E1] space-y-3 leading-[1.8]">
              <p className="font-bold text-[#080808] dark:text-white font-display text-base">{edu.chapters.distinction.p1}</p>
              <p>{edu.chapters.distinction.p2}</p>
              <p>{edu.chapters.distinction.p3}</p>
            </div>
          </div>
        )}
      </div>
    </DraggableModal>
  );
};
