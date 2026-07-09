import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollFloat from './ScrollFloat'
import { saveHomeScroll } from '../Home'
import './Works.css'

interface WorkItem {
  name: string
  desc: string
  tag: string
  type: 'video' | 'poster'
  featured?: boolean
  videoSrc?: string
  posterSrc?: string
}

type Category = 'ai' | 'ui' | 'vi'

const categories: { key: Category; label: string }[] = [
  { key: 'ai', label: 'AI作品' },
  { key: 'ui', label: 'UI作品' },
  { key: 'vi', label: 'VI平面' },
]

const worksByCategory: Record<Category, WorkItem[]> = {
  ai: [
    {
      name: '夜莺航行',
      desc: '运用 Midjourney / ChatGPT / Seedance 2.0 / 豆包AI 辅助完成',
      tag: 'AI Art · Video',
      type: 'video',
      featured: true,
      videoSrc: '/work-nightingale.mp4',
      posterSrc: '/work-nightingale.png',
    },
  ],
  ui: [
    {
      name: '鑫汇科APP',
      desc: '金融科技 — 点击查看详情',
      tag: 'UI Design',
      type: 'poster',
      posterSrc: '/work-xinHuiKe-banner.webp',
    },
    {
      name: '捷运通APP',
      desc: '智慧物流 — 点击查看详情',
      tag: 'UI Design',
      type: 'poster',
      posterSrc: '/work-jieYunTong-banner.webp',
    },
    {
      name: '金控掌柜APP',
      desc: '投资管理 — 点击查看详情',
      tag: 'UI Design',
      type: 'poster',
      posterSrc: '/work-jinKongZhangGui-banner.webp',
    },
  ],
  vi: [
    {
      name: '电子雾化器-槟蓝',
      desc: '品牌视觉 — 点击查看详情',
      tag: 'VI Design',
      type: 'poster',
      posterSrc: '/vi-binlan-banner.webp',
    },
    {
      name: '海报设计',
      desc: '品牌视觉 — 点击查看详情',
      tag: 'VI Design',
      type: 'poster',
      posterSrc: '/vi-poster-1.webp',
    },
    {
      name: '其他物料',
      desc: '品牌视觉 — 点击查看详情',
      tag: 'VI Design',
      type: 'poster',
      posterSrc: '/vi-poster-1.webp',
    },
  ],
}

export default function Works() {
  const [active, setActive] = useState<Category>('ai')
  const [slideOffset, setSlideOffset] = useState(0) // 浮点数，支持平滑拖拽
  const [isDragging, setIsDragging] = useState(false)
  const [videoItem, setVideoItem] = useState<WorkItem | null>(null)
  const navigate = useNavigate()

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef(0)
  const dragStartOffset = useRef(0)

  const itemsPerPage = active === 'ai' ? 1 : 3
  const currentWorks = worksByCategory[active]
  const totalPages = Math.max(1, Math.ceil(currentWorks.length / itemsPerPage))

  // 构建分页
  const pages: WorkItem[][] = []
  for (let i = 0; i < currentWorks.length; i += itemsPerPage) {
    pages.push(currentWorks.slice(i, i + itemsPerPage))
  }

  const pageIndex = Math.round(slideOffset)
  const canSlide = totalPages > 1

  const handleCategoryChange = (cat: Category) => {
    setActive(cat)
    setSlideOffset(0)
    setIsDragging(false)
  }

  // ===== 拖拽逻辑 =====
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!canSlide) return
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartOffset.current = slideOffset
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !viewportRef.current) return
    const viewportWidth = viewportRef.current.offsetWidth
    const deltaX = e.clientX - dragStartX.current
    let newOffset = dragStartOffset.current + deltaX / viewportWidth
    newOffset = Math.max(0, Math.min(totalPages - 1, newOffset))
    setSlideOffset(newOffset)
  }

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    // 吸附到最近的页
    const snapped = Math.round(slideOffset)
    setSlideOffset(snapped)
  }, [isDragging, slideOffset])

  const goToPage = (page: number) => {
    setSlideOffset(Math.max(0, Math.min(totalPages - 1, page)))
  }

  const nextPage = () => {
    if (pageIndex < totalPages - 1) setSlideOffset(pageIndex + 1)
  }
  const prevPage = () => {
    if (pageIndex > 0) setSlideOffset(pageIndex - 1)
  }

  // 缩略百分比
  const thumbWidth = 100 / totalPages
  const thumbLeft = totalPages > 1 ? (slideOffset / (totalPages - 1)) * (100 - thumbWidth) : 0

  return (
    <section className="section" id="works">
      <div className="container">
        <span className="section-label reveal">Selected Works</span>
        <ScrollFloat
          containerClassName="works-scroll-title"
          textClassName="works-scroll-title-text"
          animationDuration={1}
          ease="back.inOut(2)"
          stagger={0.04}
        >
          作品案例
        </ScrollFloat>

        {/* 分类切换栏 */}
        <div className="works-tabs reveal reveal-delay-2">
          <div className="works-tabs-inner">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`works-tab hover-target${active === cat.key ? ' active' : ''}`}
                onClick={() => handleCategoryChange(cat.key)}
              >
                {cat.label}
              </button>
            ))}
            <div
              className="works-tab-indicator"
              style={{
                transform: `translateX(${categories.findIndex((c) => c.key === active) * 100}%)`,
              }}
            />
          </div>
        </div>

        {/* 轮播视窗 */}
        <div className="works-carousel-viewport" ref={viewportRef}>
          <div
            className={`works-carousel-track${isDragging ? ' dragging' : ''}`}
            style={{ transform: `translateX(-${slideOffset * 100}%)` }}
          >
            {pages.map((pageItems, pIdx) => (
              <div
                className={`works-carousel-page${active === 'ai' ? ' ai-page' : ' grid-three-page'}`}
                key={pIdx}
              >
                {pageItems.map((w, i) => (
                  <div
                    key={w.name}
                    className={`work-card hover-target work-card-enter${w.featured ? ' featured' : ''}`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Banner 区 */}
                    <div
                      className="work-media"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (w.videoSrc) {
                          setVideoItem(w)
                        } else {
                          saveHomeScroll()
                          navigate(`/work/${active}/${encodeURIComponent(w.name)}`)
                        }
                      }}
                    >
                      <div
                        className="work-media-placeholder"
                        style={
                          w.posterSrc
                            ? undefined
                            : {
                                background: `linear-gradient(135deg,
                                  rgba(255,140,66,0.12),
                                  rgba(255,193,92,0.06),
                                  rgba(255,140,66,0.08))`,
                              }
                        }
                      >
                        {w.posterSrc && (
                          <img src={w.posterSrc} alt={w.name} className="work-media-img" />
                        )}
                      </div>
                      {w.type === 'video' && (
                        <div className="work-media-play">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                      <span className="work-media-tag">{w.tag}</span>
                    </div>
                    {/* 标题和内容区 */}
                    <div
                      className="work-body"
                      onClick={(e) => {
                        e.stopPropagation()
                        saveHomeScroll()
                        navigate(`/work/${active}/${encodeURIComponent(w.name)}`)
                      }}
                    >
                      <h3 className="work-name">{w.name}</h3>
                      <p className="work-text">{w.desc}</p>
                      <div className="work-meta">
                        <span>{categories.find((c) => c.key === active)?.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 底部滑动控制器：仅当可滑动时显示 */}
        {canSlide && (
        <div className="works-slider">
          {/* 左箭头 */}
          <button
            className="works-slider-arrow hover-target"
            onClick={prevPage}
            disabled={pageIndex === 0}
            aria-label="上一组"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* 滑动轨道 */}
          <div
            ref={trackRef}
            className={`works-slider-track${isDragging ? ' dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* 进度条缩略 */}
            <div
              className={`works-slider-thumb${isDragging ? ' dragging' : ''}`}
              style={{
                width: `${thumbWidth}%`,
                left: `${thumbLeft}%`,
              }}
            >
              <span className="works-slider-knob" />
            </div>
            {/* 页码点 */}
            <div className="works-slider-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <span
                  key={i}
                  className={`works-slider-dot${i === pageIndex ? ' active' : ''}`}
                  onClick={() => canSlide && goToPage(i)}
                />
              ))}
            </div>
          </div>

          {/* 右箭头 */}
          <button
            className="works-slider-arrow hover-target"
            onClick={nextPage}
            disabled={pageIndex >= totalPages - 1}
            aria-label="下一组"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* 页码 */}
          <span className="works-slider-count">
            {pageIndex + 1} / {totalPages}
          </span>
        </div>
        )}
      </div>

      {/* 视频播放弹窗 */}
      {videoItem?.videoSrc && (
        <div className="work-video-modal" onClick={() => setVideoItem(null)}>
          <div className="work-video-modal-backdrop" />
          <button
            className="work-video-modal-close"
            onClick={() => setVideoItem(null)}
            aria-label="关闭"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="work-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <video
              src={videoItem.videoSrc}
              controls
              autoPlay
              playsInline
              className="work-video-player"
            />
          </div>
        </div>
      )}
    </section>
  )
}
