import { useEffect, useRef, useState } from 'react'
import { profile } from '../data'

export default function Hero() {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [showShowreel, setShowShowreel] = useState(false)

  // 粒子背景
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, particles = []
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 20000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      }))
    }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 140, 66, 0.5)'; ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 140, 66, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // Hero 视频
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.load()
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.3 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 视频背景 */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-40" autoPlay muted loop playsInline preload="metadata">
        <source src={profile.heroVideo} type="video/mp4" />
      </video>
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/30" />
      <div className="absolute inset-0 bg-grid mask-radial opacity-50" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* 光晕 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-orange/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-orange-light/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* 序号标签 */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <span className="font-din text-2xl text-accent-orange">01</span>
            <span className="w-12 h-px bg-accent-orange/50" />
            <span className="text-xs font-mono tracking-[0.3em] text-text-soft">PORTFOLIO</span>
          </div>

          <p className="inline-flex items-center gap-2 text-sm font-mono text-accent-orange mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
            求职目标: {profile.title}
          </p>

          <h1 className="font-din text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,140,66,0.8)]">DESIGN</span>
            <br />
            <span className="text-gradient">SPACE</span>
          </h1>

          <p className="text-lg md:text-xl text-text-soft font-light mb-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            以 AI 生成、视觉系统与动态影像为媒介，
          </p>
          <p className="text-lg md:text-xl text-text-soft font-light mb-10 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            创造可落地的设计体验。
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.45s' }}>
            <a href="#works" className="btn-primary">
              探索作品
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#contact" className="btn-ghost">联系我</a>
            <a href="/李文简历.pdf" download="李文简历.pdf" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              下载简历
            </a>
          </div>

          <div className="flex items-center gap-6 mt-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            {/* Showreel */}
            <button onClick={() => setShowShowreel(true)} className="flex items-center gap-3 group">
              <span className="w-12 h-12 rounded-full border border-accent-orange/40 flex items-center justify-center group-hover:bg-accent-orange/10 transition">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent-orange ml-0.5"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <div className="text-left">
                <div className="text-xs font-mono text-text-dim">Showreel</div>
                <div className="text-sm text-white font-din">{profile.showreelYear}</div>
              </div>
            </button>

            {/* 统计 */}
            <div className="h-10 w-px bg-white/10" />
            <div className="flex gap-8">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  {s.value !== undefined ? (
                    <div className="text-2xl font-din font-bold text-white">{s.value}<span className="text-accent-orange">{s.suffix}</span></div>
                  ) : (
                    <div className="text-lg font-din font-bold text-white">{s.text}</div>
                  )}
                  <div className="text-xs text-text-dim mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim">
        <span className="text-xs font-mono">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-text-dim/40 flex justify-center pt-1.5">
          <span className="w-1 h-2 rounded-full bg-accent-orange animate-bounce" />
        </div>
      </div>

      {/* Showreel 弹窗 */}
      {showShowreel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md animate-fade-in" onClick={() => setShowShowreel(false)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowShowreel(false)} className="absolute -top-12 right-0 text-white hover:text-accent-orange transition">✕ 关闭</button>
            <video src={profile.showreelVideo} controls autoPlay playsInline className="w-full rounded-2xl" />
          </div>
        </div>
      )}
    </section>
  )
}
