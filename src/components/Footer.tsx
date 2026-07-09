import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-bg">
        <div className="footer-glow" />
      </div>

      <div className="footer-inner">
        <span className="section-label reveal">Get In Touch</span>
        <h2 className="section-title footer-title reveal reveal-delay-1">
          开启合作<br />
          <em>共创未来</em>
        </h2>
        <p className="footer-desc reveal reveal-delay-2">
          无论您是希望为品牌打造独特的视觉形象，还是需要专业的设计咨询服务，
          我都期待与您沟通。让我们一起探索设计的无限可能。
        </p>
        <a
          href="mailto:hello@liwen.design"
          className="footer-email hover-target reveal reveal-delay-3"
        >
          hello@liwen.design
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>

        <div className="footer-social reveal reveal-delay-4">
          {['Behance', 'Dribbble', 'Instagram', 'LinkedIn', '站酷'].map((s) => (
            <a key={s} href="#" className="hover-target">
              {s}
            </a>
          ))}
        </div>

        <div className="footer-copy reveal reveal-delay-5">
          &copy; 2026 LI WEN. All rights reserved.
        </div>

        <button
          className="footer-top-btn hover-target reveal reveal-delay-5"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
          Back to Top
        </button>
      </div>
    </footer>
  )
}
