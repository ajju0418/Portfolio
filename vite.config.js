import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  build: {
    // Keep the heavy 3D stack out of the main bundle so first paint stays fast.
    // The three/r3f chunk is only fetched when the lazy Scene3D mounts.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep the whole WebGL/post-processing stack in one lazily-loaded chunk.
            if (/three|@react-three|[\\/]postprocessing[\\/]|maath/.test(id)) return 'three'
            if (/react-dom|react-router|scheduler/.test(id)) return 'react-vendor'
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('gsap')) return 'gsap'
          }
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
