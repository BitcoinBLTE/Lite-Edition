import React from 'react';

interface BitcoinLiteCoinSvgProps {
  size?: number | string;
  className?: string;
  ariaLabel?: string;
}

export const BitcoinLiteCoinSvg: React.FC<BitcoinLiteCoinSvgProps> = ({
  size = '100%',
  className = '',
  ariaLabel = 'Bitcoin Lite Edition Logo',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`select-none pointer-events-none ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        {/* Outer Gold Milled Rim Gradient */}
        <radialGradient id="blteGoldRim" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="80%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>

        {/* Beveled Edge Gradient */}
        <linearGradient id="blteBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        {/* Inner Dark Obsidian Disc Gradient */}
        <radialGradient id="blteDarkSurface" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#222228" />
          <stop offset="45%" stopColor="#141418" />
          <stop offset="100%" stopColor="#09090C" />
        </radialGradient>

        {/* Central Bitcoin ₿ Emblem Radiant Gradient */}
        <linearGradient id="blteSymbolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="20%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="80%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        <filter id="blteSymbolShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.85" />
        </filter>
      </defs>

      {/* Base Outer Rim Disc */}
      <circle cx="256" cy="256" r="244" fill="url(#blteGoldRim)" />

      {/* Outer Milled Tick Ring */}
      <circle cx="256" cy="256" r="240" fill="none" stroke="#78350F" strokeWidth="3" strokeDasharray="3.5 4.5" />
      
      {/* Outer Bevel Rings */}
      <circle cx="256" cy="256" r="232" fill="none" stroke="#FEF3C7" strokeWidth="4" opacity="0.9" />
      <circle cx="256" cy="256" r="226" fill="none" stroke="#92400E" strokeWidth="2.5" />

      {/* Inner Dark Obsidian Core */}
      <circle cx="256" cy="256" r="196" fill="url(#blteDarkSurface)" />
      <circle cx="256" cy="256" r="194" fill="none" stroke="url(#blteBevelGrad)" strokeWidth="4" />

      {/* Concentric Micro-Grooves */}
      <circle cx="256" cy="256" r="170" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.12" />
      <circle cx="256" cy="256" r="148" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.1" />
      <circle cx="256" cy="256" r="126" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.08" />

      {/* Rim Arc Paths for Typography */}
      <path id="blteTopArc" d="M 68 256 A 188 188 0 0 1 444 256" fill="none" />
      <path id="blteBottomArc" d="M 444 256 A 188 188 0 0 1 68 256" fill="none" />

      {/* Top Text: $BLTE */}
      <text fontFamily="'Outfit', 'Inter', system-ui, sans-serif" fontWeight="900" fontSize="28" fill="#FFFFFF" letterSpacing="4">
        <textPath href="#blteTopArc" startOffset="50%" textAnchor="middle">
          ★  $BLTE  ★
        </textPath>
      </text>

      {/* Bottom Text: BITCOIN LITE EDITION */}
      <text fontFamily="'Inter', 'Outfit', system-ui, sans-serif" fontWeight="900" fontSize="21" fill="#FEF08A" letterSpacing="3.5">
        <textPath href="#blteBottomArc" startOffset="50%" textAnchor="middle">
          BITCOIN LITE EDITION
        </textPath>
      </text>

      {/* Central Bitcoin ₿ Glyph */}
      <g filter="url(#blteSymbolShadow)" transform="translate(0, -6)">
        <text
          x="256"
          y="278"
          fontFamily="'Cinzel', 'Times New Roman', 'Inter', serif"
          fontWeight="900"
          fontSize="210"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#blteSymbolGrad)"
          stroke="#78350F"
          strokeWidth="6"
          paintOrder="stroke fill"
        >
          ₿
        </text>
        <text
          x="254"
          y="276"
          fontFamily="'Cinzel', 'Times New Roman', 'Inter', serif"
          fontWeight="900"
          fontSize="210"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#blteSymbolGrad)"
          stroke="#FFFBEB"
          strokeWidth="1.5"
          paintOrder="stroke fill"
        >
          ₿
        </text>
      </g>
    </svg>
  );
};
