import React, { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink, TrendingUp, TrendingDown, AlertCircle, BarChart3 } from 'lucide-react';
import { TOKEN_CONFIG } from '../config/tokenConfig';
import { fetchLiveMarketData, LiveMarketData } from '../services/marketDataService';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import { Realistic3DIcon } from './Realistic3DIcon';

interface MarketSectionProps {
  onOpenTradeModal: () => void;
}

export const MarketSection: React.FC<MarketSectionProps> = ({ onOpenTradeModal }) => {
  const { t } = useLanguage();
  const { isBlack } = useTheme();
  const [marketData, setMarketData] = useState<LiveMarketData>({
    status: 'CONNECTING',
    priceUsd: null,
    priceSol: null,
    marketCapUsd: null,
    liquidityUsd: null,
    volume24h: null,
    priceChange24h: null,
    pairAddress: null,
    dexName: null,
    url: null,
    lastUpdated: null
  });
  const [showChart, setShowChart] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const loadData = async () => {
    setIsRetrying(true);
    setMarketData((prev) => ({ ...prev, status: 'CONNECTING' }));
    const result = await fetchLiveMarketData();
    setMarketData(result);
    setIsRetrying(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const explorerUrl = TOKEN_CONFIG.mintAddress
    ? `https://solscan.io/token/${TOKEN_CONFIG.mintAddress}`
    : `https://solscan.io`;

  const isLive = marketData.status === 'LIVE' && marketData.priceUsd !== null;

  return (
    <section id="market" className="py-20 md:py-28 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs font-mono font-bold tracking-[3.5px] uppercase text-[#B8661B] mb-3.5 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8661B] shrink-0" aria-hidden="true" />
              <span>{t.market.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-[900] text-[#080808] font-display tracking-tight leading-[1.15]">
              {t.market.title}
            </h2>
            <p className="mt-3 text-base text-[#4A4A4A] font-[450] max-w-xl leading-[1.8]">
              {t.market.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isRetrying}
              className="px-4 py-2.5 text-xs font-mono font-bold text-[#080808] hover:text-black bg-[#FCFCFC] hover:bg-[#F5F5F5] border border-[#D9D9D9] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin text-[#B8661B]' : 'text-[#4A4A4A]'}`} />
              <span>{isRetrying ? t.market.retry_connecting : t.market.retry}</span>
            </button>
          </div>
        </div>

        {/* Live Data Grid or Truthful Zero-Mock Unavailable State */}
        {isLive ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {/* Current Price */}
              <div className="bg-[#FCFCFC] p-6 rounded-[22px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider block">{t.market.current_price}</span>
                <span className="text-lg sm:text-xl font-mono font-[800] text-[#080808] mt-1.5 block tabular-nums">
                  ${marketData.priceUsd?.toFixed(4)}
                </span>
                <span className="text-xs font-mono text-[#666666] block mt-0.5">
                  {marketData.priceSol?.toFixed(6)} SOL
                </span>
              </div>

              {/* 24h Change */}
              <div className="bg-[#FCFCFC] p-6 rounded-[22px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider block">{t.market.change_24h}</span>
                <span className={`text-lg sm:text-xl font-mono font-[800] mt-1.5 flex items-center gap-1 tabular-nums ${
                  (marketData.priceChange24h || 0) >= 0 ? 'text-[#16A34A]' : 'text-[#E11D48]'
                }`}>
                  {(marketData.priceChange24h || 0) >= 0 ? (
                    <TrendingUp className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 stroke-[2.5]" />
                  )}
                  {marketData.priceChange24h?.toFixed(2)}%
                </span>
              </div>

              {/* Market Cap */}
              <div className="bg-[#FCFCFC] p-6 rounded-[22px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider block">{t.market.market_cap}</span>
                <span className="text-lg sm:text-xl font-mono font-[800] text-[#080808] mt-1.5 block tabular-nums">
                  ${marketData.marketCapUsd?.toLocaleString()}
                </span>
              </div>

              {/* Liquidity */}
              <div className="bg-[#FCFCFC] p-6 rounded-[22px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider block">{t.market.liquidity}</span>
                <span className="text-lg sm:text-xl font-mono font-[800] text-[#080808] mt-1.5 block tabular-nums">
                  ${marketData.liquidityUsd?.toLocaleString()}
                </span>
              </div>

              {/* 24H Volume */}
              <div className="bg-[#FCFCFC] p-6 rounded-[22px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider block">{t.market.volume_24h}</span>
                <span className="text-lg sm:text-xl font-mono font-[800] text-[#080808] mt-1.5 block tabular-nums">
                  ${marketData.volume24h?.toLocaleString()}
                </span>
              </div>

              {/* Holders */}
              <div className="bg-[#FCFCFC] p-6 rounded-[22px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider block">{t.market.holders}</span>
                <span className="text-lg sm:text-xl font-mono font-[800] text-[#080808] mt-1.5 block tabular-nums">
                  {t.market.holders_val}
                </span>
              </div>

              {/* Venue */}
              <div className="bg-[#FCFCFC] p-6 rounded-[22px] border border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-mono font-bold text-[#888888] uppercase tracking-wider block">{t.market.dex_venue}</span>
                <span className="text-lg sm:text-xl font-mono font-[800] text-[#080808] mt-1.5 block">
                  {marketData.dexName}
                </span>
              </div>
            </div>

            {/* Embedded Chart View */}
            {showChart && marketData.pairAddress && (
              <div className="bg-[#FCFCFC] rounded-[28px] border border-[#E5E5E5] overflow-hidden h-[500px] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                <iframe
                  title="DexScreener Live Price Chart"
                  src={`https://dexscreener.com/solana/${marketData.pairAddress}?embed=1&theme=${isBlack ? 'dark' : 'light'}&trades=0&info=0`}
                  className="w-full h-full border-0"
                />
              </div>
            )}
          </div>
        ) : (
          /* TRUTHFUL ZERO-MOCK DATA STATE: Large Editorial Card */
          <div className="bg-[#FCFCFC] rounded-[32px] sm:rounded-[42px] border border-[#E5E5E5] shadow-[0_4px_28px_rgba(0,0,0,0.05)] p-8 sm:p-14 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Realistic3DIcon type="dex" size="xl" />
            </div>

            <div className="text-xs font-mono font-bold uppercase tracking-[3px] text-[#B8661B] mb-2.5">
              {marketData.status === 'CONNECTING' ? t.market.status_connecting : t.market.status_unavailable}
            </div>

            <h3 className="text-2xl sm:text-3xl font-[900] text-[#080808] font-display tracking-tight mb-3">
              {t.market.activates_title}
            </h3>

            <p className="text-sm sm:text-base text-[#4A4A4A] font-[450] leading-[1.8] max-w-xl mx-auto">
              {marketData.errorMessage || t.market.activates_desc}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={loadData}
                disabled={isRetrying}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold rounded-[16px] bg-[#111111] hover:bg-[#B8661B] text-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>{t.market.retry}</span>
              </button>

              <button
                onClick={() => setShowChart(!showChart)}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-[16px] bg-white hover:bg-[#F9F9F9] text-[#222222] border border-[#D9D9D9] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-[#B8661B] stroke-[2]" />
                <span>{t.market.btn_price_chart}</span>
              </button>

              <button
                onClick={onOpenTradeModal}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-[16px] bg-[#F5F5F5] hover:bg-[#EAEAEA] text-[#080808] border border-[#E5E5E5] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.market.btn_buy_trade}</span>
              </button>

              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-[16px] bg-white hover:bg-[#F9F9F9] text-[#4A4A4A] hover:text-[#080808] border border-[#D9D9D9] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all flex items-center gap-2"
              >
                <span>{t.market.btn_view_explorer}</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
              </a>
            </div>

            {/* Price Chart Preview / Status */}
            {showChart && (
              <div className="mt-10 p-7 bg-white rounded-[24px] border border-[#E5E5E5] text-left shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#080808] uppercase tracking-[2px]">
                    {t.market.chart_terminal}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#B8661B]">
                    {t.market.awaiting_pool}
                  </span>
                </div>
                <div className="h-44 rounded-[16px] border border-dashed border-[#D9D9D9] flex flex-col items-center justify-center p-6 text-center text-xs text-[#666666]">
                  <BarChart3 className="w-8 h-8 text-[#B8661B] mb-2 stroke-[1.75]" />
                  <p className="font-bold text-[#080808] font-display text-sm">{t.market.candlestick_title}</p>
                  <p className="text-[#666666] mt-1 max-w-sm leading-relaxed">
                    {t.market.candlestick_desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
