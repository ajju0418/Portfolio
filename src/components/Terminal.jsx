import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Faux developer terminal that types a short session line-by-line.
 * Pure DOM + one interval — no canvas, no deps beyond framer-motion (already
 * in the bundle). Animation only starts when scrolled into view, and under
 * reduced motion it renders the full transcript instantly.
 */
const LINES = [
    { prompt: '~/portfolio $', cmd: 'whoami', out: 'ajay-balasubramaniam — full stack developer' },
    { prompt: '~/portfolio $', cmd: 'cat stack.json', out: '{ "backend": ["Java", "Spring Boot"], "frontend": ["Angular", "React"] }' },
    { prompt: '~/portfolio $', cmd: 'git log --oneline -1', out: 'feat: build scalable, secure enterprise solutions ✔' },
    { prompt: '~/portfolio $', cmd: 'status --open-to-work', out: 'Available for opportunities → Chennai, India' },
];

const TYPE_MS = 38; // per character
const LINE_PAUSE = 480; // after a line completes

export default function Terminal({ className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const reduce = useReducedMotion();

    // Each entry: { cmd: string typed so far, done: boolean }
    const [typed, setTyped] = useState(() => LINES.map(() => ''));
    const [completed, setCompleted] = useState(() => (reduce ? LINES.length : 0));

    useEffect(() => {
        if (reduce) {
            setTyped(LINES.map((l) => l.cmd));
            setCompleted(LINES.length);
            return;
        }
        if (!inView) return;

        let line = 0;
        let char = 0;
        let timer;

        const tick = () => {
            if (line >= LINES.length) return;
            const full = LINES[line].cmd;
            if (char < full.length) {
                char += 1;
                const slice = full.slice(0, char);
                setTyped((prev) => {
                    const next = [...prev];
                    next[line] = slice;
                    return next;
                });
                timer = setTimeout(tick, TYPE_MS);
            } else {
                setCompleted(line + 1);
                line += 1;
                char = 0;
                timer = setTimeout(tick, LINE_PAUSE);
            }
        };

        timer = setTimeout(tick, 400);
        return () => clearTimeout(timer);
    }, [inView, reduce]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`glass rounded-2xl overflow-hidden shadow-card font-mono text-[13px] leading-relaxed ${className}`}
        >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-xs text-slate-500">ajay@dev — zsh</span>
            </div>

            {/* Body */}
            <div className="p-4 space-y-2.5">
                {LINES.map((l, i) => {
                    const isActive = i === completed && completed < LINES.length;
                    const showOut = i < completed;
                    if (i > completed) return null;
                    return (
                        <div key={l.cmd}>
                            <div className="flex flex-wrap gap-x-2">
                                <span className="text-accent-soft shrink-0">{l.prompt}</span>
                                <span className="text-slate-200">
                                    {typed[i]}
                                    {isActive && (
                                        <span className="inline-block w-2 h-4 -mb-0.5 ml-0.5 bg-accent-soft animate-pulse" />
                                    )}
                                </span>
                            </div>
                            {showOut && <div className="text-slate-400 pl-1">{l.out}</div>}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
