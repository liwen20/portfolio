import { useState, useEffect } from 'react'
import TrueFocus from './TrueFocus'
import './Navbar.css'

const links = [
  { href: '#about', id: 'about', label: '介绍' },
  { href: '#works', id: 'works', label: '作品' },
  { href: '#contact', id: 'contact', label: '联系' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    const sections = document.querySelectorAll('section[id]')
    const onScrollSpy = () => {
      let current = 'home'
      sections.forEach((section) => {
        if ((section as HTMLElement).offsetTop - 120 <= window.scrollY) {
          current = section.getAttribute('id') || 'home'
        }
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScrollSpy)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScrollSpy)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const toggleMobile = () => {
    setMobileOpen((v) => !v)
    document.body.style.overflow = !mobileOpen ? 'hidden' : ''
  }

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#home" className="nav-logo hover-target" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <span className="nav-logo-dot" />
            <span className="nav-logo-text">
              <TrueFocus
                sentence="LI WEN"
                separator=" "
                manualMode={false}
                blurAmount={3}
                borderColor="var(--orange-light)"
                glowColor="rgba(255, 193, 92, 0.5)"
                animationDuration={0.4}
                pauseBetweenAnimations={0.8}
              />
            </span>
          </a>

          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`hover-target${active === link.id ? ' active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`nav-hamburger hover-target${mobileOpen ? ' open' : ''}`}
            onClick={toggleMobile}
          >
            <span /><span /><span />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#home" onClick={(e) => { e.preventDefault(); closeMobile(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>首页</a>
        {links.map((link) => (
          <a key={link.id} href={link.href} onClick={(e) => { e.preventDefault(); closeMobile(); scrollTo(link.id) }}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
