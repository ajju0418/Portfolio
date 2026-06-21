import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Glass card with a cursor-following spotlight glow and a subtle 3D tilt.
 * Pass surface classes via `className` (e.g. "glass glass-hover rounded-2xl").
 * Tilt + spotlight automatically disable under prefers-reduced-motion.
 */
const SpotlightCard = ({
    children,
    className = '',
    tilt = true,
    spotlight = true,
    maxTilt = 6,
}) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const enableTilt = tilt && !reduce;
    const enableSpot = spotlight && !reduce;

    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const raf = useRef(0);

    const rotateX = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), { stiffness: 200, damping: 22 });
    const rotateY = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), { stiffness: 200, damping: 22 });

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        // rAF-throttle: at most one geometry read + write per frame, even if
        // mousemove fires dozens of times between frames.
        if (raf.current) return;
        const { clientX, clientY } = e;
        raf.current = requestAnimationFrame(() => {
            raf.current = 0;
            const rect = el.getBoundingClientRect();
            const px = (clientX - rect.left) / rect.width;
            const py = (clientY - rect.top) / rect.height;
            mx.set(px);
            my.set(py);
            if (enableSpot) {
                el.style.setProperty('--mx', `${px * 100}%`);
                el.style.setProperty('--my', `${py * 100}%`);
            }
        });
    };

    const handleLeave = () => {
        if (raf.current) {
            cancelAnimationFrame(raf.current);
            raf.current = 0;
        }
        mx.set(0.5);
        my.set(0.5);
    };

    return (
        <div className="h-full [perspective:1100px]">
            <motion.div
                ref={ref}
                onMouseMove={enableTilt || enableSpot ? handleMove : undefined}
                onMouseLeave={enableTilt || enableSpot ? handleLeave : undefined}
                style={enableTilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
                className="spotlight-card h-full rounded-2xl overflow-hidden"
            >
                <div className={`relative z-10 h-full ${className}`}>{children}</div>
            </motion.div>
        </div>
    );
};

export default SpotlightCard;
