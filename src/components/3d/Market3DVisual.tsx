import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCoinFaceTexture, setupStudioLighting } from './threeUtils';

interface Market3DVisualProps {
  className?: string;
}

export const Market3DVisual: React.FC<Market3DVisualProps> = ({ className = '' }) => {
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
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const marketGroup = new THREE.Group();
    scene.add(marketGroup);

    // ==========================================
    // 1. 3D Orderbook Depth Blocks (Bids: Green, Asks: Coral)
    // ==========================================
    const depthBlocks: THREE.Mesh[] = [];
    const stepCount = 5;

    // Bids (Buy Depth on the left - Emerald Green)
    for (let i = 0; i < stepCount; i++) {
      const h = 0.4 + i * 0.35;
      const geom = new THREE.BoxGeometry(0.35, h, 0.8);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0x064e3b,
        emissiveIntensity: 0.4,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(-2.2 + i * 0.45, h / 2 - 1.0, 0);
      marketGroup.add(mesh);
      depthBlocks.push(mesh);
    }

    // Asks (Sell Depth on the right - Amber/Coral)
    for (let i = 0; i < stepCount; i++) {
      const h = 1.8 - i * 0.35;
      const geom = new THREE.BoxGeometry(0.35, h, 0.8);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0x7c2d12,
        emissiveIntensity: 0.4,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(0.4 + i * 0.45, h / 2 - 1.0, 0);
      marketGroup.add(mesh);
      depthBlocks.push(mesh);
    }

    // ==========================================
    // 2. Floating 3D BLTE Coin at Market Equilibrium
    // ==========================================
    const blteTex = createCoinFaceTexture('blte', 256);
    const coinGeom = new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32);
    const coinMat = new THREE.MeshStandardMaterial({
      map: blteTex,
      metalness: 0.95,
      roughness: 0.18,
    });
    const coin = new THREE.Mesh(coinGeom, coinMat);
    coin.rotation.x = Math.PI / 2.2;
    coin.position.set(0, 0.8, 0);
    marketGroup.add(coin);

    // ==========================================
    // 3. Dynamic Price Wave Spline
    // ==========================================
    const curvePoints = [
      new THREE.Vector3(-2.8, -0.6, 0.4),
      new THREE.Vector3(-1.4, -0.2, 0.4),
      new THREE.Vector3(0, 0.5, 0.4),
      new THREE.Vector3(1.4, 0.3, 0.4),
      new THREE.Vector3(2.8, 0.9, 0.4),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeom = new THREE.TubeGeometry(curve, 40, 0.04, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const tube = new THREE.Mesh(tubeGeom, tubeMat);
    marketGroup.add(tube);

    // Floating price particles
    const pCount = 35;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    marketGroup.add(particles);

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
        coin.rotation.z += 0.015;
        coin.position.y = 0.8 + Math.sin(elapsed * 2.0) * 0.08;

        // Dynamic depth fluctuation
        depthBlocks.forEach((block, idx) => {
          block.scale.y = 1.0 + Math.sin(elapsed * 2.5 + idx) * 0.06;
        });

        particles.rotation.y += 0.002;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        marketGroup.rotation.x = curRotX + 0.1;
        marketGroup.rotation.y = curRotY;
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
      coinMat.dispose();
      blteTex.dispose();
      tubeGeom.dispose();
      tubeMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Market Liquidity Depth</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[300px] md:h-[340px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Orderbook and Market Liquidity Depth Visual"
    />
  );
};
