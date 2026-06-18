import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * Lightweight toast. Render conditionally and pass an `onClose` handler.
 * type: 'success' | 'error'
 */
const Toast = ({ show, type = 'success', message, onClose, duration = 4000 }) => {
    useEffect(() => {
        if (!show) return undefined;
        const t = setTimeout(onClose, duration);
        return () => clearTimeout(t);
    }, [show, duration, onClose]);

    const isSuccess = type === 'success';
    const Icon = isSuccess ? CheckCircle2 : AlertCircle;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed bottom-6 right-6 z-[100] max-w-sm"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div
                        className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 backdrop-blur-xl shadow-card ${
                            isSuccess
                                ? 'bg-emerald-500/10 border-emerald-400/30'
                                : 'bg-rose-500/10 border-rose-400/30'
                        }`}
                    >
                        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${isSuccess ? 'text-emerald-300' : 'text-rose-300'}`} />
                        <p className="text-sm text-slate-100 flex-1">{message}</p>
                        <button
                            onClick={onClose}
                            aria-label="Dismiss"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
