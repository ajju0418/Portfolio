# Ajay B — Portfolio

A single-page, scroll-driven personal portfolio with an immersive WebGL
background. Built with React and a hand-written GLSL shader, and tuned to run
smoothly everywhere.

🔗 **Live:** https://ajju0418.github.io/Portfolio

## Highlights

- **Single fixed GLSL background** — one fragment shader on a fullscreen
  triangle (one draw call/frame) via [OGL](https://github.com/oframe/ogl),
  ~8 KB. Light enough that every visitor gets the same animated aurora.
- **Graceful degradation** — `prefers-reduced-motion` renders a single static
  frame; if WebGL is unavailable, a lightweight 2D fallback takes over.
- **One shared scroll store** drives the shader's colour blend and the dot-nav
  without triggering React re-renders in the render loop.
- **Working contact form** via [Web3Forms](https://web3forms.com) with a
  honeypot and idle/sending/success/error states.
- **Single content source** (`src/data/portfolio.js`) feeds both the DOM and
  the 3D scenes so they never drift apart.

## Tech stack

| Area | Tools |
|------|-------|
| Framework | React 18, Vite 5 |
| Background | OGL (single GLSL fragment shader) |
| Animation | Framer Motion |
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
  components/          # UI: nav, reveal, spotlight card, ShaderBackground
  sections/            # HomeIntro, JourneyPanel, WorkPanel, ContactPanel
```

## Notes

- The social preview lives at `public/og-image.svg`. X/Twitter does not render
  SVG cards — export a `1200×630` PNG (`og-image.png`) and point the
  `og:image` / `twitter:image` tags at it for full compatibility.
- The Web3Forms `access_key` in `src/data/portfolio.js` is a public submission
  key by design, not a secret.
