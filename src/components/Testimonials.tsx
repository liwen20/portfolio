import './Testimonials.css'

const testimonials = [
  {
    text: '李文对品牌视觉的理解非常深刻，他用AI工具带来的创意方案超出了我们的预期，交付效率也令人印象深刻。',
    name: '张明',
    role: '科技初创公司 CEO',
    initial: 'Z',
  },
  {
    text: '与李文的合作是一次非常愉快的体验。他不仅有出色的设计能力，更能从商业角度思考问题，提供真正有价值的设计方案。',
    name: '王芳',
    role: '品牌市场总监',
    initial: 'W',
  },
  {
    text: '作为长期合作伙伴，李文 consistently 交付高质量的设计作品。他对AI设计工具的熟练运用让我们的项目总能走在前沿。',
    name: '林杰',
    role: '创意总监',
    initial: 'L',
  },
]

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <span className="section-label reveal">Testimonials</span>
        <h2 className="section-title reveal reveal-delay-1">
          客户<em>评价</em>
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`testimonial-card hover-target reveal reveal-delay-${i + 1}`}
            >
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
