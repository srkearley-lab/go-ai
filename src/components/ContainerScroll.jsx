import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'

export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef })

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scaleRange = isMobile ? [0.7, 0.9] : [1.05, 1]

  // No-op transforms when user prefers reduced motion
  const rotate    = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0]  : [20, 0])
  const scale     = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1]  : scaleRange)
  const translate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0]  : [0, -100])

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? '60rem' : '80rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: isMobile ? 'var(--space-2)' : 'var(--space-20)',
      }}
    >
      <div
        style={{
          paddingTop: isMobile ? 'var(--space-10)' : 'var(--space-20)',
          paddingBottom: isMobile ? 'var(--space-10)' : 'var(--space-20)',
          width: '100%',
          position: 'relative',
          perspective: '1000px',
        }}
      >
        {/* Title */}
        <motion.div
          style={{ translateY: translate, textAlign: 'center' }}
          className="max-w-5xl mx-auto"
        >
          {titleComponent}
        </motion.div>

        {/* Perspective card */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow: 'var(--shadow-xl)',
            maxWidth: '64rem',
            marginTop: '-3rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: isMobile ? '30rem' : '40rem',
            width: '100%',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            padding: isMobile ? 'var(--space-2)' : 'var(--space-6)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
            }}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
