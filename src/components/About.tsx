import { useState } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import './About.css'

const stats = [
  { value: 8, suffix: '+', label: '工作年限', type: 'number' as const },
  { value: 20, suffix: '+', label: '完成项目', type: 'number' as const },
  { label: '技能树', text: 'UI/AI设计', type: 'text' as const },
]

function StatItem({ stat }: { stat: (typeof stats)[number] }) {
  const countRef = useCountUp(stat.type === 'number' ? stat.value : 0)

  return (
    <div className="stat-item hover-target">
      {stat.type === 'number' ? (
        <div className="stat-number">
          <span ref={countRef}>0</span>
          {stat.suffix}
        </div>
      ) : (
        <div className="stat-text">{stat.text}</div>
      )}
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}

export default function About() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-split">
          {/* 左侧：视觉卡片 */}
          <div className="about-visual reveal">
            <div
              className="about-card about-card-main"
              style={{ backgroundImage: 'url(/about-card-bg.jpg)' }}
              onClick={() => setShowVideo(true)}
              role="button"
              tabIndex={0}
            >
              <div className="about-card-overlay" />
              <div className="about-card-glow" />
              <div className="about-card-letter">LW</div>
              <div className="about-card-label">DESIGNER</div>
              <div className="about-card-play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="about-card-hint">点击播放</div>
            </div>
            <div className="about-card about-card-accent">
              <div className="about-card-accent-glow" />
              <div className="about-card-accent-text">AI</div>
              <div className="about-card-accent-label">CREATIVE</div>
            </div>
          </div>

          {/* 右侧：文字信息 */}
          <div className="about-info">
            <span className="about-eyebrow reveal">
              <span className="about-eyebrow-dot" />
              About Me
            </span>

            <h2 className="about-title reveal reveal-delay-1">
              以设计驱动<br />
              <em>品牌新生</em>
            </h2>

            {/* 旋转徽章 */}
            <div className="about-badge reveal reveal-delay-2">
              <svg viewBox="0 0 120 120" className="about-badge-svg">
                <defs>
                  <path
                    id="circlePath"
                    d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                    fill="none"
                  />
                </defs>
                <text className="about-badge-text">
                  <textPath href="#circlePath" startOffset="0">
                    VISUAL · AI · BRAND · DESIGN ·
                  </textPath>
                </text>
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              </svg>
              <div className="about-badge-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l1.5 6L20 9.5l-5 4 1.5 6.5L12 16.5l-4.5 3.5L9 13.5l-5-4 6.5-1.5z" />
                </svg>
              </div>
            </div>

            <p className="about-desc reveal reveal-delay-3">
              我叫<span className="about-name-highlight">李文</span>，是一名专业的UI设计师/AI创意师。拥有8年的设计工作经验，
              曾服务于多个产品公司。相信设计的本质是解决问题，而AI是放大创意边界的工具。
            </p>

            <p className="about-detail reveal reveal-delay-4">
              将人工智能深度融入设计流程，从概念生成到视觉执行，以技术驱动创意，
              让每次品牌表达都具备数据洞察与艺术感知的双重力量。
            </p>

            <div className="about-stats reveal reveal-delay-5">
              {stats.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 视频弹窗 */}
      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-modal-backdrop" />
          <button
            className="video-modal-close"
            onClick={() => setShowVideo(false)}
            aria-label="关闭"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <video
              src="/about-showreel.mp4"
              controls
              autoPlay
              playsInline
              className="video-modal-player"
            />
          </div>
        </div>
      )}
    </section>
  )
}
