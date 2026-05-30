import { motion, useReducedMotion } from 'framer-motion'

export default function PageHero({ tag, title, description }) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="dot-grid"
      style={{
        padding: 'var(--space-20) var(--space-8) var(--space-16)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      {/* Radial depth fade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 100% at 50% 100%, rgba(8,12,24,0) 0%, var(--surface-base) 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--width-xl)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        {tag && (
          <p style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-400)',
          }}>
            {tag}
          </p>
        )}
        <h1 style={{
          fontSize: 'clamp(var(--text-xl), 4vw, var(--text-2xl))',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          maxWidth: '20ch',
        }}>
          {title}
        </h1>
        {description && (
          <p style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '56ch',
          }}>
            {description}
          </p>
        )}
      </motion.div>
    </section>
  )
}
