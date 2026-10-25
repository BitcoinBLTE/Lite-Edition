import React, { useState } from 'react';

interface RotatingCoinLogoProps {
  size?: number;
  className?: string;
  speedSeconds?: number;
  ariaLabel?: string;
  mode?: 'spin' | 'static';
}

/**
 * Official Website Logo Icon
 * Uses the official user-uploaded Bitcoin Lite Edition emblem with graceful fallbacks
 * to guarantee flawless visual rendering under any network or browser environment.
 */
export const RotatingCoinLogo: React.FC<RotatingCoinLogoProps> = ({
  size = 28,
  className = '',
  ariaLabel = 'Bitcoin Lite Edition Logo',
}) => {
  const [errorStep, setErrorStep] = useState(0);

  const fallbackSources = [
    '/falcon-circle.png',
    '/assets/aistudio/IMG-20261020-WA0000_b0a88430.jpg',
    '/falcon-logo.png',
    '/bitcoin-lite-logo.png',
    '/favicon.svg',
  ];

  const currentSrc = fallbackSources[Math.min(errorStep, fallbackSources.length - 1)];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(245,158,11,0.25)] ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
    >
      <img
        src={currentSrc}
        alt={ariaLabel}
        className="w-full h-full object-cover rounded-full pointer-events-none"
        loading="eager"
        decoding="sync"
        onError={() => {
          if (errorStep < fallbackSources.length - 1) {
            setErrorStep((prev) => prev + 1);
          }
        }}
      />
    </div>
  );
};

export const CoinLogo = RotatingCoinLogo;
export default RotatingCoinLogo;
