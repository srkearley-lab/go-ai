import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MessageCircle, Check, ChevronDown,
  ClipboardList, Zap, Send,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import ProposalRequestForm from '../components/ProposalRequestForm'

const WHATSAPP = '#'

// ── What happens next ─────────────────────────────────────────────────────────

const nextSteps = [
  {
    icon: ClipboardList,
    title: 'We review your details',
    body: 'We look at your business type, location, current website and goals — usually within a few hours of receiving your form.',
  },
  {
    icon: Zap,
    title: 'We build your free plan',
    body: 'A personalised document outlining exactly what we\'d build for your business, which services we\'d recommend, and what it would cost.',
  },
  {
    icon: Send,
    title: 'You receive it on WhatsApp',
    body: 'Your plan arrives as a PDF via WhatsApp within 24 hours. No sales call required. No commitment to proceed.',
  },
]

// ── FAQ data ──────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'How long does it take to build my website?',
    a: 'Most websites go live within 7 days of you confirming the brief. Simpler sites — 3 pages, no booking integration — can be live in 4 days. Complex builds with automation and multiple languages take up to 10 days.',
  },
  {
    q: 'Do I need to provide photos or write any content?',
    a: 'No. We handle all content writing using AI, tailored to your specific business and industry. For photos we use high-quality licensed stock images that match your brand. If you have existing photos you\'re happy with, we\'ll use those instead. Professional photography is available as an add-on.',
  },
  {
    q: 'What if I want changes after the website goes live?',
    a: 'Growth and Premium plan clients get unlimited updates via WhatsApp — just message us and it\'s done, usually the same day. Starter plan clients receive one revision round at launch; further changes are available at an hourly rate.',
  },
  {
    q: 'Do I need any technical knowledge to manage things?',
    a: 'None at all. You manage every aspect of your digital presence — website updates, campaign reports, automation changes — through a single WhatsApp message to our team. No dashboards to log into, no software to learn.',
  },
  {
    q: 'Is there a minimum contract length?',
    a: 'Monthly plans (Growth and Premium) have no minimum contract. You can cancel any time with 30 days\' notice and keep everything we\'ve built. The Starter plan is a one-time payment with no ongoing obligation.',
  },
  {
    q: 'Can you improve my existing website instead of building a new one?',
    a: 'Yes — if your current site has good bones, we can rebuild or redesign it rather than start from scratch. We\'ll assess it as part of your free plan and give you an honest recommendation either way.',
  },
  {
    q: 'Do you only work with businesses in Greece?',
    a: 'Our primary focus is businesses operating in Greece — particularly those serving tourists or local Greek customers. If you\'re based elsewhere but have strong operations in Greece, get in touch and we\'ll see if we\'re a good fit.',
  },
]

// ── FAQ item ──────────────────────────────────────────────────────────────────

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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const reduceMotion = useReducedMotion()

  const handleSubmit = (form) => {
    // In production: POST to your backend / CRM / n8n webhook
    console.log('Proposal request:', form)
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Free proposal"
        title="Request your free digital improvement plan"
        description="Tell us about your business and we'll send a personalised plan showing exactly what we'd build — and what it would cost. No commitment, no sales call."
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
                Tell us about your business
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Fill in the form below and we'll have your free plan ready within 24 hours.
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
                What happens next
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {nextSteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                    {/* Spine */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)', flexShrink: 0 }}>
                        <step.icon size={16} />
                      </div>
                      {i < nextSteps.length - 1 && (
                        <div style={{ width: 1, height: 24, background: 'var(--border-default)', margin: '4px 0' }} />
                      )}
                    </div>
                    {/* Text */}
                    <div style={{ paddingBottom: i < nextSteps.length - 1 ? 'var(--space-5)' : 0 }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-1)', lineHeight: 1.3 }}>
                        {step.title}
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
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
              {[
                'Free plan — no payment required',
                'Response within 24 hours',
                'Plan delivered via WhatsApp',
                'No sales call, no obligation',
                'Custom to your specific business',
              ].map((item) => (
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
                Prefer to message directly?
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
                    Fastest response — usually under 1 hour
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
              Common questions
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '32ch' }}>
              Still unsure? Message us on WhatsApp and we'll answer in plain language, no jargon.
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
              Ask us anything
            </a>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* First item has top border too */}
            <div style={{ borderTop: '1px solid var(--border-default)' }}>
              {faqs.map((faq) => (
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
