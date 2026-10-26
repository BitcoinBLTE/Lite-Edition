import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Knowledge3DVisualProps {
  className?: string;
}

export const Knowledge3DVisual: React.FC<Knowledge3DVisualProps> = ({ className = '' }) => {
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
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const prismGroup = new THREE.Group();
    scene.add(prismGroup);

    // ==========================================
    // 1. Refractive Knowledge Prism (Dodecahedron)
    // ==========================================
    const prismGeom = new THREE.DodecahedronGeometry(1.2, 0);
    const prismMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x4338ca,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.85,
    });
    const prism = new THREE.Mesh(prismGeom, prismMat);
    prismGroup.add(prism);

    // Wireframe overlay in gold
    const wireGeom = new THREE.DodecahedronGeometry(1.22, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wire = new THREE.Mesh(wireGeom, wireMat);
    prismGroup.add(wire);

    // Concentric orbiting question filament rings
    const ringGeom = new THREE.TorusGeometry(2.2, 0.015, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 3;
    prismGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeom, ringMat);
    ring2.rotation.y = Math.PI / 3;
    prismGroup.add(ring2);

    // Particle cloud
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
      color: 0xfde047,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(pGeom, pMat);
    prismGroup.add(particles);

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
        prism.rotation.x += 0.01;
        prism.rotation.y += 0.012;
        wire.rotation.x -= 0.008;
        wire.rotation.y -= 0.01;

        ring1.rotation.z += 0.006;
        ring2.rotation.z -= 0.006;

        particles.rotation.y += 0.001;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        prismGroup.rotation.x = curRotX;
        prismGroup.rotation.y = curRotY + elapsed * 0.02;
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
      prismGeom.dispose();
      prismMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Holographic Knowledge Base</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[240px] sm:h-[280px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Holographic Knowledge Base Visual"
    />
  );
};
