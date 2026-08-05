import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base 路径根据部署平台自动切换：
  // - Cloudflare Pages：根路径 '/'，构建时自动设置 CF_PAGES=true
  // - Netlify：根路径 '/'，构建时自动设置 NETLIFY=true（或 netlify.toml 注入 CF_PAGES=true）
  // - GitHub Pages：子路径 '/portfolio/'
  // 各平台独立部署，各自服务自己的静态资源（见 data.js 的 STATIC_BASE）。
  base: (process.env.CF_PAGES || process.env.NETLIFY) ? '/' : '/portfolio/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
