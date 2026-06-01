import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Package, Layers, PlusCircle, FileText, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: 1,
    icon: Globe,
    title: 'Choose your website',
    description: 'Start with the type of website your business needs, from a simple online presence to a more advanced, conversion-focused website.',
    cta: 'View Websites',
    href: '/websites',
  },
  {
    number: 2,
    icon: Package,
    title: 'Choose your package',
    description: 'Select the package that best matches how much support, setup and digital build work you need.',
    cta: 'View Packages',
    href: '/packages',
  },
  {
    number: 3,
    icon: Layers,
    title: 'Choose your monthly bundle',
    description: 'Add ongoing support, improvements, hosting, maintenance or optimisation through a monthly bundle.',
    cta: 'View Bundles',
    href: '/bundles',
  },
  {
    number: 4,
    icon: PlusCircle,
    title: 'Add optional extras',
    description: 'Choose add-ons such as AI workflows, extra storage, analytics setup, content support, tracking, automation or additional digital services.',
    cta: 'View Add-ons',
    href: '/addons',
  },
  {
    number: 5,
    icon: FileText,
    title: 'Get a tailored quote',
    description: 'Once you know what you need, submit a quote request and GoAI can recommend the right setup.',
    cta: 'Get a Quote',
    href: '/quote',
  },
]

const differenceItems = [
  {
    icon: Globe,
    term: 'Websites',
    subtitle: 'One-off website builds',
    description: 'Choose this when you need a new website, landing page, or online presence built from scratch.',
  },
  {
    icon: Package,
    term: 'Packages',
    subtitle: 'Structured service options',
    description: 'Choose this when you want a clear level of setup, support, design, automation or digital delivery included in one option.',
  },
  {
    icon: Layers,
    term: 'Bundles',
    subtitle: 'Monthly support plans',
    description: 'Choose this when you want ongoing help, improvements, hosting, maintenance, updates or optimisation each month.',
  },
  {
    icon: PlusCircle,
    term: 'Add-ons',
    subtitle: 'Optional extras',
    description: 'Choose these when you want to add specific features or services on top of a website, package or bundle.',
  },
  {
    icon: FileText,
    term: 'Start Your Journey',
    subtitle: 'The guided route',
    description: 'Use this if you are not sure what to choose and want to be taken step by step through the full setup.',
  },
]

const glossary = [
  { term: 'Websites',            definition: 'One-off website builds' },
  { term: 'Packages',            definition: 'Main fixed-price service options' },
  { term: 'Bundles',             definition: 'Monthly support and ongoing services' },
  { term: 'Add-ons',             definition: 'Optional extras to bolt onto your setup' },
  { term: 'Start Your Journey',  definition: 'Guided path to help you choose' },
  { term: 'Get a Quote',         definition: 'Submit an enquiry for a tailored recommendation' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Journey() {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: reduceMotion ? 0 : 0.05 } },
  }
  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Start Your Journey"
        title="Start Your GoAI Journey"
        description="Not sure where to begin? Follow a simple step-by-step journey to choose the right website, package, monthly support bundle and optional add-ons for your business."
      />

      <section style={{ padding: 'var(--space-12) var(--space-8) var(--space-20)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>

          {/* ── What's the difference? ── */}
          <div>
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--goai-violet)', marginBottom: 'var(--space-5)',
            }}>
              What's the difference?
            </p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
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
                    variants={cardVariants}
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
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* ── Language clarity glossary (Part 6) ── */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--goai-violet)',
              borderLeft: '3px solid var(--goai-violet)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
            }}
          >
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--goai-violet)', marginBottom: 'var(--space-4)',
            }}>
              Quick reference — what each section means
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {glossary.map(({ term, definition }) => (
                <div key={term} style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    color: 'var(--text-primary)', flexShrink: 0, minWidth: '15ch',
                  }}>
                    {term}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {definition}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Step cards ── */}
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
                  variants={cardVariants}
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
