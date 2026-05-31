import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import { useSEO } from '../lib/seo'

const WHATSAPP = '#'

export default function ThankYou() {
  const reduceMotion = useReducedMotion()
  useSEO({ title: 'Thank You — GO AI', description: 'Thanks for getting in touch with GO AI. We will be in contact shortly.' })

  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 560,
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-8)',
        }}
      >
        {/* Icon */}
        <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-full)', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
          <CheckCircle size={32} />
        </div>

        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            Message received
          </h1>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '44ch', margin: '0 auto' }}>
            Thank you — we've received your message. The GO AI team will review your details and come back to you within 24 hours.
          </p>
        </div>

        {/* Next steps */}
        <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            What happens next
          </p>
          {[
            'We review your submission — usually within a few hours',
            'We prepare a tailored recommendation for your business',
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
          <Link
            to="/"
            style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
          >
            Return to Homepage
          </Link>
          <Link
            to="/packages"
            style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            View Packages <ArrowRight size={14} />
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            style={{ height: 44, padding: '0 var(--space-5)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: '#25d366', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
          >
            <MessageCircle size={15} />
            WhatsApp us
          </a>
        </div>
      </motion.div>
    </main>
  )
}
