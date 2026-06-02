import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Globe, Package, Layers, FileText, PlusCircle,
  Home as HomeIcon, Dumbbell, UtensilsCrossed, Coffee,
  Scissors, Map, Car, Anchor,
  MessageSquare, Zap, MessageCircle,
  ArrowRight, TrendingUp, Bot,
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { useSEO } from '../lib/seo'
import IndustryCard from '../components/IndustryCard'
import StepCard from '../components/StepCard'
import { useTranslations } from '../context/LanguageContext'

const ShaderAnimation = lazy(() =>
  import('../components/ShaderAnimation').then((m) => ({ default: m.ShaderAnimation }))
)

// ── Static metadata (icons + hrefs only — text comes from translations) ────────

const INDUSTRY_META = [
  { icon: HomeIcon,        href: '/industries#villa-rentals' },
  { icon: Dumbbell,        href: '/industries#gyms-fitness' },
  { icon: UtensilsCrossed, href: '/industries#restaurants' },
  { icon: Coffee,          href: '/industries#cafes' },
  { icon: Scissors,        href: '/industries#hair-beauty' },
  { icon: Map,             href: '/industries#tourism' },
  { icon: Car,             href: '/industries#car-hire' },
  { icon: Anchor,          href: '/industries#boat-hire' },
]

const STEP_ICONS = [Globe, Package, Layers, PlusCircle, FileText]

const QUICK_CHOICE_ICONS = [Globe, Package, Layers]
const QUICK_CHOICE_HREFS = ['/websites', '/packages', '/bundles']

const TOP_PACKAGES_PRICES = ['€450', '€1,200', '€30']
const TOP_PACKAGES_HREFS  = ['/websites', '/websites', '/addons']

const TRUST_ICONS = [TrendingUp, Zap, Bot]

// ── Shared section wrapper ────────────────────────────────────────────────────

function Section({ children, style, id }) {
  return (
    <section id={id} style={{ padding: 'var(--space-20) var(--space-8)', ...style }}>
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

const TOP_PACKAGES_RECOMMENDED = [false, true, false]

function TopPackagesSection({ reduceMotion, stagger, cardVariants, t }) {
  const pkgs = t.home.topPackages.map((p, i) => ({
    ...p,
    price: TOP_PACKAGES_PRICES[i],
    href:  TOP_PACKAGES_HREFS[i],
    recommended: TOP_PACKAGES_RECOMMENDED[i],
  }))

  return (
    <Section
      style={{ background: 'var(--surface-base)', borderBottom: '1px solid var(--border-default)' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
        <SectionHeader
          tag={t.home.startTag}
          title={t.home.startTitle}
          description={t.home.startBody}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
        >
          {pkgs.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={cardVariants}
              style={{
                background: pkg.recommended ? 'var(--surface-overlay)' : 'var(--surface-raised)',
                border: pkg.recommended ? '2px solid var(--goai-violet)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
                position: 'relative',
                boxShadow: pkg.recommended ? '0 0 30px rgba(118, 39, 239, 0.35)' : 'none',
                transition: 'border-color 150ms ease, box-shadow 150ms ease',
              }}
              onMouseEnter={(e) => {
                if (!pkg.recommended) {
                  e.currentTarget.style.borderColor = 'var(--color-brand-500)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                }
              }}
              onMouseLeave={(e) => {
                if (!pkg.recommended) {
                  e.currentTarget.style.borderColor = 'var(--border-default)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              {pkg.recommended && (
                <span style={{
                  position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)',
                  display: 'inline-flex', alignItems: 'center',
                  fontSize: 'var(--text-xs)', fontWeight: 600,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-full)', padding: '3px var(--space-3)',
                  boxShadow: '0 0 12px rgba(118, 39, 239, 0.4)',
                }}>
                  {t.labels.recommended}
                </span>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', letterSpacing: '-0.01em', paddingRight: pkg.recommended ? 'var(--space-16)' : 0 }}>
                  {pkg.name}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {pkg.bestFor}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
                  {pkg.price}
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{pkg.priceNote}</span>
              </div>

              <Link
                to={pkg.href}
                style={{
                  marginTop: 'auto',
                  height: 40, padding: '0 var(--space-5)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 0 20px rgba(118, 39, 239, 0.25)',
                  transition: 'filter 120ms ease, box-shadow 120ms ease, transform 60ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.45)' }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118, 39, 239, 0.25)' }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {pkg.cta} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  useSEO({
    title: 'GO AI — AI-powered websites, content and automation',
    description: 'GO AI builds professional websites, AI-powered content systems, automation and monthly growth packages for businesses that want to look professional online and turn visitors into customers.',
  })

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: reduceMotion ? 0 : 0.08 } },
  }

  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main style={{ paddingTop: 64 }}>

      {/* ── a) Hero ── */}
      <section
        style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-20) var(--space-8)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Suspense fallback={<div style={{ position: 'absolute', inset: 0, background: '#000' }} />}>
          <ShaderAnimation />
        </Suspense>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, var(--surface-base) 75%)', pointerEvents: 'none' }} />

        <div
          style={{
            position: 'relative', zIndex: 1,
            maxWidth: 'var(--width-lg)', margin: '0 auto',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 'var(--space-8)',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-secondary)', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-4)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', flexShrink: 0 }} />
              {t.home.badge}
            </span>
          </motion.div>

          {/* Headline + subheading */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'center' }}
          >
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 4.5vw, var(--text-3xl))',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                maxWidth: '20ch',
              }}
            >
              {t.home.headlinePlain}{' '}
              <span style={{ background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.home.headlineGradient}</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(var(--text-base), 2vw, var(--text-md))',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '54ch',
              }}
            >
              {t.home.subheading}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: reduceMotion ? 0 : 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}
          >
            <Link
              to="/journey"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {t.home.ctaJourney} <ArrowRight size={15} />
            </Link>
            <Link
              to="/websites"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = 'none' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {t.home.ctaWebsites}
            </Link>
            <Link
              to="/bundles"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = 'none' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {t.home.ctaBundles}
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: reduceMotion ? 0 : 0.22 }}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {t.home.socialProof.map((item) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-brand-500)', flexShrink: 0 }} />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── b) Top 3 Recommended Packages ── */}
      <TopPackagesSection reduceMotion={reduceMotion} stagger={stagger} cardVariants={cardVariants} t={t} />

      {/* ── c) Quick Choice ── */}
      <Section
        id="get-started"
        style={{ background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader
            tag={t.home.getStartedTag}
            title={t.home.getStartedTitle}
            description={t.home.getStartedBody}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
          >
            {t.home.quickChoiceItems.map((item, i) => {
              const Icon = QUICK_CHOICE_ICONS[i]
              return (
                <motion.div
                  key={item.category}
                  variants={cardVariants}
                  style={{
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-8)',
                    display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
                    transition: 'border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
                  }}
                  whileHover={reduceMotion ? {} : { y: -3, transition: { duration: 0.15 } }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-brand-500)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 52, height: 52, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)' }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                  <Link
                    to={QUICK_CHOICE_HREFS[i]}
                    style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-brand-400)', transition: 'color 120ms ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-200)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-400)' }}
                  >
                    {item.cta} <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Section>

      {/* ── d) Build a stronger digital presence ── */}
      <section style={{ background: 'var(--surface-raised)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-20) var(--space-8)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-500)' }}>
              {t.home.readyTag}
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-xl), 4vw, var(--text-2xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {t.home.readyTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              {t.home.readyBody}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/request-quote"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {t.home.getQuoteToday}
            </Link>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = '1px solid transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {t.home.contactUs}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── e) Built for businesses / Industries ── */}
      <Section style={{ background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader
            tag={t.home.industriesTag}
            title={t.home.industriesTitle}
            description={t.home.industriesBody}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            {INDUSTRY_META.map((meta, i) => (
              <Link key={meta.href} to={meta.href} style={{ textDecoration: 'none', display: 'block' }}>
                <IndustryCard icon={meta.icon} label={t.home.industryLabels[i]} />
              </Link>
            ))}
          </motion.div>
          <Link
            to="/industries"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-brand-400)', transition: 'color 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-200)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-400)' }}
          >
            {t.home.viewAllIndustries} <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      {/* ── f) From package to launch in 5 steps ── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-16)' }}>
          <SectionHeader
            tag={t.home.howItWorksTag}
            title={t.home.howItWorksTitle}
            description={t.home.howItWorksBody}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full"
          >
            {t.home.steps.map((step, i) => (
              <StepCard
                key={i}
                number={i + 1}
                icon={STEP_ICONS[i]}
                title={step.title}
                description={step.description}
                isLast={i === t.home.steps.length - 1}
              />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── g) Why GoAI trust section ── */}
      <Section style={{ background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
          {/* Stats row */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {t.home.statsRow.map(({ stat, label }) => (
              <div key={stat} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>{stat}</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Differentiators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>{t.home.whyGoAI}</p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {t.home.trustPoints.map(({ title, body }, i) => {
                const Icon = TRUST_ICONS[i]
                return (
                  <motion.div key={title} variants={cardVariants} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div style={{ width: 44, height: 44, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)' }}>
                      <Icon size={20} />
                    </div>
                    <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, lineHeight: 1.2, color: 'var(--text-primary)' }}>{title}</h3>
                    <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{body}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </Section>

    </main>
  )
}
