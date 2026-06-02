import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, Clock, MessageCircle, Check, ExternalLink } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSEO } from '../lib/seo'
import { useTranslations } from '../context/LanguageContext'

const WHATSAPP  = '#'
const CALENDLY  = import.meta.env.VITE_CALENDLY_URL || ''

export default function Book() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  const tb = t.book || {}
  const callIncludes = tb.callIncludes || []
  useSEO({
    title: 'Book a Free Consultation',
    description: 'Book a free 30-minute consultation with GO AI. We\'ll review your business, recommend the right package and send you a written plan within 24 hours.',
  })

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={tb.tag}
        title={tb.title}
        description={tb.description}
      />

      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)' }}>
        <div
          style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'grid', gap: 'var(--space-12)', alignItems: 'start' }}
          className="book-grid"
        >
          {/* Calendar embed */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {CALENDLY ? (
              <div
                style={{
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  minHeight: 660,
                }}
              >
                <iframe
                  src={CALENDLY}
                  width="100%"
                  height="660"
                  frameBorder="0"
                  title="Book a consultation with GO AI"
                  style={{ display: 'block', border: 'none' }}
                />
              </div>
            ) : (
              /* Placeholder — shown until VITE_CALENDLY_URL is set */
              <div
                style={{
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-12)',
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-6)',
                  textAlign: 'center',
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)' }}>
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                    {tb.calendarComingSoon}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '36ch', margin: '0 auto' }}>
                    Set <code style={{ fontSize: 'var(--text-xs)', background: 'var(--surface-overlay)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', color: 'var(--color-brand-400)' }}>VITE_CALENDLY_URL</code> in your <code style={{ fontSize: 'var(--text-xs)', background: 'var(--surface-overlay)', padding: '2px 6px', borderRadius: 'var(--radius-sm)', color: 'var(--color-brand-400)' }}>.env</code> file to embed your Calendly calendar here.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', maxWidth: 320 }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textAlign: 'left' }}>{tb.bookDirectly}</p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                      fontSize: 'var(--text-sm)', fontWeight: 500,
                      background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
                      border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)',
                      transition: 'background 120ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
                  >
                    <ExternalLink size={14} />
                    {tb.openCalendly}
                  </a>
                  <Link
                    to="/contact"
                    style={{
                      height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'var(--text-sm)', fontWeight: 500,
                      background: 'transparent', color: 'var(--text-primary)',
                      border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)',
                      transition: 'background 120ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                  >
                    {tb.sendMessageInstead}
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
          >
            {/* Call details */}
            <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>
                {t.journey.whatsIncluded}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                <Clock size={14} />
                {tb.durationLabel}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {callIncludes.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0, marginTop: 1 }}>
                      <Check size={9} strokeWidth={3} />
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp alternative */}
            <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                {tb.preferMessage}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {tb.whatsappBody}
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                style={{
                  height: 40, padding: '0 var(--space-4)',
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                  fontSize: 'var(--text-sm)', fontWeight: 500,
                  background: '#25d366', color: '#fff',
                  border: 'none', borderRadius: 'var(--radius-md)',
                  transition: 'background 120ms ease', width: 'fit-content',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
              >
                <MessageCircle size={15} />
                {tb.openWhatsApp}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .book-grid { grid-template-columns: 1fr 360px; }
        @media (max-width: 900px) { .book-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  )
}
