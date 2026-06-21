import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Background3D from './components/Background3D';
import TopBar from './components/TopBar';
import SectionNav from './components/SectionNav';
import ScrollProgress from './components/ScrollProgress';
import HomeIntro from './sections/HomeIntro';
import JourneyPanel from './sections/JourneyPanel';
import WorkPanel from './sections/WorkPanel';
import ContactPanel from './sections/ContactPanel';
import { profile, sections } from './data/portfolio';
import { registerSections, updateScroll, setPointer } from './lib/scrollStore';

gsap.registerPlugin(ScrollTrigger);

/**
 * Single-page immersive portfolio. A fixed full-screen 3D background sits behind
 * everything; the content overlay scrolls over it. A GSAP ScrollTrigger drives
 * the shared scroll store (which the 3D camera, theme blend, and dot-nav all
 * read), and a pointer listener feeds parallax. Content reveals use ScrollReveal.
 */
export default function App() {
    useEffect(() => {
        // Register section elements so the store can compute the active section.
        registerSections(sections.map((s) => document.getElementById(s.id)));
        updateScroll();

        // Tie the scene transitions to a global ScrollTrigger spanning the page.
        const st = ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: updateScroll,
            onRefresh: updateScroll,
        });

        // Pointer → parallax (normalised to -1..1), rAF-throttled.
        let raf = 0;
        const onMove = (e) => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                setPointer(
                    (e.clientX / window.innerWidth) * 2 - 1,
                    (e.clientY / window.innerHeight) * 2 - 1
                );
            });
        };
        window.addEventListener('pointermove', onMove, { passive: true });

        // Recompute on resize (heights change) — debounced via ScrollTrigger refresh.
        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', onResize);

        return () => {
            st.kill();
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('resize', onResize);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const year = new Date().getFullYear();

    // Wrapper is transparent: the fixed -z-10 canvas shows behind content, with
    // the body's bg-ink-900 as the ultimate fallback colour.
    return (
        <div className="relative min-h-screen overflow-x-hidden text-slate-300">
            <Background3D />
            {/* Darkening veil so the 3D reads as a backdrop, not a competitor */}
            <div className="fx-backdrop" aria-hidden="true" />
            <ScrollProgress />
            <TopBar />
            <SectionNav />

            <main className="overlay-root relative z-10">
                <HomeIntro />
                <JourneyPanel />
                <WorkPanel />
                <ContactPanel />
            </main>

            {/* Cinematic framing — sit above the canvas, never block clicks */}
            <div className="fx-vignette" aria-hidden="true" />
            <div className="fx-grain" aria-hidden="true" />

            <footer className="relative z-10 border-t border-white/10 py-8 text-center">
                <p className="text-sm text-slate-400">
                    © {year} {profile.fullName}. Built with React, Three.js &amp; GSAP.
                </p>
            </footer>
        </div>
    );
}
