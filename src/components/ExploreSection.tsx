import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Activity, Coins, ArrowUpRight, Compass, ShieldCheck, Wallet, Download } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { fetchLiveMarketData, fetchTokenHoldersCount, LiveMarketData } from '../services/marketDataService';
import { useLanguage } from '../i18n/LanguageContext';
import { Ecosystem3DVisual } from './3d/Ecosystem3DVisual';

interface ExploreSectionProps {
  onOpenExplore?: () => void;
  onOpenTradeModal?: () => void;
  onOpenWallet?: () => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  onOpenExplore,
  onOpenTradeModal,
  onOpenWallet
}) => {
  const { currentLanguage, t } = useLanguage();
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
    <section id="explore" className="py-20 md:py-28 bg-[#FAF8F5]/80 dark:bg-[#0B0B0F] scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold tracking-[3px] uppercase text-[#B8661B] dark:text-[#EAB308] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8661B] dark:bg-[#EAB308] animate-pulse" />
              <span>{exp?.section_tag || 'EXPLORE PROTOCOL'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-[#080808] dark:text-white font-display tracking-tight leading-[1.15]">
              {exp?.section_title || 'Review Protocol Stats and Activity'}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#475569] dark:text-[#CBD5E1] font-[450] leading-relaxed">
              {exp?.section_desc || 'Real-time on-chain metrics, staking economics, and verified supply distribution directly connected to the blockchain.'}
            </p>
          </div>

          {/* Sync Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 ${
              isLive
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                : 'bg-amber-500/10 text-amber-800 dark:text-amber-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
              <span>{isLive ? (exp?.live_pool_active || 'Live Pool Active') : (exp?.live_sync_active || 'Live Sync Active')}</span>
            </div>

            <button
              onClick={checkLiveTelemetry}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl text-[#475569] hover:text-[#B8661B] dark:text-[#A1A1AA] dark:hover:text-white bg-white dark:bg-[#1C150E] hover:bg-[#FAF5EF] transition-all cursor-pointer disabled:opacity-50 shadow-sm"
              title={exp?.refresh_live_data || 'Refresh Live Data'}
              aria-label={exp?.refresh_live_data || 'Refresh live data'}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#B8661B]' : ''}`} />
            </button>
          </div>
        </div>

        {/* 3D Living Ecosystem Interactive Architecture (Borderless, No Container) */}
        <div className="w-full h-[320px] sm:h-[380px] lg:h-[420px] mb-10 relative">
          <Ecosystem3DVisual className="w-full h-full" />
        </div>

        {/* 5 Protocol Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
          
          {/* Card 1: Market */}
          <div className="rounded-[28px] bg-white/95 dark:bg-[#13131A]/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] dark:text-[#EAB308] uppercase">
                  {exp?.card_market || 'Market'} →
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B] dark:text-[#EAB308]">
                  {exp?.badge_dex || 'DEX'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.price || 'Price'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {marketStats.price}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.volume_24h || 'Volume (24h)'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {marketStats.volume24h}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.market_cap || t.market?.market_cap || 'Market Cap'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {marketStats.marketCap}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.liquidity || 'Liquidity'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {marketStats.liquidity}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] text-right">
              {isLive ? (exp?.live_liquidity_pool || 'Live Liquidity Pool') : (exp?.awaiting_pair || 'Awaiting Pair Genesis')}
            </div>
          </div>

          {/* Card 2: Staking */}
          <div className="rounded-[28px] bg-white/95 dark:bg-[#13131A]/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] dark:text-[#EAB308] uppercase">
                  {exp?.card_staking || 'Staking'} →
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B] dark:text-[#EAB308]">
                  {exp?.badge_escrow || 'ESCROW'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.apr || 'APR'}</span>
                  <span className="text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums">
                    {stakingStats.apr}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.liquid || 'Liquid'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {stakingStats.liquid}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.native || 'Native'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {stakingStats.native}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] text-right">
              {exp?.staking_verified || 'Streamflow Protocol Verified'}
            </div>
          </div>

          {/* Card 3: Game */}
          <div className="rounded-[28px] bg-white/95 dark:bg-[#13131A]/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] dark:text-[#EAB308] uppercase">
                  {exp?.card_game || 'Game'} →
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400">
                  {exp?.badge_coming_soon || 'COMING SOON'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.total_rewards || 'Total rewards'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.participation_count || 'Participation count'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.game_rewards || 'Game rewards'}</span>
                  <span className="text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums">
                    $0.00
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 text-[11px] font-mono text-[#B8661B] dark:text-[#EAB308] font-bold text-right">
              {exp?.coming_soon || 'Coming Soon'}
            </div>
          </div>

          {/* Card 4: BLTE Wallet (Placed above supply section) */}
          <div 
            onClick={() => {
              if (onOpenWallet) onOpenWallet();
            }}
            className="rounded-[28px] bg-white/95 dark:bg-[#13131A]/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-2">
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308] shrink-0" />
                  <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] dark:text-[#EAB308] uppercase group-hover:text-[#964E10] dark:group-hover:text-[#FBBF24] transition-colors">
                    {walletCardLabels.title} →
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B] dark:text-[#EAB308] border border-[#E9C9A5] dark:border-[#B8661B]/40 flex items-center gap-1">
                  <span>OFFICIAL WALLET</span>
                </span>
              </div>
              <div className="text-[11px] text-[#B8661B] dark:text-[#FBBF24] font-semibold mb-3 tracking-tight">
                Bitcoin Lite Edition client
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{walletCardLabels.type}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {walletCardLabels.nonCustodial}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{walletCardLabels.network}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    Solana Mainnet
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{walletCardLabels.staking}</span>
                  <span className="text-base font-mono font-bold text-[#B8661B] dark:text-[#EAB308] tabular-nums">
                    11.61% APY
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{walletCardLabels.platforms}</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    iOS · Android · Web
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#64748B] dark:text-[#94A3B8]">{walletCardLabels.beta}</span>
              <span className="text-[#B8661B] dark:text-[#EAB308] font-bold flex items-center gap-1 group-hover:underline">
                <Download className="w-3.5 h-3.5" />
                <span>{walletCardLabels.joinWaitlist}</span>
              </span>
            </div>
          </div>

          {/* Card 5: Supply */}
          <div className="rounded-[28px] bg-white/95 dark:bg-[#13131A]/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:shadow-[0_14px_40px_rgba(184,102,27,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4">
                <span className="text-sm font-mono font-[900] tracking-wider text-[#B8661B] dark:text-[#EAB308] uppercase">
                  {exp?.card_supply || 'Supply'} →
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FAF5EF] dark:bg-[#1C150E] text-[#B8661B] dark:text-[#EAB308]">
                  {exp?.badge_network || 'SOLANA'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.non_circulatory || 'Non circulatory'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {supplyStats.nonCirculatory}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.circulating || 'Circulating'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {supplyStats.circulating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.max_supply || 'Max'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {supplyStats.max}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#52525B] dark:text-[#CBD5E1] font-medium">{exp?.holders || 'Holders'}</span>
                  <span className="text-base font-mono font-bold text-[#080808] dark:text-white tabular-nums">
                    {supplyStats.holders}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] text-right">
              {exp?.zero_inflation || 'Zero Inflation / Immutable'}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
            <Activity className="w-4 h-4 text-[#B8661B] dark:text-[#EAB308]" />
            <span>{exp?.synced || 'Telemetry updated'}: {lastSyncTime === 'Just now' ? (exp?.just_now || 'Just now') : lastSyncTime}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={TOKEN_CONFIG.stakingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-[14px] bg-[#B8661B] hover:bg-[#964E10] text-white font-bold font-mono text-xs transition-colors flex items-center gap-2 shadow-xs"
            >
              <Coins className="w-4 h-4" />
              <span>{exp?.btn_stake ? exp.btn_stake.toUpperCase() : 'STAKE BLTE (11.61% APY)'}</span>
            </a>

            {onOpenTradeModal && (
              <button
                onClick={onOpenTradeModal}
                className="px-5 py-3 rounded-[14px] bg-[#111111] hover:bg-[#B8661B] text-white font-bold font-mono text-xs transition-colors cursor-pointer shadow-xs"
              >
                {t.nav.buy_trade || 'BUY / TRADE'}
              </button>
            )}

            {onOpenExplore && (
              <button
                onClick={onOpenExplore}
                className="px-5 py-3 rounded-[14px] bg-white dark:bg-[#18181D] hover:bg-[#FAF5EF] text-[#080808] dark:text-white font-bold font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Compass className="w-4 h-4 text-[#B8661B]" />
                <span>{exp?.btn_explore_panel || 'EXPLORE PANEL'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
