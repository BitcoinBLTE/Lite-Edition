import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateWhitepaperPdf() {
  const pdfDoc = await PDFDocument.create();
  
  // Embed standard fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);
  const fontMonoBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  const goldColor = rgb(0.72, 0.40, 0.11); // #B8661B
  const darkColor = rgb(0.05, 0.05, 0.05); // #0D0D0D
  const grayColor = rgb(0.35, 0.35, 0.35); // #595959
  const lightBorder = rgb(0.88, 0.88, 0.88);
  const lightBg = rgb(0.98, 0.96, 0.94); // warm ivory / cream

  const PAGE_WIDTH = 595.28; // A4 standard
  const PAGE_HEIGHT = 841.89; // A4 standard
  const MARGIN_LEFT = 50;
  const MARGIN_RIGHT = 50;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT; // 495.28
  const MARGIN_TOP = 55;
  const MARGIN_BOTTOM = 55;

  let pages = [];
  let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  pages.push(currentPage);
  let currentY = PAGE_HEIGHT - MARGIN_TOP;

  function checkPageBreak(requiredHeight) {
    if (currentY - requiredHeight < MARGIN_BOTTOM) {
      currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      pages.push(currentPage);
      currentY = PAGE_HEIGHT - MARGIN_TOP;
      drawRunningHeader();
    }
  }

  function drawRunningHeader() {
    if (pages.length === 1) return; // Skip cover/title page header
    currentPage.drawText('BITCOIN LITE EDITION — ARCHITECTURAL WHITE PAPER', {
      x: MARGIN_LEFT,
      y: PAGE_HEIGHT - 35,
      size: 8,
      font: fontMonoBold,
      color: goldColor,
    });

    currentPage.drawText('GENESIS SPECIFICATION', {
      x: PAGE_WIDTH - MARGIN_RIGHT - 110,
      y: PAGE_HEIGHT - 35,
      size: 8,
      font: fontMono,
      color: grayColor,
    });

    currentPage.drawLine({
      start: { x: MARGIN_LEFT, y: PAGE_HEIGHT - 42 },
      end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: PAGE_HEIGHT - 42 },
      thickness: 0.75,
      color: lightBorder,
    });
  }

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

  function makeDonutSlicePath(cx, cy, rOut, rIn, startDeg, endDeg) {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;
    const steps = Math.max(12, Math.ceil((endDeg - startDeg) / 2));
    let path = '';
    // Outer arc
    for (let i = 0; i <= steps; i++) {
      const a = startRad + (i / steps) * (endRad - startRad);
      const x = cx + rOut * Math.cos(a);
      const y = cy + rOut * Math.sin(a);
      path += (i === 0 ? 'M ' : 'L ') + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
    }
    // Inner arc back
    for (let i = steps; i >= 0; i--) {
      const a = startRad + (i / steps) * (endRad - startRad);
      const x = cx + rIn * Math.cos(a);
      const y = cy + rIn * Math.sin(a);
      path += 'L ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
    }
    return path + 'Z';
  }

  // --- COVER & HEADER BLOCK (Page 1) ---
  // Top Decorative Bar
  currentPage.drawRectangle({
    x: MARGIN_LEFT,
    y: currentY - 6,
    width: CONTENT_WIDTH,
    height: 4,
    color: goldColor,
  });
  currentY -= 24;

  // Metadata Kicker
  currentPage.drawText('OFFICIAL PROTOCOL SPECIFICATION · SOLANA MAINNET L1', {
    x: MARGIN_LEFT,
    y: currentY,
    size: 9,
    font: fontMonoBold,
    color: goldColor,
  });
  currentY -= 26;

  // Main Document Title
  currentPage.drawText('BITCOIN LITE EDITION', {
    x: MARGIN_LEFT,
    y: currentY,
    size: 26,
    font: fontBold,
    color: darkColor,
  });
  currentY -= 20;

  // Subtitle
  currentPage.drawText('ARCHITECTURAL WHITE PAPER & SCARCITY SPECIFICATION', {
    x: MARGIN_LEFT,
    y: currentY,
    size: 11,
    font: fontBold,
    color: grayColor,
  });
  currentY -= 20;

  // Metadata Card / Specs Summary Box
  const summaryBoxHeight = 56;
  currentPage.drawRectangle({
    x: MARGIN_LEFT,
    y: currentY - summaryBoxHeight,
    width: CONTENT_WIDTH,
    height: summaryBoxHeight,
    color: lightBg,
    borderColor: lightBorder,
    borderWidth: 1,
  });

  const specCols = [
    { label: 'TOKEN SYMBOL', val: 'BLTE' },
    { label: 'TOTAL SUPPLY', val: '2.1M' },
    { label: 'CONSENSUS', val: 'SOLANA L1 (PoH/PoS)' },
    { label: 'AUTHORITY', val: 'PERMANENTLY REVOKED' },
  ];

  const colWidth = CONTENT_WIDTH / 4;
  specCols.forEach((col, idx) => {
    const colX = MARGIN_LEFT + idx * colWidth + 12;
    currentPage.drawText(col.label, {
      x: colX,
      y: currentY - 20,
      size: 7,
      font: fontMonoBold,
      color: goldColor,
    });
    currentPage.drawText(col.val, {
      x: colX,
      y: currentY - 38,
      size: 9,
      font: fontBold,
      color: darkColor,
    });
  });

  currentY -= (summaryBoxHeight + 25);

  // Table of Contents Box
  currentPage.drawText('TABLE OF CONTENTS', {
    x: MARGIN_LEFT,
    y: currentY,
    size: 10,
    font: fontMonoBold,
    color: goldColor,
  });
  currentY -= 14;

  const chapters = [
    {
      num: '1',
      title: 'Executive Summary & Abstract',
      paras: [
        'Bitcoin Lite Edition (BLTE) is an independent cryptographic digital asset built natively on the Solana blockchain. Inspired by the foundational paradigm of digital scarcity established by Bitcoin in 2008, Bitcoin Lite Edition explores the application of an ultra-scarce, mathematically capped asset within a modern, high-throughput, low-latency execution environment.',
        'IMPORTANT LEGAL & CONCEPTUAL DISTINCTION: Bitcoin Lite Edition is not Bitcoin, is not an official Bitcoin product, and is not affiliated with, endorsed by, or issued by Bitcoin Core, Satoshi Nakamoto, or any Bitcoin developer organizations. It operates exclusively on Solana as an SPL / Token-2022 digital asset.'
      ]
    },
    {
      num: '2',
      title: 'Foundational Philosophy: Digital Scarcity',
      paras: [
        'While Bitcoin proved that mathematical scarcity can form the basis of decentralized digital store-of-value, proof-of-work architectures face structural limitations including multi-minute block latency, volatile mempool fee spikes, and intensive thermodynamic energy consumption. Bitcoin Lite Edition adopts the principle of absolute digital scarcity—enforcing a fixed cap of 2,100,000 tokens (2.1M) with permanently revoked mint authority—while leveraging Solana\'s Proof-of-History (PoH) consensus for sub-second block finality.',
        'Scarcity in Bitcoin Lite Edition is strict and non-inflationary: there are no secondary mints, dynamic emission curves, or validator staking rewards paid through unbacked token issuance.'
      ]
    },
    {
      num: '3',
      title: 'The Genesis of Bitcoin Lite Edition',
      paras: [
        'Conceived as a modern realization of digital scarcity, BLTE was created with exactly 2,100,000 tokens (2.1M, 10x numerically scarcer than Bitcoin\'s 21,000,000 limit). At block zero, both Mint Authority and Freeze Authority were irrevocably revoked (set to null).',
        'The "Lite" paradigm represents sub-second ~400ms finality, sub-penny settlement fees (<$0.001 per transfer), and eco-friendly Proof-of-Stake consensus.'
      ]
    },
    {
      num: '4',
      title: 'Technical Distinction from Bitcoin',
      paras: [
        'Bitcoin operates on its own dedicated Layer 1 network utilizing Proof-of-Work (PoW) mining, SHA-256 hashing, UTXO transaction accounting, and 10-minute block intervals with a 21,000,000 coin cap.',
        'Bitcoin Lite Edition is an SPL token on the Solana Layer 1, utilizing Proof-of-History (PoH) and Tower BFT consensus, account-based state transitions, ~400 millisecond blocks, and a fixed cap of 2,100,000 BLTE (2.1M). It is completely independent in governance, codebase, consensus, and ledger infrastructure.'
      ]
    },
    {
      num: '5',
      title: 'Solana Execution Layer & Consensus',
      paras: [
        'Solana utilizes Proof-of-History (PoH) as a cryptographically verifiable clock before consensus. Combined with Tower BFT, this allows the network to process transactions without waiting for global block broadcast consensus before sequencing.',
        'This architecture ensures that Bitcoin Lite Edition transactions confirm within ~400ms with negligible fees (<$0.001), making micro-transfers and interactive DeFi integrations feasible without reliance on secondary routing layers.'
      ]
    },
    {
      num: '6',
      title: 'Technical Token Specifications',
      paras: [
        '• Token Name: Bitcoin Lite Edition',
        '• Token Symbol / Ticker: BLTE',
        '• Network: Solana Layer 1 Blockchain',
        '• Token Program Standard: SPL / Token-2022',
        '• Total Supply: 2,100,000 BLTE (2.1M Strict Fixed Cap)',
        '• Decimals: 9 (0.000000001 BLTE base unit resolution)',
        '• Mint Authority: Permanently Revoked (Null address)',
        '• Freeze Authority: Permanently Revoked (Null address)'
      ]
    },
    {
      num: '7',
      title: 'Tokenomics & Mathematical Allocation',
      paras: [
        'The total token supply is strictly configured at 2,100,000 tokens (2.1M), structured across three major strategic allocations only:',
        '• Fair Launch: 60% (1,260,000 BLTE) — Direct community and public fair launch distribution on Solana with borderless access.',
        '• Liquidity Pool: 20% (420,000 BLTE) — Automated market maker (AMM) DEX liquidity pool deployment on Raydium.',
        '• Staking rewards, Dev, dex listing: 20% (420,000 BLTE) — Streamflow staking yield rewards, technical development, and DEX/CEX ecosystem listings.'
      ]
    },
    {
      num: '8',
      title: 'Immutability & Revoked Authorities',
      paras: [
        'To guarantee absolute decentralized custody and eliminate counterparty risk, the SPL mint authority was permanently set to null immediately upon genesis token creation. Freeze authority is disabled.',
        'No team member, smart contract upgrade proxy, or multi-signature wallet can ever mint additional tokens or freeze user accounts.'
      ]
    },
    {
      num: '9',
      title: 'Strategic Development Roadmap',
      paras: [
        '• Phase 01: Foundation — Architecture design, White Paper publication, transparency portal, Devnet verification (Completed).',
        '• Phase 02: Launch — Mainnet token deployment, authority revocation verification, initial DEX liquidity initialization (In Progress).',
        '• Phase 03: Ecosystem — Real-time on-chain supply and holder analytics, decentralized governance tooling, Solana DeFi integrations (Upcoming).',
        '• Phase 04: Expansion — Long-term digital scarcity preservation, cross-program tooling, and open developer documentation (Upcoming).'
      ]
    },
    {
      num: '10',
      title: 'Zero-Trust On-Chain Verification',
      paras: [
        'All token parameters, supply figures, holder distributions, and authority configurations can be verified independently by any party using public Solana block explorers (such as Solscan and Solana Explorer).',
        'The code and token standards rely exclusively on open-source Solana standard libraries, guaranteeing auditability and transparent cryptographic verification.'
      ]
    }
  ];

  // Render quick TOC list
  chapters.forEach((ch) => {
    currentPage.drawText(`${ch.num}. ${ch.title}`, {
      x: MARGIN_LEFT + 8,
      y: currentY,
      size: 8.5,
      font: fontRegular,
      color: darkColor,
    });
    currentY -= 13;
  });

  currentY -= 15;
  currentPage.drawLine({
    start: { x: MARGIN_LEFT, y: currentY },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: currentY },
    thickness: 0.75,
    color: lightBorder,
  });
  currentY -= 20;

  // Render Chapters
  for (const ch of chapters) {
    checkPageBreak(50);

    // Chapter Header
    currentPage.drawText(`CHAPTER ${ch.num}`, {
      x: MARGIN_LEFT,
      y: currentY,
      size: 8.5,
      font: fontMonoBold,
      color: goldColor,
    });
    currentY -= 14;

    currentPage.drawText(`${ch.num}. ${ch.title}`, {
      x: MARGIN_LEFT,
      y: currentY,
      size: 13,
      font: fontBold,
      color: darkColor,
    });
    currentY -= 6;

    currentPage.drawLine({
      start: { x: MARGIN_LEFT, y: currentY },
      end: { x: MARGIN_LEFT + 140, y: currentY },
      thickness: 1.5,
      color: goldColor,
    });
    currentY -= 14;

    // Chapter Paragraphs
    for (const p of ch.paras) {
      const isBullet = p.startsWith('•');
      const fontSize = isBullet ? 9 : 9.5;
      const font = isBullet ? fontRegular : fontRegular;
      const pColor = isBullet ? darkColor : grayColor;
      const indent = isBullet ? 12 : 0;
      const lines = wrapText(p, CONTENT_WIDTH - indent, font, fontSize);

      checkPageBreak(lines.length * 14 + 10);

      for (const line of lines) {
        currentPage.drawText(line, {
          x: MARGIN_LEFT + indent,
          y: currentY,
          size: fontSize,
          font: font,
          color: pColor,
        });
        currentY -= 13.5;
      }
      currentY -= 5;
    }

    // If Chapter 7, render dedicated Circular Tokenomics Design (Vector Donut Chart & 3-Section Allocation)
    if (ch.num === '7') {
      const tokenomicsBoxHeight = 158;
      checkPageBreak(tokenomicsBoxHeight + 20);

      const boxY = currentY - tokenomicsBoxHeight;
      currentPage.drawRectangle({
        x: MARGIN_LEFT,
        y: boxY,
        width: CONTENT_WIDTH,
        height: tokenomicsBoxHeight,
        color: lightBg,
        borderColor: lightBorder,
        borderWidth: 1,
      });

      // Header inside box
      currentPage.drawText('CIRCULAR TOKENOMIC ARCHITECTURE · 100% INVIOLABLE GENESIS DISTRIBUTION', {
        x: MARGIN_LEFT + 12,
        y: currentY - 16,
        size: 7.5,
        font: fontMonoBold,
        color: goldColor,
      });

      currentPage.drawLine({
        start: { x: MARGIN_LEFT + 12, y: currentY - 22 },
        end: { x: MARGIN_LEFT + CONTENT_WIDTH - 12, y: currentY - 22 },
        thickness: 0.5,
        color: lightBorder,
      });

      // --- LEFT SIDE: Vector Circle Donut Chart ---
      const chartCenterX = MARGIN_LEFT + 75;
      const chartCenterY = boxY + 70;
      const rOuter = 46;
      const rInner = 28;

      // Slice 1: 60% Fair Launch (-90 deg to 126 deg) = 216 deg
      const pathFairLaunch = makeDonutSlicePath(chartCenterX, chartCenterY, rOuter, rInner, -90, 126);
      currentPage.drawSvgPath(pathFairLaunch, { color: rgb(0.85, 0.47, 0.02) }); // #D97706 Warm Amber Gold

      // Slice 2: 20% Liquidity Pool (126 deg to 198 deg) = 72 deg
      const pathLiquidity = makeDonutSlicePath(chartCenterX, chartCenterY, rOuter, rInner, 126, 198);
      currentPage.drawSvgPath(pathLiquidity, { color: rgb(0.92, 0.70, 0.03) }); // #EAB308 Bright Gold

      // Slice 3: 20% Staking rewards, Dev, dex listing (198 deg to 270 deg) = 72 deg
      const pathStakingDev = makeDonutSlicePath(chartCenterX, chartCenterY, rOuter, rInner, 198, 270);
      currentPage.drawSvgPath(pathStakingDev, { color: rgb(0.72, 0.40, 0.11) }); // #B8661B Bronze Copper

      // Center disc inside donut
      currentPage.drawCircle({
        x: chartCenterX,
        y: chartCenterY,
        size: rInner - 1,
        color: rgb(1, 1, 1),
        borderColor: lightBorder,
        borderWidth: 0.5,
      });

      // Center labels
      const supplyMainStr = '2.1M';
      const supplyMainWidth = fontBold.widthOfTextAtSize(supplyMainStr, 13);
      currentPage.drawText(supplyMainStr, {
        x: chartCenterX - supplyMainWidth / 2,
        y: chartCenterY + 4,
        size: 13,
        font: fontBold,
        color: darkColor,
      });

      const tokenSymStr = 'BLTE';
      const tokenSymWidth = fontMonoBold.widthOfTextAtSize(tokenSymStr, 7.5);
      currentPage.drawText(tokenSymStr, {
        x: chartCenterX - tokenSymWidth / 2,
        y: chartCenterY - 5,
        size: 7.5,
        font: fontMonoBold,
        color: goldColor,
      });

      const subCapStr = 'TOTAL CAP';
      const subCapWidth = fontMono.widthOfTextAtSize(subCapStr, 5.5);
      currentPage.drawText(subCapStr, {
        x: chartCenterX - subCapWidth / 2,
        y: chartCenterY - 13,
        size: 5.5,
        font: fontMono,
        color: grayColor,
      });

      // --- RIGHT SIDE: Allocation Breakdown Rows ---
      const legendX = MARGIN_LEFT + 150;
      const legendWidth = CONTENT_WIDTH - 162;

      const allocItems = [
        {
          pct: '60%',
          title: 'Fair Launch',
          amount: '1,260,000 BLTE',
          desc: 'Direct community and public fair launch distribution on Solana with borderless access.',
          color: rgb(0.85, 0.47, 0.02),
        },
        {
          pct: '20%',
          title: 'Liquidity Pool',
          amount: '420,000 BLTE',
          desc: 'Automated market maker (AMM) DEX liquidity pool deployment on Raydium.',
          color: rgb(0.92, 0.70, 0.03),
        },
        {
          pct: '20%',
          title: 'Staking rewards, Dev, dex listing',
          amount: '420,000 BLTE',
          desc: 'Streamflow staking yield rewards, technical development, and DEX/CEX ecosystem listings.',
          color: rgb(0.72, 0.40, 0.11),
        },
      ];

      let itemY = currentY - 36;
      allocItems.forEach((item) => {
        // Colored badge
        currentPage.drawRectangle({
          x: legendX,
          y: itemY - 2,
          width: 26,
          height: 14,
          color: item.color,
        });

        const pctWidth = fontMonoBold.widthOfTextAtSize(item.pct, 8);
        currentPage.drawText(item.pct, {
          x: legendX + (26 - pctWidth) / 2,
          y: itemY + 2,
          size: 8,
          font: fontMonoBold,
          color: rgb(1, 1, 1),
        });

        // Title and Amount
        currentPage.drawText(item.title, {
          x: legendX + 32,
          y: itemY + 3,
          size: 9,
          font: fontBold,
          color: darkColor,
        });

        const amountStr = `(${item.amount})`;
        const amountWidth = fontMono.widthOfTextAtSize(amountStr, 7.5);
        currentPage.drawText(amountStr, {
          x: legendX + legendWidth - amountWidth,
          y: itemY + 3,
          size: 7.5,
          font: fontMono,
          color: goldColor,
        });

        // Description line
        currentPage.drawText(item.desc, {
          x: legendX + 32,
          y: itemY - 8,
          size: 7.5,
          font: fontRegular,
          color: grayColor,
        });

        itemY -= 32;
      });

      // Bottom Integrity Note
      currentPage.drawLine({
        start: { x: MARGIN_LEFT + 12, y: boxY + 20 },
        end: { x: MARGIN_LEFT + CONTENT_WIDTH - 12, y: boxY + 20 },
        thickness: 0.5,
        color: lightBorder,
      });

      currentPage.drawText('VERIFIED: 100% Mathematical Integrity · 2,100,000 / 2,100,000 BLTE Accounted For · Mint Authority Revoked', {
        x: MARGIN_LEFT + 12,
        y: boxY + 8,
        size: 7,
        font: fontMonoBold,
        color: rgb(0.09, 0.4, 0.2), // forest green
      });

      currentY -= (tokenomicsBoxHeight + 16);
    }

    currentY -= 10;
  }

  // Legal Disclaimer Box at the End
  checkPageBreak(110);
  const disclaimerBoxHeight = 85;
  currentPage.drawRectangle({
    x: MARGIN_LEFT,
    y: currentY - disclaimerBoxHeight,
    width: CONTENT_WIDTH,
    height: disclaimerBoxHeight,
    color: lightBg,
    borderColor: lightBorder,
    borderWidth: 1,
  });

  currentPage.drawText('LEGAL DISCLAIMER & NON-AFFILIATION DISCLOSURE', {
    x: MARGIN_LEFT + 12,
    y: currentY - 18,
    size: 8.5,
    font: fontMonoBold,
    color: goldColor,
  });

  const disclaimerText = 'Bitcoin Lite Edition is an independent Solana cryptographic token and is NOT affiliated with, endorsed by, or a fork of Bitcoin Core, Satoshi Nakamoto, or any Bitcoin developer organizations. This white paper is published for informational and architectural description purposes only and does not constitute financial, investment, or legal advice. Digital assets involve substantial market risk and volatility. Always verify on-chain contracts independently on Solscan.';
  const disclaimerLines = wrapText(disclaimerText, CONTENT_WIDTH - 24, fontOblique, 7.5);
  let discY = currentY - 32;
  for (const dLine of disclaimerLines) {
    currentPage.drawText(dLine, {
      x: MARGIN_LEFT + 12,
      y: discY,
      size: 7.5,
      font: fontOblique,
      color: grayColor,
    });
    discY -= 10.5;
  }

  currentY -= (disclaimerBoxHeight + 20);

  // Add Page Numbers and Footers to all pages
  const totalPages = pages.length;
  pages.forEach((p, idx) => {
    const pageNum = idx + 1;
    // Footer line
    p.drawLine({
      start: { x: MARGIN_LEFT, y: MARGIN_BOTTOM },
      end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: MARGIN_BOTTOM },
      thickness: 0.75,
      color: lightBorder,
    });

    p.drawText(`Bitcoin Lite Edition (BLTE) · Architectural White Paper · Genesis Release`, {
      x: MARGIN_LEFT,
      y: MARGIN_BOTTOM - 14,
      size: 7.5,
      font: fontMono,
      color: grayColor,
    });

    const pageStr = `Page ${pageNum} of ${totalPages}`;
    const pageStrWidth = fontMono.widthOfTextAtSize(pageStr, 7.5);
    p.drawText(pageStr, {
      x: PAGE_WIDTH - MARGIN_RIGHT - pageStrWidth,
      y: MARGIN_BOTTOM - 14,
      size: 7.5,
      font: fontMonoBold,
      color: goldColor,
    });
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/bitcoin-lite-edition-whitepaper.pdf');
  fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
  console.log(`Generated official whitepaper PDF: ${outputPath} (${pdfBytes.length} bytes, ${totalPages} pages)`);
}

generateWhitepaperPdf().catch(err => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
