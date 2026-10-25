import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface LivingBlockchainNetworkProps {
  className?: string;
}

interface NetworkNode {
  position: THREE.Vector3;
  baseScale: number;
  type: 'hub' | 'validator' | 'relay';
  color: THREE.Color;
  emissiveColor: THREE.Color;
  pulsePhase: number;
  pulseSpeed: number;
  glowSize: number;
  connections: number[];
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: THREE.Color;
  size: number;
}

export const LivingBlockchainNetwork: React.FC<LivingBlockchainNetworkProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // References for animation and event management
  const animFrameIdRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.002 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: 0 });
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: 0 });
  const prefersReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const container = containerRef.current;
    if (!container) return;

    // Probe WebGL support
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

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();

    let width = container.clientWidth || 420;
    let height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';

    // --- PROCEDURAL GLOW TEXTURE GENERATOR (Zero external assets) ---
    const createGlowTexture = (innerColor: string, outerColor: string): THREE.Texture => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(0.3, outerColor);
        gradient.addColorStop(0.7, 'rgba(0,0,0,0.15)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const goldGlowTex = createGlowTexture('rgba(255, 235, 170, 0.95)', 'rgba(217, 119, 6, 0.55)');
    const blueGlowTex = createGlowTexture('rgba(210, 245, 255, 0.95)', 'rgba(2, 132, 199, 0.6)');

    // --- HIERARCHICAL THREE.GROUP FOR THE LIVING NETWORK ---
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // --- PROCEDURAL DECENTRALIZED TOPOLOGY GENERATION ---
    // Defined cluster centers representing high-throughput distributed validators & scarcity hubs
    const clusterCenters = [
      new THREE.Vector3(0.0, 0.45, 0.2),      // Alpha Consensus Core (Center-Top)
      new THREE.Vector3(-1.4, -0.6, 0.5),     // Beta Throughput Engine (Bottom-Left)
      new THREE.Vector3(1.35, -0.5, -0.4),    // Gamma Scarcity Vault (Bottom-Right)
      new THREE.Vector3(0.1, -1.2, 0.1),      // Delta Settlement Bridge (Deep Bottom)
      new THREE.Vector3(-0.8, 1.1, -0.6),     // Epsilon Peer Gateway (Top-Left)
      new THREE.Vector3(1.0, 1.0, 0.6),       // Zeta Relay Cluster (Top-Right)
    ];

    const nodes: NetworkNode[] = [];
    const GOLD_PALETTE = [
      new THREE.Color(0xF5C451), // Bright 24k Gold
      new THREE.Color(0xEAB308), // Rich Solana Amber
      new THREE.Color(0xD97706), // Deep Burnished Gold
      new THREE.Color(0xFDE68A), // Radiant Champagne Gold
    ];
    const BLUE_PALETTE = [
      new THREE.Color(0x38BDF8), // Electric Cyan Blue
      new THREE.Color(0x60A5FA), // Azure Sky
      new THREE.Color(0xE0F2FE), // Ice White-Blue
    ];

    // 1. Hub Nodes (The major anchors of the network)
    clusterCenters.forEach((center, idx) => {
      const isAlpha = idx === 0;
      nodes.push({
        position: center.clone(),
        baseScale: isAlpha ? 0.21 : 0.16,
        type: 'hub',
        color: isAlpha ? new THREE.Color(0xFFEAA7) : GOLD_PALETTE[idx % GOLD_PALETTE.length],
        emissiveColor: isAlpha ? new THREE.Color(0xD97706) : new THREE.Color(0x92400E),
        pulsePhase: idx * 1.2,
        pulseSpeed: 1.5 + idx * 0.2,
        glowSize: isAlpha ? 1.6 : 1.2,
        connections: [],
      });
    });

    // 2. Validator & Relay Nodes distributed around clusters
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    let seedCounter = 1;
    clusterCenters.forEach((center, cIdx) => {
      const countAround = 5 + (cIdx % 3);
      for (let i = 0; i < countAround; i++) {
        seedCounter++;
        const u = pseudoRandom(seedCounter++);
        const v = pseudoRandom(seedCounter++);
        const w = pseudoRandom(seedCounter++);

        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);
        const radius = 0.55 + w * 0.95;

        const offset = new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta) * 0.8,
          radius * Math.cos(phi)
        );

        const pos = center.clone().add(offset);
        const isBlueHighlight = (cIdx + i) % 4 === 0;
        const isValidator = i < 3;

        nodes.push({
          position: pos,
          baseScale: isValidator ? 0.12 : 0.085,
          type: isValidator ? 'validator' : 'relay',
          color: isBlueHighlight
            ? BLUE_PALETTE[i % BLUE_PALETTE.length]
            : GOLD_PALETTE[i % GOLD_PALETTE.length],
          emissiveColor: isBlueHighlight
            ? new THREE.Color(0x0284C7)
            : new THREE.Color(0x78350F),
          pulsePhase: (cIdx * countAround + i) * 0.7,
          pulseSpeed: 1.8 + pseudoRandom(seedCounter++) * 1.5,
          glowSize: isValidator ? 0.9 : 0.6,
          connections: [],
        });
      }
    });

    // 3. Connect nodes into a cohesive decentralized mesh
    const edgePairs: [number, number][] = [];
    const MAX_DISTANCE = 1.65;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        // Direct link condition
        const shouldConnect =
          (nodes[i].type === 'hub' && dist < 2.3) ||
          (nodes[j].type === 'hub' && dist < 2.3) ||
          dist < MAX_DISTANCE;

        if (shouldConnect && nodes[i].connections.length < 5 && nodes[j].connections.length < 5) {
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
          edgePairs.push([i, j]);
        }
      }
    }

    // Ensure all hubs are interconnected to form the backbone highway
    for (let h = 0; h < clusterCenters.length; h++) {
      for (let k = h + 1; k < clusterCenters.length; k++) {
        if (!nodes[h].connections.includes(k)) {
          nodes[h].connections.push(k);
          nodes[k].connections.push(h);
          edgePairs.push([h, k]);
        }
      }
    }

    // --- INSTANCED MESH FOR NETWORK NODES (High 60fps Performance) ---
    const sphereGeo = new THREE.SphereGeometry(1, 28, 28);
    const nodeMat = new THREE.MeshStandardMaterial({
      metalness: 0.88,
      roughness: 0.18,
      color: 0xFFFFFF, // tinted per-instance
    });

    const instancedNodes = new THREE.InstancedMesh(sphereGeo, nodeMat, nodes.length);
    instancedNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    networkGroup.add(instancedNodes);

    // Set initial instance colors and matrices
    const dummyObj = new THREE.Object3D();
    nodes.forEach((node, idx) => {
      dummyObj.position.copy(node.position);
      dummyObj.scale.setScalar(node.baseScale);
      dummyObj.updateMatrix();
      instancedNodes.setMatrixAt(idx, dummyObj.matrix);
      instancedNodes.setColorAt(idx, node.color);
    });
    if (instancedNodes.instanceColor) {
      instancedNodes.instanceColor.needsUpdate = true;
    }
    instancedNodes.instanceMatrix.needsUpdate = true;

    // --- GLOW SPRITES AROUND NODES (Atmospheric luminous aura) ---
    const spriteGroup = new THREE.Group();
    networkGroup.add(spriteGroup);

    const glowSprites: { sprite: THREE.Sprite; nodeIdx: number; baseScale: number }[] = [];
    nodes.forEach((node, idx) => {
      const isBlue = node.type === 'relay' && node.color.b > 0.7;
      const mat = new THREE.SpriteMaterial({
        map: isBlue ? blueGlowTex : goldGlowTex,
        transparent: true,
        opacity: node.type === 'hub' ? 0.75 : 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.position.copy(node.position);
      const spriteScale = node.baseScale * (node.type === 'hub' ? 5.2 : 4.0);
      sprite.scale.set(spriteScale, spriteScale, 1);
      spriteGroup.add(sprite);
      glowSprites.push({ sprite, nodeIdx: idx, baseScale: spriteScale });
    });

    // --- LUMINOUS NETWORK CONNECTION LINES ---
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    edgePairs.forEach(([i, j]) => {
      const p1 = nodes[i].position;
      const p2 = nodes[j].position;
      linePositions.push(p1.x, p1.y, p1.z);
      linePositions.push(p2.x, p2.y, p2.z);

      const c1 = nodes[i].color;
      const c2 = nodes[j].color;
      lineColors.push(c1.r * 0.8, c1.g * 0.8, c1.b * 0.8);
      lineColors.push(c2.r * 0.8, c2.g * 0.8, c2.b * 0.8);
    });

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      linewidth: 1,
    });

    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    networkGroup.add(networkLines);

    // --- TRAVELING DATA PACKETS (Luminous transaction particles) ---
    const packetCount = 28;
    const packets: DataPacket[] = [];
    for (let p = 0; p < packetCount; p++) {
      const randomEdge = edgePairs[Math.floor(pseudoRandom(p * 17 + 1) * edgePairs.length)];
      const isCyan = p % 3 === 0;
      const isWhite = p % 5 === 0;
      packets.push({
        fromNode: randomEdge[0],
        toNode: randomEdge[1],
        progress: pseudoRandom(p * 31 + 5),
        speed: 0.005 + pseudoRandom(p * 7 + 9) * 0.009,
        color: isWhite
          ? new THREE.Color(0xFFFFFF)
          : isCyan
          ? new THREE.Color(0x38BDF8)
          : new THREE.Color(0xF59E0B),
        size: isWhite ? 0.055 : 0.045,
      });
    }

    const packetGeo = new THREE.SphereGeometry(1, 14, 14);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      blending: THREE.AdditiveBlending,
    });
    const instancedPackets = new THREE.InstancedMesh(packetGeo, packetMat, packetCount);
    instancedPackets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    networkGroup.add(instancedPackets);

    // Set initial packet colors
    packets.forEach((pkt, idx) => {
      instancedPackets.setColorAt(idx, pkt.color);
    });
    if (instancedPackets.instanceColor) {
      instancedPackets.instanceColor.needsUpdate = true;
    }

    // --- SCARCITY MICRO-PARTICLE DUST (Ambient 2.1M token atmosphere) ---
    const dustCount = 140;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let d = 0; d < dustCount; d++) {
      const u = pseudoRandom(d * 13 + 3);
      const v = pseudoRandom(d * 29 + 7);
      const w = pseudoRandom(d * 41 + 11);

      const r = 1.4 + w * 2.2;
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);

      dustPositions[d * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[d * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[d * 3 + 2] = r * Math.cos(phi);

      const isGold = d % 3 !== 0;
      dustColors[d * 3] = isGold ? 0.95 : 0.35;
      dustColors[d * 3 + 1] = isGold ? 0.75 : 0.75;
      dustColors[d * 3 + 2] = isGold ? 0.3 : 1.0;
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    networkGroup.add(dustPoints);

    // --- SOPHISTICATED STUDIO LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x181510, 2.2);
    scene.add(ambientLight);

    // 1. Primary Warm Gold Key Light
    const keyGoldLight = new THREE.PointLight(0xF59E0B, 4.5, 14);
    keyGoldLight.position.set(3.5, 3.5, 4.0);
    scene.add(keyGoldLight);

    // 2. Secondary Electric Cyan Accent Light (Depth and contrast)
    const cyanRimLight = new THREE.PointLight(0x0284C7, 3.8, 12);
    cyanRimLight.position.set(-3.5, -2.5, 3.0);
    scene.add(cyanRimLight);

    // 3. Crisp Top Fill Light
    const whiteTopLight = new THREE.DirectionalLight(0xFFFFFF, 1.4);
    whiteTopLight.position.set(0, 5, 2);
    scene.add(whiteTopLight);

    // --- INTERACTIVE POINTER CONTROLS ---
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      lastPointerRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current) {
        const deltaX = clientX - lastPointerRef.current.x;
        const deltaY = clientY - lastPointerRef.current.y;

        targetRotationRef.current.y += deltaX * 0.007;
        targetRotationRef.current.x += deltaY * 0.007;

        // Clamp vertical tilt to avoid flipping
        targetRotationRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotationRef.current.x));

        lastPointerRef.current = { x: clientX, y: clientY };
      } else {
        // Subtle hover parallax
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationRef.current.y += normX * 0.0006;
        targetRotationRef.current.x += -normY * 0.0006;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElem.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 420;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- CONTINUOUS ANIMATION LOOP ---
    let clock = new THREE.Clock();
    const packetObj = new THREE.Object3D();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // 1. Smooth rotation interpolation
      if (!isDraggingRef.current && !prefersReducedMotionRef.current) {
        targetRotationRef.current.y += 0.0028; // Constant gentle drift
      }

      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      networkGroup.rotation.x = currentRotationRef.current.x + Math.sin(elapsedTime * 0.35) * 0.04;
      networkGroup.rotation.y = currentRotationRef.current.y;
      networkGroup.rotation.z = Math.cos(elapsedTime * 0.28) * 0.03;

      // 2. Pulse nodes with gentle, organic breathing waves
      nodes.forEach((node, idx) => {
        const pulse = Math.sin(elapsedTime * node.pulseSpeed + node.pulsePhase);
        const dynamicScale = node.baseScale * (1 + pulse * 0.16);

        dummyObj.position.copy(node.position);
        dummyObj.scale.setScalar(dynamicScale);
        dummyObj.updateMatrix();
        instancedNodes.setMatrixAt(idx, dummyObj.matrix);

        // Synchronize halo sprites
        const halo = glowSprites[idx];
        if (halo) {
          const spriteScale = halo.baseScale * (1 + pulse * 0.22);
          halo.sprite.scale.set(spriteScale, spriteScale, 1);
          halo.sprite.material.opacity = (node.type === 'hub' ? 0.75 : 0.45) * (1 + pulse * 0.25);
        }
      });
      instancedNodes.instanceMatrix.needsUpdate = true;

      // 3. Travel data packets along network paths
      packets.forEach((pkt, pIdx) => {
        if (!prefersReducedMotionRef.current) {
          pkt.progress += pkt.speed;
        }

        if (pkt.progress >= 1.0) {
          // Packet reached destination node: pick a new connection
          pkt.progress = 0;
          const currentDest = pkt.toNode;
          const availableConns = nodes[currentDest].connections;
          pkt.fromNode = currentDest;
          if (availableConns.length > 0) {
            const nextIdx = Math.floor(Math.random() * availableConns.length);
            pkt.toNode = availableConns[nextIdx];
          } else {
            // Pick a random hub
            pkt.toNode = Math.floor(Math.random() * clusterCenters.length);
          }
        }

        const pStart = nodes[pkt.fromNode].position;
        const pEnd = nodes[pkt.toNode].position;
        const currentPos = new THREE.Vector3().lerpVectors(pStart, pEnd, pkt.progress);

        // Add subtle arc
        const midArc = Math.sin(pkt.progress * Math.PI) * 0.04;
        currentPos.y += midArc;

        packetObj.position.copy(currentPos);
        packetObj.scale.setScalar(pkt.size);
        packetObj.updateMatrix();
        instancedPackets.setMatrixAt(pIdx, packetObj.matrix);
      });
      instancedPackets.instanceMatrix.needsUpdate = true;

      // 4. Subtle rotation for ambient dust
      dustPoints.rotation.y = elapsedTime * 0.015;
      dustPoints.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      domElem.removeEventListener('mousedown', handlePointerDown);
      domElem.removeEventListener('touchstart', handlePointerDown);

      // Dispose Three.js resources
      sphereGeo.dispose();
      nodeMat.dispose();
      goldGlowTex.dispose();
      blueGlowTex.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ minHeight: '340px' }}
      role="img"
      aria-label="Animated 3D Living Blockchain Network with glowing gold and electric-blue interconnected nodes"
    >
      {/* WebGL Fallback (Graceful SVG/Canvas fallback if WebGL fails) */}
      {!webGlSupported && (
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full max-w-[380px] aspect-square animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFEAA7" stopOpacity="1" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#B8661B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="1" />
              <stop offset="50%" stopColor="#0284C7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="400" fill="#0A0A0E" rx="24" />
          {/* Fallback lines */}
          <line x1="200" y1="120" x2="110" y2="240" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="200" y1="120" x2="290" y2="240" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="110" y1="240" x2="290" y2="240" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="200" y1="120" x2="200" y2="300" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="110" y1="240" x2="200" y2="300" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="290" y1="240" x2="200" y2="300" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.5" />
          {/* Nodes */}
          <circle cx="200" cy="120" r="18" fill="url(#hubGlow)" />
          <circle cx="110" cy="240" r="14" fill="url(#hubGlow)" />
          <circle cx="290" cy="240" r="14" fill="url(#blueGlow)" />
          <circle cx="200" cy="300" r="12" fill="url(#hubGlow)" />
        </svg>
      )}
    </div>
  );
};
