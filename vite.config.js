import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' because the site now serves from aeeusc.com's root, via a
// GitHub Pages custom domain, instead of the old aeeusc.github.io/aee-website/
// subpath. Every asset path in Home.jsx already goes through the asset()
// helper (which reads import.meta.env.BASE_URL at runtime), and App.jsx's
// router basename is derived the same way, so this one line is the only
// place base path is set — nothing else needs to change if it ever moves
// again.
export default defineConfig({
  plugins: [react()],
  base: '/',
})