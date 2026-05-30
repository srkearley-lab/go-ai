import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  MessageCircle, Mail, FileText, Search, Video, PenLine,
  ArrowRight, Check, Zap, Globe, Star, BarChart3,
  ChevronRight,
} from 'lucide-react'
import PageHero from '../components/PageHero'

const WHATSAPP = '#'

// ── WhatsApp chat mockup ──────────────────────────────────────────────────────

const chatMessages = [
  { from: 'user', text: 'Hi, is the villa available 10–17 August?' },
  { from: 'bot',  text: 'Hi! 👋 Yes, Villa Mila is free Aug 10–17 — that\'s 7 nights.\n\nNightly rate: €290. Shall I send the full quote and booking link?', time: '09:42' },
  { from: 'user', text: 'Yes please, for 4 guests.' },
  { from: 'bot',  text: '✅ Perfect. Sending your personalised quote now.\n\nYou\'ll receive a PDF with all details, photos and a secure payment link within 2 minutes.', time: '09:43' },
  { from: 'bot',  text: 'Quote sent 📋  Let me know if you have any questions!', time: '09:44' },
]

function ChatBubble({ msg }) {
  const isUser = msg.from === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '78%',
          background: isUser ? '#dcf8c6' : '#fff',
          borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
          padding: '7px 10px 5px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        }}
      >
        <p style={{ fontSize: 12, lineHeight: 1.5, color: '#111', margin: 0, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
          {msg.text}
        </p>
        {msg.time && (
          <p style={{ fontSize: 10, color: '#999', textAlign: 'right', margin: '2px 0 0', letterSpacing: '0.01em' }}>
            {msg.time} ✓✓
          </p>
        )}
      </div>
    </div>
  )
}

function WhatsAppMockup() {
  return (
    <div
      style={{
        width: 280,
        background: '#e5ddd5',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid rgba(0,0,0,0.12)',
        flexShrink: 0,
      }}
    >
      {/* Status bar */}
      <div style={{ background: '#075e54', padding: '6px 14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[12, 16, 20].map((w, i) => <div key={i} style={{ width: w, height: 6, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />)}
        </div>
      </div>

      {/* Chat header */}
      <div style={{ background: '#075e54', padding: '8px 12px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#128c7e', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>V</span>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.2 }}>Villa Mila</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', margin: 0 }}>🤖 Automated replies on</p>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          padding: '10px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          background: '#e5ddd5',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3C/svg%3E")',
          maxHeight: 280,
          overflowY: 'auto',
        }}
      >
        {chatMessages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
      </div>

      {/* Input bar */}
      <div style={{ background: '#f0f0f0', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ flex: 1, height: 32, background: '#fff', borderRadius: 16, border: '1px solid #ddd' }} />
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#075e54', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Email sequence timeline ───────────────────────────────────────────────────

const emailSteps = [
  { day: 'Day 1',  label: 'Welcome',    subject: 'Welcome to Santorini Dream Villas 🌅', preview: 'Thank you for your enquiry. Here\'s everything included in your stay...' },
  { day: 'Day 3',  label: 'Offer',      subject: 'Your exclusive early-season rates for 2025', preview: 'We\'ve held your preferred dates. Here\'s a limited-time offer to confirm...' },
  { day: 'Day 7',  label: 'Nurture',    subject: 'What past guests are saying about us', preview: 'Don\'t take our word for it — here\'s what 47 recent guests shared...' },
  { day: 'Day 14', label: 'Follow-up',  subject: 'Still planning? Your dates are still available', preview: 'We noticed you haven\'t confirmed yet. Can we answer any questions...' },
  { day: 'Day 21', label: 'Last chance', subject: 'Final reminder — availability filling fast', preview: 'August is almost fully booked. These are the last available dates...' },
]

const emailLabelColors = {
  Welcome: { bg: 'rgba(99,102,241,0.12)', color: 'var(--color-brand-400)', border: 'rgba(99,102,241,0.2)' },
  Offer: { bg: 'rgba(245,158,11,0.12)', color: 'var(--color-accent-500)', border: 'rgba(245,158,11,0.2)' },
  Nurture: { bg: 'rgba(22,163,74,0.12)', color: 'var(--color-success)', border: 'rgba(22,163,74,0.2)' },
  'Follow-up': { bg: 'rgba(148,163,184,0.1)', color: 'var(--text-secondary)', border: 'var(--border-default)' },
  'Last chance': { bg: 'rgba(220,38,38,0.1)', color: 'var(--color-danger)', border: 'rgba(220,38,38,0.2)' },
}

function EmailSequenceViz() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', maxWidth: 420 }}>
      {emailSteps.map((step, i) => {
        const colors = emailLabelColors[step.label]
        return (
          <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
            {/* Timeline spine */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--surface-overlay)',
                  border: '1px solid var(--border-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1,
                }}
              >
                <Mail size={12} style={{ color: 'var(--color-brand-400)' }} />
              </div>
              {i < emailSteps.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 24, background: 'var(--border-strong)', marginTop: 2 }} />
              )}
            </div>

            {/* Email card */}
            <div
              style={{
                flex: 1,
                background: 'var(--surface-overlay)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                marginBottom: i < emailSteps.length - 1 ? 'var(--space-3)' : 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)' }}>{step.day}</span>
                <span
                  style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: colors.color, background: colors.bg, border: `1px solid ${colors.border}`,
                    borderRadius: 'var(--radius-sm)', padding: '1px 5px',
                  }}
                >
                  {step.label}
                </span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, margin: '0 0 3px' }}>
                {step.subject}
              </p>
              <p style={{ fontSize: 10, color: 'var(--text-tertiary)', lineHeight: 1.4, margin: 0 }}>
                {step.preview}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Proposal document mockup ──────────────────────────────────────────────────

function ProposalMockup() {
  return (
    <div
      style={{
        width: 300,
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Header bar */}
      <div style={{ background: '#6366f1', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(255,255,255,0.25)' }} />
            <div style={{ width: 40, height: 6, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>PROPOSAL</span>
        </div>
        <div style={{ width: '70%', height: 9, background: 'rgba(255,255,255,0.9)', borderRadius: 3, marginBottom: 5 }} />
        <div style={{ width: '45%', height: 6, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
      </div>

      {/* Client info row */}
      <div style={{ padding: '10px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ width: 60, height: 5, background: '#e0e0e0', borderRadius: 2, marginBottom: 4 }} />
          <div style={{ width: 90, height: 7, background: '#c0c0c0', borderRadius: 2 }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ width: 40, height: 5, background: '#e0e0e0', borderRadius: 2, marginBottom: 4, marginLeft: 'auto' }} />
          <div style={{ width: 55, height: 7, background: '#c0c0c0', borderRadius: 2, marginLeft: 'auto' }} />
        </div>
      </div>

      {/* Service rows */}
      <div style={{ padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'Day Trip to Delos', price: '€280' },
          { label: 'Sunset Cruise (8 pax)', price: '€440' },
          { label: 'Private Island Tour', price: '€650' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: '#222', margin: 0 }}>{item.label}</p>
              <div style={{ width: 70, height: 4, background: '#e8e8e8', borderRadius: 2, marginTop: 3 }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6366f1' }}>{item.price}</span>
          </div>
        ))}
      </div>

      {/* Total row */}
      <div style={{ padding: '8px 18px 10px', borderTop: '2px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#666' }}>Total</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>€1,370</span>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 18px 14px' }}>
        <div
          style={{
            width: '100%', height: 32,
            background: '#6366f1', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ width: 80, height: 5, background: 'rgba(255,255,255,0.8)', borderRadius: 2 }} />
        </div>
        <p style={{ fontSize: 9, color: '#bbb', textAlign: 'center', margin: '6px 0 0' }}>
          Powered by GO AI · Generated in 48 seconds
        </p>
      </div>
    </div>
  )
}

// ── System flow ───────────────────────────────────────────────────────────────

const flowSteps = [
  { icon: Globe,          label: 'Visitor arrives',     sub: 'via Google, social or referral' },
  { icon: MessageCircle,  label: 'Bot qualifies',        sub: 'instant WhatsApp response' },
  { icon: FileText,       label: 'Proposal sent',        sub: 'AI-generated in seconds' },
  { icon: Mail,           label: 'Sequence starts',      sub: 'automated email nurture' },
  { icon: Check,          label: 'Booking confirmed',    sub: 'payment or direct contact' },
  { icon: Star,           label: 'Review requested',     sub: 'automated post-visit ask' },
]

function SystemFlow() {
  const reduceMotion = useReducedMotion()
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, minWidth: 'max-content', padding: '0 var(--space-4)' }}>
        {flowSteps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.18, delay: reduceMotion ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', width: 120 }}
            >
              <div
                style={{
                  width: 48, height: 48,
                  background: i === 0 ? 'var(--color-brand-500)' : 'var(--surface-overlay)',
                  border: `1px solid ${i === 0 ? 'var(--color-brand-600)' : 'var(--border-strong)'}`,
                  borderRadius: 'var(--radius-full)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i === 0 ? 'var(--color-neutral-0)' : 'var(--color-brand-400)',
                }}
              >
                <step.icon size={20} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, margin: '0 0 2px' }}>
                  {step.label}
                </p>
                <p style={{ fontSize: 10, color: 'var(--text-tertiary)', lineHeight: 1.4, margin: 0 }}>
                  {step.sub}
                </p>
              </div>
            </motion.div>

            {/* Arrow connector */}
            {i < flowSteps.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--border-strong)', margin: '0 var(--space-1)', marginBottom: 'var(--space-8)', flexShrink: 0 }}>
                <ChevronRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Supporting service card ───────────────────────────────────────────────────

function SupportCard({ icon: Icon, title, description, points }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={reduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-default)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          width: 40, height: 40,
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-brand-400)',
        }}
      >
        <Icon size={20} />
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)', lineHeight: 1.2 }}>
          {title}
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {points.map((p) => (
          <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ width: 14, height: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '50%', color: 'var(--color-brand-400)' }}>
              <Check size={8} strokeWidth={3} />
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ── Hero automation sections ──────────────────────────────────────────────────

function AutoSection({ tag, title, description, points, visual, flip = false, bg = 'var(--surface-base)' }) {
  const reduceMotion = useReducedMotion()
  return (
    <section style={{ padding: 'var(--space-20) var(--space-8)', background: bg, borderBottom: '1px solid var(--border-default)' }}>
      <div
        style={{
          maxWidth: 'var(--width-xl)',
          margin: '0 auto',
          display: 'grid',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}
        className={`auto-grid ${flip ? 'auto-grid-flip' : ''}`}
      >
        {/* Text side */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: flip ? 10 : -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', order: flip ? 2 : 1 }}
          className="auto-text"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>
              {tag}
            </span>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {title}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {description}
            </p>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {points.map((p) => (
              <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: 18, height: 18, flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.22)', borderRadius: '50%', color: 'var(--color-brand-400)' }}>
                  <Check size={10} strokeWidth={3} />
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{p}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--color-brand-400)',
              width: 'fit-content',
              transition: 'color 120ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-200)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-400)' }}
          >
            Add this to my plan <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Visual side */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: flip ? -10 : 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.07, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center', order: flip ? 1 : 2 }}
          className="auto-visual"
        >
          {visual}
        </motion.div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Automation() {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: 0.05 } },
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="AI Automation"
        title="Your business, running on autopilot"
        description="We build the automations that handle your enquiries, follow-ups, proposals and content — so your business grows even when you're not at your desk."
      />

      {/* ── WhatsApp ── */}
      <AutoSection
        tag="WhatsApp Automation"
        title="Reply to every enquiry instantly — without lifting a finger"
        description="Most businesses in Greece lose bookings because they can't respond to WhatsApp messages fast enough during peak season. Our bots reply within seconds, qualify the lead, and route serious enquiries directly to you."
        points={[
          'Instant automated reply to any incoming WhatsApp message',
          'Answers FAQs about pricing, availability and location',
          'Collects customer name, dates and party size automatically',
          'Sends booking links and proposal PDFs on request',
          'Forwards hot leads to your phone with full context',
          'Supports Greek and English conversations',
          'No-code dashboard to update replies any time',
        ]}
        visual={<WhatsAppMockup />}
        bg="var(--surface-subtle)"
      />

      {/* ── Email ── */}
      <AutoSection
        tag="Email Automation"
        title="Turn cold enquiries into paying customers — automatically"
        description="Most leads go cold because no one followed up. Our email sequences keep your business in front of potential customers from day one — with the right message at exactly the right time."
        points={[
          'Welcome sequence starts the moment someone enquires',
          'Timed follow-ups across 3 weeks with no manual effort',
          'Seasonal offer campaigns sent to your full list',
          'Post-visit review request sent automatically',
          'Abandoned enquiry re-engagement after 7 days silence',
          'Monthly newsletter template ready to personalise',
          'Built on Mailchimp or Brevo — your data, your list',
        ]}
        visual={<EmailSequenceViz />}
        flip
        bg="var(--surface-base)"
      />

      {/* ── AI Proposals ── */}
      <AutoSection
        tag="AI Proposals"
        title="Send polished proposals in seconds, not hours"
        description="Writing a custom proposal for every group enquiry takes time you don't have. Our AI generates a professional, branded proposal — personalised for each client — and sends it automatically via WhatsApp or email."
        points={[
          'Proposal generated from a WhatsApp conversation or form',
          'Personalised with client name, dates and requirements',
          'Professionally designed with your logo and brand colours',
          'Includes service breakdown, pricing table and terms',
          'Sent instantly via WhatsApp PDF or email link',
          'Digital acceptance tracked — you get notified immediately',
          'Follow-up reminder sent automatically if no response in 48h',
        ]}
        visual={<ProposalMockup />}
        bg="var(--surface-subtle)"
      />

      {/* ── Supporting services grid ── */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', background: 'var(--surface-base)', borderTop: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', marginBottom: 'var(--space-3)' }}>
              Also included
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', maxWidth: '28ch' }}>
              Content and visibility — handled too
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <SupportCard
              icon={Search}
              title="Local SEO"
              description="We optimise your site and Google Business profile so you rank for local searches — and stay there."
              points={['Google Business optimisation', 'Monthly keyword reporting', 'Schema markup and technical SEO', 'Competitor gap tracking']}
            />
            <SupportCard
              icon={Video}
              title="Video Ads"
              description="Two scripted, edited short-form videos per month — posted to Instagram and TikTok for you."
              points={['Script written by our team', 'English and Greek subtitles', 'Branded intro and outro', 'Optimised for Reels and TikTok']}
            />
            <SupportCard
              icon={PenLine}
              title="AI Blog Writing"
              description="Four SEO-optimised blog posts per month, published directly to your website to build ranking and trust."
              points={['Targeted to local search queries', 'Published to your site directly', 'Meta descriptions included', 'Topic calendar planned ahead']}
            />
            <SupportCard
              icon={BarChart3}
              title="Analytics & Reporting"
              description="A plain-language monthly report showing what's working, what isn't, and what to do next."
              points={['Google Analytics 4 setup', 'Monthly PDF report', 'Enquiry source tracking', 'Action recommendations']}
            />
          </motion.div>
        </div>
      </section>

      {/* ── System flow ── */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>
              <Zap size={12} /> The connected system
            </span>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', maxWidth: '28ch' }}>
              Every automation connects to the next
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '52ch' }}>
              From the moment a visitor finds you online to the review they leave after their stay — every step is automated, tracked and working for you.
            </p>
          </motion.div>

          <SystemFlow />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', background: 'var(--surface-base)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-500)' }}>
              Ready to automate?
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Tell us what you want to automate first
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              Most businesses start with WhatsApp automation or email sequences. Tell us about your business and we'll recommend where to start for maximum impact.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Get my automation plan
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: '#25d366', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <MessageCircle size={16} />
              Ask on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      <style>{`
        .auto-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .auto-grid { grid-template-columns: 1fr !important; }
          .auto-text { order: 1 !important; }
          .auto-visual { order: 2 !important; }
        }
      `}</style>
    </main>
  )
}
