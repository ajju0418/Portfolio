import { useEffect, useMemo, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { Billboard, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { getState } from '../../lib/scrollStore';
import { BANDS, isNear } from '../layout';
import { glowTexture } from '../glow';

const BAND = BANDS[3];
const SECTION = 3;
const WATER_Y = BAND - 6;

// ---- Custom ocean shader -------------------------------------------------
// Vertex sums a few sine waves to displace the surface; fragment grades the
// colour from deep teal through teal to sunset orange on the crests, then
// fades into the fog colour with distance so the plane edge never shows.
const OceanMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorDeep: new THREE.Color('#03201d'),
        uColorA: new THREE.Color('#0d9488'),
        uColorB: new THREE.Color('#f97316'),
        uFogColor: new THREE.Color('#0a4a44'),
    },
    /* glsl vertex */ `
    uniform float uTime;
    varying float vElev;
    varying float vFog;
    void main() {
      vec3 pos = position;
      float e = sin(pos.x * 0.55 + uTime * 0.8) * 0.42
              + sin(pos.y * 0.8  + uTime * 1.1) * 0.30
              + sin((pos.x + pos.y) * 0.4 - uTime * 0.6) * 0.24;
      pos.z += e;
      vElev = e;
      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      vFog = -mv.z;
      gl_Position = projectionMatrix * mv;
    }
  `,
    /* glsl fragment */ `
    uniform vec3 uColorDeep;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uFogColor;
    varying float vElev;
    varying float vFog;
    void main() {
      float h = smoothstep(-0.6, 0.7, vElev);
      vec3 col = mix(uColorDeep, uColorA, h);
      col = mix(col, uColorB, smoothstep(0.45, 0.95, vElev));
      col += smoothstep(0.6, 0.9, vElev) * 0.2;       // foam on crests
      float fog = smoothstep(14.0, 46.0, vFog);
      col = mix(col, uFogColor, fog);
      gl_FragColor = vec4(col, 1.0);
    }
  `
);
extend({ OceanMaterial });

function Water() {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current && isNear(getState().index, SECTION)) ref.current.uTime = state.clock.elapsedTime;
    });
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, WATER_Y, -4]}>
            <planeGeometry args={[70, 70, 96, 96]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <oceanMaterial ref={ref} />
        </mesh>
    );
}

// Pulsing beacon + slowly sweeping light beam. The "light" is faked with an
// emissive lantern + additive glow halo + bloom — no real light, so the scene's
// light count stays constant and shaders never recompile on the transition in.
function Lighthouse() {
    const lantern = useRef();
    const beam = useRef();
    const halo = useRef();
    const glow = useMemo(() => glowTexture(), []);
    useFrame((state) => {
        if (!isNear(getState().index, SECTION)) return;
        const t = state.clock.elapsedTime;
        const pulse = 0.6 + (Math.sin(t * 2) * 0.5 + 0.5) * 1.4;
        if (lantern.current) lantern.current.material.emissiveIntensity = 1.5 + pulse;
        if (halo.current) halo.current.material.opacity = 0.6 + pulse * 0.18;
        if (beam.current) beam.current.rotation.y = t * 0.8;
    });
    return (
        <group position={[0, WATER_Y, -3]}>
            {/* tower */}
            <mesh position={[0, 2.4, 0]}>
                <cylinderGeometry args={[0.45, 0.85, 5, 20]} />
                <meshStandardMaterial color="#f5f3ef" emissive="#f97316" emissiveIntensity={0.08} roughness={0.6} />
            </mesh>
            {/* lantern room */}
            <mesh ref={lantern} position={[0, 5.2, 0]}>
                <sphereGeometry args={[0.55, 20, 20]} />
                <meshStandardMaterial color="#fff1c2" emissive="#ffb84d" emissiveIntensity={2} toneMapped={false} />
            </mesh>
            {/* beacon glow halo */}
            <Billboard position={[0, 5.2, 0]}>
                <mesh ref={halo} scale={6}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial map={glow} color="#ffcf8a" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
                </mesh>
            </Billboard>
            {/* roof */}
            <mesh position={[0, 5.85, 0]}>
                <coneGeometry args={[0.6, 0.7, 18]} />
                <meshStandardMaterial color="#b45309" roughness={0.5} />
            </mesh>
            {/* sweeping beam */}
            <group ref={beam} position={[0, 5.2, 0]}>
                <mesh position={[0, 0, 4]} rotation={[Math.PI / 2, 0, 0]}>
                    <coneGeometry args={[1.6, 8, 24, 1, true]} />
                    <meshBasicMaterial color="#ffd27a" transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
}

// Firefly motes drifting upward and recycling.
function Fireflies({ count = 90 }) {
    const ref = useRef();
    const { positions, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (((i * 73) % 100) / 100 - 0.5) * 40;
            positions[i * 3 + 1] = WATER_Y + (((i * 37) % 100) / 100) * 16;
            positions[i * 3 + 2] = (((i * 53) % 100) / 100 - 0.5) * 30 - 4;
            speeds[i] = 0.6 + (((i * 17) % 100) / 100) * 1.2;
        }
        return { positions, speeds };
    }, [count]);

    useFrame((_, dt) => {
        const geo = ref.current;
        if (!geo || !isNear(getState().index, SECTION)) return;
        const arr = geo.attributes.position.array;
        for (let i = 0; i < count; i++) {
            arr[i * 3 + 1] += speeds[i] * dt;
            if (arr[i * 3 + 1] > WATER_Y + 18) arr[i * 3 + 1] = WATER_Y;
        }
        geo.attributes.position.needsUpdate = true;
    });

    return (
        <points>
            <bufferGeometry ref={ref}>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#ffd27a" size={0.12} sizeAttenuation transparent opacity={0.9} depthWrite={false} toneMapped={false} />
        </points>
    );
}

// Radial particle burst fired when the contact form is submitted.
function SuccessBurst() {
    const ref = useRef();
    const matRef = useRef();
    const anim = useRef({ active: false, t: 0 });
    const count = 160;
    const dirs = useMemo(() => {
        const d = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const a = i * 2.399963;
            const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
            d[i * 3] = Math.sin(phi) * Math.cos(a);
            d[i * 3 + 1] = Math.cos(phi);
            d[i * 3 + 2] = Math.sin(phi) * Math.sin(a);
        }
        return d;
    }, []);
    const positions = useMemo(() => new Float32Array(count * 3), []);

    useEffect(() => {
        const fire = () => {
            anim.current.active = true;
            anim.current.t = 0;
        };
        window.addEventListener('contact:success', fire);
        return () => window.removeEventListener('contact:success', fire);
    }, []);

    useFrame((_, dt) => {
        const a = anim.current;
        const geo = ref.current;
        if (!geo) return;
        if (!a.active) {
            if (matRef.current) matRef.current.opacity = 0;
            return;
        }
        a.t += dt;
        const r = a.t * 7;
        const arr = geo.attributes.position.array;
        for (let i = 0; i < count * 3; i += 3) {
            arr[i] = dirs[i] * r;
            arr[i + 1] = WATER_Y + 5.2 + dirs[i + 1] * r;
            arr[i + 2] = -3 + dirs[i + 2] * r;
        }
        geo.attributes.position.needsUpdate = true;
        if (matRef.current) matRef.current.opacity = Math.max(0, 1 - a.t / 1.6);
        if (a.t > 1.6) a.active = false;
    });

    return (
        <points>
            <bufferGeometry ref={ref}>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial ref={matRef} color="#ffe7b0" size={0.22} sizeAttenuation transparent opacity={0} depthWrite={false} toneMapped={false} />
        </points>
    );
}

export default function Ocean() {
    const group = useRef();
    useFrame(() => {
        if (group.current) group.current.visible = isNear(getState().index, SECTION);
    });
    return (
        <group ref={group}>
            <Water />
            <Lighthouse />
            <Fireflies />
            <SuccessBurst />
        </group>
    );
}
