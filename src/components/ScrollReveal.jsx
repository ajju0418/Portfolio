import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fade + lift + de-blur reveal as children enter the viewport (and reverses on
 * the way out). Built on framer-motion's whileInView so it ships no extra
 * dependency. No-ops under prefers-reduced-motion.
 */
const EASE = [0.22, 1, 0.36, 1];

export default function ScrollReveal({
    children,
    className = '',
    y = 28,
    delay = 0,
    as = 'div',
}) {
    const reduce = useReducedMotion();
    const Tag = motion[as] || motion.div;

    if (reduce) {
        return <Tag className={className}>{children}</Tag>;
    }

    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </Tag>
    );
}
