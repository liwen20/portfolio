import { useEffect, useRef, useCallback } from 'react'

export function useCountUp(end: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const startAnimation = useCallback(() => {
    if (hasAnimated.current || !ref.current) return
    hasAnimated.current = true

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * end)
      if (ref.current) {
        ref.current.textContent = String(current)
      }
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        if (ref.current) ref.current.textContent = String(end)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startAnimation])

  return ref
}
