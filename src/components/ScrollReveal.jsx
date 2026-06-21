import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger reveal. Fades + lifts its children in as they enter the
 * viewport and reverses on the way out. No-ops under prefers-reduced-motion.
 */
export default function ScrollReveal({
    children,
    className = '',
    y = 28,
    delay = 0,
    as: Tag = 'div',
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            gsap.set(el, { opacity: 1, y: 0, filter: 'none' });
            return undefined;
        }
        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { opacity: 0, y, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, el);
        return () => ctx.revert();
    }, [y, delay]);

    return (
        <Tag ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </Tag>
    );
}
