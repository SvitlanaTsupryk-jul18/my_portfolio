import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/my_portfolio/',
  resolve: {
    // Leva is a dev-only tuning panel, so production builds use a lightweight stub
    alias:
      mode === 'production'
        ? { leva: fileURLToPath(new URL('./src/lib/leva-stub.js', import.meta.url)) }
        : {},
  },
}))
