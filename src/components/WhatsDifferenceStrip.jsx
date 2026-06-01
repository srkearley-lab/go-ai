import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Package, Layers, PlusCircle, FileText } from 'lucide-react'

const CARDS = [
  {
    id: 'websites',
    icon: Globe,
    term: 'Websites',
    subtitle: 'One-off website builds',
    description: 'For businesses that need a professional online presence.',
    href: '/websites',
  },
  {
    id: 'packages',
    icon: Package,
    term: 'Packages',
    subtitle: 'Structured service options',
    description: 'Fixed-price services with a clear scope.',
    href: '/packages',
  },
  {
    id: 'bundles',
    icon: Layers,
    term: 'Bundles',
    subtitle: 'Monthly support plans',
    description: 'Ongoing support, improvements, hosting, and growth services.',
    href: '/bundles',
  },
  {
    id: 'addons',
    icon: PlusCircle,
    term: 'Add-ons',
    subtitle: 'Optional extras',
    description: 'Extra features such as forms, automations, integrations, storage, or support.',
    href: '/addons',
  },
  {
    id: 'quote',
    icon: FileText,
    term: 'Get a Quote',
    subtitle: 'Tailored recommendation',
    description: 'Best for customers who are unsure what they need or want a custom recommendation.',
    href: '/request-quote',
  },
]

const MotionLink = motion(Link)

export default function WhatsDifferenceStrip({ activePage = null, insideJourney = false }) {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: reduceMotion ? 0 : 0.02 } },
  }
  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="wds-strip">
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontSize: 'var(--text-xs)', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--goai-violet)', marginBottom: 'var(--space-2)',
          }}>
            Quick reference
          </p>
          <h2 style={{
            fontSize: 'clamp(var(--text-sm), 1.8vw, var(--text-md))',
            fontWeight: 700, letterSpacing: '-0.01em',
            color: 'var(--text-primary)', lineHeight: 1.2,
          }}>
            What's the difference?
          </h2>
        </motion.div>

        <motion.div
          className="wds-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {CARDS.map((card) => {
            const Icon = card.icon
            const isActive = activePage === card.id

            const sharedStyle = {
              position: 'relative',
              background: 'var(--surface-raised)',
              border: isActive ? '1px solid var(--goai-violet)' : '1px solid var(--border-default)',
              boxShadow: isActive ? '0 0 12px rgba(118,39,239,0.2)' : 'none',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              textDecoration: 'none',
              color: 'inherit',
            }

            const cardInner = (
              <>
                {isActive && (
                  <span style={{
                    position: 'absolute', top: 'var(--space-2)', right: 'var(--space-2)',
                    fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    background: 'rgba(118,39,239,0.12)',
                    border: '1px solid rgba(118,39,239,0.25)',
                    color: 'var(--goai-violet)',
                    borderRadius: 'var(--radius-full)',
                    padding: '2px var(--space-2)',
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                  }}>
                    You are here
                  </span>
                )}
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
                      {card.term}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {card.description}
                </p>
              </>
            )

            if (insideJourney) {
              return (
                <motion.div key={card.id} variants={fadeUp} style={sharedStyle}>
                  {cardInner}
                </motion.div>
              )
            }

            return (
              <MotionLink
                key={card.id}
                to={card.href}
                variants={fadeUp}
                style={sharedStyle}
                className={isActive ? undefined : 'wds-card-hover'}
              >
                {cardInner}
              </MotionLink>
            )
          })}
        </motion.div>

      </div>

      <style>{`
        .wds-strip {
          padding: var(--space-10) var(--space-8);
          background: var(--surface-base);
          border-bottom: 1px solid var(--border-default);
        }
        .wds-card-hover {
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .wds-card-hover:hover {
          border-color: var(--border-strong) !important;
          box-shadow: var(--shadow-sm) !important;
        }
        .wds-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-4);
        }
        @media (max-width: 900px) {
          .wds-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 560px) {
          .wds-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: var(--space-3);
            padding-bottom: var(--space-2);
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .wds-grid::-webkit-scrollbar { display: none; }
          .wds-grid > * {
            flex-shrink: 0;
            width: 200px;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  )
}
