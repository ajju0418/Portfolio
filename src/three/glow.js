import * as THREE from 'three';

/**
 * A soft radial-gradient sprite texture used for additive "glow" halos behind
 * bright objects (the core, the beacon). Created once and shared.
 */
let cached = null;
export function glowTexture() {
    if (cached) return cached;
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.18, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.16)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    cached = new THREE.CanvasTexture(canvas);
    cached.colorSpace = THREE.SRGBColorSpace;
    return cached;
}
