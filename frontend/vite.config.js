import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Forzamos a que NO mire dentro de node_modules ni carpetas pesadas
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
})