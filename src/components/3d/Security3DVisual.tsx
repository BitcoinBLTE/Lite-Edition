import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Security3DVisualProps {
  className?: string;
}

export const Security3DVisual: React.FC<Security3DVisualProps> = ({ className = '' }) => {
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
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.25);

    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);

    // ==========================================
    // 1. 3D Procedural Cryptographic Shield Geometry
    // ==========================================
    // Create custom shield contour using Shape & ExtrudeGeometry
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.6);
    shieldShape.quadraticCurveTo(1.4, 1.5, 1.5, 0.6);
    shieldShape.quadraticCurveTo(1.4, -0.6, 0, -1.8);
    shieldShape.quadraticCurveTo(-1.4, -0.6, -1.5, 0.6);
    shieldShape.quadraticCurveTo(-1.4, 1.5, 0, 1.6);

    const extrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const shieldGeom = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeom.center();

    // Metallic Titanium & Gold Materials
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });
    const shieldMesh = new THREE.Mesh(shieldGeom, shieldMat);
    shieldGroup.add(shieldMesh);

    // Golden Edge Trim Wireframe
    const rimGeom = new THREE.EdgesGeometry(shieldGeom);
    const rimMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      linewidth: 2,
    });
    const rimMesh = new THREE.LineSegments(rimGeom, rimMat);
    shieldGroup.add(rimMesh);

    // ==========================================
    // 2. Central Cryptographic Padlock & Green Verification Seal
    // ==========================================
    const sealGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 32);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
    });
    const seal = new THREE.Mesh(sealGeom, sealMat);
    seal.rotation.x = Math.PI / 2;
    seal.position.z = 0.22;
    shieldGroup.add(seal);

    // Padlock shackle ring
    const shackleGeom = new THREE.TorusGeometry(0.3, 0.06, 16, 32, Math.PI);
    const shackleMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      metalness: 0.98,
      roughness: 0.1,
    });
    const shackle = new THREE.Mesh(shackleGeom, shackleMat);
    shackle.position.set(0, 0.25, 0.28);
    shieldGroup.add(shackle);

    // ==========================================
    // 3. Rotating Cryptographic Cipher Rings
    // ==========================================
    const ring1Geom = new THREE.TorusGeometry(2.2, 0.015, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    shieldGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.5, 0.012, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    shieldGroup.add(ring2);

    // Scanning laser bar
    const laserGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.8, 0, 0.3),
      new THREE.Vector3(1.8, 0, 0.3),
    ]);
    const laserMat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      linewidth: 3,
    });
    const laser = new THREE.Line(laserGeom, laserMat);
    shieldGroup.add(laser);

    // Floating verification data particles
    const pCount = 45;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    shieldGroup.add(particles);

    // Mouse parallax
    let targetRotY = 0;
    let targetRotX = 0;
    let curRotY = 0;
    let curRotX = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.4;
      targetRotX = y * 0.3;
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
        // Floating shield motion
        shieldGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
        shieldMesh.rotation.y = Math.sin(elapsed * 0.8) * 0.12;

        ring1.rotation.z += 0.005;
        ring2.rotation.z -= 0.004;

        // Laser scan up and down
        laser.position.y = Math.sin(elapsed * 2.0) * 1.3;

        particles.rotation.y += 0.001;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        shieldGroup.rotation.x = curRotX;
        shieldGroup.rotation.y = curRotY + Math.sin(elapsed * 0.5) * 0.1;
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
      shieldGeom.dispose();
      shieldMat.dispose();
      rimGeom.dispose();
      rimMat.dispose();
      sealGeom.dispose();
      sealMat.dispose();
      shackleGeom.dispose();
      shackleMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Cryptographic Verification Shield</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Holographic Cryptographic Shield and Verification Visual"
    />
  );
};
