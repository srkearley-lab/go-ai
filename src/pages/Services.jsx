import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, ShoppingCart, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import WhatsDifferenceStrip from '../components/WhatsDifferenceStrip'
import { useBasket, PACKAGE_FORM_TYPES } from '../context/BasketContext'
import { packageDetails } from '../data/packageDetails'
import { useTranslations, useLanguage } from '../context/LanguageContext'

// ── Service structural data (prices/ids; text overridden by translations.packageServiceData) ──

const serviceItems = [
  { id: 'Website Design',           priceDisplay: '€450',                monthly: 0,   oneOff: 450 },
  { id: 'SEO',                       priceDisplay: '€150/month',          monthly: 150, oneOff: 0   },
  { id: 'WhatsApp Automation',       priceDisplay: '€250 setup + €150/mo', monthly: 150, oneOff: 250 },
  { id: 'Email Automation',          priceDisplay: '€150 setup + €100/mo', monthly: 100, oneOff: 150 },
  { id: 'Video Websites',            priceDisplay: '€500',                monthly: 0,   oneOff: 500 },
  { id: 'AI Prompts',                priceDisplay: '€200',                monthly: 0,   oneOff: 200 },
  { id: 'Social Media Content',      priceDisplay: '€150/month',          monthly: 150, oneOff: 0   },
  { id: 'AI Content & Marketing',    priceDisplay: '€250/month',          monthly: 250, oneOff: 0   },
  { id: 'AI Automation',             priceDisplay: '€300/month',          monthly: 300, oneOff: 250 },
  { id: 'AI Avatar & Video Content', priceDisplay: '€300/month',          monthly: 300, oneOff: 250 },
  { id: 'Proposal & Sales Documents',priceDisplay: '€200/month',          monthly: 200, oneOff: 200 },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function FindOutMorePanel({ detailKey, item }) {
  const details = packageDetails[detailKey]
  const t = useTranslations()
  const { language } = useLanguage()
  if (!details) return null
  const d = language === 'gr' && details.el ? details.el : details

  return (
    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-3)' }}>
          {d.headline}
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {d.overview}
        </p>
      </div>

      <div className="fom-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.whoFor}</p>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{d.whoFor}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.weNeed}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {d.youNeed.map((need, ni) => (
              <li key={ni} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 2 }}>→</span>
                {need}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.included}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {d.included.map((inc, ii) => (
              <li key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 2 }}>
                  <Check size={8} strokeWidth={3} />
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.howItWorks}</p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {d.steps.map((step, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--surface-overlay)', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 1 }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', paddingTop: 'var(--space-2)' }}>
        <BasketButton item={item} />
        <Link
          to="/contact"
          style={{
            height: 36, padding: '0 var(--space-5)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-xs)', fontWeight: 600,
            background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF',
            border: 'none',
            boxShadow: '0 0 20px rgba(118, 39, 239, 0.3)',
            borderRadius: 'var(--radius-md)',
            transition: 'filter 120ms ease, box-shadow 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.45)' }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118, 39, 239, 0.3)' }}
        >
          {t.buttons.startService} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

function ServiceToggleBtn({ showDetails, onToggle }) {
  const t = useTranslations()
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
    >
      {showDetails ? t.buttons.hideDetails : t.buttons.findOutMore}
      <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
        <ChevronDown size={12} />
      </motion.span>
    </button>
  )
}

function ServiceCard({ svc, td, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const t = useTranslations()

  const displayName = td?.name || svc.id
  const priceDisplay = svc.priceDisplay
    .replace(/\/mo(?:nth)?/g, t.labels.perMonth)
    .replace(' setup', ` ${t.pricing?.setupLabel || 'setup'}`)

  const basketItem = {
    id: svc.id,
    name: displayName,
    priceDisplay,
    formTypes: PACKAGE_FORM_TYPES[svc.id] || [],
  }

  return (
    <motion.div
      variants={variants}
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-2)' }}>
          {displayName}
        </h3>
        <p style={{ fontSize: 'var(--text-xs)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          {td?.description || ''}
        </p>
      </div>

      <div>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {priceDisplay}
        </span>
        {td?.priceNote && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
            {td.priceNote}
          </p>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {(td?.features || []).map((f, i) => <FeatureItem key={i} text={f} />)}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
        <BasketButton item={basketItem} />
        <ServiceToggleBtn showDetails={showDetails} onToggle={() => setShowDetails(v => !v)} />
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key={`fom-${svc.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <FindOutMorePanel detailKey={svc.id} item={basketItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Services() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()

  // packageServiceData has 11 entries matching serviceItems (no hosting care)
  const localizedServices = serviceItems.map((svc, i) => ({
    svc,
    td: t.packageServiceData?.[i],
  }))

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
        tag={t.pages.services?.tag || 'Services'}
        title={t.pages.services?.title || 'Standalone Services'}
        description={t.pages.services?.description || 'Individual services to add to your website — SEO, automation, content, AI and more.'}
      />

      <WhatsDifferenceStrip activePage="packages" insideJourney={false} />

      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {localizedServices.map(({ svc, td }) => (
              <ServiceCard key={svc.id} svc={svc} td={td} variants={cardVariants} />
            ))}
          </motion.div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            {t.pages.services?.vatNote || t.pages.packages?.vatNote}
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
              {t.pages.services?.ctaTag || t.pages.packages?.ctaTag}
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {t.pages.services?.ctaTitle || t.pages.packages?.ctaTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              {t.pages.services?.ctaBody || t.pages.packages?.ctaBody}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/bundles"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
            >
              {t.pages.services?.ctaBundles || t.buttons.viewBundles}
            </Link>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = '1px solid transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
            >
              {t.pages.services?.ctaContact || t.pages.packages?.ctaContact}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
