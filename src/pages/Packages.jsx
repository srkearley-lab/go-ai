import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, ShoppingCart, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import WhatsDifferenceStrip from '../components/WhatsDifferenceStrip'
import { useBasket, PACKAGE_FORM_TYPES } from '../context/BasketContext'
import { packageDetails } from '../data/packageDetails'

const WHATSAPP = '#'

// ── Service packages data ─────────────────────────────────────────────────────

const servicePackages = [
  {
    id: 'Website Design',
    name: 'Website Design',
    priceDisplay: '€450',
    priceNote: 'one-off website build',
    description: 'GoAI builds modern, professional, mobile-friendly websites that help businesses look credible and generate enquiries.',
    features: ['Custom mobile-responsive design', 'Lead capture and contact forms', 'Basic SEO setup included', 'Google Analytics integration'],
  },
  {
    id: 'SEO',
    name: 'SEO',
    priceDisplay: '€150/month',
    priceNote: 'ongoing SEO management',
    description: 'Basic SEO setup including page titles, meta descriptions, structure, keywords and visibility foundations.',
    features: ['Page titles and meta descriptions', 'Keyword research and targeting', 'Google Search Console setup', 'Monthly ranking monitoring'],
  },
  {
    id: 'WhatsApp Automation',
    name: 'WhatsApp Automation',
    priceDisplay: '€250 setup + €150/mo',
    priceNote: 'setup fee + monthly',
    description: 'Enquiry capture, WhatsApp lead routing, auto-replies, notifications and simple workflow automation.',
    features: ['Auto-reply to enquiries', 'Lead routing to your phone', 'Booking confirmation messages', 'Workflow automation'],
  },
  {
    id: 'Email Automation',
    name: 'Email Automation',
    priceDisplay: '€150 setup + €100/mo',
    priceNote: 'setup fee + monthly',
    description: 'Automated follow-ups, enquiry responses, lead nurturing, campaign emails and customer communication workflows.',
    features: ['Automated follow-up sequences', 'Enquiry response flows', 'Lead nurturing campaigns', 'Email platform setup included'],
  },
  {
    id: 'Video Websites',
    name: 'Video Websites',
    priceDisplay: '€500',
    priceNote: 'one-off build',
    description: 'Video-led website sections, video landing pages, avatar/video content areas and video-first sales pages.',
    features: ['Video hero sections and backgrounds', 'Video landing page design', 'AI avatar content integration', 'Mobile-optimised video display'],
  },
  {
    id: 'AI Prompts',
    name: 'AI Prompts',
    priceDisplay: '€200',
    priceNote: 'one-off prompt pack',
    description: 'Tailored AI prompts for business workflows, content creation, marketing, customer replies, admin tasks and sales support.',
    features: ['Custom AI prompt library', 'Content creation templates', 'Customer reply frameworks', 'Sales and admin support scripts'],
  },
  {
    id: 'Hosting & Website Care',
    displayName: 'Hosting and Web Care',
    priceDisplay: '€100/month',
    priceNote: 'Setup included with website',
    description: 'Your website stays fast, secure and up to date every month — no technical headaches.',
    features: ['Reliable managed hosting', 'Security monitoring and backups', 'Up to 2 hrs content updates/month', 'Performance monitoring'],
  },
  {
    id: 'Social Media Content',
    name: 'Social Media Content',
    priceDisplay: '€150/month',
    priceNote: 'Setup included',
    description: 'Consistent social media presence without lifting a finger.',
    features: ['12 posts/month across 2 platforms', 'Captions, hashtags, scheduling', 'Content calendar planned ahead', 'Designed to drive local enquiries'],
  },
  {
    id: 'AI Content & Marketing',
    name: 'AI Content and Marketing',
    priceDisplay: '€250/month',
    priceNote: 'Setup included',
    description: 'Keep your website fresh and your Google ranking growing month after month.',
    features: ['Monthly SEO blog posts', 'Email newsletter campaigns', 'Google ranking monitoring', 'Monthly performance report'],
  },
  {
    id: 'AI Automation',
    name: 'AI Automation',
    priceDisplay: '€300/month',
    priceNote: '+ €250 one-off setup',
    description: 'Turn enquiries into bookings automatically, 24/7.',
    features: ['WhatsApp enquiry bot', 'Email follow-up sequences', 'CRM lead tracking', 'No-code dashboard to update replies'],
  },
  {
    id: 'AI Avatar & Video Content',
    name: 'AI Avatar and Video Content',
    priceDisplay: '€300/month',
    priceNote: '+ €250 one-off setup',
    description: 'Stand out on social media with AI-generated video content.',
    features: ['8 AI videos/month', 'Custom digital avatar creation', 'Subtitles in English and Greek', 'Optimised for Instagram and TikTok'],
  },
  {
    id: 'Proposal & Sales Documents',
    name: 'Proposal and Sales Documents',
    priceDisplay: '€200/month',
    priceNote: '+ €200 one-off setup',
    description: 'Send polished proposals to prospects in minutes, not hours.',
    features: ['AI-generated proposals in minutes', 'Branded quotes and contracts', 'Digital signature support', 'Automated follow-up sequences'],
  },
]

// ── Shared helpers ────────────────────────────────────────────────────────────

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
        ? <><Check size={11} strokeWidth={3} /> In Basket</>
        : <><ShoppingCart size={11} /> Add to Basket</>}
    </button>
  )
}

// ── Find Out More panel ───────────────────────────────────────────────────────

function FindOutMorePanel({ detailKey, item }) {
  const details = packageDetails[detailKey]
  if (!details) return null

  return (
    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-3)' }}>
          {details.headline}
        </h4>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {details.overview}
        </p>
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
                <span style={{ color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 2 }}>→</span>
                {i}
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
          Start This Service <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

// ── Package card ──────────────────────────────────────────────────────────────

function PackageCard({ pkg, variants }) {
  const [showDetails, setShowDetails] = useState(false)
  const displayName = pkg.displayName || pkg.name || pkg.id
  const basketItem = {
    id: pkg.id,
    name: displayName,
    priceDisplay: pkg.priceDisplay,
    formTypes: PACKAGE_FORM_TYPES[pkg.id] || [],
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
          {pkg.description}
        </p>
      </div>

      <div>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {pkg.priceDisplay}
        </span>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
          {pkg.priceNote}
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {pkg.features.map(f => <FeatureItem key={f} text={f} />)}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
        <BasketButton item={basketItem} />
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

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key={`fom-${pkg.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <FindOutMorePanel detailKey={pkg.id} item={basketItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Packages() {
  const reduceMotion = useReducedMotion()

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
        tag="Packages"
        title="Service Packages"
        description="Choose individual services such as website design, SEO, automation, content, video and AI support."
      />

      <WhatsDifferenceStrip activePage="packages" insideJourney={false} />

      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

          {/* Packages vs Add-ons clarity */}
          <div style={{
            background: 'var(--surface-raised)',
            border: '1px solid var(--goai-violet)',
            borderLeft: '3px solid var(--goai-violet)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5) var(--space-6)',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
          }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--goai-violet)', margin: 0 }}>
              Packages vs Add-ons
            </p>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
              Packages are fixed-price website and service options with a clear scope. If you only need a smaller extra — such as hosting care, extra storage, forms, tracking, WhatsApp setup, or content support — <Link to="/addons" style={{ color: 'var(--goai-violet)', fontWeight: 500 }}>visit Add-ons</Link>.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {servicePackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} variants={cardVariants} />
            ))}
          </motion.div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            All prices exclude Greek VAT (24%). Custom plans available for larger businesses.
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
              Not sure which services you need?
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Also available as monthly bundles
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              Combine website setup with monthly services and save. View our bundled packages for better value.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/bundles"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
            >
              View Monthly Bundles
            </Link>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = '1px solid transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
            >
              Talk to Us
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
