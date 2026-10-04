import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the site from /food-the-other-love-language/; local dev stays at /
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['logo-mark.svg', 'logo-mark-small.svg'],
      manifest: {
        name: 'Food: the other love language',
        short_name: 'Food TOLL',
        description: 'Recipes for intention, care, and showing up.',
        theme_color: '#FBF8F4',
        background_color: '#FBF8F4',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          { src: 'logo-mark.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
