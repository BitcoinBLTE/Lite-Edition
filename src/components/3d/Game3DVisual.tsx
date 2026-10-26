import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCoinFaceTexture, setupStudioLighting } from './threeUtils';

interface Game3DVisualProps {
  className?: string;
}

export const Game3DVisual: React.FC<Game3DVisualProps> = ({ className = '' }) => {
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

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 6.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const gameGroup = new THREE.Group();
    scene.add(gameGroup);

    // ==========================================
    // 1. 3D Cyber Grid Terrain
    // ==========================================
    const gridHelper = new THREE.GridHelper(10, 20, 0xf59e0b, 0x1e293b);
    gridHelper.position.y = -1.2;
    gameGroup.add(gridHelper);

    // ==========================================
    // 2. Central 3D Flying Falcon Emblem
    // ==========================================
    const falconGeom = new THREE.ConeGeometry(0.8, 1.6, 4);
    const falconMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x9a3412,
      emissiveIntensity: 0.5,
    });
    const falcon = new THREE.Mesh(falconGeom, falconMat);
    falcon.rotation.x = Math.PI / 2;
    falcon.rotation.z = Math.PI;
    gameGroup.add(falcon);

    // Wing extensions
    const wingGeom = new THREE.BoxGeometry(2.4, 0.08, 0.6);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.35,
    });
    const wings = new THREE.Mesh(wingGeom, wingMat);
    wings.position.set(0, 0, -0.2);
    falcon.add(wings);

    // ==========================================
    // 3. Floating Collectible 3D Gold Coins
    // ==========================================
    const blteTex = createCoinFaceTexture('blte', 256);
    const coinGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.06, 24);
    const coinMat = new THREE.MeshStandardMaterial({
      map: blteTex,
      metalness: 0.9,
      roughness: 0.2,
    });

    const coins: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(coinGeom, coinMat);
      c.rotation.x = Math.PI / 2;
      c.position.set((i - 1) * 1.5, 0.5 + Math.sin(i) * 0.3, -1.2 + i * 0.8);
      gameGroup.add(c);
      coins.push(c);
    }

    // Particle arcade stars
    const pCount = 40;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeom, pMat);
    gameGroup.add(particles);

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
        // Falcon hovering & banking
        falcon.position.y = Math.sin(elapsed * 2.5) * 0.15;
        falcon.rotation.z = Math.PI + Math.sin(elapsed * 2.0) * 0.15;

        // Rotating collectible coins
        coins.forEach((c, idx) => {
          c.rotation.z += 0.025;
          c.position.y = 0.5 + Math.sin(elapsed * 3.0 + idx) * 0.1;
        });

        gridHelper.position.z = (elapsed * 0.8) % 1.0;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        gameGroup.rotation.x = curRotX + 0.15;
        gameGroup.rotation.y = curRotY;
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
      gridHelper.dispose();
      falconGeom.dispose();
      falconMat.dispose();
      wingGeom.dispose();
      wingMat.dispose();
      coinGeom.dispose();
      coinMat.dispose();
      blteTex.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Falcon Arcade Game</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[200px] sm:h-[230px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Arcade Gaming and Falcon Collectibles Visual"
    />
  );
};
