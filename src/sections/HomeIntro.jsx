import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Typewriter from '../components/Typewriter';
import ScrollReveal from '../components/ScrollReveal';
import { profile, techStack, techCategories } from '../data/portfolio';

const socials = [
    { Icon: Github, href: 'https://github.com/ajju0418', label: 'GitHub' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/ajay-b-9974b0237', label: 'LinkedIn' },
    { Icon: Mail, href: 'mailto:ajaybalu9481@gmail.com', label: 'Email' },
];

const stats = [
    { value: '10+', label: 'Technologies' },
    { value: '5+', label: 'Projects' },
    { value: '6', label: 'Certifications' },
];

const EASE = [0.22, 1, 0.36, 1];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function HomeIntro() {
    const [activeCat, setActiveCat] = useState('All');
    const filteredTech = activeCat === 'All' ? techStack : techStack.filter((t) => t.category === activeCat);

    return (
        <section id="home" className="relative">
            {/* ── Hero — first full screen ─────────────────────────────────── */}
            <div className="relative flex min-h-screen items-center justify-center py-28">
                <div className="section-shell w-full">
                    <div className="hero-scrim relative mx-auto max-w-3xl text-center">
                        <ScrollReveal>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.25em] text-cyan-300 backdrop-blur">
                                <Sparkles className="h-3.5 w-3.5" />
                                Available for opportunities
                            </span>
                        </ScrollReveal>

                        <ScrollReveal delay={0.05}>
                            <h1 className="text-glow mt-7 font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.04]">
                                Hi, I&apos;m{' '}
                                <span className="hero-name text-[1.18em] leading-none">{profile.name}</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="mt-4 flex items-baseline justify-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-display font-semibold min-h-[2.75rem] sm:min-h-[3.25rem] lg:min-h-[3.75rem]">
                                <span className="text-slate-400">I&apos;m a</span>
                                <Typewriter words={profile.roles} className="text-grad-cyan" cursorClassName="bg-cyan-300" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.15}>
                            <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-slate-300/90 leading-relaxed">
                                {profile.blurb}
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <button onClick={() => scrollTo('work')} className="btn-primary group">
                                    View Projects
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                                <a href={profile.resume} download className="btn-ghost">
                                    <Download className="h-4 w-4" />
                                    Résumé
                                </a>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.25}>
                            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                                <span className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm">
                                    <span>📍</span>
                                    <span className="font-medium text-slate-200">{profile.location}</span>
                                </span>
                                <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span className="font-medium text-emerald-300">Open to opportunities</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    {socials.map(({ Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="rounded-full p-2.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="mx-auto mt-9 grid max-w-md grid-cols-3 gap-3">
                                {stats.map((s) => (
                                    <div key={s.label} className="glass rounded-xl p-4 text-center">
                                        <span className="block text-2xl font-display font-bold text-grad-cyan">{s.value}</span>
                                        <span className="mt-0.5 block text-xs text-slate-400">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500">
                    <div className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
                        <span className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
                    </div>
                </div>
            </div>

            {/* ── Tech Stack — below the hero ──────────────────────────────── */}
            <div className="relative pb-28">
                <div className="section-shell w-full">
                    <ScrollReveal className="text-center mb-8">
                        <span className="eyebrow text-cyan-300/90">Toolbox</span>
                        <h2 className="text-glow mt-3 font-display text-3xl sm:text-4xl font-bold text-white">
                            Tech <span className="text-grad-cyan">Stack</span>
                        </h2>
                        <p className="mt-3 text-slate-300/80">The technologies I build with every day.</p>
                    </ScrollReveal>

                    {/* Category filter chips */}
                    <ScrollReveal delay={0.05} className="mb-10 flex flex-wrap justify-center gap-2">
                        {techCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300 ${
                                    activeCat === cat ? 'text-white' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {activeCat === cat && (
                                    <motion.span
                                        layoutId="tech-filter-active"
                                        className="absolute inset-0 rounded-full bg-cyan-500/80 shadow-[0_0_20px_rgba(34,211,238,0.45)]"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <motion.div layout className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                            <AnimatePresence mode="popLayout">
                                {filteredTech.map((tech) => (
                                    <motion.div
                                        key={tech.name}
                                        layout
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.85 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                    >
                                        <div className="group glass glass-hover flex h-full flex-col items-center rounded-2xl p-5 text-center">
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                                loading="lazy"
                                                className="mb-3 h-11 w-11 opacity-80 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                                            />
                                            <h3 className="text-sm font-medium text-slate-200">{tech.name}</h3>
                                            <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                                {tech.category}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
