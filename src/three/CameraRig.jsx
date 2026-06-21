import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getState } from '../lib/scrollStore';
import { BANDS, POSES, bracket, lerp } from './layout';

/**
 * Flies the camera down the corridor as the page scrolls and leans it toward the
 * pointer for a subtle orbit/parallax feel. All motion is critically damped so it
 * stays smooth regardless of frame rate or scroll speed.
 */
export default function CameraRig() {
    const { camera } = useThree();
    const look = useRef(new THREE.Vector3());

    useFrame((_, dt) => {
        const s = getState();
        const { lo, hi, f } = bracket(s.index);

        const camY = lerp(BANDS[lo], BANDS[hi], f);
        const z = lerp(POSES[lo].z, POSES[hi].z, f);
        const pitch = lerp(POSES[lo].pitch, POSES[hi].pitch, f);

        // Frame-rate-independent smoothing (~12% per 16ms).
        const k = 1 - Math.pow(0.0009, dt);

        camera.position.x += (s.pointerX * 1.6 - camera.position.x) * k;
        camera.position.y += (camY + s.pointerY * 0.9 - camera.position.y) * k;
        camera.position.z += (z - camera.position.z) * k;

        // Aim slightly below the band centre when pitched (look down at the ocean).
        look.current.set(s.pointerX * 0.6, camY - pitch * 22, 0);
        camera.lookAt(look.current);
    });

    return null;
}
