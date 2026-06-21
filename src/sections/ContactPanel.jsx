import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Code2, Loader2, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { contact, profile } from '../data/portfolio';

/**
 * Contact overlay — sunset-themed glass panel matching the final 3D scene
 * (Ocean / teal → orange). A details column plus a working Web3Forms contact
 * form with idle / sending / success / error states. All content is sourced
 * from portfolio.js so it never drifts from the rest of the site.
 */

const detailIcons = { Phone, Email: Mail, Location: MapPin };
const socialIcons = { LinkedIn: Linkedin, GitHub: Github, LeetCode: Code2 };

const fieldClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-colors focus:border-orange-400/50 focus:bg-white/[0.07]';

export default function ContactPanel() {
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');
        setError('');
        const payload = Object.fromEntries(new FormData(form));
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ access_key: contact.accessKey, ...payload }),
            });
            const json = await res.json();
            if (json.success) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                setError(json.message || 'Something went wrong — please try again.');
            }
        } catch {
            setStatus('error');
            setError('Network error — please try again, or email me directly.');
        }
    };

    return (
        <section id="contact" className="relative flex min-h-screen items-center py-28">
            <div className="section-shell w-full">
                <ScrollReveal className="mb-14 text-center">
                    <span className="eyebrow text-orange-300/90">Get in Touch</span>
                    <h2 className="text-glow mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
                        Let&apos;s <span className="text-grad-sunset">Connect</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-300/80">
                        Have a role, a project, or just want to say hi? Drop me a message and I&apos;ll get back to you.
                    </p>
                </ScrollReveal>

                <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-5">
                    {/* Details + socials */}
                    <ScrollReveal className="md:col-span-2">
                        <div className="glass flex h-full flex-col rounded-2xl p-7">
                            <h3 className="font-display text-xl font-bold text-white">Contact details</h3>
                            <p className="mt-2 text-sm text-slate-300/80">
                                Based in {profile.location}. Open to full-time roles and interesting collaborations.
                            </p>

                            <ul className="mt-6 space-y-4">
                                {contact.details.map((d) => {
                                    const Icon = detailIcons[d.label] ?? Mail;
                                    const body = (
                                        <>
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-400/10 text-orange-300">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <span>
                                                <span className="block text-xs uppercase tracking-wider text-slate-500">{d.label}</span>
                                                <span className="block text-sm font-medium text-slate-200">{d.value}</span>
                                            </span>
                                        </>
                                    );
                                    return (
                                        <li key={d.label}>
                                            {d.href ? (
                                                <a href={d.href} className="flex items-center gap-3 transition-colors hover:text-white">
                                                    {body}
                                                </a>
                                            ) : (
                                                <div className="flex items-center gap-3">{body}</div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-auto pt-7">
                                <span className="text-xs uppercase tracking-wider text-slate-500">Find me online</span>
                                <div className="mt-3 flex gap-2">
                                    {contact.socials.map((s) => {
                                        const Icon = socialIcons[s.label] ?? Code2;
                                        return (
                                            <a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={s.label}
                                                className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition-colors hover:border-orange-400/40 hover:text-orange-300"
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Form */}
                    <ScrollReveal delay={0.08} className="md:col-span-3">
                        <form onSubmit={onSubmit} className="glass rounded-2xl p-7">
                            {/* Honeypot — bots fill this, humans never see it */}
                            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-wider text-slate-400">
                                        Name
                                    </label>
                                    <input id="name" name="name" type="text" required placeholder="Your name" className={fieldClass} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-wider text-slate-400">
                                        Email
                                    </label>
                                    <input id="email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-wider text-slate-400">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell me about the role or project…"
                                    className={`${fieldClass} resize-none`}
                                />
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                <button type="submit" disabled={status === 'sending'} className="btn-sunset disabled:cursor-not-allowed disabled:opacity-70">
                                    {status === 'sending' ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Send message
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Thanks! Your message is on its way.
                                    </span>
                                )}
                                {status === 'error' && <span className="text-sm font-medium text-red-300">{error}</span>}
                            </div>
                        </form>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
