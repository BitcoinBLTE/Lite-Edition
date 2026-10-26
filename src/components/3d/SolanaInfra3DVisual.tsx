import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface SolanaInfra3DVisualProps {
  className?: string;
}

export const SolanaInfra3DVisual: React.FC<SolanaInfra3DVisualProps> = ({ className = '' }) => {
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
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const solGroup = new THREE.Group();
    scene.add(solGroup);

    // ==========================================
    // 1. Proof-of-History Clockwork Chronometer Rings
    // ==========================================
    const ring1Geom = new THREE.TorusGeometry(2.2, 0.08, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x064e3b,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    solGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.6, 0.06, 16, 64);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = Math.PI / 4;
    solGroup.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(1.0, 0.05, 16, 64);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.y = Math.PI / 3;
    solGroup.add(ring3);

    // ==========================================
    // 2. High-Speed Core Pulse (65k TPS Engine)
    // ==========================================
    const coreGeom = new THREE.OctahedronGeometry(0.5, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      metalness: 0.98,
      roughness: 0.1,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.6,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    solGroup.add(core);

    // High velocity particle stream along the axis
    const pCount = 70;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSpeeds: number[] = [];

    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.4 + Math.random() * 2.2;
      pPos[i * 3] = Math.cos(a) * r;
      pPos[i * 3 + 1] = Math.sin(a) * r;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      pSpeeds.push(0.04 + Math.random() * 0.06);
    }

    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.065,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    solGroup.add(particles);

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
        // High-speed PoH clock rotations
        ring1.rotation.z += 0.012;
        ring2.rotation.x += 0.016;
        ring2.rotation.y += 0.008;
        ring3.rotation.y -= 0.02;

        core.rotation.x += 0.03;
        core.rotation.y += 0.03;

        // Sub-second pulse
        const pulse = 1.0 + Math.sin(elapsed * 12.0) * 0.1;
        core.scale.set(pulse, pulse, pulse);

        // Particle stream passing along Z-axis
        const positions = pGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < pCount; i++) {
          positions[i * 3 + 2] += pSpeeds[i];
          if (positions[i * 3 + 2] > 3) {
            positions[i * 3 + 2] = -3;
          }
        }
        pGeom.attributes.position.needsUpdate = true;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        solGroup.rotation.x = curRotX;
        solGroup.rotation.y = curRotY + elapsed * 0.02;
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
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      ring3Geom.dispose();
      ring3Mat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Solana Infrastructure Pipeline</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Solana High-Throughput Proof-of-History Infrastructure Visual"
    />
  );
};
