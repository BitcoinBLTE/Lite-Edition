import React from 'react';
import { BitcoinLiteCoinSvg } from './BitcoinLiteCoinSvg';

interface RotatingCoinLogoProps {
  size?: number;
  className?: string;
  speedSeconds?: number;
  ariaLabel?: string;
  mode?: 'spin' | 'static';
}

export const RotatingCoinLogo: React.FC<RotatingCoinLogoProps> = ({
  size = 28,
  className = '',
  ariaLabel = 'Bitcoin Lite Edition Logo',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Exact Front-Side Coin Render matching rotating 3D coin */}
      <BitcoinLiteCoinSvg size="100%" className="w-full h-full" ariaLabel={ariaLabel} />
    </div>
  );
};

// Also export alias CoinLogo for convenience
export const CoinLogo = RotatingCoinLogo;
export default RotatingCoinLogo;

