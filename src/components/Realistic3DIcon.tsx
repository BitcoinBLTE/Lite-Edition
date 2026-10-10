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
  variant?: 'gold' | 'copper' | 'amber' | 'solana';
  animated?: boolean;
}

// Clean custom stroke glyphs matching Lucide line stroke style for Solana & BLTE
const SolanaStrokeIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
    strokeWidth="2"
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
  className = ''
}) => {
  const iconSizeClass =
    size === 'sm'
      ? 'w-5 h-5'
      : size === 'lg'
      ? 'w-8 h-8'
      : size === 'xl'
      ? 'w-10 h-10'
      : 'w-6 h-6';

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

  return (
    <span
      className={`inline-flex items-center justify-center text-[#B8661B] dark:text-[#EAB308] shrink-0 ${className}`}
      aria-hidden="true"
    >
      {renderIcon()}
    </span>
  );
};
