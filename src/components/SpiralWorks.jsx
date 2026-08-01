import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

/**
 * VerticalHelixGallery — 1:1 还原 saaam.pw "02 — Selected Works" 垂直螺旋画廊
 *
 * 核心算法（来自 saaam.pw 源码）：
 *   angleStep = 0.5
 *   radius = min(window.innerWidth * 0.42, 572)
 *   yStep = 90
 *   p = (i - offset) % count; p -= count/2
 *   theta = p * angleStep + π/2
 *   x = cos(theta) * radius
 *   y = p * yStep
 *   z = (sin(theta) - 1) * radius
 *   depth = (sin(theta) + 1) / 2
 *   opacity = 0.12 + depth * 0.88
 *   zIndex = round(depth * 100)
 *
 * 交互：
 *   - 拖拽（pointerdown/move/up）改变 targetOffset，垂直为主 + 水平辅助
 *   - 滚轮改变 targetOffset
 *   - 惯性缓动：offset += (target - offset) * 0.09
 *   - 鼠标移动时 tilt 跟随（rotateX/rotateY）
 *   - hover 卡片 _lift + scale
 *   - 点击 → lightbox
 *   - 空闲时自动缓慢旋转
 */
export default function SpiralWorks({ items, onSelect }) {
  const stageRef = useRef(null)
  const tiltRef = useRef(null)
  const ringRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const [nodes, setNodes] = useState([])
  const nodesRef = useRef([])

  // ---- 展平 VI gallery 为卡片数据 ----
  useEffect(() => {
    const n = []
    let idx = 0
    items.forEach((project) => {
      if (!project.gallery) return
      project.gallery.forEach((src, gi) => {
        n.push({
          id: `${project.id}-${gi}`,
          src,
          name: project.name,
          cat: project.desc || project.tag || '',
          yr: project.projectInfo?.duration || '',
        })
      })
    })
    setNodes(n)
    nodesRef.current = n
  }, [items])

  useEffect(() => {
    const stage = stageRef.current
    const tilt = tiltRef.current
    const ring = ringRef.current
    if (!stage || !tilt || !ring) return

    const cards = ring.querySelectorAll('.vh-card')
    const count = cards.length
    const angleStep = 0.5

    // 给每张卡片初始化 _lift 和 _scale
    cards.forEach(c => { c._lift = 0; c._scale = 1; })

    let offset = 0, targetOffset = 0
    let dragging = false, lastX = 0, lastY = 0
    let raf = null
    let idleId = null
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function isMobile() { return window.innerWidth <= 480 }
    function radius() { return isMobile() ? Math.min(window.innerWidth * 0.28, 130) : Math.min(window.innerWidth * 0.42, 572) }
    function yStep() { return isMobile() ? 64 : 90 }

    function apply() {
      const r = radius()
      cards.forEach((card, i) => {
        let p = (i - offset) % count
        if (p < 0) p += count
        p -= count / 2
        const theta = p * angleStep + Math.PI / 2
        const x = Math.cos(theta) * r
        const y = p * yStep()
        const z = (Math.sin(theta) - 1) * r + card._lift * 220
        const depth = (Math.sin(theta) + 1) / 2
        card.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) scale(${card._scale})`
        card.style.zIndex = Math.round(depth * 100)
        card.style.opacity = (0.12 + depth * 0.88).toFixed(3)
      })
    }

    function render() {
      const d = targetOffset - offset
      offset += d * 0.09
      apply()
      if (Math.abs(d) > 0.0005 || dragging) {
        raf = requestAnimationFrame(render)
      } else {
        raf = null
      }
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(render) }

    // ---- 拖拽 + 点击检测 ----
    let downX = 0, downY = 0, downCard = null, moved = false

    function onPointerDown(e) {
      dragging = true
      moved = false
      lastX = e.clientX
      lastY = e.clientY
      downX = e.clientX
      downY = e.clientY
      downCard = e.target.closest('.vh-card')
      stage.classList.add('drag')
    }
    function onPointerMove(e) {
      if (dragging) {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        // 移动超过阈值 → 判定为拖拽（非点击）
        if (Math.abs(e.clientX - downX) > 6 || Math.abs(e.clientY - downY) > 6) moved = true
        targetOffset += dy * 0.007 + dx * 0.003
        lastX = e.clientX
        lastY = e.clientY
        schedule()
      } else if (!reduceMotion && window.innerWidth > 820) {
        const mx = (e.clientX / window.innerWidth - 0.5)
        const my = (e.clientY / window.innerHeight - 0.5)
        gsap.to(tilt, { rotateX: 4 + my * 5, rotateY: mx * -5, duration: 1.2, ease: 'power3.out', overwrite: 'auto' })
      }
    }
    function onPointerUp() {
      dragging = false
      stage.classList.remove('drag')
      // 点击检测：未移动 + 命中卡片 → 打开 lightbox
      if (!moved && downCard) {
        const idx = [...cards].indexOf(downCard)
        if (idx >= 0) {
          const node = nodesRef.current[idx]
          if (node) {
            setLightbox({ src: node.src, title: node.name, cat: node.cat, yr: node.yr })
          }
        }
      }
      downCard = null
    }
    function onWheel(e) {
      e.preventDefault()
      targetOffset += e.deltaY * 0.004
      schedule()
    }

    stage.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    stage.addEventListener('wheel', onWheel, { passive: false })

    // ---- 初始入场 ----
    gsap.fromTo(cards, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, ease: 'power2.out', stagger: 0.04, delay: 0.25 })
    gsap.fromTo(tilt, { rotateX: 24, scale: 0.85 }, { rotateX: 4, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.1 })

    // 初始居中
    targetOffset = count / 2
    schedule()

    // ---- 空闲自动旋转 ----
    if (!reduceMotion) {
      idleId = setInterval(() => {
        if (!dragging) { targetOffset += 0.008; schedule() }
      }, 50)
    }

    // ---- hover 效果 ----
    cards.forEach((card, i) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { _lift: 0.4, _scale: 1.14, duration: 0.4, ease: 'power2.out', overwrite: 'auto', onUpdate: schedule })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { _lift: 0, _scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto', onUpdate: schedule })
      })
    })

    // ---- resize ----
    function onResize() { apply() }
    window.addEventListener('resize', onResize)

    // ---- 清理 ----
    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (idleId) clearInterval(idleId)
      stage.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      stage.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
    }
  }, [items, nodes])

  return (
    <div className="vh-page">
      {/* 螺旋舞台 */}
      <div ref={stageRef} className="vh-stage">
        <div className="vh-vignette" />
        <div ref={tiltRef} className="vh-tilt">
          <div ref={ringRef} className="vh-ring">
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className="vh-card"
                data-index={i}
              >
                <img src={node.src} alt={node.name} loading="lazy" draggable={false} />
                <span className="vh-cap">{String(i + 1).padStart(2, '0')} — {node.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 提示 */}
        <div className="vh-hint-left">
          <span className="vh-mouse"><i /></span>
          <span>Drag to rotate · Scroll to move</span>
        </div>
        <div className="vh-hint">Drag to rotate</div>
      </div>

        {/* ====== Lightbox ====== */}
        {lightbox && (
          <div className="vh-lb" onClick={() => setLightbox(null)}>
            <button className="vh-lb-close" onClick={() => setLightbox(null)}>✕</button>
            <div className="vh-lb-inner" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.title} className="vh-lb-img" />
              <div className="vh-lb-meta">
                <h4>{lightbox.title}</h4>
                <span>{(lightbox.cat || '').toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}

      <style>{`
        .vh-page {
          position: relative;
          width: 100%;
        }

        /* 舞台 */
        .vh-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 640px;
          overflow: hidden;
          background: #050505;
          cursor: grab;
          touch-action: none;
          perspective: 1400px;
          perspective-origin: 50% 45%;
        }
        .vh-stage.drag { cursor: grabbing; }

        .vh-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 75% 65% at 50% 48%, transparent 40%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .vh-tilt {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          will-change: transform;
          pointer-events: none;
        }

        .vh-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-style: preserve-3d;
          will-change: transform;
          pointer-events: none;
        }

        /* 卡片 */
        .vh-card {
          position: absolute;
          left: 0;
          top: 0;
          width: 240px;
          height: 300px;
          transform: translate(-50%, -50%);
          border-radius: 18px;
          overflow: hidden;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          pointer-events: auto;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .vh-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        .vh-cap {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 14px 12px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: #fff;
          background: linear-gradient(to top, rgba(0,0,0,0.82), transparent);
          pointer-events: none;
        }

        /* 提示 */
        .vh-hint-left {
          position: absolute;
          bottom: 28px;
          left: 32px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.3);
          z-index: 10;
          pointer-events: none;
        }
        .vh-mouse {
          display: inline-block;
          width: 16px;
          height: 24px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          position: relative;
        }
        .vh-mouse i {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 5px;
          background: rgba(255,255,255,0.4);
          border-radius: 2px;
          animation: vhWheel 1.6s ease-in-out infinite;
        }
        @keyframes vhWheel {
          0%, 100% { opacity: 0; transform: translate(-50%, 0); }
          40% { opacity: 1; }
          100% { transform: translate(-50%, 8px); opacity: 0; }
        }

        .vh-hint {
          position: absolute;
          bottom: 28px;
          right: 32px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.3);
          z-index: 10;
          pointer-events: none;
        }

        /* Lightbox */
        .vh-lb {
          position: fixed;
          inset: 0;
          z-index: 700;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 40px;
          background: rgba(3,3,3,0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .vh-lb-close {
          position: absolute;
          top: 24px;
          right: 32px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vh-lb-close:hover { background: rgba(255,255,255,0.14); color: #fff; }

        .vh-lb-inner {
          max-width: 880px;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #080808;
          border: 1px solid rgba(255,255,255,0.07);
          animation: vhLbIn 0.5s cubic-bezier(.22,.9,.28,1) both;
        }
        @keyframes vhLbIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .vh-lb-img {
          width: 100%;
          height: auto;
          max-height: 68vh;
          object-fit: contain;
          display: block;
        }
        .vh-lb-meta {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .vh-lb-meta h4 {
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        .vh-lb-meta span {
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.08em;
        }

        /* 移动端 */
        @media (max-width: 768px) {
          .vh-stage { height: 100vh; min-height: 560px; }
          .vh-card { width: 160px; height: 200px; border-radius: 14px; }
          .vh-cap { font-size: 9px; padding: 10px 10px 8px; }
          .vh-hint-left { left: 16px; bottom: 20px; font-size: 8px; gap: 6px; }
          .vh-hint { right: 16px; bottom: 20px; font-size: 8px; }
          .vh-lb { padding: 16px; }
          .vh-lb-img { max-height: 52vh; }
        }
      `}</style>
    </div>
  )
}
