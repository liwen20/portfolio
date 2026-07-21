import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data'
import TrueFocus from './TrueFocus'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const sections = ['home', ...navLinks.map((l) => l.href.slice(1))]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-orange to-accent-orange-light flex items-center justify-center font-extrabold text-bg text-xl font-din group-hover:scale-110 transition-transform">
            {profile.initials}
          </span>
          <span className="hidden sm:block">
            <TrueFocus
              sentence="LI WEN"
              separator=" "
              manualMode={false}
              blurAmount={3}
              borderColor="var(--accent-orange, #ff8c42)"
              glowColor="rgba(255, 193, 92, 0.5)"
              animationDuration={0.4}
              pauseBetweenAnimations={0.8}
            />
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a href={link.href} className="nav-roll-link group relative inline-block px-4 py-2">
                  {/* 翻滚文字容器 */}
                  <span className="nav-roll-text inline-block overflow-hidden h-[1.4em] relative align-top">
                    {/* 默认文字（向上翻滚消失） */}
                    <span className={`nav-roll-default block transition-transform duration-300 ease-out group-hover:-translate-y-[1.4em] ${isActive ? 'text-white' : 'text-white/80'}`}>
                      {link.label}
                    </span>
                    {/* hover 时的橙色文字（从下方翻滚进入） */}
                    <span className="nav-roll-hover block absolute top-0 left-0 translate-y-[1.4em] transition-transform duration-300 ease-out group-hover:translate-y-0 text-accent-orange">
                      {link.label}
                    </span>
                  </span>
                  {/* 3px 橙色横条（hover 时从中心展开，宽度为文字的 60%） */}
                  <span className={`nav-underline absolute -bottom-1 left-1/2 bg-accent-orange rounded-full transition-all duration-300 ease-out -translate-x-1/2 ${
                    isActive ? 'w-[60%] opacity-100' : 'w-0 opacity-0 group-hover:w-[60%] group-hover:opacity-100'
                  }`} style={{ height: '3px' }} />
                </a>
              </li>
            )
          })}
        </ul>

        <a href="#contact" className="hidden md:inline-flex btn-ghost text-base font-bold px-5 py-2.5">合作邀约</a>

        <button className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" onClick={() => setOpen(!open)} aria-label="菜单">
          <span className={`w-6 h-0.5 bg-text transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-text transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-text transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <ul className="px-6 pb-4 space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-base font-bold text-white/80 hover:text-white hover:bg-white/5 transition">{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
