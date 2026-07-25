import { useState } from 'react'
import { profile } from '../data'
import SectionHeader from './SectionHeader'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`来自 ${form.name} 的合作邀约`)
    const body = encodeURIComponent(`${form.message}\n\n---\n发件人: ${form.name}\n邮箱: ${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="GET IN TOUCH" title={<>联系<em className="not-italic text-gradient">方式</em></>} desc="无论是项目合作、设计咨询，还是单纯的交流，都欢迎找我聊聊。" />

        <div className="grid md:grid-cols-2 gap-12 mt-14">
          {/* 左侧 */}
          <div className="reveal space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">直接联系</h3>
              <div className="space-y-4">
                <a href={`tel:${profile.phoneRaw}`} className="flex items-center gap-4 text-text-soft hover:text-accent-orange transition group">
                  <span className="w-11 h-11 rounded-xl bg-bg-card border border-white/5 flex items-center justify-center group-hover:border-accent-orange/30 transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  </span>
                  <div>
                    <div className="text-xs text-text-dim">Phone</div>
                    <div className="text-sm font-mono">{profile.phone}</div>
                    <div className="text-xs text-text-dim mt-0.5">工作日 9:00 - 18:00</div>
                  </div>
                </a>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-text-soft hover:text-accent-orange transition group">
                  <span className="w-11 h-11 rounded-xl bg-bg-card border border-white/5 flex items-center justify-center group-hover:border-accent-orange/30 transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>
                  </span>
                  <div>
                    <div className="text-xs text-text-dim">Email</div>
                    <div className="text-sm font-mono">{profile.email}</div>
                    <div className="text-xs text-text-dim mt-0.5">随时回复，期待合作</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-text-soft group">
                  <span className="w-11 h-11 rounded-xl bg-bg-card border border-white/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.69 11.52c-.42-.42-.42-1.1 0-1.52l3.05-3.05c.42-.42 1.1-.42 1.52 0l3.05 3.05c.42.42.42 1.1 0 1.52l-3.05 3.05c-.42.42-1.1.42-1.52 0l-3.05-3.05zm-3.79 6.94c-2.83-2.83-2.83-7.42 0-10.25l1.41 1.41c-2.05 2.05-2.05 5.38 0 7.43l-1.41 1.41zm14.2 0l-1.41-1.41c2.05-2.05 2.05-5.38 0-7.43l1.41-1.41c2.83 2.83 2.83 7.42 0 10.25z" /></svg>
                  </span>
                  <div>
                    <div className="text-xs text-text-dim">WeChat</div>
                    <div className="text-sm font-mono">{profile.wechat}</div>
                    <div className="text-xs text-text-dim mt-0.5">同手机号</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">社交媒体</h3>
              <div className="flex flex-wrap gap-3">
                {profile.social.map((s) => (
                  s.url && s.url !== '#' ? (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-bg-card border border-white/5 text-text-soft hover:text-accent-orange hover:border-accent-orange/30 hover:-translate-y-1 transition-all text-sm">
                      {s.name}
                    </a>
                  ) : (
                    <span key={s.name}
                      className="px-4 py-2.5 rounded-xl bg-bg-card border border-white/5 text-text-dim text-sm cursor-default">
                      {s.name}
                    </span>
                  )
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <p className="text-sm text-text-soft leading-relaxed mb-4">
                <span className="text-accent-orange">●</span> 当前接受自由职业委托与全职机会。
                <br />通常会在 24 小时内回复���的消息。
              </p>
              <a href={profile.resumeFile} download="李文简历.pdf" className="btn-primary text-sm w-full justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                下载完整简历
              </a>
            </div>
          </div>

          {/* 右侧表单 */}
          <form onSubmit={handleSubmit} className="reveal glass-card p-8 space-y-5">
            <div>
              <label className="block text-xs font-mono text-text-dim uppercase tracking-wider mb-2">你的名字</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-bg border border-white/5 text-white placeholder-text-dim focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/30 transition"
                placeholder="如何称呼你？" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-dim uppercase tracking-wider mb-2">邮箱</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-bg border border-white/5 text-white placeholder-text-dim focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/30 transition"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-dim uppercase tracking-wider mb-2">留言</label>
              <textarea required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-bg border border-white/5 text-white placeholder-text-dim focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/30 transition resize-none"
                placeholder="说说你的项目或想法..." />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              {sent ? '✓ 已打开邮件客户端' : '发送消息'}
              {!sent && <span className="text-lg">→</span>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
