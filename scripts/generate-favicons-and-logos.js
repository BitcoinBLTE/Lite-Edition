import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

// SVG definition for Bitcoin Lite Edition Coin / Logo
export function generateBitcoinLiteLogoSvg(size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
  <defs>
    <!-- Outer Gold Milled Rim Gradient -->
    <radialGradient id="goldRim" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="25%" stop-color="#FDE047" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="80%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#78350F" />
    </radialGradient>

    <!-- Beveled Edge Gradient -->
    <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7" />
      <stop offset="50%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#451A03" />
    </linearGradient>

    <!-- Inner Dark Obsidian Disc Gradient -->
    <radialGradient id="darkSurface" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#222228" />
      <stop offset="45%" stop-color="#141418" />
      <stop offset="100%" stop-color="#09090C" />
    </radialGradient>

    <!-- Central Bitcoin ₿ Emblem Radiant Gradient -->
    <linearGradient id="symbolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" />
      <stop offset="20%" stop-color="#FEF08A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="80%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>

    <!-- Deep Drop Shadow -->
    <filter id="coinShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6" />
    </filter>

    <filter id="symbolShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.85" />
    </filter>
  </defs>

  <!-- Base Outer Shadow & Rim Disc -->
  <circle cx="256" cy="256" r="244" fill="url(#goldRim)" filter="url(#coinShadow)" />

  <!-- Outer Milled Tick Ring -->
  <circle cx="256" cy="256" r="240" fill="none" stroke="#78350F" stroke-width="3" stroke-dasharray="3.5 4.5" />
  
  <!-- Outer Bevel Rings -->
  <circle cx="256" cy="256" r="232" fill="none" stroke="#FEF3C7" stroke-width="4" opacity="0.9" />
  <circle cx="256" cy="256" r="226" fill="none" stroke="#92400E" stroke-width="2.5" />

  <!-- Inner Dark Obsidian Core -->
  <circle cx="256" cy="256" r="196" fill="url(#darkSurface)" />
  <circle cx="256" cy="256" r="194" fill="none" stroke="url(#bevelGrad)" stroke-width="4" />

  <!-- Concentric Micro-Grooves for Authentic Minted Proof Finish -->
  <circle cx="256" cy="256" r="170" fill="none" stroke="#F59E0B" stroke-width="0.8" opacity="0.12" />
  <circle cx="256" cy="256" r="148" fill="none" stroke="#F59E0B" stroke-width="0.8" opacity="0.1" />
  <circle cx="256" cy="256" r="126" fill="none" stroke="#F59E0B" stroke-width="0.8" opacity="0.08" />

  <!-- Rim Arc Paths for Typography -->
  <path id="topTextArc" d="M 68 256 A 188 188 0 0 1 444 256" fill="none" />
  <path id="bottomTextArc" d="M 444 256 A 188 188 0 0 1 68 256" fill="none" />

  <!-- Top Text: $BLTE -->
  <text font-family="'Outfit', 'Inter', system-ui, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" letter-spacing="4">
    <textPath href="#topTextArc" startOffset="50%" text-anchor="middle">
      ★  $BLTE  ★
    </textPath>
  </text>

  <!-- Bottom Text: BITCOIN LITE EDITION -->
  <text font-family="'Inter', 'Outfit', system-ui, sans-serif" font-weight="900" font-size="21" fill="#FEF08A" letter-spacing="3.5">
    <textPath href="#bottomTextArc" startOffset="50%" text-anchor="middle">
      BITCOIN LITE EDITION
    </textPath>
  </text>

  <!-- Central Bitcoin ₿ Glyph & Minted Emblem -->
  <g filter="url(#symbolShadow)" transform="translate(0, -6)">
    <!-- ₿ Character in Bold Serif Form -->
    <text x="256" y="278" font-family="'Cinzel', 'Times New Roman', 'Inter', serif" font-weight="900" font-size="210" text-anchor="middle" dominant-baseline="middle" fill="url(#symbolGrad)" stroke="#78350F" stroke-width="6" paint-order="stroke fill">
      ₿
    </text>
    <text x="254" y="276" font-family="'Cinzel', 'Times New Roman', 'Inter', serif" font-weight="900" font-size="210" text-anchor="middle" dominant-baseline="middle" fill="url(#symbolGrad)" stroke="#FFFBEB" stroke-width="1.5" paint-order="stroke fill">
      ₿
    </text>
  </g>
</svg>`;
}

async function run() {
  console.log('Generating crisp multi-format logos and favicons...');
  const svg512 = generateBitcoinLiteLogoSvg(512);

  // Write SVG files
  fs.writeFileSync('public/favicon.svg', svg512);
  fs.writeFileSync('public/bitcoin-lite-logo.svg', svg512);
  fs.writeFileSync('src/assets/images/bitcoin_lite_logo.svg', svg512);

  // Render high-res PNGs using Resvg
  const resvg512 = new Resvg(svg512, { fitTo: { mode: 'width', value: 512 } });
  const png512 = resvg512.render().asPng();

  const resvg192 = new Resvg(svg512, { fitTo: { mode: 'width', value: 192 } });
  const png192 = resvg192.render().asPng();

  const resvg64 = new Resvg(svg512, { fitTo: { mode: 'width', value: 64 } });
  const png64 = resvg64.render().asPng();

  const resvg32 = new Resvg(svg512, { fitTo: { mode: 'width', value: 32 } });
  const png32 = resvg32.render().asPng();

  fs.writeFileSync('public/bitcoin-lite-logo.png', png512);
  fs.writeFileSync('public/apple-touch-icon.png', png192);
  fs.writeFileSync('public/favicon-32x32.png', png32);
  fs.writeFileSync('public/favicon.png', png64);
  fs.writeFileSync('src/assets/images/bitcoin_lite_logo.png', png512);

  // Simple valid ICO header containing 32x32 PNG
  // An ICO file can wrap PNG data: header 6 bytes, directory entry 16 bytes, then PNG data
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // ICO type
  icoHeader.writeUInt16LE(1, 4); // 1 image

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0); // width
  icoEntry.writeUInt8(32, 1); // height
  icoEntry.writeUInt8(0, 2);  // palette
  icoEntry.writeUInt8(0, 3);  // reserved
  icoEntry.writeUInt16LE(1, 4); // color planes
  icoEntry.writeUInt16LE(32, 6); // bpp
  icoEntry.writeUInt32LE(png32.length, 8); // image size
  icoEntry.writeUInt32LE(22, 12); // image offset (6 + 16 = 22)

  const icoFile = Buffer.concat([icoHeader, icoEntry, png32]);
  fs.writeFileSync('public/favicon.ico', icoFile);

  console.log('Successfully generated public/favicon.ico, favicon.png, favicon.svg, and logos!');
}

run().catch(console.error);
