import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Calendar, Package, ClipboardList, Hammer,
  Eye, Rocket, PlusCircle, HeadphonesIcon,
  ArrowRight, Check,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSEO } from '../lib/seo'

const steps = [
  {
    number: 1,
    icon: Package,
    title: 'Choose your package',
    description: 'Browse our packages and pick the one that fits your goals and budget. Not sure where to start? Our pricing page breaks everything down clearly.',
    detail: 'Start with a website only, or jump straight into a growth bundle. You can always add more later.',
  },
  {
    number: 2,
    icon: ClipboardList,
    title: 'Send us your details',
    description: 'Complete a short onboarding form covering your business, branding preferences, target audience, pages needed and any existing content.',
    detail: 'Takes around 10–15 minutes. No technical knowledge needed — just tell us about your business.',
  },
  {
    number: 3,
    icon: Hammer,
    title: 'We build or set up the work',
    description: 'We design, build and configure everything based on your brief — website, content, SEO setup, automations and integrations, all in one go.',
    detail: 'Most websites are ready within 5–7 working days. Automation setups can go live even faster.',
  },
  {
    number: 4,
    icon: Eye,
    title: 'Review and approve',
    description: 'We share a preview link so you can review the work before anything goes live. Request changes and we update until you\'re completely satisfied.',
    detail: 'No limits on revision rounds. We don\'t launch until you\'re happy.',
  },
  {
    number: 5,
    icon: Rocket,
    title: 'Launch or activate',
    description: 'We publish your website, connect your domain, activate your automations and confirm everything is working correctly.',
    detail: 'We handle all technical setup — hosting, SSL, domain connection and final quality checks.',
  },
]

function StepItem({ step, index, total, reduceMotion }) {
  const isEven = index % 2 !== 0

  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, x: isEven ? 12 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}
      className="step-item"
    >
      {/* Number + connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: 48, height: 48,
            borderRadius: 'var(--radius-full)',
            background: step.number === 1 || step.number === 6 ? 'var(--color-brand-500)' : 'var(--surface-overlay)',
            border: step.number === 1 || step.number === 6 ? '1px solid var(--color-brand-600)' : '1px solid var(--border-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: step.number === 1 || step.number === 6 ? 'var(--color-neutral-0)' : 'var(--color-brand-400)',
            position: 'relative', zIndex: 1,
            flexShrink: 0,
          }}
        >
          <step.icon size={20} />
          <span
            style={{
              position: 'absolute', top: -4, right: -4,
              width: 18, height: 18, borderRadius: '50%',
              background: 'var(--color-brand-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: '#fff', lineHeight: 1,
            }}
          >
            {step.number}
          </span>
        </div>
        {index < total - 1 && (
          <div style={{ width: 1, flex: 1, minHeight: 40, background: 'var(--border-default)', marginTop: 'var(--space-2)' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: index < total - 1 ? 'var(--space-10)' : 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {step.title}
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {step.description}
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          {step.detail}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const reduceMotion = useReducedMotion()
  useSEO({
    title: 'How It Works',
    description: 'See the 8 steps from booking a consultation to launching your website and managing growth with GO AI.',
  })

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="How it works"
        title="From package choice to launch — 5 simple steps"
        description="No long briefs, no complicated processes, no waiting weeks. We handle the technical side completely — you just review and approve."
      />

      {/* Steps */}
      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {steps.map((step, i) => (
            <StepItem key={step.number} step={step} index={i} total={steps.length} reduceMotion={reduceMotion} />
          ))}
        </div>
      </section>

      {/* Quick summary */}
      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto' }}>
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gap: 'var(--space-6)' }}
            className="grid grid-cols-1 sm:grid-cols-3"
          >
            {[
              { stat: '5–7 days', label: 'Average website build time' },
              { stat: '24 hrs',   label: 'Response time for updates and reports' },
              { stat: '1 message', label: 'All you need to request any change' },
            ].map(({ stat, label }) => (
              <div key={stat} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>{stat}</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', background: 'var(--surface-base)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}
        >
          <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '42ch' }}>
            Start by choosing your package. Everything else follows from there — no calls required to get going.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/pricing"
              style={{
                height: 44, padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
                border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease, transform 60ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
            >
              Choose Your Package
            </Link>
            <Link
              to="/book"
              style={{
                height: 44, padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: 'transparent', color: 'var(--text-primary)',
                border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Schedule a Call <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
