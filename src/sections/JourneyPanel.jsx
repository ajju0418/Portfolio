import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import JourneyBackground from '../components/JourneyBackground';
import { experience, education } from '../data/portfolio';

/**
 * Education & Experience overlay. The background switches with the reader: a
 * corporate skyline behind the Experience group, a college campus behind the
 * Education group (see JourneyBackground). An IntersectionObserver watching a
 * thin band at the viewport centre decides which group is "active".
 */

function Milestones({ items }) {
    return (
        <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/60 via-amber-400/25 to-transparent md:left-5" />
            <div className="space-y-7">
                {items.map((item, i) => {
                    const Icon = item.kind === 'work' ? Briefcase : GraduationCap;
                    return (
                        <ScrollReveal key={item.title} delay={i * 0.05}>
                            <div className="relative pl-14 md:pl-16">
                                <span className="absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 bg-ink-800 shadow-[0_0_18px_rgba(245,158,11,0.35)]">
                                    {item.current && (
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400/30 animate-pulse-ring" />
                                    )}
                                    <Icon className="relative z-10 h-4 w-4 text-amber-300" />
                                </span>

                                <div className="glass glass-hover rounded-2xl p-6">
                                    <div className="mb-3 flex flex-wrap items-center gap-3">
                                        <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 font-mono text-xs text-amber-200">
                                            {item.period}
                                        </span>
                                        {item.current && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                                    <p className="mb-3 text-sm font-medium text-slate-400">{item.company}</p>
                                    <p className="mb-4 text-sm leading-relaxed text-slate-300/80">{item.description}</p>
                                    {item.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills.map((s) => (
                                                <span
                                                    key={s}
                                                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    );
                })}
            </div>
        </div>
    );
}

function GroupHeading({ Icon, label, title, sub }) {
    return (
        <ScrollReveal className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-amber-200">
                <Icon className="h-3.5 w-3.5" />
                {label}
            </span>
            <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white text-glow">{title}</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300/80">{sub}</p>
        </ScrollReveal>
    );
}

// Fraction of the viewport height the Education block must rise to before the
// backdrop swaps from the corporate skyline to the campus. Lower = the skyline
// persists longer (you scroll further past Experience before it changes).
const EDU_ENTER = 0.3;

export default function JourneyPanel() {
    const [active, setActive] = useState('work');
    const eduRef = useRef(null);

    useEffect(() => {
        // Keep the skyline behind the whole Experience block; only switch to the
        // campus once you've scrolled past it and Education has risen into the
        // upper third of the viewport.
        let raf = 0;
        const compute = () => {
            raf = 0;
            const el = eduRef.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top;
            setActive(top <= window.innerHeight * EDU_ENTER ? 'edu' : 'work');
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(compute);
        };
        compute();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section id="journey" className="relative">
            <JourneyBackground active={active} />

            <div className="relative z-10">
                <ScrollReveal className="section-shell w-full pt-28 pb-6 text-center">
                    <span className="eyebrow text-amber-300/90">Growth &amp; Progression</span>
                    <h2 className="text-glow mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
                        Education &amp; <span className="text-grad-amber">Experience</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-300/80">
                        Scroll through where I&apos;ve worked and studied — the scene behind shifts with each chapter.
                    </p>
                </ScrollReveal>

                {/* Experience — corporate skyline behind */}
                <div className="section-shell w-full py-20">
                    <GroupHeading
                        Icon={Briefcase}
                        label="Experience"
                        title="Where I've Worked"
                        sub="Hands-on engineering at Cognizant — secure backends, microservices, and Agile delivery."
                    />
                    <Milestones items={experience} />
                </div>

                {/* Education — college campus behind */}
                <div ref={eduRef} className="section-shell w-full py-20">
                    <GroupHeading
                        Icon={GraduationCap}
                        label="Education"
                        title="Where I've Studied"
                        sub="The foundation — computer science, business systems, and the fundamentals."
                    />
                    <Milestones items={education} />
                </div>
            </div>
        </section>
    );
}
