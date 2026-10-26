import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Ecosystem3DVisualProps {
  className?: string;
}

export const Ecosystem3DVisual: React.FC<Ecosystem3DVisualProps> = ({ className = '' }) => {
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
    camera.position.set(0, 1.5, 8.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.2);

    const ecoGroup = new THREE.Group();
    scene.add(ecoGroup);

    // ==========================================
    // 1. Central Core: BLTE Blockchain Sun
    // ==========================================
    const coreGeom = new THREE.SphereGeometry(0.9, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xb45309,
      emissiveIntensity: 0.6,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    ecoGroup.add(core);

    const haloGeom = new THREE.SphereGeometry(1.05, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const halo = new THREE.Mesh(haloGeom, haloMat);
    core.add(halo);

    // ==========================================
    // 2. 4 Connected Ecosystem Satellite Apps
    // ==========================================
    const appData = [
      { name: 'Raydium DEX', color: 0x38bdf8, dist: 2.2, speed: 0.8, size: 0.35 },
      { name: 'Streamflow Staking', color: 0x8b5cf6, dist: 2.8, speed: 0.5, size: 0.38 },
      { name: 'Solscan Explorer', color: 0x10b981, dist: 3.4, speed: 0.35, size: 0.32 },
      { name: 'BLTE Wallet', color: 0xf97316, dist: 3.9, speed: 0.25, size: 0.4 },
    ];

    const satellites: { mesh: THREE.Mesh; dist: number; speed: number; angle: number }[] = [];

    appData.forEach((app, idx) => {
      // Orbital Ring Track
      const orbitGeom = new THREE.TorusGeometry(app.dist, 0.012, 16, 100);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: app.color,
        transparent: true,
        opacity: 0.22,
      });
      const orbit = new THREE.Mesh(orbitGeom, orbitMat);
      orbit.rotation.x = Math.PI / 2 + (idx - 1.5) * 0.12;
      ecoGroup.add(orbit);

      // Satellite Orb
      const satGeom = new THREE.DodecahedronGeometry(app.size, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: app.color,
        metalness: 0.9,
        roughness: 0.2,
        emissive: app.color,
        emissiveIntensity: 0.4,
      });
      const satMesh = new THREE.Mesh(satGeom, satMat);
      ecoGroup.add(satMesh);

      satellites.push({
        mesh: satMesh,
        dist: app.dist,
        speed: app.speed,
        angle: (idx / appData.length) * Math.PI * 2,
      });
    });

    // Particle field
    const pCount = 50;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    ecoGroup.add(particles);

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
        core.rotation.y += 0.01;
        halo.rotation.x += 0.015;

        satellites.forEach((sat) => {
          sat.angle += sat.speed * 0.012;
          sat.mesh.position.set(
            Math.cos(sat.angle) * sat.dist,
            Math.sin(sat.angle * 1.5) * 0.3,
            Math.sin(sat.angle) * sat.dist
          );
          sat.mesh.rotation.x += 0.02;
          sat.mesh.rotation.y += 0.02;
        });

        particles.rotation.y += 0.001;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        ecoGroup.rotation.x = curRotX + 0.1;
        ecoGroup.rotation.y = curRotY + elapsed * 0.02;
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
      coreGeom.dispose();
      coreMat.dispose();
      haloGeom.dispose();
      haloMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Ecosystem Apps</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Connected Crypto Ecosystem Visual"
    />
  );
};
