import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base 路径根据部署平台自动切换：
  // - Cloudflare Pages：根路径 '/'，构建时自动设置 CF_PAGES=true
  //   JS/CSS 由 Cloudflare 提供（hash 文件名，两个环境构建 hash 不同，不能跨平台引用）
  //   图片/视频/PDF 走 GitHub Pages 源（见 data.js STATIC_BASE，文件名固定无 hash）
  // - GitHub Pages：子路径 '/portfolio/'
  base: process.env.CF_PAGES ? '/' : '/portfolio/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
