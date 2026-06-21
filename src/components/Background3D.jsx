import { Suspense, lazy, useEffect, useState } from 'react';
import useDeviceTier from '../hooks/useDeviceTier';
import FallbackBackground from './FallbackBackground';
import CanvasErrorBoundary from './CanvasErrorBoundary';

// Code-split: the heavy three/r3f/postprocessing chunk is only fetched on
// capable devices, when this lazy import resolves.
const SceneCanvas = lazy(() => import('../three/SceneCanvas'));

/**
 * Fixed, full-screen background layer behind all page content.
 *   - Capable desktop  → the WebGL journey (paused when the tab is hidden).
 *   - Everything else   → the lightweight 2D themed fallback.
 */
export default function Background3D() {
    const { capable, high } = useDeviceTier();
    const [tabVisible, setTabVisible] = useState(
        typeof document === 'undefined' ? true : !document.hidden
    );

    useEffect(() => {
        if (!capable) return;
        const onVis = () => setTabVisible(!document.hidden);
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, [capable]);

    if (!capable) {
        return <FallbackBackground />;
    }

    return (
        <div className="fixed inset-0 -z-10" aria-hidden="true">
            <CanvasErrorBoundary fallback={<FallbackBackground />}>
                <Suspense fallback={<FallbackBackground />}>
                    <SceneCanvas frameloop={tabVisible ? 'always' : 'never'} high={high} />
                </Suspense>
            </CanvasErrorBoundary>
        </div>
    );
}
