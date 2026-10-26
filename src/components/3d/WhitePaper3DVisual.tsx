import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface WhitePaper3DVisualProps {
  className?: string;
}

export const WhitePaper3DVisual: React.FC<WhitePaper3DVisualProps> = ({ className = '' }) => {
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
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const docGroup = new THREE.Group();
    scene.add(docGroup);

    // ==========================================
    // 1. 3D Floating Technical Blueprint Document (Stacked Pages)
    // ==========================================
    const pageCount = 4;
    const pages: THREE.Mesh[] = [];

    for (let i = 0; i < pageCount; i++) {
      const pageGeom = new THREE.BoxGeometry(2.2, 3.0, 0.04);
      const pageMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x1c1917 : 0x14141c,
        metalness: 0.88,
        roughness: 0.22,
        emissive: i === 0 ? 0x451a03 : 0x0f172a,
        emissiveIntensity: 0.25,
      });
      const page = new THREE.Mesh(pageGeom, pageMat);
      page.position.set(i * 0.08, -i * 0.06, -i * 0.12);
      page.rotation.z = (i - 1.5) * 0.04;
      docGroup.add(page);
      pages.push(page);
    }

    // Top page wireframe blueprint grid
    const gridWireGeom = new THREE.BoxGeometry(2.22, 3.02, 0.05);
    const gridWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const gridWire = new THREE.Mesh(gridWireGeom, gridWireMat);
    pages[0].add(gridWire);

    // Golden Holographic Seal
    const sealGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 32);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xb45309,
      emissiveIntensity: 0.5,
    });
    const seal = new THREE.Mesh(sealGeom, sealMat);
    seal.rotation.x = Math.PI / 2;
    seal.position.set(0.6, -0.9, 0.05);
    pages[0].add(seal);

    // Particle dust
    const pCount = 30;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    docGroup.add(particles);

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
        docGroup.position.y = Math.sin(elapsed * 1.5) * 0.06;
        pages.forEach((p, idx) => {
          p.rotation.y = Math.sin(elapsed * 0.8 + idx * 0.2) * 0.08;
        });

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        docGroup.rotation.x = curRotX + 0.1;
        docGroup.rotation.y = curRotY + 0.2;
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
      gridWireGeom.dispose();
      gridWireMat.dispose();
      sealGeom.dispose();
      sealMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Technical Blueprint Document</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[200px] sm:h-[240px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Floating Technical Blueprint Document Visual"
    />
  );
};
