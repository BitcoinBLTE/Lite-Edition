import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface ProtocolStats3DVisualProps {
  className?: string;
}

export const ProtocolStats3DVisual: React.FC<ProtocolStats3DVisualProps> = ({ className = '' }) => {
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

    setupStudioLighting(scene, 1.15);

    const statsGroup = new THREE.Group();
    scene.add(statsGroup);

    // ==========================================
    // 1. Central 3D Telemetry Cylinder (Vault Core)
    // ==========================================
    const coreCylGeom = new THREE.CylinderGeometry(1.1, 1.1, 2.2, 32);
    const coreCylMat = new THREE.MeshStandardMaterial({
      color: 0x181820,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.25,
    });
    const coreCyl = new THREE.Mesh(coreCylGeom, coreCylMat);
    statsGroup.add(coreCyl);

    // Top & Bottom Gold Rings on the Telemetry Cylinder
    const ringGeom = new THREE.TorusGeometry(1.12, 0.04, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x78350f,
      emissiveIntensity: 0.4,
    });
    const topRing = new THREE.Mesh(ringGeom, ringMat);
    topRing.rotation.x = Math.PI / 2;
    topRing.position.y = 1.0;
    coreCyl.add(topRing);

    const botRing = new THREE.Mesh(ringGeom, ringMat);
    botRing.rotation.x = Math.PI / 2;
    botRing.position.y = -1.0;
    coreCyl.add(botRing);

    // ==========================================
    // 2. Surrounding 3D Telemetry Metric Bars (6 parameters)
    // ==========================================
    const barCount = 6;
    const bars: THREE.Mesh[] = [];
    const barHeights = [1.6, 2.0, 1.4, 2.2, 1.8, 2.4];
    const barColors = [0xf59e0b, 0x10b981, 0x38bdf8, 0xa855f7, 0xf59e0b, 0x10b981];

    for (let i = 0; i < barCount; i++) {
      const h = barHeights[i];
      const geom = new THREE.BoxGeometry(0.32, h, 0.32);
      const mat = new THREE.MeshStandardMaterial({
        color: barColors[i],
        metalness: 0.85,
        roughness: 0.2,
        emissive: barColors[i],
        emissiveIntensity: 0.35,
      });
      const bar = new THREE.Mesh(geom, mat);
      const angle = (i / barCount) * Math.PI * 2;
      const rad = 2.4;
      bar.position.set(Math.cos(angle) * rad, h / 2 - 1.1, Math.sin(angle) * rad);
      statsGroup.add(bar);
      bars.push(bar);
    }

    // ==========================================
    // 3. Radar Sweep Plane (Live On-Chain Scanner)
    // ==========================================
    const radarDiskGeom = new THREE.CircleGeometry(2.8, 64);
    const radarDiskMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const radarDisk = new THREE.Mesh(radarDiskGeom, radarDiskMat);
    radarDisk.rotation.x = Math.PI / 2;
    radarDisk.position.y = -1.1;
    statsGroup.add(radarDisk);

    const sweepLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2.8, 0, 0),
    ]);
    const sweepLineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      linewidth: 2,
    });
    const sweepLine = new THREE.Line(sweepLineGeom, sweepLineMat);
    sweepLine.position.y = -1.09;
    statsGroup.add(sweepLine);

    // Floating data particles
    const pCount = 40;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeom, pMat);
    statsGroup.add(particles);

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
        // Continuous radar scanning
        sweepLine.rotation.y -= 0.04;
        coreCyl.rotation.y += 0.005;

        // Metric bars dynamic breathing
        bars.forEach((bar, i) => {
          const scaleY = 1.0 + Math.sin(elapsed * 2.0 + i) * 0.12;
          bar.scale.y = scaleY;
        });

        particles.rotation.y += 0.002;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        statsGroup.rotation.x = curRotX + 0.15;
        statsGroup.rotation.y = curRotY + elapsed * 0.03;
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
      coreCylGeom.dispose();
      coreCylMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      radarDiskGeom.dispose();
      radarDiskMat.dispose();
      sweepLineGeom.dispose();
      sweepLineMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <img
          src="/assets/aistudio/Learn_more_e8898747.jpg"
          alt="Protocol Statistics Fallback"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D On-Chain Protocol Statistics and Telemetry Visual"
    />
  );
};
