/**
 * Shared High-Fidelity Bitcoin Lite Edition Coin Texture & Static Canvas Generator
 * Ensures 100% pixel-perfect visual parity between the 3D rotating coin and the stable coin display.
 */

export function drawCoinFront(e: CanvasRenderingContext2D, t: number = 2048): void {
  const n = t / 2048;
  const r = t / 2;
  const i = 980 * n;
  const a = 770 * n;

  e.clearRect(0, 0, t, t);

  const o = e.createRadialGradient(r - 160 * n, r - 240 * n, 100 * n, r, r, i);
  o.addColorStop(0, '#FFFBEB');
  o.addColorStop(0.2, '#FDE047');
  o.addColorStop(0.5, '#F59E0B');
  o.addColorStop(0.8, '#D97706');
  o.addColorStop(1, '#78350F');

  e.fillStyle = o;
  e.beginPath();
  e.arc(r, r, i, 0, Math.PI * 2);
  e.fill();

  e.strokeStyle = '#78350F';
  e.lineWidth = Math.max(1.5, 4 * n);
  for (let t = 0; t < 180; t++) {
    const a = (t * Math.PI * 2) / 180;
    const o = r + Math.cos(a) * (i - 26 * n);
    const s = r + Math.sin(a) * (i - 26 * n);
    const c = r + Math.cos(a) * i;
    const l = r + Math.sin(a) * i;
    e.beginPath();
    e.moveTo(o, s);
    e.lineTo(c, l);
    e.stroke();
  }

  e.strokeStyle = '#FEF3C7';
  e.lineWidth = Math.max(2, 14 * n);
  e.beginPath();
  e.arc(r, r, i - 35 * n, 0, Math.PI * 2);
  e.stroke();

  e.strokeStyle = '#92400E';
  e.lineWidth = Math.max(1.5, 10 * n);
  e.beginPath();
  e.arc(r, r, i - 45 * n, 0, Math.PI * 2);
  e.stroke();

  const s = e.createRadialGradient(r, r - 120 * n, 80 * n, r, r, a);
  s.addColorStop(0, '#1c1c20');
  s.addColorStop(0.45, '#121215');
  s.addColorStop(1, '#09090b');

  e.fillStyle = s;
  e.beginPath();
  e.arc(r, r, a, 0, Math.PI * 2);
  e.fill();

  const c = e.createLinearGradient(0, r - a, 0, r + a);
  c.addColorStop(0, '#FDE68A');
  c.addColorStop(0.5, '#D97706');
  c.addColorStop(1, '#78350F');

  e.strokeStyle = c;
  e.lineWidth = Math.max(2, 16 * n);
  e.beginPath();
  e.arc(r, r, a - 8 * n, 0, Math.PI * 2);
  e.stroke();

  e.lineWidth = Math.max(0.5, 1 * n);
  for (let t = 240 * n; t < a - 20 * n; t += 24 * n) {
    e.strokeStyle = 'rgba(245, 158, 11, 0.04)';
    e.beginPath();
    e.arc(r, r, t, 0, Math.PI * 2);
    e.stroke();
  }

  const l = r;
  const u = r - 40 * n;
  const d = e.createLinearGradient(l - 200 * n, u - 350 * n, l + 200 * n, u + 350 * n);
  d.addColorStop(0, '#FFFDF0');
  d.addColorStop(0.2, '#FDE047');
  d.addColorStop(0.5, '#F59E0B');
  d.addColorStop(0.8, '#D97706');
  d.addColorStop(1, '#92400E');

  e.save();
  e.shadowColor = 'rgba(0, 0, 0, 0.9)';
  e.shadowBlur = 45 * n;
  e.shadowOffsetY = 28 * n;
  e.fillStyle = d;

  const f = 42 * n;
  const p = 85 * n;
  e.fillRect(l - 55 * n, u - 370 * n, f, p);
  e.fillRect(l + 45 * n, u - 370 * n, f, p);
  e.fillRect(l - 55 * n, u + 290 * n, f, p);
  e.fillRect(l + 45 * n, u + 290 * n, f, p);
  e.fillRect(l - 170 * n, u - 300 * n, 110 * n, 600 * n);

  e.beginPath();
  e.moveTo(l - 70 * n, u - 300 * n);
  e.lineTo(l + 70 * n, u - 300 * n);
  e.bezierCurveTo(l + 210 * n, u - 300 * n, l + 210 * n, u - 20 * n, l + 70 * n, u - 20 * n);
  e.lineTo(l - 70 * n, u - 20 * n);
  e.closePath();
  e.fill();

  e.beginPath();
  e.moveTo(l - 70 * n, u - 20 * n);
  e.lineTo(l + 95 * n, u - 20 * n);
  e.bezierCurveTo(l + 250 * n, u - 20 * n, l + 250 * n, u + 300 * n, l + 95 * n, u + 300 * n);
  e.lineTo(l - 70 * n, u + 300 * n);
  e.closePath();
  e.fill();

  e.fillStyle = '#121215';
  e.beginPath();
  e.moveTo(l - 60 * n, u - 215 * n);
  e.lineTo(l + 55 * n, u - 215 * n);
  e.bezierCurveTo(l + 125 * n, u - 215 * n, l + 125 * n, u - 105 * n, l + 55 * n, u - 105 * n);
  e.lineTo(l - 60 * n, u - 105 * n);
  e.closePath();
  e.fill();

  e.beginPath();
  e.moveTo(l - 60 * n, u + 75 * n);
  e.lineTo(l + 75 * n, u + 75 * n);
  e.bezierCurveTo(l + 155 * n, u + 75 * n, l + 155 * n, u + 205 * n, l + 75 * n, u + 205 * n);
  e.lineTo(l - 60 * n, u + 205 * n);
  e.closePath();
  e.fill();

  e.fillStyle = d;
  e.textAlign = 'center';
  e.textBaseline = 'middle';
  e.font = `bold ${Math.round(800 * n)}px "Inter", "Cinzel", "Arial", "Segoe UI Symbol", sans-serif`;
  e.fillText('₿', l, u);
  e.restore();

  e.strokeStyle = '#FEF9C3';
  e.lineWidth = Math.max(1.5, 8 * n);
  e.font = `bold ${Math.round(800 * n)}px "Inter", "Cinzel", "Arial", "Segoe UI Symbol", sans-serif`;
  e.textAlign = 'center';
  e.textBaseline = 'middle';
  e.strokeText('₿', l - 3 * n, u - 3 * n);

  e.strokeStyle = '#78350F';
  e.lineWidth = Math.max(2, 10 * n);
  e.strokeText('₿', l + 3 * n, u + 3 * n);

  const m = 880 * n;
  const h = -Math.PI * 0.58;
  const g = (-Math.PI * 0.42 - h) / 4;

  e.save();
  e.font = `900 ${Math.round(110 * n)}px "Outfit", "Inter", "Arial Black", sans-serif`;
  e.textAlign = 'center';
  e.textBaseline = 'middle';
  for (let t = 0; t < 5; t++) {
    const i = '$BLTE'[t];
    const a = h + t * g;
    const o = r + Math.cos(a) * m;
    const s = r + Math.sin(a) * m;
    e.save();
    e.translate(o, s);
    e.rotate(a + Math.PI / 2);
    e.shadowColor = 'rgba(0, 0, 0, 0.95)';
    e.shadowBlur = 14 * n;
    e.shadowOffsetY = 6 * n;
    e.strokeStyle = '#180B02';
    e.lineWidth = Math.max(2, 10 * n);
    e.lineJoin = 'round';
    e.strokeText(i, 0, 0);

    const c = e.createLinearGradient(0, -55 * n, 0, 55 * n);
    c.addColorStop(0, '#FFFFFF');
    c.addColorStop(0.25, '#FEF9C3');
    c.addColorStop(0.65, '#FDE047');
    c.addColorStop(1, '#D97706');
    e.fillStyle = c;
    e.fillText(i, 0, 0);

    e.shadowColor = 'transparent';
    e.strokeStyle = '#FFFBEB';
    e.lineWidth = Math.max(1, 2.5 * n);
    e.strokeText(i, 0, -1 * n);
    e.restore();
  }
  e.restore();

  const _ = 880 * n;
  const v = Math.PI * 0.81;
  const y = (v - Math.PI * 0.19) / 19;

  e.save();
  e.font = `900 ${Math.round(92 * n)}px "Inter", "Arial Black", "Cinzel", sans-serif`;
  e.textAlign = 'center';
  e.textBaseline = 'middle';
  for (let t = 0; t < 20; t++) {
    const i = 'BITCOIN LITE EDITION'[t];
    const a = v - t * y;
    const o = r + Math.cos(a) * _;
    const s = r + Math.sin(a) * _;
    e.save();
    e.translate(o, s);
    e.rotate(a - Math.PI / 2);
    e.shadowColor = 'rgba(0, 0, 0, 0.95)';
    e.shadowBlur = 12 * n;
    e.shadowOffsetY = 6 * n;
    e.strokeStyle = '#180B02';
    e.lineWidth = Math.max(2, 10 * n);
    e.lineJoin = 'round';
    e.strokeText(i, 0, 0);

    const c = e.createLinearGradient(0, -46 * n, 0, 46 * n);
    c.addColorStop(0, '#FFFFFF');
    c.addColorStop(0.25, '#FEF9C3');
    c.addColorStop(0.65, '#FDE047');
    c.addColorStop(1, '#D97706');
    e.fillStyle = c;
    e.fillText(i, 0, 0);

    e.shadowColor = 'transparent';
    e.strokeStyle = '#FFFBEB';
    e.lineWidth = Math.max(1, 2.5 * n);
    e.strokeText(i, 0, -1 * n);
    e.restore();
  }
  e.restore();
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
  cachedDataUrl = getCoinFrontCanvas(size).toDataURL('image/png');
  return cachedDataUrl;
}
