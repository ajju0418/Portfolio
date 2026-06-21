# Ajay B — Portfolio

A single-page, scroll-driven personal portfolio with an immersive WebGL
background. Built with React, Three.js and GSAP, and tuned to degrade
gracefully on low-end devices.

🔗 **Live:** https://ajju0418.github.io/Portfolio

## Highlights

- **Single fixed WebGL background** (Three.js / React Three Fiber) sits behind
  the whole page; overlay sections scroll over it.
- **Device-aware rendering** — the heavy 3D chunk is lazy-loaded and only runs
  on capable desktops; phones, low-end machines, and `prefers-reduced-motion`
  users get a lightweight 2D fallback.
- **One shared scroll store** drives the camera, theme blending, and dot-nav
  without triggering React re-renders in the render loop.
- **Working contact form** via [Web3Forms](https://web3forms.com) with a
  honeypot and idle/sending/success/error states.
- **Single content source** (`src/data/portfolio.js`) feeds both the DOM and
  the 3D scenes so they never drift apart.

## Tech stack

| Area | Tools |
|------|-------|
| Framework | React 18, Vite 5 |
| 3D | Three.js, @react-three/fiber, drei, postprocessing |
| Animation | Framer Motion, GSAP (ScrollTrigger) |
| Styling | Tailwind CSS |
| Deploy | GitHub Pages (`gh-pages`) |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
npm run deploy   # build + publish to GitHub Pages
```

## Project structure

```
src/
  App.jsx              # page shell: background + overlay sections
  main.jsx             # React entry
  data/portfolio.js    # single source of truth for all content
  lib/scrollStore.js   # shared scroll/section state (no re-renders)
  hooks/               # useDeviceTier — decides 3D vs fallback
  components/          # UI: nav, reveal, spotlight card, fallbacks
  sections/            # HomeIntro, JourneyPanel, WorkPanel, ContactPanel
  three/               # WebGL: canvas, camera rig, lighting, scenes
```

## Notes

- The social preview lives at `public/og-image.svg`. X/Twitter does not render
  SVG cards — export a `1200×630` PNG (`og-image.png`) and point the
  `og:image` / `twitter:image` tags at it for full compatibility.
- The Web3Forms `access_key` in `src/data/portfolio.js` is a public submission
  key by design, not a secret.
