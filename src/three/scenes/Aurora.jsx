import { useMemo, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { getState } from '../../lib/scrollStore';
import { BANDS, isNear } from '../layout';
import { glowTexture } from '../glow';

const SECTION = 0;
const BAND = BANDS[0];

/**
 * The Home scene: a premium aurora field. Replaces the old orbiting tech orbs
 * (those now live as a DOM "Tech Stack" section below the hero). Three softly
 * drifting light curtains in cyan→violet, a faint horizon glow, and a slow
 * field of luminous motes — simple, rich, and never competing with the copy.
 */

// Flowing aurora-curtain shader. Additive, so it layers as light over the
// SkyDome gradient rather than as an opaque plane.
const AuroraMaterial = shaderMaterial(
    {
        uTime: 0,
        uColA: new THREE.Color('#19e0ff'),
        uColB: new THREE.Color('#8b6bff'),
        uColC: new THREE.Color('#3a8bff'),
    },
    /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    /* glsl */ `
    uniform float uTime;
    uniform vec3 uColA;
    uniform vec3 uColB;
    uniform vec3 uColC;
    varying vec2 vUv;

    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float noise(vec2 p){
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.55;
      for (int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2.0 + 1.7; a *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = vUv;
      float t = uTime * 0.05;
      vec3 col = vec3(0.0);
      float glow = 0.0;

      for (int i = 0; i < 3; i++){
        float fi = float(i);
        float base = 0.30 + fi * 0.20;
        float wob = (fbm(vec2(uv.x * 1.6 + fi * 4.0, t + fi * 2.0)) - 0.5) * 0.42;
        float d = abs(uv.y - base - wob);
        float band = smoothstep(0.22, 0.0, d);
        float streak = 0.55 + 0.45 * fbm(vec2(uv.x * 7.0 - t * 3.0, fi * 5.0 + t));
        band *= streak;
        vec3 c = mix(uColA, uColB, clamp(uv.y * 0.6 + fi * 0.25, 0.0, 1.0));
        col += c * band;
        glow += band;
      }

      float edge = smoothstep(0.0, 0.18, uv.x) * smoothstep(1.0, 0.82, uv.x);
      float vfade = smoothstep(0.0, 0.18, uv.y) * smoothstep(1.0, 0.72, uv.y);
      float mask = edge * vfade;
      col *= mask; glow *= mask;
      col += uColC * 0.03 * edge;
      gl_FragColor = vec4(col, clamp(glow, 0.0, 1.0));
    }
  `
);
extend({ AuroraMaterial });

function AuroraCurtains() {
    const mat = useRef();
    useFrame((state) => {
        if (!isNear(getState().index, SECTION)) return;
        if (mat.current) mat.current.uTime = state.clock.elapsedTime;
    });
    return (
        <mesh position={[0, 1.5, -12]} renderOrder={-1}>
            <planeGeometry args={[72, 40, 1, 1]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <auroraMaterial
                ref={mat}
                transparent
                depthWrite={false}
                fog={false}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
            />
        </mesh>
    );
}

// Faint horizon glow + a high soft bloom, for richness behind the copy.
function HorizonGlow() {
    const glow = useMemo(() => glowTexture(), []);
    return (
        <Billboard position={[0, -1.5, -9]}>
            <mesh>
                <planeGeometry args={[34, 18]} />
                <meshBasicMaterial
                    map={glow}
                    color="#2a6bff"
                    transparent
                    opacity={0.22}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    toneMapped={false}
                />
            </mesh>
        </Billboard>
    );
}

// Slow field of luminous motes drifting through the home band. Static buffer +
// a gentle group rotation/bob, so it costs almost nothing per frame.
function Motes({ count }) {
    const ref = useRef();
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const a = i * 2.399963;
            const r = 2.5 + ((i * 7) % 90) / 9;
            arr[i * 3] = Math.cos(a) * r;
            arr[i * 3 + 1] = -6 + ((i * 0.6180339) % 1) * 14;
            arr[i * 3 + 2] = Math.sin(a) * r - 4;
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (!ref.current || !isNear(getState().index, SECTION)) return;
        const t = state.clock.elapsedTime;
        ref.current.rotation.y = t * 0.02;
        ref.current.position.y = Math.sin(t * 0.25) * 0.4;
        ref.current.material.opacity = 0.4 + Math.sin(t * 0.7) * 0.12;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color="#bfe6ff"
                size={0.05}
                sizeAttenuation
                transparent
                opacity={0.45}
                depthWrite={false}
                fog={false}
                toneMapped={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function Aurora({ high = false }) {
    const group = useRef();
    useFrame(() => {
        if (group.current) group.current.visible = isNear(getState().index, SECTION);
    });
    return (
        <group ref={group} position={[0, BAND, 0]}>
            <AuroraCurtains />
            <HorizonGlow />
            <Motes count={high ? 520 : 280} />
        </group>
    );
}
