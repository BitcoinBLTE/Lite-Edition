import React, { useId } from 'react';

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

export const Realistic3DIcon: React.FC<Realistic3DIconProps> = ({
  type,
  size = 'md',
  className = '',
  animated = true,
}) => {
  const rawId = useId();
  // Sanitize id for SVG url references (replace colons with underscores)
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');

  const sizeMap = {
    sm: { container: 'w-9 h-9 sm:w-10 sm:h-10', svg: 40, radius: 'rounded-[12px]' },
    md: { container: 'w-11 h-11 sm:w-12 sm:h-12', svg: 46, radius: 'rounded-[14px]' },
    lg: { container: 'w-13 h-13 sm:w-14 sm:h-14', svg: 54, radius: 'rounded-[16px]' },
    xl: { container: 'w-16 h-16 sm:w-18 sm:h-18', svg: 68, radius: 'rounded-[20px]' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const gradBrightGold = `url(#brightGold-${id})`;
  const gradGoldSheen = `url(#goldSheen-${id})`;
  const gradDarkGold = `url(#darkGold-${id})`;
  const gradDeepBronze = `url(#deepBronze-${id})`;
  const gradShackleSteel = `url(#shackleSteel-${id})`;
  const gradGlassLens = `url(#glassLens-${id})`;
  const gradSolanaCyber = `url(#solanaCyber-${id})`;
  const gradGreenProfit = `url(#greenProfit-${id})`;
  const filterDrop = `url(#dropShadow-${id})`;

  // Render high-fidelity 3D Vector Glyphs with multi-plane extrusion, specular reflections, and physical depth
  const render3DGlyph = () => {
    switch (type) {
      // 01. TOKEN SUPPLY: 3D Stacked Coin Medallion with Fixed Cap Vault Emblem
      case 'token-supply':
      case 'supply':
      case 'sol':
      case 'fee':
        return (
          <g filter={filterDrop}>
            {/* Base Coin (Lowest) */}
            <ellipse cx="24" cy="32" rx="13" ry="4.5" fill={gradDeepBronze} />
            <ellipse cx="24" cy="31" rx="13" ry="4.5" fill={gradDarkGold} />
            <path d="M11 31 C11 33.5 24 35.5 37 31" fill="none" stroke="#FEF3C7" strokeWidth="0.6" opacity="0.6" />

            {/* Middle Coin */}
            <ellipse cx="24" cy="25" rx="13" ry="4.5" fill={gradDeepBronze} />
            <ellipse cx="24" cy="24" rx="13" ry="4.5" fill={gradGoldSheen} />
            <path d="M11 24 C11 26.5 24 28.5 37 24" fill="none" stroke="#FEF3C7" strokeWidth="0.6" opacity="0.6" />

            {/* Top Coin Extrusion & Face */}
            <ellipse cx="24" cy="18" rx="13" ry="4.5" fill={gradDeepBronze} />
            <ellipse cx="24" cy="17" rx="13" ry="4.5" fill={gradBrightGold} />

            {/* Top Coin Inner Bevel Rim */}
            <ellipse cx="24" cy="17" rx="10.5" ry="3.5" fill="none" stroke="#B45309" strokeWidth="0.9" />

            {/* Coin Rim Serration Highlights */}
            <path d="M12 17 C12 19.5 24 21 36 17" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />

            {/* Fixed Cap Medallion Crown / 2.1M Stamp */}
            <circle cx="24" cy="17" r="2.5" fill="#78350F" />
            <path d="M22.5 17 L25.5 17 M24 15.5 L24 18.5" stroke="#FDE68A" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="20" cy="16" r="0.8" fill="#FFFFFF" opacity="0.9" />
          </g>
        );

      // 02. BITCOIN & BITCOIN COMPARISON: Premium 3D Bitcoin-Inspired Gold Bullion Coin
      case 'bitcoin':
      case 'bitcoin-comparison':
        return (
          <g filter={filterDrop}>
            {/* 3D Coin Extruded Cylinder Depth / Rim */}
            <ellipse cx="24" cy="27" rx="14" ry="14" fill={gradDeepBronze} />
            <circle cx="24" cy="24" r="14" fill={gradDeepBronze} transform="translate(1, 1.5)" opacity="0.7" />

            {/* 3D Beveled Coin Outer Edge */}
            <circle cx="24" cy="24" r="14" fill={gradGoldSheen} />

            {/* Concentric Ribbed Outer Rim */}
            <circle cx="24" cy="24" r="12" fill={gradDarkGold} />
            <circle cx="24" cy="24" r="10.5" fill={gradBrightGold} />

            {/* 3D Embossed Bitcoin ₿ Symbol in High Relief */}
            <g transform="translate(24, 24) rotate(14) translate(-24, -24)">
              {/* Double Vertical Hashes */}
              <line x1="22.5" y1="14" x2="22.5" y2="34" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="25.5" y1="14" x2="25.5" y2="34" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
              {/* Main ₿ Spine & Double Loops */}
              <path
                d="M20 18 H25 C27.5 18 29 19.5 29 21.5 C29 23 28 24 26.5 24.5 C28.5 25 29.5 26.5 29.5 28.5 C29.5 30.8 27.5 32 24.8 32 H20 Z"
                fill="#78350F"
              />
              <path
                d="M20.5 19 H24.8 C26.8 19 28 20 28 21.5 C28 22.8 27 23.8 25.5 24 H21.8 Z"
                fill="#FEF3C7"
              />
              <path
                d="M20.5 25 H25.2 C27.2 25 28.5 26.2 28.5 28 C28.5 29.8 27 30.8 24.8 30.8 H20.5 Z"
                fill="#FEF3C7"
              />
            </g>

            {/* Coin Face Specular Reflection Arc */}
            <path
              d="M14 16 C18 12 28 12 33 16 C30 14 17 14 14 16 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
            {/* Top-Right Specular Sparkle */}
            <circle cx="31" cy="17" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // 03. BLTE: Premium 3D BLTE Medallion Coin
      case 'blte':
      case 'scarcity':
        return (
          <g filter={filterDrop}>
            {/* 3D Coin Extrusion Depth */}
            <circle cx="24" cy="24" r="14.5" fill={gradDeepBronze} transform="translate(1.2, 1.8)" opacity="0.65" />
            {/* Outer Coin Edge with Beveled Rim */}
            <circle cx="24" cy="24" r="14.5" fill={gradGoldSheen} />
            {/* Inner Recessed Coin Field */}
            <circle cx="24" cy="24" r="12" fill={gradDarkGold} />
            <circle cx="24" cy="24" r="10" fill={gradBrightGold} />

            {/* Embossed Luxury BLTE Typography Emblem */}
            <text
              x="24"
              y="27.5"
              textAnchor="middle"
              fontFamily="Outfit, Space Grotesk, sans-serif"
              fontSize="8.5"
              fontWeight="900"
              letterSpacing="0.4"
              fill="#78350F"
              style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.8))' }}
            >
              BLTE
            </text>

            {/* Scarcity Crown Dots (3 Golden Stamping Stars) */}
            <circle cx="19" cy="18" r="0.9" fill="#78350F" />
            <circle cx="24" cy="17" r="1.1" fill="#78350F" />
            <circle cx="29" cy="18" r="0.9" fill="#78350F" />

            {/* Specular Rim Sheen */}
            <path
              d="M13 19 C15 14 24 12 33 16 C27 13 17 14 13 19 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
            <circle cx="16" cy="16" r="1.2" fill="#FFFFFF" />
          </g>
        );

      // 04. SOLANA / EXECUTION: Realistic 3D Blockchain Slabs & Solana Prism
      case 'solana':
      case 'execution':
      case 'speed':
        return (
          <g filter={filterDrop}>
            {/* Slab 1 (Top Parallax Speed Beam) */}
            <path d="M12 16 L31 16 L36 12 L17 12 Z" fill={gradDeepBronze} transform="translate(0.5, 0.5)" />
            <path d="M12 15 L31 15 L36 11 L17 11 Z" fill={gradSolanaCyber} />
            <line x1="13" y1="15" x2="31" y2="15" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />

            {/* Slab 2 (Middle Inverted Speed Beam) */}
            <path d="M17 25 L36 25 L31 21 L12 21 Z" fill={gradDeepBronze} transform="translate(0.5, 0.5)" />
            <path d="M17 24 L36 24 L31 20 L12 20 Z" fill={gradGoldSheen} />
            <line x1="17" y1="24" x2="35" y2="24" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />

            {/* Slab 3 (Bottom Speed Beam) */}
            <path d="M12 34 L31 34 L36 30 L17 30 Z" fill={gradDeepBronze} transform="translate(0.5, 0.5)" />
            <path d="M12 33 L31 33 L36 29 L17 29 Z" fill={gradSolanaCyber} />
            <line x1="13" y1="33" x2="31" y2="33" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />

            {/* Fast Transfer Pulse Nodes */}
            <circle cx="33.5" cy="13" r="1.2" fill="#FFFFFF" />
            <circle cx="14.5" cy="22" r="1.2" fill="#FFFFFF" />
            <circle cx="33.5" cy="31" r="1.2" fill="#FFFFFF" />
          </g>
        );

      // 05. LIQUIDITY: 3D Interlocking Dual Token Rings & AMM Pool Flow
      case 'liquidity':
      case 'dex':
        return (
          <g filter={filterDrop}>
            {/* Left Token Ring (BLTE Gold) */}
            <circle cx="19" cy="24" r="9" fill="none" stroke={gradDeepBronze} strokeWidth="4" transform="translate(0.5, 1)" opacity="0.6" />
            <circle cx="19" cy="24" r="9" fill="none" stroke={gradBrightGold} strokeWidth="3.5" />
            <circle cx="19" cy="24" r="6.5" fill="#451A03" opacity="0.25" />

            {/* Right Token Ring (Solana Teal/Amber) */}
            <circle cx="29" cy="24" r="9" fill="none" stroke={gradDeepBronze} strokeWidth="4" transform="translate(0.5, 1)" opacity="0.6" />
            <circle cx="29" cy="24" r="9" fill="none" stroke={gradSolanaCyber} strokeWidth="3.5" />

            {/* Center Intersecting Liquidity Droplet / AMM Hub */}
            <circle cx="24" cy="24" r="3.5" fill={gradGoldSheen} />
            <circle cx="23.3" cy="23.3" r="1.2" fill="#FFFFFF" />

            {/* Orbital Circulation Flow Arrows */}
            <path d="M15 17 C18 14 24 15 26 17" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
            <path d="M33 31 C30 34 24 33 22 31" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          </g>
        );

      // 06. STAKING: 3D Staking Coin with Crystalline Yield & Upward Growth Surge
      case 'staking':
        return (
          <g filter={filterDrop}>
            {/* Base Staking Coin Pedestal */}
            <ellipse cx="24" cy="33" rx="13" ry="5" fill={gradDeepBronze} />
            <ellipse cx="24" cy="31" rx="13" ry="5" fill={gradDarkGold} />
            <ellipse cx="24" cy="27" rx="11" ry="4" fill={gradBrightGold} />

            {/* 3D Ascending Growth Yield Arrow */}
            <path
              d="M24 8 L32 18 H27 V27 H21 V18 H16 Z"
              fill={gradDeepBronze}
              transform="translate(1, 1)"
              opacity="0.6"
            />
            <path
              d="M24 8 L32 18 H27 V27 H21 V18 H16 Z"
              fill={gradGreenProfit}
            />

            {/* Arrow Facet Split (Specular Left Ridge) */}
            <path d="M24 8 L16 18 H21 V27 H24 Z" fill="#FFFFFF" opacity="0.35" />

            {/* Yield Gem Starburst */}
            <circle cx="24" cy="8" r="2" fill="#FFFFFF" />
            <circle cx="24" cy="18" r="1.5" fill="#FEF3C7" />
          </g>
        );

      // 07. SECURITY: 3D Heraldic Shield with Blockchain Lock Details
      case 'security':
      case 'shield':
      case 'lock':
        return (
          <g filter={filterDrop}>
            {/* 3D Shield Extrusion Base */}
            <path
              d="M24 7 L36 12 V22 C36 30 24 39 24 39 C24 39 12 30 12 22 V12 Z"
              fill={gradDeepBronze}
              transform="translate(1.2, 1.5)"
              opacity="0.65"
            />
            {/* Outer Gold Shield Surface */}
            <path
              d="M24 7 L36 12 V22 C36 30 24 39 24 39 C24 39 12 30 12 22 V12 Z"
              fill={gradGoldSheen}
            />
            {/* Inner Recessed Armor Field */}
            <path
              d="M24 10 L33 14 V21 C33 27.5 24 35 24 35 C24 35 15 27.5 15 21 V14 Z"
              fill={gradDarkGold}
            />

            {/* Central 3D Cryptographic Padlock Shackle */}
            <path
              d="M20 22 V18 C20 15.8 21.8 14 24 14 C26.2 14 28 15.8 28 18 V22"
              fill="none"
              stroke={gradShackleSteel}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Padlock Body */}
            <rect x="18" y="21" width="12" height="9" rx="2" fill={gradBrightGold} />
            {/* Keyhole Chamber */}
            <circle cx="24" cy="24.5" r="1.3" fill="#451A03" />
            <polygon points="23.3,24.5 24.7,24.5 24.3,27.5 23.7,27.5" fill="#451A03" />
            <circle cx="23.7" cy="24" r="0.5" fill="#FFFFFF" />

            {/* Shield Specular Highlight */}
            <path d="M24 10 L16 14 V21 C16 25 20 29 24 31 Z" fill="#FFFFFF" opacity="0.25" />
          </g>
        );

      // 08. TRANSPARENCY: 3D Optical Verification Lens & Transparent Ledger Proof
      case 'transparency':
        return (
          <g filter={filterDrop}>
            {/* 3D Lens Gold Bezel Frame */}
            <circle cx="24" cy="24" r="14" fill={gradDeepBronze} transform="translate(1, 1)" opacity="0.5" />
            <circle cx="24" cy="24" r="14" fill={gradGoldSheen} />
            <circle cx="24" cy="24" r="12" fill={gradDarkGold} />

            {/* Convex Optical Transparent Core */}
            <circle cx="24" cy="24" r="10.5" fill={gradGlassLens} />

            {/* Transparent Underlying Ledger Lines (Visible Through Glass) */}
            <line x1="17" y1="21" x2="31" y2="21" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="17" y1="24" x2="27" y2="24" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line x1="17" y1="27" x2="29" y2="27" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

            {/* Convex Curvature Specular Reflection */}
            <path
              d="M17 19 C20 15 28 15 31 19 C28 17 20 17 17 19 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
            {/* Glass Hotspot Glint */}
            <circle cx="21" cy="21" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // 09. DECENTRALIZATION: 3D Distributed Network Nodes in Isometric Space
      case 'decentralization':
      case 'nodes':
        return (
          <g filter={filterDrop}>
            {/* Interconnecting Lattice Beams */}
            <line x1="15" y1="16" x2="33" y2="16" stroke="#92400E" strokeWidth="1.8" />
            <line x1="15" y1="16" x2="24" y2="33" stroke="#92400E" strokeWidth="1.8" />
            <line x1="33" y1="16" x2="24" y2="33" stroke="#92400E" strokeWidth="1.8" />
            <line x1="24" y1="21" x2="24" y2="33" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 2" />

            {/* Node 1 (Top-Left 3D Sphere) */}
            <circle cx="15" cy="16" r="4.5" fill={gradDeepBronze} transform="translate(0.5, 0.8)" opacity="0.6" />
            <circle cx="15" cy="16" r="4.5" fill={gradBrightGold} />
            <circle cx="13.8" cy="14.8" r="1.3" fill="#FFFFFF" />

            {/* Node 2 (Top-Right 3D Sphere) */}
            <circle cx="33" cy="16" r="4.5" fill={gradDeepBronze} transform="translate(0.5, 0.8)" opacity="0.6" />
            <circle cx="33" cy="16" r="4.5" fill={gradBrightGold} />
            <circle cx="31.8" cy="14.8" r="1.3" fill="#FFFFFF" />

            {/* Node 3 (Bottom Central Anchor Sphere) */}
            <circle cx="24" cy="33" r="5.5" fill={gradDeepBronze} transform="translate(0.5, 1)" opacity="0.6" />
            <circle cx="24" cy="33" r="5.5" fill={gradGoldSheen} />
            <circle cx="22.5" cy="31.5" r="1.6" fill="#FFFFFF" />

            {/* Central Convergence Spark */}
            <circle cx="24" cy="21" r="2.2" fill={gradSolanaCyber} />
            <circle cx="24" cy="21" r="0.9" fill="#FFFFFF" />
          </g>
        );

      // 10. TRANSACTIONS: 3D Blockchain State Transition Element
      case 'transactions':
      case 'blocks':
      case 'receipt':
        return (
          <g filter={filterDrop}>
            {/* Sending Isometric Block Cube */}
            <polygon points="18,10 26,14 18,18 10,14" fill={gradBrightGold} />
            <polygon points="10,14 18,18 18,26 10,22" fill={gradDarkGold} />
            <polygon points="18,18 26,14 26,22 18,26" fill={gradDeepBronze} />

            {/* Receiving Isometric Block Cube */}
            <polygon points="30,22 38,26 30,30 22,26" fill={gradGoldSheen} />
            <polygon points="22,26 30,30 30,38 22,34" fill={gradDarkGold} />
            <polygon points="30,30 38,26 38,34 30,38" fill={gradDeepBronze} />

            {/* Hyper-Speed Transfer Beam */}
            <path
              d="M22 19 L30 24 M30 24 L25 23 M30 24 L27 20"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Micro Laser Pulse */}
            <circle cx="26" cy="21.5" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // 11. EXPLORER: 3D Magnifying Glass over Blockchain Ledger Block
      case 'explorer':
        return (
          <g filter={filterDrop}>
            {/* Underlying Isometric Ledger Slab */}
            <polygon points="20,16 34,22 20,28 6,22" fill={gradDeepBronze} />
            <polygon points="6,22 20,28 20,34 6,28" fill={gradDarkGold} />
            <polygon points="20,28 34,22 34,28 20,34" fill={gradGoldSheen} />

            {/* Ledger Line Details */}
            <line x1="12" y1="22" x2="18" y2="25" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
            <line x1="22" y1="25" x2="28" y2="22" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />

            {/* 3D Magnifier Rim */}
            <circle cx="26" cy="18" r="9" fill={gradDeepBronze} transform="translate(1, 1)" opacity="0.5" />
            <circle cx="26" cy="18" r="9" fill={gradBrightGold} />
            <circle cx="26" cy="18" r="6.8" fill={gradGlassLens} />

            {/* Magnifier Handle */}
            <line x1="32.5" y1="24.5" x2="41" y2="33" stroke={gradDeepBronze} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="32.5" y1="24.5" x2="41" y2="33" stroke={gradGoldSheen} strokeWidth="3" strokeLinecap="round" />

            {/* Magnified Target Hash Dot & Specular Glint */}
            <circle cx="26" cy="18" r="2" fill="#78350F" />
            <path d="M22 15 C24 13 28 13 30 15" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
            <circle cx="24.5" cy="15.5" r="0.8" fill="#FFFFFF" />
          </g>
        );

      // 12. ROADMAP: 3D Milestone Pedestal Route with Ascending Pinnacle Flag
      case 'roadmap':
      case 'foundation':
        return (
          <g filter={filterDrop}>
            {/* Step 1 Base Pedestal */}
            <polygon points="12,32 24,27 24,32 12,37" fill={gradDeepBronze} />
            <polygon points="12,27 24,22 24,27 12,32" fill={gradDarkGold} />
            <polygon points="12,27 24,22 36,27 24,32" fill={gradGoldSheen} />

            {/* Step 2 Elevated Milestone Tier */}
            <polygon points="18,22 28,18 28,22 18,26" fill={gradDarkGold} />
            <polygon points="18,18 28,14 38,18 28,22" fill={gradBrightGold} />

            {/* Milestone Flag Staff */}
            <line x1="28" y1="7" x2="28" y2="20" stroke={gradShackleSteel} strokeWidth="1.8" strokeLinecap="round" />
            {/* Golden Milestone Pennant */}
            <polygon points="28,8 39,12 28,16" fill={gradGoldSheen} />
            <polygon points="28,8 39,12 28,12" fill="#FFFFFF" opacity="0.4" />
            <circle cx="28" cy="7" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // 13. FAIR LAUNCH: 3D Orbital Launch Token Ascending Through Golden Halo
      case 'fair-launch':
      case 'launch':
        return (
          <g filter={filterDrop}>
            {/* Orbital Base Halo Ring */}
            <ellipse cx="24" cy="30" rx="14" ry="5" fill="none" stroke={gradDarkGold} strokeWidth="2.5" />
            <ellipse cx="24" cy="30" rx="14" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />

            {/* 3D Ascending Launch Rocket Body */}
            <path
              d="M24 7 C20 13 19 20 19 26 L29 26 C29 20 28 13 24 7 Z"
              fill={gradGoldSheen}
            />
            {/* Rocket Fins */}
            <polygon points="19,23 13,29 19,27" fill={gradDarkGold} />
            <polygon points="29,23 35,29 29,27" fill={gradDarkGold} />

            {/* Center Porthole / Token Coin Stamp */}
            <circle cx="24" cy="18" r="3" fill={gradBrightGold} />
            <circle cx="24" cy="18" r="1.5" fill="#78350F" />
            <circle cx="23.3" cy="17.3" r="0.6" fill="#FFFFFF" />

            {/* Thrust Fire Jet */}
            <polygon points="21,27 24,35 27,27" fill="#F59E0B" />
            <polygon points="22.5,27 24,32 25.5,27" fill="#FFFFFF" />
          </g>
        );

      // 14. ARCHITECTURE: 3D Layered Modular Blockchain Structure
      case 'architecture':
      case 'ledger':
        return (
          <g filter={filterDrop}>
            {/* Layer 1 (Base Foundation Slab) */}
            <polygon points="24,28 36,33 24,38 12,33" fill={gradBrightGold} />
            <polygon points="12,33 24,38 24,42 12,37" fill={gradDarkGold} />
            <polygon points="24,38 36,33 36,37 24,42" fill={gradDeepBronze} />

            {/* Layer 2 (Execution Layer Slab) */}
            <polygon points="24,19 36,24 24,29 12,24" fill={gradSolanaCyber} />
            <polygon points="12,24 24,29 24,33 12,28" fill={gradDarkGold} />
            <polygon points="24,29 36,24 36,28 24,33" fill={gradDeepBronze} />

            {/* Layer 3 (Top Application & Scarcity Cap Slab) */}
            <polygon points="24,10 36,15 24,20 12,15" fill={gradBrightGold} />
            <polygon points="12,15 24,20 24,24 12,19" fill={gradDarkGold} />
            <polygon points="24,20 36,15 36,19 24,24" fill={gradDeepBronze} />

            {/* Layer Interconnect Pillars */}
            <circle cx="24" cy="10" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // 15. VERIFICATION: 3D Verified Checkmark Medallion
      case 'verification':
      case 'confirm':
        return (
          <g filter={filterDrop}>
            <circle cx="24" cy="24" r="14" fill={gradDeepBronze} transform="translate(1, 1)" opacity="0.6" />
            <circle cx="24" cy="24" r="14" fill={gradGoldSheen} />
            <circle cx="24" cy="24" r="11" fill={gradDarkGold} />
            <circle cx="24" cy="24" r="9.5" fill={gradBrightGold} />

            {/* 3D High Relief Embossed Checkmark */}
            <path
              d="M17 24 L22 29 L31 18"
              fill="none"
              stroke="#451A03"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0.5, 0.8)"
              opacity="0.4"
            />
            <path
              d="M17 24 L22 29 L31 18"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="31" cy="18" r="1.4" fill="#FFFFFF" />
          </g>
        );

      // 16. MARKET: 3D Financial Trading Candlestick & Market Delta Chart
      case 'market':
        return (
          <g filter={filterDrop}>
            {/* Base Grid Podium */}
            <rect x="8" y="34" width="32" height="3" rx="1.5" fill={gradDeepBronze} />
            <rect x="8" y="33" width="32" height="3" rx="1.5" fill={gradDarkGold} />

            {/* Candlestick 1 (Left Neutral) */}
            <line x1="14" y1="18" x2="14" y2="33" stroke="#78350F" strokeWidth="1.2" />
            <rect x="11.5" y="22" width="5" height="9" rx="1.2" fill={gradDarkGold} />

            {/* Candlestick 2 (Middle Bullish) */}
            <line x1="24" y1="12" x2="24" y2="33" stroke="#78350F" strokeWidth="1.2" />
            <rect x="21.5" y="16" width="5" height="13" rx="1.2" fill={gradGoldSheen} />
            <rect x="22" y="17" width="2" height="11" fill="#FFFFFF" opacity="0.4" />

            {/* Candlestick 3 (Right High Breakout Peak) */}
            <line x1="34" y1="8" x2="34" y2="33" stroke="#78350F" strokeWidth="1.2" />
            <rect x="31.5" y="11" width="5" height="16" rx="1.2" fill={gradGreenProfit} />
            <rect x="32" y="12" width="2" height="14" fill="#FFFFFF" opacity="0.5" />

            {/* Ascending Trend Delta Line with Marker Arrow */}
            <path
              d="M12 25 L22 18 L32 10 L37 9"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0 1px 2px rgba(69,26,3,0.5))"
            />
            <circle cx="37" cy="9" r="2" fill="#FFFFFF" />
          </g>
        );

      // 17. ACQUISITION GUIDE: 3D Hardware Wallet Vault & Token Exchange
      case 'acquisition':
      case 'wallet':
        return (
          <g filter={filterDrop}>
            {/* 3D Hardware Vault Body */}
            <rect x="10" y="13" width="28" height="22" rx="4" fill={gradDeepBronze} transform="translate(1, 1)" opacity="0.6" />
            <rect x="10" y="13" width="28" height="22" rx="4" fill={gradGoldSheen} />
            {/* Wallet Flap Bevel */}
            <path d="M10 18 L24 25 L38 18" fill="none" stroke="#FEF3C7" strokeWidth="1.5" />
            {/* Biometric / Solana Coin Clasp */}
            <circle cx="24" cy="27" r="4" fill={gradDarkGold} />
            <circle cx="24" cy="27" r="2.8" fill={gradBrightGold} />
            <circle cx="24" cy="27" r="1.2" fill="#451A03" />
            <circle cx="23.3" cy="26.3" r="0.6" fill="#FFFFFF" />
            {/* Top Display Status Bar */}
            <rect x="14" y="16" width="20" height="3" rx="1" fill="#451A03" opacity="0.4" />
          </g>
        );

      // 18. GLOBE / DECENTRALIZED REACH
      case 'globe':
      case 'ecosystem':
        return (
          <g filter={filterDrop}>
            <circle cx="24" cy="24" r="12" fill={gradDarkGold} />
            <ellipse cx="24" cy="24" rx="6" ry="12" fill="none" stroke="#FEF3C7" strokeWidth="1.2" opacity="0.8" />
            <line x1="12" y1="24" x2="36" y2="24" stroke="#FEF3C7" strokeWidth="1.2" opacity="0.8" />
            <ellipse cx="24" cy="24" rx="15" ry="4.5" transform="rotate(-25 24 24)" fill="none" stroke={gradBrightGold} strokeWidth="2.2" />
            <circle cx="21" cy="18" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // 19. DISTINCTION: Multi-Faceted High-Luster Crystal Star
      case 'distinction':
      case 'expansion':
        return (
          <g filter={filterDrop}>
            <polygon points="24,8 14,22 24,19" fill="#FFFFFF" opacity="0.9" />
            <polygon points="24,8 24,19 34,22" fill={gradBrightGold} />
            <polygon points="24,40 14,22 24,19" fill={gradDarkGold} />
            <polygon points="24,40 24,19 34,22" fill={gradDeepBronze} />
            <line x1="24" y1="8" x2="24" y2="40" stroke="#FFFBEB" strokeWidth="1" opacity="0.8" />
            <line x1="14" y1="22" x2="34" y2="22" stroke="#FFFBEB" strokeWidth="0.8" opacity="0.6" />
            <circle cx="24" cy="8" r="1.5" fill="#FFFFFF" />
          </g>
        );

      // 20. CONTRACT / MINT DOCUMENT
      case 'mint':
      case 'contract':
        return (
          <g filter={filterDrop}>
            <rect x="13" y="10" width="22" height="28" rx="3" fill={gradDeepBronze} transform="translate(1, 1)" opacity="0.6" />
            <rect x="13" y="10" width="22" height="28" rx="3" fill={gradGoldSheen} />
            <line x1="17" y1="16" x2="26" y2="16" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="20" x2="31" y2="20" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <line x1="17" y1="24" x2="29" y2="24" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <circle cx="28" cy="30" r="4" fill={gradBrightGold} />
            <circle cx="28" cy="30" r="2.2" fill="#92400E" />
            <circle cx="27.3" cy="29.3" r="0.7" fill="#FFFFFF" />
          </g>
        );

      // 21. SLIPPAGE GAUGE
      case 'slippage':
      case 'clock':
      case 'halving':
        return (
          <g filter={filterDrop}>
            <circle cx="24" cy="24" r="13" fill={gradDarkGold} />
            <circle cx="24" cy="24" r="10.5" fill={gradDeepBronze} />
            <path d="M17 19 L19 20 M24 15 L24 17 M31 19 L29 20" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
            <polygon points="23,24 24,14 25,24" fill="#FFFFFF" />
            <circle cx="24" cy="24" r="2.5" fill={gradBrightGold} />
            <circle cx="23.5" cy="23.5" r="0.8" fill="#FFFFFF" />
          </g>
        );

      // 22. CRYPTOGRAPHIC KEYS
      case 'keys':
        return (
          <g filter={filterDrop}>
            <circle cx="18" cy="18" r="6" fill={gradBrightGold} />
            <circle cx="18" cy="18" r="3" fill="#78350F" />
            <path d="M22 20 L33 31 L31 33 L29 31 L27 33 L25 31" fill="none" stroke={gradBrightGold} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16.5" cy="16.5" r="1" fill="#FFFFFF" />
          </g>
        );

      // 23. MINING SILICON CORE
      case 'mining':
      case 'utxo':
        return (
          <g filter={filterDrop}>
            <rect x="13" y="13" width="22" height="22" rx="4" fill={gradDeepBronze} transform="translate(1, 1)" opacity="0.6" />
            <rect x="13" y="13" width="22" height="22" rx="4" fill={gradGoldSheen} />
            <rect x="17" y="17" width="14" height="14" rx="2" fill={gradDarkGold} />
            <circle cx="24" cy="24" r="3" fill="#FFFFFF" opacity="0.85" />
            <line x1="10" y1="19" x2="13" y2="19" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="10" y1="24" x2="13" y2="24" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="10" y1="29" x2="13" y2="29" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="35" y1="19" x2="38" y2="19" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="35" y1="24" x2="38" y2="24" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="35" y1="29" x2="38" y2="29" stroke="#FDE68A" strokeWidth="1.5" />
          </g>
        );

      // DEFAULT FALLBACK 3D INSIGNIA COIN
      default:
        return (
          <g filter={filterDrop}>
            <circle cx="24" cy="24" r="13" fill={gradDeepBronze} transform="translate(1, 1)" opacity="0.6" />
            <circle cx="24" cy="24" r="13" fill={gradGoldSheen} />
            <circle cx="24" cy="24" r="9.5" fill={gradDarkGold} />
            <polygon points="24,17 26,22 31,22 27,25 29,30 24,27 19,30 21,25 17,22 22,22" fill="#FFFFFF" opacity="0.9" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none group/icon transition-all duration-300 hover:scale-105 active:scale-95 ${currentSize.container} ${className}`}
      role="img"
      aria-label={`${type} 3D icon`}
    >
      {/* Ambient 3D Rim Glow Behind Plaque */}
      <div
        className={`absolute inset-0 ${currentSize.radius} bg-gradient-to-br from-[#B8661B]/25 via-[#EAB308]/20 to-transparent blur-md -z-10 group-hover/icon:blur-lg transition-all duration-300 pointer-events-none`}
        aria-hidden="true"
      />

      {/* 3D Realistic Medallion Frame with Specular Rim & Chamfered Bevel */}
      <div
        className={`w-full h-full ${currentSize.radius} p-1 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-3px_rgba(184,102,27,0.32),0_2px_6px_-1px_rgba(0,0,0,0.12)] border border-[#EAB308]/25 ${
          animated ? 'animate-3d-float' : ''
        }`}
        style={{
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF5EF 30%, #F5EADB 70%, #E9C9A5 100%)',
          boxShadow:
            'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(69, 26, 3, 0.25), 0 8px 20px -3px rgba(184, 102, 27, 0.25)',
        }}
      >
        {/* Top-Left Specular Glint Reflection */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Shimmer Light Reflection Sweep Across Medallion */}
        {animated && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-3d-gleam -z-0"
            aria-hidden="true"
          />
        )}

        {/* 3D Vector SVG Canvas with Unique Namespaced Gradients and Filters */}
        <svg
          viewBox="0 0 48 48"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full drop-shadow-xs relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Unique Instance Drop Shadow */}
            <filter id={`dropShadow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#451A03" floodOpacity="0.4" />
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#B8661B" floodOpacity="0.25" />
            </filter>

            {/* Realistic Metallic 3D Gradients */}
            <linearGradient id={`brightGold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id={`goldSheen-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="25%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            <linearGradient id={`darkGold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id={`deepBronze-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="60%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            <linearGradient id={`shackleSteel-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E5E7EB" />
              <stop offset="75%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>

            <linearGradient id={`glassLens-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FDE68A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id={`solanaCyber-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14F195" />
              <stop offset="50%" stopColor="#9945FF" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id={`greenProfit-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>

          {render3DGlyph()}
        </svg>

        {/* Specular Star Glint on Corner */}
        <div
          className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_#FFF] pointer-events-none opacity-85 z-20"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
