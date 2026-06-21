import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BANDS } from './layout';

/**
 * A field of faint stars spanning the whole vertical corridor, giving every
 * section consistent depth behind the hero geometry. Static positions (no
 * per-frame writes) with a gentle global twinkle driven by one shader-free
 * material opacity oscillation — practically free.
 */
export default function Starfield({ count = 1400 }) {
    const ref = useRef();
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        const top = 16;
        const bottom = BANDS[BANDS.length - 1] - 16;
        const height = top - bottom;
        for (let i = 0; i < count; i++) {
            const a = i * 2.399963;
            const r = 18 + ((i * 13) % 70);
            arr[i * 3] = Math.cos(a) * r;
            arr[i * 3 + 1] = top - ((i * 0.6180339) % 1) * height;
            arr[i * 3 + 2] = Math.sin(a) * r - 10;
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.material.opacity = 0.45 + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
        }
    });

    return (
        <points ref={ref} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color="#cfe3ff"
                size={0.07}
                sizeAttenuation
                transparent
                opacity={0.5}
                depthWrite={false}
                fog={false}
                toneMapped={false}
            />
        </points>
    );
}
