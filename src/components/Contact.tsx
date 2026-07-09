import './Contact.css'

export default function Contact() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg">
        <div className="contact-glow" />
      </div>

      <div className="container" style={{ width: '100%' }}>
        <span className="section-label reveal">Get In Touch</span>
        <h2 className="section-title reveal reveal-delay-1" style={{ marginBottom: 48 }}>
          联系<em>方式</em>
        </h2>

        <div className="contact-grid">
          <a href="tel:18874173305" className="contact-card hover-target reveal reveal-delay-2">
            <div className="contact-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div className="contact-card-label">Phone</div>
            <div className="contact-card-value">188-7417-3305</div>
            <div className="contact-card-hint">工作日 9:00 - 18:00</div>
          </a>

          <a href="mailto:445141110@qq.com" className="contact-card hover-target reveal reveal-delay-3">
            <div className="contact-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
            </div>
            <div className="contact-card-label">Email</div>
            <div className="contact-card-value">445141110@qq.com</div>
            <div className="contact-card-hint">随时回复，期待合作</div>
          </a>

          <div className="contact-social reveal reveal-delay-4">
            {['Behance', 'Dribbble', 'Instagram', 'LinkedIn', '站酷'].map((s) => (
              <a key={s} href="#" className="hover-target">
                {s}
              </a>
            ))}
          </div>

          <div className="contact-copy reveal reveal-delay-5">
            &copy; 2026 LI WEN. All rights reserved.
            <br />
            <button
              className="footer-top-btn hover-target"
              onClick={scrollToTop}
              style={{ marginTop: 16 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
