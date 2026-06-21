import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import useDeviceTier from '../../hooks/useDeviceTier';

// Code-split: the three/r3f chunk is only requested when this lazy() resolves,
// which only happens on capable devices (see the `capable` gate below).
const Scene3D = lazy(() => import('./Scene3D'));

/**
 * Drop-in ambient 3D layer for the hero. Renders the WebGL scene only when:
 *   - the device is "capable" (mouse, enough cores/memory, no reduced-motion)
 *   - the hero is actually on screen (IntersectionObserver)
 *   - the tab is visible (visibilitychange)
 * On every other device it renders nothing and the page falls back to the
 * existing CSS blob background in App.jsx — same look, zero JS cost.
 */
export default function Hero3DBackground() {
    const { capable } = useDeviceTier();
    const containerRef = useRef(null);
    const [onScreen, setOnScreen] = useState(false);
    const [tabVisible, setTabVisible] = useState(
        typeof document === 'undefined' ? true : !document.hidden
    );

    useEffect(() => {
        if (!capable) return;
        const el = containerRef.current;
        if (!el || !('IntersectionObserver' in window)) {
            setOnScreen(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => setOnScreen(entry.isIntersecting),
            { rootMargin: '0px', threshold: 0.01 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [capable]);

    useEffect(() => {
        if (!capable) return;
        const onVis = () => setTabVisible(!document.hidden);
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, [capable]);

    if (!capable) return null;

    // Pause the render loop entirely when off-screen or backgrounded.
    const frameloop = onScreen && tabVisible ? 'always' : 'never';

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_85%)]"
        >
            <Suspense fallback={null}>
                <Scene3D frameloop={frameloop} />
            </Suspense>
        </div>
    );
}
