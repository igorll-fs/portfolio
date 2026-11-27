import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: ['index.html', 'barberblinders.html', 'bottrading.html'].map(
        (page) => fileURLToPath(new URL(page, import.meta.url)),
      ),
    },
  },
  preview: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
