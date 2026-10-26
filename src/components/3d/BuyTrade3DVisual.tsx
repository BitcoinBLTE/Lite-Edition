import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCoinFaceTexture, setupStudioLighting } from './threeUtils';

interface BuyTrade3DVisualProps {
  className?: string;
}

export const BuyTrade3DVisual: React.FC<BuyTrade3DVisualProps> = ({ className = '' }) => {
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
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.25);

    const tradeGroup = new THREE.Group();
    scene.add(tradeGroup);

    // ==========================================
    // 1. Dual Interlocking AMM Liquidity Rings (SOL & BLTE)
    // ==========================================
    // SOL Pool Ring (Emerald)
    const solRingGeom = new THREE.TorusGeometry(1.8, 0.16, 24, 80);
    const solRingMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x064e3b,
      emissiveIntensity: 0.45,
    });
    const solRing = new THREE.Mesh(solRingGeom, solRingMat);
    solRing.position.set(-1.1, 0, 0);
    solRing.rotation.y = Math.PI / 4;
    tradeGroup.add(solRing);

    // BLTE Pool Ring (Copper-Gold)
    const blteRingGeom = new THREE.TorusGeometry(1.8, 0.16, 24, 80);
    const blteRingMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x9a3412,
      emissiveIntensity: 0.45,
    });
    const blteRing = new THREE.Mesh(blteRingGeom, blteRingMat);
    blteRing.position.set(1.1, 0, 0);
    blteRing.rotation.y = -Math.PI / 4;
    tradeGroup.add(blteRing);

    // ==========================================
    // 2. 3D Coins in Swap Transit
    // ==========================================
    const btcTex = createCoinFaceTexture('btc', 256);
    const blteTex = createCoinFaceTexture('blte', 256);

    const miniCoinGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32);

    const solCoinMat = new THREE.MeshStandardMaterial({
      map: btcTex,
      metalness: 0.88,
      roughness: 0.2,
    });
    const solCoin = new THREE.Mesh(miniCoinGeom, solCoinMat);
    solCoin.rotation.x = Math.PI / 2;
    solCoin.position.set(-1.8, 0.2, 0.5);
    tradeGroup.add(solCoin);

    const blteCoinMat = new THREE.MeshStandardMaterial({
      map: blteTex,
      metalness: 0.92,
      roughness: 0.2,
    });
    const blteCoin = new THREE.Mesh(miniCoinGeom, blteCoinMat);
    blteCoin.rotation.x = Math.PI / 2;
    blteCoin.position.set(1.8, -0.2, 0.5);
    tradeGroup.add(blteCoin);

    // ==========================================
    // 3. Central Swap Portal Ring (Glowing Vortex)
    // ==========================================
    const vortexGeom = new THREE.TorusGeometry(0.85, 0.04, 16, 64);
    const vortexMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.6,
    });
    const vortex = new THREE.Mesh(vortexGeom, vortexMat);
    vortex.rotation.x = Math.PI / 2;
    tradeGroup.add(vortex);

    // Flowing swap particle stream between pools
    const pCount = 60;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 4;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeom, pMat);
    tradeGroup.add(particles);

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
        solRing.rotation.z += 0.006;
        blteRing.rotation.z -= 0.006;

        solCoin.rotation.z += 0.015;
        blteCoin.rotation.z += 0.015;

        // Oscillating swap trajectory
        solCoin.position.x = -1.5 + Math.sin(elapsed * 1.5) * 0.6;
        blteCoin.position.x = 1.5 - Math.sin(elapsed * 1.5) * 0.6;

        vortex.rotation.z += 0.02;
        particles.rotation.y += 0.004;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        tradeGroup.rotation.x = curRotX + 0.1;
        tradeGroup.rotation.y = curRotY + elapsed * 0.02;
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
      solRingGeom.dispose();
      solRingMat.dispose();
      blteRingGeom.dispose();
      blteRingMat.dispose();
      miniCoinGeom.dispose();
      solCoinMat.dispose();
      blteCoinMat.dispose();
      btcTex.dispose();
      blteTex.dispose();
      vortexGeom.dispose();
      vortexMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D DEX Liquidity Swap Portal</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D DEX Liquidity Pool and Token Swap Visual"
    />
  );
};
