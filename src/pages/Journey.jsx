import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Package, Layers, PlusCircle, FileText, ArrowRight, HelpCircle, Check } from 'lucide-react'
import PageHero from '../components/PageHero'

// ── Data ──────────────────────────────────────────────────────────────────────

const guidedChoices = [
  {
    icon: Globe,
    situation: 'I need a new website',
    explanation: 'You need a professional website built from scratch — a simple online presence, landing page, or full business site.',
    cta: 'Explore Websites',
    href: '/websites',
    highlighted: false,
  },
  {
    icon: Package,
    situation: 'I need a complete setup',
    explanation: 'You want a structured option that combines website design, setup, and key features into one clear, ready-made choice.',
    cta: 'View Packages',
    href: '/packages',
    highlighted: false,
  },
  {
    icon: Layers,
    situation: 'I need ongoing monthly support',
    explanation: 'You have (or will have) a website and want ongoing help — updates, improvements, hosting, maintenance, or digital growth.',
    cta: 'Compare Bundles',
    href: '/bundles',
    highlighted: false,
  },
  {
    icon: PlusCircle,
    situation: 'I want to add optional extras',
    explanation: 'You want to bolt something specific onto your existing setup — extra pages, forms, SEO, analytics, or automation.',
    cta: 'Browse Add-ons',
    href: '/addons',
    highlighted: false,
  },
  {
    icon: HelpCircle,
    situation: "I'm not sure — help me choose",
    explanation: 'Not sure which option fits your business? Submit a quote request and GoAI will recommend the right setup for you.',
    cta: 'Get a Quote Today',
    href: '/quote',
    highlighted: true,
  },
]

const differenceItems = [
  {
    icon: Globe,
    term: 'Websites',
    subtitle: 'One-off website builds',
    description: 'One-off website builds for businesses that need a professional online presence.',
  },
  {
    icon: Package,
    term: 'Packages',
    subtitle: 'Structured service options',
    description: 'Structured service options that combine key website features into clear, ready-made choices.',
  },
  {
    icon: Layers,
    term: 'Bundles',
    subtitle: 'Monthly support plans',
    description: 'Monthly support plans for businesses that want ongoing updates, improvements, hosting support, content changes, and digital growth support.',
  },
  {
    icon: PlusCircle,
    term: 'Add-ons',
    subtitle: 'Optional extras',
    description: 'Optional extras that can be added to a website, package, or bundle, such as storage, hosting support, extra pages, forms, automation, integrations, or additional features.',
  },
  {
    icon: FileText,
    term: 'Get a Quote',
    subtitle: 'Tailored recommendation',
    description: 'Best for customers who are unsure what they need or want a tailored recommendation based on their business.',
  },
]

const steps = [
  {
    number: 1,
    icon: Globe,
    title: 'Choose your website',
    description: 'Start with the type of website your business needs — from a simple online presence to a more advanced, conversion-focused website.',
    highlights: ['Simple online presence', 'Full business website', 'Landing or campaign pages', 'Custom quote available'],
    cta: 'Explore Websites',
    href: '/websites',
  },
  {
    number: 2,
    icon: Package,
    title: 'Choose your package',
    description: 'Select the package that best matches how much support, setup, and digital build work you need.',
    highlights: ['Starter options', 'Growth packages', 'Professional setups', 'Clear fixed pricing'],
    cta: 'View Packages',
    href: '/packages',
  },
  {
    number: 3,
    icon: Layers,
    title: 'Add a monthly bundle',
    description: 'Add ongoing support, improvements, hosting, maintenance, or optimisation through a monthly bundle.',
    highlights: ['Hosting and care included', 'Monthly updates and improvements', 'Content changes', 'Priority support options'],
    cta: 'Compare Bundles',
    href: '/bundles',
  },
  {
    number: 4,
    icon: PlusCircle,
    title: 'Add optional extras',
    description: 'Choose add-ons to bolt specific features or services onto your setup whenever you need them.',
    highlights: ['Extra pages and forms', 'SEO and analytics setup', 'AI and automation workflows', 'Tracking and integrations'],
    cta: 'Browse Add-ons',
    href: '/addons',
  },
  {
    number: 5,
    icon: FileText,
    title: 'Get a tailored quote',
    description: 'Not sure what you need? Submit a quote request and GoAI will recommend the right combination for your business.',
    highlights: ['Free tailored recommendation', 'No obligation', 'Fast response', 'Based on your business'],
    cta: 'Get a Quote',
    href: '/quote',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Journey() {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: reduceMotion ? 0 : 0.04 } },
  }
  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Start Your Journey"
        title="Start Your GoAI Journey"
        description="Not sure where to begin? Choose what fits your situation below and GoAI will guide you to the right option."
      />

      {/* ── Guided choice section ── */}
      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--goai-violet)', marginBottom: 'var(--space-3)',
            }}>
              Start here
            </p>
            <h2 style={{
              fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))',
              fontWeight: 700, letterSpacing: '-0.01em',
              color: 'var(--text-primary)', lineHeight: 1.2,
              marginBottom: 'var(--space-2)',
            }}>
              Choose what fits your situation
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '52ch' }}>
              Select the option that best describes what your business needs right now. Each option includes a short explanation and a direct next step.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {guidedChoices.map((choice) => {
              const Icon = choice.icon
              return (
                <motion.div
                  key={choice.situation}
                  variants={fadeUp}
                  style={{
                    background: choice.highlighted ? 'rgba(118, 39, 239, 0.06)' : 'var(--surface-base)',
                    border: `1px solid ${choice.highlighted ? 'rgba(118, 39, 239, 0.35)' : 'var(--border-default)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
                    transition: 'border-color 150ms ease, box-shadow 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = choice.highlighted ? 'rgba(118, 39, 239, 0.6)' : 'var(--border-strong)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = choice.highlighted ? 'rgba(118, 39, 239, 0.35)' : 'var(--border-default)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{
                      width: 36, height: 36, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      background: choice.highlighted
                        ? 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'
                        : 'rgba(118, 39, 239, 0.1)',
                      border: choice.highlighted ? 'none' : '1px solid rgba(118, 39, 239, 0.2)',
                      color: choice.highlighted ? '#FFFFFF' : 'var(--goai-violet)',
                      boxShadow: choice.highlighted ? '0 0 14px rgba(118, 39, 239, 0.3)' : 'none',
                    }}>
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <p style={{
                      fontSize: 'var(--text-sm)', fontWeight: 700,
                      color: 'var(--text-primary)', lineHeight: 1.25,
                    }}>
                      {choice.situation}
                    </p>
                  </div>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
                    {choice.explanation}
                  </p>

                  <Link
                    to={choice.href}
                    style={{
                      height: 36, padding: '0 var(--space-4)',
                      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                      fontSize: 'var(--text-xs)', fontWeight: 600,
                      background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                      color: '#FFFFFF', border: 'none',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 0 20px rgba(118, 39, 239, 0.3)',
                      width: 'fit-content',
                      transition: 'filter 120ms ease, box-shadow 120ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.45)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118, 39, 239, 0.3)' }}
                  >
                    {choice.cta} <ArrowRight size={12} />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </section>

      {/* ── What's the difference? ── */}
      <section
        id="whats-the-difference"
        style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)', borderBottom: '1px solid var(--border-default)' }}
      >
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--goai-violet)', marginBottom: 'var(--space-3)',
            }}>
              Quick reference
            </p>
            <h2 style={{
              fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))',
              fontWeight: 700, letterSpacing: '-0.01em',
              color: 'var(--text-primary)', lineHeight: 1.2,
            }}>
              What's the difference?
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {differenceItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.term}
                  variants={fadeUp}
                  style={{
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-5)',
                    display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{
                      width: 32, height: 32, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(118, 39, 239, 0.1)',
                      border: '1px solid rgba(118, 39, 239, 0.2)',
                      color: 'var(--goai-violet)',
                    }}>
                      <Icon size={15} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {item.term}
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </section>

      {/* ── Step-by-step ── */}
      <section style={{ padding: 'var(--space-16) var(--space-8) var(--space-20)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--goai-violet)', marginBottom: 'var(--space-3)',
            }}>
              The full journey
            </p>
            <h2 style={{
              fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))',
              fontWeight: 700, letterSpacing: '-0.01em',
              color: 'var(--text-primary)', lineHeight: 1.2,
            }}>
              How the journey works
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          >
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  style={{
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-5)',
                    transition: 'border-color 150ms ease, box-shadow 150ms ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  {/* Number badge */}
                  <div style={{
                    width: 42, height: 42, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                    boxShadow: '0 0 16px rgba(118, 39, 239, 0.35)',
                    fontSize: 'var(--text-md)', fontWeight: 700, color: '#FFFFFF',
                  }}>
                    {step.number}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div>
                      <p style={{
                        fontSize: 'var(--text-xs)', fontWeight: 600,
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)',
                      }}>
                        Step {step.number}
                      </p>
                      <h3 style={{
                        fontSize: 'var(--text-md)', fontWeight: 700,
                        color: 'var(--text-primary)', lineHeight: 1.2, letterSpacing: '-0.01em',
                      }}>
                        {step.title}
                      </h3>
                    </div>

                    <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: '62ch' }}>
                      {step.description}
                    </p>

                    {/* Inline highlights */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {step.highlights.map((h) => (
                        <span
                          key={h}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '3px var(--space-3)',
                            fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
                            background: 'var(--surface-base)',
                            border: '1px solid var(--border-default)',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          <Check size={9} strokeWidth={3} style={{ color: 'var(--goai-violet)', flexShrink: 0 }} />
                          {h}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={step.href}
                      style={{
                        height: 36, padding: '0 var(--space-4)',
                        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                        fontSize: 'var(--text-xs)', fontWeight: 600,
                        background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                        color: '#FFFFFF', border: 'none',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 0 20px rgba(118, 39, 239, 0.3)',
                        width: 'fit-content',
                        transition: 'filter 120ms ease, box-shadow 120ms ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.45)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118, 39, 239, 0.3)' }}
                    >
                      {step.cta} <ArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Icon — desktop only */}
                  <div
                    className="hidden md:flex"
                    style={{
                      width: 40, height: 40, flexShrink: 0,
                      alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-disabled)',
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </section>
    </main>
  )
}
