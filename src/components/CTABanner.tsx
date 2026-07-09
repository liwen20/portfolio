import './CTABanner.css'

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-inner reveal">
          <div className="cta-content">
            <h2 className="cta-title">
              有项目想法？<em>让我们聊聊</em>
            </h2>
            <p className="cta-desc">
              无论是品牌视觉升级、AI创意探索还是数字产品设计，
              我都期待与您一起创造出色的作品。
            </p>
            <a href="#contact" className="btn-primary hover-target">
              开始合作
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
