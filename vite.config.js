import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base 路径根据部署平台自动切换：
  // - Cloudflare Pages：根路径 '/'，构建时自动设置 CF_PAGES=true
  // - GitHub Pages：子路径 '/portfolio/'
  base: process.env.CF_PAGES ? '/' : '/portfolio/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
