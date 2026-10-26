import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createCoinFaceTexture, setupStudioLighting } from './threeUtils';

interface Wallet3DVisualProps {
  className?: string;
}

export const Wallet3DVisual: React.FC<Wallet3DVisualProps> = ({ className = '' }) => {
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
    camera.position.set(0, 0.6, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.25);

    const vaultGroup = new THREE.Group();
    scene.add(vaultGroup);

    // ==========================================
    // 1. 3D Digital Hardware Vault Case
    // ==========================================
    const caseGeom = new THREE.BoxGeometry(2.6, 1.6, 0.28);
    const caseMat = new THREE.MeshStandardMaterial({
      color: 0x14141c,
      metalness: 0.94,
      roughness: 0.2,
      emissive: 0x0f172a,
      emissiveIntensity: 0.3,
    });
    const vaultCase = new THREE.Mesh(caseGeom, caseMat);
    vaultCase.rotation.x = 0.35;
    vaultGroup.add(vaultCase);

    // Beveled Edge Trim in Gold
    const edgeWireGeom = new THREE.BoxGeometry(2.62, 1.62, 0.3);
    const edgeWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const edgeWire = new THREE.Mesh(edgeWireGeom, edgeWireMat);
    vaultCase.add(edgeWire);

    // Biometric Security Sensor
    const sensorGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 32);
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
    });
    const sensor = new THREE.Mesh(sensorGeom, sensorMat);
    sensor.rotation.x = Math.PI / 2;
    sensor.position.set(-0.75, 0, 0.15);
    vaultCase.add(sensor);

    // ==========================================
    // 2. Floating 3D BLTE Crypto Coin above Vault
    // ==========================================
    const blteTex = createCoinFaceTexture('blte', 256);
    const coinGeom = new THREE.CylinderGeometry(0.65, 0.65, 0.1, 32);
    const coinMat = new THREE.MeshStandardMaterial({
      map: blteTex,
      metalness: 0.92,
      roughness: 0.2,
    });
    const coin = new THREE.Mesh(coinGeom, coinMat);
    coin.rotation.set(0.4, 0.2, 0);
    coin.position.set(0.6, 0.8, 0.6);
    vaultGroup.add(coin);

    // Particle field
    const pCount = 35;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeom, pMat);
    vaultGroup.add(particles);

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
        coin.rotation.y += 0.015;
        coin.position.y = 0.8 + Math.sin(elapsed * 2.0) * 0.08;

        vaultCase.position.y = Math.sin(elapsed * 1.4) * 0.04;

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        vaultGroup.rotation.x = curRotX;
        vaultGroup.rotation.y = curRotY;
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
      caseGeom.dispose();
      caseMat.dispose();
      edgeWireGeom.dispose();
      edgeWireMat.dispose();
      sensorGeom.dispose();
      sensorMat.dispose();
      coinGeom.dispose();
      coinMat.dispose();
      blteTex.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Non-Custodial Vault</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[200px] sm:h-[240px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Non-Custodial Digital Vault and Secure Assets Visual"
    />
  );
};
