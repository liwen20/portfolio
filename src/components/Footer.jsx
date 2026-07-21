import { profile } from '../data'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-orange to-accent-orange-light flex items-center justify-center font-bold text-bg text-sm font-din">
              {profile.initials}
            </span>
            <div>
              <p className="text-sm text-white font-medium font-din tracking-wider">{profile.nameEn}</p>
              <p className="text-xs text-text-dim">© {year} {profile.nameEn}. All rights reserved.</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 text-sm text-text-soft">
            <a href="#home" className="hover:text-accent-orange transition">首页</a>
            <a href="#about" className="hover:text-accent-orange transition">介绍</a>
            <a href="#works" className="hover:text-accent-orange transition">作品</a>
            <a href="#skills" className="hover:text-accent-orange transition">技能</a>
            <a href="#experience" className="hover:text-accent-orange transition">经历</a>
            <a href="#contact" className="hover:text-accent-orange transition">联系</a>
          </nav>

          <a href="#home" className="flex items-center gap-2 text-xs font-mono text-text-dim hover:text-accent-orange transition group">
            返回顶部
            <span className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-accent-orange/30 transition">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
