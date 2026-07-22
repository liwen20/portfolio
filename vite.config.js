import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base 路径根据部署平台自动切换：
  // - Cloudflare Pages：资源直接指向 GitHub Pages 源（Cloudflare Pages 分块存储
  //   对 JS/CSS/图片都慢，且不支持视频 Range；GitHub Pages TTFB ~0.2s + CDN 缓存好）
  //   Cloudflare 只负责提供 0.6KB 的 HTML 入口
  // - GitHub Pages：子路径 '/portfolio/'，用本地相对路径
  base: process.env.CF_PAGES ? 'https://liwen20.github.io/portfolio/' : '/portfolio/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
