import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Pillars3DVisualProps {
  className?: string;
}

export const Pillars3DVisual: React.FC<Pillars3DVisualProps> = ({ className = '' }) => {
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
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene, 1.1);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // ==========================================
    // 1. Central Consensus Nucleus (Holographic Golden Icosahedron)
    // ==========================================
    const coreGeom = new THREE.IcosahedronGeometry(1.0, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const coreSolidMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0x78350f,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreSolidMat);
    const coreWireMesh = new THREE.Mesh(coreGeom, coreWireMat);
    networkGroup.add(coreMesh);
    networkGroup.add(coreWireMesh);

    // ==========================================
    // 2. 4 Pillar Blockchain Nodes (Scarcity, Speed, Fees, Transparency)
    // ==========================================
    const nodeColors = [
      0xf59e0b, // Golden Scarcity
      0x38bdf8, // Electric Cyan Speed
      0x10b981, // Emerald Micro-fees
      0xa855f7, // Violet Transparency
    ];

    const nodes: THREE.Mesh[] = [];
    const nodeRadii = 2.4;

    nodeColors.forEach((color, idx) => {
      const angle = (idx / 4) * Math.PI * 2;
      const x = Math.cos(angle) * nodeRadii;
      const y = Math.sin(angle) * (nodeRadii * 0.7);
      const z = (idx % 2 === 0 ? 0.6 : -0.6);

      const blockGeom = new THREE.BoxGeometry(0.75, 0.75, 0.75);
      const blockMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.85,
        emissive: color,
        emissiveIntensity: 0.35,
      });
      const block = new THREE.Mesh(blockGeom, blockMat);
      block.position.set(x, y, z);
      networkGroup.add(block);
      nodes.push(block);

      // Connecting luminous laser lines from center to nodes
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.75,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      networkGroup.add(line);
    });

    // Outer interconnecting lines between nodes (blockchain circuit ring)
    for (let i = 0; i < nodes.length; i++) {
      const nextIdx = (i + 1) % nodes.length;
      const p1 = nodes[i].position;
      const p2 = nodes[nextIdx].position;
      const circLineGeom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const circLineMat = new THREE.LineBasicMaterial({
        color: 0xe2e8f0,
        transparent: true,
        opacity: 0.25,
      });
      const circLine = new THREE.Line(circLineGeom, circLineMat);
      networkGroup.add(circLine);
    }

    // ==========================================
    // 3. Flowing Transaction Data Packets
    // ==========================================
    const packetCount = 12;
    const packetGeom = new THREE.SphereGeometry(0.065, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    const packets: { mesh: THREE.Mesh; targetIdx: number; progress: number; speed: number }[] = [];

    for (let i = 0; i < packetCount; i++) {
      const mesh = new THREE.Mesh(packetGeom, packetMat);
      networkGroup.add(mesh);
      packets.push({
        mesh,
        targetIdx: i % nodes.length,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    // Floating orbital rings
    const orbitRingGeom = new THREE.TorusGeometry(3.2, 0.012, 16, 120);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeom, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    networkGroup.add(orbitRing);

    // Mouse parallax
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

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
        // Rotate core and entire network
        coreMesh.rotation.y += 0.01;
        coreMesh.rotation.x += 0.006;
        coreWireMesh.rotation.y -= 0.008;

        // Rotate individual nodes
        nodes.forEach((node, i) => {
          node.rotation.x += 0.015;
          node.rotation.y += 0.02;
          node.position.y += Math.sin(elapsed * 2 + i) * 0.003;
        });

        // Animate data packets traversing lines
        packets.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) {
            p.progress = 0;
            p.targetIdx = (p.targetIdx + 1) % nodes.length;
          }
          const targetPos = nodes[p.targetIdx].position;
          p.mesh.position.lerpVectors(new THREE.Vector3(0, 0, 0), targetPos, p.progress);
        });

        orbitRing.rotation.z += 0.002;
        networkGroup.rotation.y += 0.002;

        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;
        networkGroup.rotation.x = currentRotX;
        networkGroup.rotation.y = currentRotY + elapsed * 0.05;
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
      coreWireMat.dispose();
      coreSolidMat.dispose();
      packetGeom.dispose();
      packetMat.dispose();
      orbitRingGeom.dispose();
      orbitRingMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <img
          src="/assets/aistudio/BLTE_explain_e0101186.jpg"
          alt="Blockchain Pillars Visual Fallback"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Holographic Blockchain Network Visual"
    />
  );
};
