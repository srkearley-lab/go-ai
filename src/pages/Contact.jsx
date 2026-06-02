import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MessageCircle, Check, ChevronDown,
  ClipboardList, Zap, Send,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import ProposalRequestForm from '../components/ProposalRequestForm'
import { useTranslations } from '../context/LanguageContext'

const WHATSAPP = '#'

const STEP_ICONS = [ClipboardList, Zap, Send]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <div style={{ borderBottom: '1px solid var(--border-default)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          padding: 'var(--space-5) 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
          style={{ flexShrink: 0, color: 'var(--text-tertiary)', display: 'flex' }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', paddingBottom: 'var(--space-5)' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  const tc = t.contact

  const handleSubmit = (form) => {
    console.log('Proposal request:', form)
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={tc.tag}
        title={tc.title}
        description={tc.description}
      />

      {/* ── Main two-column section ── */}
      <section style={{ padding: 'var(--space-16) var(--space-8) var(--space-20)', background: 'var(--surface-base)' }}>
        <div
          style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'grid', gap: 'var(--space-12)', alignItems: 'start' }}
          className="contact-grid"
        >
          {/* ── Left: Form ── */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
            }}
          >
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 'var(--space-2)' }}>
                {tc.formTitle}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {tc.formSubtitle}
              </p>
            </div>
            <ProposalRequestForm onSubmit={handleSubmit} />
          </motion.div>

          {/* ── Right: Sidebar ── */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
          >
            {/* What happens next */}
            <div
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
              }}
            >
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', marginBottom: 'var(--space-5)' }}>
                {tc.whatHappensNext}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {tc.nextSteps.map((step, i) => {
                  const Icon = STEP_ICONS[i]
                  return (
                    <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)', flexShrink: 0 }}>
                          <Icon size={16} />
                        </div>
                        {i < tc.nextSteps.length - 1 && (
                          <div style={{ width: 1, height: 24, background: 'var(--border-default)', margin: '4px 0' }} />
                        )}
                      </div>
                      <div style={{ paddingBottom: i < tc.nextSteps.length - 1 ? 'var(--space-5)' : 0 }}>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-1)', lineHeight: 1.3 }}>
                          {step.title}
                        </p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          {step.body}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Trust signals */}
            <div
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              {tc.trustSignals.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0 }}>
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Alternative contact */}
            <div
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                {tc.preferDirect}
              </p>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'rgba(37,211,102,0.08)',
                  border: '1px solid rgba(37,211,102,0.2)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background 120ms ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.14)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.08)' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={18} color="#fff" />
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                    WhatsApp
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                    {tc.whatsappSpeed}
                  </p>
                </div>
              </a>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-8)',
          background: 'var(--surface-subtle)',
          borderTop: '1px solid var(--border-default)',
        }}
      >
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'grid', gap: 'var(--space-16)', alignItems: 'start' }} className="faq-grid">

          {/* Left: heading */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          >
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>
              FAQ
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {tc.faqHeading}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '32ch' }}>
              {tc.faqSubtitle}
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                height: 36, padding: '0 var(--space-4)', width: 'fit-content',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: '#25d366', color: '#fff',
                border: 'none', borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
            >
              <MessageCircle size={15} />
              {tc.askUsAnything}
            </a>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ borderTop: '1px solid var(--border-default)' }}>
              {tc.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 380px; }
        .faq-grid     { grid-template-columns: 280px 1fr; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .faq-grid     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
