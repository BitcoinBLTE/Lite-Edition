import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupStudioLighting } from './threeUtils';

interface Community3DVisualProps {
  className?: string;
}

export const Community3DVisual: React.FC<Community3DVisualProps> = ({ className = '' }) => {
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

    const communityGroup = new THREE.Group();
    scene.add(communityGroup);

    // ==========================================
    // 1. Central Golden Community Beacon
    // ==========================================
    const coreGeom = new THREE.IcosahedronGeometry(0.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.5,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    communityGroup.add(core);

    // ==========================================
    // 2. Interconnected Global Node Constellation
    // ==========================================
    const nodeCount = 18;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    const nodeColors = [0xf59e0b, 0x38bdf8, 0x10b981, 0xa855f7];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 2.4 + (Math.random() - 0.5) * 0.4;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const color = nodeColors[i % nodeColors.length];
      const geom = new THREE.SphereGeometry(0.12, 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.85,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: 0.6,
      });
      const node = new THREE.Mesh(geom, mat);
      node.position.copy(pos);
      communityGroup.add(node);
      nodeMeshes.push(node);

      // Connecting ray to central core
      const lineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
      const lineMat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      communityGroup.add(line);
    }

    // Connect nearest neighbor nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.6) {
          const edgeGeom = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]);
          const edgeMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.15,
          });
          const edge = new THREE.Line(edgeGeom, edgeMat);
          communityGroup.add(edge);
        }
      }
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
        core.rotation.y += 0.01;
        core.rotation.x += 0.005;

        nodeMeshes.forEach((n, idx) => {
          n.scale.setScalar(1.0 + Math.sin(elapsed * 2.0 + idx) * 0.15);
        });

        curRotX += (targetRotX - curRotX) * 0.05;
        curRotY += (targetRotY - curRotY) * 0.05;
        communityGroup.rotation.x = curRotX;
        communityGroup.rotation.y = curRotY + elapsed * 0.04;
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
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className={`relative flex items-center justify-center p-2 ${className}`}>
        <div className="text-center font-mono text-xs text-[#E9C9A5]">3D Global Community Constellation</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[240px] sm:h-[280px] cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="3D Global Community Node Constellation Visual"
    />
  );
};
