import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ClickSpark from './components/ClickSpark'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <ClickSpark
      sparkColor="#ff8c42"
      sparkSize={14}
      sparkRadius={45}
      sparkCount={10}
      duration={500}
    >
      <div className="relative min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Works />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}
