import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ExternalLink, Activity, Coins } from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { fetchLiveMarketData, LiveMarketData } from '../services/marketDataService';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import { Realistic3DIcon } from './Realistic3DIcon';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTradeModal?: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  isOpen,
  onClose,
  onOpenTradeModal
}) => {
  const { t } = useLanguage();
  const { isBlack } = useTheme();

  // Baseline protocol values requested by specification
  const [marketStats, setMarketStats] = useState({
    price: '$0.00',
    volume24h: '$0.00',
    liquidity: '$0.00'
  });

  const [stakingStats] = useState({
    apr: '11.61%',
    liquid: '220,000',
    native: '220,000'
  });

  const [supplyStats, setSupplyStats] = useState({
    circulating: '1,100,000',
    max: '2,100,000',
    holders: '1'
  });

  const [isLive, setIsLive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Fetch live market data from DexScreener & Solana Mainnet
  const checkLiveTelemetry = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data: LiveMarketData = await fetchLiveMarketData();
      
      if (data.status === 'LIVE' && data.priceUsd !== null) {
        setIsLive(true);
        // Format price with appropriate decimals
        const formattedPrice = data.priceUsd < 0.01 
          ? `$${data.priceUsd.toFixed(6)}` 
          : `$${data.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
        
        const formattedVol = data.volume24h !== null
          ? `$${data.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : '$0.00';

        const formattedLiq = data.liquidityUsd !== null
          ? `$${data.liquidityUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : '$0.00';

        setMarketStats({
          price: formattedPrice,
          volume24h: formattedVol,
          liquidity: formattedLiq
        });
      } else {
        // Pre-launch state: Keep baseline protocol stats exactly as requested
        setIsLive(false);
        setMarketStats({
          price: '$0.00',
          volume24h: '$0.00',
          liquidity: '$0.00'
        });
      }

      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      // In case of network glitch, keep baseline figures
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Poll on mount and while modal is open
  useEffect(() => {
    if (!isOpen) return;
    
    checkLiveTelemetry();
    const interval = setInterval(checkLiveTelemetry, 20000);
    return () => clearInterval(interval);
  }, [isOpen, checkLiveTelemetry]);

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="font-display font-black tracking-tight text-lg sm:text-xl text-[#080808] dark:text-white">
            Explore
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
            isLive 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
            {isLive ? 'Live Pool Active' : 'Live Sync Active'}
          </span>
        </div>
      }
      subtitle="Review protocol stats and activity."
      icon={<Realistic3DIcon type="transparency" size="md" />}
      maxWidthClass="max-w-2xl"
      ariaLabelledBy="explore-panel-title"
      headerActions={
        <button
          onClick={checkLiveTelemetry}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg text-[#666666] hover:text-[#B8661B] dark:text-[#A1A1AA] dark:hover:text-white hover:bg-[#FAF5EF] dark:hover:bg-[#1C150E] transition-all cursor-pointer disabled:opacity-50"
          title="Refresh Live Data"
          aria-label="Refresh live data"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B8661B]' : ''}`} />
        </button>
      }
      footer={
        <div className="px-5 sm:px-6 py-3.5 bg-[#FCFCFC] dark:bg-[#121215] border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#71717A]">
            <Activity className="w-3.5 h-3.5 text-[#B8661B]" />
            <span className="font-mono text-[11px]">Synced: {lastSyncTime}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={TOKEN_CONFIG.stakingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-[12px] bg-[#B8661B] hover:bg-[#964E10] text-white font-bold font-mono transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Stake (11.61% APY)</span>
            </a>

            {onOpenTradeModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTradeModal();
                }}
                className="px-3.5 py-2 rounded-[12px] bg-[#111111] hover:bg-[#B8661B] text-white font-bold font-mono transition-colors cursor-pointer"
              >
                Trade
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3 py-2 rounded-[12px] text-[#4A4A4A] dark:text-[#D4D4D8] hover:bg-[#F2EFE7] dark:hover:bg-[#1C150E] font-medium transition-colors cursor-pointer"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      }
    >
      <div className="p-5 sm:p-7 space-y-6">
        {/* Refresh Icon */}
        <div className="flex items-center justify-end -mt-1 -mb-1">
          <button
            onClick={checkLiveTelemetry}
            disabled={isRefreshing}
            className="p-2 rounded-xl text-[#666666] hover:text-[#B8661B] dark:text-[#A1A1AA] dark:hover:text-white bg-[#FAF5EF] hover:bg-[#F2E8DC] dark:bg-[#1C150E] dark:hover:bg-[#281D12] border border-[#EAB308]/15 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh Live Data"
            aria-label="Refresh live data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B8661B]' : ''}`} />
          </button>
        </div>

        {/* 3 Dedicated Protocol Stat Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Section 1: Market */}
          <div className="rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/10 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                    Market →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  DEX
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Price</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {marketStats.price}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Volume (24h)</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {marketStats.volume24h}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Liquidity</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {marketStats.liquidity}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              {isLive ? 'Live Liquidity Pool' : 'Awaiting Pair Genesis'}
            </div>
          </div>

          {/* Section 2: Staking */}
          <div className="rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/10 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                    Staking →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  ESCROW
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">APR</span>
                  <span className="text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums">
                    {stakingStats.apr}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Liquid</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {stakingStats.liquid}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Native</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {stakingStats.native}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              Streamflow Protocol Verified
            </div>
          </div>

          {/* Section 3: Supply */}
          <div className="rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/10 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                    Supply →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  SOLANA
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Circulating</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {supplyStats.circulating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Max</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {supplyStats.max}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Holders</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {supplyStats.holders}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              Zero Inflation / Immutable
            </div>
          </div>

        </div>
      </div>
    </DraggableModal>
  );
};
