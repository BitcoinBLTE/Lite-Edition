import React from 'react';
import {
  Coins,
  Bitcoin,
  ShieldCheck,
  Compass,
  ArrowLeftRight,
  Zap,
  Layers,
  Droplets,
  Network,
  Route,
  Rocket,
  Scale,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Gem,
  Globe,
  Wallet,
  KeyRound,
  Percent,
  Receipt,
  Database,
  Pickaxe,
  Scissors,
  Server,
  Clock,
  Box,
  Building2,
  Maximize2,
  Lock,
  FileCode,
  Sparkles,
  Sliders,
  CircleDollarSign,
  Eye,
  FileText
} from 'lucide-react';

export type Realistic3DIconType =
  // 18 Explicit Focus Types
  | 'token-supply'
  | 'bitcoin'
  | 'blte'
  | 'solana'
  | 'execution'
  | 'liquidity'
  | 'staking'
  | 'security'
  | 'transparency'
  | 'decentralization'
  | 'transactions'
  | 'explorer'
  | 'roadmap'
  | 'fair-launch'
  | 'bitcoin-comparison'
  | 'architecture'
  | 'verification'
  | 'market'
  | 'acquisition'
  // Existing & Mechanism Types
  | 'scarcity'
  | 'globe'
  | 'distinction'
  | 'wallet'
  | 'sol'
  | 'dex'
  | 'mint'
  | 'slippage'
  | 'confirm'
  | 'receipt'
  | 'ledger'
  | 'utxo'
  | 'mining'
  | 'keys'
  | 'halving'
  | 'nodes'
  | 'speed'
  | 'fee'
  | 'clock'
  | 'blocks'
  | 'foundation'
  | 'launch'
  | 'ecosystem'
  | 'expansion'
  | 'shield'
  | 'lock'
  | 'contract';

interface Realistic3DIconProps {
  type: Realistic3DIconType | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'medallion' | 'plain';
  animated?: boolean;
}

// Clean custom stroke glyphs matching Lucide line stroke style for Solana & BLTE
const SolanaStrokeIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 17.5l3.5-3.5h12.5l-3.5 3.5H4z" />
    <path d="M7.5 12l-3.5-3.5h12.5l3.5 3.5H7.5z" />
    <path d="M4 6.5L7.5 3H20l-3.5 3.5H4z" />
  </svg>
);

const BlteStrokeIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 8.5h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4" />
    <path d="M9.5 12.5h4.5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9.5" />
    <path d="M11 6v2.5" />
    <path d="M14 6v2.5" />
    <path d="M11 16.5V19" />
    <path d="M14 16.5V19" />
  </svg>
);

export const Realistic3DIcon: React.FC<Realistic3DIconProps> = ({
  type,
  size = 'md',
  className = '',
  variant = 'medallion',
}) => {
  const containerClass =
    size === 'sm'
      ? 'w-8 h-8 rounded-[11px] p-1.5'
      : size === 'lg'
      ? 'w-14 h-14 rounded-[18px] p-3'
      : size === 'xl'
      ? 'w-18 h-18 rounded-[22px] p-4'
      : 'w-11 h-11 rounded-[15px] p-2.5';

  const iconSizeClass =
    size === 'sm'
      ? 'w-4 h-4'
      : size === 'lg'
      ? 'w-7 h-7'
      : size === 'xl'
      ? 'w-9 h-9'
      : 'w-5 h-5';

  const renderIcon = () => {
    switch (type) {
      case 'token-supply':
        return <CircleDollarSign className={iconSizeClass} />;
      case 'bitcoin':
        return <Bitcoin className={iconSizeClass} />;
      case 'blte':
        return <BlteStrokeIcon className={iconSizeClass} />;
      case 'solana':
      case 'sol':
        return <SolanaStrokeIcon className={iconSizeClass} />;
      case 'execution':
      case 'speed':
        return <Zap className={iconSizeClass} />;
      case 'liquidity':
        return <Droplets className={iconSizeClass} />;
      case 'staking':
        return <Coins className={iconSizeClass} />;
      case 'security':
      case 'shield':
        return <ShieldCheck className={iconSizeClass} />;
      case 'transparency':
        return <Eye className={iconSizeClass} />;
      case 'decentralization':
      case 'nodes':
        return <Network className={iconSizeClass} />;
      case 'transactions':
      case 'dex':
        return <ArrowLeftRight className={iconSizeClass} />;
      case 'explorer':
        return <Compass className={iconSizeClass} />;
      case 'roadmap':
        return <Route className={iconSizeClass} />;
      case 'fair-launch':
      case 'launch':
        return <Rocket className={iconSizeClass} />;
      case 'bitcoin-comparison':
        return <Scale className={iconSizeClass} />;
      case 'architecture':
      case 'utxo':
        return <Layers className={iconSizeClass} />;
      case 'verification':
      case 'confirm':
        return <CheckCircle2 className={iconSizeClass} />;
      case 'market':
        return <TrendingUp className={iconSizeClass} />;
      case 'acquisition':
        return <CreditCard className={iconSizeClass} />;
      case 'scarcity':
        return <Gem className={iconSizeClass} />;
      case 'globe':
      case 'ecosystem':
        return <Globe className={iconSizeClass} />;
      case 'distinction':
        return <Sparkles className={iconSizeClass} />;
      case 'wallet':
        return <Wallet className={iconSizeClass} />;
      case 'mint':
        return <Coins className={iconSizeClass} />;
      case 'slippage':
        return <Sliders className={iconSizeClass} />;
      case 'receipt':
        return <Receipt className={iconSizeClass} />;
      case 'ledger':
        return <Database className={iconSizeClass} />;
      case 'mining':
        return <Pickaxe className={iconSizeClass} />;
      case 'keys':
        return <KeyRound className={iconSizeClass} />;
      case 'halving':
        return <Scissors className={iconSizeClass} />;
      case 'fee':
        return <Percent className={iconSizeClass} />;
      case 'clock':
        return <Clock className={iconSizeClass} />;
      case 'blocks':
        return <Box className={iconSizeClass} />;
      case 'foundation':
        return <Building2 className={iconSizeClass} />;
      case 'expansion':
        return <Maximize2 className={iconSizeClass} />;
      case 'lock':
        return <Lock className={iconSizeClass} />;
      case 'contract':
        return <FileCode className={iconSizeClass} />;
      default:
        return <Sparkles className={iconSizeClass} />;
    }
  };

  if (variant === 'plain') {
    return (
      <span
        className={`inline-flex items-center justify-center text-[#B8661B] dark:text-[#EAB308] shrink-0 ${className}`}
        aria-hidden="true"
      >
        {renderIcon()}
      </span>
    );
  }

  // Luxury 3D Medallion Presentation with Multi-Layer Specular Gradients and Ambient Drop Shadow
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EA] to-[#F3E7D3] dark:from-[#281D12] dark:via-[#1B140D] dark:to-[#120D08] border border-[#EAB308]/30 dark:border-[#EAB308]/35 shadow-[0_3px_12px_rgba(184,102,27,0.09),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(253,224,71,0.2),0_0_12px_rgba(234,179,8,0.12)] text-[#B8661B] dark:text-[#FBBF24] transition-all duration-300 group-hover:scale-105 group-hover:border-[#EAB308]/60 group-hover:shadow-[0_6px_24px_rgba(184,102,27,0.18)] ${containerClass} ${className}`}
      aria-hidden="true"
    >
      {/* Specular Top Arch Highlight */}
      <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] bg-gradient-to-b from-white/60 dark:from-white/12 to-transparent pointer-events-none" />

      {/* Primary Glyph */}
      <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(184,102,27,0.25)] dark:drop-shadow-[0_1px_4px_rgba(234,179,8,0.4)] flex items-center justify-center">
        {renderIcon()}
      </span>
    </div>
  );
};
