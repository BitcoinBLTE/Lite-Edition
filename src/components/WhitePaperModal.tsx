import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  Download 
} from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { RotatingCoinLogo } from './RotatingCoinLogo';
import { WhitePaperExploreMetrics } from './WhitePaperExploreMetrics';
import { TokenomicsCircleDesign } from './TokenomicsCircleDesign';
import { useLanguage } from '../i18n/LanguageContext';
import { downloadWhitepaperPdf } from '../config/tokenConfig';
import { Realistic3DIcon } from './Realistic3DIcon';

interface WhitePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitePaperModal: React.FC<WhitePaperModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const wp = t.modals.whitepaper;
  const chapters = wp.chapters;
  const downloadPdfLabel = wp.download_pdf || t.common.download_pdf || 'Download PDF';

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      await downloadWhitepaperPdf('bitcoin-lite-edition-whitepaper.pdf');
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1600);
    }
  };

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

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={wp.title}
      subtitle={wp.subtitle}
      icon={<Realistic3DIcon type="mint" size="sm" />}
      maxWidthClass="max-w-4xl w-full"
      maxHeightClass="max-h-[92vh] h-[92vh]"
      ariaLabelledBy="whitepaper-title"
      headerActions={
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Smooth Single Action: Download PDF File */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#B8661B] bg-[#FAF5EF] hover:bg-[#F2E8DC] active:bg-[#E9C9A5] border border-[#E9C9A5] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all cursor-pointer group shrink-0"
            title={downloadPdfLabel}
            aria-label={downloadPdfLabel}
          >
            {isDownloading ? (
              <Check className="w-3.5 h-3.5 text-[#16A34A] animate-pulse" />
            ) : (
              <Download className="w-3.5 h-3.5 text-[#B8661B] group-hover:scale-110 transition-transform" />
            )}
            <span className="text-[11px] sm:text-xs">
              {isDownloading ? 'Downloading...' : downloadPdfLabel}
            </span>
          </button>

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
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold text-[#080808] bg-[#FCFCFC] hover:bg-[#F5F5F5] border border-[#D9D9D9] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-colors cursor-pointer shrink-0"
            title={t.common.print}
          >
            <Printer className="w-3.5 h-3.5 text-[#4A4A4A]" />
            <span className="hidden sm:inline">{t.common.print}</span>
          </button>
        </div>
      }
    >
      {/* Full Document View (Table of contents removed as requested) */}
      <div className="h-full overflow-y-auto p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-12 text-[#4A4A4A] font-sans leading-[1.8] bg-white min-w-0">
        {/* Document Title Header */}
        <div className="border-b border-[#E5E5E5] pb-6 sm:pb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
            <RotatingCoinLogo size={48} className="shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px] mb-2 justify-center sm:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B]" />
                <span>{t.common.verified}</span>
                <span className="text-[#D9D9D9]">·</span>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-[8px] bg-[#FAF5EF] hover:bg-[#F2E8DC] text-[#B8661B] border border-[#E9C9A5] transition-all cursor-pointer group"
                  title={downloadPdfLabel}
                  aria-label={downloadPdfLabel}
                >
                  <Download className="w-3.5 h-3.5 text-[#B8661B] group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-[900] text-[#080808] font-display tracking-tight leading-tight break-words">
                {wp.doc_title}
              </h1>
              <p className="mt-2 text-base sm:text-xl font-semibold text-[#080808] font-display">
                {wp.doc_sub}
              </p>
            </div>
          </div>
        </div>

        {/* Chapters Render */}
        {chapters.map((ch) => (
          <section key={ch.id} id={`wp-${ch.id}`} className="space-y-4 scroll-mt-6">
            <h3 className="text-lg sm:text-2xl font-[800] text-[#080808] font-display border-b border-[#E5E5E5] pb-2">
              {ch.num}. {ch.title}
            </h3>
            {ch.id === 'tokenomics' ? (
              <div className="space-y-6 overflow-hidden w-full">
                <TokenomicsCircleDesign showTitle={false} />
                <WhitePaperExploreMetrics />
              </div>
            ) : (
              <div className="space-y-3.5 text-xs sm:text-sm lg:text-base leading-[1.8] text-[#4A4A4A] font-[450] break-words">
                {ch.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Document Signature with Direct PDF Download */}
        <div className="pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#888888] text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Bitcoin Lite Edition. {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="w-7 h-7 rounded-[8px] bg-[#FAF5EF] hover:bg-[#F2E8DC] text-[#B8661B] border border-[#E9C9A5] flex items-center justify-center transition-colors cursor-pointer group"
              title={downloadPdfLabel}
              aria-label={downloadPdfLabel}
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
    </DraggableModal>
  );
};
