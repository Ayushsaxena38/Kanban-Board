import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react() , tailwindcss()],
// })

export default defineConfig({
  plugins: [react(),tailwind()],
  preview: {
    allowedHosts: ['kanban-board-2-m7hi.onrender.com'], // add your Render host here
    port: 10000, // optional, match your package.json start script
    host: '0.0.0.0',
  },
});
