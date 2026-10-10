import React, { useState } from 'react';
import bitcoinLiteLogo from '../assets/images/bitcoin_lite_logo_1791633769447.jpg';

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
  const [hasError, setHasError] = useState(false);
  // Bundled Vite asset in production + fallback to static public asset
  const logoSrc = hasError ? '/bitcoin-lite-logo.jpg' : (bitcoinLiteLogo || '/bitcoin-lite-logo.jpg');

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none rounded-full overflow-hidden shrink-0 border border-[#F59E0B]/70 shadow-sm ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      <img
        src={logoSrc}
        alt={ariaLabel}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover rounded-full pointer-events-none"
        loading="eager"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

// Also export alias CoinLogo for convenience
export const CoinLogo = RotatingCoinLogo;
export default RotatingCoinLogo;

