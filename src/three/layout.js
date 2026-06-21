// Shared spatial + colour layout for the 3D journey. The camera flies straight
// down a vertical "corridor"; each scene occupies its own Y band. Keeping these
// constants in one module guarantees the camera rig, theme controller, and the
// individual scenes all agree on where each world lives.

export const BAND_GAP = 46;

// Y centre of each scene's band, indexed by section.
export const BANDS = [0, -BAND_GAP, -BAND_GAP * 2, -BAND_GAP * 3];

// Camera pose per band: distance back (z) and look pitch (positive = look down).
export const POSES = [
    { z: 9, pitch: 0.0 },
    { z: 11, pitch: 0.02 },
    { z: 12, pitch: 0.0 },
    { z: 9.5, pitch: 0.22 }, // ocean — tilt the gaze down onto the water
];

// Per-section palette. `bg` is the clear colour, `fog` the depth-fade tint
// (kept a touch brighter than bg so distance reads as glow, not black).
export const PALETTE = [
    { bg: '#05041a', fog: '#0a0a2e' }, // Home — deep space blue
    { bg: '#0c0900', fog: '#3a2a05' }, // Journey — warm amber/gold
    { bg: '#120a2e', fog: '#2a0f3f' }, // Projects — deep purple
    { bg: '#03201d', fog: '#0a4a44' }, // Contact — deep teal
];

// Clamp a continuous index and return { lo, hi, f } for lerping between bands.
export function bracket(index, max = BANDS.length - 1) {
    const i = Math.max(0, Math.min(max, index));
    const lo = Math.floor(i);
    const hi = Math.min(max, lo + 1);
    return { lo, hi, f: i - lo };
}

export const lerp = (a, b, t) => a + (b - a) * t;

// True when the camera is close enough to a section for it to be worth
// animating/rendering. Scenes use this to early-out their per-frame work.
export function isNear(index, sectionIndex, margin = 0.95) {
    return Math.abs(index - sectionIndex) < margin;
}
