import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import Reveal from '../components/Reveal';

const roles = [
    {
        title: 'Programmer Analyst Trainee',
        company: 'Cognizant Technology Solutions',
        period: 'Oct 2025 - Present',
        current: true,
        description:
            'Working on the Elsevier research publishing platform with a focus on authentication and authorization. Contributing to secure backend development, testing, and code reviews in an Agile environment.',
        skills: ['Java', 'Spring Boot', 'Agile', 'Backend', 'Security'],
    },
    {
        title: 'Java Full Stack Intern',
        company: 'Cognizant Technology Solutions',
        period: 'July 2025 - Sept 2025',
        current: false,
        description:
            'Developed a Library Management System using Java and Spring Boot microservices. Implemented Spring Security with a React frontend and designed RESTful APIs for book management.',
        skills: ['Java', 'Spring Boot', 'React', 'Microservices', 'Docker', 'REST APIs'],
    },
];

const Experience = () => {
    return (
        <section id="experience" className="py-20">
            <div className="section-shell">
                <Reveal className="text-center mb-16">
                    <span className="eyebrow">Career</span>
                    <h2 className="font-display text-4xl font-bold text-white mt-3">
                        Professional <span className="text-gradient">Experience</span>
                    </h2>
                    <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                        Building enterprise-grade solutions and delivering client value.
                    </p>
                </Reveal>

                <div className="max-w-3xl mx-auto relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />

                    <div className="space-y-8">
                        {roles.map((role, i) => (
                            <Reveal key={role.title} delay={i * 0.1} direction="left">
                                <div className="relative pl-14 md:pl-16">
                                    {/* Node */}
                                    <div className="absolute left-0 top-1.5 flex items-center justify-center">
                                        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ink-800 border border-accent/40 shadow-glow">
                                            {role.current && (
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/30 animate-pulse-ring" />
                                            )}
                                            <Briefcase className="w-4 h-4 text-accent-soft relative z-10" />
                                        </span>
                                    </div>

                                    <div className="glass glass-hover rounded-2xl p-6 group">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-soft text-xs font-mono">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {role.period}
                                            </span>
                                            {role.current && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-medium">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-display font-bold text-white group-hover:text-accent-soft transition-colors">
                                            {role.title}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-400 mb-3">{role.company}</p>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{role.description}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {role.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
