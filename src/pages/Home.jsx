import { useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Globe, FileText, Search, Mail, Video, MessageCircle,
  Home as HomeIcon, Dumbbell, UtensilsCrossed, Coffee,
  Scissors, Map, Car, Anchor,
  MessageSquare, Zap, ArrowRight,
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import IndustryCard from '../components/IndustryCard'
import StepCard from '../components/StepCard'
const ShaderAnimation = lazy(() =>
  import('../components/ShaderAnimation').then((m) => ({ default: m.ShaderAnimation }))
)

const ContainerScrollLazy = lazy(() =>
  import('../components/ContainerScroll').then((m) => ({ default: m.ContainerScroll }))
)

const WHATSAPP = '#'

// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { icon: Globe,          title: 'Websites',          description: 'Fast, mobile-first websites designed to convert visitors into bookings and enquiries — built in under 7 days.' },
  { icon: FileText,       title: 'AI Proposals',       description: 'Professional proposals generated in minutes and sent directly to your clients — personalised, polished, on brand.' },
  { icon: Search,         title: 'Local SEO',          description: 'Get found on Google by people searching in your area. We handle keywords, schema, maps and monthly reporting.' },
  { icon: Mail,           title: 'Email Automation',   description: 'Welcome flows, follow-up sequences, and seasonal campaigns — all automated so you never miss a lead.' },
  { icon: Video,          title: 'Video Ads',          description: 'Short-form video content for Instagram and TikTok — scripted, edited and optimised to drive local enquiries.' },
  { icon: MessageCircle,  title: 'WhatsApp Control',   description: 'Manage bookings, send automated replies and track enquiries — all from your WhatsApp, from anywhere.' },
]

const industries = [
  { icon: HomeIcon,         label: 'Villa Rentals' },
  { icon: Dumbbell,         label: 'Gyms & Fitness' },
  { icon: UtensilsCrossed,  label: 'Restaurants' },
  { icon: Coffee,           label: 'Cafés' },
  { icon: Scissors,         label: 'Hair & Beauty' },
  { icon: Map,              label: 'Tourism Companies' },
  { icon: Car,              label: 'Car Hire' },
  { icon: Anchor,           label: 'Boat Hire' },
]

const steps = [
  { icon: MessageSquare, number: 1, title: 'Tell us about your business', description: 'Fill in our short form or message us on WhatsApp. We\'ll ask a few quick questions about your goals and current setup.' },
  { icon: Zap,           number: 2, title: 'We build everything', description: 'Your website, content, SEO and automation flows — done within 7 days. No meetings, no back-and-forth.' },
  { icon: MessageCircle, number: 3, title: 'You manage via WhatsApp', description: 'Control bookings, review reports and request updates directly from your phone. No dashboards to learn.' },
]


// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ children, style, className }) {
  return (
    <section
      className={className}
      style={{ padding: 'var(--space-20) var(--space-8)', ...style }}
    >
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}


// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: reduceMotion ? 0 : 0.1 } },
  }

  return (
    <main style={{ paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-20) var(--space-8)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Layer 1 — WebGL shader (lazy-loaded so three.js splits into its own chunk) */}
        <Suspense fallback={<div style={{ position: 'absolute', inset: 0, background: '#000' }} />}>
          <ShaderAnimation />
        </Suspense>

        {/* Layer 2 — dark overlay so text stays readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 3 — radial vignette fading to site background at edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, var(--surface-base) 75%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 'var(--width-lg)',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-8)',
          }}
        >
          {/* Availability badge */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-full)',
                padding: 'var(--space-2) var(--space-4)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', flexShrink: 0 }} />
              Now taking new clients in Greece
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, var(--text-3xl))',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                maxWidth: '16ch',
              }}
            >
              AI-powered websites and automation for{' '}
              <span style={{ color: 'var(--color-brand-400)' }}>businesses in Greece</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(var(--text-base), 2vw, var(--text-md))',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '52ch',
              }}
            >
              From beautiful websites to WhatsApp bots and email flows — we build your entire digital presence in under 7 days. You manage everything from your phone.
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
              to="/contact"
              style={{
                height: 44,
                padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
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
              Request a Proposal
            </Link>
            <Link
              to="/portfolio"
              style={{
                height: 44,
                padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease, transform 60ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              See Our Work <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: reduceMotion ? 0 : 0.22 }}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              'Websites live in 7 days',
              'WhatsApp-managed',
              'Local SEO included',
              'No tech skills needed',
            ].map((item) => (
              <span
                key={item}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-brand-500)', flexShrink: 0 }} />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Container scroll showcase ── */}
      <section style={{ background: 'var(--surface-base)', borderTop: '1px solid var(--border-default)' }}>
        <Suspense fallback={<div style={{ height: '80rem', background: 'var(--surface-base)' }} />}>
          <ContainerScrollLazy
            titleComponent={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>
                  What we build
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    maxWidth: '22ch',
                  }}
                >
                  See what GO AI builds for your business
                </h2>
                <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '48ch' }}>
                  Premium websites, automation and content — all managed through WhatsApp
                </p>
              </div>
            }
          >
            {/* Placeholder until a real screenshot is added as /public/demo-preview.png */}
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '240px 1fr',
              }}
            >
              {/* Simulated sidebar */}
              <div
                style={{
                  background: 'var(--surface-raised)',
                  borderRight: '1px solid var(--border-default)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-500)' }} />
                  <div style={{ width: 48, height: 6, borderRadius: 3, background: 'var(--text-tertiary)' }} />
                </div>
                {['Dashboard', 'Websites', 'SEO', 'Automation', 'Analytics', 'WhatsApp', 'Content'].map((item) => (
                  <div
                    key={item}
                    style={{
                      height: 32,
                      borderRadius: 'var(--radius-md)',
                      background: item === 'Dashboard' ? 'rgba(99,102,241,0.12)' : 'transparent',
                      border: item === 'Dashboard' ? '1px solid rgba(99,102,241,0.2)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 var(--space-3)',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: item === 'Dashboard' ? 'var(--color-brand-400)' : 'var(--border-strong)', flexShrink: 0 }} />
                    <div style={{ height: 5, width: `${40 + item.length * 4}px`, borderRadius: 2, background: item === 'Dashboard' ? 'var(--color-brand-400)' : 'var(--text-disabled)' }} />
                  </div>
                ))}
              </div>

              {/* Simulated main panel */}
              <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {/* Stat cards row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                  {[
                    { label: 'Website visits', value: '2,847', change: '+12%', up: true },
                    { label: 'Enquiries',       value: '134',   change: '+28%', up: true },
                    { label: 'Conversion rate', value: '4.7%',  change: '+0.8%', up: true },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        background: 'var(--surface-raised)',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-4)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-2)',
                      }}
                    >
                      <div style={{ height: 4, width: 60, borderRadius: 2, background: 'var(--text-disabled)' }} />
                      <div style={{ height: 9, width: 50, borderRadius: 3, background: 'var(--text-secondary)' }} />
                      <div style={{ height: 4, width: 30, borderRadius: 2, background: 'var(--color-success)' }} />
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div
                  style={{
                    flex: 1,
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ height: 6, width: 80, borderRadius: 3, background: 'var(--text-secondary)' }} />
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      {['7d', '30d', '90d'].map((t) => (
                        <div key={t} style={{ height: 20, width: 28, borderRadius: 'var(--radius-sm)', background: t === '30d' ? 'rgba(99,102,241,0.15)' : 'var(--surface-subtle)', border: t === '30d' ? '1px solid rgba(99,102,241,0.25)' : '1px solid var(--border-default)' }} />
                      ))}
                    </div>
                  </div>
                  {/* Bar chart */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
                    {[40, 65, 45, 80, 60, 90, 55, 75, 85, 70, 95, 60].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${h}%`,
                          borderRadius: '3px 3px 0 0',
                          background: i === 10 ? 'var(--color-brand-500)' : 'rgba(99,102,241,0.25)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContainerScrollLazy>
        </Suspense>
      </section>

      {/* ── What we do ── */}
      <Section style={{ background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader
            tag="What we do"
            title="Everything your business needs online"
            description="We handle your entire digital presence — so you can focus on running your business."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
          >
            {services.map((s) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Industries ── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
          <SectionHeader
            tag="Industries"
            title="Built for local businesses in Greece"
            description="We specialise in the businesses that drive Greek tourism and everyday life."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            {industries.map((ind) => (
              <IndustryCard key={ind.label} icon={ind.icon} label={ind.label} />
            ))}
          </motion.div>

          <Link
            to="/industries"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--color-brand-400)',
              transition: 'color 120ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-200)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-400)' }}
          >
            See all industries <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      {/* ── How it works ── */}
      <Section style={{ background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-16)' }}>
          <SectionHeader
            tag="How it works"
            title="From idea to live in 3 steps"
            description="No long briefs, no design reviews, no waiting weeks. We keep it simple."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full"
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

      {/* ── Pricing teaser ── */}
      <Section>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-10)', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>Pricing</p>
            <h2 style={{ fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', maxWidth: '18ch' }}>
              Simple Website & AI Growth Packages
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '50ch' }}>
              Start with a professional website from €350, then add monthly support when you're ready to grow.
            </p>
          </div>

          {/* Key price points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full" style={{ maxWidth: 'var(--width-lg)' }}>
            {[
              { label: 'Website Only',         price: '€350',    period: 'one-off',  note: 'Get online professionally' },
              { label: 'Marketing Bundle',      price: '€300',    period: '/month',   note: 'Recommended · Saves €600/yr', highlight: true },
              { label: 'Full AI Growth',        price: '€950',    period: '/month',   note: 'Everything included' },
            ].map(({ label, price, period, note, highlight }) => (
              <div
                key={label}
                style={{
                  background: highlight ? 'var(--surface-overlay)' : 'var(--surface-raised)',
                  border: highlight ? '1px solid var(--color-brand-500)' : '1px solid var(--border-default)',
                  borderLeft: highlight ? '3px solid var(--color-brand-500)' : undefined,
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                  textAlign: 'left',
                }}
              >
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: highlight ? 'var(--color-brand-400)' : 'var(--text-tertiary)' }}>{label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>{price}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{period}</span>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: highlight ? 'var(--color-accent-400)' : 'var(--text-tertiary)' }}>{note}</p>
              </div>
            ))}
          </div>

          <Link
            to="/pricing"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              height: 44, padding: '0 var(--space-6)',
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
            See all packages & pricing <ArrowRight size={14} />
          </Link>
        </motion.div>
      </Section>

      {/* ── Final CTA ── */}
      <section
        style={{
          background: 'var(--surface-raised)',
          borderTop: '1px solid var(--border-default)',
          padding: 'var(--space-20) var(--space-8)',
        }}
      >
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 'var(--width-md)',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-8)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-500)' }}>
              Free audit
            </p>
            <h2
              style={{
                fontSize: 'clamp(var(--text-xl), 4vw, var(--text-2xl))',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Request your free digital improvement plan
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '44ch' }}>
              Tell us about your business and we'll send a personalised plan showing exactly what we'd build — and what it would cost. No commitment.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/contact"
              style={{
                height: 44,
                padding: '0 var(--space-6)',
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
              Request my free plan
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{
                height: 44,
                padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: '#25d366',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease, transform 60ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <MessageCircle size={16} />
              Message on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
