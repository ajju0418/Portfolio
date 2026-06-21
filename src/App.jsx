import { useEffect } from 'react';
import ShaderBackground from './components/ShaderBackground';
import TopBar from './components/TopBar';
import SectionNav from './components/SectionNav';
import ScrollProgress from './components/ScrollProgress';
import HomeIntro from './sections/HomeIntro';
import JourneyPanel from './sections/JourneyPanel';
import WorkPanel from './sections/WorkPanel';
import ContactPanel from './sections/ContactPanel';
import { profile, sections } from './data/portfolio';
import { registerSections, updateScroll, setPointer } from './lib/scrollStore';

/**
 * Single-page immersive portfolio. A fixed full-screen GLSL background sits
 * behind everything; the content overlay scrolls over it. A scroll listener
 * feeds the shared scroll store (which the shader's colour blend and the dot-nav
 * read), and a pointer listener feeds parallax. Content reveals use ScrollReveal.
 */
export default function App() {
    useEffect(() => {
        // Register section elements so the store can compute the active section.
        registerSections(sections.map((s) => document.getElementById(s.id)));
        updateScroll();

        // Scroll/resize → recompute active section + progress, rAF-throttled.
        let scrollRaf = 0;
        const onScroll = () => {
            if (scrollRaf) return;
            scrollRaf = requestAnimationFrame(() => {
                scrollRaf = 0;
                updateScroll();
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        // Section offsets settle once fonts/images load — recompute then.
        window.addEventListener('load', updateScroll);

        // Pointer → parallax (normalised to -1..1), rAF-throttled.
        let moveRaf = 0;
        const onMove = (e) => {
            if (moveRaf) return;
            moveRaf = requestAnimationFrame(() => {
                moveRaf = 0;
                setPointer(
                    (e.clientX / window.innerWidth) * 2 - 1,
                    (e.clientY / window.innerHeight) * 2 - 1
                );
            });
        };
        window.addEventListener('pointermove', onMove, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('load', updateScroll);
            window.removeEventListener('pointermove', onMove);
            if (scrollRaf) cancelAnimationFrame(scrollRaf);
            if (moveRaf) cancelAnimationFrame(moveRaf);
        };
    }, []);

    const year = new Date().getFullYear();

    // Wrapper is transparent: the fixed -z-10 canvas shows behind content, with
    // the body's bg-ink-900 as the ultimate fallback colour.
    return (
        <div className="relative min-h-screen overflow-x-hidden text-slate-300">
            <ShaderBackground />
            {/* Darkening veil so the background reads as a backdrop, not a competitor */}
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
                    © {year} {profile.fullName}. Built with React, WebGL &amp; Framer Motion.
                </p>
            </footer>
        </div>
    );
}
