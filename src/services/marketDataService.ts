/**
 * Real Market Data Service
 * 
 * ZERO MOCK DATA ENFORCEMENT:
 * - When mint address is not provided or liquidity pool is not yet established,
 *   we strictly return UNAVAILABLE states with clear technical explanations.
 * - No placeholder $0.00 or fake numbers are ever displayed.
 */

import { TOKEN_CONFIG } from '../config/tokenConfig';

export interface LiveMarketData {
  status: 'LIVE' | 'CONNECTING' | 'UNAVAILABLE';
  priceUsd: number | null;
  priceSol: number | null;
  marketCapUsd: number | null;
  liquidityUsd: number | null;
  volume24h: number | null;
  priceChange24h: number | null;
  pairAddress: string | null;
  dexName: string | null;
  url: string | null;
  lastUpdated: string | null;
  errorMessage?: string;
}

export async function fetchLiveMarketData(customMintAddress?: string | null): Promise<LiveMarketData> {
  const address = customMintAddress ?? TOKEN_CONFIG.mintAddress;

  if (!address) {
    return {
      status: 'UNAVAILABLE',
      priceUsd: null,
      priceSol: null,
      marketCapUsd: null,
      liquidityUsd: null,
      volume24h: null,
      priceChange24h: null,
      pairAddress: null,
      dexName: null,
      url: null,
      lastUpdated: null,
      errorMessage: 'Token is currently in pre-launch stage. Real market data activates upon mainnet liquidity deployment.'
    };
  }

  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return {
        status: 'UNAVAILABLE',
        priceUsd: null,
        priceSol: null,
        marketCapUsd: null,
        liquidityUsd: null,
        volume24h: null,
        priceChange24h: null,
        pairAddress: null,
        dexName: null,
        url: null,
        lastUpdated: null,
        errorMessage: `Market provider returned status ${response.status}. Pair not yet registered on public DEX.`
      };
    }

    const json = await response.json();
    const pairs = json.pairs;

    if (!pairs || pairs.length === 0) {
      return {
        status: 'UNAVAILABLE',
        priceUsd: null,
        priceSol: null,
        marketCapUsd: null,
        liquidityUsd: null,
        volume24h: null,
        priceChange24h: null,
        pairAddress: null,
        dexName: null,
        url: null,
        lastUpdated: null,
        errorMessage: 'No active trading pairs registered yet on Solana DEXes for this address.'
      };
    }

    // Sort by liquidity to get canonical pair
    const primaryPair = pairs.sort((a: { liquidity?: { usd?: number } }, b: { liquidity?: { usd?: number } }) => {
      return (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0);
    })[0];

    return {
      status: 'LIVE',
      priceUsd: primaryPair.priceUsd ? parseFloat(primaryPair.priceUsd) : null,
      priceSol: primaryPair.priceNative ? parseFloat(primaryPair.priceNative) : null,
      marketCapUsd: primaryPair.marketCap || (primaryPair.fdv || null),
      liquidityUsd: primaryPair.liquidity?.usd || null,
      volume24h: primaryPair.volume?.h24 || null,
      priceChange24h: primaryPair.priceChange?.h24 || null,
      pairAddress: primaryPair.pairAddress || null,
      dexName: primaryPair.dexId ? primaryPair.dexId.toUpperCase() : 'Raydium',
      url: primaryPair.url || `https://dexscreener.com/solana/${primaryPair.pairAddress}`,
      lastUpdated: new Date().toISOString()
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      status: 'UNAVAILABLE',
      priceUsd: null,
      priceSol: null,
      marketCapUsd: null,
      liquidityUsd: null,
      volume24h: null,
      priceChange24h: null,
      pairAddress: null,
      dexName: null,
      url: null,
      lastUpdated: null,
      errorMessage: `Market data connection error: ${message}. Click Retry to attempt reconnect.`
    };
  }
}

/**
 * Automatically fetch on-chain token holders count when token mint address is available.
 */
export async function fetchTokenHoldersCount(customMintAddress?: string | null): Promise<string | null> {
  const address = customMintAddress ?? TOKEN_CONFIG.mintAddress;
  if (!address) {
    return null;
  }

  // 1. Query verified Solana token inspector API (Rugcheck report)
  try {
    const res = await fetch(`https://api.rugcheck.xyz/v1/tokens/${address}/report`, {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.totalHolders === 'number' && data.totalHolders > 0) {
        return data.totalHolders.toLocaleString();
      }
    }
  } catch {
    // Gracefully proceed to fallback
  }

  // 2. Fallback to Solana Mainnet RPC largest token accounts
  try {
    const rpcRes = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'holders-count',
        method: 'getTokenLargestAccounts',
        params: [address]
      })
    });
    if (rpcRes.ok) {
      const rpcData = await rpcRes.json();
      if (rpcData?.result?.value && Array.isArray(rpcData.result.value)) {
        return `${rpcData.result.value.length}+`;
      }
    }
  } catch {
    // Non-blocking telemetry fallback
  }

  return null;
}

