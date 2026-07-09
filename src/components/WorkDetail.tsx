import { useParams, useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import CursorEffect from './CursorEffect'
import InfiniteMenu from './InfiniteMenu'
import './WorkDetail.css'

// 电子雾化器-槟蓝 的展示图片
const binLanImages = [
  '/vi-binlan-1.webp',
  '/vi-binlan-2.webp',
  '/vi-binlan-3.webp',
  '/vi-binlan-4.webp',
  '/vi-binlan-5.webp',
  '/vi-binlan-6.webp',
]

// 海报设计 的展示图片
const posterImages = [
  '/vi-poster-1.webp',
  '/vi-poster-2.webp',
  '/vi-poster-3.webp',
  '/vi-poster-4.webp',
  '/vi-poster-5.webp',
  '/vi-poster-6.webp',
]

// 支持瀑布流布局的作品名称
const galleryWorks: Record<string, string[]> = {
  '电子雾化器-槟蓝': binLanImages,
  '海报设计': posterImages,
}

export default function WorkDetail() {
  const { category, name } = useParams<{ category: string; name: string }>()
  const navigate = useNavigate()
  const revealElsRef = useRef<HTMLDivElement>(null)

  const decodedName = decodeURIComponent(name || '')

  // 根据作品名称映射详情页图片
  const detailImages: Record<string, string> = {
    '鑫汇科APP': '/work-xinHuiKe.webp',
    '捷运通APP': '/work-jieYunTong.webp',
    '金控掌柜APP': '/work-jinKongZhangGui.webp',
  }
  const detailImg = detailImages[decodedName] || '/work-detail-content.png'

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
    <div className="work-detail-page" ref={revealElsRef}>
      <ParticleBackground />
      <CursorEffect />

      {/* 返回按钮 */}
      <button
        className="work-detail-nav-back"
        onClick={() => navigate('/')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>返回首页</span>
      </button>

      <div className="container work-detail-page-inner">
        <span className="section-label reveal">
          {category === 'ai' ? 'AI作品' : category === 'ui' ? 'UI作品' : 'VI平面'}
        </span>
        <h1 className="work-detail-page-title reveal reveal-delay-1">
          {decodeURIComponent(name || '')}
        </h1>

        {/* 内容区域 */}
        {galleryWorks[decodedName] ? (
          <div className="work-detail-page-content reveal reveal-delay-2">
            <div className="vi-gallery">
              {galleryWorks[decodedName].map((src, i) => (
                <img key={i} src={src} alt={`${decodedName} ${i + 1}`} className="vi-gallery-img" loading="lazy" />
              ))}
            </div>
          </div>
        ) : (
          <div className="work-detail-page-content reveal reveal-delay-2">
            <img
              src={detailImg}
              alt={decodedName}
              className="work-detail-page-img"
            />
          </div>
        )}
      </div>
    </div>
  )
}
