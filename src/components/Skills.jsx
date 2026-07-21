import { useState, useRef, useEffect } from 'react'
import { skills } from '../data'
import SectionHeader from './SectionHeader'

const groups = ['核心能力', '工具', '技术']

export default function Skills() {
  const [animated, setAnimated] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="SKILLS & TOOLS" title="技能与工具" desc="8 年设计经验沉淀，将 AI 工具深度融入设计全流程，从概念到落地全链路覆盖。" />

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {groups.map((group, gi) => (
            <div key={group} className="reveal" style={{ transitionDelay: `${gi * 0.15}s` }}>
              <h3 className="text-sm font-mono text-accent-orange uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-accent-orange/50" />
                {group}
              </h3>
              <div className="space-y-5">
                {skills.filter((s) => s.category === group).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text font-medium">{skill.name}</span>
                      <span className="text-xs font-mono text-text-dim">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      {/* animated 为 false 时 width=0，为 true 时 width=目标值，所有进度条同步涨起 */}
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-orange to-accent-orange-light"
                        style={{
                          width: animated ? `${skill.level}%` : '0%',
                          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 标签云 */}
        <div className="mt-16 pt-12 border-t border-white/5 reveal">
          <p className="text-xs font-mono text-text-dim uppercase tracking-wider mb-6">其他能力</p>
          <div className="flex flex-wrap gap-3">
            {['UI/UX', 'AI Art', 'Midjourney', 'Seedance', '豆包AI', '品牌识别', '视觉系统', '动效设计', '设计系统', '用户研究', '原型设计', 'ChatGPT', 'Photoshop', 'Illustrator', 'After Effects', '包装设计', '字体设计'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-lg text-sm text-text-soft bg-bg-card border border-white/5 hover:border-accent-orange/30 hover:text-accent-orange transition-all cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
