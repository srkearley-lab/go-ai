import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, ShoppingCart, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useBasket, PACKAGE_FORM_TYPES } from '../context/BasketContext'
import { packageDetails } from '../data/packageDetails'

// ── Website packages data ─────────────────────────────────────────────────────

const websitePackages = [
  {
    badge: 'Entry Level',
    name: 'Basic Launch Website',
    price: 'From €450',
    featured: false,
    bestFor: 'Side businesses, sole traders, early startups',
    features: [
      'One-page site',
      'Mobile responsive',
      'Contact form',
      'Basic SEO',
      'Analytics placeholder',
      'Launch setup',
    ],
    cta: 'Start With Basic Website',
  },
  {
    badge: 'Starter',
    name: 'Starter Business Website',
    price: 'From €750',
    featured: false,
    bestFor: 'New businesses wanting more credibility',
    features: [
      'Up to 3 pages — Home, Services, Contact',
      'Mobile responsive',
      'Contact form',
      'Booking CTA placeholder',
      'Basic SEO',
      'Social links',
    ],
    cta: 'Build My Starter Website',
  },
  {
    badge: 'Most Popular',
    name: 'Business Website',
    price: 'From €1,200',
    featured: true,
    bestFor: 'Established businesses, consultants, local service providers',
    features: [
      'Up to 5 pages',
      'Lead capture form',
      'Booking placeholder',
      'FAQ section',
      'Analytics-ready',
      'Deployment support',
    ],
    cta: 'Choose Business Website',
  },
  {
    badge: 'Best for Growth',
    name: 'Growth Website',
    price: 'From €1,750',
    featured: false,
    bestFor: 'Businesses wanting a higher-converting website',
    features: [
      'Up to 7 pages',
      'Funnel structure',
      'Package comparison section',
      'Payment/booking placeholders',
      'Meta Pixel and GTM placeholders',
      'Enhanced SEO and stronger conversion sections',
    ],
    cta: 'Build Growth Website',
  },
  {
    badge: 'Premium',
    name: 'Premium AI-Ready Website',
    price: 'From €2,500+',
    featured: false,
    bestFor: 'Businesses wanting a premium website with AI-ready foundations',
    features: [
      'Everything in Growth Website',
      'Premium design',
      'AI-ready sections',
      'Client enquiry journey',
      'Lead capture workflow',
      'Launch and handover documentation',
    ],
    cta: 'Request Premium Website Quote',
  },
]

// ── Shared helpers ────────────────────────────────────────────────────────────

const badgeColors = {
  'Entry Level':     { bg: 'rgba(22,163,74,0.08)',  border: 'rgba(22,163,74,0.18)',  color: 'var(--color-success)' },
  Starter:           { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)',  color: 'var(--color-brand-400)' },
  'Most Popular':    { bg: 'var(--color-brand-500)',border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  'Best for Growth': { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)',  color: 'var(--color-accent-400)' },
  Premium:           { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', color: 'var(--color-accent-400)' },
}

function Badge({ label }) {
  const c = badgeColors[label] || badgeColors['Starter']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 'var(--text-xs)', fontWeight: 600,
      letterSpacing: '0.05em', textTransform: 'uppercase',
      background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      borderRadius: 'var(--radius-full)', padding: '3px var(--space-3)',
    }}>
      {label}
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

// ── Basket button ─────────────────────────────────────────────────────────────

function BasketButton({ item }) {
  const { addItem, removeItem, isInBasket } = useBasket()
  const inBasket = isInBasket(item.id)
  return (
    <button
      type="button"
      onClick={() => inBasket ? removeItem(item.id) : addItem(item)}
      style={{
        height: 36, padding: '0 var(--space-4)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
        fontSize: 'var(--text-xs)', fontWeight: 500,
        background: inBasket ? 'rgba(22,163,74,0.1)' : 'transparent',
        color: inBasket ? 'var(--color-success)' : 'var(--text-secondary)',
        border: `1px solid ${inBasket ? 'rgba(22,163,74,0.3)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-md)', cursor: 'pointer',
        transition: 'all 120ms ease', fontFamily: 'inherit', flexShrink: 0,
      }}
      onMouseEnter={(e) => { if (!inBasket) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' } }}
      onMouseLeave={(e) => { if (!inBasket) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' } }}
    >
      {inBasket
        ? <><Check size={11} strokeWidth={3} /> In Basket</>
        : <><ShoppingCart size={11} /> Add to Basket</>}
    </button>
  )
}

// ── Find Out More panel ───────────────────────────────────────────────────────

function FindOutMorePanel({ name, item }) {
  const details = packageDetails[name]
  if (!details) return null
  return (
    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-3)' }}>{details.headline}</h4>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{details.overview}</p>
      </div>
      <div className="fom-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>Who this is for</p>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{details.whoFor}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>What we need from you</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {details.youNeed.map(i => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 2 }}>→</span>{i}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>What's included</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {details.included.map(i => (
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
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>How it works</p>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {details.steps.map((step, i) => (
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

// ── Website card ──────────────────────────────────────────────────────────────

function WebsiteCard({ pkg, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const basketItem = {
    id: pkg.name,
    name: pkg.name,
    priceDisplay: `${pkg.price} one-off`,
    formTypes: PACKAGE_FORM_TYPES[pkg.name] || ['website'],
  }

  if (pkg.featured) {
    return (
      <motion.div
        variants={variants}
        style={{
          background: 'var(--surface-overlay)',
          border: '1px solid var(--color-brand-500)',
          borderLeft: '3px solid var(--color-brand-500)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--space-8)',
          display: 'grid',
          gap: 'var(--space-8)',
          alignItems: 'start',
        }}
        className="website-featured-grid"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Badge label={pkg.badge} />
          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>{pkg.name}</h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', marginBottom: 'var(--space-4)' }}>Best for: {pkg.bestFor}</p>
          </div>
          <div>
            <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>
              {pkg.price}
            </span>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 'var(--space-1)' }}>
              Starting price for initial build only. Final quote based on scope.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
            <Link
              to="/contact"
              style={{ height: 40, padding: '0 var(--space-5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
            >{pkg.cta}</Link>
            <BasketButton item={basketItem} />
          </div>
          <button
            type="button"
            onClick={() => setShowDetails(v => !v)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
          >
            {showDetails ? 'Hide details' : 'Find Out More'}
            <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
              <ChevronDown size={12} />
            </motion.span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>What's included</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {pkg.features.map(f => <FeatureItem key={f} text={f} accent />)}
          </ul>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              key={`fom-ws-${pkg.name}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden', gridColumn: '1 / -1' }}
            >
              <FindOutMorePanel name={pkg.name} item={basketItem} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
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
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{pkg.name}</h3>
        <Badge label={pkg.badge} />
      </div>

      <div>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>{pkg.price}</span>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Best for: {pkg.bestFor}</p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {pkg.features.map(f => <FeatureItem key={f} text={f} />)}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
        <Link to="/contact" style={{ height: 36, padding: '0 var(--space-4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >{pkg.cta}</Link>
        <BasketButton item={basketItem} />
      </div>
      <button
        type="button"
        onClick={() => setShowDetails(v => !v)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
      >
        {showDetails ? 'Hide details' : 'Find Out More'}
        <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
          <ChevronDown size={12} />
        </motion.span>
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key={`fom-ws-std-${pkg.name}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <FindOutMorePanel name={pkg.name} item={basketItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Websites() {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: reduceMotion ? 0 : 0.05 } },
  }
  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  }

  const featured = websitePackages.find(p => p.featured)
  const nonFeatured = websitePackages.filter(p => !p.featured)
  const before = nonFeatured.slice(0, 2)
  const after = nonFeatured.slice(2)

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Websites"
        title="Website Setup Packages"
        description="Website setup prices start from €450. These are one-off prices for the initial website build only."
      />

      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '62ch' }}>
            Choose the right level of website for your business. These are starting prices for the initial build only — ongoing hosting, content and growth support are available separately through our <Link to="/packages" style={{ color: 'var(--color-brand-400)' }}>packages</Link> and <Link to="/bundles" style={{ color: 'var(--color-brand-400)' }}>bundles</Link>.
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {before.map(p => <WebsiteCard key={p.name} pkg={p} variants={cardVariants} />)}
            </div>

            <WebsiteCard pkg={featured} variants={cardVariants} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {after.map(p => <WebsiteCard key={p.name} pkg={p} variants={cardVariants} />)}
            </div>
          </motion.div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', maxWidth: '72ch' }}>
            All website prices are starting prices for the initial setup only. Final pricing depends on pages, content requirements, design complexity and integrations. All prices exclude Greek VAT (24%).
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
              Want more than just a website?
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Combine with monthly support
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              Add monthly services for hosting, SEO, social media and automation — or save with a bundle that includes everything.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/bundles"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
            >
              View Monthly Bundles
            </Link>
            <Link
              to="/packages"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              View Service Packages
            </Link>
          </div>
        </motion.div>
      </section>

      <style>{`
        .website-featured-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .website-featured-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  )
}
