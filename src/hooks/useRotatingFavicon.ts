import { useEffect } from 'react';

/**
 * useRotatingFavicon:
 * Animates the browser tab favicon with a continuously rotating 3D Bitcoin Lite Edition coin.
 * Uses an offscreen 32x32 canvas rendered at ~12fps for silky movement with negligible CPU impact.
 */
export function useRotatingFavicon() {
  useEffect(() => {
    // Only run in browser environments
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const speed = 0.08; // smooth rotation speed
    let intervalId: number;

    const renderFavicon = () => {
      ctx.clearRect(0, 0, 32, 32);

      const cx = 16;
      const cy = 16;
      const r = 14;
      const cosVal = Math.cos(angle);
      const isFront = cosVal >= 0;
      const scaleX = Math.max(0.12, Math.abs(cosVal));

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scaleX, 1);

      // Gold outer ring / edge
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = '#D97706';
      ctx.fill();

      // Coin face
      ctx.beginPath();
      ctx.arc(0, 0, r - 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#141416';
      ctx.fill();

      // Embossed gold inner rim
      ctx.beginPath();
      ctx.arc(0, 0, r - 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Content
      if (isFront) {
        // Front: ₿ Symbol
        ctx.fillStyle = '#FDE047';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('₿', 0, 0.5);
      } else {
        // Back: 420K
        ctx.fillStyle = '#F59E0B';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('420K', 0, 0);
      }

      ctx.restore();

      // Update link href
      if (link) {
        link.href = canvas.toDataURL('image/png');
      }

      angle += speed;
    };

    intervalId = window.setInterval(renderFavicon, 80);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);
}
