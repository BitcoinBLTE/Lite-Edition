import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import { TOKEN_CONFIG } from '../src/config/tokenConfig.ts';

// Helper to convert hex colors to pdf-lib rgb
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return rgb(r, g, b);
}

/**
 * Generate a clean, high-resolution PNG buffer of the website's circular tokenomics chart.
 * Replicates the exact geometry and styling from TokenomicsCircleDesign.tsx:
 * - 70% Fair Launch with warm solar amber gradient (#FDE047 -> #F59E0B -> #D97706)
 * - 30% Liquidity Pool with radiant light green gradient (#86EFAC -> #22C55E -> #16A34A)
 * - Smooth rounded stroke caps and precision separation gap
 * - Central disc cleanly displaying "2.1M BLTE TOTAL CAP"
 */
function renderCircularChartPng() {
  const r = 120;
  const circumference = 2 * Math.PI * r; // ~753.9822
  const gap = 14;

  // 70% Fair Launch
  const fairLaunchLen = (70 / 100) * circumference; // ~527.7875
  const fairLaunchDash = fairLaunchLen - gap;       // ~513.7875
  const fairLaunchGap = circumference - fairLaunchDash;

  // 30% Liquidity Pool
  const liquidityLen = (30 / 100) * circumference;   // ~226.1947
  const liquidityDash = liquidityLen - gap;         // ~212.1947
  const liquidityGap = circumference - liquidityDash;
  const liquidityOffset = -fairLaunchLen;           // -527.7875

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 360 360">
    <defs>
      <!-- Fair Launch Gradient: Warm Solar Amber -->
      <linearGradient id="fairLaunchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>

      <!-- Liquidity Pool Gradient: Radiant Light Green -->
      <linearGradient id="liquidityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#86EFAC" />
        <stop offset="50%" stop-color="#22C55E" />
        <stop offset="100%" stop-color="#16A34A" />
      </linearGradient>

      <!-- Subtle Ambient Shadow Filter for Center Disc -->
      <filter id="discShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.08" />
      </filter>
    </defs>

    <!-- Underlying Contrast Track -->
    <circle cx="180" cy="180" r="120" stroke="#F0EDE8" stroke-width="40" fill="none" />

    <!-- Donut Segments Group (rotated -90deg so sequence begins at 12 o'clock) -->
    <g transform="rotate(-90 180 180)">
      <!-- Fair Launch Segment (70% · 1,470,000 BLTE) -->
      <circle
        cx="180" cy="180" r="120"
        stroke="url(#fairLaunchGradient)"
        stroke-width="40"
        stroke-dasharray="${fairLaunchDash.toFixed(2)} ${fairLaunchGap.toFixed(2)}"
        stroke-dashoffset="0"
        stroke-linecap="round"
        fill="none"
      />

      <!-- Liquidity Pool Segment (30% · 630,000 BLTE) -->
      <circle
        cx="180" cy="180" r="120"
        stroke="url(#liquidityGradient)"
        stroke-width="40"
        stroke-dasharray="${liquidityDash.toFixed(2)} ${liquidityGap.toFixed(2)}"
        stroke-dashoffset="${liquidityOffset.toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
    </g>

    <!-- Center Disc Circle -->
    <circle cx="180" cy="180" r="72" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1.5" filter="url(#discShadow)" />

    <!-- Center Disc Labels: 2.1M BLTE TOTAL CAP -->
    <text x="180" y="165" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="900" fill="#111111">2.1M</text>
    <text x="180" y="192" text-anchor="middle" font-family="Courier, monospace" font-size="15" font-weight="900" letter-spacing="2" fill="#B8661B">BLTE</text>
    <text x="180" y="212" text-anchor="middle" font-family="Courier, monospace" font-size="9.5" font-weight="700" letter-spacing="1.5" fill="#777777">TOTAL CAP</text>
  </svg>`;

  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Helvetica',
    },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

async function generateWhitepaperPdf() {
  const pdfDoc = await PDFDocument.create();

  // Standard Fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);
  const fontMonoBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  // High-resolution chart PNG
  const chartPngBuffer = renderCircularChartPng();
  const chartPngImage = await pdfDoc.embedPng(chartPngBuffer);

  // Institutional Color Palette
  const goldColor = rgb(0.72, 0.40, 0.11);       // #B8661B Warm Gold Accent
  const titleColor = rgb(0.07, 0.07, 0.07);      // #121212 Rich Black
  const bodyColor = rgb(0.18, 0.18, 0.18);       // #2E2E2E High-legibility Body
  const grayColor = rgb(0.42, 0.42, 0.42);       // #6B6B6B Secondary Text
  const lightGray = rgb(0.88, 0.88, 0.88);       // #E0E0E0 Clean Subtle Dividers
  const cardBg = rgb(0.985, 0.98, 0.972);        // #FAF7F5 Crisp Light Tint
  const whiteColor = rgb(1.0, 1.0, 1.0);
  const greenColor = rgb(0.13, 0.77, 0.37);      // #22C55E Radiant Light Green
  const darkGreen = rgb(0.09, 0.52, 0.24);       // #16A34A Verified Forest Green
  const amberColor = rgb(0.96, 0.62, 0.04);      // #F59E0B Warm Solar Gold

  const PAGE_WIDTH = 595.28;   // A4 Standard
  const PAGE_HEIGHT = 841.89;  // A4 Standard
  const MARGIN_LEFT = 50;
  const MARGIN_RIGHT = 50;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT; // 495.28 pt
  const MARGIN_TOP = 46;
  const MARGIN_BOTTOM = 46;
  const TOTAL_PAGES = 4;

  // Single Source of Truth from TOKEN_CONFIG
  const fairLaunchAlloc = TOKEN_CONFIG.allocations.find(a => a.id === 'fair-launch') || {
    category: 'Fair Launch',
    percentage: 70,
    amount: 1470000,
    description: 'Direct community and public fair launch distribution on Solana with borderless access.',
    color: '#F59E0B'
  };

  const liquidityAlloc = TOKEN_CONFIG.allocations.find(a => a.id === 'liquidity-pool') || {
    category: 'Liquidity Pool',
    percentage: 30,
    amount: 630000,
    description: 'Automated market maker (AMM) DEX liquidity pool deployment on Raydium.',
    color: '#22C55E'
  };

  const fairLaunchRgb = hexToRgb(fairLaunchAlloc.color || '#F59E0B');
  const liquidityRgb = hexToRgb(liquidityAlloc.color || '#22C55E');

  function wrapText(text, maxWidth, font, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (textWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    return lines;
  }

  function drawRunningHeader(page, subHeader = 'GENESIS SPECIFICATION') {
    page.drawText('BITCOIN LITE EDITION ($BLTE) · ARCHITECTURAL WHITE PAPER', {
      x: MARGIN_LEFT,
      y: PAGE_HEIGHT - 32,
      size: 7.5,
      font: fontMonoBold,
      color: goldColor,
    });

    const subWidth = fontMono.widthOfTextAtSize(subHeader, 7.5);
    page.drawText(subHeader, {
      x: PAGE_WIDTH - MARGIN_RIGHT - subWidth,
      y: PAGE_HEIGHT - 32,
      size: 7.5,
      font: fontMono,
      color: grayColor,
    });

    page.drawLine({
      start: { x: MARGIN_LEFT, y: PAGE_HEIGHT - 38 },
      end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: PAGE_HEIGHT - 38 },
      thickness: 0.5,
      color: lightGray,
    });
  }

  function drawRunningFooter(page, pageNum) {
    page.drawLine({
      start: { x: MARGIN_LEFT, y: MARGIN_BOTTOM },
      end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: MARGIN_BOTTOM },
      thickness: 0.5,
      color: lightGray,
    });

    page.drawText(`Bitcoin Lite Edition ($BLTE) · Verified Protocol Release`, {
      x: MARGIN_LEFT,
      y: MARGIN_BOTTOM - 14,
      size: 7.5,
      font: fontMono,
      color: grayColor,
    });

    const pageStr = `Page ${pageNum} of ${TOTAL_PAGES}`;
    const pageStrWidth = fontMonoBold.widthOfTextAtSize(pageStr, 8);
    page.drawText(pageStr, {
      x: PAGE_WIDTH - MARGIN_RIGHT - pageStrWidth,
      y: MARGIN_BOTTOM - 14,
      size: 8,
      font: fontMonoBold,
      color: goldColor,
    });
  }

  function drawCleanSectionHeader(page, y, num, title) {
    page.drawText(`${num}. ${title}`, {
      x: MARGIN_LEFT,
      y: y,
      size: 13,
      font: fontBold,
      color: titleColor,
    });
    y -= 5;

    page.drawLine({
      start: { x: MARGIN_LEFT, y: y },
      end: { x: MARGIN_LEFT + 120, y: y },
      thickness: 1.2,
      color: goldColor,
    });
    y -= 14;

    return y;
  }

  function renderParagraphs(page, startY, paragraphs, options = {}) {
    let y = startY;
    const maxWidth = options.maxWidth || CONTENT_WIDTH;
    const fontSize = options.fontSize || 9;
    const lineHeight = options.lineHeight || 13.5;
    const pGap = options.pGap || 7;

    for (const p of paragraphs) {
      const isBullet = p.startsWith('•');
      const indent = isBullet ? 12 : (options.indent || 0);
      const font = options.font || fontRegular;
      const color = isBullet ? titleColor : (options.color || bodyColor);

      const lines = wrapText(p, maxWidth - indent, font, fontSize);
      for (const line of lines) {
        page.drawText(line, {
          x: MARGIN_LEFT + indent,
          y: y,
          size: fontSize,
          font: font,
          color: color,
        });
        y -= lineHeight;
      }
      y -= pGap;
    }
    return y;
  }

  // =========================================================================
  // PAGE 1: COVER & EXECUTIVE SUMMARY
  // =========================================================================
  const page1 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y1 = PAGE_HEIGHT - MARGIN_TOP;

  // Clean Gold Accent Rule
  page1.drawLine({
    start: { x: MARGIN_LEFT, y: y1 },
    end: { x: MARGIN_LEFT + 60, y: y1 },
    thickness: 3,
    color: goldColor,
  });
  y1 -= 16;

  // Kicker
  page1.drawText('OFFICIAL PROTOCOL SPECIFICATION · SOLANA MAINNET L1', {
    x: MARGIN_LEFT,
    y: y1,
    size: 8,
    font: fontMonoBold,
    color: goldColor,
  });
  y1 -= 24;

  // Document Title
  page1.drawText('Bitcoin Lite Edition', {
    x: MARGIN_LEFT,
    y: y1,
    size: 27,
    font: fontBold,
    color: titleColor,
  });
  y1 -= 16;

  // Subtitle
  page1.drawText('Architectural White Paper & Digital Scarcity Specification', {
    x: MARGIN_LEFT,
    y: y1,
    size: 11,
    font: fontRegular,
    color: grayColor,
  });
  y1 -= 20;

  // Protocol Core Parameters Row (Clean Minimalist Banner)
  const metaH = 44;
  page1.drawRectangle({
    x: MARGIN_LEFT,
    y: y1 - metaH,
    width: CONTENT_WIDTH,
    height: metaH,
    color: cardBg,
    borderColor: lightGray,
    borderWidth: 0.8,
  });

  const metaItems = [
    { label: 'TOKEN SYMBOL', val: `${TOKEN_CONFIG.symbol}` },
    { label: 'TOTAL SUPPLY', val: `${TOKEN_CONFIG.shortSupply} (Strict Cap)` },
    { label: 'CONSENSUS', val: `${TOKEN_CONFIG.network.toUpperCase()} L1 (PoH/PoS)` },
    { label: 'MINT AUTHORITY', val: 'Permanently Revoked' },
  ];
  const colW = CONTENT_WIDTH / 4;
  metaItems.forEach((col, idx) => {
    const colX = MARGIN_LEFT + idx * colW + 12;
    page1.drawText(col.label, {
      x: colX,
      y: y1 - 15,
      size: 6.8,
      font: fontMonoBold,
      color: goldColor,
    });
    page1.drawText(col.val, {
      x: colX,
      y: y1 - 30,
      size: 9,
      font: fontBold,
      color: titleColor,
    });
  });
  y1 -= (metaH + 18);

  // Table of Contents Card (Professional, Document Navigation)
  const tocH = 46;
  page1.drawRectangle({
    x: MARGIN_LEFT,
    y: y1 - tocH,
    width: CONTENT_WIDTH,
    height: tocH,
    color: whiteColor,
    borderColor: lightGray,
    borderWidth: 0.7,
  });

  page1.drawText('DOCUMENT OUTLINE & FOUR-PAGE ARCHITECTURE', {
    x: MARGIN_LEFT + 14,
    y: y1 - 14,
    size: 7,
    font: fontMonoBold,
    color: goldColor,
  });

  const tocCols = [
    'Page 1: 1. Executive Summary · 2. Digital Scarcity · 3. Genesis Paradigm',
    'Page 2: 4. Technical Distinction · 5. Solana L1 · 6. Token Parameters',
    'Page 3: 7. Tokenomics Architecture (Prominent Centered Chart & Allocations)',
    'Page 4: 8. Immutability · 9. Strategic Roadmap · 10. Verification & Audit',
  ];

  page1.drawText(tocCols[0], { x: MARGIN_LEFT + 14, y: y1 - 27, size: 7.2, font: fontRegular, color: bodyColor });
  page1.drawText(tocCols[1], { x: MARGIN_LEFT + 14, y: y1 - 38, size: 7.2, font: fontRegular, color: bodyColor });
  page1.drawText(tocCols[2], { x: MARGIN_LEFT + 265, y: y1 - 27, size: 7.2, font: fontBold, color: goldColor });
  page1.drawText(tocCols[3], { x: MARGIN_LEFT + 265, y: y1 - 38, size: 7.2, font: fontRegular, color: bodyColor });

  y1 -= (tocH + 20);

  // Section 1: Executive Summary & Abstract
  y1 = drawCleanSectionHeader(page1, y1, '1', 'Executive Summary & Abstract');
  y1 = renderParagraphs(page1, y1, [
    'Bitcoin Lite Edition (BLTE) is an independent cryptographic digital asset engineered natively on the Solana blockchain. Built upon the foundational paradigm of digital scarcity established by Bitcoin in 2008, Bitcoin Lite Edition couples an ultra-scarce, mathematically sealed supply with high-throughput, sub-second execution.',
    'IMPORTANT LEGAL & CONCEPTUAL DISTINCTION: Bitcoin Lite Edition is not Bitcoin, is not an official Bitcoin product, and is not affiliated with, endorsed by, or issued by Bitcoin Core, Satoshi Nakamoto, or any Bitcoin developer organizations. It operates exclusively on Solana as an SPL / Token-2022 asset with independent governance and zero counterparty exposure.'
  ], { fontSize: 8.8, lineHeight: 13, pGap: 7 });
  y1 -= 8;

  // Section 2: Foundational Philosophy & Digital Scarcity
  y1 = drawCleanSectionHeader(page1, y1, '2', 'Foundational Philosophy: Digital Scarcity');
  y1 = renderParagraphs(page1, y1, [
    'While Bitcoin demonstrated that mathematical scarcity can anchor decentralized digital value, Proof-of-Work architectures face structural friction: multi-minute confirmation latency, unpredictable mempool fee spikes, and intense thermodynamic energy consumption. Bitcoin Lite Edition adopts absolute mathematical scarcity—enforcing a fixed cap of 2,100,000 tokens (2.1M, exactly 10x numerically scarcer than Bitcoin\'s 21,000,000 limit)—while operating on Solana\'s eco-friendly Proof-of-History (PoH) consensus.',
    'Scarcity in Bitcoin Lite Edition is strictly non-inflationary: there are zero secondary mints, dynamic emission schedules, or validator staking rewards paid through newly created tokens. Every unit of BLTE was created at block zero and cannot be inflated.'
  ], { fontSize: 8.8, lineHeight: 13, pGap: 7 });
  y1 -= 8;

  // Section 3: The Genesis Paradigm
  y1 = drawCleanSectionHeader(page1, y1, '3', 'The Genesis Paradigm');
  y1 = renderParagraphs(page1, y1, [
    'Conceived as a pure realization of digital scarcity on modern rails, BLTE was issued with 2,100,000 total tokens. At genesis, both the Mint Authority and Freeze Authority were irrevocably revoked (set to null), permanently eliminating team discretion.',
    'The "Lite" designation represents sub-second ~400ms finality, sub-penny settlement fees (<$0.001 per transfer), and effortless friction-free transactions.'
  ], { fontSize: 8.8, lineHeight: 13, pGap: 6 });

  drawRunningFooter(page1, 1);

  // =========================================================================
  // PAGE 2: ARCHITECTURE & TECHNICAL SPECIFICATIONS
  // =========================================================================
  const page2 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y2 = PAGE_HEIGHT - MARGIN_TOP;
  drawRunningHeader(page2, 'ARCHITECTURE & TECHNICAL SPECIFICATIONS');

  y2 -= 18;

  // Section 4: Technical Distinction from Bitcoin
  y2 = drawCleanSectionHeader(page2, y2, '4', 'Technical Distinction from Bitcoin');
  y2 = renderParagraphs(page2, y2, [
    'Bitcoin operates on its own dedicated Layer 1 network utilizing Proof-of-Work (PoW) mining, SHA-256 hashing, UTXO accounting, and 10-minute block intervals with a 21,000,000 coin cap.',
    'Bitcoin Lite Edition operates natively on Solana Layer 1 utilizing Proof-of-History (PoH) and Tower BFT consensus, account-based state transitions, ~400 millisecond blocks, and a fixed cap of 2,100,000 BLTE. It is completely independent in code, consensus, and state.'
  ], { fontSize: 9, lineHeight: 13.5, pGap: 8 });

  // Clean Comparison Table
  const tableH = 92;
  page2.drawRectangle({
    x: MARGIN_LEFT,
    y: y2 - tableH,
    width: CONTENT_WIDTH,
    height: tableH,
    color: cardBg,
    borderColor: lightGray,
    borderWidth: 0.8,
  });

  // Table Header Row
  page2.drawText('FEATURE', { x: MARGIN_LEFT + 14, y: y2 - 16, size: 7.5, font: fontMonoBold, color: grayColor });
  page2.drawText('BITCOIN (BTC)', { x: MARGIN_LEFT + 145, y: y2 - 16, size: 7.5, font: fontMonoBold, color: grayColor });
  page2.drawText('BITCOIN LITE EDITION (BLTE)', { x: MARGIN_LEFT + 310, y: y2 - 16, size: 7.5, font: fontMonoBold, color: goldColor });

  page2.drawLine({
    start: { x: MARGIN_LEFT + 12, y: y2 - 22 },
    end: { x: MARGIN_LEFT + CONTENT_WIDTH - 12, y: y2 - 22 },
    thickness: 0.5,
    color: lightGray,
  });

  const compData = [
    { feat: 'Consensus Mechanism', btc: 'Proof-of-Work (SHA-256)', blte: 'Proof-of-History / PoS' },
    { feat: 'Block Finality', btc: '10–60 Minutes (6 confirms)', blte: '~400 Milliseconds (instant)' },
    { feat: 'Transaction Fee', btc: 'Variable ($1.50 – $35.00+)', blte: '< $0.001 (sub-penny)' },
    { feat: 'Maximum Supply', btc: '21,000,000 BTC', blte: '2,100,000 BLTE (10x Scarcer)' },
  ];

  compData.forEach((row, i) => {
    const rowY = y2 - 36 - i * 14;
    page2.drawText(row.feat, { x: MARGIN_LEFT + 14, y: rowY, size: 8, font: fontBold, color: titleColor });
    page2.drawText(row.btc, { x: MARGIN_LEFT + 145, y: rowY, size: 8, font: fontRegular, color: bodyColor });
    page2.drawText(row.blte, { x: MARGIN_LEFT + 310, y: rowY, size: 8, font: fontBold, color: darkGreen });
  });

  y2 -= (tableH + 20);

  // Section 5: Solana Execution Layer & Consensus
  y2 = drawCleanSectionHeader(page2, y2, '5', 'Solana Execution Layer & Consensus');
  y2 = renderParagraphs(page2, y2, [
    'Solana utilizes Proof-of-History (PoH) as a cryptographic clock before consensus. Combined with Tower BFT, this allows the network to order transactions without waiting for global block broadcast consensus before sequencing.',
    'This architecture ensures that Bitcoin Lite Edition transactions settle in sub-second intervals with negligible network fees, making micro-transfers and DeFi integrations frictionless without reliance on secondary custodial channels or bridging protocols.'
  ], { fontSize: 9, lineHeight: 13.5, pGap: 8 });
  y2 -= 10;

  // Section 6: Protocol & Token Parameters
  y2 = drawCleanSectionHeader(page2, y2, '6', 'Protocol & Token Parameters');
  y2 = renderParagraphs(page2, y2, [
    'The core parameters of Bitcoin Lite Edition are permanently encoded in the Solana SPL Token-2022 configuration without upgrade proxies or mutability hooks:'
  ], { fontSize: 9, lineHeight: 13.5, pGap: 8 });

  // 2x4 Specifications Cards (Clean, Spacious)
  const specs = [
    { label: 'TOKEN NAME', value: 'Bitcoin Lite Edition' },
    { label: 'TICKER / SYMBOL', value: 'BLTE' },
    { label: 'NETWORK EXECUTION', value: 'Solana Layer 1 Mainnet' },
    { label: 'PROGRAM STANDARD', value: 'SPL / Token-2022' },
    { label: 'TOTAL SUPPLY CAP', value: '2,100,000 BLTE (Strict Cap)' },
    { label: 'TOKEN RESOLUTION', value: '9 Decimals (0.000000001 BLTE)' },
    { label: 'MINT AUTHORITY', value: 'Permanently Revoked (Null)' },
    { label: 'FREEZE AUTHORITY', value: 'Permanently Revoked (Disabled)' },
  ];

  const specW = (CONTENT_WIDTH - 12) / 2;
  const specH = 36;
  specs.forEach((s, idx) => {
    const colIdx = idx % 2;
    const rowIdx = Math.floor(idx / 2);
    const sX = MARGIN_LEFT + colIdx * (specW + 12);
    const sY = y2 - (rowIdx * (specH + 8)) - specH;

    page2.drawRectangle({
      x: sX,
      y: sY,
      width: specW,
      height: specH,
      color: cardBg,
      borderColor: lightGray,
      borderWidth: 0.7,
    });

    page2.drawText(s.label, {
      x: sX + 12,
      y: sY + specH - 12,
      size: 7,
      font: fontMonoBold,
      color: goldColor,
    });

    page2.drawText(s.value, {
      x: sX + 12,
      y: sY + 9,
      size: 9,
      font: fontBold,
      color: titleColor,
    });
  });

  drawRunningFooter(page2, 2);

  // =========================================================================
  // PAGE 3: DEDICATED TOKENOMICS PAGE (PROMINENT CENTERED CIRCLE + ALLOCATIONS UNDERNEATH)
  // =========================================================================
  const page3 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y3 = PAGE_HEIGHT - MARGIN_TOP;
  drawRunningHeader(page3, 'DEDICATED TOKENOMICS ARCHITECTURE');

  y3 -= 18;

  // Section 7: Tokenomics & Mathematical Allocation Header
  y3 = drawCleanSectionHeader(page3, y3, '7', 'Tokenomics & Mathematical Allocation');
  y3 = renderParagraphs(page3, y3, [
    'Bitcoin Lite Edition is engineered with absolute mathematical scarcity, strictly capped at 2,100,000 BLTE (2.1M) at genesis. In adherence to zero-premine principles, 100% of the total supply is fully accounted for on-chain with permanently revoked mint authority, zero unminted reserves, and zero dilution.'
  ], { fontSize: 8.8, lineHeight: 13, pGap: 6 });

  y3 -= 2;

  // Minimalist Key Metric Line (Total Supply, Circulation, Mint Authority)
  page3.drawLine({
    start: { x: MARGIN_LEFT, y: y3 },
    end: { x: MARGIN_LEFT + CONTENT_WIDTH, y: y3 },
    thickness: 0.6,
    color: lightGray,
  });

  const snapMetrics = [
    { label: 'TOTAL SUPPLY', val: '2,100,000 BLTE', sub: 'Strict Inviolable Cap' },
    { label: 'CIRCULATION', val: '100% Unlocked', sub: 'Zero Unminted Reserve' },
    { label: 'MINT & FREEZE', val: 'Revoked (Null)', sub: 'Zero Dilution / Tamper-Proof' },
  ];
  const colMetricW = CONTENT_WIDTH / 3;
  snapMetrics.forEach((m, idx) => {
    const colX = MARGIN_LEFT + idx * colMetricW + 8;
    page3.drawText(m.label, {
      x: colX,
      y: y3 - 12,
      size: 6.8,
      font: fontMonoBold,
      color: goldColor,
    });
    page3.drawText(m.val, {
      x: colX,
      y: y3 - 23,
      size: 8.8,
      font: fontBold,
      color: titleColor,
    });
    page3.drawText(m.sub, {
      x: colX,
      y: y3 - 32,
      size: 6.8,
      font: fontRegular,
      color: grayColor,
    });
  });

  page3.drawLine({
    start: { x: MARGIN_LEFT, y: y3 - 38 },
    end: { x: MARGIN_LEFT + CONTENT_WIDTH, y: y3 - 38 },
    thickness: 0.6,
    color: lightGray,
  });

  y3 -= 46;

  // 1. PROMINENT CENTERED CIRCULAR TOKENOMICS CHART
  const chartSizePt = 226;
  const chartX = (PAGE_WIDTH - chartSizePt) / 2; // Exact horizontal centering (184.64 pt)
  const chartY = y3 - chartSizePt;

  page3.drawImage(chartPngImage, {
    x: chartX,
    y: chartY,
    width: chartSizePt,
    height: chartSizePt,
  });

  // Centered Chart Kicker Underneath
  const chartKicker = 'SOLANA MAINNET L1 · INVIOLABLE GENESIS DISTRIBUTION';
  const kickerWidth = fontMonoBold.widthOfTextAtSize(chartKicker, 7);
  page3.drawText(chartKicker, {
    x: (PAGE_WIDTH - kickerWidth) / 2,
    y: chartY - 13,
    size: 7,
    font: fontMonoBold,
    color: goldColor,
  });

  y3 = chartY - 28;

  // 2. FAIR LAUNCH AND LIQUIDITY POOL DIRECTLY UNDERNEATH THE CHART
  // Clean side-by-side columns without heavy rectangular bordered containers
  const allocColW = (CONTENT_WIDTH - 30) / 2; // ~232.6 pt
  const col1Left = MARGIN_LEFT + 4;
  const col2Left = MARGIN_LEFT + allocColW + 26;

  // Column 1: FAIR LAUNCH (70% · 1,470,000 BLTE)
  // Colored Indicator + Header
  page3.drawCircle({
    x: col1Left + 5,
    y: y3 - 3,
    size: 4.5,
    color: fairLaunchRgb,
  });

  page3.drawText('FAIR LAUNCH', {
    x: col1Left + 16,
    y: y3 - 6,
    size: 10.5,
    font: fontMonoBold,
    color: titleColor,
  });

  // Large Prominent Percentage + Amount
  page3.drawText('70%', {
    x: col1Left + 4,
    y: y3 - 32,
    size: 24,
    font: fontBold,
    color: amberColor,
  });

  page3.drawText('1,470,000 BLTE', {
    x: col1Left + 64,
    y: y3 - 28,
    size: 11.5,
    font: fontMonoBold,
    color: titleColor,
  });

  page3.drawLine({
    start: { x: col1Left + 4, y: y3 - 38 },
    end: { x: col1Left + allocColW, y: y3 - 38 },
    thickness: 0.5,
    color: lightGray,
  });

  // Clean Typography Description
  const fairDesc = 'Direct community and public fair launch distribution on Solana with borderless access.';
  const fairLines = wrapText(fairDesc, allocColW - 6, fontRegular, 8.5);
  let flY = y3 - 50;
  for (const line of fairLines) {
    page3.drawText(line, {
      x: col1Left + 4,
      y: flY,
      size: 8.5,
      font: fontRegular,
      color: bodyColor,
    });
    flY -= 12;
  }

  page3.drawText('1,470,000 / 2,100,000 BLTE · 100% Unlocked · Zero Lockup', {
    x: col1Left + 4,
    y: flY - 2,
    size: 7.2,
    font: fontMono,
    color: grayColor,
  });

  // Column 2: LIQUIDITY POOL (30% · 630,000 BLTE)
  // Colored Indicator + Header
  page3.drawCircle({
    x: col2Left + 5,
    y: y3 - 3,
    size: 4.5,
    color: liquidityRgb,
  });

  page3.drawText('LIQUIDITY POOL', {
    x: col2Left + 16,
    y: y3 - 6,
    size: 10.5,
    font: fontMonoBold,
    color: titleColor,
  });

  // Large Prominent Percentage + Amount
  page3.drawText('30%', {
    x: col2Left + 4,
    y: y3 - 32,
    size: 24,
    font: fontBold,
    color: darkGreen,
  });

  page3.drawText('630,000 BLTE', {
    x: col2Left + 64,
    y: y3 - 28,
    size: 11.5,
    font: fontMonoBold,
    color: titleColor,
  });

  page3.drawLine({
    start: { x: col2Left + 4, y: y3 - 38 },
    end: { x: col2Left + allocColW, y: y3 - 38 },
    thickness: 0.5,
    color: lightGray,
  });

  // Clean Typography Description
  const liqDesc = 'Automated market maker (AMM) DEX liquidity pool deployment on Raydium.';
  const liqLines = wrapText(liqDesc, allocColW - 6, fontRegular, 8.5);
  let llY = y3 - 50;
  for (const line of liqLines) {
    page3.drawText(line, {
      x: col2Left + 4,
      y: llY,
      size: 8.5,
      font: fontRegular,
      color: bodyColor,
    });
    llY -= 12;
  }

  page3.drawText('630,000 / 2,100,000 BLTE · 100% Unlocked · Raydium AMM', {
    x: col2Left + 4,
    y: llY - 2,
    size: 7.2,
    font: fontMono,
    color: grayColor,
  });

  // Subtle vertical separator line between the two columns
  const dividerX = (col1Left + allocColW + col2Left) / 2;
  page3.drawLine({
    start: { x: dividerX, y: y3 },
    end: { x: dividerX, y: y3 - 82 },
    thickness: 0.5,
    color: lightGray,
  });

  y3 -= 96;

  // 3. MINIMALIST ALLOCATION LEDGER TABLE
  const table3H = 68;
  page3.drawRectangle({
    x: MARGIN_LEFT,
    y: y3 - table3H,
    width: CONTENT_WIDTH,
    height: table3H,
    color: cardBg,
    borderColor: lightGray,
    borderWidth: 0.6,
  });

  const tHeaderY = y3 - 13;
  page3.drawText('ALLOCATION CATEGORY', { x: MARGIN_LEFT + 14, y: tHeaderY, size: 7, font: fontMonoBold, color: grayColor });
  page3.drawText('SHARE %', { x: MARGIN_LEFT + 148, y: tHeaderY, size: 7, font: fontMonoBold, color: grayColor });
  page3.drawText('BLTE AMOUNT', { x: MARGIN_LEFT + 208, y: tHeaderY, size: 7, font: fontMonoBold, color: grayColor });
  page3.drawText('VESTING / UNLOCK', { x: MARGIN_LEFT + 295, y: tHeaderY, size: 7, font: fontMonoBold, color: grayColor });
  page3.drawText('ON-CHAIN STATUS', { x: MARGIN_LEFT + 400, y: tHeaderY, size: 7, font: fontMonoBold, color: grayColor });

  page3.drawLine({
    start: { x: MARGIN_LEFT + 12, y: y3 - 18 },
    end: { x: MARGIN_LEFT + CONTENT_WIDTH - 12, y: y3 - 18 },
    thickness: 0.5,
    color: lightGray,
  });

  const table3Rows = [
    { cat: 'Fair Launch Distribution', pct: '70.0%', amt: '1,470,000 BLTE', vest: '100% Genesis Unlocked', stat: 'Public Solana Access', col: amberColor },
    { cat: 'Liquidity Pool (Raydium)', pct: '30.0%', amt: '630,000 BLTE', vest: '100% Genesis Unlocked', stat: 'AMM DEX Initialized', col: darkGreen },
    { cat: 'Total Inviolable Cap', pct: '100.0%', amt: '2,100,000 BLTE', vest: '0% Unminted Overhang', stat: 'Mathematically Sealed', col: goldColor },
  ];

  table3Rows.forEach((row, i) => {
    const rowY = y3 - 30 - i * 13;
    page3.drawText(row.cat, { x: MARGIN_LEFT + 14, y: rowY, size: 7.8, font: fontBold, color: titleColor });
    page3.drawText(row.pct, { x: MARGIN_LEFT + 148, y: rowY, size: 7.8, font: fontMonoBold, color: row.col });
    page3.drawText(row.amt, { x: MARGIN_LEFT + 208, y: rowY, size: 7.8, font: fontMonoBold, color: titleColor });
    page3.drawText(row.vest, { x: MARGIN_LEFT + 295, y: rowY, size: 7.8, font: fontRegular, color: bodyColor });
    page3.drawText(row.stat, { x: MARGIN_LEFT + 400, y: rowY, size: 7.8, font: fontBold, color: row.col });
  });

  y3 -= (table3H + 16);

  // 4. COMPACT VERIFICATION STATEMENT AT THE BOTTOM OF THE TOKENOMICS SECTION
  const bannerH = 74;
  page3.drawRectangle({
    x: MARGIN_LEFT,
    y: y3 - bannerH,
    width: CONTENT_WIDTH,
    height: bannerH,
    color: whiteColor,
    borderColor: lightGray,
    borderWidth: 0.7,
  });

  // Top accent bar inside container
  page3.drawLine({
    start: { x: MARGIN_LEFT, y: y3 },
    end: { x: MARGIN_LEFT + CONTENT_WIDTH, y: y3 },
    thickness: 1.5,
    color: darkGreen,
  });

  page3.drawText('MATHEMATICAL INTEGRITY & ZERO-TRUST GENESIS VERIFICATION', {
    x: MARGIN_LEFT + 14,
    y: y3 - 14,
    size: 7.5,
    font: fontMonoBold,
    color: darkGreen,
  });

  page3.drawLine({
    start: { x: MARGIN_LEFT + 14, y: y3 - 19 },
    end: { x: MARGIN_LEFT + CONTENT_WIDTH - 14, y: y3 - 19 },
    thickness: 0.5,
    color: lightGray,
  });

  const statementLines = [
    '• Total Cap: 2,100,000 BLTE strictly fixed at block zero (100% accounted for on-chain).',
    '• Mint Authority: Permanently revoked (set to null address; impossible to mint additional tokens).',
    '• Freeze Authority: Permanently disabled (no centralized blacklists or account freezes).',
    '• Dilution Exposure: 0.00% (zero secondary inflation, zero unlocks, zero developer vesting overhang).'
  ];

  let stY = y3 - 30;
  statementLines.forEach(line => {
    page3.drawText(line, {
      x: MARGIN_LEFT + 14,
      y: stY,
      size: 7.6,
      font: fontRegular,
      color: titleColor,
    });
    stY -= 11.5;
  });

  drawRunningFooter(page3, 3);

  // =========================================================================
  // PAGE 4: ROADMAP, VERIFICATION & LEGAL DISCLAIMER
  // =========================================================================
  const page4 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y4 = PAGE_HEIGHT - MARGIN_TOP;
  drawRunningHeader(page4, 'GOVERNANCE, ROADMAP & AUDIT');

  y4 -= 18;

  // Section 8: Immutability & Revoked Authorities
  y4 = drawCleanSectionHeader(page4, y4, '8', 'Immutability & Revoked Authorities');
  y4 = renderParagraphs(page4, y4, [
    'To guarantee decentralized custody and eliminate counterparty risk, the SPL mint authority was permanently set to null immediately upon token creation on Solana genesis. Freeze authority was disabled simultaneously.',
    'No developer, smart contract upgrade proxy, or multi-signature treasury wallet can ever mint additional tokens or freeze user accounts. The token supply of 2,100,000 BLTE is mathematically sealed forever.'
  ], { fontSize: 8.8, lineHeight: 13, pGap: 8 });
  y4 -= 10;

  // Section 9: Strategic Development Roadmap
  y4 = drawCleanSectionHeader(page4, y4, '9', 'Strategic Development Roadmap');

  const roadmapPhases = [
    {
      phase: 'Phase 01: Foundation',
      status: 'COMPLETED',
      statusColor: darkGreen,
      desc: 'Architecture design, White Paper publication, transparency portal, Devnet verification.'
    },
    {
      phase: 'Phase 02: Launch',
      status: 'IN PROGRESS',
      statusColor: goldColor,
      desc: 'Mainnet token deployment, authority revocation verification, initial DEX liquidity initialization.'
    },
    {
      phase: 'Phase 03: Ecosystem',
      status: 'UPCOMING',
      statusColor: grayColor,
      desc: 'Real-time on-chain supply and holder analytics, decentralized governance tooling, Solana DeFi integrations.'
    },
    {
      phase: 'Phase 04: Expansion',
      status: 'UPCOMING',
      statusColor: grayColor,
      desc: 'Long-term digital scarcity preservation, cross-program tooling, and open developer documentation.'
    },
  ];

  const phaseH = 40;
  roadmapPhases.forEach((rp) => {
    page4.drawRectangle({
      x: MARGIN_LEFT,
      y: y4 - phaseH,
      width: CONTENT_WIDTH,
      height: phaseH,
      color: cardBg,
      borderColor: lightGray,
      borderWidth: 0.7,
    });

    page4.drawText(rp.phase, {
      x: MARGIN_LEFT + 14,
      y: y4 - 14,
      size: 8.8,
      font: fontBold,
      color: titleColor,
    });

    // Clean status badge
    const statW = fontMonoBold.widthOfTextAtSize(rp.status, 7.2);
    page4.drawText(rp.status, {
      x: MARGIN_LEFT + CONTENT_WIDTH - statW - 14,
      y: y4 - 14,
      size: 7.2,
      font: fontMonoBold,
      color: rp.statusColor,
    });

    page4.drawText(rp.desc, {
      x: MARGIN_LEFT + 14,
      y: y4 - 28,
      size: 7.8,
      font: fontRegular,
      color: bodyColor,
    });

    y4 -= (phaseH + 8);
  });
  y4 -= 10;

  // Section 10: Zero-Trust On-Chain Verification
  y4 = drawCleanSectionHeader(page4, y4, '10', 'Zero-Trust On-Chain Verification');
  y4 = renderParagraphs(page4, y4, [
    'All token parameters, supply figures, holder distributions, and authority configurations can be verified independently by any party using public Solana block explorers (such as Solscan and Solana Explorer).',
    'The codebase and token standards rely exclusively on open-source Solana standard libraries, guaranteeing auditability and transparent cryptographic verification.'
  ], { fontSize: 8.8, lineHeight: 13, pGap: 8 });
  y4 -= 14;

  // Legal Disclaimer Box (Clean and Formal)
  const disclaimerH = 80;
  page4.drawRectangle({
    x: MARGIN_LEFT,
    y: y4 - disclaimerH,
    width: CONTENT_WIDTH,
    height: disclaimerH,
    color: whiteColor,
    borderColor: lightGray,
    borderWidth: 0.8,
  });

  page4.drawText('LEGAL DISCLAIMER & NON-AFFILIATION DISCLOSURE', {
    x: MARGIN_LEFT + 14,
    y: y4 - 16,
    size: 7.2,
    font: fontMonoBold,
    color: goldColor,
  });

  const disclaimerText = 'Bitcoin Lite Edition is an independent Solana cryptographic token and is NOT affiliated with, endorsed by, or a fork of Bitcoin Core, Satoshi Nakamoto, or any Bitcoin developer organizations. This white paper is published for informational and architectural description purposes only and does not constitute financial, investment, or legal advice. Digital assets involve substantial market risk and volatility. Always verify on-chain contracts independently on Solscan.';
  const discLines = wrapText(disclaimerText, CONTENT_WIDTH - 28, fontOblique, 7.3);
  let dY = y4 - 30;
  for (const line of discLines) {
    page4.drawText(line, {
      x: MARGIN_LEFT + 14,
      y: dY,
      size: 7.3,
      font: fontOblique,
      color: grayColor,
    });
    dY -= 10.5;
  }

  drawRunningFooter(page4, 4);

  // =========================================================================
  // SAVE PDF AND VALIDATE EXACT 4 PAGES COUNT
  // =========================================================================
  const pageCount = pdfDoc.getPageCount();
  if (pageCount !== 4) {
    throw new Error(`CRITICAL VALIDATION FAILURE: Expected exactly 4 pages, got ${pageCount}`);
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/bitcoin-lite-edition-whitepaper.pdf');
  fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

  // Also copy to dist and build if they exist
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'bitcoin-lite-edition-whitepaper.pdf'), Buffer.from(pdfBytes));
  }
  const buildDir = path.resolve('build');
  if (fs.existsSync(buildDir)) {
    fs.writeFileSync(path.join(buildDir, 'bitcoin-lite-edition-whitepaper.pdf'), Buffer.from(pdfBytes));
  }

  console.log(`Successfully generated official whitepaper PDF: ${outputPath} (${pdfBytes.length} bytes, EXACTLY ${pageCount} pages)`);
}

generateWhitepaperPdf().catch(err => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
