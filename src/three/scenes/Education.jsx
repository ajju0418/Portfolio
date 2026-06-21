import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getState } from '../../lib/scrollStore';
import { BANDS, isNear } from '../layout';
import { timeline } from '../../data/portfolio';

/**
 * Section-1 (Journey — Education & Experience) ambient backdrop.
 *
 * Replaces the earlier DNA double-helix with an education motif: floating
 * graduation caps, a drifting field of glowing "books", and luminous milestone
 * nodes — framed back and to the right of the content column and themed to the
 * section's amber/gold palette. Pure decoration (no text); every milestone lives
 * in the DOM timeline cards. Animation + visibility gate on scroll proximity so
 * the scene is nearly free while off-screen.
 */

const SECTION = 1;
const BAND = BANDS[1];
const SPAN = 40; // vertical extent the scene occupies
const TOP = BAND + SPAN / 2;

// Push the whole structure back + to the right so it frames — never covers —
// the centred glass timeline cards.
const GROUP_POS = [4.2, 0, -6];

const AMBER = '#f59e0b';
const GOLD = '#fcd34d';

// World Y for a 0..1 position down the band.
const atY = (t) => TOP - t * SPAN;

// Deterministic pseudo-random in 0..1 — keeps the book cloud stable across
// renders, and (unlike a spiral) reads as scattered books, never a helix.
const rand = (n) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
};

// ── Drifting cloud of glowing books ──────────────────────────────────────────
const BOOK_COUNT = 28;

function Books() {
    const ref = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    useLayoutEffect(() => {
        const mesh = ref.current;
        for (let i = 0; i < BOOK_COUNT; i++) {
            const t = i / (BOOK_COUNT - 1);
            const a = rand(i + 1);
            const b = rand(i + 9.3);
            const c = rand(i + 17.7);
            dummy.position.set(
                -0.9 + a * 4.2, // biased to the right of the content column
                atY(t) + (b - 0.5) * 2.6, // jittered down the band
                -1.6 + c * 4.4
            );
            dummy.rotation.set(a * 0.6, b * Math.PI * 2, (c - 0.5) * 0.7);
            const s = 0.72 + c * 0.5;
            dummy.scale.set(s, s * 0.2, s * 0.72); // flat + wide → reads as a book
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
    }, [dummy]);
    return (
        <instancedMesh ref={ref} args={[undefined, undefined, BOOK_COUNT]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={AMBER} emissive="#d97706" emissiveIntensity={0.5} roughness={0.35} metalness={0.4} transparent opacity={0.55} />
        </instancedMesh>
    );
}

// ── A floating graduation cap (mortarboard + base + button + tassel) ─────────
function GradCap({ position, scale = 1, phase = 0, tilt = 0 }) {
    const group = useRef();
    const board = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.5, 0.06, 1.5)), []);

    useFrame((state) => {
        if (!group.current || !isNear(getState().index, SECTION)) return;
        const t = state.clock.elapsedTime;
        group.current.position.y = position[1] + Math.sin(t * 0.5 + phase) * 0.45;
        group.current.rotation.y = t * 0.18 + phase;
    });

    return (
        <group ref={group} position={position} scale={scale} rotation={[tilt, 0, 0]}>
            {/* mortarboard */}
            <mesh>
                <boxGeometry args={[1.5, 0.06, 1.5]} />
                <meshStandardMaterial color="#1a1206" emissive={AMBER} emissiveIntensity={0.18} roughness={0.5} metalness={0.4} />
            </mesh>
            <lineSegments geometry={board}>
                <lineBasicMaterial color={GOLD} transparent opacity={0.85} toneMapped={false} />
            </lineSegments>
            {/* cap base (the part that sits on the head) */}
            <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.42, 0.5, 0.4, 20]} />
                <meshStandardMaterial color="#140e05" emissive="#7c2d12" emissiveIntensity={0.15} roughness={0.6} metalness={0.3} />
            </mesh>
            {/* button at the crown */}
            <mesh position={[0, 0.07, 0]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.6} toneMapped={false} />
            </mesh>
            {/* tassel cord draped over the edge */}
            <mesh position={[0.5, -0.1, 0.5]} rotation={[0, 0, 0.18]}>
                <cylinderGeometry args={[0.015, 0.015, 0.6, 6]} />
                <meshStandardMaterial color="#d97706" emissive="#d97706" emissiveIntensity={0.8} toneMapped={false} />
            </mesh>
            {/* tassel bead */}
            <mesh position={[0.56, -0.42, 0.5]}>
                <sphereGeometry args={[0.07, 10, 10]} />
                <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.4} toneMapped={false} />
            </mesh>
        </group>
    );
}

// A luminous milestone marker that brightens as the camera draws level with it
// (each maps to a DOM card but carries no text of its own).
function NodeMarker({ t, x, z, color }) {
    const ref = useRef();
    const mat = useRef();
    const { camera } = useThree();
    const y = useMemo(() => atY(t), [t]);

    useFrame(() => {
        if (!isNear(getState().index, SECTION)) return;
        const prox = THREE.MathUtils.clamp(1 - Math.abs(camera.position.y - y) / 7, 0, 1);
        if (ref.current) ref.current.scale.setScalar(0.28 + prox * 0.2);
        if (mat.current) mat.current.emissiveIntensity = 1 + prox * 2.2;
    });

    return (
        <mesh ref={ref} position={[x, y, z]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={1.2} roughness={0.2} metalness={0.4} toneMapped={false} />
        </mesh>
    );
}

export default function Education() {
    const group = useRef();
    const float = useRef();

    useFrame((state, dt) => {
        const near = isNear(getState().index, SECTION);
        if (group.current) group.current.visible = near;
        if (near && float.current) {
            const t = state.clock.elapsedTime;
            float.current.position.y = Math.sin(t * 0.25) * 0.5;
            float.current.rotation.y = Math.sin(t * 0.12) * 0.12;
        }
    });

    const caps = [
        { position: [0.4, atY(0.2), 1.2], scale: 1.05, phase: 0.0, tilt: 0.12 },
        { position: [2.4, atY(0.52), -0.6], scale: 0.85, phase: 1.7, tilt: -0.1 },
        { position: [0.9, atY(0.85), 0.8], scale: 1.0, phase: 3.1, tilt: 0.08 },
    ];

    return (
        <group ref={group} position={GROUP_POS}>
            <group ref={float}>
                <Books />
                {caps.map((c, i) => (
                    <GradCap key={i} {...c} />
                ))}
                {timeline.map((item, i) => (
                    <NodeMarker
                        key={item.title}
                        t={(i + 0.5) / timeline.length}
                        x={-0.4 + rand(i + 3.1) * 3.0}
                        z={-1 + rand(i + 5.7) * 3}
                        color={item.kind === 'work' ? '#fbbf24' : '#fcd34d'}
                    />
                ))}
            </group>

            {/* Faint grid floor far below, for depth */}
            <gridHelper args={[90, 36, '#b45309', '#3a2402']} position={[-2, atY(1) - 4, 2]} />
        </group>
    );
}
