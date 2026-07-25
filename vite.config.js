import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base 路径根据部署平台自动切换：
  // - Cloudflare Pages：根路径 '/'，构建时自动设置 CF_PAGES=true
  //   JS/CSS 与图片/视频/PDF 均由 Cloudflare 自身提供（两个环境构建 hash 不同，不能跨平台引用）
  // - GitHub Pages：子路径 '/portfolio/'
  // 两个域名独立部署，各自服务自己的静态资源（见 data.js 的 STATIC_BASE）。
  base: process.env.CF_PAGES ? '/' : '/portfolio/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
