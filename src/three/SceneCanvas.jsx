import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import CameraRig from './CameraRig';
import ThemeController from './ThemeController';
import Lighting from './Lighting';
import SkyDome from './SkyDome';
import Starfield from './Starfield';
import Aurora from './scenes/Aurora';
import Education from './scenes/Education';
import Gallery from './scenes/Gallery';
import Ocean from './scenes/Ocean';

/**
 * The single persistent WebGL canvas behind the page.
 *
 * Performance model:
 *   - ONE constant lighting rig (see Lighting) → no shader recompiles on scroll.
 *   - All four scenes stay mounted but gate their own animation + visibility by
 *     scroll proximity, so off-screen worlds are nearly free.
 *   - PerformanceMonitor drops the pixel ratio if the GPU can't keep up.
 *   - frameloop halts when the tab is hidden (driven by the parent).
 */
export default function SceneCanvas({ frameloop = 'always', high = false }) {
    const [dpr, setDpr] = useState(high ? 1.6 : 1.15);

    return (
        <Canvas
            frameloop={frameloop}
            dpr={dpr}
            camera={{ position: [0, 0, 9], fov: 55, near: 0.1, far: 400 }}
            gl={{
                antialias: false,
                powerPreference: 'high-performance',
                stencil: false,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.05,
            }}
        >
            <PerformanceMonitor
                onDecline={() => setDpr((d) => Math.max(0.9, d - 0.35))}
                onIncline={() => setDpr(high ? 1.6 : 1.15)}
            />

            <ThemeController />
            <CameraRig />
            <Lighting />
            <SkyDome />
            <Starfield count={high ? 1600 : 800} />

            <Suspense fallback={null}>
                <Aurora high={high} />
                <Education />
                <Gallery />
                <Ocean />
            </Suspense>

            {high && (
                /* multisampling = MSAA on the composer target → cheap edge AA
                   without a separate SMAA pass. */
                <EffectComposer multisampling={4}>
                    <Bloom intensity={0.5} luminanceThreshold={0.55} luminanceSmoothing={0.65} mipmapBlur radius={0.65} />
                    <Vignette eskil={false} offset={0.22} darkness={0.78} />
                </EffectComposer>
            )}
        </Canvas>
    );
}
