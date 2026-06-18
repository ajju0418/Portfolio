import React from 'react';
import { ExternalLink, Github, BookOpen, Database, ShoppingCart, Zap } from 'lucide-react';
import Reveal from '../components/Reveal';
import SpotlightCard from '../components/SpotlightCard';

const projects = [
    {
        title: 'NEXURA',
        subtitle: 'Full-Stack TypeScript Application',
        description:
            'A modern full-stack application built with TypeScript, featuring a robust backend architecture and responsive frontend. Demonstrates clean code practices and modern web development patterns.',
        tags: ['TypeScript', 'Full-Stack', 'Modern Web', 'REST API'],
        icon: Zap,
        accent: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
        bar: 'from-amber-400 to-orange-500',
        features: ['TypeScript-first approach', 'Frontend & backend integration', 'Modern architecture'],
        githubLink: 'https://github.com/ajju0418/NEXURA',
        liveLink: null,
    },
    {
        title: 'E-commerce MyStore',
        subtitle: 'Full-Stack Microservices Platform',
        description:
            'A complete e-commerce application with a Spring Boot microservices backend and Angular frontend. Includes API Gateway, Eureka service discovery, and services for users, products, cart, orders, and payments.',
        tags: ['Spring Boot', 'Angular', 'Microservices', 'Spring Cloud', 'JWT'],
        icon: ShoppingCart,
        accent: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
        bar: 'from-emerald-400 to-teal-500',
        features: ['8-microservice architecture', 'API gateway & service discovery', 'Admin panel & payments'],
        githubLink: 'https://github.com/ajju0418/Ecommerce_Mystore',
        liveLink: null,
    },
    {
        title: 'Library Management System',
        subtitle: 'Secure RBAC Platform',
        description:
            'A full-stack system with secure authentication, role-based access control, and core features like book/member management and fine calculation.',
        tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker'],
        icon: BookOpen,
        accent: 'text-sky-300 bg-sky-400/10 border-sky-400/20',
        bar: 'from-sky-400 to-blue-500',
        features: ['RBAC authentication', 'Microservices architecture', 'Docker containerization'],
        githubLink: 'https://github.com/ajju0418',
        liveLink: null,
    },
    {
        title: 'Banking Management System',
        subtitle: 'Core Banking Operations',
        description:
            'A Java-based system handling account creation, deposits, withdrawals, and transaction history with strong data validation.',
        tags: ['Core Java', 'SQL', 'JDBC'],
        icon: Database,
        accent: 'text-violet-300 bg-violet-400/10 border-violet-400/20',
        bar: 'from-violet-400 to-fuchsia-500',
        features: ['Transaction management', 'Data validation', 'Robust error handling'],
        githubLink: 'https://github.com/ajju0418',
        liveLink: null,
    },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20">
            <div className="section-shell">
                <Reveal className="text-center mb-16">
                    <span className="eyebrow">Selected Work</span>
                    <h2 className="font-display text-4xl font-bold text-white mt-3">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                        Practical applications of my technical skills, end to end.
                    </p>
                </Reveal>

                <Reveal.Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => {
                        const Icon = project.icon;
                        return (
                            <Reveal.Item key={project.title}>
                                <SpotlightCard className="group glass glass-hover rounded-2xl overflow-hidden flex flex-col">
                                    {/* Gradient cover: icon + actions on top, title overlaid at bottom */}
                                    <div className={`relative h-36 p-5 flex flex-col justify-between bg-gradient-to-br ${project.bar}`}>
                                        <div className="absolute inset-0 bg-grid-faint [background-size:24px_24px] opacity-20" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/5" />

                                        <div className="relative flex items-start justify-between">
                                            <div className="p-2.5 rounded-xl bg-ink-900/70 backdrop-blur border border-white/15 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex gap-1">
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${project.title} source code`}
                                                    className="p-2 rounded-lg bg-ink-900/60 backdrop-blur border border-white/10 text-slate-200 hover:text-white hover:bg-ink-900/80 transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                                {project.liveLink && (
                                                    <a
                                                        href={project.liveLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`${project.title} live demo`}
                                                        className="p-2 rounded-lg bg-ink-900/60 backdrop-blur border border-white/10 text-slate-200 hover:text-white hover:bg-ink-900/80 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <h3 className="text-xl font-display font-bold text-white leading-tight">{project.title}</h3>
                                            {project.subtitle && (
                                                <p className="text-xs text-slate-300/90 font-medium mt-0.5">{project.subtitle}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

                                        <div className="mt-auto space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <ul className="pt-4 border-t border-white/10 space-y-2">
                                                {project.features.map((feature) => (
                                                    <li key={feature} className="flex items-center text-sm text-slate-400">
                                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5 shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Reveal.Item>
                        );
                    })}
                </Reveal.Stagger>
            </div>
        </section>
    );
};

export default Projects;
