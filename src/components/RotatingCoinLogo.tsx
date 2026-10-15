import React, { useState } from 'react';
import bitcoinLiteLogo from '../assets/images/bitcoin_lite_logo_1791633769447.jpg';
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none rounded-full overflow-hidden shrink-0 border border-[#F59E0B]/70 shadow-sm bg-[#121215] ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      {/* 100% Reliable Vector SVG Logo Base (Ensures crisp website icon in all deployment environments) */}
      <BitcoinLiteCoinSvg size="100%" className="w-full h-full" ariaLabel={ariaLabel} />

      {/* High-Resolution Photo Overlay when loaded */}
      {!hasError && (
        <img
          src={bitcoinLiteLogo}
          alt={ariaLabel}
          className={`absolute inset-0 w-full h-full object-cover rounded-full pointer-events-none transition-opacity duration-200 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          decoding="sync"
          onLoad={() => setImgLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

// Also export alias CoinLogo for convenience
export const CoinLogo = RotatingCoinLogo;
export default RotatingCoinLogo;

