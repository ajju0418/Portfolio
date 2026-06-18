import React, { useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue, useTransform, motion, useReducedMotion } from 'framer-motion';

/**
 * Counts up to a numeric value when scrolled into view.
 * Preserves any non-numeric suffix/prefix (e.g. "10+", "6").
 */
const Counter = ({ value, className = '', duration = 1.4 }) => {
    const target = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
    const suffix = String(value).replace(/[0-9]/g, '');
    const reduce = useReducedMotion();

    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const mv = useMotionValue(0);
    const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

    useEffect(() => {
        if (!inView) return;
        if (reduce) {
            mv.set(target);
            return;
        }
        const controls = animate(mv, target, { duration, ease: [0.22, 1, 0.36, 1] });
        return () => controls.stop();
    }, [inView, target, reduce, duration, mv]);

    return <motion.span ref={ref} className={className}>{text}</motion.span>;
};

export default Counter;
