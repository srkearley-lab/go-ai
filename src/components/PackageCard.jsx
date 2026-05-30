import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PackageCard({ name, price, period, description, features, popular }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={reduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
      style={{
        position: 'relative',
        background: 'var(--surface-raised)',
        border: popular ? '1px solid var(--color-brand-500)' : '1px solid var(--border-default)',
        borderLeft: popular ? '3px solid var(--color-brand-500)' : undefined,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        boxShadow: popular ? 'var(--shadow-lg)' : 'none',
        transition: 'box-shadow 150ms ease',
      }}
    >
      {popular && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-5)',
            right: 'var(--space-5)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-400)',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 'var(--radius-full)',
            padding: '3px var(--space-3)',
          }}
        >
          Most popular
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
          {name}
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          €{price}
        </span>
        {period && (
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
            /{period}
          </span>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <span
              style={{
                width: 18, height: 18, flexShrink: 0, marginTop: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: popular ? 'rgba(99,102,241,0.12)' : 'var(--surface-subtle)',
                border: popular ? '1px solid rgba(99,102,241,0.25)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-full)',
                color: popular ? 'var(--color-brand-400)' : 'var(--text-tertiary)',
              }}
            >
              <Check size={10} strokeWidth={2.5} />
            </span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 40,
          fontSize: 'var(--text-sm)', fontWeight: 500,
          borderRadius: 'var(--radius-md)',
          border: popular ? '1px solid var(--color-brand-600)' : '1px solid var(--border-strong)',
          background: popular ? 'var(--color-brand-500)' : 'transparent',
          color: popular ? 'var(--color-neutral-0)' : 'var(--text-primary)',
          transition: 'background 120ms ease, transform 60ms ease',
          marginTop: 'auto',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = popular ? 'var(--color-brand-600)' : 'var(--surface-subtle)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = popular ? 'var(--color-brand-500)' : 'transparent'
        }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
      >
        Get started
      </Link>
    </motion.div>
  )
}
