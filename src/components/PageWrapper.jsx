import React from 'react';
import { motion } from 'framer-motion';

/** Wraps each routed page for smooth enter/exit transitions. */
const PageWrapper = ({ children, className = '' }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

export default PageWrapper;
