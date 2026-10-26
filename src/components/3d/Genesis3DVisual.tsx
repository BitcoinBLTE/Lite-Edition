import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Genesis3DVisualProps {
  className?: string;
}

export const Genesis3DVisual: React.FC<Genesis3DVisualProps> = ({ className = '' }) => {
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
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const genesisGroup = new THREE.Group();
    scene.add(genesisGroup);

    // ==========================================
    // 1. Central 3D Genesis Monolith (Cryptographic Ledger Block)
    // ==========================================
    const blockGeom = new THREE.BoxGeometry(2.0, 2.6, 0.5);
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x451a03,
      emissiveIntensity: 0.2,
    });
    const blockMesh = new THREE.Mesh(blockGeom, blockMat);
    genesisGroup.add(blockMesh);

    // Golden wireframe framing on the block
    const wireGeom = new THREE.BoxGeometry(2.02, 2.62, 0.52);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    genesisGroup.add(wireMesh);

    // Embedded 3D Bitcoin & BLTE Emblem Seal on the front of the block
    const sealGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x78350f,
      emissiveIntensity: 0.4,
    });
    const seal = new THREE.Mesh(sealGeom, sealMat);
    seal.rotation.x = Math.PI / 2;
    seal.position.z = 0.28;
    blockMesh.add(seal);

    // ==========================================
    // 2. Chained Sequential Blocks (Blockchain Links)
    // ==========================================
    const chainBlocks: THREE.Mesh[] = [];
    const chainCount = 3;

    for (let i = 0; i < chainCount; i++) {
      const smallBlockGeom = new THREE.BoxGeometry(0.65, 0.65, 0.65);
      const smallBlockMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0xf59e0b : i === 1 ? 0x10b981 : 0x38bdf8,
        metalness: 0.85,
        roughness: 0.25,
        emissive: i === 0 ? 0x78350f : i === 1 ? 0x064e3b : 0x0c4a6e,
        emissiveIntensity: 0.3,
      });
      const cb = new THREE.Mesh(smallBlockGeom, smallBlockMat);
      const angle = (i / chainCount) * Math.PI * 2;
      cb.position.set(Math.cos(angle) * 3.0, Math.sin(angle) * 1.8, (i - 1) * 0.8);
      genesisGroup.add(cb);
      chainBlocks.push(cb);

      // Connecting laser beam from Genesis Block to child block
      const linkGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        cb.position,
      ]);
      const linkMat = new THREE.LineDashedMaterial({
        color: 0xf59e0b,
        dashSize: 0.2,
        gapSize: 0.1,
        transparent: true,
        opacity: 0.6,
      });
      const link = new THREE.Line(linkGeom, linkMat);
      link.computeLineDistances();
      genesisGroup.add(link);
    }

    // ==========================================
    // 3. Halving Cycles & Mathematical Spiral
    // ==========================================
    const spiralPoints: THREE.Vector3[] = [];
    for (let t = 0; t <= Math.PI * 4; t += 0.1) {
      const r = 1.2 + t * 0.28;
      spiralPoints.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, Math.sin(t * 2) * 0.4));
    }
    const spiralGeom = new THREE.BufferGeometry().setFromPoints(spiralPoints);
    const spiralMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
    });
    const spiral = new THREE.Line(spiralGeom, spiralMat);
    genesisGroup.add(spiral);

    // Particle field
    const pCount = 50;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    genesisGroup.add(particles);

    // Mouse interaction
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
        // Slow rotation and floating motion
        blockMesh.rotation.y = Math.sin(elapsed * 0.6) * 0.15;
        blockMesh.position.y = Math.sin(elapsed * 1.2) * 0.08;

        chainBlocks.forEach((cb, i) => {
          cb.rotation.x += 0.01;
          cb.rotation.y += 0.015;
          cb.position.y += Math.sin(elapsed * 1.5 + i) * 0.004;
        });

        spiral.rotation.z += 0.002;
        particles.rotation.y += 0.001;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        genesisGroup.rotation.x = curRotX;
        genesisGroup.rotation.y = curRotY + elapsed * 0.03;
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
      blockGeom.dispose();
      blockMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      sealGeom.dispose();
      sealMat.dispose();
      spiralGeom.dispose();
      spiralMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <img
          src="/assets/aistudio/Learn_more_d3ca6810.jpg"
          alt="Genesis Ledger Block Visual"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Holographic Genesis Blockchain Ledger Visual"
    />
  );
};
