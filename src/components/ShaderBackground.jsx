import { useEffect, useRef, useState } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';
import { getState } from '../lib/scrollStore';
import { sections } from '../data/portfolio';
import FallbackBackground from './FallbackBackground';

/**
 * Full-screen animated background drawn by ONE GLSL fragment shader on a single
 * fullscreen triangle (one draw call per frame) via OGL (~8 KB). Replaces the
 * old Three.js / R3F / postprocessing stack — far lighter to ship and buttery
 * even on phones, so every visitor gets the same look.
 *
 *   - Section colour comes from the shared scroll store (continuous section
 *     index → blend of adjacent accents), so it stays in sync with the page.
 *   - Pointer drives a subtle parallax; the loop pauses when the tab is hidden.
 *   - prefers-reduced-motion → a single static frame (no animation).
 *   - No WebGL → the lightweight 2D <FallbackBackground />.
 */

function hexToRgb(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
const SECTION_COLORS = sections.map((s) => hexToRgb(s.accent));

const VERT = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const FRAG = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uScroll;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uMix;

    float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }
    float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p = p * 2.0 + 11.3;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 p = vUv - 0.5;
        p.x *= uResolution.x / uResolution.y;
        p += uPointer * 0.06;

        float t = uTime * 0.04;

        // Domain-warped flow field → drifting aurora ribbons.
        vec2 q = vec2(fbm(p * 1.6 + vec2(0.0, t)), fbm(p * 1.6 + vec2(5.2, -t)));
        float flow = fbm(p * 2.2 + q * 1.8 + vec2(0.0, t * 1.5));

        vec3 tint = mix(uColorA, uColorB, uMix);
        float ribbon = smoothstep(0.35, 0.85, flow);
        float glow = pow(ribbon, 1.6);

        vec3 col = vec3(0.015, 0.02, 0.05);
        col += tint * glow;
        col += tint * 0.16 * smoothstep(0.7, -0.2, p.y); // soft top wash

        // Faint stars in the darker regions.
        float star = step(0.996, hash(floor(vUv * uResolution.xy / 2.5)));
        col += vec3(star) * (1.0 - ribbon) * 0.45;

        // Vignette + gentle scroll-driven exposure.
        col *= smoothstep(1.15, 0.25, length(p));
        col *= 0.9 + 0.12 * sin(uScroll * 3.14159);

        gl_FragColor = vec4(col, 1.0);
    }
`;

export default function ShaderBackground() {
    const ref = useRef(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const mount = ref.current;
        if (!mount) return undefined;

        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        let renderer;
        try {
            renderer = new Renderer({
                alpha: false,
                antialias: false,
                dpr: Math.min(window.devicePixelRatio || 1, 1.5),
            });
        } catch {
            renderer = null;
        }
        if (!renderer) {
            setFailed(true);
            return undefined;
        }

        const gl = renderer.gl;
        gl.canvas.style.display = 'block';
        mount.appendChild(gl.canvas);

        const program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [1, 1] },
                uPointer: { value: [0, 0] },
                uScroll: { value: 0 },
                uColorA: { value: SECTION_COLORS[0] },
                uColorB: { value: SECTION_COLORS[1] || SECTION_COLORS[0] },
                uMix: { value: 0 },
            },
        });
        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
            if (reduce) renderer.render({ scene: mesh });
        };
        resize();
        window.addEventListener('resize', resize);

        let raf = 0;
        let px = 0;
        let py = 0;
        const last = SECTION_COLORS.length - 1;

        const render = (time) => {
            const st = getState();
            const idx = Math.max(0, Math.min(last, st.index));
            const i0 = Math.floor(idx);
            program.uniforms.uColorA.value = SECTION_COLORS[i0];
            program.uniforms.uColorB.value = SECTION_COLORS[Math.min(last, i0 + 1)];
            program.uniforms.uMix.value = idx - i0;
            program.uniforms.uScroll.value = st.progress;

            px += (st.pointerX - px) * 0.05;
            py += (st.pointerY - py) * 0.05;
            program.uniforms.uPointer.value = [px, py];
            program.uniforms.uTime.value = time * 0.001;

            renderer.render({ scene: mesh });
            raf = requestAnimationFrame(render);
        };

        const start = () => {
            if (!raf) raf = requestAnimationFrame(render);
        };
        const stop = () => {
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
        };

        if (reduce) {
            program.uniforms.uTime.value = 8.0;
            renderer.render({ scene: mesh });
        } else {
            start();
        }

        const onVisibility = () => {
            if (reduce) return;
            if (document.hidden) stop();
            else start();
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            stop();
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVisibility);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            gl.canvas.parentNode?.removeChild(gl.canvas);
        };
    }, []);

    if (failed) return <FallbackBackground />;

    return <div ref={ref} className="fixed inset-0 -z-10" aria-hidden="true" />;
}
