import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/react-dom|scheduler/.test(id)) return 'react-vendor'
            if (id.includes('framer-motion')) return 'motion'
          }
        },
      },
    },
  },
})
