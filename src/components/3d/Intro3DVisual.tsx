import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCoinFaceTexture, setupStudioLighting } from './threeUtils';

interface Intro3DVisualProps {
  className?: string;
}

export const Intro3DVisual: React.FC<Intro3DVisualProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
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
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 1. Bitcoin 3D Coin (Gold)
    // ==========================================
    const btcTexture = createCoinFaceTexture('btc', 512);
    const coinGeom = new THREE.CylinderGeometry(1.2, 1.2, 0.14, 64);

    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.95,
      roughness: 0.22,
      emissive: 0x78350f,
      emissiveIntensity: 0.15,
    });
    const btcFaceMat = new THREE.MeshStandardMaterial({
      map: btcTexture,
      metalness: 0.88,
      roughness: 0.28,
    });

    const btcCoin = new THREE.Mesh(coinGeom, [goldRimMat, btcFaceMat, btcFaceMat]);
    btcCoin.position.set(-1.45, 0.2, 0);
    btcCoin.rotation.set(0.25, 0.45, 0.1);
    mainGroup.add(btcCoin);

    // ==========================================
    // 2. BLTE 3D Coin (Metallic Copper-Gold)
    // ==========================================
    const blteTexture = createCoinFaceTexture('blte', 512);
    const blteCoinGeom = new THREE.CylinderGeometry(1.3, 1.3, 0.16, 64);

    const copperRimMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.96,
      roughness: 0.2,
      emissive: 0x9a3412,
      emissiveIntensity: 0.25,
    });
    const blteFaceMat = new THREE.MeshStandardMaterial({
      map: blteTexture,
      metalness: 0.9,
      roughness: 0.25,
    });

    const blteCoin = new THREE.Mesh(blteCoinGeom, [copperRimMat, blteFaceMat, blteFaceMat]);
    blteCoin.position.set(1.4, -0.15, 0.4);
    blteCoin.rotation.set(-0.2, -0.4, -0.08);
    mainGroup.add(blteCoin);

    // ==========================================
    // 3. Futuristic Floating Cryptographic Orbit Rings
    // ==========================================
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const ringGeom1 = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeom1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ringGeom2 = new THREE.TorusGeometry(3.2, 0.015, 16, 100);
    const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    mainGroup.add(ringMesh2);

    // ==========================================
    // 4. Floating Ambient Particle Field
    // ==========================================
    const particleCount = 70;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.065,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    mainGroup.add(particles);

    // Mouse parallax tracking
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.35;
      targetRotX = y * 0.25;
    };

    container.addEventListener('pointermove', handlePointerMove);

    // Visibility-based animation execution
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous slow elegant coin rotation
        btcCoin.rotation.y += 0.008;
        blteCoin.rotation.y -= 0.009;

        // Gentle floating bob
        btcCoin.position.y = 0.2 + Math.sin(elapsed * 1.2) * 0.08;
        blteCoin.position.y = -0.15 + Math.cos(elapsed * 1.4) * 0.09;

        // Orbit ring slow rotation
        ringMesh1.rotation.z += 0.003;
        ringMesh2.rotation.z -= 0.002;
        particles.rotation.y += 0.001;

        // Smooth mouse parallax lerp
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;
        mainGroup.rotation.x = currentRotX;
        mainGroup.rotation.y = currentRotY;
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
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      coinGeom.dispose();
      blteCoinGeom.dispose();
      goldRimMat.dispose();
      btcFaceMat.dispose();
      copperRimMat.dispose();
      blteFaceMat.dispose();
      ringGeom1.dispose();
      ringGeom2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      btcTexture.dispose();
      blteTexture.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <img
          src="/assets/aistudio/Btc_explain_de14705e.jpg"
          alt="Bitcoin and BLTE 3D Digital Precedent"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D Bitcoin and BLTE Coins in Futuristic Digital Environment"
    />
  );
};
