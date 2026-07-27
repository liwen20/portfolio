// ============================================
//  李文个人作品集 — 真实数据
//  数据来源：李文简历.pdf（2024-2025）
// ============================================

// 资源公共前缀：自动适配部署平台
// Vite 的 import.meta.env.BASE_URL 在 build 时由 vite.config.js 的 base 决定：
// - Cloudflare 构建：base = '/'（JS/CSS 由 Cloudflare 提供，hash 文件名跨平台不同）
// - GitHub Pages 构建：base = '/portfolio/'（本地相对路径）
const BASE = import.meta.env.BASE_URL || '/'

// 静态资源统一前缀（图片/视频/PDF，文件名固定无 hash）：
// 两个域名各自独立部署，资源各走各的源 ——
// Cloudflare Pages 构建（base='/'）走 Cloudflare 自身源；
// GitHub Pages 构建（base='/portfolio/'）走本地相对路径。
// 直接复用 BASE，不再跨平台引用 GitHub Pages 源。
const STATIC_BASE = BASE

export const profile = {
  name: '李文',
  nameEn: 'LI WEN',
  initials: 'LW',
  nameEnFull: 'Li Wen',
  title: 'UI 设计师 / AIGC 设计',
  tagline: '以 AI 生成、视觉系统与动态影像为媒介，创造可落地的设计体验',
  intro: '7年+ UI设计与AIGC创意设计经验，深耕金融科技领域。从支付产品到知识付费平台，具备从0到1的产品设计能力，兼具项目管理视角。',
  detail: '擅长将复杂业务逻辑转化为直观、优雅的用户界面，并运用 AI 工具提升设计效率与创意表达。已主导多款金融产品的UI设计与全流程迭代。',
  location: '中国 · 深圳',
  phone: '188-7417-3305',
  phoneRaw: '18874173305',
  wechat: '18874173305',
  email: '445141110@qq.com',
  jobStatus: '2024 — 2025',
  available: true,
  showreelYear: '2026',
  avatar: `${STATIC_BASE}about-card-bg.jpg`,
  showreelVideo: `${STATIC_BASE}about-showreel.mp4`,
  heroVideo: `${STATIC_BASE}hero-bg.mp4`,
  resumeFile: `${STATIC_BASE}李文简历.pdf`,
  social: [
    { name: 'Behance', url: '#' },
    { name: 'Dribbble', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: '站酷', url: '#' },
  ],
  stats: [
    { value: 7, suffix: '+', label: '设计经验' },
    { value: 15, suffix: '+', label: '完成项目' },
    { text: 'UI/AIGC', label: '技能方向' },
  ],
  education: {
    year: '2011 — 2015',
    school: '中南林业科技大学',
    degree: '本科',
    major: '土木工程',
  },
}

export const categories = [
  { key: 'ai', label: 'AI作品' },
  { key: 'ui', label: 'UI作品' },
  { key: 'vi', label: 'VI平面' },
]

// 作品详情信息字段说明：
//   bg:      项目背景
//   role:    担任角色
//   tools:   使用工具
//   result:  项目成果
//   duration: 项目周期
export const works = {
  ai: [
    // 夜莺航行 — 一个项目卡片，同时包含产品图集和视频 Demo
    // 后续上传的新 AI 项目可以独立添加为新的卡片
    {
      id: 'nightingale',
      name: '夜莺航行',
      category: 'ai',
      desc: '运用 Midjourney / ChatGPT / Seedance 2.0 / 豆包AI 辅助完成的 AI 创意项目',
      tag: 'AI Art',
      type: 'project',  // project 类型：卡片上同时有产品图集热区和视频热区
      posterSrc: `${STATIC_BASE}ai-nightingale-banner.jpg`,  // 夜莺航行主视觉 banner（黄蓝飞船·太空城市场景）
      // 产品图集（点击展开详情弹窗，与 VI 平面卡片详情样式一致）
      gallery: [
        `${STATIC_BASE}ai-nightingale-8-character-sheet.jpg`, // SKY-001 角色设定（置顶·最新上传）
        `${STATIC_BASE}ai-nightingale-1-ostrich.jpg`,     // 驼鸟骑行·沙漠
        `${STATIC_BASE}ai-nightingale-2-capsule.jpg`,     // 机甲操控胶囊·废墟
        `${STATIC_BASE}ai-nightingale-3-poster1.jpg`,      // 宇宙飞船系列海报
        `${STATIC_BASE}ai-nightingale-4-savanna.jpg`,      // 非洲草原·跳跃
        `${STATIC_BASE}ai-nightingale-5-back.jpg`,         // 未来机甲背影·赛博城市
        `${STATIC_BASE}ai-nightingale-6-cockpit.jpg`,      // 驾驶舱
        `${STATIC_BASE}ai-nightingale-7-overview.jpg`,     // IP 设定总览
      ],
      // 视频 Demo（点击播放视频）
      videoSrc: `${STATIC_BASE}work-nightingale.mp4`,
      projectInfo: {
        bg: '以"夜莺在星空中航行"为意象，运用 Midjourney / ChatGPT / Seedance 2.0 / 豆包AI 辅助完成系列 AI 生成视觉与动态影像。从概念草图到产品视觉再到动态短片，全流程探索 AI 工具的协同创作能力。',
        role: 'AI 创意导演 / 视觉设计',
        tools: ['Midjourney', 'ChatGPT', 'Seedance 2.0', '豆包AI', 'After Effects'],
        duration: '2026.01 - 2026.02',
        result: '完成系列 AI 产品视觉与一部 60 秒 AI 短片，验证了多模型协同生成的可行性，画面风格统一且叙事连贯。',
      },
    },
    // 超级杯：银河德比 — 新项目（待补图集+视频）
    {
      id: 'elclasico',
      name: '超级杯：银河德比',
      category: 'ai',
      desc: '以"皇家马德里 vs 巴塞罗那"为题材，运用 AI 生成 Q 版足球明星角色与赛事视觉设计',
      tag: 'AI Art',
      type: 'project',  // project 类型：卡片上同时有产品图集热区和视频热区
      posterSrc: `${STATIC_BASE}ai-elclasico-banner.jpg`,  // 银河德比主视觉 banner
      // 产品图集
      gallery: [
        `${STATIC_BASE}ai-elclasico-1-cr7-pixie.png`,        // C罗·Q版三视图（白·7号）
        `${STATIC_BASE}ai-elclasico-2-cr7-single.png`,       // C罗·单人站姿
        `${STATIC_BASE}ai-elclasico-3-messi-neymar-dual.png`, // 梅西+内马尔·双人对峙
        `${STATIC_BASE}ai-elclasico-4-messi-turnaround.png`,  // 梅西·Q版三视图（蓝红·10号）
        `${STATIC_BASE}ai-elclasico-5-neymar-turnaround.png`,  // 内马尔·Q版三视图（蓝红·11号）
      ],
      // 视频 Demo（点击播放视频）
      videoSrc: `${STATIC_BASE}work-elclasico.mp4`,
      projectInfo: {
        bg: '以西班牙超级杯"国家德比"为主题，用 AI 生成 Q 版皇马/巴萨球员角色、赛场氛围与动态视觉效果，探索 AI 在体育 IP 视觉化上的应用。',
        role: 'AI 创意导演 / 视觉设计',
        tools: ['ChatGPT'],
        duration: '2026.07',
        result: '完成 Q 版角色三视图设计（C罗/梅西/内马尔）、双人组合构图与 9 幕分镜脚本，并产出一支 52 秒 H.264 动态短片，验证了体育 IP 的 AI 视觉化流程。',
      },
    },
    // 红色 NONEO 墨镜品牌 — 新项目
    {
      id: 'noneo',
      name: '红色NONEO墨镜',
      category: 'ai',
      desc: '运用 AI 生成的潮流墨镜品牌视觉设计与动态影像',
      tag: 'AI Art / Brand',
      type: 'project',  // project 类型：卡片上同时有产品图集热区和视频热区
      posterSrc: `${STATIC_BASE}ai-noneo-banner.jpg`,  // NONEO 墨镜主视觉 banner
      // 产品图集（待补充）
      gallery: [
        // TODO: 上传详情图后在此添加
      ],
      // 视频 Demo（待上传）
      // videoSrc: `${STATIC_BASE}work-noneo.mp4`,
      projectInfo: {
        bg: '以"红色 NONEO 墨镜"为品牌核心意象，运用 AI 工具生成具有强烈视觉冲击力的品牌形象、产品展示与动态影像。探索 AI 在时尚配饰领域的品牌视觉表达可能性。',
        role: 'AI 创意导演 / 视觉设计',
        tools: ['Midjourney', 'ChatGPT', 'Seedance 2.0'],
        duration: '2026.07 - 进行中',
        result: '完成品牌主视觉形象设定与动态影像 Demo 制作中。',
      },
    },
  ],
  ui: [
    {
      id: 'jinKongZhangGui',
      name: '金控掌柜APP',
      category: 'ui',
      desc: '移动支付与生活服务产品 · Fintech / Mobile Payment',
      tag: 'UI Design',
      type: 'poster',
      posterSrc: `${STATIC_BASE}work-jinKongZhangGui-banner.webp`,
      detailSrc: `${STATIC_BASE}work-jinKongZhangGui.webp`,
      projectInfo: {
        bg: '面向 C 端用户的移动支付与生活服务产品。负责整体 UI 视觉设计、交互流程优化及版本迭代，打造流畅的支付体验。',
        role: '主设计师',
        tools: ['Figma', 'Photoshop', 'Illustrator'],
        duration: '2018.10 - 2020.08',
        result: '日交易量从 200W+ 增长到 1000W+。',
      },
    },
    {
      id: 'jieYunTong',
      name: '捷运通APP',
      category: 'ui',
      desc: '运输物流产品 · Logistics / 车辆端 · 托运端',
      tag: 'UI / PM',
      type: 'poster',
      posterSrc: `${STATIC_BASE}work-jieYunTong-banner.webp`,
      detailSrc: `${STATIC_BASE}work-jieYunTong.webp`,
      projectInfo: {
        bg: '面向公路运输与城市配送的数字化物流平台，覆盖车辆端与托运端双场景。以 UI/PM 双角色主导产品设计全流程，打通货主发布货源、司机智能接单、在途实时追踪与运费结算回款的全链路，显著提升车货匹配效率与运输透明度。',
        role: 'UI 设计师兼项目经理',
        tools: ['Figma', 'Axure', 'Photoshop'],
        duration: '2020.11 - 2023.07',
        result: '推动产品从 0 到 1 完成上线并持续迭代，沉淀车辆端与托运端双端口设计规范与可复用组件库。',
        ports: [
          { name: '车辆端（司机）', desc: '车辆档案管理、智能接单抢单、最优路线导航、在途签到与运费实时结算。' },
          { name: '托运端（货主）', desc: '一键发布货源、智能车货匹配、全程可视化追踪、电子回单与对账管理。' },
        ],
      },
    },
    {
      id: 'kaXinFintech',
      name: '湖南卡鑫金融产品',
      category: 'ui',
      desc: '核心金融产品 UI 界面设计与视觉规范维护',
      tag: 'UI Design',
      type: 'poster',
      posterSrc: `${STATIC_BASE}work-xinHuiKe-banner.webp`,
      detailSrc: `${STATIC_BASE}work-xinHuiKe.webp`,
      projectInfo: {
        bg: '负责公司核心金融产品的 UI 界面设计与视觉规范维护，主导产品改版迭代，优化关键路径转化率。',
        role: '主设计师',
        tools: ['Figma', 'Photoshop', 'After Effects'],
        duration: '2023.09 - 至今',
        result: '建立组件化设计系统，提升团队设计交付效率 40%。',
      },
    },
  ],
  vi: [
    {
      id: 'binlan',
      name: '电子雾化器-槟蓝',
      category: 'vi',
      desc: '品牌视觉 — 新锐电子雾化器品牌全案设计',
      tag: 'VI Design',
      type: 'gallery',
      posterSrc: `${STATIC_BASE}vi-binlan-banner.webp`,
      gallery: [
        `${STATIC_BASE}vi-binlan-1.webp`, `${STATIC_BASE}vi-binlan-2.webp`, `${STATIC_BASE}vi-binlan-3.webp`,
        `${STATIC_BASE}vi-binlan-4.webp`, `${STATIC_BASE}vi-binlan-5.webp`, `${STATIC_BASE}vi-binlan-6.webp`,
      ],
      projectInfo: {
        bg: '为新兴电子雾化器品牌"槟蓝"打造完整的视觉识别系统，从 Logo 到包装、从线上宣传到线下物料，建立统一且有辨识度的品牌语言。',
        role: '品牌设计师',
        tools: ['Illustrator', 'Photoshop', 'Midjourney'],
        duration: '2023.11 - 2024.01',
        result: '输出品牌规范手册 40 页，涵盖 6 大应用场景，助力品牌顺利上市并获得首轮渠道合作。',
      },
    },
    {
      id: 'poster',
      name: '海报设计',
      category: 'vi',
      desc: '品牌视觉 — 商业海报与活动主视觉系列',
      tag: 'VI Design',
      type: 'gallery',
      posterSrc: `${STATIC_BASE}vi-poster-1.webp`,
      gallery: [
        `${STATIC_BASE}vi-poster-1.webp`, `${STATIC_BASE}vi-poster-2.webp`, `${STATIC_BASE}vi-poster-3.webp`,
        `${STATIC_BASE}vi-poster-4.webp`, `${STATIC_BASE}vi-poster-5.webp`, `${STATIC_BASE}vi-poster-6.webp`,
      ],
      projectInfo: {
        bg: '为多个品牌与活动设计的商业海报合集，涵盖产品发布、节日营销、活动主视觉等场景。每张海报都围绕核心诉求构建独特的视觉叙事。',
        role: '视觉设计师',
        tools: ['Photoshop', 'Illustrator', 'Midjourney'],
        duration: '2021 - 2024 持续输出',
        result: '累计产出 30+ 张商业海报，服务 8 个品牌客户，多张作品获站酷平台推荐。',
      },
    },
    {
      id: 'materials',
      name: '其他物料',
      category: 'vi',
      desc: '品牌视觉 — 原创科幻 IP「夜莺航行」项目展板',
      tag: 'VI Design',
      type: 'gallery',
      posterSrc: `${STATIC_BASE}vi-materials-nightingale-1.jpg`,
      gallery: [
        `${STATIC_BASE}vi-materials-nightingale-1.jpg`,
        `${STATIC_BASE}vi-materials-nightingale-2.jpg`,
      ],
      projectInfo: {
        bg: '原创科幻 IP「夜莺航行」系列品牌展板设计，从世界观架构、核心角色、主力战机、视觉风格到 IP 应用矩阵，全方位呈现科幻 IP 的全产业链开发思路。',
        role: 'AI 创意 / 品牌设计师',
        tools: ['Midjourney', 'ChatGPT', 'Photoshop', 'Illustrator'],
        duration: '2026.01 - 2026.02',
        result: '完成 15+ 品牌的物料延展设计，覆盖 4 种以上物理载体，帮助 3 个品牌完成线下首秀。',
      },
    },
  ],
}

export const skills = [
  // 核心能力
  { name: 'UI/UX 设计', level: 95, category: '核心能力' },
  { name: 'AIGC 创意设计', level: 90, category: '核心能力' },
  { name: '金融产品设计', level: 92, category: '核心能力' },
  { name: '产品从 0 到 1', level: 88, category: '核心能力' },
  { name: '组件化设计系统', level: 90, category: '核心能力' },
  // 工具
  { name: 'Figma', level: 95, category: '工具' },
  { name: 'Photoshop', level: 92, category: '工具' },
  { name: 'Illustrator', level: 88, category: '工具' },
  { name: 'Adobe XD', level: 85, category: '工具' },
  { name: 'Axure', level: 85, category: '工具' },
  { name: 'Midjourney', level: 90, category: '工具' },
  { name: 'Stable Diffusion', level: 80, category: '工具' },
  // 技术
  { name: 'HTML / CSS', level: 72, category: '技术' },
  { name: '设计系统搭建', level: 88, category: '技术' },
  { name: '原型交互', level: 85, category: '技术' },
  { name: '设计标注与交付', level: 90, category: '技术' },
  { name: '前端基础理解', level: 68, category: '技术' },
  { name: 'AI 提示词工程', level: 85, category: '技术' },
]

export const experiences = [
  {
    year: '2023.09 — 至今',
    role: 'UI 设计师',
    company: '湖南卡鑫科技有限公司',
    desc: '负责公司核心金融产品的 UI 界面设计与视觉规范维护，主导产品改版迭代，优化关键路径转化率。',
    highlights: [
      '负责核心金融产品 UI 设计',
      '建立组件化设计系统',
      '提升团队设计交付效率 40%',
    ],
  },
  {
    year: '2020.11 — 2023.07',
    role: 'UI 设计师兼项目经理',
    company: '湖南交泰科技有限公司',
    desc: '担任 UI 设计师兼项目经理，负责「交泰金管家」APP 全流程设计。从需求分析到原型设计、视觉输出、开发跟进，端到端把控产品质量。',
    highlights: [
      '以 UI/PM 双角色主导产品全流程',
      '推动产品从 0 到 1 上线并持续迭代',
      '沉淀设计规范文档，建立可复用 UI 组件库',
    ],
  },
  {
    year: '2018.10 — 2020.08',
    role: 'UI 设计师',
    company: '湖南金控数据服务有限公司',
    desc: '负责「金控掌柜」APP 的 UI 设计与视觉迭代，参与支付核心流程体验优化，配合产品团队完成生活服务模块的界面设计。',
    highlights: [
      '日交易量从 200W+ 增长到 1000W+',
      '负责金融科技产品 UI 体验',
      '配合多团队完成产品迭代',
    ],
  },
]

export const navLinks = [
  { label: '介绍', href: '#about' },
  { label: '作品', href: '#works' },
  { label: '技能', href: '#skills' },
  { label: '经历', href: '#experience' },
  { label: '联系', href: '#contact' },
]
