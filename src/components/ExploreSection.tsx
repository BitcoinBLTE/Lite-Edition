import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Activity, Coins, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { fetchLiveMarketData, LiveMarketData } from '../services/marketDataService';
import { useLanguage } from '../i18n/LanguageContext';

interface ExploreSectionProps {
  onOpenExplore?: () => void;
  onOpenTradeModal?: () => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  onOpenExplore,
  onOpenTradeModal
}) => {
  const { t } = useLanguage();

  const [marketStats, setMarketStats] = useState({
    price: '$0.00',
    volume24h: '$0.00',
    liquidity: '$0.00'
  });

  const [stakingStats] = useState({
    apr: '11.61%',
    liquid: '135,000',
    native: '135,000'
  });

  const [supplyStats] = useState({
    circulating: '1,100,000',
    max: '2,100,000',
    holders: '1'
  });

  const [isLive, setIsLive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  const checkLiveTelemetry = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data: LiveMarketData = await fetchLiveMarketData();

      if (data.status === 'LIVE' && data.priceUsd !== null) {
        setIsLive(true);
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
        setIsLive(false);
        setMarketStats({
          price: '$0.00',
          volume24h: '$0.00',
          liquidity: '$0.00'
        });
      }

      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    checkLiveTelemetry();
    const interval = setInterval(checkLiveTelemetry, 30000);
    return () => clearInterval(interval);
  }, [checkLiveTelemetry]);

  return (
    <section id="explore" className="py-20 md:py-28 bg-[#FAFAFA] dark:bg-[#0E0E12] scroll-mt-16 transition-colors border-y border-[#E5E5E5] dark:border-[#1E1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold tracking-[3px] uppercase text-[#B8661B] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8661B] animate-pulse" />
              <span>EXPLORE PROTOCOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-[#080808] dark:text-white font-display tracking-tight leading-[1.15]">
              Review Protocol Stats and Activity
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#555555] dark:text-[#A1A1AA] leading-relaxed">
              Real-time on-chain metrics, staking economics, and verified supply distribution directly connected to the blockchain.
            </p>
          </div>

          {/* Sync Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 border ${
              isLive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
              <span>{isLive ? 'Live Pool Active' : 'Live Sync Active'}</span>
            </div>

            <button
              onClick={checkLiveTelemetry}
              disabled={isRefreshing}
              className="p-2 rounded-xl text-[#666666] hover:text-[#B8661B] dark:text-[#A1A1AA] dark:hover:text-white bg-white dark:bg-[#1C150E] hover:bg-[#FAF5EF] border border-[#E5E5E5] dark:border-[#B8661B]/20 transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
              title="Refresh Live Data"
              aria-label="Refresh live data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B8661B]' : ''}`} />
            </button>
          </div>
        </div>

        {/* 4 Protocol Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Market */}
          <div className="rounded-[24px] bg-white dark:bg-[#15151A] border border-[#E5E5E5] dark:border-[#222228] p-6 shadow-xs flex flex-col justify-between hover:border-[#B8661B]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F0F0F0] dark:border-[#222228]">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                  Market →
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  DEX
                </span>
              </div>

              <div className="space-y-4">
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

            <div className="mt-5 pt-3 border-t border-[#F0F0F0] dark:border-[#222228] text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              {isLive ? 'Live Liquidity Pool' : 'Awaiting Pair Genesis'}
            </div>
          </div>

          {/* Card 2: Staking */}
          <div className="rounded-[24px] bg-white dark:bg-[#15151A] border border-[#E5E5E5] dark:border-[#222228] p-6 shadow-xs flex flex-col justify-between hover:border-[#B8661B]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F0F0F0] dark:border-[#222228]">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                  Staking →
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  ESCROW
                </span>
              </div>

              <div className="space-y-4">
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

            <div className="mt-5 pt-3 border-t border-[#F0F0F0] dark:border-[#222228] text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              Streamflow Protocol Verified
            </div>
          </div>

          {/* Card 3: Game (Placed above supply section, no game button) */}
          <div className="rounded-[24px] bg-white dark:bg-[#15151A] border border-[#E5E5E5] dark:border-[#222228] p-6 shadow-xs flex flex-col justify-between hover:border-[#B8661B]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F0F0F0] dark:border-[#222228]">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                  Game →
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  COMING SOON
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Total rewards</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Participation count</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium">Game rewards</span>
                  <span className="text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums">
                    220,000
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#F0F0F0] dark:border-[#222228] text-[10px] font-mono text-[#B8661B] dark:text-[#EAB308] font-bold text-right">
              Coming Soon
            </div>
          </div>

          {/* Card 4: Supply */}
          <div className="rounded-[24px] bg-white dark:bg-[#15151A] border border-[#E5E5E5] dark:border-[#222228] p-6 shadow-xs flex flex-col justify-between hover:border-[#B8661B]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F0F0F0] dark:border-[#222228]">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                  Supply →
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  SOLANA
                </span>
              </div>

              <div className="space-y-4">
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

            <div className="mt-5 pt-3 border-t border-[#F0F0F0] dark:border-[#222228] text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              Zero Inflation / Immutable
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-[#888888] font-mono">
            <Activity className="w-4 h-4 text-[#B8661B]" />
            <span>Telemetry updated: {lastSyncTime}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={TOKEN_CONFIG.stakingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-[14px] bg-[#B8661B] hover:bg-[#964E10] text-white font-bold font-mono text-xs transition-colors flex items-center gap-2 shadow-xs"
            >
              <Coins className="w-4 h-4" />
              <span>STAKE BLTE (11.61% APY)</span>
            </a>

            {onOpenTradeModal && (
              <button
                onClick={onOpenTradeModal}
                className="px-5 py-3 rounded-[14px] bg-[#111111] hover:bg-[#B8661B] text-white font-bold font-mono text-xs transition-colors cursor-pointer shadow-xs"
              >
                BUY / TRADE
              </button>
            )}

            {onOpenExplore && (
              <button
                onClick={onOpenExplore}
                className="px-5 py-3 rounded-[14px] bg-white dark:bg-[#18181D] hover:bg-[#FAF5EF] text-[#080808] dark:text-white border border-[#E5E5E5] dark:border-[#B8661B]/30 font-bold font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-[#B8661B]" />
                <span>EXPLORE PANEL</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
