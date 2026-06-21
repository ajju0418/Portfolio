import { useEffect, useState } from 'react';

/**
 * Decides how much visual complexity this device should run.
 *
 * Returns { capable, high, reduced }:
 *   - reduced : prefers-reduced-motion is set
 *   - capable : run the full WebGL background (fine pointer + enough cores/mem,
 *               no reduced-motion). False on phones/tablets/low-end → 2D fallback.
 *   - high    : capable AND clearly a strong machine → enables post-processing
 *               (bloom), higher DPR, and denser particle counts.
 *
 * Re-evaluates when the reduced-motion / pointer media queries change.
 */
export default function useDeviceTier() {
    const [tier, setTier] = useState(evaluate);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const pointerQuery = window.matchMedia('(pointer: fine)');
        const onChange = () => setTier(evaluate());
        reduceQuery.addEventListener?.('change', onChange);
        pointerQuery.addEventListener?.('change', onChange);
        return () => {
            reduceQuery.removeEventListener?.('change', onChange);
            pointerQuery.removeEventListener?.('change', onChange);
        };
    }, []);

    return tier;
}

function evaluate() {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return { capable: false, high: false, reduced: false };
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const cores = navigator.hardwareConcurrency;
    const mem = navigator.deviceMemory; // undefined in Firefox/Safari
    const enoughCores = cores === undefined || cores >= 4;
    const enoughMem = mem === undefined || mem >= 4;

    const capable = finePointer && !reduced && enoughCores && enoughMem;
    const high = capable && (cores === undefined || cores >= 8) && (mem === undefined || mem >= 8);

    return { capable, high, reduced };
}
