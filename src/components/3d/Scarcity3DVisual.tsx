import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Scarcity3DVisualProps {
  className?: string;
}

export const Scarcity3DVisual: React.FC<Scarcity3DVisualProps> = ({ className = '' }) => {
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

    const scarcityGroup = new THREE.Group();
    scene.add(scarcityGroup);

    // ==========================================
    // 1. Outer Ring: 21,000,000 BTC Supply Orbit
    // ==========================================
    const btcRingGeom = new THREE.TorusGeometry(3.0, 0.05, 16, 100);
    const btcRingMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x78350f,
      emissiveIntensity: 0.3,
    });
    const btcRing = new THREE.Mesh(btcRingGeom, btcRingMat);
    scarcityGroup.add(btcRing);

    // ==========================================
    // 2. Inner Ring: 2,100,000 BLTE Mathematical 10:1 Scarcity Orbit
    // ==========================================
    const blteRingGeom = new THREE.TorusGeometry(1.6, 0.07, 16, 100);
    const blteRingMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0xc2410c,
      emissiveIntensity: 0.45,
    });
    const blteRing = new THREE.Mesh(blteRingGeom, blteRingMat);
    blteRing.rotation.x = Math.PI / 4;
    scarcityGroup.add(blteRing);

    // ==========================================
    // 3. Central Crystalline Scarcity Core (Octahedron with Gold Refraction)
    // ==========================================
    const coreGeom = new THREE.OctahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.98,
      roughness: 0.15,
      emissive: 0x92400e,
      emissiveIntensity: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    scarcityGroup.add(coreMesh);

    const coreWireGeom = new THREE.OctahedronGeometry(0.88, 0);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
      wireframe: true,
    });
    const coreWire = new THREE.Mesh(coreWireGeom, coreWireMat);
    scarcityGroup.add(coreWire);

    // ==========================================
    // 4. Orbiting Ratio Satellite Nodes (10:1 Ratio Beacons)
    // ==========================================
    const satelliteCount = 10;
    const satellites: THREE.Mesh[] = [];
    const satGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });

    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satGeom, satMat);
      scarcityGroup.add(sat);
      satellites.push(sat);
    }

    // Laser connection rays from outer ring to core
    const rayCount = 6;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const p1 = new THREE.Vector3(Math.cos(angle) * 3.0, Math.sin(angle) * 3.0, 0);
      const rayGeom = new THREE.BufferGeometry().setFromPoints([p1, new THREE.Vector3(0, 0, 0)]);
      const rayMat = new THREE.LineBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.25,
      });
      const ray = new THREE.Line(rayGeom, rayMat);
      scarcityGroup.add(ray);
    }

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
        // Differential counter-rotations
        btcRing.rotation.z += 0.004;
        blteRing.rotation.y += 0.008;
        blteRing.rotation.z -= 0.005;

        coreMesh.rotation.x += 0.01;
        coreMesh.rotation.y += 0.015;
        coreWire.rotation.x -= 0.01;
        coreWire.rotation.y -= 0.015;

        // Animate 10 satellite ratio beads along outer ring
        satellites.forEach((sat, i) => {
          const satAngle = (i / satelliteCount) * Math.PI * 2 + elapsed * 0.3;
          sat.position.set(Math.cos(satAngle) * 3.0, Math.sin(satAngle) * 3.0, Math.sin(satAngle * 2) * 0.15);
        });

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        scarcityGroup.rotation.x = curRotX + 0.2;
        scarcityGroup.rotation.y = curRotY + elapsed * 0.04;
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
      btcRingGeom.dispose();
      btcRingMat.dispose();
      blteRingGeom.dispose();
      blteRingMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      coreWireGeom.dispose();
      coreWireMat.dispose();
      satGeom.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <img
          src="/assets/aistudio/Scarcity_record_8c445a2d.jpg"
          alt="Digital Scarcity Visual"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Digital Scarcity 10:1 Ratio Vault Visual"
    />
  );
};
