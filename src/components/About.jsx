import { profile } from '../data'
import SectionHeader from './SectionHeader'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧：视觉卡片 */}
          <div className="reveal relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
              {/* LW 字母 */}
              <div className="absolute top-6 left-6">
                <div className="font-din text-7xl font-bold text-white/90">{profile.initials}</div>
                <div className="text-xs font-mono tracking-[0.3em] text-accent-orange mt-1">DESIGNER</div>
              </div>
              {/* AI 标签 */}
              <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-accent-orange/20 backdrop-blur-md border border-accent-orange/30">
                <div className="font-din text-2xl font-bold text-accent-orange">AI</div>
                <div className="text-[10px] font-mono tracking-wider text-accent-orange/80">CREATIVE</div>
              </div>
            </div>
            {/* 装饰光晕 */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-orange/20 rounded-full blur-3xl -z-10" />
          </div>

          {/* 右侧：文字 */}
          <div>
            <SectionHeader label="ABOUT ME" title={<>以设计驱动<br /><em className="not-italic text-gradient">品牌新生</em></>} />

            {/* 旋转徽章 */}
            <div className="my-8 reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-orange/20 bg-accent-orange/5">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                <span className="text-xs font-mono tracking-wider text-accent-orange">VISUAL · AI · BRAND · DESIGN</span>
              </div>
            </div>

            <p className="text-text text-base md:text-lg leading-relaxed mb-4 reveal" style={{ transitionDelay: '0.3s' }}>
              我叫<span className="text-accent-orange font-medium">{profile.name}</span>，是一名专业的{profile.title}。{profile.intro}
            </p>
            <p className="text-text-soft text-sm md:text-base leading-relaxed mb-8 reveal" style={{ transitionDelay: '0.4s' }}>
              {profile.detail}
            </p>

            {/* 教育经历 */}
            {profile.education && (
              <div className="mb-6 p-4 rounded-xl bg-bg-card/40 border border-white/5 reveal" style={{ transitionDelay: '0.45s' }}>
                <div className="flex items-center gap-2 text-xs font-mono text-accent-orange uppercase tracking-wider mb-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                  教 育 经 历
                </div>
                <div className="text-sm text-white">{profile.education.school} · {profile.education.degree} · {profile.education.major}</div>
                <div className="text-xs text-text-dim font-mono mt-0.5">{profile.education.year}</div>
              </div>
            )}

            {/* 统计数据 */}
            <div className="grid grid-cols-3 gap-4 reveal" style={{ transitionDelay: '0.5s' }}>
              {profile.stats.map((s) => (
                <div key={s.label} className="glass-card p-4 text-center">
                  {s.value !== undefined ? (
                    <div className="font-din text-3xl font-bold text-white">
                      {s.value}<span className="text-accent-orange">{s.suffix}</span>
                    </div>
                  ) : (
                    <div className="font-din text-xl font-bold text-white">{s.text}</div>
                  )}
                  <div className="text-xs text-text-dim mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
