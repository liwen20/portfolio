import './Skills.css'

const tools = [
  { icon: '🎨', name: 'Figma' },
  { icon: '🖼️', name: 'Photoshop' },
  { icon: '✏️', name: 'Illustrator' },
  { icon: '🎬', name: 'After Effects' },
  { icon: '🤖', name: 'Midjourney' },
  { icon: '✨', name: 'Stable Diffusion' },
  { icon: '💻', name: 'Blender' },
  { icon: '📐', name: 'Sketch' },
  { icon: '🎭', name: 'Cinema 4D' },
  { icon: '🔧', name: 'ComfyUI' },
  { icon: '📱', name: 'Principle' },
  { icon: '🎯', name: 'Framer' },
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <span className="section-label reveal">Tools & Skills</span>
        <h2 className="section-title reveal reveal-delay-1">
          设计<em>工具箱</em>
        </h2>

        <div className="skills-grid">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className={`skill-badge hover-target reveal reveal-delay-${Math.min(i + 1, 5)}`}
            >
              <div className="skill-icon">{tool.icon}</div>
              <div className="skill-name">{tool.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
