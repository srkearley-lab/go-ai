import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSEO } from '../lib/seo'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from '../context/LanguageContext'

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  return (
    <div style={{ borderBottom: '1px solid var(--border-default)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--space-4)', padding: 'var(--space-5) 0',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5 }}>{q}</span>
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
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', paddingBottom: 'var(--space-5)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  const tf = t.faq

  useSEO({
    title: `${tf.tag} — GO AI`,
    description: tf.description,
  })

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={tf.tag}
        title={tf.title}
        description={tf.description}
      />

      <section style={{ padding: 'var(--space-16) var(--space-8) var(--space-20)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {tf.categories.map(({ category, items }) => (
            <motion.div
              key={category}
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', marginBottom: 'var(--space-4)' }}>
                {category}
              </p>
              {items.map(({ q, a }, i) => <FAQItem key={i} q={q} a={a} />)}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}
        >
          <div>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
              {tf.stillHave}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {tf.stillHaveBody}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/packages"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
            >
              {tf.viewPackages} <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              {tf.sendEmail}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
