import { useEffect, useRef, useState } from 'react'

/**
 * CountUp — 滚动进入视口时从 0 涨到目标值的数字滚动动效
 *
 * props:
 *   value         目标数字（整数）
 *   suffix        后缀（如 "+"）
 *   duration      动画时长(ms)，默认 1600
 *   className     数字本体样式（父级传入 font-din 等）
 *   suffixClassName 后缀样式
 *   threshold     进入视口触发阈值，默认 0.3
 */
export default function CountUp({
  value,
  suffix = '',
  duration = 1600,
  className = '',
  suffixClassName = '',
  threshold = 0.3,
}) {
  const ref = useRef(null)
  const started = useRef(false)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (started.current) return
      started.current = true
      if (reduce) { setDisplay(value); return }

      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
        setDisplay(Math.round(eased * value))
        if (t < 1) requestAnimationFrame(tick)
        else setDisplay(value)
      }
      requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            io.disconnect()
          }
        })
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration, threshold])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  )
}
