import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, ShoppingCart, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import WhatsDifferenceStrip from '../components/WhatsDifferenceStrip'
import { useBasket, PACKAGE_FORM_TYPES } from '../context/BasketContext'
import { packageDetails } from '../data/packageDetails'
import { useTranslations, useLanguage } from '../context/LanguageContext'

const WHATSAPP = '#'

// ── Bundle data ───────────────────────────────────────────────────────────────

const bundles = [
  {
    badge: 'Peace of Mind',
    name: 'Website and Hosting Care',
    detailKey: 'Website + Hosting Care',
    oneOffDisplay: 'from €450',
    monthly: 90,
    savesYearly: 120,
    savesUpfront: null,
    recommended: false,
    features: [
      'Professional website build',
      'Reliable managed hosting',
      'Monthly security and backups',
      'Up to 2 hours of updates/month',
    ],
    cta: 'Get Website and Hosting',
  },
  {
    badge: 'Growth',
    name: 'Website and Social Growth',
    detailKey: 'Website + Social Growth',
    oneOffDisplay: 'from €450',
    monthly: 220,
    savesYearly: 360,
    savesUpfront: null,
    recommended: false,
    features: [
      'Professional website build',
      'Managed hosting included',
      '12 social posts/month',
      'Captions, hashtags, scheduling',
    ],
    cta: 'Get Website and Social Growth',
  },
  {
    badge: 'Recommended',
    name: 'Website and Marketing Engine',
    detailKey: 'Website + Marketing Engine',
    oneOffDisplay: 'from €450',
    monthly: 300,
    savesYearly: 600,
    savesUpfront: null,
    recommended: true,
    features: [
      'Professional website build',
      'Managed hosting included',
      'Monthly SEO blog posts',
      'Email newsletter campaigns',
      '12 social media posts/month',
      'Google ranking monitoring',
    ],
    cta: 'Choose Recommended Bundle',
    description: 'The complete growth package. Your website, SEO, content and social media — all done for you every month.',
  },
  {
    badge: 'Automation',
    name: 'Website and Automation',
    detailKey: 'Website + AI Automation',
    oneOffDisplay: 'from €450',
    monthly: 350,
    savesYearly: 600,
    savesUpfront: 100,
    recommended: false,
    features: [
      'Professional website build',
      'Managed hosting included',
      'WhatsApp enquiry automation',
      'Email follow-up sequences',
      'CRM lead tracking',
    ],
    cta: 'Get Website and Automation',
  },
  {
    badge: 'Premium',
    name: 'AI Growth Package',
    detailKey: 'Full AI Growth Package',
    oneOffDisplay: 'from €450',
    monthly: 950,
    savesYearly: 2400,
    savesUpfront: 250,
    recommended: false,
    features: [
      'Professional website build',
      'All monthly add-ons included',
      'AI Avatar and Video content',
      'AI proposals and sales documents',
      'Dedicated account manager',
    ],
    cta: 'Build My AI Growth Package',
  },
]

// ── Shared helpers ────────────────────────────────────────────────────────────

const badgeColors = {
  'Peace of Mind': { bg: 'rgba(22,163,74,0.1)',   border: 'rgba(22,163,74,0.2)',   color: 'var(--color-success)' },
  Growth:          { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)',  color: 'var(--color-accent-500)' },
  Recommended:     { bg: 'var(--color-brand-500)',border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  Automation:      { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)',  color: 'var(--color-brand-400)' },
  Premium:         { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', color: 'var(--color-accent-400)' },
}

function Badge({ label }) {
  const t = useTranslations()
  const c = badgeColors[label] || badgeColors['Automation']
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

function FeatureItem({ text, accent = false }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
      <span style={{
        width: 16, height: 16, flexShrink: 0, marginTop: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: accent ? 'rgba(99,102,241,0.15)' : 'var(--surface-subtle)',
        border: `1px solid ${accent ? 'rgba(99,102,241,0.3)' : 'var(--border-default)'}`,
        borderRadius: '50%',
        color: accent ? 'var(--color-brand-400)' : 'var(--text-tertiary)',
      }}>
        <Check size={9} strokeWidth={3} />
      </span>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{text}</span>
    </li>
  )
}

function SavingsBadge({ yearly, upfront }) {
  const t = useTranslations()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
      {upfront && (
        <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent-400)', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-sm)', padding: '2px var(--space-2)' }}>
          {t.pages.bundles.saveUpfront.replace('{amount}', upfront)}
        </span>
      )}
      {yearly && (
        <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent-400)', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-sm)', padding: '2px var(--space-2)' }}>
          {t.pages.bundles.savePerYear.replace('{amount}', yearly)}
        </span>
      )}
    </div>
  )
}

// ── Basket button ─────────────────────────────────────────────────────────────

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

// ── Find Out More panel ───────────────────────────────────────────────────────

function FindOutMorePanel({ detailKey, item }) {
  const details = packageDetails[detailKey]
  const t = useTranslations()
  const { language } = useLanguage()
  if (!details) return null
  const d = language === 'gr' && details.el ? details.el : details
  return (
    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-3)' }}>
          {d.headline}
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{d.overview}</p>
      </div>
      <div className="fom-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.whoFor}</p>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{d.whoFor}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.weNeed}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {d.youNeed.map(i => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 2 }}>→</span>{i}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.included}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {d.included.map(i => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 2 }}>
                  <Check size={8} strokeWidth={3} />
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.howItWorks}</p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {d.steps.map((step, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--surface-overlay)', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div>
        <BasketButton item={item} />
      </div>
    </div>
  )
}

// ── Bundle cards ──────────────────────────────────────────────────────────────

function BundleToggleBtn({ showDetails, onToggle }) {
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

function SmallBundleCard({ bundle, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const t = useTranslations()
  const basketItem = {
    id: bundle.detailKey,
    name: bundle.name,
    priceDisplay: `€${bundle.monthly}${t.labels.perMonth}`,
    formTypes: PACKAGE_FORM_TYPES[bundle.detailKey] || [],
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
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{bundle.name}</h3>
        <Badge label={bundle.badge} />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>€{bundle.monthly}</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{t.pages.bundles.perMonth}</span>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {bundle.features.map((f, i) => <FeatureItem key={i} text={f} />)}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <Link to="/contact" style={{ height: 36, padding: '0 var(--space-4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = '1px solid transparent' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
        >{bundle.cta}</Link>
        <BasketButton item={basketItem} />
      </div>
      <BundleToggleBtn showDetails={showDetails} onToggle={() => setShowDetails(v => !v)} />

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key={`fom-${bundle.detailKey}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <FindOutMorePanel detailKey={bundle.detailKey} item={basketItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function RecommendedBundleCard({ bundle, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const t = useTranslations()
  const basketItem = {
    id: bundle.detailKey,
    name: bundle.name,
    priceDisplay: `€${bundle.monthly}${t.labels.perMonth}`,
    formTypes: PACKAGE_FORM_TYPES[bundle.detailKey] || [],
  }
  return (
    <motion.div
      variants={variants}
      style={{
        background: 'var(--surface-overlay)',
        border: '1px solid var(--goai-violet)',
        borderLeft: '3px solid var(--goai-violet)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)',
        padding: 'var(--space-8)',
        display: 'grid',
        gap: 'var(--space-8)',
        alignItems: 'start',
      }}
      className="recommended-bundle-grid"
    >
      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <Badge label={bundle.badge} />
        <div>
          <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            {bundle.name}
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            {bundle.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
          <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>€{bundle.monthly}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{t.pages.bundles.perMonth}</span>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          {t.pages.bundles.bundleValueNote}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
          <Link
            to="/contact"
            style={{ height: 40, padding: '0 var(--space-5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
          >{bundle.cta}</Link>
          <BasketButton item={basketItem} />
        </div>
        <BundleToggleBtn showDetails={showDetails} onToggle={() => setShowDetails(v => !v)} />
      </div>

      {/* Right — features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          {t.pages.bundles.everythingIncluded}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {bundle.features.map((f, i) => <FeatureItem key={i} text={f} accent />)}
        </ul>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key={`fom-rec-${bundle.detailKey}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', gridColumn: '1 / -1' }}
          >
            <FindOutMorePanel detailKey={bundle.detailKey} item={basketItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Bundles() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()

  // Merge structural data with translated text
  const localizedBundles = bundles.map((bundle, i) => {
    const td = t.bundleData?.[i]
    if (!td) return bundle
    return { ...bundle, name: td.name, description: td.description, features: td.features, cta: td.cta }
  })

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: reduceMotion ? 0 : 0.05 } },
  }
  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  }

  const standard = localizedBundles.filter(b => !b.recommended)
  const recommended = localizedBundles.find(b => b.recommended)
  const before = standard.slice(0, 2)
  const after = standard.slice(2)

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={t.pages.bundles.tag}
        title={t.pages.bundles.title}
        description={t.pages.bundles.description}
      />

      <WhatsDifferenceStrip activePage="bundles" insideJourney={false} />

      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '62ch' }}>
            {t.pages.bundles.intro}
          </p>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            {t.pages.bundles.priceNote}
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {before.map(b => <SmallBundleCard key={b.detailKey} bundle={b} variants={cardVariants} />)}
            </div>

            <RecommendedBundleCard bundle={recommended} variants={cardVariants} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {after.map(b => <SmallBundleCard key={b.detailKey} bundle={b} variants={cardVariants} />)}
            </div>
          </motion.div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            {t.pages.bundles.vatNote}
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
              {t.pages.bundles.ctaTag}
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {t.pages.bundles.ctaTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              {t.pages.bundles.ctaBody}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
            >
              {t.pages.bundles.ctaPrimary}
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', height: 44, padding: '0 var(--space-5)', fontSize: 'var(--text-sm)', fontWeight: 500, background: '#25d366', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
            >
              <MessageCircle size={15} />
              {t.pages.bundles.ctaWhatsApp}
            </a>
          </div>
        </motion.div>
      </section>

      <style>{`
        .recommended-bundle-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .recommended-bundle-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  )
}
