import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,       // 👉 ton nouveau port
    strictPort: false // (optionnel) si true, Vite NE changera PAS de port automatiquement
  }
})
