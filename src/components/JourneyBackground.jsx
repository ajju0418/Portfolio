import { useMemo } from 'react';

/**
 * Section-local background for the Journey panel. Two hand-built SVG scenes —
 * a corporate skyline (Experience) and a college campus (Education) — crossfade
 * as the reader moves between the two groups. Pure SVG: crisp at any size,
 * lightweight, and themed to the section's amber/gold palette. Decorative only
 * (pointer-events: none), it sits behind the glass timeline cards.
 */

// Deterministic "is this window lit" — no Math.random so it stays stable across
// renders and looks like a real, half-occupied building at dusk.
const isLit = (c, r, seed) => ((c * 7 + r * 13 + seed * 5) % 7) > 1;

// A grid of windows inside a building rectangle.
function Windows({ x, y, w, h, cols, rows, seed = 0, pad = 0.22 }) {
    const cells = useMemo(() => {
        const out = [];
        const cw = (w / cols) * (1 - pad);
        const ch = (h / rows) * (1 - pad);
        const gx = (w / cols) * pad;
        const gy = (h / rows) * pad;
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                out.push({
                    x: x + (w / cols) * c + gx / 2,
                    y: y + (h / rows) * r + gy / 2,
                    w: cw,
                    h: ch,
                    on: isLit(c, r, seed),
                });
            }
        }
        return out;
    }, [x, y, w, h, cols, rows, seed, pad]);

    return (
        <g>
            {cells.map((cell, i) => (
                <rect
                    key={i}
                    x={cell.x}
                    y={cell.y}
                    width={cell.w}
                    height={cell.h}
                    rx={Math.min(cell.w, cell.h) * 0.18}
                    fill={cell.on ? 'url(#winLit)' : '#231805'}
                    opacity={cell.on ? 0.95 : 0.5}
                    filter={cell.on ? 'url(#winGlow)' : undefined}
                />
            ))}
        </g>
    );
}

// One arched window (semicircle cap over a rectangle) — the academic motif.
function Arch({ x, y, w, h, on = true }) {
    const r = w / 2;
    const d = `M ${x} ${y + h} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h} Z`;
    return (
        <path
            d={d}
            fill={on ? 'url(#winLit)' : '#231805'}
            opacity={on ? 0.95 : 0.55}
            filter={on ? 'url(#winGlow)' : undefined}
        />
    );
}

function ArchRow({ y, h, count, startX, gap, w, seed = 0 }) {
    return (
        <g>
            {Array.from({ length: count }).map((_, i) => (
                <Arch key={i} x={startX + i * (w + gap)} y={y} w={w} h={h} on={isLit(i, 0, seed)} />
            ))}
        </g>
    );
}

function Stars({ seed = 1 }) {
    const dots = useMemo(
        () =>
            Array.from({ length: 46 }, (_, i) => ({
                x: ((i * 71 + seed * 37) % 1440),
                y: ((i * 53 + seed * 19) % 340) + 20,
                r: 0.6 + ((i * 3) % 4) * 0.35,
                o: 0.25 + ((i * 7) % 5) * 0.12,
            })),
        [seed]
    );
    return (
        <g>
            {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#fff7e6" opacity={d.o} />
            ))}
        </g>
    );
}

const SharedDefs = () => (
    <defs>
        {/* Dusk sky — deep amber night fading to a warm horizon glow */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#08060f" />
            <stop offset="42%" stopColor="#140d05" />
            <stop offset="74%" stopColor="#3a1f04" />
            <stop offset="100%" stopColor="#7a3f06" />
        </linearGradient>
        {/* Lit-window fill */}
        <radialGradient id="winLit" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#fff1c2" />
            <stop offset="55%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        {/* Building face gradients */}
        <linearGradient id="bldgFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14100a" />
            <stop offset="100%" stopColor="#070501" />
        </linearGradient>
        <linearGradient id="bldgBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c150b" />
            <stop offset="100%" stopColor="#0c0903" />
        </linearGradient>
        {/* Soft glow for lit windows */}
        <filter id="winGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
        {/* Big moon / horizon bloom */}
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe9b0" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#f0a93c" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#f0a93c" stopOpacity="0" />
        </radialGradient>
        {/* Top & bottom blend so the scene melts into the page */}
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05040b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#05040b" stopOpacity="0" />
        </linearGradient>
    </defs>
);

// ── Corporate skyline (Experience) ──────────────────────────────────────────
function Skyline() {
    return (
        <svg
            className="h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            <SharedDefs />
            <rect width="1440" height="900" fill="url(#skyGrad)" />
            <Stars seed={2} />
            {/* Horizon bloom behind the towers */}
            <ellipse cx="720" cy="760" rx="900" ry="240" fill="url(#moonGlow)" />
            <circle cx="1080" cy="250" r="66" fill="url(#moonGlow)" />
            <circle cx="1080" cy="250" r="34" fill="#ffeec2" opacity="0.55" />

            {/* Back skyline — distant, low contrast */}
            <g opacity="0.7">
                {[
                    [60, 560, 120, 340],
                    [210, 500, 95, 400],
                    [330, 600, 110, 300],
                    [900, 540, 120, 360],
                    [1050, 590, 100, 310],
                    [1170, 500, 130, 400],
                    [1320, 580, 110, 320],
                ].map(([x, y, w, h], i) => (
                    <g key={i}>
                        <rect x={x} y={y} width={w} height={h} fill="url(#bldgBack)" />
                        <Windows x={x} y={y} w={w} h={h} cols={4} rows={Math.round(h / 46)} seed={i + 3} />
                    </g>
                ))}
            </g>

            {/* Front towers — prominent, densely lit */}
            <g>
                {/* Left tower */}
                <rect x="150" y="430" width="170" height="470" fill="url(#bldgFront)" />
                <Windows x="150" y="430" w="170" h="470" cols={5} rows={11} seed={1} />
                {/* Central flagship tower with antenna */}
                <rect x="600" y="300" width="220" height="600" fill="url(#bldgFront)" />
                <rect x="690" y="220" width="40" height="80" fill="url(#bldgFront)" />
                <rect x="707" y="150" width="6" height="80" fill="#3a2a10" />
                <circle cx="710" cy="150" r="6" fill="url(#winLit)" filter="url(#winGlow)" />
                <Windows x="600" y="320" w="220" h="580" cols={6} rows={14} seed={4} />
                {/* Right tower (stepped top) */}
                <rect x="980" y="500" width="150" height="400" fill="url(#bldgFront)" />
                <rect x="1010" y="450" width="90" height="60" fill="url(#bldgFront)" />
                <Windows x="980" y="500" w="150" h="400" cols={4} rows={9} seed={6} />
                {/* Far-right slim tower */}
                <rect x="1200" y="380" width="110" height="520" fill="url(#bldgFront)" />
                <Windows x="1200" y="380" w="110" h="520" cols={3} rows={13} seed={2} />
            </g>

            {/* Street-level warm glow */}
            <rect x="0" y="830" width="1440" height="70" fill="#f59e0b" opacity="0.12" />
            <rect width="1440" height="240" fill="url(#topFade)" />
        </svg>
    );
}

// ── College campus (Education) ──────────────────────────────────────────────
function Campus() {
    return (
        <svg
            className="h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            <SharedDefs />
            <rect width="1440" height="900" fill="url(#skyGrad)" />
            <Stars seed={5} />
            {/* Moon */}
            <circle cx="360" cy="220" r="80" fill="url(#moonGlow)" />
            <circle cx="360" cy="220" r="40" fill="#fff1cf" opacity="0.7" />
            <ellipse cx="720" cy="780" rx="980" ry="220" fill="url(#moonGlow)" />

            {/* Distant trees / treeline */}
            <g opacity="0.55" fill="#0b0a04">
                {[120, 240, 1180, 1300, 1380].map((cx, i) => (
                    <g key={i}>
                        <ellipse cx={cx} cy={690} rx={70} ry={90} />
                        <rect x={cx - 8} y={680} width={16} height={120} />
                    </g>
                ))}
            </g>

            {/* Left & right wings */}
            <g>
                <rect x="120" y="540" width="320" height="360" fill="url(#bldgFront)" />
                <ArchRow y={580} h={70} count={4} startX={155} gap={28} w={48} seed={3} />
                <ArchRow y={690} h={70} count={4} startX={155} gap={28} w={48} seed={5} />
                <Windows x="150" y="790" w="260" h="80" cols={6} rows={1} seed={2} />

                <rect x="1000" y="540" width="320" height="360" fill="url(#bldgFront)" />
                <ArchRow y={580} h={70} count={4} startX={1035} gap={28} w={48} seed={6} />
                <ArchRow y={690} h={70} count={4} startX={1035} gap={28} w={48} seed={4} />
                <Windows x="1030" y="790" w="260" h="80" cols={6} rows={1} seed={7} />
            </g>

            {/* Central hall with clock tower */}
            <g>
                {/* main block */}
                <rect x="470" y="470" width="500" height="430" fill="url(#bldgFront)" />
                {/* pediment (triangular roof over the entrance) */}
                <path d="M 560 470 L 720 380 L 880 470 Z" fill="url(#bldgBack)" />
                <path d="M 560 470 L 720 380 L 880 470" fill="none" stroke="#f59e0b" strokeOpacity="0.25" strokeWidth="3" />

                {/* columns / portico */}
                {[600, 656, 712, 768, 824].map((x) => (
                    <rect key={x} x={x} y={620} width={22} height={210} fill="#0a0803" />
                ))}
                <rect x="585" y="610" width="270" height="16" fill="#100c06" />
                <rect x="585" y="826" width="270" height="14" fill="#0a0803" />

                {/* arched windows across the upper façade */}
                <ArchRow y={500} h={64} count={6} startX={512} gap={24} w={52} seed={1} />

                {/* glowing entrance doorway */}
                <path
                    d="M 690 830 L 690 745 A 30 30 0 0 1 750 745 L 750 830 Z"
                    fill="url(#winLit)"
                    opacity="0.9"
                    filter="url(#winGlow)"
                />

                {/* clock tower */}
                <rect x="668" y="170" width="104" height="220" fill="url(#bldgFront)" />
                <Arch x={690} y={300} w={60} h={70} on />
                {/* clock face */}
                <circle cx="720" cy="245" r="30" fill="#0a0803" stroke="url(#winLit)" strokeWidth="4" filter="url(#winGlow)" />
                <circle cx="720" cy="245" r="2.5" fill="#fcd34d" />
                <line x1="720" y1="245" x2="720" y2="226" stroke="#fcd34d" strokeWidth="2.4" strokeLinecap="round" />
                <line x1="720" y1="245" x2="734" y2="252" stroke="#fcd34d" strokeWidth="2.4" strokeLinecap="round" />
                {/* spire + finial */}
                <path d="M 660 170 L 720 92 L 780 170 Z" fill="url(#bldgBack)" />
                <line x1="720" y1="92" x2="720" y2="60" stroke="#3a2a10" strokeWidth="4" />
                <circle cx="720" cy="58" r="6" fill="url(#winLit)" filter="url(#winGlow)" />
            </g>

            {/* foreground lawn glow */}
            <rect x="0" y="840" width="1440" height="60" fill="#f59e0b" opacity="0.1" />
            <rect width="1440" height="240" fill="url(#topFade)" />
        </svg>
    );
}

export default function JourneyBackground({ active = 'work' }) {
    return (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {/* overflow-hidden lives on the sticky element itself — putting it on an
                ancestor would break the sticky pin-to-viewport behaviour. */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Skyline — Experience */}
                <div
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
                    style={{ opacity: active === 'work' ? 1 : 0 }}
                >
                    <Skyline />
                </div>
                {/* Campus — Education */}
                <div
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
                    style={{ opacity: active === 'edu' ? 1 : 0 }}
                >
                    <Campus />
                </div>
                {/* Readability scrim so the glass cards always sit clearly on top */}
                <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/35 to-ink-950/70" />
            </div>
        </div>
    );
}
