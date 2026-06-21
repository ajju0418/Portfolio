import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import FloatingTech from './FloatingTech';

/**
 * The actual WebGL scene. This module is code-split: it (and the entire
 * three/r3f vendor chunk) is only fetched when Hero3DBackground decides the
 * device is capable. Default export is a self-contained <Canvas>.
 *
 * `frameloop` is controlled by the parent so the render loop fully stops when
 * the hero scrolls out of view or the tab is hidden — zero GPU cost when idle.
 */

// Lightweight particle field. 900 points = cheap "dust" behind the logos.
function ParticleField({ count = 900 }) {
    const ref = useRef();
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        // Deterministic-ish spread without Math.random dependency at module load:
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const r = 4 + (i % 50) / 12;
            const theta = (i * 2.399963) % (Math.PI * 2); // golden-angle-ish
            const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
            arr[i3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            arr[i3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, [count]);

    useFrame((state, delta) => {
        const p = ref.current;
        if (!p) return;
        p.rotation.y += delta * 0.04;
        p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, state.pointer.y * 0.15, 0.04);
    });

    return (
        <Points ref={ref} positions={positions} frustumCulled>
            <PointMaterial
                transparent
                color="#6366f1"
                size={0.035}
                sizeAttenuation
                depthWrite={false}
                opacity={0.7}
            />
        </Points>
    );
}

export default function Scene3D({ frameloop = 'always' }) {
    return (
        <Canvas
            frameloop={frameloop}
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]} /* cap pixel ratio — retina at full DPR is the #1 WebGL perf killer */
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            style={{ width: '100%', height: '100%' }}
        >
            {/* Logos & particles use unlit materials, so the scene needs no lights. */}
            <ParticleField />
            <Suspense fallback={null}>
                <FloatingTech />
            </Suspense>
        </Canvas>
    );
}
