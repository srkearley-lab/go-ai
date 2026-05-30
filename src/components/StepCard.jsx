import { motion, useReducedMotion } from 'framer-motion'

export default function StepCard({ number, icon: Icon, title, description, isLast }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 'var(--space-4)',
        position: 'relative',
      }}
    >
      {/* Connector line (desktop) */}
      {!isLast && (
        <div
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: 22,
            left: 'calc(50% + 28px)',
            right: 'calc(-50% + 28px)',
            height: 1,
            background: 'var(--border-strong)',
            zIndex: 0,
          }}
        />
      )}

      {/* Icon circle */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: 44, height: 44,
            background: 'var(--surface-overlay)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-full)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-brand-400)',
          }}
        >
          <Icon size={20} />
        </div>
        <span
          style={{
            position: 'absolute',
            top: -6, right: -6,
            width: 18, height: 18,
            background: 'var(--color-brand-500)',
            borderRadius: 'var(--radius-full)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--color-neutral-0)',
            lineHeight: 1,
          }}
        >
          {number}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {title}
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '26ch', margin: '0 auto' }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}
