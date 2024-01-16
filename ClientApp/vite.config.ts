import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
        '/api': {
            target: 'http://0.0.0.0:5030',
            rewrite: (path) => path.replace(/^\/api/, ''),
         },
    }
  }
})
