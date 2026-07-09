import { useRef, useEffect } from 'react'
import './Hero.css'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" id="home">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* 遮罩：左侧渐深，保证文字可读性；右侧渐淡，透出视频 */}
      <div className="hero-overlay" />

      {/* 左上角序号标签 */}
      <div className="hero-index reveal">
        <span className="hero-index-num">01</span>
        <span className="hero-index-line" />
        <span className="hero-index-text">PORTFOLIO</span>
      </div>

      {/* 主内容：左对齐 */}
      <div className="hero-content">
        <div className="hero-inner">
          <p className="hero-eyebrow reveal reveal-delay-1">
            <span className="hero-eyebrow-dot" />
            Visual · AI · Brand
          </p>

          <h1 className="hero-title reveal reveal-delay-2">
            <span className="hero-title-outline">DESIGN</span>
            <br />
            <span className="hero-title-solid">SPACE</span>
          </h1>

          <p className="hero-subtitle reveal reveal-delay-3">
            以 AI 生成、视觉系统与动态影像为媒介，<br />
            可落地的设计体验。
          </p>

          <div className="hero-actions reveal reveal-delay-4">
            <a href="#works" className="btn-primary hover-target">
              探索作品
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost hover-target">
              联系我
            </a>
          </div>
        </div>
      </div>

      {/* 右下角浮动信息 */}
      <div className="hero-corner reveal reveal-delay-5">
        <div className="hero-corner-line" />
        <div className="hero-corner-text">
          <span className="hero-corner-label">Showreel</span>
          <span className="hero-corner-value">2026</span>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
