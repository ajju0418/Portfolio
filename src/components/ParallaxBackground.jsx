import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Ambient depth background: faint grid + two glow blobs that drift slowly and
 * parallax toward the pointer at different rates (closer layer moves more).
 *
 * Cost is near-zero: only `transform` and `opacity` animate (GPU-composited),
 * one throttled pointermove listener, and it no-ops under reduced motion.
 * This replaces the static blob markup that used to live in App.jsx.
 */
export default function ParallaxBackground() {
    const reduce = useReducedMotion();

    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 40, damping: 20 });
    const sy = useSpring(py, { stiffness: 40, damping: 20 });

    // Two depth planes — the front blob travels further than the back one.
    const backX = useTransform(sx, [-1, 1], [-18, 18]);
    const backY = useTransform(sy, [-1, 1], [-12, 12]);
    const frontX = useTransform(sx, [-1, 1], [40, -40]);
    const frontY = useTransform(sy, [-1, 1], [28, -28]);

    useEffect(() => {
        if (reduce) return;
        let raf = 0;
        const onMove = (e) => {
            // rAF-throttle: collapse a burst of mousemoves into one write per frame.
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                px.set((e.clientX / window.innerWidth) * 2 - 1);
                py.set((e.clientY / window.innerHeight) * 2 - 1);
            });
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [reduce, px, py]);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-faint [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <motion.div
                style={reduce ? undefined : { x: backX, y: backY }}
                className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[140px] animate-float-slow"
            />
            <motion.div
                style={reduce ? undefined : { x: frontX, y: frontY }}
                className="absolute top-[40%] left-[-15%] h-[30rem] w-[30rem] rounded-full bg-accent-glow/15 blur-[150px] animate-float-slow [animation-delay:3s]"
            />
        </div>
    );
}
