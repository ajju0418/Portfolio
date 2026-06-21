import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getState } from '../lib/scrollStore';
import { bracket } from './layout';

/**
 * A single, constant lighting rig shared by every scene. This is the key
 * performance decision: the light *count* never changes, so materials never
 * recompile while scrolling (per-scene lights used to force a recompile on
 * every section transition — the main source of stutter). The lights follow the
 * camera down the corridor and shift colour to match each section's palette.
 */
const KEY = ['#5fe9ff', '#ffb43a', '#ff5fd2', '#ffae5a'].map((c) => new THREE.Color(c));
const FILL = ['#8b5cf6', '#fde68a', '#34d399', '#2dd4bf'].map((c) => new THREE.Color(c));

export default function Lighting() {
    const key = useRef();
    const fill = useRef();
    const cKey = useMemo(() => new THREE.Color(), []);
    const cFill = useMemo(() => new THREE.Color(), []);

    useFrame(({ camera }) => {
        const { lo, hi, f } = bracket(getState().index, KEY.length - 1);
        cKey.copy(KEY[lo]).lerp(KEY[hi], f);
        cFill.copy(FILL[lo]).lerp(FILL[hi], f);
        if (key.current) {
            key.current.color.copy(cKey);
            key.current.position.set(camera.position.x + 7, camera.position.y + 9, camera.position.z + 2);
        }
        if (fill.current) {
            fill.current.color.copy(cFill);
            fill.current.position.set(camera.position.x - 8, camera.position.y - 5, camera.position.z + 4);
        }
    });

    return (
        <>
            <ambientLight intensity={0.45} />
            <hemisphereLight intensity={0.4} color="#dfe9ff" groundColor="#0a0a1a" />
            <pointLight ref={key} intensity={2.6} distance={0} decay={0} />
            <pointLight ref={fill} intensity={1.5} distance={0} decay={0} />
        </>
    );
}
