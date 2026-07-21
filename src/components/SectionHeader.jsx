export default function SectionHeader({ label, title, desc }) {
  return (
    <div className="reveal max-w-2xl">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  )
}
