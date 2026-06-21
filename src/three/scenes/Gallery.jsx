import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getState } from '../../lib/scrollStore';
import { BANDS, isNear } from '../layout';
import { projects } from '../../data/portfolio';

const SECTION = 2;
const BAND = BANDS[2];

// Floating glowing "frames" suspended at varying depth/rotation — an abstract
// museum hall. All project text + links live in the DOM cards; these are pure
// ambient decoration, set back and to the sides so they never block content.
const FRAMES = projects.map((p, i) => {
    const side = i % 2 ? 1 : -1;
    return {
        position: [side * (4.4 + (i % 2) * 0.8), BAND + 8 - i * 5.2, -5 - (i % 3) * 1.6],
        rotation: [0.06 * side, side * -0.55, side * 0.04],
        accent: p.accent,
        drift: 0.4 + (i % 3) * 0.18,
        phase: i * 1.7,
    };
});

function Frame({ conf }) {
    const group = useRef();
    const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.2, 2.1)), []);

    useFrame((state) => {
        if (!group.current || !isNear(getState().index, SECTION)) return;
        const t = state.clock.elapsedTime;
        group.current.position.y = conf.position[1] + Math.sin(t * conf.drift + conf.phase) * 0.5;
        group.current.rotation.z = conf.rotation[2] + Math.sin(t * conf.drift * 0.8 + conf.phase) * 0.05;
    });

    return (
        <group ref={group} position={conf.position} rotation={conf.rotation}>
            {/* faint glass fill */}
            <mesh>
                <planeGeometry args={[3.2, 2.1]} />
                <meshBasicMaterial color={conf.accent} transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
            </mesh>
            {/* glowing border */}
            <lineSegments geometry={edges}>
                <lineBasicMaterial color={conf.accent} transparent opacity={0.9} toneMapped={false} />
            </lineSegments>
        </group>
    );
}

// Lazily drifting decorative geometry scattered through the hall.
function Decor() {
    const ref = useRef();
    const items = useMemo(
        () => [
            { p: [-6.5, BAND + 4, -7], type: 'ico', c: '#ec4899' },
            { p: [6.6, BAND - 3, -8], type: 'torus', c: '#10b981' },
            { p: [5.5, BAND + 7, -9], type: 'octa', c: '#8b5cf6' },
            { p: [-5.8, BAND - 8, -7], type: 'torus', c: '#22d3ee' },
        ],
        []
    );
    useFrame((_, dt) => {
        if (!ref.current || !isNear(getState().index, SECTION)) return;
        ref.current.children.forEach((m, i) => {
            m.rotation.x += dt * (0.12 + i * 0.03);
            m.rotation.y += dt * (0.16 + i * 0.02);
        });
    });
    return (
        <group ref={ref}>
            {items.map((it, i) => (
                <mesh key={i} position={it.p}>
                    {it.type === 'ico' && <icosahedronGeometry args={[0.7, 0]} />}
                    {it.type === 'octa' && <octahedronGeometry args={[0.7, 0]} />}
                    {it.type === 'torus' && <torusKnotGeometry args={[0.42, 0.14, 80, 12]} />}
                    <meshStandardMaterial color={it.c} emissive={it.c} emissiveIntensity={0.5} roughness={0.3} metalness={0.5} wireframe={it.type === 'ico'} />
                </mesh>
            ))}
        </group>
    );
}

export default function Gallery() {
    const group = useRef();
    useFrame(() => {
        if (group.current) group.current.visible = isNear(getState().index, SECTION);
    });

    return (
        <group ref={group}>
            {FRAMES.map((conf, i) => (
                <Frame key={i} conf={conf} />
            ))}
            <Decor />
        </group>
    );
}
