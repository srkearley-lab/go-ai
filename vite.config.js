import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js is inherently ~500KB minified — raise the warning threshold
    chunkSizeWarningLimit: 600,
  },
})
