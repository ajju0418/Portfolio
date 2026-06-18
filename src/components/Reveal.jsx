import React from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll-reveal wrapper. Fades + slides children into view once.
 * Usage: <Reveal delay={0.1}>...</Reveal>
 * For staggered grids, wrap items in <Reveal.Stagger> and each child in <Reveal.Item>.
 */
const directions = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
};

const Reveal = ({ children, delay = 0, direction = 'up', className = '', as = 'div' }) => {
    const MotionTag = motion[as] || motion.div;
    const offset = directions[direction] || directions.up;

    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </MotionTag>
    );
};

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

Reveal.Stagger = ({ children, className = '' }) => (
    <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
    >
        {children}
    </motion.div>
);

Reveal.Item = ({ children, className = '' }) => (
    <motion.div className={className} variants={itemVariants}>
        {children}
    </motion.div>
);

export default Reveal;
