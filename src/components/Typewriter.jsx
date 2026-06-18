import React, { useEffect, useRef, useState } from 'react';

/**
 * Typewriter that types and deletes a rotating list of words in a loop.
 * Respects prefers-reduced-motion by showing words statically.
 */
const Typewriter = ({
    words = [],
    typingSpeed = 90,
    deletingSpeed = 45,
    pauseTime = 1400,
    className = '',
    cursorClassName = '',
}) => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState('');
    const [phase, setPhase] = useState('typing'); // typing | pausing | deleting
    const reduced = useRef(false);

    useEffect(() => {
        reduced.current =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced.current) setText(words[0] || '');
    }, [words]);

    useEffect(() => {
        if (reduced.current || words.length === 0) return undefined;
        const current = words[index % words.length];
        let delay;

        if (phase === 'typing') {
            if (text === current) {
                delay = pauseTime;
                const t = setTimeout(() => setPhase('deleting'), delay);
                return () => clearTimeout(t);
            }
            delay = typingSpeed;
            const t = setTimeout(() => setText(current.slice(0, text.length + 1)), delay);
            return () => clearTimeout(t);
        }

        // deleting
        if (text === '') {
            setIndex((i) => (i + 1) % words.length);
            setPhase('typing');
            return undefined;
        }
        delay = deletingSpeed;
        const t = setTimeout(() => setText(current.slice(0, text.length - 1)), delay);
        return () => clearTimeout(t);
    }, [text, phase, index, words, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span className={className}>
            {text}
            <span
                className={`inline-block w-[3px] -mb-1 ml-1 animate-pulse ${cursorClassName}`}
                style={{ height: '0.9em' }}
                aria-hidden="true"
            />
        </span>
    );
};

export default Typewriter;
