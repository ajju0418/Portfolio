import { ArrowUpRight, Github } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SpotlightCard from '../components/SpotlightCard';
import { projects } from '../data/portfolio';

/**
 * Projects overlay — glass cards that echo the floating 3D gallery panels.
 * Each card's accent is the same colour as its panel in the scene behind it.
 */
export default function WorkPanel() {
    return (
        <section id="work" className="relative min-h-screen flex items-center py-28">
            <div className="section-shell w-full">
                <ScrollReveal className="text-center mb-14">
                    <span className="eyebrow text-pink-300/90">Selected Work</span>
                    <h2 className="text-glow mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
                        Featured <span className="text-grad-pink">Projects</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-300/80">
                        Practical, end-to-end applications of my technical skills. Click a panel in the gallery, or a card below.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {projects.map((p, i) => (
                        <ScrollReveal key={p.title} delay={(i % 2) * 0.08}>
                            <SpotlightCard className="group glass glass-hover flex h-full flex-col overflow-hidden rounded-2xl" maxTilt={5}>
                                <div
                                    className="h-1.5 w-full"
                                    style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
                                />
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                                            <p className="text-xs font-medium" style={{ color: p.accent }}>
                                                {p.subtitle}
                                            </p>
                                        </div>
                                        <a
                                            href={p.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${p.title} on GitHub`}
                                            className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 transition-colors hover:text-white"
                                        >
                                            <Github className="h-4 w-4" />
                                        </a>
                                    </div>
                                    <p className="mb-5 text-sm leading-relaxed text-slate-300/80">{p.description}</p>
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {p.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={p.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                                        style={{ color: p.accent }}
                                    >
                                        View project
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                </div>
                            </SpotlightCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
