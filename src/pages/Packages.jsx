import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, ShoppingCart, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import WhatsDifferenceStrip from '../components/WhatsDifferenceStrip'
import { useBasket, PACKAGE_FORM_TYPES } from '../context/BasketContext'
import { useTranslations, useLanguage } from '../context/LanguageContext'

// ── Website package structural data (prices / ids stay here; text overridden by translations) ──

const websitePackages = [
  {
    id: 'basic-launch',
    badge: 'Entry Level',
    price: '€450',
    priceNote: 'one-off',
    oneOff: 450,
    isQuote: false,
    highlighted: false,
  },
  {
    id: 'starter-business',
    badge: 'Starter',
    price: '€750',
    priceNote: 'one-off',
    oneOff: 750,
    isQuote: false,
    highlighted: false,
  },
  {
    id: 'business',
    badge: 'Recommended',
    price: '€1,200',
    priceNote: 'one-off',
    oneOff: 1200,
    isQuote: false,
    highlighted: true,
  },
  {
    id: 'growth',
    badge: 'Best for Growth',
    price: '€1,750',
    priceNote: 'one-off',
    oneOff: 1750,
    isQuote: false,
    highlighted: false,
  },
  {
    id: 'premium',
    badge: 'Premium',
    price: null,
    priceNote: null,
    oneOff: 0,
    isQuote: true,
    highlighted: false,
  },
]

const BADGE_COLORS = {
  'Entry Level':     { bg: 'rgba(22,163,74,0.08)',   border: 'rgba(22,163,74,0.18)',   color: 'var(--color-success)' },
  'Starter':         { bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.2)',   color: 'var(--color-brand-400)' },
  'Recommended':     { bg: 'var(--color-brand-500)', border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  'Best for Growth': { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-400)' },
  'Premium':         { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)',  color: 'var(--color-accent-400)' },
  // Greek aliases
  'Εισαγωγικό':             { bg: 'rgba(22,163,74,0.08)',   border: 'rgba(22,163,74,0.18)',   color: 'var(--color-success)' },
  'Αρχικό πακέτο':          { bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.2)',   color: 'var(--color-brand-400)' },
  'Συνιστώμενο':            { bg: 'var(--color-brand-500)', border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  'Καλύτερο για Ανάπτυξη': { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-400)' },
  'Προνομιακό':             { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)',  color: 'var(--color-accent-400)' },
}

function Badge({ label }) {
  const t = useTranslations()
  const c = BADGE_COLORS[label] || { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', color: 'var(--color-brand-400)' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 'var(--text-xs)', fontWeight: 600,
      letterSpacing: '0.05em', textTransform: 'uppercase',
      background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      borderRadius: 'var(--radius-full)', padding: '3px var(--space-3)',
    }}>
      {t.labels.badgeLabels?.[label] || label}
    </span>
  )
}

function FeatureItem({ text }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
      <span style={{
        width: 16, height: 16, flexShrink: 0, marginTop: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(99,102,241,0.1)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '50%',
        color: 'var(--color-brand-400)',
      }}>
        <Check size={9} strokeWidth={3} />
      </span>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{text}</span>
    </li>
  )
}

function BasketButton({ item }) {
  const { addItem, removeItem, isInBasket } = useBasket()
  const t = useTranslations()
  const inBasket = isInBasket(item.id)
  return (
    <button
      type="button"
      onClick={() => inBasket ? removeItem(item.id) : addItem(item)}
      style={{
        height: 36, padding: '0 var(--space-4)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
        fontSize: 'var(--text-xs)', fontWeight: 600,
        background: inBasket ? 'rgba(22,163,74,0.1)' : 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
        color: inBasket ? 'var(--color-success)' : '#FFFFFF',
        border: `1px solid ${inBasket ? 'rgba(22,163,74,0.3)' : 'transparent'}`,
        boxShadow: inBasket ? 'none' : '0 0 20px rgba(118, 39, 239, 0.3)',
        borderRadius: 'var(--radius-md)', cursor: 'pointer',
        transition: 'all 120ms ease', fontFamily: 'inherit', flexShrink: 0,
      }}
      onMouseEnter={(e) => { if (!inBasket) { e.currentTarget.style.filter = 'brightness(1.1)' } }}
      onMouseLeave={(e) => { if (!inBasket) { e.currentTarget.style.filter = 'brightness(1)' } }}
    >
      {inBasket
        ? <><Check size={11} strokeWidth={3} /> {t.buttons.inBasket}</>
        : <><ShoppingCart size={11} /> {t.buttons.addToBasket}</>}
    </button>
  )
}

function ShowFeaturesBtn({ open, onToggle }) {
  const t = useTranslations()
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
    >
      {open ? t.buttons.hideDetails : t.buttons.showDetails}
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
        <ChevronDown size={12} />
      </motion.span>
    </button>
  )
}

function WebsitePackageCard({ pkg, td, variants }) {
  const [showFeatures, setShowFeatures] = useState(false)
  const t = useTranslations()
  const hl = pkg.highlighted

  const basketItem = {
    id: pkg.id,
    name: td?.name || pkg.id,
    priceDisplay: pkg.isQuote ? t.labels.quoteRequired : pkg.price,
    formTypes: PACKAGE_FORM_TYPES[pkg.id] || [],
  }

  const tn = (note) => note === 'one-off' ? t.labels.oneOff : note === '/month' ? t.labels.perMonth : note

  return (
    <motion.div
      variants={variants}
      style={{
        background: hl ? 'var(--surface-overlay)' : 'var(--surface-raised)',
        border: `1px solid ${hl ? 'rgba(118,39,239,0.4)' : 'var(--border-default)'}`,
        borderLeft: hl ? '3px solid var(--goai-violet)' : undefined,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
        boxShadow: hl ? '0 0 20px rgba(118,39,239,0.12)' : 'none',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = hl ? 'rgba(118,39,239,0.6)' : 'var(--border-strong)'; e.currentTarget.style.boxShadow = hl ? '0 0 30px rgba(118,39,239,0.2)' : 'var(--shadow-sm)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = hl ? 'rgba(118,39,239,0.4)' : 'var(--border-default)'; e.currentTarget.style.boxShadow = hl ? '0 0 20px rgba(118,39,239,0.12)' : 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {td?.name || pkg.id}
        </h3>
        <Badge label={pkg.badge} />
      </div>

      {td?.bestFor && (
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
          {t.pages.websites.bestFor} {td.bestFor}
        </p>
      )}

      <div>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {pkg.isQuote ? t.labels.quoteRequired : pkg.price}
        </span>
        {!pkg.isQuote && pkg.priceNote && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginLeft: 'var(--space-2)' }}>
            {tn(pkg.priceNote)}
          </span>
        )}
      </div>

      <AnimatePresence>
        {showFeatures && td?.features && (
          <motion.div
            key={`feat-${pkg.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
              {td.features.map((f, i) => <FeatureItem key={i} text={f} />)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-3)' }}>
        {t.pages.packages.hostingCareNote}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {pkg.isQuote ? (
          <Link
            to="/contact"
            style={{
              height: 36, padding: '0 var(--space-4)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)', fontWeight: 600,
              background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
              color: '#FFFFFF', border: 'none',
              boxShadow: '0 0 20px rgba(118, 39, 239, 0.3)',
              borderRadius: 'var(--radius-md)',
              transition: 'filter 120ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}
          >
            {t.buttons.requestAQuote} <ArrowRight size={11} />
          </Link>
        ) : (
          <BasketButton item={basketItem} />
        )}
        <ShowFeaturesBtn open={showFeatures} onToggle={() => setShowFeatures(v => !v)} />
      </div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Packages() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()

  // Merge structural data with translated text from websiteData
  const localizedPackages = websitePackages.map((pkg, i) => {
    const td = t.websiteData?.[i]
    return { pkg, td }
  })

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: reduceMotion ? 0 : 0.05 } },
  }
  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={t.pages.packages.tag}
        title={t.pages.packages.title}
        description={t.pages.packages.description}
      />

      <WhatsDifferenceStrip activePage="websites" insideJourney={false} />

      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {localizedPackages.map(({ pkg, td }) => (
              <WebsitePackageCard key={pkg.id} pkg={pkg} td={td} variants={cardVariants} />
            ))}
          </motion.div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            {t.pages.packages.vatNote}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', background: 'var(--surface-raised)', borderTop: '1px solid var(--border-default)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-500)' }}>
              {t.pages.packages.ctaTag}
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {t.pages.packages.ctaTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              {t.pages.packages.ctaBody}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/bundles"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
            >
              {t.pages.packages.ctaBundles}
            </Link>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = '1px solid transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
            >
              {t.pages.packages.ctaContact}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
