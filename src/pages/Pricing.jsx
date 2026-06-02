import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, MessageCircle, ShoppingCart, ChevronDown } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useBasket, PACKAGE_FORM_TYPES } from '../context/BasketContext'
import { packageDetails } from '../data/packageDetails'
import { useTranslations, useLanguage } from '../context/LanguageContext'

const WHATSAPP = '#'

// ── Data ─────────────────────────────────────────────────────────────────────

const addOns = [
  {
    name: 'Hosting & Website Care',
    detailKey: 'Hosting & Website Care',
    monthly: 100,
    setup: null,
    description: 'Your website stays fast, secure and up to date every month.',
    features: ['Reliable managed hosting', 'Security monitoring & backups', 'Up to 2 hrs of content updates/mo'],
  },
  {
    name: 'Social Media Content',
    detailKey: 'Social Media Content',
    monthly: 150,
    setup: null,
    description: 'Consistent social media presence without lifting a finger.',
    features: ['12 posts/month across 2 platforms', 'Captions, hashtags, scheduling', 'Designed to drive local enquiries'],
  },
  {
    name: 'AI Content & Marketing',
    detailKey: 'AI Content & Marketing',
    monthly: 250,
    setup: null,
    description: 'Keep your website fresh and your Google ranking growing.',
    features: ['Monthly SEO blog posts', 'Email newsletter campaigns', 'Google ranking monitoring'],
  },
  {
    name: 'AI Automation',
    detailKey: 'AI Automation',
    monthly: 300,
    setup: 250,
    description: 'Turn enquiries into bookings automatically, 24/7.',
    features: ['WhatsApp enquiry bot', 'Email follow-up sequences', 'CRM lead tracking'],
  },
  {
    name: 'AI Avatar & Video Content',
    detailKey: 'AI Avatar & Video Content',
    monthly: 300,
    setup: 250,
    description: 'Stand out on social media with AI-generated video content.',
    features: ['8 AI videos/month', 'Digital avatar creation', 'Optimised for Instagram & TikTok'],
  },
  {
    name: 'Proposal & Sales Documents',
    detailKey: 'Proposal & Sales Documents',
    monthly: 200,
    setup: 200,
    description: 'Send polished proposals to prospects in minutes, not hours.',
    features: ['AI-generated proposals in minutes', 'Branded quotes & contracts', 'Automated follow-up sequences'],
  },
]

const bundles = [
  {
    badge: 'Peace of Mind',
    name: 'Website + Hosting Care',
    detailKey: 'Website + Hosting Care',
    oneOffDisplay: 'from €450',
    monthly: 90,
    savesYearly: 120,
    savesUpfront: null,
    recommended: false,
    features: [
      'Professional website build',
      'Reliable managed hosting',
      'Monthly security & backups',
      'Up to 2 hours of updates/month',
    ],
    cta: 'Get Website + Hosting',
  },
  {
    badge: 'Growth',
    name: 'Website + Social Growth',
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
    cta: 'Get Website + Social Growth',
  },
  {
    badge: 'Recommended',
    name: 'Website + Marketing Engine',
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
    name: 'Website + AI Automation',
    detailKey: 'Website + AI Automation',
    oneOffDisplay: 'from €450',
    monthly: 350,
    savesYearly: 600,
    savesUpfront: null,
    recommended: false,
    features: [
      'Professional website build',
      'Managed hosting included',
      'WhatsApp enquiry automation',
      'Email follow-up sequences',
      'CRM lead tracking',
    ],
    cta: 'Get Website + Automation',
  },
  {
    badge: 'Premium',
    name: 'Full AI Growth Package',
    detailKey: 'Full AI Growth Package',
    oneOffDisplay: 'from €450',
    monthly: 950,
    savesYearly: 2400,
    savesUpfront: 250,
    recommended: false,
    features: [
      'Professional website build',
      'All monthly add-ons included',
      'AI Avatar & Video content',
      'AI proposals & sales documents',
      'Dedicated account manager',
    ],
    cta: 'Build My AI Growth Package',
  },
]

// ── One-Off Website Setup data ────────────────────────────────────────────────

const websiteSetupPackages = [
  {
    badge: 'Entry Level',
    name: 'Basic Launch Website',
    detailKey: 'Basic Launch Website',
    price: '€450',
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
    detailKey: 'Starter Business Website',
    price: '€750',
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
    detailKey: 'Business Website',
    price: '€1,200',
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
    detailKey: 'Growth Website',
    price: '€1,750',
    featured: false,
    bestFor: 'Businesses wanting a higher-converting website',
    features: [
      'Up to 7 pages',
      'Funnel structure',
      'Package comparison section',
      'Payment/booking placeholders',
      'Meta Pixel & GTM placeholders',
      'Enhanced SEO & stronger conversion sections',
    ],
    cta: 'Build Growth Website',
  },
  {
    badge: 'Premium',
    name: 'Premium AI-Ready Website',
    detailKey: 'Premium AI-Ready Website',
    price: '€2,500+',
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

// ── Shared sub-components ─────────────────────────────────────────────────────

const badgeColors = {
  Starter:          { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)',  color: 'var(--color-brand-400)' },
  'Peace of Mind':  { bg: 'rgba(22,163,74,0.1)',   border: 'rgba(22,163,74,0.2)',   color: 'var(--color-success)' },
  Growth:           { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)',  color: 'var(--color-accent-500)' },
  Recommended:      { bg: 'var(--color-brand-500)',border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  Automation:       { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)',  color: 'var(--color-brand-400)' },
  Premium:          { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', color: 'var(--color-accent-400)' },
  'Entry Level':    { bg: 'rgba(22,163,74,0.08)',  border: 'rgba(22,163,74,0.18)',  color: 'var(--color-success)' },
  'Most Popular':   { bg: 'var(--color-brand-500)',border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  'Best for Growth':{ bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)',  color: 'var(--color-accent-400)' },
}

function Badge({ label }) {
  const t = useTranslations()
  const c = badgeColors[label] || badgeColors['Starter']
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

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 'var(--text-xs)', fontWeight: 600,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: 'var(--color-brand-400)',
      marginBottom: 'var(--space-3)',
    }}>
      {children}
    </p>
  )
}

function CTAButton({ to, label, primary = false }) {
  return (
    <Link
      to={to}
      style={{
        height: 40, padding: '0 var(--space-5)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'var(--text-sm)', fontWeight: 500,
        background: primary ? 'var(--color-brand-500)' : 'transparent',
        color: primary ? 'var(--color-neutral-0)' : 'var(--text-primary)',
        border: primary ? '1px solid var(--color-brand-600)' : '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        transition: 'background 120ms ease, transform 60ms ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = primary ? 'var(--color-brand-600)' : 'var(--surface-subtle)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = primary ? 'var(--color-brand-500)' : 'transparent' }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {label}
    </Link>
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
        ? <><Check size={11} strokeWidth={3} /> {t.buttons.inBasket}</>
        : <><ShoppingCart size={11} /> {t.buttons.addToBasket}</>}
    </button>
  )
}

// ── Find Out More panel ───────────────────────────────────────────────────────

function FindOutMorePanel({ detailKey, item }) {
  const details = packageDetails[detailKey]
  const { language } = useLanguage()
  const t = useTranslations()
  if (!details) return null
  const d = language === 'gr' && details.el ? details.el : details

  return (
    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-3)' }}>
          {d.headline}
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {d.overview}
        </p>
      </div>

      <div className="fom-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Who this is for */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{t.findOutMore.whoFor}</p>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>{d.whoFor}</p>
        </div>

        {/* What we need from you */}
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

        {/* What's included */}
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

        {/* How it works */}
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

      {/* CTA */}
      <div style={{ paddingTop: 'var(--space-2)' }}>
        <BasketButton item={item} />
      </div>
    </div>
  )
}

// ── Section 1 — Add-Ons ──────────────────────────────────────────────────────

function AddOnCard({ addon, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const t = useTranslations()
  const tp = t.pricing
  const basketItem = {
    id: addon.detailKey,
    name: addon.name,
    priceDisplay: `€${addon.monthly}${t.labels.perMonth}${addon.setup ? ` + €${addon.setup} ${t.pricing.setupLabel}` : ''}`,
    formTypes: PACKAGE_FORM_TYPES[addon.detailKey] || [],
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
          {addon.name}
        </h3>
        <p style={{ fontSize: 'var(--text-xs)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          {addon.description}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          €{addon.monthly}
        </span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{t.labels.perMonth}</span>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: addon.setup ? 'var(--color-accent-500)' : 'var(--text-tertiary)' }}>
        {addon.setup
          ? tp.setupFee.replace('{amount}', addon.setup)
          : tp.setupIncluded}
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {addon.features.map((f, i) => <FeatureItem key={i} text={f} />)}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
        <BasketButton item={basketItem} />
        <button
          type="button"
          onClick={() => setShowDetails(v => !v)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
        >
          {showDetails ? t.buttons.hideDetails : t.buttons.findOutMore}
          <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
            <ChevronDown size={12} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key={`fom-${addon.detailKey}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <FindOutMorePanel detailKey={addon.detailKey} item={basketItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function AddOnsSection({ reduceMotion, localizedAddOns, tp }) {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: reduceMotion ? 0 : 0.05 } },
  }
  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="packages" style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
        <div>
          <SectionLabel>{tp.addOnsLabel}</SectionLabel>
          <h2 style={{ fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            {tp.addOnsTitle}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '58ch' }}>
            {tp.addOnsBody}
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {localizedAddOns.map(addon => <AddOnCard key={addon.detailKey} addon={addon} variants={cardVariants} />)}
        </motion.div>
      </div>
    </section>
  )
}

// ── Section 3 — Bundles ───────────────────────────────────────────────────────

function SavingsBadge({ yearly, upfront }) {
  const t = useTranslations()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
      {upfront && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: 'var(--color-accent-400)',
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 'var(--radius-sm)', padding: '2px var(--space-2)',
        }}>
          {t.pages.bundles.saveUpfront.replace('{amount}', upfront)}
        </span>
      )}
      {yearly && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: 'var(--color-accent-400)',
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 'var(--radius-sm)', padding: '2px var(--space-2)',
        }}>
          {t.pages.bundles.savePerYear.replace('{amount}', yearly)}
        </span>
      )}
    </div>
  )
}

function SmallBundleCard({ bundle, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const t = useTranslations()
  const basketItem = {
    id: bundle.detailKey,
    name: bundle.name,
    priceDisplay: `${t.journey.website} ${bundle.oneOffDisplay} + €${bundle.monthly}${t.labels.perMonth}`,
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
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {bundle.name}
        </h3>
        <Badge label={bundle.badge} />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
        <div>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1 }}>{t.journey.website} {bundle.oneOffDisplay}</span>
        </div>
        <div>
          <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>€{bundle.monthly}</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{t.labels.perMonth}</span>
        </div>
      </div>

      <SavingsBadge yearly={bundle.savesYearly} upfront={bundle.savesUpfront} />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {bundle.features.map((f, i) => <FeatureItem key={i} text={f} />)}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <CTAButton to="/contact" label={bundle.cta} />
        <BasketButton item={basketItem} />
      </div>
      <button
        type="button"
        onClick={() => setShowDetails(v => !v)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
      >
        {showDetails ? t.buttons.hideDetails : t.buttons.findOutMore}
        <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
          <ChevronDown size={12} />
        </motion.span>
      </button>

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
    priceDisplay: `${t.journey.website} ${bundle.oneOffDisplay} + €${bundle.monthly}${t.labels.perMonth}`,
    formTypes: PACKAGE_FORM_TYPES[bundle.detailKey] || [],
  }
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

        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
          <div>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1 }}>{t.journey.website} {bundle.oneOffDisplay}</span>
          </div>
          <div>
            <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>€{bundle.monthly}</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{t.labels.perMonth}</span>
          </div>
        </div>

        <SavingsBadge yearly={bundle.savesYearly} upfront={bundle.savesUpfront} />

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          {t.pricing?.bundleValueNote || 'Most growing businesses get better value from a bundle.'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
          <CTAButton to="/contact" label={bundle.cta} primary />
          <BasketButton item={basketItem} />
        </div>
        <button
          type="button"
          onClick={() => setShowDetails(v => !v)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
        >
          {showDetails ? t.buttons.hideDetails : t.buttons.findOutMore}
          <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
            <ChevronDown size={12} />
          </motion.span>
        </button>
      </div>

      {/* Right — features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          {t.pricing?.everythingIncluded || 'Everything included'}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {bundle.features.map((f, i) => <FeatureItem key={i} text={f} accent />)}
        </ul>
      </div>

      {/* Find Out More — spans both columns */}
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

function BundlesSection({ reduceMotion, localizedBundles, tp }) {
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
    <section id="bundles" style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)' }}>
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
        <div>
          <SectionLabel>{tp.bundlesLabel}</SectionLabel>
          <h2 style={{ fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            {tp.bundlesTitle}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '56ch' }}>
            {tp.bundlesBody}
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
        >
          {/* Top two bundles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {before.map(b => <SmallBundleCard key={b.detailKey} bundle={b} variants={cardVariants} />)}
          </div>

          {/* Recommended — full width */}
          <RecommendedBundleCard bundle={recommended} variants={cardVariants} />

          {/* Bottom two bundles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {after.map(b => <SmallBundleCard key={b.detailKey} bundle={b} variants={cardVariants} />)}
          </div>
        </motion.div>
      </div>

      <style>{`
        .recommended-bundle-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .recommended-bundle-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA({ reduceMotion, tp }) {
  return (
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
            {tp?.ctaTag || 'Free consultation'}
          </p>
          <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            {tp?.ctaTitle || 'Not sure what you need?'}
          </h2>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
            {tp?.ctaBody || 'Start with a professional website, then choose the monthly support package that helps your business grow.'}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <CTAButton to="/contact" label={tp?.ctaPrimary || 'Get my free plan'} primary />
        </div>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            height: 40, padding: '0 var(--space-5)',
            fontSize: 'var(--text-sm)', fontWeight: 500,
            background: '#25d366', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-md)',
            transition: 'background 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
        >
          <MessageCircle size={15} />
          {tp?.ctaWhatsApp || 'Ask on WhatsApp'}
        </a>
      </motion.div>
    </section>
  )
}

// ── Section 5 — One-Off Website Setup Pricing ────────────────────────────────

function WebsiteSetupCard({ pkg, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const t = useTranslations()
  const basketItem = {
    id: pkg.detailKey,
    name: pkg.name,
    priceDisplay: `${t.labels.from} ${pkg.price} ${t.labels.oneOff}`,
    formTypes: PACKAGE_FORM_TYPES[pkg.detailKey] || ['website'],
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
        className="website-setup-featured-grid"
      >
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Badge label={pkg.badge} />
          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              {pkg.name}
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', marginBottom: 'var(--space-4)' }}>
              {t.pages.websites.bestFor} {pkg.bestFor}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
            <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>
              {t.labels.from} {pkg.price}
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            {t.pricing.websiteVatNote}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
            <CTAButton to="/contact" label={pkg.cta} primary />
            <BasketButton item={basketItem} />
          </div>
          <button
            type="button"
            onClick={() => setShowDetails(v => !v)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
          >
            {showDetails ? t.buttons.hideDetails : t.buttons.findOutMore}
            <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
              <ChevronDown size={12} />
            </motion.span>
          </button>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            {t.journey.whatsIncluded}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {pkg.features.map((f, i) => <FeatureItem key={i} text={f} accent />)}
          </ul>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              key={`fom-ws-${pkg.detailKey}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden', gridColumn: '1 / -1' }}
            >
              <FindOutMorePanel detailKey={pkg.detailKey} item={basketItem} />
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
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {pkg.name}
        </h3>
        <Badge label={pkg.badge} />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {t.labels.from} {pkg.price}
        </span>
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
        {t.pages.websites.bestFor} {pkg.bestFor}
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {pkg.features.map((f, i) => <FeatureItem key={i} text={f} />)}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
        <CTAButton to="/contact" label={pkg.cta} />
        <BasketButton item={basketItem} />
      </div>
      <button
        type="button"
        onClick={() => setShowDetails(v => !v)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-brand-400)', fontSize: 'var(--text-xs)', fontWeight: 500, padding: 0, fontFamily: 'inherit' }}
      >
        {showDetails ? t.buttons.hideDetails : t.buttons.findOutMore}
        <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
          <ChevronDown size={12} />
        </motion.span>
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key={`fom-ws-std-${pkg.detailKey}`}
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

function WebsiteSetupSection({ reduceMotion, localizedWebsites, tp }) {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: reduceMotion ? 0 : 0.05 } },
  }
  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  }

  const featured = localizedWebsites.find(p => p.featured)
  const before = localizedWebsites.filter(p => !p.featured).slice(0, 2)
  const after = localizedWebsites.filter(p => !p.featured).slice(2)

  return (
    <section id="websites" style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

        <div>
          <SectionLabel>{tp?.websitesLabel || 'One-Off Website Setup Pricing'}</SectionLabel>
          <h2 style={{ fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            {tp?.websitesTitle || 'Choose the level of website your business needs'}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '62ch' }}>
            {tp?.websitesBody || 'These are one-off starting prices for the initial website build only. Ongoing support, bundles and monthly services are separate.'}
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {before.map(p => <WebsiteSetupCard key={p.detailKey} pkg={p} variants={cardVariants} />)}
          </div>

          <WebsiteSetupCard pkg={featured} variants={cardVariants} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {after.map(p => <WebsiteSetupCard key={p.detailKey} pkg={p} variants={cardVariants} />)}
          </div>
        </motion.div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', maxWidth: '72ch' }}>
          {tp?.websiteVatNote || 'All website prices are starting prices for the initial setup only. Final pricing depends on pages, content requirements, design complexity and integrations.'}
        </p>
      </div>

      <style>{`
        .website-setup-featured-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .website-setup-featured-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  const tp = t.pricing

  // Localize add-ons data
  const localizedAddOns = addOns.map((a, i) => {
    const td = t.pricingAddons?.[i]
    if (!td) return a
    return { ...a, name: td.name, description: td.description, features: td.features }
  })

  // Reuse existing bundle + website translations
  const localizedBundles = bundles.map((b, i) => {
    const td = t.bundleData?.[i]
    if (!td) return b
    return { ...b, name: td.name, description: td.description, features: td.features, cta: td.cta }
  })

  const localizedWebsites = websiteSetupPackages.map((p, i) => {
    const td = t.websiteData?.[i]
    if (!td) return p
    return { ...p, name: td.name, bestFor: td.bestFor, features: td.features, cta: td.cta }
  })

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={tp.tag}
        title={tp.title}
        description={tp.description}
      />
      <AddOnsSection reduceMotion={reduceMotion} localizedAddOns={localizedAddOns} tp={tp} />
      <BundlesSection reduceMotion={reduceMotion} localizedBundles={localizedBundles} tp={tp} />
      <WebsiteSetupSection reduceMotion={reduceMotion} localizedWebsites={localizedWebsites} tp={tp} />
      <FinalCTA reduceMotion={reduceMotion} tp={tp} />
    </main>
  )
}
