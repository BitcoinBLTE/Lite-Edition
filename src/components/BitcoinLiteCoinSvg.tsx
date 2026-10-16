import React, { useEffect, useRef, useState } from 'react';
import { drawCoinFront, getCoinFrontDataUrl } from '../utils/coinCanvasGenerator';

interface BitcoinLiteCoinProps {
  size?: number | string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Exact Front-Side Coin Renderer
 * Matches the front face of the 3D rotating coin 100% pixel-for-pixel with zero difference.
 */
export const BitcoinLiteCoinSvg: React.FC<BitcoinLiteCoinProps> = ({
  size = '100%',
  className = '',
  ariaLabel = 'Bitcoin Lite Edition Minted Front Face',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>(() =>
    typeof document !== 'undefined' ? getCoinFrontDataUrl(1024) : ''
  );

  useEffect(() => {
    if (!dataUrl && typeof document !== 'undefined') {
      const url = getCoinFrontDataUrl(1024);
      if (url) {
        setDataUrl(url);
      }
    }

    // Direct canvas high-DPI rendering for ultra-sharpness
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 2, 2) : 2;
      const displaySize = typeof size === 'number' ? size : 512;
      canvas.width = displaySize * dpr;
      canvas.height = displaySize * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        drawCoinFront(ctx, displaySize);
      }
    }
  }, [size]);

  const styleDimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none aspect-square shrink-0 ${className}`}
      style={{ width: styleDimension, height: styleDimension }}
      role="img"
      aria-label={ariaLabel}
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={ariaLabel}
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_8px_24px_rgba(245,158,11,0.22)]"
          loading="eager"
          decoding="sync"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
        />
      )}
    </div>
  );
};

export const BitcoinLiteCoin = BitcoinLiteCoinSvg;
