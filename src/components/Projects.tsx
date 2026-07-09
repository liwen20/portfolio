import { useState } from 'react'
import './Projects.css'

const categories = ['all', 'brand', 'digital', 'ai']
const categoryLabels: Record<string, string> = {
  all: '全部',
  brand: '品牌',
  digital: '数字',
  ai: 'AI创意',
}

const projects = [
  {
    name: '科技品牌视觉系统设计',
    desc: '为AI驱动的科技企业构建完整的品牌视觉识别系统，从Logo到线上触点全面覆盖',
    tag: 'Brand Identity',
    category: 'brand',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,140,66,0.08))',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    name: 'AI生成艺术系列 Campaign',
    desc: '运用Midjourney与Stable Diffusion创作品牌视觉 Campaign，探索人机协作创意新可能',
    tag: 'AI Campaign',
    category: 'ai',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,193,92,0.07))',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <polygon points="5,3 19,12 5,21" />
      </svg>
    ),
  },
  {
    name: '国际时尚品牌视觉重构',
    desc: '主导国际时尚品牌的视觉系统重构，融合东方美学与现代极简设计语言',
    tag: 'Rebranding',
    category: 'brand',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,167,38,0.06))',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
      </svg>
    ),
  },
  {
    name: 'SaaS产品界面设计',
    desc: '企业级SaaS产品的完整交互与视觉设计，通过AI辅助优化提升用户转化率40%',
    tag: 'UI / UX',
    category: 'digital',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,197,92,0.06))',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    name: 'AI概念艺术作品集',
    desc: '探索AI生成艺术的边界，创作系列概念视觉作品，被多个设计平台精选推荐',
    tag: 'AI Art',
    category: 'ai',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(240,147,45,0.07))',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    name: '新消费电商品牌视觉升级',
    desc: '协助新消费品牌完成视觉体系升级，重塑品牌在社交媒体与电商平台的视觉语言',
    tag: 'E-commerce',
    category: 'digital',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,168,50,0.06))',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mx', `${x}%`)
    e.currentTarget.style.setProperty('--my', `${y}%`)
  }

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <span className="section-label reveal">Selected Works</span>
            <h2 className="section-title reveal reveal-delay-1" style={{ marginBottom: 0 }}>
              精选<em>作品</em>
            </h2>
          </div>
          <div className="projects-filter reveal reveal-delay-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn hover-target${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {projects
            .filter((p) => filter === 'all' || p.category === filter)
            .map((project, i) => (
              <a
                key={project.name}
                href="#"
                className="project-card hover-target reveal reveal-delay-1"
                onMouseMove={handleMouseMove}
                style={{ transitionDelay: `${0.1 * (i + 1)}s` }}
              >
                <div className="project-img">
                  <div className="project-img-bg" style={{ background: project.bg }} />
                  <div className="project-img-overlay" />
                  <span className="project-tag">{project.tag}</span>
                  <div className="project-img-icon">{project.icon}</div>
                </div>
                <div className="project-body">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-text">{project.desc}</p>
                  <span className="project-cta">
                    View Project
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </section>
  )
}
