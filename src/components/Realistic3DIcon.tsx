import React from 'react';

export type Realistic3DIconType =
  | 'scarcity'
  | 'execution'
  | 'security'
  | 'transparency'
  | 'globe'
  | 'verification'
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
  | 'lock';

interface Realistic3DIconProps {
  type: Realistic3DIconType | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'gold' | 'copper' | 'amber' | 'solana';
}

export const Realistic3DIcon: React.FC<Realistic3DIconProps> = ({
  type,
  size = 'md',
  className = '',
  variant = 'gold',
}) => {
  const sizeMap = {
    sm: { container: 'w-9 h-9', svg: 36, radius: 'rounded-[12px]' },
    md: { container: 'w-11 h-11', svg: 44, radius: 'rounded-[14px]' },
    lg: { container: 'w-13 h-13 sm:w-14 sm:h-14', svg: 54, radius: 'rounded-[16px]' },
    xl: { container: 'w-16 h-16 sm:w-18 sm:h-18', svg: 68, radius: 'rounded-[20px]' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Render high-fidelity 3D Vector Glyphs with multi-plane extrusion, specular reflections, and physical depth
  const render3DGlyph = () => {
    switch (type) {
      // 01 SCARCITY / FIXED CAP VAULT INGOT
      case 'scarcity':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* 3D Gold Ingot Bottom Shadow Extrusion */}
            <path
              d="M12 28 L36 28 L42 22 L18 22 Z"
              fill="url(#deepBronze-3d)"
              opacity="0.8"
            />
            {/* 3D Gold Ingot Base Body */}
            <path
              d="M12 26 L36 26 L34 20 L14 20 Z"
              fill="url(#darkGold-3d)"
            />
            {/* 3D Gold Ingot Top Bevel */}
            <path
              d="M14 20 L34 20 L32 15 L16 15 Z"
              fill="url(#brightGold-3d)"
            />
            {/* Front Ingot Face */}
            <path
              d="M12 26 L14 20 L34 20 L36 26 Z"
              fill="url(#goldSheen-3d)"
            />
            {/* Ingot Stamp Emblem: 420K Symbol */}
            <circle cx="24" cy="23" r="2.5" fill="#78350F" opacity="0.8" />
            <path
              d="M23 22 L25 24 M25 22 L23 24"
              stroke="#FDE68A"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            {/* Specular Highlight Glint */}
            <polygon
              points="15,16 17,15 16,17"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>
        );

      // 02 EXECUTION / HIGH-SPEED SOLANA PRISM
      case 'execution':
      case 'speed':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* 3D Lightning Prism Extruded Sides */}
            <path
              d="M27 9 L15 25 L23 25 L19 39 L33 22 L25 22 Z"
              fill="url(#deepBronze-3d)"
              transform="translate(1.5, 1.5)"
              opacity="0.6"
            />
            {/* 3D Lightning Prism Front Face */}
            <path
              d="M27 9 L15 25 L23 25 L19 39 L33 22 L25 22 Z"
              fill="url(#solanaGold-3d)"
            />
            {/* Prism Facet Split Highlight */}
            <path
              d="M27 9 L24 22 L15 25 Z"
              fill="#FFFFFF"
              opacity="0.4"
            />
            <path
              d="M23 25 L26 22 L33 22 Z"
              fill="#FFFFFF"
              opacity="0.6"
            />
            {/* Energy Core Hotspot */}
            <circle cx="24" cy="22" r="2" fill="#FFFFFF" filter="blur(0.5px)" opacity="0.8" />
          </g>
        );

      // 03 SECURITY / HEAVY METALLIC VAULT PADLOCK
      case 'security':
      case 'lock':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Padlock Steel Shackle (3D Tube with specular curve) */}
            <path
              d="M17 21 V16 C17 11.5 20 8 24 8 C28 8 31 11.5 31 16 V21"
              fill="none"
              stroke="url(#shackleSteel-3d)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Padlock Shackle Cast Shadow */}
            <path
              d="M19 21 V16 C19 13.5 21 11 24 11 C27 11 29 13.5 29 16 V21"
              fill="none"
              stroke="#451A03"
              strokeWidth="1.5"
              opacity="0.4"
            />
            {/* Padlock Solid Body Extrusion */}
            <rect
              x="13"
              y="20"
              width="22"
              height="18"
              rx="4"
              fill="url(#deepBronze-3d)"
              transform="translate(1, 1)"
              opacity="0.6"
            />
            {/* Padlock Solid Body Front */}
            <rect
              x="13"
              y="20"
              width="22"
              height="18"
              rx="4"
              fill="url(#goldSheen-3d)"
            />
            {/* Keyhole Chamber */}
            <circle cx="24" cy="27" r="2.5" fill="#451A03" />
            <polygon points="22.5,27 25.5,27 24.5,33 23.5,33" fill="#451A03" />
            {/* Keyhole Specular Glint */}
            <circle cx="23.5" cy="26.5" r="0.8" fill="#FFFFFF" opacity="0.7" />
          </g>
        );

      // 04 TRANSPARENCY / OPTICAL CONVEX VERIFICATION LENS
      case 'transparency':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* 3D Lens Gold Bezel */}
            <circle
              cx="24"
              cy="24"
              r="13"
              fill="url(#darkGold-3d)"
            />
            <circle
              cx="24"
              cy="24"
              r="11.5"
              fill="url(#brightGold-3d)"
            />
            {/* Lens Glass Convex Interior */}
            <circle
              cx="24"
              cy="24"
              r="9.5"
              fill="url(#glassLens-3d)"
            />
            {/* Center Eye / Aperture Iris */}
            <circle cx="24" cy="24" r="5" fill="#92400E" opacity="0.6" />
            <circle cx="24" cy="24" r="2.5" fill="#451A03" />
            {/* Curved Specular Glint Reflection */}
            <path
              d="M17 19 C20 15 27 15 31 19 C28 17 21 17 17 19 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
            <circle cx="22" cy="22" r="1.2" fill="#FFFFFF" opacity="0.9" />
          </g>
        );

      // 05 GLOBAL ACCESS / 3D ORBITAL GLOBE
      case 'globe':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Planetary Sphere Body */}
            <circle
              cx="24"
              cy="24"
              r="12"
              fill="url(#sphereShading-3d)"
            />
            {/* Globe Lat/Long Meridian Arcs with 3D Specular Curvature */}
            <ellipse
              cx="24"
              cy="24"
              rx="6"
              ry="12"
              fill="none"
              stroke="#FEF3C7"
              strokeWidth="1.2"
              opacity="0.75"
            />
            <line
              x1="12"
              y1="24"
              x2="36"
              y2="24"
              stroke="#FEF3C7"
              strokeWidth="1.2"
              opacity="0.75"
            />
            {/* 3D Angled Planetary Orbital Ring */}
            <ellipse
              cx="24"
              cy="24"
              rx="15"
              ry="4.5"
              transform="rotate(-25 24 24)"
              fill="none"
              stroke="url(#brightGold-3d)"
              strokeWidth="2"
            />
            {/* Sphere Top Specular Glint */}
            <ellipse
              cx="21"
              cy="18"
              rx="3"
              ry="1.5"
              fill="#FFFFFF"
              opacity="0.65"
              transform="rotate(-30 21 18)"
            />
          </g>
        );

      // 06 VERIFICATION / 3D SOLANA PROOF INSIGNIA SHIELD
      case 'verification':
      case 'shield':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* 3D Shield Extrusion */}
            <path
              d="M24 8 L35 12 V22 C35 29 24 38 24 38 C24 38 13 29 13 22 V12 Z"
              fill="url(#deepBronze-3d)"
              transform="translate(1, 1)"
              opacity="0.7"
            />
            {/* 3D Shield Front Surface */}
            <path
              d="M24 8 L35 12 V22 C35 29 24 38 24 38 C24 38 13 29 13 22 V12 Z"
              fill="url(#goldSheen-3d)"
            />
            {/* Inner Shield Inset */}
            <path
              d="M24 11 L32 14 V21 C32 26.5 24 34 24 34 C24 34 16 26.5 16 21 V14 Z"
              fill="url(#darkGold-3d)"
            />
            {/* 3D Embossed Checkmark */}
            <path
              d="M19 22 L23 26 L29 17"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0 1px 2px rgba(69,26,3,0.6))"
            />
          </g>
        );

      // 07 DISTINCTION / MULTI-FACETED CRYSTAL STAR
      case 'distinction':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* 3D Octahedral Crystal Facets */}
            {/* Top Pyramid Facet 1 (Specular) */}
            <polygon points="24,8 14,22 24,19" fill="#FFFFFF" opacity="0.9" />
            {/* Top Pyramid Facet 2 (Gold) */}
            <polygon points="24,8 24,19 34,22" fill="url(#brightGold-3d)" />
            {/* Bottom Pyramid Facet 1 (Amber) */}
            <polygon points="24,40 14,22 24,19" fill="url(#darkGold-3d)" />
            {/* Bottom Pyramid Facet 2 (Bronze Depth) */}
            <polygon points="24,40 24,19 34,22" fill="url(#deepBronze-3d)" />
            {/* Facet Center Ridge Line */}
            <line x1="24" y1="8" x2="24" y2="40" stroke="#FFFBEB" strokeWidth="1" opacity="0.8" />
            <line x1="14" y1="22" x2="34" y2="22" stroke="#FFFBEB" strokeWidth="0.8" opacity="0.6" />
            {/* Specular Star Sparkle on Peak */}
            <circle cx="24" cy="8" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // HOW TO BUY: STEP 01 WALLET / HARDWARE VAULT
      case 'wallet':
        return (
          <g filter="url(#dropShadow-3d)">
            <rect x="11" y="14" width="26" height="20" rx="3.5" fill="url(#deepBronze-3d)" transform="translate(1, 1)" opacity="0.6" />
            <rect x="11" y="14" width="26" height="20" rx="3.5" fill="url(#goldSheen-3d)" />
            {/* Wallet Flap Bevel */}
            <path d="M11 18 L24 25 L37 18" fill="none" stroke="#FEF3C7" strokeWidth="1.5" />
            {/* Gold Clasp with Solana Emblem */}
            <circle cx="24" cy="27" r="3.5" fill="url(#brightGold-3d)" />
            <circle cx="24" cy="27" r="1.5" fill="#451A03" />
            <circle cx="23.3" cy="26.3" r="0.6" fill="#FFFFFF" />
          </g>
        );

      // HOW TO BUY: STEP 02 SOL / COIN STACK
      case 'sol':
      case 'fee':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Bottom Coin */}
            <ellipse cx="24" cy="28" rx="12" ry="4.5" fill="url(#deepBronze-3d)" />
            <ellipse cx="24" cy="27" rx="12" ry="4.5" fill="url(#darkGold-3d)" />
            {/* Middle Coin */}
            <ellipse cx="24" cy="22" rx="12" ry="4.5" fill="url(#deepBronze-3d)" />
            <ellipse cx="24" cy="21" rx="12" ry="4.5" fill="url(#darkGold-3d)" />
            {/* Top Coin */}
            <ellipse cx="24" cy="16" rx="12" ry="4.5" fill="url(#deepBronze-3d)" />
            <ellipse cx="24" cy="15" rx="12" ry="4.5" fill="url(#brightGold-3d)" />
            {/* Solana S-bar on Top Coin */}
            <path
              d="M18 13.5 L28 13.5 M20 15 L30 15 M18 16.5 L28 16.5"
              stroke="#78350F"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Coin Rim Specular Highlight */}
            <path d="M13 15 C13 17 24 19 35 15" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
          </g>
        );

      // HOW TO BUY: STEP 03 DEX / AMM ORBITAL SWAP
      case 'dex':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Counter-Clockwise Orbital Arc 1 */}
            <path
              d="M15 24 C15 17 21 12 28 12 L26 9 M28 12 L25 15"
              fill="none"
              stroke="url(#brightGold-3d)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Clockwise Orbital Arc 2 */}
            <path
              d="M33 24 C33 31 27 36 20 36 L22 39 M20 36 L23 33"
              fill="none"
              stroke="url(#darkGold-3d)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Liquidity Node */}
            <circle cx="24" cy="24" r="3.5" fill="url(#goldSheen-3d)" />
            <circle cx="23.3" cy="23.3" r="1" fill="#FFFFFF" />
          </g>
        );

      // HOW TO BUY: STEP 04 MINT / SMART CONTRACT PAPYRUS
      case 'mint':
      case 'contract':
        return (
          <g filter="url(#dropShadow-3d)">
            <rect x="13" y="10" width="22" height="28" rx="3" fill="url(#deepBronze-3d)" transform="translate(1, 1)" opacity="0.6" />
            <rect x="13" y="10" width="22" height="28" rx="3" fill="url(#goldSheen-3d)" />
            {/* Document Lines */}
            <line x1="17" y1="16" x2="26" y2="16" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="20" x2="31" y2="20" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <line x1="17" y1="24" x2="29" y2="24" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            {/* Holographic Solana Wax Seal */}
            <circle cx="28" cy="30" r="4" fill="url(#brightGold-3d)" />
            <circle cx="28" cy="30" r="2.2" fill="#92400E" />
            <circle cx="27.3" cy="29.3" r="0.7" fill="#FFFFFF" />
          </g>
        );

      // HOW TO BUY: STEP 05 SLIPPAGE / PRECISION DIAL
      case 'slippage':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Outer Gauge Rim */}
            <circle cx="24" cy="24" r="13" fill="url(#darkGold-3d)" />
            <circle cx="24" cy="24" r="10.5" fill="url(#deepBronze-3d)" />
            {/* Dial Tick Marks */}
            <path d="M17 19 L19 20 M24 15 L24 17 M31 19 L29 20" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
            {/* 3D Metallic Needle pointed to 0.1% */}
            <polygon points="23,24 24,14 25,24" fill="#FFFFFF" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))" />
            {/* Center Needle Pivot Pin */}
            <circle cx="24" cy="24" r="2.5" fill="url(#brightGold-3d)" />
            <circle cx="23.5" cy="23.5" r="0.8" fill="#FFFFFF" />
          </g>
        );

      // HOW TO BUY: STEP 06 CONFIRM / CRYPTOGRAPHIC SIGNATURE
      case 'confirm':
        return (
          <g filter="url(#dropShadow-3d)">
            <circle cx="24" cy="24" r="13" fill="url(#deepBronze-3d)" transform="translate(1, 1)" opacity="0.6" />
            <circle cx="24" cy="24" r="13" fill="url(#goldSheen-3d)" />
            <circle cx="24" cy="24" r="10" fill="url(#darkGold-3d)" />
            {/* Bold 3D Signature Checkmark */}
            <path
              d="M18 24 L22 28 L30 18"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0 2px 3px rgba(69,26,3,0.5))"
            />
          </g>
        );

      // HOW TO BUY: STEP 07 RECEIPT / BLOCKCHAIN RADAR
      case 'receipt':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Isometric Block Cube */}
            {/* Top Face */}
            <polygon points="24,11 35,17 24,23 13,17" fill="url(#brightGold-3d)" />
            {/* Left Face */}
            <polygon points="13,17 24,23 24,35 13,29" fill="url(#darkGold-3d)" />
            {/* Right Face */}
            <polygon points="24,23 35,17 35,29 24,35" fill="url(#deepBronze-3d)" />
            {/* Solscan Verification Radar Pulse */}
            <circle cx="24" cy="17" r="3" fill="#FFFFFF" opacity="0.9" />
            <line x1="24" y1="11" x2="24" y2="7" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      // MECHANISMS / BLOCKCHAIN LEDGER
      case 'ledger':
      case 'blocks':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Three Stacked Isometric Blocks */}
            <polygon points="24,7 34,12 24,17 14,12" fill="url(#brightGold-3d)" />
            <polygon points="14,12 24,17 24,23 14,18" fill="url(#darkGold-3d)" />
            <polygon points="24,17 34,12 34,18 24,23" fill="url(#deepBronze-3d)" />

            <polygon points="24,18 34,23 24,28 14,23" fill="url(#brightGold-3d)" />
            <polygon points="14,23 24,28 24,34 14,29" fill="url(#darkGold-3d)" />
            <polygon points="24,28 34,23 34,29 24,34" fill="url(#deepBronze-3d)" />
          </g>
        );

      // MECHANISMS / UTXO MODEL
      case 'utxo':
        return (
          <g filter="url(#dropShadow-3d)">
            <circle cx="17" cy="19" r="6" fill="url(#brightGold-3d)" />
            <circle cx="31" cy="19" r="6" fill="url(#brightGold-3d)" />
            <circle cx="24" cy="30" r="7.5" fill="url(#goldSheen-3d)" />
            <path d="M19 23 L22 26 M29 23 L26 26" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="23" cy="29" r="1.5" fill="#FFFFFF" opacity="0.8" />
          </g>
        );

      // MECHANISMS / COMPUTATIONAL MINING CORE
      case 'mining':
        return (
          <g filter="url(#dropShadow-3d)">
            <rect x="13" y="13" width="22" height="22" rx="4" fill="url(#deepBronze-3d)" transform="translate(1, 1)" opacity="0.6" />
            <rect x="13" y="13" width="22" height="22" rx="4" fill="url(#goldSheen-3d)" />
            <rect x="17" y="17" width="14" height="14" rx="2" fill="url(#darkGold-3d)" />
            {/* Silicon Microprocessor Core */}
            <circle cx="24" cy="24" r="3" fill="#FFFFFF" opacity="0.85" />
            {/* Bus Pins */}
            <line x1="10" y1="19" x2="13" y2="19" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="10" y1="24" x2="13" y2="24" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="10" y1="29" x2="13" y2="29" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="35" y1="19" x2="38" y2="19" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="35" y1="24" x2="38" y2="24" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="35" y1="29" x2="38" y2="29" stroke="#FDE68A" strokeWidth="1.5" />
          </g>
        );

      // MECHANISMS / CRYPTOGRAPHIC DUAL KEYS
      case 'keys':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Key 1 (Primary Gold) */}
            <circle cx="18" cy="18" r="6" fill="url(#brightGold-3d)" />
            <circle cx="18" cy="18" r="3" fill="#78350F" />
            <path d="M22 20 L33 31 L31 33 L29 31 L27 33 L25 31" fill="none" stroke="url(#brightGold-3d)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Specular Spark */}
            <circle cx="16.5" cy="16.5" r="1" fill="#FFFFFF" />
          </g>
        );

      // MECHANISMS / HALVING CLOCKWORK
      case 'halving':
      case 'clock':
        return (
          <g filter="url(#dropShadow-3d)">
            <circle cx="24" cy="24" r="13" fill="url(#deepBronze-3d)" transform="translate(1, 1)" opacity="0.6" />
            <circle cx="24" cy="24" r="13" fill="url(#darkGold-3d)" />
            {/* 50% Halving Sliced Pie Wedge */}
            <path d="M24 11 A 13 13 0 0 1 24 37 Z" fill="url(#brightGold-3d)" />
            <circle cx="24" cy="24" r="2.5" fill="#451A03" />
            <line x1="24" y1="11" x2="24" y2="37" stroke="#FFFBEB" strokeWidth="1.2" />
          </g>
        );

      // MECHANISMS / DECENTRALIZED NODES
      case 'nodes':
        return (
          <g filter="url(#dropShadow-3d)">
            <line x1="16" y1="16" x2="32" y2="16" stroke="#B45309" strokeWidth="1.5" />
            <line x1="16" y1="16" x2="24" y2="32" stroke="#B45309" strokeWidth="1.5" />
            <line x1="32" y1="16" x2="24" y2="32" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="4.5" fill="url(#brightGold-3d)" />
            <circle cx="32" cy="16" r="4.5" fill="url(#brightGold-3d)" />
            <circle cx="24" cy="32" r="5.5" fill="url(#goldSheen-3d)" />
            <circle cx="23" cy="31" r="1.2" fill="#FFFFFF" />
          </g>
        );

      // ROADMAP: PHASE 01 FOUNDATION BLUEPRINT
      case 'foundation':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* Architect Compass */}
            <polygon points="24,9 15,33 19,33 24,19 29,33 33,33" fill="url(#goldSheen-3d)" />
            <circle cx="24" cy="12" r="3" fill="url(#brightGold-3d)" />
            <line x1="18" y1="26" x2="30" y2="26" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="24" cy="12" r="1" fill="#FFFFFF" />
          </g>
        );

      // ROADMAP: PHASE 02 LAUNCH ROCKET
      case 'launch':
        return (
          <g filter="url(#dropShadow-3d)">
            {/* 3D Rocket Body */}
            <path
              d="M24 8 C20 14 19 22 19 28 L29 28 C29 22 28 14 24 8 Z"
              fill="url(#goldSheen-3d)"
            />
            {/* Rocket Fins */}
            <polygon points="19,26 13,31 19,30" fill="url(#darkGold-3d)" />
            <polygon points="29,26 35,31 29,30" fill="url(#darkGold-3d)" />
            {/* Center Porthole */}
            <circle cx="24" cy="19" r="2.5" fill="#451A03" />
            <circle cx="23.5" cy="18.5" r="0.8" fill="#FFFFFF" />
            {/* Exhaust Flame */}
            <polygon points="22,29 24,35 26,29" fill="#F59E0B" />
          </g>
        );

      // ROADMAP: PHASE 03 ECOSYSTEM GALAXY
      case 'ecosystem':
        return (
          <g filter="url(#dropShadow-3d)">
            <circle cx="24" cy="24" r="5" fill="url(#goldSheen-3d)" />
            <circle cx="23.3" cy="23.3" r="1.2" fill="#FFFFFF" />
            <ellipse cx="24" cy="24" rx="14" ry="5.5" transform="rotate(35 24 24)" fill="none" stroke="url(#brightGold-3d)" strokeWidth="1.5" />
            <circle cx="14" cy="17" r="2.5" fill="url(#darkGold-3d)" />
            <circle cx="34" cy="31" r="2.5" fill="url(#darkGold-3d)" />
          </g>
        );

      // ROADMAP: PHASE 04 EXPANSION DIAMOND
      case 'expansion':
        return (
          <g filter="url(#dropShadow-3d)">
            <polygon points="24,9 35,20 24,37 13,20" fill="url(#goldSheen-3d)" />
            <polygon points="24,9 24,37 13,20" fill="#FFFFFF" opacity="0.35" />
            <polygon points="24,9 29,20 24,37" fill="#FFFFFF" opacity="0.5" />
            <circle cx="24" cy="9" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // DEFAULT FALLBACK 3D INSIGNIA COIN
      default:
        return (
          <g filter="url(#dropShadow-3d)">
            <circle cx="24" cy="24" r="13" fill="url(#deepBronze-3d)" transform="translate(1, 1)" opacity="0.6" />
            <circle cx="24" cy="24" r="13" fill="url(#goldSheen-3d)" />
            <circle cx="24" cy="24" r="9.5" fill="url(#darkGold-3d)" />
            <polygon points="24,17 26,22 31,22 27,25 29,30 24,27 19,30 21,25 17,22 22,22" fill="#FFFFFF" opacity="0.9" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none group/icon transition-all duration-300 hover:scale-105 active:scale-95 ${currentSize.container} ${className}`}
      title={type}
    >
      {/* Ambient 3D Rim Glow Behind Plaque */}
      <div
        className={`absolute inset-0 ${currentSize.radius} bg-gradient-to-br from-[#B8661B]/25 via-[#EAB308]/20 to-transparent blur-md -z-10 group-hover/icon:blur-lg transition-all duration-300`}
        aria-hidden="true"
      />

      {/* 3D Realistic Medallion Frame with Specular Rim & Chamfered Bevel */}
      <div
        className={`w-full h-full ${currentSize.radius} p-1 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-3px_rgba(184,102,27,0.32),0_2px_6px_-1px_rgba(0,0,0,0.12)] border border-[#EAB308]/20`}
        style={{
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF5EF 30%, #F5EADB 70%, #E9C9A5 100%)',
          boxShadow:
            'inset 0 1.5px 2px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(69, 26, 3, 0.25), 0 8px 20px -3px rgba(184, 102, 27, 0.25)',
        }}
      >
        {/* Top-Left Specular Glint Reflection */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* 3D Vector SVG Canvas (Standard 48x48 Coordinate Space) */}
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Physical 3D Contact Shadow */}
            <filter id="dropShadow-3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#451A03" floodOpacity="0.35" />
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#B8661B" floodOpacity="0.25" />
            </filter>

            {/* Realistic Metallic Gradients */}
            <linearGradient id="brightGold-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="goldSheen-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="25%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            <linearGradient id="darkGold-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="deepBronze-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="60%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            <linearGradient id="shackleSteel-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E5E7EB" />
              <stop offset="75%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>

            <linearGradient id="glassLens-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FDE68A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.75" />
            </linearGradient>

            <radialGradient id="sphereShading-3d" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FBBF24" />
              <stop offset="75%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#451A03" />
            </radialGradient>

            <linearGradient id="solanaGold-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#14F195" />
              <stop offset="65%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B8661B" />
            </linearGradient>
          </defs>

          {render3DGlyph()}
        </svg>

        {/* Specular Star Glint on Corner */}
        <div
          className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_#FFF] pointer-events-none opacity-80"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
