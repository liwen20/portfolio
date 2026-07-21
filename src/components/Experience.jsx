import { experiences } from '../data'
import SectionHeader from './SectionHeader'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-bg-soft/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="CAREER PATH" title="经历时间线" desc="一路走来的轨迹，从视觉设计到 AI 创意的演进。" />

        <div className="mt-14 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-orange/50 via-accent-orange/30 to-transparent md:-translate-x-1/2" />
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className={`relative reveal flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent-orange ring-4 ring-bg -translate-x-1/2 mt-2 z-10">
                  <div className="absolute inset-0 rounded-full bg-accent-orange animate-ping opacity-40" />
                </div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div className="glass-card p-6">
                    <span className="text-xs font-mono text-accent-orange">{exp.year}</span>
                    <h3 className="text-lg font-bold text-white mt-2 mb-1">{exp.role}</h3>
                    <p className="text-sm text-accent-orange-light mb-3">{exp.company}</p>
                    <p className="text-sm text-text-soft leading-relaxed mb-4">{exp.desc}</p>
                    {/* 高光点 */}
                    {exp.highlights && (
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        {exp.highlights.map((h, hi) => (
                          <div key={hi} className="flex items-center gap-2 text-sm text-text">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0" />
                            {h}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
