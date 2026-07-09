import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Contact from './components/Contact'
import CursorEffect from './components/CursorEffect'
import ParticleBackground from './components/ParticleBackground'
import ClickSpark from './components/ClickSpark'

const SCROLL_KEY = '__home_scroll'

export function saveHomeScroll() {
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY || window.pageYOffset))
}

export default function Home() {
  // 从详情页返回时恢复滚动位置
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      const y = parseInt(saved, 10)
      if (!isNaN(y) && y > 0) {
        // 延迟一帧等 DOM 渲染完成
        requestAnimationFrame(() => window.scrollTo(0, y))
      }
      sessionStorage.removeItem(SCROLL_KEY)
    }
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <ClickSpark
      sparkColor="#ff8c42"
      sparkSize={12}
      sparkRadius={30}
      sparkCount={8}
      duration={500}
    >
      <CursorEffect />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>
    </ClickSpark>
  )
}
