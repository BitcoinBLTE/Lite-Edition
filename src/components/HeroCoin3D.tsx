import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroCoin3DProps {
  onInteract?: () => void;
  className?: string;
}

export const HeroCoin3D: React.FC<HeroCoin3DProps> = ({ onInteract, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startRotationRef = useRef<{ y: number; x: number }>({ y: 0, x: 0 });
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    let width = container.clientWidth || 240;
    let height = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // Helper: draw a 5-point star
    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      rOuter: number,
      rInner: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / 5;

      ctx.beginPath();
      ctx.moveTo(cx, cy - rOuter);
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(cx + Math.cos(rot) * rOuter, cy + Math.sin(rot) * rOuter);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * rInner, cy + Math.sin(rot) * rInner);
        rot += step;
      }
      ctx.lineTo(cx, cy - rOuter);
      ctx.closePath();
      ctx.fill();
    };

    // 2. High-Resolution Textures (2048 x 2048)
    const createFrontCanvas = (): HTMLCanvasElement => {
      const size = 2048;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      const c = size / 2;
      const outerR = 980;
      const innerR = 770;

      ctx.clearRect(0, 0, size, size);

      // --- Outer Milled Gold Edge Ring ---
      ctx.save();
      const goldGrad = ctx.createRadialGradient(c * 0.7, c * 0.6, 200, c, c, outerR);
      goldGrad.addColorStop(0, '#FFFBEB');
      goldGrad.addColorStop(0.25, '#FDE047');
      goldGrad.addColorStop(0.5, '#F59E0B');
      goldGrad.addColorStop(0.8, '#D97706');
      goldGrad.addColorStop(1, '#78350F');

      ctx.fillStyle = goldGrad;
      ctx.beginPath();
      ctx.arc(c, c, outerR, 0, Math.PI * 2);
      ctx.fill();

      // Outer reeded fine tick ridges around rim (180 milled notches)
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 4;
      for (let i = 0; i < 180; i++) {
        const angle = (i * Math.PI * 2) / 180;
        const x1 = c + Math.cos(angle) * (outerR - 26);
        const y1 = c + Math.sin(angle) * (outerR - 26);
        const x2 = c + Math.cos(angle) * outerR;
        const y2 = c + Math.sin(angle) * outerR;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Beveled Gold Outer Rings
      ctx.strokeStyle = '#FEF3C7';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(c, c, outerR - 35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#92400E';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(c, c, outerR - 45, 0, Math.PI * 2);
      ctx.stroke();

      // --- Dark Inner Circular Surface ---
      const darkGrad = ctx.createRadialGradient(c, c - 120, 80, c, c, innerR);
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
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(c, c, innerR - 8, 0, Math.PI * 2);
      ctx.stroke();

      // Concentric minted micro-grooves
      ctx.lineWidth = 1;
      for (let r = 240; r < innerR - 20; r += 24) {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.04)';
        ctx.beginPath();
        ctx.arc(c, c, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // --- Central Bitcoin ₿ Emblem (Vector + Glyph for 100% Cross-Platform Perfection) ---
      const symCx = c;
      const symCy = c - 40;

      const symbolGrad = ctx.createLinearGradient(symCx - 200, symCy - 350, symCx + 200, symCy + 350);
      symbolGrad.addColorStop(0, '#FFFDF0');
      symbolGrad.addColorStop(0.2, '#FDE047');
      symbolGrad.addColorStop(0.5, '#F59E0B');
      symbolGrad.addColorStop(0.8, '#D97706');
      symbolGrad.addColorStop(1, '#92400E');

      ctx.save();
      // Drop shadow for 3D minted relief
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 45;
      ctx.shadowOffsetY = 28;

      // 1. Vector structural spine and ticks
      ctx.fillStyle = symbolGrad;
      const tickW = 42;
      const tickH = 85;
      // Top ticks
      ctx.fillRect(symCx - 55, symCy - 370, tickW, tickH);
      ctx.fillRect(symCx + 45, symCy - 370, tickW, tickH);
      // Bottom ticks
      ctx.fillRect(symCx - 55, symCy + 290, tickW, tickH);
      ctx.fillRect(symCx + 45, symCy + 290, tickW, tickH);
      // Main vertical spine
      ctx.fillRect(symCx - 170, symCy - 300, 110, 600);

      // Upper lobe
      ctx.beginPath();
      ctx.moveTo(symCx - 70, symCy - 300);
      ctx.lineTo(symCx + 70, symCy - 300);
      ctx.bezierCurveTo(symCx + 210, symCy - 300, symCx + 210, symCy - 20, symCx + 70, symCy - 20);
      ctx.lineTo(symCx - 70, symCy - 20);
      ctx.closePath();
      ctx.fill();

      // Lower lobe (slightly wider)
      ctx.beginPath();
      ctx.moveTo(symCx - 70, symCy - 20);
      ctx.lineTo(symCx + 95, symCy - 20);
      ctx.bezierCurveTo(symCx + 250, symCy - 20, symCx + 250, symCy + 300, symCx + 95, symCy + 300);
      ctx.lineTo(symCx - 70, symCy + 300);
      ctx.closePath();
      ctx.fill();

      // Dark cutouts
      ctx.fillStyle = '#121215';
      // Upper cutout
      ctx.beginPath();
      ctx.moveTo(symCx - 60, symCy - 215);
      ctx.lineTo(symCx + 55, symCy - 215);
      ctx.bezierCurveTo(symCx + 125, symCy - 215, symCx + 125, symCy - 105, symCx + 55, symCy - 105);
      ctx.lineTo(symCx - 60, symCy - 105);
      ctx.closePath();
      ctx.fill();

      // Lower cutout
      ctx.beginPath();
      ctx.moveTo(symCx - 60, symCy + 75);
      ctx.lineTo(symCx + 75, symCy + 75);
      ctx.bezierCurveTo(symCx + 155, symCy + 75, symCx + 155, symCy + 205, symCx + 75, symCy + 205);
      ctx.lineTo(symCx - 60, symCy + 205);
      ctx.closePath();
      ctx.fill();

      // High-precision font overlay
      ctx.fillStyle = symbolGrad;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 800px "Inter", "Cinzel", "Arial", "Segoe UI Symbol", sans-serif';
      ctx.fillText('₿', symCx, symCy);
      ctx.restore();

      // Embossed Bevel Highlight Stroke
      ctx.strokeStyle = '#FEF9C3';
      ctx.lineWidth = 8;
      ctx.strokeText('₿', symCx - 3, symCy - 3);

      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 10;
      ctx.strokeText('₿', symCx + 3, symCy + 3);

      // --- Top Curved Text: "$BLTE" ---
      const topSymbolText = '$BLTE';
      const topSymbolRadius = 880;
      const topCharCount = topSymbolText.length;
      const topSymbolStartAngle = -Math.PI * 0.58;
      const topSymbolEndAngle = -Math.PI * 0.42;
      const topSymbolAngleStep = (topSymbolEndAngle - topSymbolStartAngle) / (topCharCount - 1);

      ctx.save();
      ctx.font = '900 110px "Outfit", "Inter", "Arial Black", sans-serif';
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
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;

        // Dark defining bevel stroke
        ctx.strokeStyle = '#180B02';
        ctx.lineWidth = 10;
        ctx.lineJoin = 'round';
        ctx.strokeText(char, 0, 0);

        // Bright luminous gold-to-white gradient
        const charGrad = ctx.createLinearGradient(0, -55, 0, 55);
        charGrad.addColorStop(0, '#FFFFFF');
        charGrad.addColorStop(0.25, '#FEF9C3');
        charGrad.addColorStop(0.65, '#FDE047');
        charGrad.addColorStop(1, '#D97706');
        ctx.fillStyle = charGrad;
        ctx.fillText(char, 0, 0);

        // Crisp inner highlight stroke
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#FFFBEB';
        ctx.lineWidth = 2.5;
        ctx.strokeText(char, 0, -1);

        ctx.restore();
      }
      ctx.restore();

      // --- Bottom Curved Text: "BITCOIN LITE EDITION" ---
      const bottomText = 'BITCOIN LITE EDITION';
      const textRadius = 880;
      const charCount = bottomText.length;
      const startAngle = Math.PI * 0.81;
      const endAngle = Math.PI * 0.19;
      const angleStep = (startAngle - endAngle) / (charCount - 1);

      ctx.save();
      // Extra bold and significantly enlarged for high visibility
      ctx.font = '900 92px "Inter", "Arial Black", "Cinzel", sans-serif';
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

        // Heavy dark under-shadow for maximum contrast against gold rim
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 6;

        // Dark defining bevel stroke for crisp readability
        ctx.strokeStyle = '#180B02';
        ctx.lineWidth = 10;
        ctx.lineJoin = 'round';
        ctx.strokeText(char, 0, 0);

        // Bright luminous gold-to-white gradient for unmistakable visibility
        const charGrad = ctx.createLinearGradient(0, -46, 0, 46);
        charGrad.addColorStop(0, '#FFFFFF');
        charGrad.addColorStop(0.25, '#FEF9C3');
        charGrad.addColorStop(0.65, '#FDE047');
        charGrad.addColorStop(1, '#D97706');
        ctx.fillStyle = charGrad;
        ctx.fillText(char, 0, 0);

        // Crisp inner highlight stroke
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#FFFBEB';
        ctx.lineWidth = 2.5;
        ctx.strokeText(char, 0, -1);

        ctx.restore();
      }
      ctx.restore();

      ctx.restore();
      return canvas;
    };

    const createBackCanvas = (): HTMLCanvasElement => {
      const size = 2048;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      const c = size / 2;
      const outerR = 980;
      const innerR = 770;

      ctx.clearRect(0, 0, size, size);

      // --- Outer Milled Gold Edge Ring ---
      ctx.save();
      const goldGrad = ctx.createRadialGradient(c * 0.7, c * 0.6, 200, c, c, outerR);
      goldGrad.addColorStop(0, '#FFFBEB');
      goldGrad.addColorStop(0.25, '#FDE047');
      goldGrad.addColorStop(0.5, '#F59E0B');
      goldGrad.addColorStop(0.8, '#D97706');
      goldGrad.addColorStop(1, '#78350F');

      ctx.fillStyle = goldGrad;
      ctx.beginPath();
      ctx.arc(c, c, outerR, 0, Math.PI * 2);
      ctx.fill();

      // Outer reeded fine tick ridges (180 notches)
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 4;
      for (let i = 0; i < 180; i++) {
        const angle = (i * Math.PI * 2) / 180;
        const x1 = c + Math.cos(angle) * (outerR - 26);
        const y1 = c + Math.sin(angle) * (outerR - 26);
        const x2 = c + Math.cos(angle) * outerR;
        const y2 = c + Math.sin(angle) * outerR;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Beveled Gold Outer Rings
      ctx.strokeStyle = '#FEF3C7';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(c, c, outerR - 35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#92400E';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(c, c, outerR - 45, 0, Math.PI * 2);
      ctx.stroke();

      // --- Dark Inner Circular Surface ---
      const darkGrad = ctx.createRadialGradient(c, c - 120, 80, c, c, innerR);
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
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(c, c, innerR - 8, 0, Math.PI * 2);
      ctx.stroke();

      // --- Sophisticated Circuit Board Traces in Gold ---
      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      ctx.fillStyle = '#F59E0B';
      ctx.lineWidth = 4;

      const tracePaths = [
        // Upper Left
        [[c - 400, c - 280], [c - 220, c - 280], [c - 130, c - 370], [c - 130, c - 480]],
        [[c - 500, c - 200], [c - 320, c - 200], [c - 240, c - 260]],
        [[c - 560, c - 340], [c - 400, c - 340], [c - 330, c - 410]],
        // Upper Right
        [[c + 400, c - 280], [c + 220, c - 280], [c + 130, c - 370], [c + 130, c - 480]],
        [[c + 500, c - 200], [c + 320, c - 200], [c + 240, c - 260]],
        [[c + 560, c - 340], [c + 400, c - 340], [c + 330, c - 410]],
        // Lower Left
        [[c - 480, c + 270], [c - 300, c + 270], [c - 190, c + 380]],
        [[c - 380, c + 350], [c - 250, c + 350], [c - 180, c + 420]],
        // Lower Right
        [[c + 480, c + 270], [c + 300, c + 270], [c + 190, c + 380]],
        [[c + 380, c + 350], [c + 250, c + 350], [c + 180, c + 420]],
      ];

      tracePaths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path[0][0], path[0][1]);
        for (let j = 1; j < path.length; j++) {
          ctx.lineTo(path[j][0], path[j][1]);
        }
        ctx.stroke();

        const last = path[path.length - 1];
        ctx.beginPath();
        ctx.arc(last[0], last[1], 8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // --- Top Curved Text: "FIXED SUPPLY" ---
      const topText = 'FIXED SUPPLY';
      const topTextRadius = 880;
      const topCharCount = topText.length;
      const topStartAngle = -Math.PI * 0.74;
      const topEndAngle = -Math.PI * 0.26;
      const topAngleStep = (topEndAngle - topStartAngle) / (topCharCount - 1);

      ctx.save();
      // Extra bold and significantly enlarged for high visibility
      ctx.font = '900 96px "Inter", "Arial Black", "Cinzel", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < topCharCount; i++) {
        const char = topText[i];
        const angle = topStartAngle + i * topAngleStep;
        const x = c + Math.cos(angle) * topTextRadius;
        const y = c + Math.sin(angle) * topTextRadius;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);

        // Deep drop shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 6;

        // Dark defining bevel stroke for crisp readability
        ctx.strokeStyle = '#180B02';
        ctx.lineWidth = 10;
        ctx.lineJoin = 'round';
        ctx.strokeText(char, 0, 0);

        // Bright luminous gold-to-white gradient
        const charGrad = ctx.createLinearGradient(0, -48, 0, 48);
        charGrad.addColorStop(0, '#FFFFFF');
        charGrad.addColorStop(0.25, '#FEF9C3');
        charGrad.addColorStop(0.65, '#FDE047');
        charGrad.addColorStop(1, '#D97706');
        ctx.fillStyle = charGrad;
        ctx.fillText(char, 0, 0);

        // Crisp inner highlight stroke
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#FFFBEB';
        ctx.lineWidth = 2.5;
        ctx.strokeText(char, 0, -1);

        ctx.restore();
      }
      ctx.restore();

      // --- Central Geometric Architecture Emblem (Upper-Center) ---
      const emblemY = c - 170;
      ctx.save();
      const barGrad = ctx.createLinearGradient(c - 200, emblemY - 100, c + 200, emblemY + 100);
      barGrad.addColorStop(0, '#FFFFFF');
      barGrad.addColorStop(0.25, '#FEF08A');
      barGrad.addColorStop(0.65, '#F59E0B');
      barGrad.addColorStop(1, '#D97706');

      ctx.fillStyle = barGrad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 10;

      const drawParallelogram = (yOffset: number, slant: number) => {
        ctx.beginPath();
        ctx.moveTo(c - 190 + slant, emblemY + yOffset);
        ctx.lineTo(c + 140 + slant, emblemY + yOffset);
        ctx.lineTo(c + 180 - slant, emblemY + yOffset + 36);
        ctx.lineTo(c - 150 - slant, emblemY + yOffset + 36);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#FEF9C3';
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      drawParallelogram(-80, 24);
      drawParallelogram(-22, -10);
      drawParallelogram(36, 24);
      ctx.restore();

      // --- Bottom Main Number: "2.1M" (Moved to bottom of coin) ---
      const numY = c + 180;
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 16;

      const numGrad = ctx.createLinearGradient(c - 280, numY - 70, c + 280, numY + 70);
      numGrad.addColorStop(0, '#FFFFFF');
      numGrad.addColorStop(0.2, '#FEF08A');
      numGrad.addColorStop(0.5, '#F59E0B');
      numGrad.addColorStop(0.8, '#D97706');
      numGrad.addColorStop(1, '#92400E');

      ctx.fillStyle = numGrad;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 240px "Outfit", "Inter", "Arial Black", sans-serif';
      ctx.fillText('2.1M', c, numY);
      ctx.restore();

      // Number Emboss Stroke
      ctx.strokeStyle = '#FFFBEB';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 240px "Outfit", "Inter", "Arial Black", sans-serif';
      ctx.strokeText('2.1M', c - 2, numY - 2);

      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 7;
      ctx.strokeText('2.1M', c + 2, numY + 2);

      // --- Subtitle: "TOTAL SUPPLY" (Moved below 2.1M at bottom) ---
      const subY = c + 325;
      ctx.save();
      ctx.font = 'bold 64px "Outfit", "Inter", "Arial", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const subGrad = ctx.createLinearGradient(c - 200, subY - 20, c + 200, subY + 20);
      subGrad.addColorStop(0, '#FDE68A');
      subGrad.addColorStop(0.5, '#F59E0B');
      subGrad.addColorStop(1, '#B45309');
      ctx.fillStyle = subGrad;
      ctx.fillText('TOTAL SUPPLY', c, subY);

      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 3;
      ctx.strokeText('TOTAL SUPPLY', c, subY);
      ctx.restore();

      // --- Five Bottom Stars: ★ ★ ★ ★ ★ (5 stars instead of 3) ---
      ctx.save();
      const starGrad = ctx.createLinearGradient(0, c + 410, 0, c + 475);
      starGrad.addColorStop(0, '#FFFBEB');
      starGrad.addColorStop(0.5, '#F59E0B');
      starGrad.addColorStop(1, '#B45309');
      ctx.fillStyle = starGrad;

      // 5 Stars in an arched row at the bottom of the coin
      // Center star (hero star, largest)
      drawStar(ctx, c, c + 448, 38, 16);
      // Mid-left star
      drawStar(ctx, c - 90, c + 440, 30, 13);
      // Mid-right star
      drawStar(ctx, c + 90, c + 440, 30, 13);
      // Far-left star
      drawStar(ctx, c - 175, c + 422, 24, 10);
      // Far-right star
      drawStar(ctx, c + 175, c + 422, 24, 10);
      ctx.restore();

      ctx.restore();
      return canvas;
    };

    // Reeded Edge Texture (Vertical fine milled ridges)
    const createSideCanvas = (): HTMLCanvasElement => {
      const w = 512;
      const h = 64;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      for (let x = 0; x < w; x += 4) {
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(x, 0, 2, h);
        ctx.fillStyle = '#78350F';
        ctx.fillRect(x + 2, 0, 2, h);
      }
      return canvas;
    };

    const frontCanvas = createFrontCanvas();
    const backCanvas = createBackCanvas();
    const sideCanvas = createSideCanvas();

    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.needsUpdate = true;

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;
    backTexture.needsUpdate = true;

    const sideTexture = new THREE.CanvasTexture(sideCanvas);
    sideTexture.wrapS = THREE.RepeatWrapping;
    sideTexture.wrapT = THREE.ClampToEdgeWrapping;
    sideTexture.repeat.set(64, 1);
    sideTexture.needsUpdate = true;

    // 3. Assemble the Physical Thin 3D Coin
    // Radius = 2.2, Thickness = 0.22 (Thickness is ~5% of diameter: thin physical coin)
    const R = 2.2;
    const T = 0.22;

    const coinGroup = new THREE.Group();

    // Front Face (Circular disc at +Z)
    const frontGeom = new THREE.CircleGeometry(R, 128);
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.22,
      metalness: 0.85,
    });
    const frontMesh = new THREE.Mesh(frontGeom, frontMat);
    frontMesh.position.z = T / 2;
    coinGroup.add(frontMesh);

    // Back Face (Circular disc at -Z, rotated 180° around Y)
    const backGeom = new THREE.CircleGeometry(R, 128);
    const backMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.22,
      metalness: 0.85,
    });
    const backMesh = new THREE.Mesh(backGeom, backMat);
    backMesh.position.z = -T / 2;
    backMesh.rotation.y = Math.PI; // Face rearwards
    coinGroup.add(backMesh);

    // Side Milled Reeded Edge (Open cylinder)
    const sideGeom = new THREE.CylinderGeometry(R, R, T, 128, 1, true);
    const sideMat = new THREE.MeshStandardMaterial({
      map: sideTexture,
      roughness: 0.3,
      metalness: 0.9,
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const sideMesh = new THREE.Mesh(sideGeom, sideMat);
    sideMesh.rotation.x = Math.PI / 2; // Align cylinder with Z axis
    coinGroup.add(sideMesh);

    // 3D Beveled Torus Rims (Polished raised gold borders)
    const rimGeom = new THREE.TorusGeometry(R, 0.045, 16, 128);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.16,
      metalness: 0.95,
    });

    const frontRim = new THREE.Mesh(rimGeom, rimMat);
    frontRim.position.z = T / 2;
    coinGroup.add(frontRim);

    const backRim = new THREE.Mesh(rimGeom, rimMat);
    backRim.position.z = -T / 2;
    coinGroup.add(backRim);

    // Initial orientation: Full front face directly facing user (0° Y rotation)
    const baseTiltX = 0.06; // Subtle 3.5° pitch to catch reflections
    coinGroup.rotation.x = baseTiltX;
    coinGroup.rotation.y = 0; // Starts facing the user directly at 0°!

    scene.add(coinGroup);

    // 4. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key warm light
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.4);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Fill golden light
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.8);
    fillLight.position.set(-5, -1, 4);
    scene.add(fillLight);

    // Rim light to highlight thin milled edge during rotation
    const rimLight = new THREE.DirectionalLight(0xfde68a, 2.5);
    rimLight.position.set(0, -4, -4);
    scene.add(rimLight);

    // 5. Continuous Smooth Rotation Loop
    let animId: number;
    let lastTime = performance.now();
    // 10 seconds per 360° full rotation:
    const autoRotationSpeed = (Math.PI * 2) / 10;

    const animate = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isDraggingRef.current) {
        // Continuous smooth rotation around vertical Y axis:
        // Front (0°) -> Thin Side (90°) -> Back 2.1M (180°) -> Side (270°) -> Front (360°)
        coinGroup.rotation.y = (coinGroup.rotation.y + autoRotationSpeed * delta) % (Math.PI * 2);
        
        // Restore X pitch smoothly to baseline
        coinGroup.rotation.x += (baseTiltX - coinGroup.rotation.x) * (delta * 4);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // 6. Pointer Drag Interaction
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      startPointerRef.current = { x: e.clientX, y: e.clientY };
      startRotationRef.current = { y: coinGroup.rotation.y, x: coinGroup.rotation.x };
      setHintVisible(false);
      if (onInteract) onInteract();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startPointerRef.current.x;
      const deltaY = e.clientY - startPointerRef.current.y;

      coinGroup.rotation.y = (startRotationRef.current.y + deltaX * 0.012) % (Math.PI * 2);
      const newPitch = Math.max(-0.4, Math.min(0.4, startRotationRef.current.x - deltaY * 0.008));
      coinGroup.rotation.x = newPitch;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }

      frontTexture.dispose();
      backTexture.dispose();
      sideTexture.dispose();
      frontGeom.dispose();
      backGeom.dispose();
      sideGeom.dispose();
      rimGeom.dispose();
      frontMat.dispose();
      backMat.dispose();
      sideMat.dispose();
      rimMat.dispose();
      renderer.dispose();
    };
  }, [onInteract]);

  return (
    <div className={`relative w-full aspect-square mx-auto flex items-center justify-center select-none ${className || 'max-w-[240px] sm:max-w-[280px] lg:max-w-[420px] xl:max-w-[460px]'}`}>
      {/* Warm Golden Floor Reflection & Glow (Matching luxury photography in reference image) */}
      <div
        className="absolute -bottom-5 w-3/4 h-8 bg-gradient-to-t from-amber-500/20 via-amber-600/10 to-transparent rounded-full blur-xl transform scale-y-50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-1.5 w-1/2 h-3 bg-amber-400/15 rounded-full blur-md transform scale-y-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
        role="img"
        aria-label="Interactive 3D minted coin of Bitcoin Lite Edition with continuous rotation around vertical Y axis, showing 2.1M fixed supply on reverse"
      />
    </div>
  );
};
