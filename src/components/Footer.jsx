import React from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const socials = [
    { Icon: Github, href: 'https://github.com/ajju0418', label: 'GitHub', hover: 'hover:bg-white hover:text-ink-900' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/ajay-b-9974b0237', label: 'LinkedIn', hover: 'hover:bg-accent hover:text-white' },
    { Icon: Code2, href: 'https://leetcode.com/u/ajju17/', label: 'LeetCode', hover: 'hover:bg-amber-500 hover:text-white' },
    { Icon: Mail, href: 'mailto:ajaybalu9481@gmail.com', label: 'Email', hover: 'hover:bg-rose-500 hover:text-white' },
];

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-ink-950/40 backdrop-blur-sm">
            <div className="section-shell py-12">
                <div className="flex flex-col items-center gap-7">
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm text-slate-400 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {socials.map(({ Icon, href, label, hover }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all duration-300 hover:-translate-y-1 ${hover}`}
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-slate-500">
                            Designed & built by <span className="text-slate-200 font-semibold">Ajay B</span>
                        </p>
                        <p className="text-xs text-slate-600 mt-1.5">
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
