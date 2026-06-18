import React from 'react';
import { GraduationCap } from 'lucide-react';
import Reveal from '../components/Reveal';

const education = [
    {
        degree: 'B.Tech, Computer Science and Business Systems',
        school: 'Sri Krishna College of Engineering and Technology',
        location: 'Coimbatore, Tamil Nadu',
        period: 'Nov 2021 - Apr 2025',
        note: null,
    },
    {
        degree: 'Higher Secondary',
        school: 'Vidyaa Vikas Matric Higher Secondary School',
        location: 'Coimbatore',
        period: 'Jun 2019 - May 2020',
        note: null,
    },
    {
        degree: 'Secondary',
        school: 'Vidyaa Vikas',
        location: 'Coimbatore',
        period: '2017 - 2019',
        note: 'Score: 89.5%',
    },
];

const Education = () => {
    return (
        <section id="education" className="py-20">
            <div className="section-shell">
                <Reveal className="text-center mb-16">
                    <span className="eyebrow">Academics</span>
                    <h2 className="font-display text-4xl font-bold text-white mt-3">
                        Educational <span className="text-gradient">Background</span>
                    </h2>
                    <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                        A strong foundation in Computer Science and Business Systems.
                    </p>
                </Reveal>

                <div className="max-w-3xl mx-auto relative">
                    <div className="absolute left-4 md:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />

                    <div className="space-y-8">
                        {education.map((item, i) => (
                            <Reveal key={item.degree} delay={i * 0.1} direction="left">
                                <div className="relative pl-14 md:pl-16">
                                    <div className="absolute left-0 top-1.5">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800 border border-accent/40 shadow-glow">
                                            <GraduationCap className="w-4 h-4 text-accent-soft" />
                                        </span>
                                    </div>

                                    <div className="glass glass-hover rounded-2xl p-6 group">
                                        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                                            <h3 className="text-lg font-display font-bold text-white group-hover:text-accent-soft transition-colors">
                                                {item.degree}
                                            </h3>
                                            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-soft text-xs font-mono whitespace-nowrap">
                                                {item.period}
                                            </span>
                                        </div>
                                        <p className="text-slate-300 font-medium text-sm">{item.school}</p>
                                        <p className="text-slate-500 text-sm mt-0.5">{item.location}</p>
                                        {item.note && (
                                            <p className="mt-3 inline-flex text-emerald-300 text-sm font-semibold">{item.note}</p>
                                        )}
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

export default Education;
