import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Wraps an interactive element so it "pulls" toward the cursor on hover.
 * No-ops under prefers-reduced-motion.
 */
const Magnetic = ({ children, strength = 0.35, className = '' }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 16 });
    const sy = useSpring(y, { stiffness: 220, damping: 16 });

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (reduce) return <span className={`inline-flex ${className}`}>{children}</span>;

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x: sx, y: sy }}
            className={`inline-flex ${className}`}
        >
            {children}
        </motion.span>
    );
};

export default Magnetic;
