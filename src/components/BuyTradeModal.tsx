import React from 'react';
import { ExternalLink, AlertCircle, ShoppingCart, ArrowRightLeft, Sparkles } from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { useLanguage } from '../i18n/LanguageContext';
import { RaydiumIcon, JupiterIcon, OrcaIcon } from './PlatformIcons';

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
    if (lower.includes('jupiter')) {
      return <JupiterIcon size={24} className="rounded-md" />;
    }
    if (lower.includes('orca')) {
      return <OrcaIcon size={24} className="rounded-md" />;
    }
    return <ArrowRightLeft className="w-5 h-5 text-amber-600" />;
  };

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={t.modals.buy_trade.title}
      subtitle={t.modals.buy_trade.subtitle}
      icon={<ShoppingCart className="w-5 h-5 text-[#B8661B]" />}
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
        {/* Status Alert */}
        <div className="bg-[#FAF5EF] border border-[#E9C9A5] rounded-[20px] p-4.5 flex items-start gap-3.5 shadow-2xs">
          <AlertCircle className="w-5 h-5 text-[#B8661B] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#080808]">
            <span className="font-bold block font-display">{t.modals.buy_trade.alert_title}</span>
            <p className="mt-1 leading-relaxed text-[#4A4A4A] font-[450]">
              {t.modals.buy_trade.alert_desc}
            </p>
          </div>
        </div>

        {/* Decentralized Venues Status */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-[2px] text-[#B8661B] font-bold block">
            {t.modals.buy_trade.venues_heading}
          </span>

          {/* Streamflow Official Staking Pool */}
          <div className="p-4 rounded-[20px] border border-[#E9C9A5] bg-[#FAF5EF] flex items-center justify-between shadow-[0_2px_10px_rgba(184,102,27,0.06)] hover:border-[#B8661B] transition-all">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#B8661B] text-white flex items-center justify-center p-1 shrink-0 shadow-2xs">
                <Sparkles className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-[800] text-[#080808] block font-display">Streamflow Staking</span>
                  <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-full bg-[#B8661B] text-white leading-none">
                    40% APY
                  </span>
                </div>
                <span className="text-xs font-mono text-[#888888]">
                  Official Solana Mainnet Pool
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
                  <span className="text-sm font-[800] text-[#080808] block font-display">{venue.name}</span>
                  <span className="text-xs font-mono text-[#888888]">
                    {venue.status === 'LIVE' ? 'Active Liquidity Pair' : t.modals.buy_trade.pending_status}
                  </span>
                </div>
              </div>

              {venue.url ? (
                <a
                  href={venue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold rounded-[14px] bg-[#111111] text-white hover:bg-[#B8661B] shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Trade</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs font-mono font-medium text-[#888888] px-3 py-1.5 bg-[#F5F5F5] rounded-[10px] border border-[#E5E5E5]">
                  {t.modals.buy_trade.pending_status}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Scarcity Safety Verification Checklist */}
        <div className="p-4.5 bg-[#FAF5EF] rounded-[20px] border border-[#E9C9A5] space-y-2 text-xs text-[#4A4A4A] shadow-2xs">
          <span className="font-bold text-[#080808] font-mono uppercase tracking-[2px] block">
            {t.how_to_buy.advisory_kicker}:
          </span>
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
