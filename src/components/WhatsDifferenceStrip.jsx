import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Package, Layers, PlusCircle, FileText } from 'lucide-react'
import { useTranslations } from '../context/LanguageContext'

const CARD_META = [
  { id: 'websites', icon: Globe,        href: '/websites' },
  { id: 'packages', icon: Package,      href: '/packages' },
  { id: 'bundles',  icon: Layers,       href: '/bundles'  },
  { id: 'addons',   icon: PlusCircle,   href: '/addons'   },
  { id: 'quote',    icon: FileText,     href: '/request-quote' },
]

const MotionLink = motion(Link)

export default function WhatsDifferenceStrip({ activePage = null, insideJourney = false }) {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: reduceMotion ? 0 : 0.02 } },
  }
  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  }

  const Wrapper = insideJourney ? 'div' : 'section'

  return (
    <Wrapper className={insideJourney ? 'wds-strip-inner' : 'wds-strip'}>
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
            {t.strip.quickRef}
          </p>
          <h2 style={{
            fontSize: 'clamp(var(--text-sm), 1.8vw, var(--text-md))',
            fontWeight: 700, letterSpacing: '-0.01em',
            color: 'var(--text-primary)', lineHeight: 1.2,
          }}>
            {t.strip.heading}
          </h2>
        </motion.div>

        <motion.div
          className="wds-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {CARD_META.map((meta) => {
            const Icon = meta.icon
            const isActive = activePage === meta.id
            const card = t.strip.cards[meta.id]

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
                    {t.strip.youAreHere}
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
                <motion.div key={meta.id} variants={fadeUp} style={sharedStyle}>
                  {cardInner}
                </motion.div>
              )
            }

            return (
              <MotionLink
                key={meta.id}
                to={meta.href}
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
        .wds-strip-inner {
          margin-bottom: var(--space-6);
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
    </Wrapper>
  )
}
