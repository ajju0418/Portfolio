import { useSyncExternalStore } from 'react';
import { subscribe, getSection } from '../lib/scrollStore';

/**
 * Lightweight 2D stand-in for the WebGL background, used on phones / low-power /
 * reduced-motion devices. Four themed gradient layers crossfade as the active
 * section changes (driven by the same scroll store the 3D scenes read), plus a
 * field of slowly drifting CSS particles. Zero WebGL, near-zero CPU.
 */

const THEMES = [
    // Home — aurora: flowing cyan + violet light ribbons over deep space blue
    'radial-gradient(70rem 32rem at 50% 8%, rgba(25,224,255,0.20), transparent 62%), radial-gradient(55rem 40rem at 80% 30%, rgba(139,107,255,0.18), transparent 60%), radial-gradient(50rem 50rem at 12% 78%, rgba(58,139,255,0.16), transparent 60%), #05041a',
    // Journey — warm amber / gold
    'radial-gradient(55rem 55rem at 20% 18%, rgba(245,158,11,0.20), transparent 60%), radial-gradient(50rem 50rem at 85% 78%, rgba(252,211,77,0.14), transparent 60%), #0c0900',
    // Projects — deep purple, pink + green
    'radial-gradient(55rem 55rem at 80% 20%, rgba(236,72,153,0.18), transparent 60%), radial-gradient(50rem 50rem at 15% 82%, rgba(16,185,129,0.16), transparent 60%), #120a2e',
    // Contact — teal → sunset orange
    'radial-gradient(60rem 60rem at 25% 80%, rgba(13,148,136,0.22), transparent 60%), radial-gradient(50rem 50rem at 80% 15%, rgba(249,115,22,0.18), transparent 60%), #03201d',
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 2 + (i % 3),
    delay: `${(i % 10) * 0.7}s`,
    duration: `${9 + (i % 6) * 2}s`,
}));

export default function FallbackBackground() {
    const section = useSyncExternalStore(subscribe, getSection, () => 0);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
            {THEMES.map((bg, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-1000 ease-out"
                    style={{ background: bg, opacity: section === i ? 1 : 0 }}
                />
            ))}
            <div className="absolute inset-0 bg-grid-faint [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div className="absolute inset-0">
                {PARTICLES.map((p, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full bg-white/40 animate-fall-drift"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
