import React from 'react';
import { Award, Trophy, BookOpen } from 'lucide-react';
import Reveal from '../components/Reveal';

const certifications = [
    'GitHub Foundations (GH-900)',
    'Programming in Java — NPTEL',
    'Introduction to Cybersecurity — CISCO',
    'Java Language Features — Infosys Springboard',
    'Introduction to Networks — CISCO',
    'Technical English for Engineers',
];

const participations = [
    { title: "Paper Presented — YUGAM'23", Icon: BookOpen },
    { title: "Quiz Competition — DHRUVA'23", Icon: Trophy },
    { title: "Workshops — TECHNOVISTA'23", Icon: Award },
    { title: 'Ideathon — SKCET', Icon: Award },
];

const Certifications = () => {
    return (
        <section id="certifications" className="py-20">
            <div className="section-shell">
                <Reveal className="text-center mb-16">
                    <span className="eyebrow">Credentials</span>
                    <h2 className="font-display text-4xl font-bold text-white mt-3">
                        Certifications & <span className="text-gradient">Achievements</span>
                    </h2>
                    <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                        Continuous learning and active participation in technical events.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    <Reveal direction="right">
                        <div className="glass rounded-2xl p-8 h-full">
                            <div className="flex items-center mb-7">
                                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mr-4">
                                    <Award className="w-6 h-6 text-accent-soft" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white">Certifications</h3>
                            </div>
                            <div className="space-y-2.5">
                                {certifications.map((cert) => (
                                    <div
                                        key={cert}
                                        className="flex items-center p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent/30 transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3.5 shrink-0" />
                                        <span className="text-slate-300 text-sm font-medium">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="left" delay={0.1}>
                        <div className="glass rounded-2xl p-8 h-full">
                            <div className="flex items-center mb-7">
                                <div className="w-12 h-12 rounded-xl bg-accent-glow/15 border border-accent-glow/30 flex items-center justify-center mr-4">
                                    <Trophy className="w-6 h-6 text-violet-300" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white">Participations</h3>
                            </div>
                            <div className="space-y-2.5">
                                {participations.map(({ title, Icon }) => (
                                    <div
                                        key={title}
                                        className="flex items-center p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent-glow/30 transition-colors"
                                    >
                                        <div className="mr-3.5 p-2 rounded-lg bg-white/5 border border-white/10">
                                            <Icon className="w-4 h-4 text-violet-300" />
                                        </div>
                                        <span className="text-slate-300 text-sm font-medium">{title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
