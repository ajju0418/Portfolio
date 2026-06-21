import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, Code2, Database, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/LINKED N.png';
import cognizantLogo from '../assets/cognizant.jpeg';
import Reveal from '../components/Reveal';
import Typewriter from '../components/Typewriter';
import SpotlightCard from '../components/SpotlightCard';
import Counter from '../components/Counter';
import Magnetic from '../components/Magnetic';
import Hero3DBackground from '../components/three/Hero3DBackground';
import DevTerminal from '../components/Terminal';
import techStack from '../data/techStack';

const roles = [
    'Software Engineer',
    'Backend Developer',
    'Full Stack Developer',
    'Java & Spring Boot Dev',
    'API Architect',
    'Problem Solver',
];

const EASE = [0.22, 1, 0.36, 1];

// Choreographed entrance: children cascade in one after another
const introContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const introItem = {
    hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: EASE },
    },
};

const imageReveal = {
    hidden: { opacity: 0, scale: 0.9, y: 16, filter: 'blur(8px)' },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.9, ease: EASE },
    },
};

const expertise = [
    {
        title: 'Frontend Development',
        icon: Code2,
        description: 'Building responsive, performant user interfaces with modern frameworks.',
        skills: ['Angular', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
        title: 'Backend Development',
        icon: Database,
        description: 'Developing robust server-side applications and microservices.',
        skills: ['Java', 'Spring', 'Spring Boot', 'MySQL', 'MongoDB', 'REST APIs'],
    },
    {
        title: 'Tools & Problem Solving',
        icon: Terminal,
        description: 'Development tooling and algorithmic problem solving.',
        skills: ['Git', 'VS Code', 'Postman', 'LeetCode', 'Data Structures', 'Algorithms'],
    },
];

const socials = [
    { Icon: Github, href: 'https://github.com/ajju0418', label: 'GitHub' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/ajay-b-9974b0237', label: 'LinkedIn' },
    { Icon: Mail, href: 'mailto:ajaybalu9481@gmail.com', label: 'Email' },
];

const techCategories = ['All', ...Array.from(new Set(techStack.map((t) => t.category)))];

const Hero = () => {
    const [activeCat, setActiveCat] = useState('All');
    const filteredTech = activeCat === 'All' ? techStack : techStack.filter((t) => t.category === activeCat);

    return (
        <section id="home" className="relative pt-32 pb-10">
            {/* WebGL ambient layer — lazy-loaded & gated; no-ops on mobile/reduced-motion */}
            <Hero3DBackground />
            <div className="section-shell w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left — Profile */}
                    <motion.div
                        className="flex flex-col items-center lg:items-end gap-6 order-2 lg:order-1"
                        variants={introContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div className="relative" variants={imageReveal}>
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/30 to-accent-glow/20 blur-2xl animate-float-slow" />
                            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-white/15 shadow-card">
                                <img src={profileImage} alt="Ajay B — Full Stack Developer" className="w-full h-full object-cover" />
                            </div>
                        </motion.div>

                        <motion.div className="glass rounded-2xl p-5 w-72 sm:w-80" variants={introItem}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0">
                                    <img src={cognizantLogo} alt="Cognizant" className="w-8 h-8 object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">Programmer Analyst Trainee</h3>
                                    <p className="text-slate-400 text-xs">Cognizant Technology Solutions</p>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                        </span>
                                        <span className="text-xs text-emerald-300 font-medium">Currently</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — Content */}
                    <motion.div
                        className="space-y-6 order-1 lg:order-2"
                        variants={introContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.span variants={introItem} className="eyebrow block">Available for opportunities</motion.span>

                        <motion.h1 variants={introItem} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                            Hi, I'm <span className="text-gradient">Ajay</span>
                        </motion.h1>

                        <motion.div variants={introItem} className="flex items-baseline gap-2 text-2xl sm:text-3xl lg:text-4xl font-display font-semibold min-h-[2.75rem] sm:min-h-[3.25rem] lg:min-h-[3.75rem]">
                            <span className="text-slate-400">I'm a</span>
                            <Typewriter
                                words={roles}
                                className="text-gradient"
                                cursorClassName="bg-accent-soft"
                            />
                        </motion.div>

                        <motion.p variants={introItem} className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
                            Building secure, enterprise-grade solutions at Cognizant. Specialized in{' '}
                            <span className="text-slate-200 font-medium">Angular</span>,{' '}
                            <span className="text-slate-200 font-medium">Java</span>, and{' '}
                            <span className="text-slate-200 font-medium">Spring Boot</span> — with a focus on clean
                            code, performance, and modern architecture.
                        </motion.p>

                        <motion.div variants={introItem} className="flex flex-wrap gap-3">
                            <Magnetic>
                                <Link to="/projects" className="btn-primary group">
                                    View Projects
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Magnetic>
                            <Magnetic>
                                <a href="/Ajay_B_Resume.pdf" download className="btn-ghost">
                                    <Download className="h-4 w-4" />
                                    Résumé
                                </a>
                            </Magnetic>
                        </motion.div>

                        <motion.div variants={introItem} className="flex flex-wrap items-center gap-3 pt-1">
                            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm">
                                <span>📍</span>
                                <span className="text-slate-300 font-medium">Chennai, India</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-sm">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                <span className="text-emerald-300 font-medium">Open to opportunities</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {socials.map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={introItem} className="grid grid-cols-3 gap-3 pt-2 max-w-md">
                            {[
                                { value: '10+', label: 'Technologies' },
                                { value: '5+', label: 'Projects' },
                                { value: '6', label: 'Certifications' },
                            ].map((stat) => (
                                <div key={stat.label} className="glass glass-hover rounded-xl p-4 text-center">
                                    <Counter value={stat.value} className="block text-2xl font-display font-bold text-gradient" />
                                    <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Interactive terminal — types a quick dev session */}
                <Reveal className="mt-20 max-w-2xl mx-auto">
                    <DevTerminal />
                </Reveal>

                {/* Tech Stack */}
                <div className="mt-28">
                    <Reveal className="text-center mb-8">
                        <span className="eyebrow">Toolbox</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">Tech Stack</h2>
                        <p className="text-slate-400 mt-2">Technologies I work with daily</p>
                    </Reveal>

                    {/* Category filter chips */}
                    <Reveal className="flex flex-wrap justify-center gap-2 mb-10">
                        {techCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 ${
                                    activeCat === cat ? 'text-white' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {activeCat === cat && (
                                    <motion.span
                                        layoutId="tech-filter-active"
                                        className="absolute inset-0 rounded-full bg-accent/90 shadow-glow"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </Reveal>

                    <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
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
                                    <div className="group glass glass-hover rounded-2xl p-5 flex flex-col items-center text-center h-full">
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            loading="lazy"
                                            className="w-11 h-11 mb-3 grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                                        />
                                        <h3 className="font-medium text-slate-200 text-sm">{tech.name}</h3>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
                                            {tech.category}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Technical Expertise */}
                <div className="mt-28 mb-10">
                    <Reveal className="text-center mb-14">
                        <span className="eyebrow">Capabilities</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
                            Technical <span className="text-gradient">Expertise</span>
                        </h2>
                        <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                            A full-stack skill set spanning interface, services, and tooling.
                        </p>
                    </Reveal>

                    <Reveal.Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {expertise.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <Reveal.Item key={cat.title}>
                                    <SpotlightCard className="group glass glass-hover rounded-2xl p-7 flex flex-col" maxTilt={5}>
                                        <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                                            <Icon className="w-7 h-7 text-accent-soft" />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-white mb-2">{cat.title}</h3>
                                        <p className="text-slate-400 text-sm mb-6">{cat.description}</p>
                                        <div className="mt-auto flex flex-wrap gap-2">
                                            {cat.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 bg-white/5 border border-white/10"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </SpotlightCard>
                                </Reveal.Item>
                            );
                        })}
                    </Reveal.Stagger>
                </div>
            </div>
        </section>
    );
};

export default Hero;
