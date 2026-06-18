import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Code2, Github, Loader2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import SpotlightCard from '../components/SpotlightCard';
import Magnetic from '../components/Magnetic';
import Toast from '../components/Toast';

const ACCESS_KEY = 'b2b0f142-f625-4b41-b1ac-37aa9eaafdc0';

const details = [
    {
        Icon: Phone,
        label: 'Phone',
        value: '+91 99944 44669',
        href: 'tel:+919994444669',
        accent: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
    },
    {
        Icon: Mail,
        label: 'Email',
        value: 'ajaybalu9481@gmail.com',
        href: 'mailto:ajaybalu9481@gmail.com',
        accent: 'text-accent-soft bg-accent/10 border-accent/20',
    },
    {
        Icon: MapPin,
        label: 'Location',
        value: 'Chennai, India',
        href: null,
        accent: 'text-violet-300 bg-violet-400/10 border-violet-400/20',
    },
];

const socials = [
    { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ajay-b-9974b0237' },
    { Icon: Github, label: 'GitHub', href: 'https://github.com/ajju0418' },
    { Icon: Code2, label: 'LeetCode', href: 'https://leetcode.com/u/ajju17/' },
];

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-500 ' +
    'outline-none transition-all duration-300 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:bg-white/[0.07]';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle | sending
    const [toast, setToast] = useState({ show: false, type: 'success', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');

        const formData = new FormData(form);
        formData.append('access_key', ACCESS_KEY);
        formData.append('from_name', 'Portfolio Contact Form');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setToast({ show: true, type: 'success', message: "Message sent! I'll get back to you soon." });
                form.reset();
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            setToast({ show: true, type: 'error', message: 'Something went wrong. Please email me directly.' });
        } finally {
            setStatus('idle');
        }
    };

    return (
        <section id="contact" className="py-20">
            <div className="section-shell">
                <Reveal className="text-center mb-16">
                    <span className="eyebrow">Get in touch</span>
                    <h2 className="font-display text-4xl font-bold text-white mt-3">
                        Let's <span className="text-gradient">Connect</span>
                    </h2>
                    <p className="text-lg text-slate-400 mt-3 max-w-2xl mx-auto">
                        Open to new opportunities and collaborations. Have a question or just want to say hi? My inbox is always open.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {/* Contact info */}
                    <Reveal direction="right" className="lg:col-span-2">
                        <SpotlightCard className="glass glass-hover rounded-2xl p-8 h-full flex flex-col" maxTilt={4}>
                            <h3 className="text-2xl font-display font-bold text-white mb-3">Contact Information</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                I'm currently looking for new opportunities. Whether you have a question or just want to
                                say hi, I'll try my best to get back to you.
                            </p>

                            <div className="space-y-5">
                                {details.map(({ Icon, label, value, href, accent }) => {
                                    const content = (
                                        <div className="flex items-center gap-4 group/item">
                                            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110 ${accent}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">{label}</p>
                                                <p className="text-slate-200 font-medium truncate group-hover/item:text-white transition-colors">{value}</p>
                                            </div>
                                        </div>
                                    );
                                    return href ? (
                                        <a key={label} href={href} className="block">{content}</a>
                                    ) : (
                                        <div key={label}>{content}</div>
                                    );
                                })}
                            </div>

                            <div className="mt-auto pt-8 flex items-center gap-2">
                                {socials.map(({ Icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="p-3 rounded-full text-slate-400 bg-white/5 border border-white/10 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </SpotlightCard>
                    </Reveal>

                    {/* Form */}
                    <Reveal direction="left" delay={0.1} className="lg:col-span-3">
                        <div className="glass rounded-2xl p-8 h-full">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                                        <input type="text" id="name" name="name" className={inputClass} placeholder="John Doe" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Your Email</label>
                                        <input type="email" id="email" name="email" className={inputClass} placeholder="john@example.com" required />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="user_subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                                    <input type="text" id="user_subject" name="user_subject" className={inputClass} placeholder="Project Inquiry" required />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                    <textarea id="message" name="message" rows="5" className={`${inputClass} resize-none`} placeholder="Tell me about your project..." required />
                                </div>

                                <Magnetic className="w-full">
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="btn-primary w-full group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                Sending
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </Magnetic>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </div>

            <Toast
                show={toast.show}
                type={toast.type}
                message={toast.message}
                onClose={() => setToast((t) => ({ ...t, show: false }))}
            />
        </section>
    );
};

export default Contact;
