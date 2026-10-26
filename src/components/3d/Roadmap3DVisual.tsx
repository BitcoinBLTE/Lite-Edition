import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Roadmap3DVisualProps {
  className?: string;
}

export const Roadmap3DVisual: React.FC<Roadmap3DVisualProps> = ({ className = '' }) => {
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

    setupStudioLighting(scene, 1.2);

    const roadmapGroup = new THREE.Group();
    scene.add(roadmapGroup);

    // ==========================================
    // 1. 4 Milestone Beacon Obelisks (Stage 01 to 04)
    // ==========================================
    const stageColors = [0xf59e0b, 0x10b981, 0x38bdf8, 0xa855f7];
    const obelisks: THREE.Mesh[] = [];
    const waypoints: THREE.Vector3[] = [];

    stageColors.forEach((color, idx) => {
      const x = (idx - 1.5) * 1.8;
      const y = Math.sin(idx * 0.8) * 0.4;
      const z = (idx % 2 === 0 ? 0.4 : -0.4);
      const pos = new THREE.Vector3(x, y, z);
      waypoints.push(pos);

      const obeliskGeom = new THREE.CylinderGeometry(0.2, 0.35, 1.4, 6);
      const obeliskMat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.9,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: idx === 0 ? 0.6 : 0.25,
      });
      const obelisk = new THREE.Mesh(obeliskGeom, obeliskMat);
      obelisk.position.copy(pos);
      roadmapGroup.add(obelisk);
      obelisks.push(obelisk);

      // Floating halo on top of each beacon
      const haloGeom = new THREE.TorusGeometry(0.3, 0.02, 16, 32);
      const haloMat = new THREE.MeshBasicMaterial({ color: color });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.rotation.x = Math.PI / 2;
      halo.position.set(x, y + 0.85, z);
      roadmapGroup.add(halo);
    });

    // ==========================================
    // 2. Interconnecting Milestone Light Pathway (Spline Curve)
    // ==========================================
    const curve = new THREE.CatmullRomCurve3(waypoints);
    const tubeGeom = new THREE.TubeGeometry(curve, 64, 0.05, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x78350f,
      emissiveIntensity: 0.5,
    });
    const tube = new THREE.Mesh(tubeGeom, tubeMat);
    roadmapGroup.add(tube);

    // Particle field
    const pCount = 50;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    roadmapGroup.add(particles);

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
        obelisks.forEach((ob, idx) => {
          ob.rotation.y += 0.015;
          ob.position.y = waypoints[idx].y + Math.sin(elapsed * 1.5 + idx) * 0.06;
        });

        // Stage 01 pulse
        const s1Pulse = 1.0 + Math.sin(elapsed * 3.0) * 0.08;
        obelisks[0].scale.set(s1Pulse, s1Pulse, s1Pulse);

        particles.rotation.y += 0.002;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        roadmapGroup.rotation.x = curRotX + 0.1;
        roadmapGroup.rotation.y = curRotY + elapsed * 0.02;
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
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Roadmap Milestone Pathway</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Holographic Roadmap Milestone Pathway Visual"
    />
  );
};
