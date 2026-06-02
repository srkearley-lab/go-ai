import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MapPin, Clock, ArrowUpRight, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useTranslations } from '../context/LanguageContext'

const WHATSAPP = '#'

// ── Portfolio data ────────────────────────────────────────────────────────────
// accentColor = the simulated brand CTA colour inside each mockup preview

const items = [
  {
    id: 1,
    name: 'Santorini Dream Villas',
    url: 'santorindreamvillas.gr',
    industry: 'Villa Rentals',
    location: 'Santorini',
    deliveredIn: '6 days',
    services: ['Website', 'WhatsApp Bot', 'Email Automation', 'SEO'],
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    accentColor: '#3a8fb5',
  },
  {
    id: 2,
    name: 'Pita & Soul',
    url: 'pitaandsoul.gr',
    industry: 'Restaurants',
    location: 'Athens',
    deliveredIn: '5 days',
    services: ['Website', 'Google SEO', 'Review Automation'],
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    accentColor: '#c07a38',
  },
  {
    id: 3,
    name: 'Corfu Fitness Club',
    url: 'corfufitnessclub.gr',
    industry: 'Gyms & Fitness',
    location: 'Corfu',
    deliveredIn: '7 days',
    services: ['Website', 'Email Automation', 'WhatsApp Reminders', 'SEO'],
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    accentColor: '#4a6cf7',
  },
  {
    id: 4,
    name: 'Blue Bean Café',
    url: 'blubeancafe.gr',
    industry: 'Cafés',
    location: 'Thessaloniki',
    deliveredIn: '4 days',
    services: ['Website', 'Google Business', 'Instagram Content'],
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    accentColor: '#7a4f2e',
  },
  {
    id: 5,
    name: 'GLOW Beauty Studio',
    url: 'glowbeautystudio.gr',
    industry: 'Hair & Beauty',
    location: 'Athens',
    deliveredIn: '5 days',
    services: ['Website', 'WhatsApp Reminders', 'Rebooking Flow', 'SEO'],
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    accentColor: '#b57b82',
  },
  {
    id: 6,
    name: 'Aegean Discovery Tours',
    url: 'aegeandiscovery.gr',
    industry: 'Tourism',
    location: 'Mykonos',
    deliveredIn: '7 days',
    services: ['Website', 'AI Proposals', 'WhatsApp Bot', 'SEO', 'Video Ads'],
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    accentColor: '#2a9d8f',
  },
  {
    id: 7,
    name: 'Hellas Wheels',
    url: 'hellaswheels.gr',
    industry: 'Car Hire',
    location: 'Heraklion, Crete',
    deliveredIn: '6 days',
    services: ['Website', 'Google Ads', 'WhatsApp Booking', 'SEO'],
    heroImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
    accentColor: '#4d6475',
  },
  {
    id: 8,
    name: 'Azure Charters',
    url: 'azurecharters.gr',
    industry: 'Boat Hire',
    location: 'Rhodes',
    deliveredIn: '7 days',
    services: ['Website', 'AI Proposals', 'WhatsApp Bot', 'Video Ads', 'SEO'],
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    accentColor: '#2c5f8a',
  },
  {
    id: 9,
    name: 'Villa Mila',
    url: 'villamila.gr',
    industry: 'Villa Rentals',
    location: 'Mykonos',
    deliveredIn: '5 days',
    services: ['Website', 'Email Automation', 'SEO', 'AI Proposals'],
    heroImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80',
    accentColor: '#5a8fa8',
  },
  {
    id: 10,
    name: 'The Olive Table',
    url: 'theolivetable.gr',
    industry: 'Restaurants',
    location: 'Chania, Crete',
    deliveredIn: '4 days',
    services: ['Website', 'Google SEO', 'Video Ads', 'Email Campaigns'],
    heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80',
    accentColor: '#8b5e3c',
  },
  {
    id: 11,
    name: 'Body Lab Athens',
    url: 'bodylabathens.gr',
    industry: 'Gyms & Fitness',
    location: 'Athens',
    deliveredIn: '6 days',
    services: ['Website', 'Email Automation', 'Video Ads', 'SEO'],
    heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    accentColor: '#3d5a80',
  },
  {
    id: 12,
    name: 'Sunset Sails',
    url: 'sunsetsails.gr',
    industry: 'Boat Hire',
    location: 'Santorini',
    deliveredIn: '5 days',
    services: ['Website', 'WhatsApp Bot', 'AI Proposals', 'SEO'],
    heroImage: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=600&q=80',
    accentColor: '#c07b4a',
  },
]

const allIndustries = ['All', ...Array.from(new Set(items.map((i) => i.industry)))]

// ── Browser mockup ────────────────────────────────────────────────────────────

function BrowserMockup({ item }) {
  return (
    <div
      style={{
        background: '#12141f',
        borderBottom: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          height: 28,
          background: '#1c1e2e',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--space-3)',
          gap: 'var(--space-2)',
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
        ))}
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            height: 16,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 'var(--radius-sm)',
            marginLeft: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'var(--space-2)',
          }}
        >
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.01em' }}>
            {item.url}
          </span>
        </div>
      </div>

      {/* Site preview */}
      <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
        {/* Hero section with real image */}
        <div style={{ position: 'absolute', inset: 0, height: 136 }}>
          <img
            src={item.heroImage}
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)' }} />

          {/* Simulated nav */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 12px',
            }}
          >
            <div style={{ width: 36, height: 5, background: 'rgba(255,255,255,0.8)', borderRadius: 2 }} />
            <div style={{ display: 'flex', gap: 6 }}>
              {[22, 18, 22, 26].map((w, i) => (
                <div key={i} style={{ width: w, height: 4, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
              ))}
            </div>
          </div>

          {/* Simulated hero text + CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: 16, left: 12,
              display: 'flex', flexDirection: 'column', gap: 5,
            }}
          >
            <div style={{ width: 110, height: 7, background: 'rgba(255,255,255,0.92)', borderRadius: 2 }} />
            <div style={{ width: 78, height: 5, background: 'rgba(255,255,255,0.55)', borderRadius: 2 }} />
            <div
              style={{
                marginTop: 2,
                width: 52, height: 16,
                background: item.accentColor,
                borderRadius: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{ width: 28, height: 4, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* Below-fold content rows */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 64,
            background: '#191b2a',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          {/* Three feature blocks */}
          <div style={{ display: 'flex', gap: 5 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 28,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 4,
                }}
              />
            ))}
          </div>
          {/* Text rows */}
          <div style={{ width: '55%', height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }} />
          <div style={{ width: '38%', height: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

// ── Portfolio card ────────────────────────────────────────────────────────────

function PortfolioCard({ item, viewDemoLabel }) {
  const [hovered, setHovered] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      layout
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={reduceMotion ? {} : { y: -3, transition: { duration: 0.15 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface-raised)',
        border: `1px solid ${hovered ? 'var(--border-strong)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'none',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
    >
      {/* Browser mockup with hover overlay */}
      <div style={{ position: 'relative' }}>
        <BrowserMockup item={item} />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(8,12,24,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
        >
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
              height: 36, padding: '0 var(--space-5)',
              fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--color-neutral-0)',
              background: 'var(--color-brand-500)',
              border: '1px solid var(--color-brand-600)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            viewDemoLabel
            <ArrowUpRight size={14} />
          </div>
        </motion.div>
      </div>

      {/* Card footer */}
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {/* Name + industry */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {item.name}
          </h3>
          <span
            style={{
              fontSize: 'var(--text-xs)', fontWeight: 500,
              color: 'var(--color-brand-400)',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px var(--space-2)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {item.industry}
          </span>
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            <MapPin size={11} />
            {item.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            <Clock size={11} />
            {item.deliveredIn}
          </span>
        </div>

        {/* Service tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
          {item.services.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 10,
                color: 'var(--text-tertiary)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 6px',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Filter bar ────────────────────────────────────────────────────────────────

function FilterBar({ active, onChange, industries, industryMap, allLabel }) {
  return (
    <div
      style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: 2,
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-2)', minWidth: 'max-content' }}>
        {industries.map((ind) => {
          const isActive = active === ind
          const displayLabel = ind === 'All' ? allLabel : (industryMap?.[ind] || ind)
          return (
            <button
              key={ind}
              onClick={() => onChange(ind)}
              style={{
                height: 34,
                padding: '0 var(--space-4)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
                background: isActive ? 'var(--color-brand-500)' : 'transparent',
                color: isActive ? 'var(--color-neutral-0)' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--color-brand-600)' : '1px solid var(--border-default)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'var(--surface-raised)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {displayLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  const tp = t.portfolio

  const allFilter = tp.all
  const allIndustriesTranslated = ['All', ...Array.from(new Set(items.map((i) => i.industry)))]

  const filtered = useMemo(
    () => (activeFilter === 'All' ? items : items.filter((i) => i.industry === activeFilter)),
    [activeFilter]
  )

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: 0 } },
  }

  const projectCount = filtered.length
  const projectLabel = projectCount === 1 ? tp.projectSingular : tp.projectPlural

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={tp.tag}
        title={tp.title}
        description={tp.description}
      />

      {/* ── Grid section ── */}
      <section style={{ padding: 'var(--space-16) var(--space-8) var(--space-20)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

          {/* Filter + count row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <FilterBar active={activeFilter} onChange={setActiveFilter} industries={allIndustriesTranslated} industryMap={tp.industryMap} allLabel={allFilter} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', flexShrink: 0 }}>
              {projectCount} {projectLabel}
            </span>
          </div>

          {/* Cards — key on activeFilter causes re-mount + stagger on each filter change */}
          <motion.div
            key={activeFilter}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <PortfolioCard key={item.id} item={item} viewDemoLabel={tp.viewDemo} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Process callout ── */}
      <section
        style={{
          padding: 'var(--space-16) var(--space-8)',
          background: 'var(--surface-subtle)',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--width-xl)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-8)',
          }}
        >
          {tp.stats.map(({ stat, label }) => (
            <motion.div
              key={stat}
              initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
            >
              <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
                {stat}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', background: 'var(--surface-base)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 'var(--width-md)',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 'var(--space-8)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-500)' }}>
              {tp.ctaTag}
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {tp.ctaTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              {tp.ctaBody}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/contact"
              style={{
                height: 44, padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: 'var(--color-brand-500)',
                color: 'var(--color-neutral-0)',
                border: '1px solid var(--color-brand-600)',
                borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease, transform 60ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {tp.ctaPrimary}
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{
                height: 44, padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: '#25d366', color: '#fff',
                border: 'none', borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease, transform 60ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <MessageCircle size={16} />
              {tp.ctaWhatsApp}
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
