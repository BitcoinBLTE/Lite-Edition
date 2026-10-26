import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCoinFaceTexture, setupStudioLighting } from './threeUtils';

interface Tokenomics3DVisualProps {
  className?: string;
  onSelectSegment?: (id: string) => void;
}

export const Tokenomics3DVisual: React.FC<Tokenomics3DVisualProps> = ({
  className = '',
  onSelectSegment,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 7.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.25);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ==========================================
    // 1. Central 3D Rotating BLTE Coin
    // ==========================================
    const blteTex = createCoinFaceTexture('blte', 512);
    const coinGeom = new THREE.CylinderGeometry(1.2, 1.2, 0.16, 64);

    const copperRim = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x9a3412,
      emissiveIntensity: 0.3,
    });
    const coinFace = new THREE.MeshStandardMaterial({
      map: blteTex,
      metalness: 0.9,
      roughness: 0.25,
    });

    const coin = new THREE.Mesh(coinGeom, [copperRim, coinFace, coinFace]);
    coin.position.set(0, 0.4, 0);
    coin.rotation.set(0.3, 0, 0);
    rootGroup.add(coin);

    // ==========================================
    // 2. 3D Segmented Distribution Ring
    // ==========================================
    // Exactly 4 allocations:
    // Fair Launch: 55% -> 0 to 198 deg
    // Liquidity: 27.5% -> 198 to 297 deg
    // Staking: 10% -> 297 to 333 deg
    // Dev: 7.5% -> 333 to 360 deg
    const allocations = [
      { id: 'fair-launch', startAngle: 0, angleSpan: (55 / 100) * Math.PI * 2, color: 0xf59e0b, emissive: 0x78350f },
      { id: 'liquidity-pool', startAngle: (55 / 100) * Math.PI * 2, angleSpan: (27.5 / 100) * Math.PI * 2, color: 0x10b981, emissive: 0x064e3b },
      { id: 'staking-rewards', startAngle: (82.5 / 100) * Math.PI * 2, angleSpan: (10 / 100) * Math.PI * 2, color: 0x8b5cf6, emissive: 0x4c1d95 },
      { id: 'development-marketing', startAngle: (92.5 / 100) * Math.PI * 2, angleSpan: (7.5 / 100) * Math.PI * 2, color: 0x3b82f6, emissive: 0x1d4ed8 },
    ];

    const segmentMeshes: THREE.Mesh[] = [];
    const ringRadius = 2.4;
    const ringTube = 0.12;

    allocations.forEach((alloc) => {
      // Create partial torus with small gap
      const gap = 0.04;
      const arc = alloc.angleSpan - gap;
      const arcGeom = new THREE.TorusGeometry(ringRadius, ringTube, 16, 48, arc);
      const arcMat = new THREE.MeshStandardMaterial({
        color: alloc.color,
        metalness: 0.88,
        roughness: 0.22,
        emissive: alloc.emissive,
        emissiveIntensity: 0.5,
      });
      const arcMesh = new THREE.Mesh(arcGeom, arcMat);
      arcMesh.rotation.x = Math.PI / 2;
      arcMesh.rotation.z = alloc.startAngle;
      arcMesh.position.y = -0.7;
      rootGroup.add(arcMesh);
      segmentMeshes.push(arcMesh);
    });

    // Particle field orbiting the ring
    const particleCount = 60;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = ringRadius + (Math.random() - 0.5) * 0.6;
      pPos[i * 3] = Math.cos(a) * r;
      pPos[i * 3 + 1] = -0.7 + (Math.random() - 0.5) * 0.4;
      pPos[i * 3 + 2] = Math.sin(a) * r;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.055,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeom, pMat);
    rootGroup.add(particles);

    // Mouse parallax
    let targetRotY = 0;
    let targetRotX = 0;
    let curRotY = 0;
    let curRotX = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.35;
      targetRotX = y * 0.25;
    };
    container.addEventListener('pointermove', handlePointerMove);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth continuous 3D coin rotation
        coin.rotation.y += 0.01;
        coin.position.y = 0.4 + Math.sin(elapsed * 1.5) * 0.06;

        // Slow rotation of segmented distribution ring
        segmentMeshes.forEach((mesh, idx) => {
          mesh.rotation.z += 0.003;
        });
        particles.rotation.y += 0.003;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        rootGroup.rotation.x = curRotX + 0.2;
        rootGroup.rotation.y = curRotY;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coinGeom.dispose();
      copperRim.dispose();
      coinFace.dispose();
      blteTex.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, [onSelectSegment]);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Tokenomics Matrix</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[280px] sm:h-[340px] md:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Rotating BLTE Coin and Token Distribution Ring"
    />
  );
};
