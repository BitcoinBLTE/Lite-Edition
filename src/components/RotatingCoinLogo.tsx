import React from 'react';

interface RotatingCoinLogoProps {
  size?: number;
  className?: string;
  speedSeconds?: number;
  ariaLabel?: string;
  mode?: 'spin' | 'static';
}

/**
 * Official Website Logo Icon
 * Uses the official user-uploaded Bitcoin Lite Edition emblem without affecting the 3D rotating coin.
 */
export const RotatingCoinLogo: React.FC<RotatingCoinLogoProps> = ({
  size = 28,
  className = '',
  ariaLabel = 'Bitcoin Lite Edition Logo',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(245,158,11,0.25)] ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      <img
        src="/assets/aistudio/IMG-20261020-WA0000_b0a88430.jpg"
        alt={ariaLabel}
        className="w-full h-full object-cover rounded-full pointer-events-none"
        loading="eager"
        decoding="sync"
      />
    </div>
  );
};

export const CoinLogo = RotatingCoinLogo;
export default RotatingCoinLogo;
