import { useEffect, useRef } from 'react'

class Particle {
  x = 0
  y = 0
  size = 1
  speedX = 0
  speedY = 0
  opacity = 0.3
  twinkle = 0

  constructor(w: number, h: number) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 3 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.2
    this.speedY = -Math.random() * 0.4 - 0.1
    this.opacity = Math.random() * 0.6 + 0.1
    this.twinkle = Math.random() * Math.PI * 2
  }

  update(w: number, h: number) {
    this.x += this.speedX
    this.y += this.speedY
    this.twinkle += 0.015
    if (this.y < -10) {
      this.y = h + 10
      this.x = Math.random() * w
    }
    if (this.x < -10) this.x = w + 10
    if (this.x > w + 10) this.x = -10
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = this.opacity + Math.sin(this.twinkle) * 0.15
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 193, 92, ${Math.max(0, alpha)})`
    ctx.fill()
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 70; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(255, 193, 92, ${0.04 * (1 - dist / 130)})`
            ctx!.lineWidth = 0.5
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      particles.forEach((p) => {
        p.update(canvas!.width, canvas!.height)
        p.draw(ctx!)
      })
      connect()
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles-bg" />
}
