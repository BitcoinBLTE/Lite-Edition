import React from 'react';

interface RotatingCoinLogoProps {
  size?: number;
  className?: string;
  speedSeconds?: number;
  ariaLabel?: string;
}

export const RotatingCoinLogo: React.FC<RotatingCoinLogoProps> = ({
  size = 28,
  className = '',
  speedSeconds = 8,
  ariaLabel = 'Bitcoin Lite Edition Rotating Logo'
}) => {
  const thickness = Math.max(2, Math.round(size * 0.08));

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        perspective: size * 5,
      }}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          animation: `spinCoin3D ${speedSeconds}s linear infinite`,
        }}
      >
        {/* FRONT FACE (0°): Golden Rim + Bitcoin ₿ Symbol */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center shadow-sm"
          style={{
            transform: `translateZ(${thickness / 2}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'radial-gradient(circle at 35% 35%, #2a2a30 0%, #16161a 60%, #0d0d10 100%)',
            border: `${Math.max(1.5, size * 0.06)}px solid #F59E0B`,
            boxShadow: 'inset 0 0 4px rgba(254, 243, 199, 0.4), 0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {/* Inner fine milled circle */}
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              padding: Math.max(1, size * 0.04),
              border: `${Math.max(0.75, size * 0.025)}px dashed rgba(245, 158, 11, 0.5)`,
            }}
          >
            <span
              className="font-bold leading-none select-none text-transparent bg-clip-text"
              style={{
                fontSize: size * 0.58,
                backgroundImage: 'linear-gradient(135deg, #FEF3C7 0%, #F59E0B 50%, #B45309 100%)',
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.8))',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              ₿
            </span>
          </div>
        </div>

        {/* BACK FACE (180°): Golden Rim + 2.1M BLTE */}
        <div
          className="absolute inset-0 rounded-full flex flex-col items-center justify-center shadow-sm"
          style={{
            transform: `rotateY(180deg) translateZ(${thickness / 2}px)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'radial-gradient(circle at 35% 35%, #2a2a30 0%, #16161a 60%, #0d0d10 100%)',
            border: `${Math.max(1.5, size * 0.06)}px solid #F59E0B`,
            boxShadow: 'inset 0 0 4px rgba(254, 243, 199, 0.4), 0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          <div
            className="w-full h-full rounded-full flex flex-col items-center justify-center text-center"
            style={{
              padding: Math.max(1, size * 0.03),
              border: `${Math.max(0.75, size * 0.025)}px dashed rgba(245, 158, 11, 0.5)`,
            }}
          >
            <span
              className="font-extrabold leading-none text-transparent bg-clip-text"
              style={{
                fontSize: size * 0.28,
                backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #FDE047 30%, #F59E0B 70%, #92400E 100%)',
                fontFamily: 'JetBrains Mono, monospace',
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.8))',
              }}
            >
              2.1M
            </span>
            <span
              className="font-bold leading-none tracking-tighter text-amber-400"
              style={{
                fontSize: Math.max(6, size * 0.2),
                marginTop: size * 0.04,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '-0.02em',
              }}
            >
              BLTE
            </span>
          </div>
        </div>

        {/* 3D EDGE RING LAYERS (Physical Milled Edge) */}
        {Array.from({ length: Math.min(5, Math.max(2, Math.floor(thickness))) }).map((_, i) => {
          const zPos = -thickness / 2 + (thickness / (Math.max(2, thickness) - 1)) * i;
          return (
            <div
              key={i}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                transform: `translateZ(${zPos}px)`,
                border: `${Math.max(1, size * 0.05)}px solid #D97706`,
                background: 'transparent',
                opacity: 0.85,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
