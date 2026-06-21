// Shared scroll/section state. The DOM scroll listener and GSAP ScrollTrigger
// write here; the R3F render loop reads `getState()` every frame (no React
// re-render), while React UI (the dot-nav) subscribes for the integer section.

const state = {
    progress: 0, // 0..1 over the whole document
    index: 0, // continuous section index 0..(N-1) — drives camera & theme blends
    section: 0, // nearest integer section — drives the active nav dot
    pointerX: 0, // -1..1, smoothed toward in the rig
    pointerY: 0,
};

const listeners = new Set();
let sectionEls = [];

export function registerSections(els) {
    sectionEls = (els || []).filter(Boolean);
    updateScroll();
}

export function getState() {
    return state;
}

export function getSection() {
    return state.section;
}

export function subscribe(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

export function setPointer(x, y) {
    state.pointerX = x;
    state.pointerY = y;
}

// Continuous section index derived from where each section's center sits
// relative to the viewport center. Height-independent, so uneven section
// heights still blend smoothly.
export function updateScroll() {
    if (typeof window === 'undefined' || !sectionEls.length) return;
    const vh = window.innerHeight;
    const mid = vh / 2;
    const centers = sectionEls.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
    });

    let idx;
    if (mid <= centers[0]) {
        idx = 0;
    } else if (mid >= centers[centers.length - 1]) {
        idx = centers.length - 1;
    } else {
        idx = centers.length - 1;
        for (let i = 0; i < centers.length - 1; i++) {
            if (mid >= centers[i] && mid <= centers[i + 1]) {
                const span = centers[i + 1] - centers[i] || 1;
                idx = i + (mid - centers[i]) / span;
                break;
            }
        }
    }

    state.index = idx;
    const doc = document.documentElement;
    state.progress = window.scrollY / Math.max(1, doc.scrollHeight - vh);

    const nearest = Math.round(idx);
    if (nearest !== state.section) {
        state.section = nearest;
        listeners.forEach((l) => l(nearest));
    }
}
