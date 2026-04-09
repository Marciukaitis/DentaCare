import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/** Número que sube al entrar en vista (efecto “métrica” motivadora). */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const isInView = useInView(ref, { once: true, margin: '-48px' })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}
      {display.toLocaleString('es-ES')}
      {suffix}
    </span>
  )
}
