import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { RotatingCoinLogo } from './RotatingCoinLogo';
import { WhitePaperCircleTokenomics } from './WhitePaperCircleTokenomics';
import { useLanguage } from '../i18n/LanguageContext';

interface WhitePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitePaperModal: React.FC<WhitePaperModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('abstract');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const wp = t.modals.whitepaper;
  const chapters = wp.chapters;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const paperText = `${wp.doc_title}\n${wp.doc_sub}\n\n` +
      chapters.map((ch) => `${ch.num}. ${ch.title}\n${ch.content.join('\n\n')}`).join('\n\n');

    navigator.clipboard.writeText(paperText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToChapter = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`wp-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={wp.title}
      subtitle={wp.subtitle}
      icon={<BookOpen className="w-5 h-5 text-[#B8661B] shrink-0" />}
      maxWidthClass="max-w-5xl"
      maxHeightClass="h-[92vh]"
      ariaLabelledBy="whitepaper-title"
      headerActions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#080808] bg-[#FCFCFC] hover:bg-[#F5F5F5] border border-[#D9D9D9] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-colors cursor-pointer"
            title={t.common.copy_all}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>{t.common.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#4A4A4A]" />
                <span>{t.common.copy_all}</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#080808] bg-[#FCFCFC] hover:bg-[#F5F5F5] border border-[#D9D9D9] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-colors cursor-pointer"
            title={t.common.print}
          >
            <Printer className="w-3.5 h-3.5 text-[#4A4A4A]" />
            <span className="hidden sm:inline">{t.common.print}</span>
          </button>
        </div>
      }
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Table of Contents (Desktop) */}
        <aside className="hidden lg:block w-72 border-r border-[#E5E5E5] bg-[#FCFCFC] p-5 overflow-y-auto shrink-0">
          <div className="text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2px] mb-3">
            {wp.toc_title}
          </div>
          <nav className="space-y-1">
            {chapters.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToChapter(s.id)}
                className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium transition-colors flex items-center justify-between group cursor-pointer ${
                  activeSection === s.id
                    ? 'bg-[#FAF5EF] text-[#B8661B] font-bold'
                    : 'text-[#4A4A4A] hover:text-[#080808] hover:bg-[#F5F5F5]'
                }`}
              >
                <span className="truncate">{s.num}. {s.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                  activeSection === s.id ? 'opacity-100 text-[#B8661B]' : 'text-[#888888]'
                }`} />
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Main Document */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-12 text-[#4A4A4A] font-sans leading-[1.8] bg-white">
          {/* Document Title Header with 3D Rotating Logo */}
          <div className="border-b border-[#E5E5E5] pb-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              <RotatingCoinLogo size={48} className="shrink-0 mt-1" />
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px] mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" />
                  <span>{t.common.verified}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[900] text-[#080808] font-display tracking-tight leading-tight">
                  {wp.doc_title}
                </h1>
                <p className="mt-2 text-lg sm:text-xl font-semibold text-[#080808] font-display">
                  {wp.doc_sub}
                </p>
              </div>
            </div>
          </div>

          {/* Chapters Render */}
          {chapters.map((ch) => (
            <section key={ch.id} id={`wp-${ch.id}`} className="space-y-4 scroll-mt-6">
              <h3 className="text-xl sm:text-2xl font-[800] text-[#080808] font-display border-b border-[#E5E5E5] pb-2">
                {ch.num}. {ch.title}
              </h3>
              {ch.id === 'tokenomics' ? (
                <WhitePaperCircleTokenomics />
              ) : (
                <div className="space-y-3.5 text-sm sm:text-base leading-[1.8] text-[#4A4A4A] font-[450]">
                  {ch.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Document Signature */}
          <div className="pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#888888]">
            <div>
              © {new Date().getFullYear()} Bitcoin Lite Edition. {t.footer.rights}
            </div>
            <div className="text-[#B8661B] font-bold">
              {t.footer.brand_sub}
            </div>
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};
