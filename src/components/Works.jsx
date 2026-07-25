import { useState } from 'react'
import { works, categories } from '../data'
import SectionHeader from './SectionHeader'

export default function Works() {
  const [active, setActive] = useState('ai')
  const [selected, setSelected] = useState(null)
  const [videoItem, setVideoItem] = useState(null)

  const currentWorks = works[active] || []

  return (
    <section id="works" className="relative py-24 md:py-32 bg-bg-soft/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="SELECTED WORKS" title="作品案例" desc="从 AI 生成到品牌视觉，每一个项目都是对设计与技术融合的探索。" />

        {/* 分类切换 */}
        <div className="flex flex-wrap gap-2 mt-10 mb-12 reveal">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setActive(cat.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === cat.key
                  ? 'bg-accent-orange/15 text-accent-orange border border-accent-orange/30'
                  : 'text-text-soft border border-white/5 hover:border-white/20 hover:text-white'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 作品网格 */}
        <div className={`grid gap-6 ${active === 'ai' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {currentWorks.map((work, i) => (
            <article key={`${active}-${work.id}`}
              className="glass-card group overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}>
              {/* 封面 */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {work.posterSrc || work.coverSrc ? (
                  <img src={work.posterSrc || work.coverSrc} alt={work.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent-orange/12 to-accent-orange-light/6" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-3 right-3 text-xs font-mono text-white/80 bg-bg/60 backdrop-blur-sm px-2.5 py-1 rounded">
                  {work.tag}
                </span>
                {/* project 类型显示两个标签 */}
                {work.type === 'project' && (
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {work.gallery?.length > 0 && (
                      <span className="text-[10px] font-mono text-accent-orange bg-accent-orange/15 border border-accent-orange/30 px-2 py-1 rounded backdrop-blur-sm">
                        {work.gallery.length} 图
                      </span>
                    )}
                    {work.videoSrc && (
                      <span className="text-[10px] font-mono text-accent-orange-light bg-accent-orange/15 border border-accent-orange/30 px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5"><path d="M8 5v14l11-7z" /></svg>
                        视频
                      </span>
                    )}
                  </div>
                )}
                {/* 非 project 类型的 hover 提示 */}
                {work.type !== 'project' && (
                  <div
                    onClick={() => work.type === 'video' ? setVideoItem(work) : setSelected(work)}
                    className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-accent-orange font-mono text-sm border border-accent-orange/40 px-4 py-2 rounded-lg">
                      {work.type === 'video' ? '播放视频' : '查看详情'} →
                    </span>
                  </div>
                )}
              </div>
              {/* 内容 */}
              <div className="p-6">
                <span className="text-xs font-mono text-accent-orange-light uppercase tracking-wider">
                  {categories.find((c) => c.key === active)?.label}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-accent-orange transition-colors">{work.name}</h3>
                <p className="text-sm text-text-soft">{work.desc}</p>
                {/* 项目周期标签 */}
                {work.projectInfo?.duration && (
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-text-dim">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    {work.projectInfo.duration}
                  </div>
                )}
                {/* project 类型：两个热区按钮 */}
                {work.type === 'project' && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                    {work.gallery?.length > 0 && (
                      <button
                        onClick={() => setSelected(work)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium bg-accent-orange/10 text-accent-orange border border-accent-orange/20 hover:bg-accent-orange/20 hover:border-accent-orange/40 transition-all"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>
                        产品图集
                      </button>
                    )}
                    {work.videoSrc && (
                      <button
                        onClick={() => setVideoItem(work)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-white border border-white/10 hover:border-accent-orange/30 hover:text-accent-orange transition-all"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M8 5v14l11-7z" /></svg>
                        视频Demo
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 视频弹窗 */}
      {videoItem?.videoSrc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md animate-fade-in" onClick={() => setVideoItem(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoItem(null)} className="absolute -top-12 right-0 text-white hover:text-accent-orange transition">✕ 关闭</button>
            <video src={videoItem.videoSrc} controls autoPlay playsInline className="w-full rounded-2xl" />
            {/* 视频项目信息 */}
            {videoItem.projectInfo && (
              <div className="mt-4 glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-3">{videoItem.name}</h3>
                <p className="text-sm text-text-soft mb-4">{videoItem.projectInfo.bg}</p>
                <div className="flex flex-wrap gap-2">
                  {videoItem.projectInfo.tools.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-text-dim">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 详情弹窗 */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md animate-fade-in" onClick={() => setSelected(null)}>
          <div className="glass-card max-w-5xl w-full max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* 头部 */}
            <div className="sticky top-0 z-10 relative p-6 border-b border-white/5 bg-bg-card/95 backdrop-blur-xl">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg/60 flex items-center justify-center text-white hover:bg-bg transition">✕</button>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-accent-orange-light uppercase tracking-wider">
                  {categories.find((c) => c.key === selected.category)?.label}
                </span>
                <span className="text-xs text-text-dim">·</span>
                <span className="text-xs font-mono text-text-dim">{selected.tag}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{selected.name}</h3>
              <p className="text-text-soft mt-2">{selected.desc}</p>
            </div>

            {/* 项目信息卡片 */}
            {selected.projectInfo && (
              <div className="p-6 grid md:grid-cols-4 gap-4 border-b border-white/5">
                <div>
                  <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-1.5">项目周期</div>
                  <div className="text-sm text-white">{selected.projectInfo.duration}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-1.5">担任角色</div>
                  <div className="text-sm text-white">{selected.projectInfo.role}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-1.5">使用工具</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.projectInfo.tools.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-accent-orange/10 text-accent-orange border border-accent-orange/20">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 项目背景 */}
            {selected.projectInfo?.bg && (
              <div className="p-6 border-b border-white/5">
                <div className="text-xs font-mono text-accent-orange uppercase tracking-wider mb-2">项目背景</div>
                <p className="text-text-soft leading-relaxed">{selected.projectInfo.bg}</p>
              </div>
            )}

            {/* 双端口设计 */}
            {selected.projectInfo?.ports?.length > 0 && (
              <div className="p-6 border-b border-white/5">
                <div className="text-xs font-mono text-accent-orange uppercase tracking-wider mb-3">双端口设计</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selected.projectInfo.ports.map((p) => (
                    <div key={p.name} className="glass-card p-5 rounded-xl">
                      <div className="text-sm font-bold text-white mb-2">{p.name}</div>
                      <p className="text-xs text-text-soft leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 图片内容 */}
            <div className="p-6">
              {selected.gallery ? (
                <div className="grid grid-cols-2 gap-4">
                  {selected.gallery.map((src, i) => (
                    <img key={i} src={src} alt={`${selected.name} ${i + 1}`} className="w-full rounded-xl" loading="lazy" />
                  ))}
                </div>
              ) : (
                selected.detailSrc && <img src={selected.detailSrc} alt={selected.name} className="w-full rounded-xl" />
              )}
            </div>

            {/* 项目成果 */}
            {selected.projectInfo?.result && (
              <div className="p-6 bg-accent-orange/5 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-accent-orange"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                  </span>
                  <div>
                    <div className="text-xs font-mono text-accent-orange uppercase tracking-wider mb-1.5">项目成果</div>
                    <p className="text-text leading-relaxed">{selected.projectInfo.result}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
