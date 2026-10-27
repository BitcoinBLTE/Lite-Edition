import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LivingBlockchainNetworkProps {
  className?: string;
}

interface NodeData {
  id: number;
  // 3D coordinates based on the reference layout with subtle depth
  x: number;
  y: number;
  z: number;
  scale: number;
  strokeWidth: number;
  color1: string;
  color2: string;
  hasGradient: boolean;
  threeColor: number;
}

interface EdgePacket {
  edgeIndex: number;
  progress: number;
  speed: number;
  color: THREE.Color;
}

export const LivingBlockchainNetwork: React.FC<LivingBlockchainNetworkProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  // References for animation and interactive dragging
  const animFrameIdRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    let width = container.clientWidth || 420;
    let height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGlSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';

    // Root Group for the Interconnected Bitcoin Network
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // --- 13 NODES PRECISELY POSITIONED MATCHING REFERENCE IMAGE ---
    // Colors: cyan, teal, blue, purple, and subtle pink gradients
    const nodesConfig: NodeData[] = [
      {
        id: 0, // Central Master Node (Largest)
        x: 0.10,
        y: 0.65,
        z: 0.32,
        scale: 0.95,
        strokeWidth: 20,
        color1: '#581C87', // Deep purple
        color2: '#2563EB', // Royal blue
        hasGradient: true,
        threeColor: 0x581C87,
      },
      {
        id: 1, // Lower Center-Left Node (Second Largest)
        x: -0.38,
        y: -0.18,
        z: 0.24,
        scale: 0.72,
        strokeWidth: 18,
        color1: '#1D4ED8', // Royal blue
        color2: '#2563EB',
        hasGradient: false,
        threeColor: 0x1D4ED8,
      },
      {
        id: 2, // Upper-Left Emerald Node (Third Largest)
        x: -1.35,
        y: 0.75,
        z: -0.05,
        scale: 0.68,
        strokeWidth: 17,
        color1: '#00B894', // Emerald teal
        color2: '#00B894',
        hasGradient: false,
        threeColor: 0x00B894,
      },
      {
        id: 3, // Top-Left Mint Teal Node (Small)
        x: -0.68,
        y: 1.40,
        z: -0.18,
        scale: 0.40,
        strokeWidth: 14,
        color1: '#00C9A7', // Mint green/teal
        color2: '#00C9A7',
        hasGradient: false,
        threeColor: 0x00C9A7,
      },
      {
        id: 4, // Top-Center Purple Node (Medium-Small)
        x: 0.22,
        y: 1.34,
        z: -0.14,
        scale: 0.44,
        strokeWidth: 15,
        color1: '#7C3AED', // Purple/violet
        color2: '#7C3AED',
        hasGradient: false,
        threeColor: 0x7C3AED,
      },
      {
        id: 5, // Top-Right Rose/Purple Node (Medium-Small)
        x: 1.25,
        y: 0.82,
        z: -0.22,
        scale: 0.42,
        strokeWidth: 14,
        color1: '#9333EA', // Purple with rose tint
        color2: '#C026D3',
        hasGradient: true,
        threeColor: 0x9333EA,
      },
      {
        id: 6, // Middle-Left Cyan-Blue Node (Medium-Small)
        x: -1.42,
        y: -0.02,
        z: 0.10,
        scale: 0.50,
        strokeWidth: 15,
        color1: '#0284C7', // Electric cyan-blue
        color2: '#0284C7',
        hasGradient: false,
        threeColor: 0x0284C7,
      },
      {
        id: 7, // Middle-Right Steel Blue Node (Medium-Small)
        x: 0.88,
        y: -0.10,
        z: 0.06,
        scale: 0.42,
        strokeWidth: 14,
        color1: '#2563EB', // Steel ocean blue
        color2: '#2563EB',
        hasGradient: false,
        threeColor: 0x2563EB,
      },
      {
        id: 8, // Lower-Center Purple Node (Medium)
        x: 0.25,
        y: -0.74,
        z: 0.18,
        scale: 0.55,
        strokeWidth: 16,
        color1: '#6B21A8', // Violet purple
        color2: '#7C3AED',
        hasGradient: false,
        threeColor: 0x6B21A8,
      },
      {
        id: 9, // Bottom-Left Royal Indigo Node (Medium-Small)
        x: -0.86,
        y: -1.14,
        z: -0.10,
        scale: 0.44,
        strokeWidth: 14,
        color1: '#3B82F6', // Royal indigo
        color2: '#3B82F6',
        hasGradient: false,
        threeColor: 0x3B82F6,
      },
      {
        id: 10, // Bottom-Middle Vibrant Pink/Magenta Node (Medium)
        x: -0.26,
        y: -1.48,
        z: -0.15,
        scale: 0.55,
        strokeWidth: 16,
        color1: '#D946EF', // Magenta/pink
        color2: '#EC4899',
        hasGradient: true,
        threeColor: 0xD946EF,
      },
      {
        id: 11, // Far-Right Mint Cyan-Teal Node (Smallest)
        x: 1.40,
        y: -0.62,
        z: -0.18,
        scale: 0.32,
        strokeWidth: 13,
        color1: '#00D2B4', // Mint cyan-teal
        color2: '#00D2B4',
        hasGradient: false,
        threeColor: 0x00D2B4,
      },
      {
        id: 12, // Bottom-Right Sage Teal Node (Medium-Small)
        x: 0.86,
        y: -1.36,
        z: -0.24,
        scale: 0.39,
        strokeWidth: 14,
        color1: '#14B8A6', // Sage teal-green
        color2: '#14B8A6',
        hasGradient: false,
        threeColor: 0x14B8A6,
      },
    ];

    // --- EXACT 24 CONNECTING EDGES MATCHING REFERENCE TOPOLOGY ---
    const edgePairs: [number, number][] = [
      [3, 2],
      [3, 4],
      [3, 0],
      [4, 0],
      [4, 5],
      [2, 6],
      [2, 1],
      [2, 0],
      [0, 1],
      [0, 8],
      [0, 7],
      [0, 5],
      [5, 7],
      [5, 11],
      [6, 1],
      [6, 9],
      [1, 8],
      [1, 9],
      [7, 8],
      [7, 11],
      [7, 12],
      [11, 12],
      [8, 9],
      [8, 10],
      [8, 12],
      [9, 10],
      [10, 12],
    ];

    // Helper: Draw crisp, high-res 256x256 circular Bitcoin badge texture
    const createdTextures: THREE.Texture[] = [];
    const createBitcoinBadgeTexture = (node: NodeData): THREE.Texture => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const cx = 128;
      const cy = 128;
      const radius = 108;

      // 1. Soft anti-aliased backdrop circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // 2. Colored Outer Ring
      let strokeStyle: string | CanvasGradient = node.color1;
      if (node.hasGradient) {
        const grad = ctx.createLinearGradient(40, 40, 216, 216);
        grad.addColorStop(0, node.color1);
        grad.addColorStop(1, node.color2);
        strokeStyle = grad;
      }
      ctx.lineWidth = node.strokeWidth;
      ctx.strokeStyle = strokeStyle;
      ctx.stroke();

      // 3. Central Bitcoin Glyph '₿'
      let fillStyle: string | CanvasGradient = node.color1;
      if (node.hasGradient) {
        const grad = ctx.createLinearGradient(60, 50, 200, 210);
        grad.addColorStop(0, node.color1);
        grad.addColorStop(1, node.color2);
        fillStyle = grad;
      }
      ctx.fillStyle = fillStyle;

      // Primary: standard Unicode ₿ with bold font stack
      ctx.font = '900 134px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Check font metric support
      const metrics = ctx.measureText('₿');
      if (metrics.width > 20) {
        // Render crisp official Bitcoin glyph
        ctx.fillText('₿', cx, cy + 4);
      } else {
        // Geometric fallback if font does not provide ₿ glyph
        ctx.font = '900 114px sans-serif';
        ctx.fillText('B', cx, cy + 2);
        // Draw the 2 classic top & bottom vertical bars of the Bitcoin logo
        ctx.lineWidth = 9;
        ctx.strokeStyle = fillStyle;
        ctx.beginPath();
        // Top 2 bars
        ctx.moveTo(cx - 16, cy - 64);
        ctx.lineTo(cx - 16, cy - 44);
        ctx.moveTo(cx + 10, cy - 64);
        ctx.lineTo(cx + 10, cy - 44);
        // Bottom 2 bars
        ctx.moveTo(cx - 16, cy + 44);
        ctx.lineTo(cx - 16, cy + 64);
        ctx.moveTo(cx + 10, cy + 44);
        ctx.lineTo(cx + 10, cy + 64);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
      createdTextures.push(texture);
      return texture;
    };

    // --- CREATE 13 BILLBOARD SPRITES ---
    // Billboards face camera directly so the Bitcoin symbols are always legible, horizontal & crisp
    // while their 3D positions rotate with genuine parallax and depth!
    const sprites: THREE.Sprite[] = [];
    nodesConfig.forEach((cfg) => {
      const tex = createBitcoinBadgeTexture(cfg);
      const spriteMat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(cfg.x, cfg.y, cfg.z);
      sprite.scale.set(cfg.scale, cfg.scale, 1);
      networkGroup.add(sprite);
      sprites.push(sprite);
    });

    // --- CREATE CONNECTING LINES WITH SMOOTH GRADIENT TRANSITIONS ---
    // Using LineSegments with per-vertex colors for seamless color blends along edges
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    edgePairs.forEach(([i, j]) => {
      const nA = nodesConfig[i];
      const nB = nodesConfig[j];
      const cA = new THREE.Color(nA.threeColor);
      const cB = new THREE.Color(nB.threeColor);

      // Node A vertex
      linePositions.push(nA.x, nA.y, nA.z);
      lineColors.push(cA.r, cA.g, cA.b);

      // Node B vertex
      linePositions.push(nB.x, nB.y, nB.z);
      lineColors.push(cB.r, cB.g, cB.b);
    });

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      linewidth: 1.5,
    });

    const lineSegments = new THREE.LineSegments(linesGeometry, linesMaterial);
    networkGroup.add(lineSegments);

    // --- ANIMATED ENERGY FLOW PACKETS (Alive, Futuristic Network) ---
    // Micro glowing pulses flowing between connected Bitcoin nodes
    const packetCount = 8;
    const packets: EdgePacket[] = [];
    for (let k = 0; k < packetCount; k++) {
      const edgeIdx = Math.floor(Math.random() * edgePairs.length);
      const nA = nodesConfig[edgePairs[edgeIdx][0]];
      packets.push({
        edgeIndex: edgeIdx,
        progress: (k / packetCount),
        speed: 0.25 + Math.random() * 0.2,
        color: new THREE.Color(nA.threeColor),
      });
    }

    const packetPositions = new Float32Array(packetCount * 3);
    const packetColors = new Float32Array(packetCount * 3);
    const packetsGeometry = new THREE.BufferGeometry();
    packetsGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    packetsGeometry.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));

    // Glow dot texture for packets
    const packetCanvas = document.createElement('canvas');
    packetCanvas.width = 64;
    packetCanvas.height = 64;
    const pctx = packetCanvas.getContext('2d');
    if (pctx) {
      const pGrad = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      pGrad.addColorStop(0.3, 'rgba(0, 210, 180, 0.9)');
      pGrad.addColorStop(0.7, 'rgba(124, 58, 237, 0.4)');
      pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pctx.fillStyle = pGrad;
      pctx.fillRect(0, 0, 64, 64);
    }
    const packetTex = new THREE.CanvasTexture(packetCanvas);
    createdTextures.push(packetTex);

    const packetsMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: packetTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const packetsMesh = new THREE.Points(packetsGeometry, packetsMaterial);
    networkGroup.add(packetsMesh);

    // Subtle ambient background glow ring
    const glowRingGeo = new THREE.RingGeometry(1.6, 2.1, 48);
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
    glowRing.position.set(0, 0, -0.4);
    networkGroup.add(glowRing);

    // --- INTERACTIVE DRAG TO ROTATE & TOUCH EVENT HANDLERS ---
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      rotationVelocityRef.current = {
        x: dy * 0.005,
        y: dx * 0.005,
      };
      rotationOffsetRef.current.x += dy * 0.005;
      rotationOffsetRef.current.y += dx * 0.005;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // --- RESPONSIVE RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 420;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      // Adjust camera distance dynamically to prevent clipping on mobile
      if (width < 340) {
        camera.position.z = 7.0;
      } else if (width < 420) {
        camera.position.z = 6.6;
      } else {
        camera.position.z = 6.2;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Inertia damping for interactive drag
      if (!isDraggingRef.current) {
        rotationVelocityRef.current.x *= 0.94;
        rotationVelocityRef.current.y *= 0.94;
        rotationOffsetRef.current.x += rotationVelocityRef.current.x;
        rotationOffsetRef.current.y += rotationVelocityRef.current.y;

        // Return gently toward center if dragged far
        rotationOffsetRef.current.x *= 0.985;
        rotationOffsetRef.current.y *= 0.985;
      }

      // Subtle, smooth 3D floating & undulation
      // Keeps the Bitcoin symbols upright, clean, and recognizable
      const floatPitch = Math.sin(elapsed * 0.45) * 0.10 + rotationOffsetRef.current.x;
      const floatYaw = Math.cos(elapsed * 0.55) * 0.16 + rotationOffsetRef.current.y;
      const floatRoll = Math.sin(elapsed * 0.3) * 0.03;
      const floatY = Math.sin(elapsed * 0.8) * 0.07;

      networkGroup.rotation.x = floatPitch;
      networkGroup.rotation.y = floatYaw;
      networkGroup.rotation.z = floatRoll;
      networkGroup.position.y = floatY;

      // Update animated energy packets along network edges
      const posAttr = packetsGeometry.attributes.position as THREE.BufferAttribute;
      const colAttr = packetsGeometry.attributes.color as THREE.BufferAttribute;

      for (let k = 0; k < packetCount; k++) {
        const p = packets[k];
        p.progress += p.speed * delta;
        if (p.progress >= 1) {
          p.progress = 0;
          p.edgeIndex = Math.floor(Math.random() * edgePairs.length);
          const nStart = nodesConfig[edgePairs[p.edgeIndex][0]];
          p.color.setHex(nStart.threeColor);
        }

        const [startIdx, endIdx] = edgePairs[p.edgeIndex];
        const nA = nodesConfig[startIdx];
        const nB = nodesConfig[endIdx];

        const px = THREE.MathUtils.lerp(nA.x, nB.x, p.progress);
        const py = THREE.MathUtils.lerp(nA.y, nB.y, p.progress);
        const pz = THREE.MathUtils.lerp(nA.z, nB.z, p.progress);

        posAttr.setXYZ(k, px, py, pz);
        colAttr.setXYZ(k, p.color.r, p.color.g, p.color.b);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Gentle pulsation of glow ring
      glowRing.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources cleanly
      linesGeometry.dispose();
      linesMaterial.dispose();
      packetsGeometry.dispose();
      packetsMaterial.dispose();
      glowRingGeo.dispose();
      glowRingMat.dispose();

      sprites.forEach((s) => {
        s.material.dispose();
      });

      createdTextures.forEach((tex) => {
        tex.dispose();
      });

      renderer.dispose();
    };
  }, []);

  // Graceful fallback if WebGL is unavailable
  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <img
          src="/assets/aistudio/bit_network_transparent.png"
          alt="Bitcoin Interconnected Network Constellation"
          className="w-full h-auto max-w-[420px] object-contain drop-shadow-xl animate-float-slow"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Interconnected Bitcoin Network Visual"
      role="img"
    />
  );
};
