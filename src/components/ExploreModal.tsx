import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ExternalLink, Activity, Coins, Wallet, Download } from 'lucide-react';
import { DraggableModal } from './DraggableModal';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { fetchLiveMarketData, fetchTokenHoldersCount, LiveMarketData } from '../services/marketDataService';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTradeModal?: () => void;
  onOpenWallet?: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  isOpen,
  onClose,
  onOpenTradeModal,
  onOpenWallet
}) => {
  const { currentLanguage, t } = useLanguage();
  const { isBlack } = useTheme();
  const exp = t.modals?.explore_modal;

  const walletCardLabels = {
    title: t.nav?.wallet || 'BLTE Wallet',
    badge: exp?.coming_soon?.toUpperCase() || 'COMING SOON',
    type: currentLanguage === 'es' || currentLanguage === 'pt-PT' ? 'Tipo' : currentLanguage === 'fr' ? 'Type' : currentLanguage === 'de' ? 'Typ' : currentLanguage === 'ja' ? '種別' : currentLanguage?.startsWith('zh') ? '类型' : currentLanguage === 'th' ? 'ประเภท' : 'Type',
    nonCustodial: currentLanguage === 'es' ? 'No custodial' : currentLanguage === 'pt-PT' ? 'Não Custodial' : currentLanguage === 'fr' ? 'Non-dépositaire' : currentLanguage === 'de' ? 'Non-Custodial' : currentLanguage === 'ja' ? '非カストディアル' : currentLanguage?.startsWith('zh') ? '自主非托管' : currentLanguage === 'no' ? 'Ikke-forvarende' : currentLanguage === 'th' ? 'ดูแลกุญแจด้วยตนเอง' : 'Non-Custodial',
    network: currentLanguage === 'es' ? 'Red' : currentLanguage === 'pt-PT' ? 'Rede' : currentLanguage === 'fr' ? 'Réseau' : currentLanguage === 'de' ? 'Netzwerk' : currentLanguage === 'ja' ? 'ネットワーク' : currentLanguage?.startsWith('zh') ? '网络' : currentLanguage === 'no' ? 'Nettverk' : currentLanguage === 'th' ? 'เครือข่าย' : 'Network',
    staking: currentLanguage === 'es' ? 'Staking nativo' : currentLanguage === 'pt-PT' ? 'Staking Nativo' : currentLanguage === 'fr' ? 'Staking natif' : currentLanguage === 'de' ? 'Natives Staking' : currentLanguage === 'ja' ? 'ネイティブステーキング' : currentLanguage?.startsWith('zh') ? '原生质押' : currentLanguage === 'no' ? 'Nativ Staking' : currentLanguage === 'th' ? 'สเตกกิ้งในตัว' : 'Native Staking',
    platforms: currentLanguage === 'es' || currentLanguage === 'pt-PT' ? 'Plataformas' : currentLanguage === 'fr' ? 'Plateformes' : currentLanguage === 'de' ? 'Plattformen' : currentLanguage === 'ja' ? '対応端末' : currentLanguage?.startsWith('zh') ? '适配平台' : currentLanguage === 'no' ? 'Plattformer' : currentLanguage === 'th' ? 'แพลตฟอร์ม' : 'Platforms',
    joinWaitlist: currentLanguage === 'es' ? 'Unirse a la lista' : currentLanguage === 'pt-PT' ? 'Lista de Espera' : currentLanguage === 'fr' ? 'Rejoindre la liste' : currentLanguage === 'de' ? 'Auf Warteliste' : currentLanguage === 'ja' ? 'ウェイティングリスト' : currentLanguage?.startsWith('zh') ? '加入候补名单' : currentLanguage === 'no' ? 'Bli med på ventelisten' : currentLanguage === 'th' ? 'เข้าร่วมรายชื่อรอ' : 'Join Waitlist',
    beta: currentLanguage === 'ja' ? '先行ベータ' : currentLanguage?.startsWith('zh') ? '早期测试版' : currentLanguage === 'no' ? 'Tidlig Beta' : currentLanguage === 'th' ? 'เบต้าล่วงหน้า' : 'Early Beta'
  };

  // Baseline protocol values requested by specification
  const [marketStats, setMarketStats] = useState({
    price: '$0.00',
    volume24h: '$0.00',
    marketCap: '$0.00',
    liquidity: '$0.00'
  });

  const [stakingStats] = useState({
    apr: '11.61%',
    liquid: '$0.00',
    native: '$0.00'
  });

  const [supplyStats, setSupplyStats] = useState({
    circulating: '2,100,000',
    nonCirculatory: '0.00',
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

        const formattedMcap = data.marketCapUsd !== null
          ? `$${data.marketCapUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : '$0.00';

        const formattedLiq = data.liquidityUsd !== null
          ? `$${data.liquidityUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : '$0.00';

        setMarketStats({
          price: formattedPrice,
          volume24h: formattedVol,
          marketCap: formattedMcap,
          liquidity: formattedLiq
        });
      } else {
        // Pre-launch state: Keep baseline protocol stats exactly as requested
        setIsLive(false);
        setMarketStats({
          price: '$0.00',
          volume24h: '$0.00',
          marketCap: '$0.00',
          liquidity: '$0.00'
        });
      }

      // Automatically query live token holders count on-chain when token address is available
      const liveHolders = await fetchTokenHoldersCount();
      if (liveHolders) {
        setSupplyStats(prev => ({ ...prev, holders: liveHolders }));
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
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="font-display font-black tracking-tight text-lg sm:text-xl text-[#080808] dark:text-white">
            {exp?.title || 'Explore'}
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shrink-0 ${
            isLive 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
            {isLive ? (exp?.live_pool_active || 'Live Pool Active') : (exp?.live_sync_active || 'Live Sync Active')}
          </span>
        </div>
      }
      subtitle={exp?.subtitle || 'Review protocol stats and activity.'}
      maxWidthClass="max-w-5xl w-full"
      ariaLabelledBy="explore-panel-title"
      headerActions={
        <button
          onClick={checkLiveTelemetry}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg text-[#666666] hover:text-[#B8661B] dark:text-[#A1A1AA] dark:hover:text-white hover:bg-[#FAF5EF] dark:hover:bg-[#1C150E] transition-all cursor-pointer disabled:opacity-50"
          title={exp?.refresh_live_data || 'Refresh Live Data'}
          aria-label={exp?.refresh_live_data || 'Refresh live data'}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B8661B]' : ''}`} />
        </button>
      }
      footer={
        <div className="px-4 sm:px-6 py-3.5 bg-[#FCFCFC] dark:bg-[#121215] border-t border-[#E5E5E5] dark:border-[#222228] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#71717A] min-w-0">
            <Activity className="w-3.5 h-3.5 text-[#B8661B] shrink-0" />
            <span className="font-mono text-[11px] truncate">
              {exp?.synced || 'Synced'}: {lastSyncTime === 'Just now' ? (exp?.just_now || 'Just now') : lastSyncTime}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end">
            <a
              href={TOKEN_CONFIG.stakingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-3.5 py-2 rounded-[12px] bg-[#B8661B] hover:bg-[#964E10] text-white font-bold font-mono transition-colors flex items-center gap-1.5 shadow-xs text-xs"
            >
              <Coins className="w-3.5 h-3.5 shrink-0" />
              <span>{exp?.btn_stake || 'Stake (11.61% APY)'}</span>
            </a>

            {onOpenTradeModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTradeModal();
                }}
                className="px-3 sm:px-3.5 py-2 rounded-[12px] bg-[#111111] hover:bg-[#B8661B] text-white font-bold font-mono transition-colors cursor-pointer text-xs"
              >
                {exp?.btn_trade || 'Trade'}
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3 py-2 rounded-[12px] text-[#4A4A4A] dark:text-[#D4D4D8] hover:bg-[#F2EFE7] dark:hover:bg-[#1C150E] font-medium transition-colors cursor-pointer text-xs"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      }
    >
      <div className="p-4 sm:p-6 lg:p-7 space-y-5 sm:space-y-6">
        {/* Refresh Icon */}
        <div className="flex items-center justify-end -mt-1 -mb-1">
          <button
            onClick={checkLiveTelemetry}
            disabled={isRefreshing}
            className="p-2 rounded-xl text-[#666666] hover:text-[#B8661B] dark:text-[#A1A1AA] dark:hover:text-white bg-[#FAF5EF] hover:bg-[#F2E8DC] dark:bg-[#1C150E] dark:hover:bg-[#281D12] border border-[#EAB308]/15 transition-all cursor-pointer disabled:opacity-50"
            title={exp?.refresh_live_data || 'Refresh Live Data'}
            aria-label={exp?.refresh_live_data || 'Refresh live data'}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B8661B]' : ''}`} />
          </button>
        </div>

        {/* 5 Dedicated Protocol Stat Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
          
          {/* Section 1: Market */}
          <div className="rounded-[20px] sm:rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/15 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                    {exp?.card_market || 'Market'} →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  {exp?.badge_dex || 'DEX'}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.price || 'Price'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {marketStats.price}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.volume_24h || 'Volume (24h)'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {marketStats.volume24h}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.market_cap || t.market?.market_cap || 'Market Cap'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {marketStats.marketCap}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.liquidity || 'Liquidity'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {marketStats.liquidity}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              {isLive ? (exp?.live_liquidity_pool || 'Live Liquidity Pool') : (exp?.awaiting_pair || 'Awaiting Pair Genesis')}
            </div>
          </div>

          {/* Section 2: Staking */}
          <div className="rounded-[20px] sm:rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/15 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                    {exp?.card_staking || 'Staking'} →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  {exp?.badge_escrow || 'ESCROW'}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.apr || 'APR'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums truncate text-right">
                    {stakingStats.apr}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.liquid || 'Liquid'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {stakingStats.liquid}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.native || 'Native'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {stakingStats.native}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              {exp?.staking_verified || 'Streamflow Protocol Verified'}
            </div>
          </div>

          {/* Section 3: Game (Placed above supply section) */}
          <div className="rounded-[20px] sm:rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/15 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                    {exp?.card_game || 'Game'} →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  {exp?.badge_coming_soon || 'COMING SOON'}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.total_rewards || 'Total rewards'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    0
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.participation_count || 'Participation count'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    0
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.game_rewards || 'Game rewards'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums truncate text-right">
                    $0.00
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 text-[10px] font-mono text-[#B8661B] dark:text-[#EAB308] font-bold text-right">
              {exp?.coming_soon || 'Coming Soon'}
            </div>
          </div>

          {/* Section 4: BLTE Wallet (Placed above supply section) */}
          <div 
            onClick={() => {
              if (onOpenWallet) {
                onClose();
                onOpenWallet();
              }
            }}
            className="rounded-[20px] sm:rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/15 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-[#B8661B]/40 hover:shadow-md transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308] shrink-0" />
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase group-hover:text-[#964E10] dark:group-hover:text-[#FBBF24] transition-colors">
                    {walletCardLabels.title} →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>{walletCardLabels.badge}</span>
                </span>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{walletCardLabels.type}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {walletCardLabels.nonCustodial}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{walletCardLabels.network}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    Solana Mainnet
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{walletCardLabels.staking}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums truncate text-right">
                    11.61% APY
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{walletCardLabels.platforms}</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    iOS · Android · Web
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 flex items-center justify-between text-[10px] font-mono">
              <span className="text-[#888888] dark:text-[#71717A]">{walletCardLabels.beta}</span>
              <span className="text-[#B8661B] dark:text-[#EAB308] font-bold flex items-center gap-1 group-hover:underline">
                <Download className="w-3 h-3" />
                <span>{walletCardLabels.joinWaitlist}</span>
              </span>
            </div>
          </div>

          {/* Section 5: Supply */}
          <div className="rounded-[20px] sm:rounded-[22px] bg-[#FCFCFC] dark:bg-[#15151A] border border-[#EAB308]/15 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAB308]/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] uppercase">
                    {exp?.card_supply || 'Supply'} →
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B]">
                  {exp?.badge_network || 'SOLANA'}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.non_circulatory || 'Non circulatory'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {supplyStats.nonCirculatory}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.circulating || 'Circulating'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {supplyStats.circulating}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.max_supply || 'Max'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {supplyStats.max}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#A1A1AA] font-medium shrink-0">{exp?.holders || 'Holders'}</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums truncate text-right">
                    {supplyStats.holders}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAB308]/10 text-[10px] font-mono text-[#888888] dark:text-[#71717A] text-right">
              {exp?.zero_inflation || 'Zero Inflation / Immutable'}
            </div>
          </div>

        </div>
      </div>
    </DraggableModal>
  );
};
