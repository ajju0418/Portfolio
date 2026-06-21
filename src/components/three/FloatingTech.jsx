import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Float } from '@react-three/drei';
import * as THREE from 'three';
import techStack from '../../data/techStack';

/**
 * The tech-stack logos drifting through the hero background in 3D.
 *
 * Each SVG is rasterized once to a 128px CanvasTexture (cheap, transparent,
 * GPU-friendly), then drawn on a camera-facing billboard. drei's <Float> gives
 * each logo a gentle independent bob; the whole group slowly rotates and leans
 * toward the pointer for parallax. Logos only appear once their texture loads,
 * so a failed icon simply never shows (no broken-image artifacts in WebGL).
 */

// Rasterize an SVG URL onto a transparent square canvas → CanvasTexture.
function makeIconTexture(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const size = 128;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const iw = img.naturalWidth || 128;
            const ih = img.naturalHeight || 128;
            const scale = Math.min(size / iw, size / ih);
            const w = iw * scale;
            const h = ih * scale;
            ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
            const tex = new THREE.CanvasTexture(canvas);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = 4;
            tex.needsUpdate = true;
            resolve(tex);
        };
        img.onerror = reject;
        img.src = url;
    });
}

// Deterministic spread across a wide ellipsoid shell — biased outward so logos
// frame the hero content rather than crowd dead-center behind the text.
function layout(count) {
    const out = [];
    for (let i = 0; i < count; i++) {
        const golden = 2.399963; // golden angle
        const theta = i * golden;
        const t = (i + 0.5) / count;
        const radius = 3.2 + (i % 3) * 0.7;
        out.push([
            Math.cos(theta) * radius,
            (t - 0.5) * 5.5,
            Math.sin(theta) * radius - 2.5,
        ]);
    }
    return out;
}

export default function FloatingTech() {
    const groupRef = useRef();
    const [textures, setTextures] = useState([]);
    const positions = useMemo(() => layout(techStack.length), []);

    useEffect(() => {
        let alive = true;
        const created = [];
        Promise.all(
            techStack.map((t) =>
                makeIconTexture(t.icon)
                    .then((tex) => {
                        created.push(tex);
                        return { name: t.name, tex };
                    })
                    .catch(() => null)
            )
        ).then((res) => {
            if (alive) setTextures(res.filter(Boolean));
        });
        return () => {
            alive = false;
            created.forEach((tex) => tex.dispose());
        };
    }, []);

    useFrame((state, delta) => {
        const g = groupRef.current;
        if (!g) return;
        g.rotation.y += delta * 0.05;
        // Lean the whole constellation toward the cursor for parallax depth.
        g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.12, 0.04);
        g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.5, 0.04);
    });

    return (
        <group ref={groupRef}>
            {textures.map((item, i) => {
                const pos = positions[i] || [0, 0, 0];
                return (
                    <Float
                        key={item.name}
                        speed={1.5}
                        rotationIntensity={0}
                        floatIntensity={1.2}
                        floatingRange={[-0.25, 0.25]}
                    >
                        <Billboard position={pos}>
                            <mesh>
                                <planeGeometry args={[1, 1]} />
                                <meshBasicMaterial
                                    map={item.tex}
                                    transparent
                                    opacity={0.9}
                                    depthWrite={false}
                                    toneMapped={false}
                                />
                            </mesh>
                        </Billboard>
                    </Float>
                );
            })}
        </group>
    );
}
