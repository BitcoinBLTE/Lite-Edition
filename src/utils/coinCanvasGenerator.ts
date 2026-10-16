/**
 * Shared High-Fidelity Bitcoin Lite Edition Coin Texture & Static Canvas Generator
 * Ensures 100% pixel-perfect visual parity between the 3D rotating coin and the stable coin display.
 */

export function drawCoinFront(ctx: CanvasRenderingContext2D, size: number = 2048): void {
  const scale = size / 2048;
  const c = size / 2;
  const outerR = 980 * scale;
  const innerR = 770 * scale;

  ctx.clearRect(0, 0, size, size);

  // --- Outer Milled Gold Edge Ring ---
  const goldGrad = ctx.createRadialGradient(
    c - 160 * scale,
    c - 240 * scale,
    100 * scale,
    c,
    c,
    outerR
  );
  goldGrad.addColorStop(0, '#FFFBEB');
  goldGrad.addColorStop(0.2, '#FDE047');
  goldGrad.addColorStop(0.5, '#F59E0B');
  goldGrad.addColorStop(0.8, '#D97706');
  goldGrad.addColorStop(1, '#78350F');

  ctx.fillStyle = goldGrad;
  ctx.beginPath();
  ctx.arc(c, c, outerR, 0, Math.PI * 2);
  ctx.fill();

  // Outer reeded fine tick ridges around rim (180 milled notches)
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = Math.max(1.5, 4 * scale);
  for (let i = 0; i < 180; i++) {
    const angle = (i * Math.PI * 2) / 180;
    const x1 = c + Math.cos(angle) * (outerR - 26 * scale);
    const y1 = c + Math.sin(angle) * (outerR - 26 * scale);
    const x2 = c + Math.cos(angle) * outerR;
    const y2 = c + Math.sin(angle) * outerR;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Beveled Gold Outer Rings
  ctx.strokeStyle = '#FEF3C7';
  ctx.lineWidth = Math.max(2, 14 * scale);
  ctx.beginPath();
  ctx.arc(c, c, outerR - 35 * scale, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#92400E';
  ctx.lineWidth = Math.max(1.5, 10 * scale);
  ctx.beginPath();
  ctx.arc(c, c, outerR - 45 * scale, 0, Math.PI * 2);
  ctx.stroke();

  // --- Dark Inner Circular Surface ---
  const darkGrad = ctx.createRadialGradient(
    c,
    c - 120 * scale,
    80 * scale,
    c,
    c,
    innerR
  );
  darkGrad.addColorStop(0, '#1c1c20');
  darkGrad.addColorStop(0.45, '#121215');
  darkGrad.addColorStop(1, '#09090b');

  ctx.fillStyle = darkGrad;
  ctx.beginPath();
  ctx.arc(c, c, innerR, 0, Math.PI * 2);
  ctx.fill();

  // Inner gold bevel ring
  const innerBevel = ctx.createLinearGradient(0, c - innerR, 0, c + innerR);
  innerBevel.addColorStop(0, '#FDE68A');
  innerBevel.addColorStop(0.5, '#D97706');
  innerBevel.addColorStop(1, '#78350F');
  ctx.strokeStyle = innerBevel;
  ctx.lineWidth = Math.max(2, 16 * scale);
  ctx.beginPath();
  ctx.arc(c, c, innerR - 8 * scale, 0, Math.PI * 2);
  ctx.stroke();

  // Concentric minted micro-grooves
  ctx.lineWidth = Math.max(0.5, 1 * scale);
  for (let r = 240 * scale; r < innerR - 20 * scale; r += 24 * scale) {
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.04)';
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // --- Central Bitcoin ₿ Emblem ---
  const symCx = c;
  const symCy = c - 40 * scale;

  const symbolGrad = ctx.createLinearGradient(
    symCx - 200 * scale,
    symCy - 350 * scale,
    symCx + 200 * scale,
    symCy + 350 * scale
  );
  symbolGrad.addColorStop(0, '#FFFDF0');
  symbolGrad.addColorStop(0.2, '#FDE047');
  symbolGrad.addColorStop(0.5, '#F59E0B');
  symbolGrad.addColorStop(0.8, '#D97706');
  symbolGrad.addColorStop(1, '#92400E');

  ctx.save();
  // Drop shadow for 3D minted relief
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 45 * scale;
  ctx.shadowOffsetY = 28 * scale;

  // 1. Vector structural spine and ticks
  ctx.fillStyle = symbolGrad;
  const tickW = 42 * scale;
  const tickH = 85 * scale;
  // Top ticks
  ctx.fillRect(symCx - 55 * scale, symCy - 370 * scale, tickW, tickH);
  ctx.fillRect(symCx + 45 * scale, symCy - 370 * scale, tickW, tickH);
  // Bottom ticks
  ctx.fillRect(symCx - 55 * scale, symCy + 290 * scale, tickW, tickH);
  ctx.fillRect(symCx + 45 * scale, symCy + 290 * scale, tickW, tickH);
  // Main vertical spine
  ctx.fillRect(symCx - 170 * scale, symCy - 300 * scale, 110 * scale, 600 * scale);

  // Upper lobe
  ctx.beginPath();
  ctx.moveTo(symCx - 70 * scale, symCy - 300 * scale);
  ctx.lineTo(symCx + 70 * scale, symCy - 300 * scale);
  ctx.bezierCurveTo(
    symCx + 210 * scale,
    symCy - 300 * scale,
    symCx + 210 * scale,
    symCy - 20 * scale,
    symCx + 70 * scale,
    symCy - 20 * scale
  );
  ctx.lineTo(symCx - 70 * scale, symCy - 20 * scale);
  ctx.closePath();
  ctx.fill();

  // Lower lobe (slightly wider)
  ctx.beginPath();
  ctx.moveTo(symCx - 70 * scale, symCy - 20 * scale);
  ctx.lineTo(symCx + 95 * scale, symCy - 20 * scale);
  ctx.bezierCurveTo(
    symCx + 250 * scale,
    symCy - 20 * scale,
    symCx + 250 * scale,
    symCy + 300 * scale,
    symCx + 95 * scale,
    symCy + 300 * scale
  );
  ctx.lineTo(symCx - 70 * scale, symCy + 300 * scale);
  ctx.closePath();
  ctx.fill();

  // Dark cutouts
  ctx.fillStyle = '#121215';
  // Upper cutout
  ctx.beginPath();
  ctx.moveTo(symCx - 60 * scale, symCy - 215 * scale);
  ctx.lineTo(symCx + 55 * scale, symCy - 215 * scale);
  ctx.bezierCurveTo(
    symCx + 125 * scale,
    symCy - 215 * scale,
    symCx + 125 * scale,
    symCy - 105 * scale,
    symCx + 55 * scale,
    symCy - 105 * scale
  );
  ctx.lineTo(symCx - 60 * scale, symCy - 105 * scale);
  ctx.closePath();
  ctx.fill();

  // Lower cutout
  ctx.beginPath();
  ctx.moveTo(symCx - 60 * scale, symCy + 75 * scale);
  ctx.lineTo(symCx + 75 * scale, symCy + 75 * scale);
  ctx.bezierCurveTo(
    symCx + 155 * scale,
    symCy + 75 * scale,
    symCx + 155 * scale,
    symCy + 205 * scale,
    symCx + 75 * scale,
    symCy + 205 * scale
  );
  ctx.lineTo(symCx - 60 * scale, symCy + 205 * scale);
  ctx.closePath();
  ctx.fill();

  // High-precision font overlay
  ctx.fillStyle = symbolGrad;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(800 * scale)}px "Inter", "Cinzel", "Arial", "Segoe UI Symbol", sans-serif`;
  ctx.fillText('₿', symCx, symCy);
  ctx.restore();

  // Embossed Bevel Highlight Stroke
  ctx.strokeStyle = '#FEF9C3';
  ctx.lineWidth = Math.max(1.5, 8 * scale);
  ctx.font = `bold ${Math.round(800 * scale)}px "Inter", "Cinzel", "Arial", "Segoe UI Symbol", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeText('₿', symCx - 3 * scale, symCy - 3 * scale);

  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = Math.max(2, 10 * scale);
  ctx.strokeText('₿', symCx + 3 * scale, symCy + 3 * scale);

  // --- Top Curved Text: "$BLTE" ---
  const topSymbolText = '$BLTE';
  const topSymbolRadius = 880 * scale;
  const topCharCount = topSymbolText.length;
  const topSymbolStartAngle = -Math.PI * 0.58;
  const topSymbolEndAngle = -Math.PI * 0.42;
  const topSymbolAngleStep = (topSymbolEndAngle - topSymbolStartAngle) / (topCharCount - 1);

  ctx.save();
  ctx.font = `900 ${Math.round(110 * scale)}px "Outfit", "Inter", "Arial Black", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < topCharCount; i++) {
    const char = topSymbolText[i];
    const angle = topSymbolStartAngle + i * topSymbolAngleStep;
    const x = c + Math.cos(angle) * topSymbolRadius;
    const y = c + Math.sin(angle) * topSymbolRadius;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);

    // Deep drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 14 * scale;
    ctx.shadowOffsetY = 6 * scale;

    // Dark defining bevel stroke
    ctx.strokeStyle = '#180B02';
    ctx.lineWidth = Math.max(2, 10 * scale);
    ctx.lineJoin = 'round';
    ctx.strokeText(char, 0, 0);

    // Bright luminous gold-to-white gradient
    const charGrad = ctx.createLinearGradient(0, -55 * scale, 0, 55 * scale);
    charGrad.addColorStop(0, '#FFFFFF');
    charGrad.addColorStop(0.25, '#FEF9C3');
    charGrad.addColorStop(0.65, '#FDE047');
    charGrad.addColorStop(1, '#D97706');
    ctx.fillStyle = charGrad;
    ctx.fillText(char, 0, 0);

    // Crisp inner highlight stroke
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#FFFBEB';
    ctx.lineWidth = Math.max(1, 2.5 * scale);
    ctx.strokeText(char, 0, -1 * scale);

    ctx.restore();
  }
  ctx.restore();

  // --- Bottom Curved Text: "BITCOIN LITE EDITION" ---
  const bottomText = 'BITCOIN LITE EDITION';
  const textRadius = 880 * scale;
  const charCount = bottomText.length;
  const startAngle = Math.PI * 0.81;
  const endAngle = Math.PI * 0.19;
  const angleStep = (startAngle - endAngle) / (charCount - 1);

  ctx.save();
  ctx.font = `900 ${Math.round(92 * scale)}px "Inter", "Arial Black", "Cinzel", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < charCount; i++) {
    const char = bottomText[i];
    const angle = startAngle - i * angleStep;
    const x = c + Math.cos(angle) * textRadius;
    const y = c + Math.sin(angle) * textRadius;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle - Math.PI / 2);

    // Heavy dark under-shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 12 * scale;
    ctx.shadowOffsetY = 6 * scale;

    // Dark defining bevel stroke
    ctx.strokeStyle = '#180B02';
    ctx.lineWidth = Math.max(2, 10 * scale);
    ctx.lineJoin = 'round';
    ctx.strokeText(char, 0, 0);

    // Bright luminous gold-to-white gradient
    const charGrad = ctx.createLinearGradient(0, -46 * scale, 0, 46 * scale);
    charGrad.addColorStop(0, '#FFFFFF');
    charGrad.addColorStop(0.25, '#FEF9C3');
    charGrad.addColorStop(0.65, '#FDE047');
    charGrad.addColorStop(1, '#D97706');
    ctx.fillStyle = charGrad;
    ctx.fillText(char, 0, 0);

    // Crisp inner highlight stroke
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#FFFBEB';
    ctx.lineWidth = Math.max(1, 2.5 * scale);
    ctx.strokeText(char, 0, -1 * scale);

    ctx.restore();
  }
  ctx.restore();
}

let cachedFrontCanvas: HTMLCanvasElement | null = null;
let cachedDataUrl: string | null = null;

export function getCoinFrontCanvas(size: number = 2048): HTMLCanvasElement {
  if (size === 2048 && cachedFrontCanvas) {
    return cachedFrontCanvas;
  }
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    drawCoinFront(ctx, size);
  }
  if (size === 2048) {
    cachedFrontCanvas = canvas;
  }
  return canvas;
}

export function getCoinFrontDataUrl(size: number = 1024): string {
  if (cachedDataUrl) return cachedDataUrl;
  if (typeof document === 'undefined') return '';
  const canvas = getCoinFrontCanvas(size);
  cachedDataUrl = canvas.toDataURL('image/png');
  return cachedDataUrl;
}
