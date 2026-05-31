import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, ArrowRight, MessageCircle, Calendar } from 'lucide-react'
import { useSEO } from '../lib/seo'

const WHATSAPP = '#'
const CALENDLY  = import.meta.env.VITE_CALENDLY_URL || '#'

export default function ThankYou() {
  const reduceMotion = useReducedMotion()
  useSEO({ title: 'Thank You', description: 'Thanks for getting in touch with GO AI. We will be in contact shortly.' })

  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-base)' }}>
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 560,
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-8)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-8)',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 72, height: 72,
            borderRadius: 'var(--radius-full)',
            background: 'rgba(22,163,74,0.12)',
            border: '1px solid rgba(22,163,74,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-success)',
          }}
        >
          <CheckCircle size={32} />
        </div>

        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            You're all set
          </h1>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '42ch', margin: '0 auto' }}>
            We've received your message and will be in touch within 24 hours. In the meantime, feel free to book a consultation or message us on WhatsApp.
          </p>
        </div>

        {/* Next steps */}
        <div
          style={{
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            What happens next
          </p>
          {[
            'We review your submission — usually within a few hours',
            'We prepare a tailored plan and pricing for your business',
            'You receive it via WhatsApp or email within 24 hours',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 1 }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            style={{
              height: 44, padding: '0 var(--space-6)',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 500,
              background: 'var(--color-brand-500)',
              color: 'var(--color-neutral-0)',
              border: '1px solid var(--color-brand-600)',
              borderRadius: 'var(--radius-md)',
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
          >
            <Calendar size={15} />
            Book a consultation
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            style={{
              height: 44, padding: '0 var(--space-6)',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 500,
              background: '#25d366', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-md)',
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
          >
            <MessageCircle size={15} />
            WhatsApp us
          </a>
        </div>

        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)',
            transition: 'color 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)' }}
        >
          Back to home <ArrowRight size={14} />
        </Link>
      </motion.div>
    </main>
  )
}
