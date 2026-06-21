import { useSyncExternalStore } from 'react';
import { subscribe, getSection } from '../lib/scrollStore';
import { sections } from '../data/portfolio';

/**
 * Fixed vertical dot-nav. The active dot follows the scroll store (the same
 * source the 3D camera reads), and each dot scrolls smoothly to its section.
 */
export default function SectionNav() {
    const active = useSyncExternalStore(subscribe, getSection, () => 0);

    const go = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            aria-label="Section navigation"
            className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4"
        >
            {sections.map((s, i) => {
                const on = active === i;
                return (
                    <button
                        key={s.id}
                        onClick={() => go(s.id)}
                        aria-label={`Go to ${s.label}`}
                        aria-current={on ? 'true' : undefined}
                        className="group relative flex items-center"
                    >
                        <span
                            className="absolute right-6 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-white/90 bg-black/40 backdrop-blur opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                        >
                            {s.label}
                        </span>
                        <span
                            className="block rounded-full transition-all duration-300"
                            style={{
                                width: on ? 12 : 9,
                                height: on ? 12 : 9,
                                background: on ? s.accent : 'rgba(255,255,255,0.3)',
                                boxShadow: on ? `0 0 12px ${s.accent}` : 'none',
                            }}
                        />
                    </button>
                );
            })}
        </nav>
    );
}
