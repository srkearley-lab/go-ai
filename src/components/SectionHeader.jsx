import { motion, useReducedMotion } from 'framer-motion'

export default function SectionHeader({ tag, title, description, align = 'center' }) {
  const reduceMotion = useReducedMotion()

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      style={{ textAlign: align, display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: 'var(--space-3)' }}
    >
      {tag && (
        <motion.p
          variants={fade}
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-400)',
          }}
        >
          {tag}
        </motion.p>
      )}
      <motion.h2
        variants={fade}
        style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          maxWidth: align === 'center' ? '18ch' : 'none',
        }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fade}
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: align === 'center' ? '52ch' : '60ch',
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
