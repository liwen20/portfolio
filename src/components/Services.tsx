import './Services.css'

const services = [
  {
    icon: '🎨',
    name: '品牌视觉设计',
    text: '品牌识别系统构建、Logo设计、VI视觉规范、品牌物料设计，从策略到执行的完整品牌服务',
  },
  {
    icon: '🤖',
    name: 'AI 创意设计',
    text: 'AI辅助创意生成、AIGC视觉内容创作、AI工作流搭建，用技术放大创意效率',
  },
  {
    icon: '💻',
    name: '数字产品设计',
    text: 'UI/UX设计、网站设计、App界面设计、SaaS产品设计，打造极致用户体验',
  },
  {
    icon: '📱',
    name: '社交媒体视觉',
    text: '社交媒体视觉体系、Campaign创意设计、电商视觉设计，助力品牌数字化传播',
  },
  {
    icon: '🎬',
    name: '动效设计',
    text: '品牌动效、交互动效、短视频视觉、Motion Graphics，让品牌表达更生动',
  },
  {
    icon: '💡',
    name: '设计咨询',
    text: '品牌视觉诊断、设计体系搭建、设计团队指导，帮助企业建立设计能力',
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <span className="section-label reveal">Services</span>
        <h2 className="section-title reveal reveal-delay-1">
          我的<em>服务</em>
        </h2>

        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`service-card hover-target reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
