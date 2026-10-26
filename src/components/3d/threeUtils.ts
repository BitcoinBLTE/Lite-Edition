import * as THREE from 'three';

/**
 * Creates procedural high-resolution canvas textures for 3D metallic coins
 */
export function createCoinFaceTexture(
  type: 'btc' | 'blte' | 'sol',
  size: number = 512
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const center = size / 2;
  const radius = size * 0.46;

  // Background gradient: metallic brushed gold/copper
  const bgGrad = ctx.createRadialGradient(
    center * 0.8,
    center * 0.8,
    size * 0.05,
    center,
    center,
    radius
  );

  if (type === 'btc') {
    bgGrad.addColorStop(0, '#FFE58F');
    bgGrad.addColorStop(0.4, '#F59E0B');
    bgGrad.addColorStop(0.85, '#B45309');
    bgGrad.addColorStop(1, '#78350F');
  } else if (type === 'blte') {
    bgGrad.addColorStop(0, '#FED7AA');
    bgGrad.addColorStop(0.35, '#F97316');
    bgGrad.addColorStop(0.75, '#C2410C');
    bgGrad.addColorStop(1, '#7C2D12');
  } else {
    // Solana gradient
    bgGrad.addColorStop(0, '#A7F3D0');
    bgGrad.addColorStop(0.4, '#10B981');
    bgGrad.addColorStop(0.8, '#047857');
    bgGrad.addColorStop(1, '#064E3B');
  }

  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fill();

  // Outer bevel rim
  ctx.lineWidth = size * 0.035;
  ctx.strokeStyle = type === 'btc' ? '#FEF08A' : type === 'blte' ? '#FFEDD5' : '#6EE7B7';
  ctx.beginPath();
  ctx.arc(center, center, radius - size * 0.02, 0, Math.PI * 2);
  ctx.stroke();

  // Inner milled concentric ring
  ctx.lineWidth = size * 0.012;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(center, center, radius * 0.82, 0, Math.PI * 2);
  ctx.stroke();

  // Outer radial teeth / notches (coin milling)
  ctx.save();
  ctx.translate(center, center);
  const notchCount = 64;
  for (let i = 0; i < notchCount; i++) {
    ctx.rotate((Math.PI * 2) / notchCount);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(radius - size * 0.03, -1.5, size * 0.02, 3);
  }
  ctx.restore();

  // Central Symbol drawing
  ctx.save();
  ctx.translate(center, center);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Emboss shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = size * 0.03;
  ctx.shadowOffsetX = size * 0.015;
  ctx.shadowOffsetY = size * 0.015;

  if (type === 'btc') {
    ctx.font = `bold ${size * 0.44}px sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('₿', 0, 0);

    // Micro inscription ring
    ctx.font = `bold ${size * 0.038}px monospace`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.shadowBlur = 0;
    ctx.fillText('BITCOIN · DECENTRALIZED · 21M', 0, radius * 0.72);
  } else if (type === 'blte') {
    ctx.font = `900 ${size * 0.38}px sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('BLTE', 0, -size * 0.03);

    // Subtext & falcon reference
    ctx.font = `bold ${size * 0.038}px monospace`;
    ctx.fillStyle = '#FFF7ED';
    ctx.fillText('LITE EDITION · 2.1M HARD CAP', 0, radius * 0.7);
  } else {
    // Solana symbol or SOL
    ctx.font = `900 ${size * 0.32}px sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('SOL', 0, 0);

    ctx.font = `bold ${size * 0.038}px monospace`;
    ctx.fillStyle = '#ECFDF5';
    ctx.fillText('HIGH-SPEED L1 · 400MS', 0, radius * 0.7);
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates standard luxury metallic materials
 */
export function createMetallicMaterials(palette: 'gold' | 'copper' | 'titanium' | 'emerald' | 'violet') {
  let color = 0xf59e0b;
  let emissive = 0x78350f;
  let edgeColor = 0xfef08a;

  if (palette === 'copper') {
    color = 0xea580c;
    emissive = 0x7c2d12;
    edgeColor = 0xffedd5;
  } else if (palette === 'titanium') {
    color = 0x94a3b8;
    emissive = 0x1e293b;
    edgeColor = 0xf8fafc;
  } else if (palette === 'emerald') {
    color = 0x10b981;
    emissive = 0x064e3b;
    edgeColor = 0x6ee7b7;
  } else if (palette === 'violet') {
    color = 0x8b5cf6;
    emissive = 0x4c1d95;
    edgeColor = 0xc4b5fd;
  }

  const faceMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.28,
    metalness: 0.88,
    emissive: emissive,
    emissiveIntensity: 0.18,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: edgeColor,
    roughness: 0.2,
    metalness: 0.95,
  });

  return { faceMaterial, rimMaterial };
}

/**
 * Standard studio lighting rig
 */
export function setupStudioLighting(scene: THREE.Scene, intensityMultiplier: number = 1.0) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.8 * intensityMultiplier);
  scene.add(ambient);

  // Warm key light
  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2 * intensityMultiplier);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  // Cool metallic rim light
  const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8 * intensityMultiplier);
  rimLight.position.set(-4, -3, -3);
  scene.add(rimLight);

  // Golden accent bottom-up fill
  const fillLight = new THREE.PointLight(0xf59e0b, 2.5 * intensityMultiplier, 15);
  fillLight.position.set(0, -3, 3);
  scene.add(fillLight);

  return { ambient, keyLight, rimLight, fillLight };
}
