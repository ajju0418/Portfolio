import { useMemo, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { getState } from '../lib/scrollStore';
import { bracket } from './layout';

// Vertical gradient skybox — a big inverted sphere centred on the camera. Gives
// the scene real atmospheric depth instead of a flat clear colour, and the two
// gradient stops crossfade between section palettes as you scroll.
const SkyMaterial = shaderMaterial(
    { uTop: new THREE.Color('#02010f'), uBottom: new THREE.Color('#0a0a3a') },
    /* glsl */ `
    varying vec3 vDir;
    void main() {
      vDir = normalize(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    /* glsl */ `
    uniform vec3 uTop;
    uniform vec3 uBottom;
    varying vec3 vDir;
    void main() {
      float t = smoothstep(-0.35, 0.55, vDir.y);
      vec3 col = mix(uBottom, uTop, t);
      // subtle horizon brightening
      col += pow(1.0 - abs(vDir.y), 6.0) * 0.06;
      gl_FragColor = vec4(col, 1.0);
    }
  `
);
extend({ SkyMaterial });

const TOP = ['#02010f', '#0a0600', '#0a0420', '#021412'].map((c) => new THREE.Color(c));
const BOTTOM = ['#0a1048', '#3a2206', '#26104a', '#06403a'].map((c) => new THREE.Color(c));

export default function SkyDome() {
    const mesh = useRef();
    const mat = useRef();
    const cTop = useMemo(() => new THREE.Color(), []);
    const cBottom = useMemo(() => new THREE.Color(), []);

    useFrame(({ camera }) => {
        if (mesh.current) mesh.current.position.copy(camera.position);
        const { lo, hi, f } = bracket(getState().index, TOP.length - 1);
        if (mat.current) {
            mat.current.uTop = cTop.copy(TOP[lo]).lerp(TOP[hi], f);
            mat.current.uBottom = cBottom.copy(BOTTOM[lo]).lerp(BOTTOM[hi], f);
        }
    });

    return (
        <mesh ref={mesh} frustumCulled={false} renderOrder={-1}>
            <sphereGeometry args={[120, 32, 16]} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <skyMaterial ref={mat} side={THREE.BackSide} depthWrite={false} fog={false} />
        </mesh>
    );
}
