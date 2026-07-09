import { useCountUp } from '../hooks/useCountUp'
import './Interaction.css'

export default function Interaction() {
  const brandCount = useCountUp(50)
  const projectCount = useCountUp(200)
  const aiCount = useCountUp(1500)

  return (
    <section className="section" id="interaction">
      <div className="container">
        <span className="section-label reveal">Interactive</span>
        <h2 className="section-title reveal reveal-delay-1">
          互动<em>体验</em>
        </h2>

        <div className="interaction-grid">
          <div className="interaction-box hover-target reveal reveal-delay-1">
            <div className="interaction-icon">🤖</div>
            <div className="interaction-number">
              <span ref={aiCount}>0</span>+
            </div>
            <div className="interaction-label">AI 生成设计方案</div>
            <div className="interaction-desc">
              借助 AI 快速迭代创意方案，从灵感到成品仅需数小时，让创意不再受限。
            </div>
            <div className="interaction-demo">尝试 AI 设计</div>
          </div>

          <div className="interaction-box hover-target reveal reveal-delay-2">
            <div className="interaction-icon">🎨</div>
            <div className="interaction-number">
              <span ref={brandCount}>0</span>+
            </div>
            <div className="interaction-label">合作品牌</div>
            <div className="interaction-desc">
              覆盖科技、时尚、消费等多领域，为不同品牌量身打造独特的视觉体系。
            </div>
            <div className="interaction-demo">查看品牌案例</div>
          </div>

          <div
            className="interaction-box hover-target reveal reveal-delay-3"
            style={{ gridColumn: '1 / -1' }}
          >
            <div className="interaction-icon">✨</div>
            <div className="interaction-number">
              <span ref={projectCount}>0</span>+
            </div>
            <div className="interaction-label">累计完成项目</div>
            <div className="interaction-desc">
              从品牌视觉到产品界面，从静态海报到动态视频，每一个项目都是对完美的追求。
            </div>
            <div className="interaction-demo">探索全部案例</div>
          </div>
        </div>
      </div>
    </section>
  )
}
