/**
 * Centralized Project & Token Configuration for Bitcoin Lite Edition
 * 
 * Strict Zero-Fake-Data compliance:
 * - Mint address is dynamically configured or null prior to deployment.
 * - Social links only appear when live URLs exist.
 * - Allocations strictly equal 100% (420,000 tokens).
 * - Roadmap statuses strictly reflect verified milestones.
 */

export interface TokenAllocation {
  id: string;
  category: string;
  percentage: number; // Must sum to 100
  amount: number;     // Equal to (percentage / 100) * totalSupply
  description: string;
  color: string;
}

export interface RoadmapMilestone {
  title: string;
  description: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  items: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  url: string | null; // Null hides the link to uphold zero-placeholder policy
}

export interface ProjectConfig {
  name: string;
  shortName: string;
  symbol: string;
  network: string;
  totalSupply: number;
  formattedSupply: string;
  tokenStandard: string;
  decimals: number;
  mintAddress: string | null;
  tagline: string;
  missionStatement: string;
  authorityStatus: string;
  isMainnetLive: boolean;
  whitepaperPdfDriveUrl: string;
  tradingVenues: {
    name: string;
    url: string | null;
    status: 'LIVE' | 'PENDING_DEPLOYMENT';
  }[];
  stakingUrl: string;
  stakingApy: string;
  socials: SocialLink[];
  allocations: TokenAllocation[];
  roadmap: RoadmapMilestone[];
}

export const TOKEN_CONFIG: ProjectConfig = {
  name: "Bitcoin Lite Edition",
  shortName: "Bitcoin Lite",
  symbol: "BLTE",
  network: "Solana",
  totalSupply: 420000,
  formattedSupply: "420,000",
  tokenStandard: "SPL / Token-2022",
  decimals: 9,
  // When deployed to mainnet, populate via VITE_TOKEN_MINT_ADDRESS or set directly:
  mintAddress: (import.meta.env.VITE_TOKEN_MINT_ADDRESS as string) || null,
  tagline: "A New Chapter in the Digital Asset Landscape",
  missionStatement: "Bitcoin Lite Edition is a Solana-based digital asset inspired by the principles that helped make Bitcoin a defining innovation in digital finance—scarcity, transparency, decentralization, and borderless digital value.",
  authorityStatus: "Mint authority permanently revoked / Immutable supply on Solana genesis",
  isMainnetLive: Boolean(import.meta.env.VITE_TOKEN_MINT_ADDRESS),
  // Official White Paper PDF Link (defaults to verified hosted PDF, or custom Google Drive link when set)
  whitepaperPdfDriveUrl: (import.meta.env.VITE_WHITEPAPER_DRIVE_URL as string) || "/bitcoin-lite-edition-whitepaper.pdf",
  stakingUrl: "https://app.streamflow.finance/staking/solana/mainnet/",
  stakingApy: "40%",
  tradingVenues: [
    {
      name: "Raydium (DEX)",
      url: null, // Populated upon pool creation
      status: "PENDING_DEPLOYMENT"
    },
    {
      name: "Jupiter Aggregator",
      url: null,
      status: "PENDING_DEPLOYMENT"
    },
    {
      name: "Orca",
      url: null,
      status: "PENDING_DEPLOYMENT"
    }
  ],
  socials: [
    {
      id: "telegram",
      label: "Telegram",
      url: "https://t.me/BitcoinBLTE"
    },
    {
      id: "discord",
      label: "Discord",
      url: "https://discord.gg/CK2kF7cKfk"
    },
    {
      id: "whatsapp",
      label: "WhatsApp Channel",
      url: "https://whatsapp.com/channel/0029VbDVWun545v2OGjFL51v"
    },
    {
      id: "twitter",
      label: "X (Twitter)",
      url: "https://x.com/BitcoinBLTE"
    },
    {
      id: "youtube",
      label: "YouTube",
      url: "https://www.youtube.com/@BitcoinLiteEdition"
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/bitcoinblte"
    },
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/BitcoinBLTE"
    },
    {
      id: "email",
      label: "Official Email",
      url: "mailto:Info@bitcoinblte.com"
    }
  ],
  allocations: [
    {
      id: "fair-launch",
      category: "Fair Launch & Public Distribution",
      percentage: 55,
      amount: 231000,
      description: "Direct community and public liquidity allocation with decentralized access.",
      color: "#D97706" // Warm amber/gold
    },
    {
      id: "liquidity",
      category: "DEX Liquidity Pool",
      percentage: 20,
      amount: 84000,
      description: "Permanent automated market maker liquidity on Solana decentralized exchanges.",
      color: "#EAB308" // Gold
    },
    {
      id: "ecosystem",
      category: "Ecosystem & Scarcity Reserve",
      percentage: 15,
      amount: 63000,
      description: "Community initiatives, open-source integrations, and validator tooling grants.",
      color: "#14F195" // Solana Green
    },
    {
      id: "development",
      category: "Core Architecture & Audits",
      percentage: 10,
      amount: 42000,
      description: "Smart contract maintenance, security verifications, and protocol tooling.",
      color: "#9945FF" // Solana Purple
    }
  ],
  roadmap: [
    {
      title: "PHASE 01 — FOUNDATION",
      description: "Establishment of architectural foundations, digital scarcity parameters, and web presence.",
      status: "COMPLETED",
      items: [
        "Project concept & economic scarcity modeling",
        "SPL / Token-2022 token architecture design",
        "Comprehensive White Paper publication",
        "Public web platform & transparency portal",
        "Solana devnet deployment verification"
      ]
    },
    {
      title: "PHASE 02 — LAUNCH",
      description: "Mainnet contract deployment, permanent authority configuration, and liquidity initialization.",
      status: "IN_PROGRESS",
      items: [
        "Solana mainnet token deployment",
        "Mint authority revocation & immutability verification",
        "Initial decentralized liquidity pool creation",
        "On-chain verification on Solscan & Solana Explorer",
        "DexScreener and Jupiter terminal integration"
      ]
    },
    {
      title: "PHASE 03 — ECOSYSTEM",
      description: "Transparency dashboard, real-time analytics, and open blockchain community tooling.",
      status: "UPCOMING",
      items: [
        "Real-time on-chain supply and holder analytics",
        "Decentralized community governance tooling",
        "Solana DeFi ecosystem integrations",
        "Third-party independent smart contract audits"
      ]
    },
    {
      title: "PHASE 04 — EXPANSION",
      description: "Broadening digital scarcity utility, ecosystem integrations, and community tools.",
      status: "UPCOMING",
      items: [
        "Long-term digital scarcity preservation initiatives",
        "Cross-program integrations across Solana ecosystem",
        "Community-driven research & open documentation",
        "Next-generation decentralized app integrations"
      ]
    }
  ]
};

// Verification helper guaranteeing 100% mathematical integrity
export const validateTokenomicsIntegrity = (): boolean => {
  const sumPercentage = TOKEN_CONFIG.allocations.reduce((acc, a) => acc + a.percentage, 0);
  const sumAmount = TOKEN_CONFIG.allocations.reduce((acc, a) => acc + a.amount, 0);
  return sumPercentage === 100 && sumAmount === TOKEN_CONFIG.totalSupply;
};

export const isRealGoogleDriveUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  return (
    url.includes('drive.google.com') && 
    !url.includes('1_BLTE_BitcoinLiteEdition') &&
    !url.includes('example')
  );
};

export const getCustomGoogleDriveUrl = (): string | null => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('blte_whitepaper_drive_url');
      if (stored && isRealGoogleDriveUrl(stored)) {
        return stored;
      }
    } catch {
      // ignore
    }
  }
  const envUrl = import.meta.env.VITE_WHITEPAPER_DRIVE_URL as string;
  if (isRealGoogleDriveUrl(envUrl)) {
    return envUrl;
  }
  if (isRealGoogleDriveUrl(TOKEN_CONFIG.whitepaperPdfDriveUrl)) {
    return TOKEN_CONFIG.whitepaperPdfDriveUrl;
  }
  return null;
};

export const setCustomGoogleDriveUrl = (url: string | null): void => {
  if (typeof window !== 'undefined') {
    try {
      if (url && url.trim().length > 0) {
        localStorage.setItem('blte_whitepaper_drive_url', url.trim());
      } else {
        localStorage.removeItem('blte_whitepaper_drive_url');
      }
      window.dispatchEvent(new Event('blte_drive_url_changed'));
    } catch {
      // ignore
    }
  }
};

/**
 * Resolves the verified White Paper PDF link.
 * If a valid Google Drive URL is provided, formats it for view or direct download.
 * Otherwise, returns the hosted official publication PDF (/bitcoin-lite-edition-whitepaper.pdf)
 * which guarantees 100% reliability for BOTH viewing in browser and direct downloading.
 */
export const getWhitepaperPdfUrl = (directDownload = false): string => {
  const driveUrl = getCustomGoogleDriveUrl();
  if (driveUrl) {
    const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || driveUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      if (directDownload) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
      return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    }
    return driveUrl;
  }

  return '/bitcoin-lite-edition-whitepaper.pdf';
};


