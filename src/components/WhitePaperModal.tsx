import React, { useState, useRef, useEffect } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  ChevronRight, 
  BookOpen, 
  Download,
  Eye,
  ExternalLink
} from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { RotatingCoinLogo } from './RotatingCoinLogo';
import { WhitePaperCircleTokenomics } from './WhitePaperCircleTokenomics';
import { useLanguage } from '../i18n/LanguageContext';
import { getWhitepaperPdfUrl } from '../config/tokenConfig';

interface WhitePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitePaperModal: React.FC<WhitePaperModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('abstract');
  const [copied, setCopied] = useState(false);
  const [pdfMenuOpen, setPdfMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPdfMenuOpen(false);
      }
    };
    if (pdfMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pdfMenuOpen]);

  if (!isOpen) return null;

  const wp = t.modals.whitepaper;
  const chapters = wp.chapters;
  const downloadPdfLabel = wp.download_pdf || t.common.download_pdf || 'Download PDF';

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
        <div className="flex items-center gap-2 relative" ref={menuRef}>
          {/* Download Official PDF Action Button - Icon Only */}
          <button
            type="button"
            onClick={() => setPdfMenuOpen(!pdfMenuOpen)}
            className="w-8.5 h-8.5 flex items-center justify-center text-[#B8661B] bg-[#FAF5EF] hover:bg-[#F2E8DC] active:bg-[#E9C9A5] border border-[#E9C9A5] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all cursor-pointer group"
            title="White Paper PDF (View & Download Options)"
            aria-label={downloadPdfLabel}
            aria-expanded={pdfMenuOpen}
          >
            <Download className="w-4 h-4 text-[#B8661B] group-hover:scale-110 transition-transform" />
          </button>

          {/* PDF Action Dropdown Popover */}
          {pdfMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#E5E5E5] rounded-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1.5 border-b border-[#F0F0F0] mb-1.5 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#080808]">WHITE PAPER (PDF)</span>
                <span className="text-[9px] font-mono text-[#B8661B] bg-[#FAF5EF] px-1.5 py-0.5 rounded font-bold">A4 · v1.0</span>
              </div>

              {/* Action 1: View in Browser / Fullscreen */}
              <a
                href={getWhitepaperPdfUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPdfMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-[12px] hover:bg-[#FAF5EF] text-[#222222] hover:text-[#B8661B] transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-[10px] bg-[#F5F5F5] group-hover:bg-[#F2E8DC] flex items-center justify-center shrink-0 transition-colors">
                  <Eye className="w-4 h-4 text-[#B8661B]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold font-sans">View White Paper (PDF)</div>
                  <div className="text-[10px] text-[#666666] truncate font-mono">Open in full-screen reader</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#888888] shrink-0" />
              </a>

              {/* Action 2: Direct Download */}
              <a
                href="/bitcoin-lite-edition-whitepaper.pdf"
                download="bitcoin-lite-edition-whitepaper.pdf"
                onClick={() => setPdfMenuOpen(false)}
                className="flex items-center gap-3 p-2 rounded-[12px] hover:bg-[#FAF5EF] text-[#222222] hover:text-[#B8661B] transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-[10px] bg-[#F5F5F5] group-hover:bg-[#F2E8DC] flex items-center justify-center shrink-0 transition-colors">
                  <Download className="w-4 h-4 text-[#B8661B]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold font-sans">Download PDF File</div>
                  <div className="text-[10px] text-[#666666] truncate font-mono">Instant download to device</div>
                </div>
              </a>
            </div>
          )}

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
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px] mb-2 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" />
                  <span>{t.common.verified}</span>
                  <span className="text-[#D9D9D9]">·</span>
                  <button
                    type="button"
                    onClick={() => setPdfMenuOpen(true)}
                    className="inline-flex items-center justify-center w-6 h-6 rounded-[8px] bg-[#FAF5EF] hover:bg-[#F2E8DC] text-[#B8661B] border border-[#E9C9A5] transition-all cursor-pointer group"
                    title="White Paper PDF (View & Download Options)"
                    aria-label="Download White Paper PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B8661B] group-hover:scale-110 transition-transform" />
                  </button>
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

          {/* Document Signature with PDF Download Icon Only */}
          <div className="pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#888888]">
            <div>
              © {new Date().getFullYear()} Bitcoin Lite Edition. {t.footer.rights}
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPdfMenuOpen(true)}
                className="w-7 h-7 rounded-[8px] bg-[#FAF5EF] hover:bg-[#F2E8DC] text-[#B8661B] border border-[#E9C9A5] flex items-center justify-center transition-colors cursor-pointer group"
                title="White Paper PDF (View & Download Options)"
                aria-label="Download White Paper PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#B8661B] group-hover:scale-110 transition-transform" />
              </button>
              <span className="text-[#D9D9D9]">|</span>
              <div className="text-[#B8661B] font-bold">
                {t.footer.brand_sub}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};
