import { profile, skills, experiences, works } from '../data'

// 简历页面 — 新窗口��开，可 Ctrl+P 保存为 PDF
export default function openResume() {
  const win = window.open('', '_blank')
  if (!win) return

  const allWorks = [...works.ai, ...works.ui, ...works.vi]
  const skillGroups = ['核心能力', '工具', '技术']

  const skillsHTML = skillGroups.map((g) => {
    const items = skills.filter((s) => s.category === g)
    return `<div class="sec">
      <h3>${g}</h3>
      <div class="tags">${items.map((s) => `<span class="tag">${s.name}</span>`).join('')}</div>
    </div>`
  }).join('')

  const expHTML = experiences.map((e) => `
    <div class="exp-item">
      <div class="exp-head">
        <strong>${e.role}</strong>
        <span class="exp-year">${e.year}</span>
      </div>
      <div class="exp-company">${e.company}</div>
      <p>${e.desc}</p>
      ${e.highlights ? `<ul>${e.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('')

  const worksHTML = allWorks.map((w) => `
    <div class="work-item">
      <div class="work-head">
        <strong>${w.name}</strong>
        <span class="work-tag">${w.tag}</span>
      </div>
      <p>${w.desc}</p>
      ${w.projectInfo ? `
        <div class="work-meta">
          <span>角色: ${w.projectInfo.role}</span>
          <span>周期: ${w.projectInfo.duration}</span>
          <span>工具: ${w.projectInfo.tools.join('、')}</span>
        </div>
        <p class="work-result">${w.projectInfo.result}</p>
      ` : ''}
    </div>
  `).join('')

  win.document.write(`<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>${profile.name} - 简历</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif; color: #1a1a1a; background: #f5f5f5; line-height: 1.6; }
  .page { max-width: 800px; margin: 20px auto; background: white; padding: 48px; box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
  @media print { body { background: white; } .page { margin: 0; box-shadow: none; padding: 32px; } }

  /* 头部 */
  .header { border-bottom: 3px solid #ff8c42; padding-bottom: 20px; margin-bottom: 28px; }
  .header h1 { font-size: 32px; color: #1a1a1a; letter-spacing: 2px; }
  .header .title { color: #ff8c42; font-size: 16px; margin-top: 4px; font-weight: 500; }
  .header .contact { margin-top: 12px; font-size: 13px; color: #666; display: flex; flex-wrap: wrap; gap: 16px; }
  .header .contact span::before { content: ''; display: inline-block; width: 4px; height: 4px; background: #ff8c42; border-radius: 50%; margin-right: 6px; vertical-align: middle; }

  /* 区块 */
  .sec { margin-bottom: 24px; }
  .sec h2 { font-size: 16px; color: #1a1a1a; border-left: 4px solid #ff8c42; padding-left: 10px; margin-bottom: 12px; letter-spacing: 1px; }
  .sec h3 { font-size: 13px; color: #ff8c42; margin-bottom: 6px; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .tag { font-size: 12px; padding: 3px 10px; background: #fff5ed; color: #cc6e35; border-radius: 4px; }

  /* 简介 */
  .summary { font-size: 14px; color: #444; line-height: 1.8; }

  /* 经历 */
  .exp-item { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px dashed #eee; }
  .exp-item:last-child { border-bottom: none; }
  .exp-head { display: flex; justify-content: space-between; align-items: center; }
  .exp-head strong { font-size: 15px; }
  .exp-year { font-size: 12px; color: #999; font-family: monospace; }
  .exp-company { color: #ff8c42; font-size: 13px; margin: 2px 0 6px; }
  .exp-item p { font-size: 13px; color: #555; }
  .exp-item ul { margin-top: 6px; padding-left: 16px; }
  .exp-item li { font-size: 12px; color: #666; margin-top: 2px; }

  /* 作品 */
  .work-item { margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px dashed #eee; }
  .work-item:last-child { border-bottom: none; }
  .work-head { display: flex; justify-content: space-between; align-items: center; }
  .work-head strong { font-size: 14px; }
  .work-tag { font-size: 11px; color: #999; font-family: monospace; }
  .work-item p { font-size: 13px; color: #555; margin-top: 2px; }
  .work-meta { font-size: 12px; color: #888; margin-top: 6px; display: flex; flex-wrap: wrap; gap: 12px; }
  .work-result { font-size: 12px; color: #cc6e35; margin-top: 4px; font-style: italic; }

  /* 页脚 */
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; text-align: center; font-size: 11px; color: #aaa; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <h1>${profile.name} <span style="font-size:14px;color:#999;font-weight:400;margin-left:8px;">${profile.nameEn}</span></h1>
    <div class="title">${profile.title}</div>
    <div class="contact">
      <span>${profile.phone}</span>
      <span>${profile.email}</span>
      <span>${profile.location}</span>
    </div>
  </div>

  <div class="sec">
    <h2>个人简介</h2>
    <p class="summary">${profile.intro}</p>
    <p class="summary" style="margin-top:8px;">${profile.detail}</p>
  </div>

  <div class="sec">
    <h2>技能与工具</h2>
    ${skillsHTML}
  </div>

  <div class="sec">
    <h2>工作经历</h2>
    ${expHTML}
  </div>

  <div class="sec">
    <h2>代表作品</h2>
    ${worksHTML}
  </div>

  <div class="footer">
    ${profile.nameEn} · ${profile.title} · ${new Date().getFullYear()} © All Rights Reserved
  </div>
</div>
</body>
</html>`)
  win.document.close()
}
