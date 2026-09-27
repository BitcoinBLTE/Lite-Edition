import React from 'react';
import { Rocket, Clock, ShieldCheck, BookOpen } from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { useLanguage } from '../i18n/LanguageContext';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhitePaper: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  onOpenWhitePaper
}) => {
  const { t } = useLanguage();
  const cs = t.modals.coming_soon;

  const title = cs?.title || 'APPLICATION STATUS';
  const subtitle = cs?.subtitle || 'Decentralized Portal · Movable Panel';
  const badge = cs?.badge || 'Coming Soon';
  const appTitle = cs?.app_title || 'Bitcoin Lite Edition DApp';
  const desc = cs?.desc || 'The decentralized application portal—featuring live token telemetry, on-chain scarcity analytics, and liquidity metrics—is scheduled for activation in Phase 03 (Ecosystem) following verified mainnet genesis.';
  const secTitle = cs?.security_title || 'Security & Integrity Protocol:';
  const secDesc = cs?.security_desc || 'In accordance with our zero-mock principles, the application interface connects solely to live Solana RPC nodes and will be enabled upon liquidity pool initialization.';
  const readWp = cs?.read_whitepaper || 'Read White Paper Instead';

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      icon={<Rocket className="w-5 h-5 text-[#B8661B]" />}
      maxWidthClass="max-w-md"
      ariaLabelledBy="coming-soon-title"
      footer={
        <div className="px-6 py-4 bg-[#FCFCFC] border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenWhitePaper();
            }}
            className="text-xs font-bold text-[#B8661B] hover:text-[#964E10] flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{readWp}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
          >
            {t.common.acknowledge}
          </button>
        </div>
      }
    >
      <div className="p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-[18px] bg-[#FAF5EF] border border-[#E9C9A5] flex items-center justify-center mx-auto text-[#B8661B] shadow-2xs">
          <Rocket className="w-7 h-7 stroke-[2]" />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#B8661B] uppercase tracking-[2.5px]">
          <Clock className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        <h4 className="text-xl sm:text-2xl font-[900] text-[#080808] font-display tracking-tight">
          {appTitle}
        </h4>

        <p className="text-xs sm:text-sm text-[#4A4A4A] leading-[1.8] font-[450] max-w-sm mx-auto">
          {desc}
        </p>

        <div className="p-4 rounded-[18px] bg-[#FCFCFC] border border-[#E5E5E5] text-left text-xs text-[#4A4A4A] space-y-1.5 leading-[1.75]">
          <div className="font-bold text-[#080808] flex items-center gap-1.5 font-display">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>{secTitle}</span>
          </div>
          <p>{secDesc}</p>
        </div>
      </div>
    </DraggableModal>
  );
};
