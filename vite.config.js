import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages 部署在 /portfolio/ 子路径下，必须设置 base
  // 本地预览（localhost）不受影响
  base: '/portfolio/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
