import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { profile, sections } from '../data/portfolio';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/** Slim single-page top bar. Logo scrolls to top; links scroll to sections. */
export default function TopBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled ? 'border-b border-white/10 bg-ink-900/70 backdrop-blur-xl' : 'border-b border-transparent'
            }`}
        >
            <div className="section-shell flex h-16 items-center justify-between">
                <button onClick={() => scrollTo('home')} className="group flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-display text-sm font-bold text-white shadow-[0_0_18px_rgba(0,240,255,0.4)] transition-transform group-hover:scale-110">
                        {profile.initials}
                    </span>
                    <span className="hidden leading-tight sm:block">
                        <span className="block font-display text-sm font-bold text-white">{profile.fullName}</span>
                        <span className="-mt-0.5 block font-mono text-[11px] tracking-wide text-slate-400">{profile.title}</span>
                    </span>
                </button>

                <nav className="hidden items-center gap-1 md:flex">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => scrollTo(s.id)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                        >
                            {s.label}
                        </button>
                    ))}
                </nav>

                <a
                    href="https://github.com/ajju0418"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <Github className="h-5 w-5" />
                </a>
            </div>
        </header>
    );
}
