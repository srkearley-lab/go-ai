import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, MessageCircle } from 'lucide-react'
import {
  Globe, FileText, Search, Mail, Video, MessageSquare,
  LayoutTemplate, Palette, MousePointerClick,
  Bot, BarChart3, PenLine,
} from 'lucide-react'
import PageHero from '../components/PageHero'

const WHATSAPP = '#'

// ── Services data ─────────────────────────────────────────────────────────────

const categories = [
  {
    label: 'Digital Presence',
    description: 'We design and build your online foundation — fast, professional, and built to convert.',
    services: [
      {
        icon: Globe,
        title: 'Website Design & Development',
        description: 'A fast, mobile-first website tailored to your industry. Built in under 7 days and optimised to turn visitors into enquiries and bookings.',
        included: [
          'Custom design — no templates',
          'Mobile-responsive on all devices',
          'Contact forms and WhatsApp button',
          'Basic on-page SEO setup',
          'Google Analytics integration',
          'Hosting setup and domain connection',
        ],
        bestFor: ['Villas', 'Restaurants', 'Gyms', 'Salons'],
      },
      {
        icon: LayoutTemplate,
        title: 'Landing Page Design',
        description: 'A single, high-converting page for a specific campaign, season, or offer. Ideal for promotions, events, or driving direct bookings.',
        included: [
          'One focused, conversion-optimised page',
          'Strong headline and call-to-action',
          'Enquiry or booking form',
          'Integrated with your existing site or standalone',
          'Fast load on mobile',
        ],
        bestFor: ['Tourism', 'Car Hire', 'Boat Hire', 'Cafés'],
      },
      {
        icon: Palette,
        title: 'Brand Identity',
        description: 'Logo, colours, fonts and brand guidelines — a consistent visual identity your business can use across every channel.',
        included: [
          'Logo design (3 concepts)',
          'Colour palette and typography system',
          'Business card design',
          'Social media profile kit',
          'Brand guidelines PDF',
        ],
        bestFor: ['New businesses', 'Rebrands', 'All industries'],
      },
    ],
  },
  {
    label: 'Automation',
    description: 'Let AI handle the repetitive work — so you can focus on running your business.',
    services: [
      {
        icon: MessageSquare,
        title: 'WhatsApp Automation',
        description: 'An intelligent WhatsApp bot that replies to enquiries, sends booking confirmations, collects reviews and forwards leads — all automatically, 24/7.',
        included: [
          'Automated enquiry responses',
          'Booking confirmation messages',
          'Review request sequences',
          'Lead routing to your phone',
          'Seasonal message templates',
          'No-code dashboard to update replies',
        ],
        bestFor: ['Villas', 'Restaurants', 'Salons', 'Tourism'],
      },
      {
        icon: Mail,
        title: 'Email Automation',
        description: 'Automated email sequences that nurture leads, re-engage past customers and drive repeat business — running continuously without your involvement.',
        included: [
          'Welcome and onboarding sequence',
          'Post-visit follow-up and review request',
          'Seasonal offers and promotions',
          'Abandoned enquiry re-engagement',
          'Monthly newsletter template',
          'Mailchimp or Brevo setup included',
        ],
        bestFor: ['Villas', 'Gyms', 'Salons', 'Tourism'],
      },
      {
        icon: FileText,
        title: 'AI Proposal Generation',
        description: 'Polished, personalised proposals generated in minutes using AI — and sent directly to your prospects via email or WhatsApp.',
        included: [
          'Custom proposal template per industry',
          'AI-generated personalised content',
          'Pricing table and package options',
          'Digital signature support',
          'Sent via WhatsApp or email',
          'Follow-up reminder automation',
        ],
        bestFor: ['Tourism', 'Car Hire', 'Boat Hire', 'Villas'],
      },
      {
        icon: Bot,
        title: 'AI Chatbot (Website)',
        description: 'An intelligent chatbot embedded on your website that answers common questions, qualifies leads and collects visitor details — day and night.',
        included: [
          'Trained on your business and services',
          'Answers FAQs automatically',
          'Collects name, email and enquiry',
          'Sends leads to your WhatsApp instantly',
          'Supports English and Greek',
          'Embedded on any page of your site',
        ],
        bestFor: ['Villas', 'Restaurants', 'Gyms', 'Tourism'],
      },
    ],
  },
  {
    label: 'Marketing',
    description: 'Get found, drive traffic and convert it into paying customers.',
    services: [
      {
        icon: Search,
        title: 'Local SEO',
        description: 'Get your business to the top of Google for searches in your area. We handle technical SEO, content, Google Business Profile and monthly reporting.',
        included: [
          'Google Business Profile optimisation',
          'Local keyword research and targeting',
          'On-page and technical SEO audit',
          'Schema markup for local business',
          'Monthly ranking and traffic report',
          'Competitor gap analysis',
        ],
        bestFor: ['Restaurants', 'Salons', 'Gyms', 'All local businesses'],
      },
      {
        icon: MousePointerClick,
        title: 'Google Ads Management',
        description: 'Paid search campaigns that target people actively looking for what you offer in Greece. We set up, run and optimise — you get the leads.',
        included: [
          'Campaign strategy and setup',
          'Keyword research and ad copywriting',
          'Landing page recommendation',
          'Conversion tracking setup',
          'Weekly optimisation',
          'Monthly performance report',
        ],
        bestFor: ['Tourism', 'Car Hire', 'Boat Hire', 'Villas'],
      },
      {
        icon: BarChart3,
        title: 'Analytics & Reporting',
        description: 'A clear, monthly dashboard showing how your website, SEO and campaigns are performing — in plain language, not jargon.',
        included: [
          'Google Analytics 4 setup',
          'Monthly PDF performance report',
          'Visitor source breakdown',
          'Top pages and enquiry tracking',
          'Competitor traffic benchmarking',
          'Action recommendations each month',
        ],
        bestFor: ['All industries'],
      },
    ],
  },
  {
    label: 'Content',
    description: 'Content that builds trust, drives traffic and keeps your brand visible.',
    services: [
      {
        icon: Video,
        title: 'Short-Form Video Ads',
        description: 'Professionally edited, scroll-stopping videos for Instagram Reels and TikTok — scripted, subtitled and optimised for your target audience in Greece.',
        included: [
          '2 videos per month',
          'Script written by our team',
          'Subtitles in English and Greek',
          'Branded intro and outro',
          'Optimised aspect ratios (9:16 and 1:1)',
          'Posted and scheduled for you',
        ],
        bestFor: ['Restaurants', 'Salons', 'Tourism', 'Villas'],
      },
      {
        icon: PenLine,
        title: 'AI Blog & Content Writing',
        description: 'SEO-optimised blog posts and website copy written by AI and edited by our team — building authority, improving rankings and answering your customers\' questions.',
        included: [
          '4 blog posts per month (800–1200 words)',
          'Targeted to local search queries',
          'Published directly to your website',
          'Meta descriptions and headings optimised',
          'Internal linking strategy',
          'Topic calendar planned one month ahead',
        ],
        bestFor: ['Tourism', 'Villas', 'Restaurants', 'Gyms'],
      },
    ],
  },
]

// ── Service card ──────────────────────────────────────────────────────────────

function ServiceDetailCard({ icon: Icon, title, description, included, bestFor }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={reduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-default)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
        <div
          style={{
            width: 44, height: 44, flexShrink: 0,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-brand-400)',
          }}
        >
          <Icon size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
            {title}
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />

      {/* Included */}
      <div>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
          What's included
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {included.map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
              <span
                style={{
                  width: 16, height: 16, flexShrink: 0, marginTop: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-brand-400)',
                }}
              >
                <Check size={9} strokeWidth={3} />
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best for */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'auto' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginRight: 'var(--space-1)', alignSelf: 'center' }}>
          Best for:
        </span>
        {bestFor.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px var(--space-2)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ── Differentiator ────────────────────────────────────────────────────────────

function Diff({ number, title, body }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
    >
      <span style={{
        fontSize: 'var(--text-xs)', fontWeight: 700,
        color: 'var(--color-brand-400)',
        letterSpacing: '0.04em',
      }}>
        0{number}
      </span>
      <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, lineHeight: 1.2, color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {body}
      </p>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Services() {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: reduceMotion ? 0 : 0.05 } },
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Services"
        title="Everything your business needs to grow online"
        description="Websites, automation, SEO, content and ads — all built and managed for you. No agency jargon, no endless meetings. Just results."
      />

      {/* ── Service categories ── */}
      {categories.map((cat, catIdx) => (
        <section
          key={cat.label}
          style={{
            padding: 'var(--space-20) var(--space-8)',
            background: catIdx % 2 === 0 ? 'var(--surface-base)' : 'var(--surface-subtle)',
            borderBottom: '1px solid var(--border-default)',
          }}
        >
          <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>

            {/* Category header */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '60ch' }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-400)',
                }}
              >
                <span
                  style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: 'var(--color-brand-500)',
                    flexShrink: 0,
                  }}
                />
                {cat.label}
              </span>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {cat.description}
              </p>
            </motion.div>

            {/* Cards grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {cat.services.map((svc) => (
                <ServiceDetailCard key={svc.title} {...svc} />
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── Why GO AI ── */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-8)',
          background: 'var(--surface-raised)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
          >
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)' }}>
              Why GO AI
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', maxWidth: '22ch' }}>
              We don't just build — we run it for you
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <Diff
              number={1}
              title="Built for Greek businesses specifically"
              body="Every template, automation and copy block is built around how local businesses in Greece operate — tourist seasons, Greek-speaking customers, local search intent and WhatsApp-first communication."
            />
            <Diff
              number={2}
              title="Live in 7 days, managed via WhatsApp"
              body="No long project timelines, no dashboards to learn. Your website goes live within a week, and every update, report or request goes through a single WhatsApp message."
            />
            <Diff
              number={3}
              title="AI-powered at a fraction of the agency cost"
              body="By using AI to handle writing, design and automation, we deliver the quality of a full-service agency at a price that makes sense for a local business with real margins."
            />
          </motion.div>
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-8)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-500)' }}>
              Free audit
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Not sure which services you need?
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '44ch' }}>
              Tell us about your business and we'll recommend exactly what to build — with pricing and a delivery timeline. Free, no strings.
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
              Request my free plan
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
              Ask on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
