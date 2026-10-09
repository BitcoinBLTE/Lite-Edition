import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { RaydiumIcon } from './PlatformIcons';
import { Realistic3DIcon } from './Realistic3DIcon';

interface BuyTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet?: () => void;
}

export const BuyTradeModal: React.FC<BuyTradeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();

  const getVenueIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('raydium')) {
      return <RaydiumIcon size={24} className="rounded-md" />;
    }
    return <ArrowRightLeft className="w-5 h-5 text-amber-600" />;
  };

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={t.modals.buy_trade.title}
      subtitle={t.modals.buy_trade.subtitle}
      icon={<Realistic3DIcon type="dex" size="sm" />}
      maxWidthClass="max-w-lg"
      ariaLabelledBy="trade-modal-title"
      footer={
        <div className="px-6 py-4 bg-[#FCFCFC] border-t border-[#E5E5E5] flex items-center justify-between gap-3">
          <span className="text-xs text-[#888888] font-mono">{t.modals.buy_trade.footer_note}</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#111111] hover:bg-[#B8661B] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
          >
            {t.common.got_it}
          </button>
        </div>
      }
    >
      <div className="p-6 space-y-5">
        {/* Decentralized Venues Status */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-[2px] text-[#B8661B] font-bold block">
            {t.modals.buy_trade.venues_heading}
          </span>

          {/* Streamflow Staking */}
          <div className="p-4 rounded-[20px] border border-[#E9C9A5] bg-[#FAF5EF] flex items-center justify-between shadow-[0_2px_10px_rgba(184,102,27,0.06)] hover:border-[#B8661B] transition-all">
            <div className="flex items-center gap-3">
              <Realistic3DIcon type="scarcity" size="sm" />
              <div>
                <span className="text-sm sm:text-base font-[800] text-[#080808] font-display block">Streamflow Staking</span>
                <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-full bg-[#B8661B] text-white leading-none inline-block mt-0.5">
                  11.61% APY
                </span>
              </div>
            </div>

            <a
              href={TOKEN_CONFIG.stakingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold rounded-[14px] bg-[#B8661B] text-white hover:bg-[#964E10] shadow-[0_2px_8px_rgba(184,102,27,0.2)] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>STAKE</span>
            </a>
          </div>

          {TOKEN_CONFIG.tradingVenues.map((venue) => (
            <div
              key={venue.name}
              className="p-4 rounded-[20px] border border-[#E5E5E5] flex items-center justify-between bg-[#FCFCFC] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#D0D0D0] transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[12px] bg-[#080808] dark:bg-[#1E1E24] dark:border dark:border-[#2E2E34] flex items-center justify-center p-1 shrink-0 shadow-2xs">
                  {getVenueIcon(venue.name)}
                </div>
                <div>
                  <span className="text-sm sm:text-base font-[800] text-[#080808] block font-display">{venue.name}</span>
                </div>
              </div>

              <a
                href={venue.url || "https://raydium.io/swap/"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-xs font-bold rounded-[14px] bg-[#111111] text-white hover:bg-[#B8661B] shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-pointer transition-colors"
              >
                <span>Trade</span>
              </a>
            </div>
          ))}
        </div>

        {/* Scarcity Safety Verification Checklist */}
        <div className="p-4.5 bg-[#FAF5EF] rounded-[20px] border border-[#E9C9A5] space-y-2 text-xs text-[#4A4A4A] shadow-2xs">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="font-bold text-[#080808] font-mono uppercase tracking-[2px] block">
              {t.how_to_buy.advisory_kicker}:
            </span>
            <Realistic3DIcon type="shield" size="sm" />
          </div>
          <ul className="space-y-1.5 list-disc list-inside">
            {t.how_to_buy.security_items.map((sec, idx) => (
              <li key={idx} className="leading-relaxed">{sec}</li>
            ))}
          </ul>
        </div>
      </div>
    </DraggableModal>
  );
};
