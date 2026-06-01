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

const ShaderAnimation = lazy(() =>
  import('../components/ShaderAnimation').then((m) => ({ default: m.ShaderAnimation }))
)

// ── Data ─────────────────────────────────────────────────────────────────────

const industries = [
  { icon: HomeIcon,        label: 'Villa Rentals',     href: '/industries#villa-rentals' },
  { icon: Dumbbell,        label: 'Gyms & Fitness',    href: '/industries#gyms-fitness' },
  { icon: UtensilsCrossed, label: 'Restaurants',       href: '/industries#restaurants' },
  { icon: Coffee,          label: 'Cafés',             href: '/industries#cafes' },
  { icon: Scissors,        label: 'Hair & Beauty',     href: '/industries#hair-beauty' },
  { icon: Map,             label: 'Tourism Companies', href: '/industries#tourism' },
  { icon: Car,             label: 'Car Hire',          href: '/industries#car-hire' },
  { icon: Anchor,          label: 'Boat Hire',         href: '/industries#boat-hire' },
]

const steps = [
  { icon: Globe,        number: 1, title: 'Choose your website',    description: 'Start by selecting the type of website you need.' },
  { icon: Package,      number: 2, title: 'Choose your package',    description: 'Pick the setup or service option that best fits your business.' },
  { icon: Layers,       number: 3, title: 'Add a monthly bundle',   description: 'Add ongoing support, updates, hosting help or digital growth support if needed.' },
  { icon: PlusCircle,   number: 4, title: 'Add optional extras',    description: 'Bolt on extra features such as storage, extra pages, forms, automation or additional functionality.' },
  { icon: FileText,     number: 5, title: 'Review and complete',    description: 'Review your selections, then add fixed-price items to basket, buy online, or request a tailored quote if your setup needs a recommendation.' },
]

const quickChoiceItems = [
  {
    icon: Globe,
    category: 'Websites',
    title: 'Get a professional website',
    description: 'One-off website setup packages for businesses that need a professional online presence — from a single-page launch site to a full premium build.',
    cta: 'View Website Packages',
    href: '/websites',
  },
  {
    icon: Package,
    category: 'Packages',
    title: 'Add individual monthly services',
    description: 'Hosting care, social content, AI marketing, automation, video content and proposal tools — add exactly the services your business needs.',
    cta: 'View Service Packages',
    href: '/packages',
  },
  {
    icon: Layers,
    category: 'Bundles',
    title: 'Everything together in one bundle',
    description: 'Combined monthly support packages covering website, content, marketing, automation and growth — all managed for you, for one monthly price.',
    cta: 'View Bundles',
    href: '/bundles',
  },
]

const trustPoints = [
  {
    icon: TrendingUp,
    title: 'Built to convert visitors into customers',
    body: 'Every page, automation and content block is designed to move visitors toward a booking, enquiry or purchase — not just look good.',
  },
  {
    icon: Zap,
    title: 'Live in 7 days, managed via one message',
    body: 'Your website goes live within a week. Every update, report or request is handled via a single WhatsApp message — no dashboards to learn.',
  },
  {
    icon: Bot,
    title: 'AI-powered at a fraction of agency cost',
    body: 'We use AI to handle writing, design and automation — delivering agency quality at a price that makes sense for businesses with real margins.',
  },
]

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

// ── Top 3 Recommended Packages ────────────────────────────────────────────────

const topPackages = [
  {
    name: 'Basic Launch Website',
    bestFor: 'Businesses that just need to get online professionally',
    price: '€450',
    priceNote: 'one-off',
    cta: 'View Basic Website',
    href: '/websites',
    recommended: false,
  },
  {
    name: 'Business Website',
    bestFor: 'Businesses that want a proper professional website',
    price: '€1,200',
    priceNote: 'one-off',
    cta: 'View Business Website',
    href: '/websites',
    recommended: true,
  },
  {
    name: 'Hosting & Website Care',
    bestFor: 'Businesses wanting hosting and ongoing technical care',
    price: '€30',
    priceNote: '/month',
    cta: 'View Add-ons',
    href: '/addons',
    recommended: false,
  },
]

function TopPackagesSection({ reduceMotion, stagger, cardVariants }) {
  return (
    <Section
      style={{ background: 'var(--surface-base)', borderBottom: '1px solid var(--border-default)' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
        <SectionHeader
          tag="Start here"
          title="Start with the right package"
          description="Three popular starting points — choose the one that fits where your business is right now."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
        >
          {topPackages.map((pkg) => (
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
                  Recommended
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
              Now taking new clients
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
              AI-powered websites, content and automation for businesses that want to{' '}
              <span style={{ background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>grow online.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(var(--text-base), 2vw, var(--text-md))',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '54ch',
              }}
            >
              Choose a website, package or bundle, send us your details, and we'll help you build a stronger digital presence without unnecessary back-and-forth.
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
              Start Your Journey <ArrowRight size={15} />
            </Link>
            <Link
              to="/websites"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = 'none' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View Websites
            </Link>
            <Link
              to="/bundles"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = 'none' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View Monthly Bundles
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: reduceMotion ? 0 : 0.22 }}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {['Websites from €450', 'Live in 5–7 days', 'WhatsApp-managed', 'No tech skills needed'].map((item) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-brand-500)', flexShrink: 0 }} />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── b) Top 3 Recommended Packages ── */}
      <TopPackagesSection reduceMotion={reduceMotion} stagger={stagger} cardVariants={cardVariants} />

      {/* ── c) Quick Choice ── */}
      <Section
        id="get-started"
        style={{ background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader
            tag="Get started"
            title="What do you need help with?"
            description="Choose the option that best matches what your business needs right now."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
          >
            {quickChoiceItems.map((item) => (
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
                  <item.icon size={24} />
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
                  to={item.href}
                  style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-brand-400)', transition: 'color 120ms ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-200)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-400)' }}
                >
                  {item.cta} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
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
              Ready to grow?
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-xl), 4vw, var(--text-2xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Build a stronger digital presence
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              Choose your package, send us your details, and we'll handle everything from there — no back-and-forth, no unnecessary meetings.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/quote"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', transition: 'filter 120ms ease, box-shadow 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Get a Quote Today
            </Link>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)', transition: 'background 120ms ease, color 120ms ease, border 120ms ease, transform 60ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = '1px solid transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── e) Built for businesses / Industries ── */}
      <Section style={{ background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader
            tag="Industries"
            title="Built for businesses that want to look professional online"
            description="We work with the businesses that depend on their online presence to attract customers and grow."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            {industries.map((ind) => (
              <Link key={ind.label} to={ind.href} style={{ textDecoration: 'none', display: 'block' }}>
                <IndustryCard icon={ind.icon} label={ind.label} />
              </Link>
            ))}
          </motion.div>
          <Link
            to="/industries"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-brand-400)', transition: 'color 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-200)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-400)' }}
          >
            See all industries <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      {/* ── f) From package to launch in 5 steps ── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-16)' }}>
          <SectionHeader
            tag="How it works"
            title="From package to launch in 5 steps"
            description="A simple, predictable process — no long briefs, no meetings, no waiting weeks."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full"
          >
            {steps.map((step, i) => (
              <StepCard
                key={step.number}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isLast={i === steps.length - 1}
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
            {[
              { stat: '5–7 days', label: 'Average website build time' },
              { stat: '€450',    label: 'Starting price for a website' },
              { stat: '24 hrs',  label: 'Response time for updates' },
            ].map(({ stat, label }) => (
              <div key={stat} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>{stat}</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Differentiators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>Why GO AI</p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {trustPoints.map(({ icon: Icon, title, body }) => (
                <motion.div key={title} variants={cardVariants} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)' }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, lineHeight: 1.2, color: 'var(--text-primary)' }}>{title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

    </main>
  )
}
