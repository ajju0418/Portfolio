import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getState } from '../lib/scrollStore';
import { bracket } from './layout';

/**
 * Drives the fog tint (and a fallback clear colour) between section palettes as
 * the camera travels. The visible background is the SkyDome; fog adds a matching
 * atmospheric haze on distant geometry. Reuses two Color objects — no per-frame
 * allocation.
 */
const FOG = ['#070a35', '#241604', '#190a36', '#05332e'].map((c) => new THREE.Color(c));

export default function ThemeController() {
    const { scene } = useThree();
    const bg = useMemo(() => new THREE.Color(FOG[0]), []);
    const fogColor = useMemo(() => new THREE.Color(FOG[0]), []);
    const tmp = useMemo(() => new THREE.Color(), []);

    useEffect(() => {
        scene.background = bg;
        scene.fog = new THREE.Fog(fogColor, 22, 95);
        return () => {
            scene.fog = null;
        };
    }, [scene, bg, fogColor]);

    useFrame(() => {
        const { lo, hi, f } = bracket(getState().index, FOG.length - 1);
        bg.copy(FOG[lo]).lerp(tmp.copy(FOG[hi]), f);
        if (scene.fog) scene.fog.color.copy(bg);
    });

    return null;
}
