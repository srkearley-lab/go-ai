import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Globe, Package, Layers, PlusCircle, FileText,
  ArrowRight, Check, X as XIcon, ShoppingCart, Pencil, ChevronDown,
  Lock, CreditCard, AlertCircle,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import WhatsDifferenceStrip from '../components/WhatsDifferenceStrip'
import { useTranslations, useJourneyLocale } from '../context/LanguageContext'

// Merge base English data with locale overrides (used for non-English languages)
function tItem(locale, key, id, base) {
  const override = locale?.[key]?.[id]
  return override ? { ...base, ...override } : base
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const WEBSITES = [
  {
    id: 'basic-launch',
    name: 'Basic Launch Website',
    badge: 'Entry Level',
    price: '€450',
    priceNote: 'one-off',
    oneOff: 450,
    monthly: 0,
    isQuote: false,
    bestFor: 'Side businesses, sole traders, early startups',
    features: ['One-page site', 'Mobile responsive', 'Contact form', 'Basic SEO', 'Analytics placeholder', 'Launch setup'],
    highlighted: false,
  },
  {
    id: 'starter-business',
    name: 'Starter Business Website',
    badge: 'Starter',
    price: '€750',
    priceNote: 'one-off',
    oneOff: 750,
    monthly: 0,
    isQuote: false,
    bestFor: 'New businesses wanting more credibility',
    features: ['Up to 3 pages', 'Mobile responsive', 'Contact form', 'Booking CTA placeholder', 'Basic SEO', 'Social links'],
    highlighted: false,
  },
  {
    id: 'business',
    name: 'Business Website',
    badge: 'Recommended',
    price: '€1,200',
    priceNote: 'one-off',
    oneOff: 1200,
    monthly: 0,
    isQuote: false,
    bestFor: 'Established businesses, consultants, local service providers',
    features: ['Up to 5 pages', 'Lead capture form', 'Booking placeholder', 'FAQ section', 'Analytics-ready', 'Deployment support'],
    highlighted: true,
  },
  {
    id: 'growth',
    name: 'Growth Website',
    badge: 'Best for Growth',
    price: '€1,750',
    priceNote: 'one-off',
    oneOff: 1750,
    monthly: 0,
    isQuote: false,
    bestFor: 'Businesses ready to invest in a higher-converting website',
    features: ['Up to 7 pages', 'Funnel structure', 'Package comparison section', 'Meta Pixel and GTM', 'Enhanced SEO'],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium AI-Ready Website',
    badge: 'Premium',
    price: 'Quote required',
    priceNote: null,
    oneOff: 0,
    monthly: 0,
    isQuote: true,
    bestFor: 'Businesses wanting a top-tier website as a long-term asset',
    features: ['Everything in Growth Website', 'Premium custom design system', 'AI-ready sections', 'Structured client enquiry journey', 'Full launch documentation'],
    highlighted: false,
  },
]

const PACKAGES = [
  {
    id: 'pkg-website-design',
    name: 'Website Design',
    price: '€450',
    priceNote: 'one-off',
    oneOff: 450,
    monthly: 0,
    isQuote: false,
    bestFor: 'Any business needing a new or redesigned website',
    features: ['Custom mobile-responsive design', 'Lead capture and contact forms', 'Basic SEO setup included', 'Google Analytics integration'],
  },
  {
    id: 'pkg-seo',
    name: 'SEO',
    price: '€150',
    priceNote: '/month',
    oneOff: 0,
    monthly: 150,
    isQuote: false,
    bestFor: 'Businesses wanting to rank in local Google search',
    features: ['Page titles and meta descriptions', 'Keyword research and targeting', 'Google Search Console setup', 'Monthly ranking monitoring'],
  },
  {
    id: 'pkg-whatsapp-automation',
    name: 'WhatsApp Automation',
    price: '€250 setup + €150/mo',
    priceNote: null,
    oneOff: 250,
    monthly: 150,
    isQuote: false,
    bestFor: 'Businesses receiving enquiries via WhatsApp',
    features: ['Auto-reply to enquiries', 'Lead routing to your phone', 'Booking confirmation messages', 'Workflow automation'],
  },
  {
    id: 'pkg-email-automation',
    name: 'Email Automation',
    price: '€150 setup + €100/mo',
    priceNote: null,
    oneOff: 150,
    monthly: 100,
    isQuote: false,
    bestFor: 'Businesses wanting automated follow-ups and lead nurturing',
    features: ['Automated follow-up sequences', 'Enquiry response flows', 'Lead nurturing campaigns', 'Email platform setup included'],
  },
  {
    id: 'pkg-video-websites',
    name: 'Video Websites',
    price: '€500',
    priceNote: 'one-off',
    oneOff: 500,
    monthly: 0,
    isQuote: false,
    bestFor: 'Businesses with video content wanting to stand out',
    features: ['Video hero sections', 'Video landing page design', 'AI avatar content integration', 'Mobile-optimised video display'],
  },
  {
    id: 'pkg-ai-prompts',
    name: 'AI Prompts',
    price: '€200',
    priceNote: 'one-off',
    oneOff: 200,
    monthly: 0,
    isQuote: false,
    bestFor: 'Business owners wanting to use AI tools more effectively',
    features: ['Custom AI prompt library', 'Content creation templates', 'Customer reply frameworks', 'Sales and admin support scripts'],
  },
  {
    id: 'pkg-social-media',
    name: 'Social Media Content',
    price: '€150',
    priceNote: '/month',
    oneOff: 0,
    monthly: 150,
    isQuote: false,
    bestFor: 'Businesses needing a consistent social media presence',
    features: ['12 posts/month across 2 platforms', 'Captions, hashtags, scheduling', 'Content calendar planned ahead', 'Designed to drive local enquiries'],
  },
  {
    id: 'pkg-ai-content',
    name: 'AI Content & Marketing',
    price: '€250',
    priceNote: '/month',
    oneOff: 0,
    monthly: 250,
    isQuote: false,
    bestFor: 'Businesses wanting to grow organic Google traffic',
    features: ['Monthly SEO blog posts', 'Email newsletter campaigns', 'Google ranking monitoring', 'Monthly performance report'],
  },
  {
    id: 'pkg-ai-automation',
    name: 'AI Automation',
    price: '€250 setup + €300/mo',
    priceNote: null,
    oneOff: 250,
    monthly: 300,
    isQuote: false,
    bestFor: 'Busy businesses missing enquiries or follow-ups',
    features: ['WhatsApp enquiry bot', 'Email follow-up sequences', 'CRM lead tracking', 'No-code dashboard to update replies'],
  },
  {
    id: 'pkg-ai-avatar',
    name: 'AI Avatar & Video Content',
    price: '€250 setup + €300/mo',
    priceNote: null,
    oneOff: 250,
    monthly: 300,
    isQuote: false,
    bestFor: 'Businesses wanting AI-generated video for social media',
    features: ['8 AI videos/month', 'Custom digital avatar creation', 'Subtitles in English and Greek', 'Optimised for Instagram and TikTok'],
  },
  {
    id: 'pkg-proposals',
    name: 'Proposal & Sales Documents',
    price: '€200 setup + €200/mo',
    priceNote: null,
    oneOff: 200,
    monthly: 200,
    isQuote: false,
    bestFor: 'Businesses quoting frequently that want to save time',
    features: ['AI-generated proposals in minutes', 'Branded quotes and contracts', 'Digital signature support', 'Automated follow-up sequences'],
  },
]

const BUNDLES = [
  {
    id: 'bundle-hosting-care',
    name: 'Website Care and Maintenance',
    badge: 'Peace of Mind',
    price: '€90',
    priceNote: '/month',
    oneOff: 0,
    monthly: 90,
    isQuote: false,
    bestFor: 'Businesses wanting their website kept secure, up to date and running smoothly',
    features: ['Managed website hosting', 'Monthly security and backups', 'Light website edits included', 'Up to 2 hours of updates/month', 'Website health checks', 'Basic technical maintenance'],
    highlighted: false,
  },
  {
    id: 'bundle-social-growth',
    name: 'Website and Social Growth',
    badge: 'Growth',
    price: '€220',
    priceNote: '/month',
    oneOff: 0,
    monthly: 220,
    isQuote: false,
    bestFor: 'Businesses building an active social media presence alongside their website',
    features: ['Ongoing website care included', 'Managed hosting', '12 social posts/month', 'Captions, hashtags, scheduling'],
    highlighted: false,
  },
  {
    id: 'bundle-marketing-engine',
    name: 'Website and Marketing Engine',
    badge: 'Recommended',
    price: '€300',
    priceNote: '/month',
    oneOff: 0,
    monthly: 300,
    isQuote: false,
    bestFor: 'Growing businesses wanting complete monthly digital support',
    features: ['Ongoing website care included', 'Managed hosting', 'Monthly SEO blog posts', 'Email newsletter campaigns', '12 social posts/month', 'Google ranking monitoring'],
    highlighted: true,
  },
  {
    id: 'bundle-automation',
    name: 'Website and Automation',
    badge: 'Automation',
    price: '€350',
    priceNote: '/month',
    oneOff: 0,
    monthly: 350,
    isQuote: false,
    bestFor: 'Service businesses where speed of follow-up matters',
    features: ['Ongoing website care included', 'Managed hosting', 'WhatsApp enquiry automation', 'Email follow-up sequences', 'CRM lead tracking'],
    highlighted: false,
  },
  {
    id: 'bundle-ai-growth',
    name: 'AI Growth Package',
    badge: 'Premium',
    price: '€950',
    priceNote: '/month',
    oneOff: 0,
    monthly: 950,
    isQuote: false,
    bestFor: 'Business owners wanting a fully-managed premium digital presence',
    features: ['All monthly services included', 'AI Avatar and Video content', 'AI proposals and sales documents', 'Dedicated account manager', 'Priority support and updates'],
    highlighted: false,
  },
]

const ADDON_GROUPS = [
  {
    title: 'Website Add-ons',
    addons: [
      { id: 'addon-extra-page', name: 'Extra Website Page', price: '€100', priceNote: 'one-off', oneOff: 100, monthly: 0, isQuote: false, bestFor: 'Businesses needing more pages than their package includes', features: ['One additional page', 'Matched styling', 'Mobile check', 'Navigation update'] },
      { id: 'addon-landing-page', name: 'Landing Page', price: '€150', priceNote: 'one-off', oneOff: 150, monthly: 0, isQuote: false, bestFor: 'Campaigns, ads, promotions, lead generation', features: ['Standalone page', 'Headline and CTA structure', 'Form placement', 'Mobile layout'] },
      { id: 'addon-form-upgrade', name: 'Website Form Upgrade', price: '€75', priceNote: 'one-off', oneOff: 75, monthly: 0, isQuote: false, bestFor: 'Better enquiry, quote, or booking capture', features: ['Custom fields', 'Required field setup', 'Dropdowns and confirmation', 'Routing setup'] },
      { id: 'addon-whatsapp-chat', name: 'WhatsApp Click-to-Chat Setup', price: '€30', priceNote: 'one-off', oneOff: 30, monthly: 0, isQuote: false, bestFor: 'Businesses preferring WhatsApp conversations', features: ['Button and link setup', 'Key page placement', 'Mobile click-to-chat'] },
      { id: 'addon-whatsapp-chatbot', name: 'WhatsApp Chatbot / Basic Setup', price: '€150', priceNote: 'one-off', oneOff: 150, monthly: 0, isQuote: false, bestFor: 'Businesses wanting simple WhatsApp auto-reply and lead capture', features: ['Basic WhatsApp auto-reply setup', 'Enquiry collection flow', 'Lead notification to your phone'] },
    ],
  },
  {
    title: 'Monthly Support Add-ons',
    addons: [
      { id: 'addon-hosting-care', name: 'Hosting Care', price: '€20', priceNote: '/month', oneOff: 0, monthly: 20, isQuote: false, bestFor: 'Businesses wanting basic hosting and technical monitoring', features: ['Website hosting', 'Basic website storage', 'SSL/security basics', 'Basic uptime monitoring', 'Monthly platform/plugin checks'] },
      { id: 'addon-extra-storage', name: 'Extra Website Storage', price: '€10', priceNote: '/month', oneOff: 0, monthly: 10, isQuote: false, bestFor: 'Businesses with larger galleries, PDFs, or media', features: ['Extra managed storage above standard allowance', 'Image and PDF support', 'Storage monitoring'] },
      { id: 'addon-priority-updates', name: 'Priority Updates', price: '€30', priceNote: '/month', oneOff: 0, monthly: 30, isQuote: false, bestFor: 'Businesses needing fast turnaround on changes', features: ['Priority handling', 'Faster response times', 'Text, image and price updates'] },
      { id: 'addon-content-refresh', name: 'Monthly Contact Refresh', price: '€50', priceNote: '/month', oneOff: 0, monthly: 50, isQuote: false, bestFor: 'Businesses wanting their site kept fresh', features: ['One monthly content refresh', 'Content and image updates', 'Improvement notes'] },
      { id: 'addon-seo-basics', name: 'SEO Basics', price: '€75', priceNote: 'one-off', oneOff: 75, monthly: 0, isQuote: false, bestFor: 'Businesses wanting a one-off SEO setup on their website', features: ['Page titles and meta descriptions', 'Heading structure review', 'Local keyword setup', 'Google Search Console submission'] },
      { id: 'addon-gbp-support', name: 'Google Business Profile Support', price: '€40', priceNote: '/month', oneOff: 0, monthly: 40, isQuote: false, bestFor: 'Businesses wanting a well-managed Google presence', features: ['Profile content support', 'Monthly posts', 'Photo and service updates'] },
    ],
  },
  {
    title: 'Automation & AI Add-ons',
    subtitle: 'These add-ons require a quote. Request a quote and we\'ll assess scope and cost.',
    addons: [
      { id: 'addon-simple-automation', name: 'Simple Automation', price: 'Quote required', priceNote: null, oneOff: 0, monthly: 0, isQuote: true, bestFor: 'Businesses with a repetitive task to automate', features: [] },
      { id: 'addon-email-automation', name: 'Email Automation', price: 'Quote required', priceNote: null, oneOff: 0, monthly: 0, isQuote: true, bestFor: 'Businesses wanting automated follow-ups and email flows', features: [] },
      { id: 'addon-ai-content-workflow', name: 'AI Content Workflow', price: 'Quote required', priceNote: null, oneOff: 0, monthly: 0, isQuote: true, bestFor: 'Businesses wanting AI to power content creation', features: [] },
      { id: 'addon-ai-avatar-video', name: 'AI Avatar / Video Content — Bespoke', price: 'Quote required', priceNote: null, oneOff: 0, monthly: 0, isQuote: true, bestFor: 'Businesses wanting bespoke AI-generated video — full service available under Services', features: [] },
    ],
  },
  {
    title: 'Setup Add-ons',
    addons: [
      { id: 'addon-email-setup', name: 'Business Email Setup', price: '€50', priceNote: 'one-off', oneOff: 50, monthly: 0, isQuote: false, bestFor: 'Businesses needing a professional email address set up', features: ['Email provider configuration', 'Domain verification', 'Basic inbox setup'] },
      { id: 'addon-domain-connection', name: 'Domain Connection Support', price: '€40', priceNote: 'one-off', oneOff: 40, monthly: 0, isQuote: false, bestFor: 'Businesses needing help connecting a domain', features: ['DNS configuration', 'Domain pointing', 'Connection verification'] },
      { id: 'addon-tracking-setup', name: 'Tracking Setup', price: '€60', priceNote: 'one-off', oneOff: 60, monthly: 0, isQuote: false, bestFor: 'Businesses wanting proper analytics and ad tracking in place', features: ['Google Analytics setup', 'Meta Pixel or GTM placement', 'Basic event tracking'] },
      { id: 'addon-health-check', name: 'Website Health Check', price: '€50', priceNote: 'one-off', oneOff: 50, monthly: 0, isQuote: false, bestFor: 'Businesses wanting a review of their existing website', features: ['Speed and mobile check', 'Broken link scan', 'SEO basics review', 'Summary report'] },
    ],
  },
]

// ─── Preserved What's the Difference data ──────────────────────────────────────

const differenceItems = [
  { id: 'websites', icon: Globe,      term: 'Packages',    subtitle: 'One-off website builds',      description: 'One-off website build packages. Fixed prices. Choose the right level for your business — delivered in 5–7 days.' },
  { id: 'packages', icon: Package,    term: 'Services',    subtitle: 'Standalone individual services', description: 'Individual services you can add to your website — SEO, automation, content, AI tools and more.' },
  { id: 'bundles',  icon: Layers,     term: 'Bundles',     subtitle: 'Monthly support plans',        description: 'Monthly ongoing support plans for businesses that already have a website. Hosting care, content, SEO, marketing, automation and growth — all managed for you.' },
  { id: 'addons',   icon: PlusCircle, term: 'Add-ons',     subtitle: 'Optional extras',              description: 'Small bolt-on extras: Hosting Care from €20/month, landing pages, form upgrades, WhatsApp chatbot setup, SEO basics, Google Business Profile support and more.' },
  { id: 'quote',    icon: FileText,   term: 'Get a Quote', subtitle: 'Tailored recommendation',      description: 'Not sure what you need? Request a quote for a tailored recommendation based on your business.' },
]

// ─── Shared helpers ─────────────────────────────────────────────────────────────

// Translate embedded /mo and setup in price strings (e.g. "€250 setup + €150/mo")
function translatePrice(price, t) {
  return price
    .replace('/month', t.labels.perMonth)
    .replace('/mo', t.labels.perMonth)
    .replace(' setup', ` ${t.pricing?.setupLabel || 'setup'}`)
}

const BADGE_COLORS = {
  'Entry Level':     { bg: 'rgba(22,163,74,0.08)',   border: 'rgba(22,163,74,0.18)',   color: 'var(--color-success)' },
  'Starter':         { bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.2)',   color: 'var(--color-brand-400)' },
  'Recommended':     { bg: 'var(--color-brand-500)', border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  'Best for Growth': { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-400)' },
  'Premium':         { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)',  color: 'var(--color-accent-400)' },
  'Peace of Mind':   { bg: 'rgba(22,163,74,0.1)',    border: 'rgba(22,163,74,0.2)',    color: 'var(--color-success)' },
  'Growth':          { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-500)' },
  'Automation':      { bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.2)',   color: 'var(--color-brand-400)' },
  // Greek aliases for translated badge values
  'Αρχάριοι':               { bg: 'rgba(22,163,74,0.08)',   border: 'rgba(22,163,74,0.18)',   color: 'var(--color-success)' },
  'Συνιστώμενο':            { bg: 'var(--color-brand-500)', border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  'Καλύτερο για Ανάπτυξη': { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-400)' },
  'Αξιοπιστία':             { bg: 'rgba(22,163,74,0.1)',    border: 'rgba(22,163,74,0.2)',    color: 'var(--color-success)' },
  'Ανάπτυξη':               { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-500)' },
  'Αυτοματισμός':           { bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.2)',   color: 'var(--color-brand-400)' },
}

function Badge({ label }) {
  const t = useTranslations()
  const c = BADGE_COLORS[label] || { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', color: 'var(--color-brand-400)' }
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

function FeatureItem({ text }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
      <Check size={10} strokeWidth={3} style={{ color: 'var(--goai-violet)', flexShrink: 0, marginTop: 3 }} />
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</span>
    </li>
  )
}

const primaryBtn = {
  height: 40, padding: '0 var(--space-5)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
  fontSize: 'var(--text-sm)', fontWeight: 600,
  background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
  color: '#FFFFFF', border: 'none',
  borderRadius: 'var(--radius-md)',
  boxShadow: '0 0 20px rgba(118,39,239,0.3)',
  cursor: 'pointer', transition: 'filter 120ms ease, box-shadow 120ms ease',
  fontFamily: 'inherit', width: '100%',
}

const selectedBtn = {
  ...primaryBtn,
  background: 'rgba(22,163,74,0.1)',
  color: 'var(--color-success)',
  border: '1px solid rgba(22,163,74,0.3)',
  boxShadow: 'none',
}

const ghostBtn = {
  height: 28, padding: '0 var(--space-3)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
  fontSize: '0.65rem', fontWeight: 500,
  background: 'transparent', color: 'var(--text-secondary)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer', transition: 'all 120ms ease',
  fontFamily: 'inherit',
}

const backBtn = {
  height: 40, padding: '0 var(--space-5)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
  fontSize: 'var(--text-sm)', fontWeight: 500,
  background: 'transparent', color: 'var(--text-secondary)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer', transition: 'all 120ms ease',
  fontFamily: 'inherit',
}

const secondaryBtn = {
  height: 40, padding: '0 var(--space-5)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
  fontSize: 'var(--text-sm)', fontWeight: 500,
  background: 'transparent', color: 'var(--text-primary)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer', transition: 'all 120ms ease',
  fontFamily: 'inherit',
}

// ─── Progress indicator ─────────────────────────────────────────────────────────

const STEP_COUNT = 6

function ProgressIndicator({ currentStep, onGoToStep }) {
  const t = useTranslations()
  const stepLabels = [t.journey.website, t.journey.package, t.journey.bundle, t.journey.addons, t.journey.reviewLabel, t.journey.paymentLabel]
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-3)', overflowX: 'auto', paddingBottom: 2 }}>
        {stepLabels.map((label, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <div
              key={i}
              onClick={() => done && onGoToStep(i)}
              style={{ flex: 1, minWidth: 52, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', cursor: done ? 'pointer' : 'default' }}
            >
              <div style={{
                height: 3, borderRadius: 'var(--radius-full)',
                background: done ? 'var(--goai-violet)' : active ? 'var(--goai-blue)' : 'var(--border-default)',
                transition: 'background 200ms ease',
              }} />
              <span style={{
                fontSize: '0.62rem', fontWeight: active ? 600 : 400,
                color: active ? 'var(--text-primary)' : done ? 'var(--goai-violet)' : 'var(--text-tertiary)',
                transition: 'color 200ms ease',
                display: 'flex', alignItems: 'center', gap: 3,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {done && <Check size={9} strokeWidth={3} style={{ flexShrink: 0 }} />}
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
        {t.journey.step} {currentStep + 1} {t.journey.of} {STEP_COUNT}
      </p>
    </div>
  )
}

// ─── Inline info panel (shared by all card types) ───────────────────────────────

function InlineInfoPanel({ bestFor, features }) {
  const t = useTranslations()
  return (
    <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div>
        <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
          {t.journey.bestFor}
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {bestFor}
        </p>
      </div>
      {features.length > 0 && (
        <div>
          <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
            {t.journey.whatsIncluded}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {features.map((f, i) => <FeatureItem key={i} text={f} />)}
          </ul>
        </div>
      )}
    </div>
  )
}

function ShowDetailsBtn({ open, onToggle }) {
  const t = useTranslations()
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)',
        fontSize: 'var(--text-xs)', color: 'var(--color-brand-400)',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: 'var(--space-1) 0', width: '100%', fontFamily: 'inherit',
        transition: 'color 120ms ease',
      }}
    >
      {open ? t.buttons.hideDetails : t.buttons.showDetails}
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ display: 'flex' }}>
        <ChevronDown size={11} />
      </motion.span>
    </button>
  )
}

// ─── Selection cards ────────────────────────────────────────────────────────────

function WebsiteSelectCard({ website, onToggle, isSelected }) {
  const [showInfo, setShowInfo] = useState(false)
  const t = useTranslations()
  const hl = website.highlighted
  const tn = (note) => note === 'one-off' ? t.labels.oneOff : note === '/month' ? t.labels.perMonth : note
  return (
    <div style={{
      background: hl ? 'var(--surface-overlay)' : 'var(--surface-raised)',
      border: `1px solid ${isSelected ? 'var(--color-success)' : hl ? 'rgba(118,39,239,0.4)' : 'var(--border-default)'}`,
      borderLeft: hl ? '3px solid var(--goai-violet)' : undefined,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      boxShadow: hl ? '0 0 20px rgba(118,39,239,0.12)' : 'none',
      transition: 'border-color 150ms ease',
    }}>
      <Badge label={website.badge} />
      <div>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-1)' }}>
          {website.name}
        </h3>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          {t.journey.bestFor}: {website.bestFor}
        </p>
      </div>
      <div>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {website.isQuote ? t.labels.quoteRequired : website.price}
        </span>
        {website.priceNote && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginLeft: 'var(--space-2)' }}>
            {tn(website.priceNote)}
          </span>
        )}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
        {website.features.map(f => <FeatureItem key={f} text={f} />)}
      </ul>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <InlineInfoPanel bestFor={website.bestFor} features={website.features} />
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'auto' }}>
        <button
          type="button"
          onClick={() => onToggle(website)}
          style={isSelected ? selectedBtn : primaryBtn}
          onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118,39,239,0.45)' } }}
          onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118,39,239,0.3)' } }}
        >
          {isSelected ? <><Check size={13} strokeWidth={2.5} /> {t.buttons.selected}</> : t.buttons.selectWebsite}
        </button>
        <ShowDetailsBtn open={showInfo} onToggle={() => setShowInfo(v => !v)} />
      </div>
    </div>
  )
}

function PackageSelectCard({ pkg, onToggle, isSelected }) {
  const [showInfo, setShowInfo] = useState(false)
  const t = useTranslations()
  const tn = (note) => note === 'one-off' ? t.labels.oneOff : note === '/month' ? t.labels.perMonth : note
  const tp = (price) => translatePrice(price, t)

  const btnStyle = {
    height: 36, padding: '0 var(--space-4)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
    fontSize: 'var(--text-xs)', fontWeight: 600,
    borderRadius: 'var(--radius-md)', cursor: 'pointer',
    transition: 'all 120ms ease', fontFamily: 'inherit',
    ...(isSelected
      ? { background: 'rgba(22,163,74,0.1)', color: 'var(--color-success)', border: '1px solid rgba(22,163,74,0.3)', boxShadow: 'none' }
      : { background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', boxShadow: '0 0 16px rgba(118,39,239,0.3)' }),
  }

  return (
    <div style={{
      background: isSelected ? 'rgba(118,39,239,0.04)' : 'var(--surface-raised)',
      border: `1px solid ${isSelected ? 'var(--goai-violet)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
      transition: 'border-color 150ms ease, box-shadow 150ms ease, background 150ms ease',
    }}
      onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' } }}
      onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none' } }}
    >
      <div>
        <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-1)' }}>
          {pkg.name}
        </h3>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', lineHeight: 1.4 }}>
          {pkg.bestFor}
        </p>
      </div>
      <div>
        <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {tp(pkg.price)}
        </span>
        {pkg.priceNote && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginLeft: 'var(--space-1)' }}>
            {tn(pkg.priceNote)}
          </span>
        )}
      </div>
      {pkg.features.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flex: 1 }}>
          {pkg.features.map((f, i) => <FeatureItem key={i} text={f} />)}
        </ul>
      )}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <InlineInfoPanel bestFor={pkg.bestFor} features={pkg.features} />
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'auto', paddingTop: 'var(--space-1)' }}>
        <button
          type="button"
          onClick={() => onToggle(pkg)}
          style={btnStyle}
        >
          {isSelected ? <><Check size={11} strokeWidth={2.5} /> {t.buttons.selected}</> : t.buttons.selectPackage}
        </button>
        <ShowDetailsBtn open={showInfo} onToggle={() => setShowInfo(v => !v)} />
      </div>
    </div>
  )
}

function BundleSelectCard({ bundle, onToggle, isSelected }) {
  const [showInfo, setShowInfo] = useState(false)
  const t = useTranslations()
  const hl = bundle.highlighted
  const tn = (note) => note === 'one-off' ? t.labels.oneOff : note === '/month' ? t.labels.perMonth : note

  const btnStyle = {
    height: 40, padding: '0 var(--space-5)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
    fontSize: 'var(--text-sm)', fontWeight: 600,
    borderRadius: 'var(--radius-md)', cursor: 'pointer',
    transition: 'all 120ms ease', fontFamily: 'inherit', width: '100%',
    ...(isSelected
      ? { background: 'rgba(22,163,74,0.1)', color: 'var(--color-success)', border: '1px solid rgba(22,163,74,0.3)', boxShadow: 'none' }
      : { background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', boxShadow: '0 0 20px rgba(118,39,239,0.3)' }),
  }
  return (
    <div style={{
      background: hl ? 'var(--surface-overlay)' : 'var(--surface-raised)',
      border: `1px solid ${isSelected ? 'var(--color-success)' : hl ? 'rgba(118,39,239,0.4)' : 'var(--border-default)'}`,
      borderLeft: hl ? '3px solid var(--goai-violet)' : undefined,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      boxShadow: hl ? '0 0 20px rgba(118,39,239,0.12)' : 'none',
      transition: 'border-color 150ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {bundle.name}
        </h3>
        <Badge label={bundle.badge} />
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
        {t.journey.bestFor}: {bundle.bestFor}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {bundle.price}
        </span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{tn(bundle.priceNote)}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
        {bundle.features.map((f, i) => <FeatureItem key={i} text={f} />)}
      </ul>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <InlineInfoPanel bestFor={bundle.bestFor} features={bundle.features} />
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'auto' }}>
        <button
          type="button"
          onClick={() => onToggle(bundle)}
          style={btnStyle}
        >
          {isSelected ? <><Check size={13} strokeWidth={2.5} /> {t.buttons.selected}</> : t.buttons.addBundle}
        </button>
        <ShowDetailsBtn open={showInfo} onToggle={() => setShowInfo(v => !v)} />
      </div>
    </div>
  )
}

function AddonSelectCard({ addon, isSelected, onToggle }) {
  const [showInfo, setShowInfo] = useState(false)
  const t = useTranslations()
  const tn = (note) => note === 'one-off' ? t.labels.oneOff : note === '/month' ? t.labels.perMonth : note

  const btnStyle = {
    height: 36, padding: '0 var(--space-4)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
    fontSize: 'var(--text-xs)', fontWeight: 600,
    borderRadius: 'var(--radius-md)', cursor: 'pointer',
    transition: 'all 120ms ease', fontFamily: 'inherit',
    ...(isSelected
      ? { background: 'rgba(22,163,74,0.1)', color: 'var(--color-success)', border: '1px solid rgba(22,163,74,0.3)', boxShadow: 'none' }
      : { background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', boxShadow: '0 0 16px rgba(118,39,239,0.3)' }),
  }

  return (
    <div style={{
      background: isSelected ? 'rgba(118,39,239,0.04)' : 'var(--surface-raised)',
      border: `1px solid ${isSelected ? 'var(--goai-violet)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
      transition: 'border-color 150ms ease, background 150ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {addon.name}
        </h3>
        {!addon.isQuote && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
            <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
              {addon.price}
            </span>
            {addon.priceNote && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{tn(addon.priceNote)}</span>
            )}
          </div>
        )}
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.58rem' }}>{t.journey.bestFor}: </span>
        {addon.bestFor}
      </p>
      {addon.features.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flex: 1 }}>
          {addon.features.map((f, i) => <FeatureItem key={i} text={f} />)}
        </ul>
      )}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <InlineInfoPanel bestFor={addon.bestFor} features={addon.features} />
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-1)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <button
          type="button"
          onClick={() => onToggle(addon)}
          style={btnStyle}
        >
          {isSelected
            ? <><Check size={11} strokeWidth={3} /> {addon.isQuote ? t.buttons.quoteAdded : t.buttons.added}</>
            : (addon.isQuote ? t.buttons.requestAQuote : t.buttons.addToPackage)}
        </button>
        {(addon.features.length > 0 || addon.bestFor) && (
          <ShowDetailsBtn open={showInfo} onToggle={() => setShowInfo(v => !v)} />
        )}
      </div>
    </div>
  )
}

// ─── Step screens ───────────────────────────────────────────────────────────────

function StepHeader({ stepNum, title, description }) {
  const t = useTranslations()
  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--goai-violet)', marginBottom: 'var(--space-2)' }}>
        {t.journey.step} {stepNum} {t.journey.of} {STEP_COUNT}
      </p>
      <h2 style={{ fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 'var(--space-2)' }}>
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '52ch' }}>
          {description}
        </p>
      )}
    </div>
  )
}

function StepWebsite({ onToggle, selected, onSkip, onContinue }) {
  const t = useTranslations()
  const jl = useJourneyLocale()
  return (
    <div>
      <StepHeader
        stepNum={1}
        title={t.journey.steps.website.title}
        description={t.journey.steps.website.desc}
      />
      <WhatsDifferenceStrip activePage="websites" insideJourney={true} />
      <div className="journey-website-grid">
        {WEBSITES.map(ws => (
          <WebsiteSelectCard key={ws.id} website={tItem(jl, 'websites', ws.id, ws)} onToggle={onToggle} isSelected={selected?.id === ws.id} />
        ))}
      </div>
      <div style={{
        marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)',
        borderTop: '1px solid var(--border-default)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--space-3)', flexWrap: 'wrap',
      }}>
        <button
          type="button" onClick={onSkip} style={secondaryBtn}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          {t.buttons.skipStep}
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={!selected}
          style={{
            ...primaryBtn,
            width: 'auto',
            opacity: selected ? 1 : 0.45,
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 0 20px rgba(118,39,239,0.3)' : 'none',
          }}
          onMouseEnter={(e) => { if (selected) { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118,39,239,0.45)' } }}
          onMouseLeave={(e) => { if (selected) { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118,39,239,0.3)' } }}
        >
          {t.buttons.continue} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

function StepPackage({ onToggle, onSkip, onBack, onContinue, selectedItems }) {
  const t = useTranslations()
  const jl = useJourneyLocale()
  return (
    <div>
      <StepHeader
        stepNum={2}
        title={t.journey.steps.package.title}
        description={t.journey.steps.package.desc}
      />
      <WhatsDifferenceStrip activePage="packages" insideJourney={true} />
      {selectedItems.length > 0 && (
        <div style={{
          background: 'rgba(118,39,239,0.06)', border: '1px solid rgba(118,39,239,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
          display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center',
        }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--goai-violet)', flexShrink: 0 }}>
            {t.labels.added}
          </span>
          {selectedItems.map(p => (
            <span key={p.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
              fontSize: 'var(--text-xs)', color: 'var(--text-primary)',
              background: 'var(--surface-overlay)', border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-full)', padding: '2px var(--space-3)',
            }}>
              {p.name}
              <button
                type="button"
                onClick={() => onToggle(p)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', padding: 1, lineHeight: 0 }}
              >
                <XIcon size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="journey-package-grid">
        {PACKAGES.map(pkg => (
          <PackageSelectCard key={pkg.id} pkg={tItem(jl, 'packages', pkg.id, pkg)} onToggle={onToggle} isSelected={selectedItems.some(p => p.id === pkg.id)} />
        ))}
      </div>
      <div style={{
        marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)',
        borderTop: '1px solid var(--border-default)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--space-3)', flexWrap: 'wrap',
      }}>
        <button
          type="button" onClick={onBack} style={backBtn}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
        >
          {t.buttons.back}
        </button>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          {selectedItems.length === 0 && (
            <button
              type="button" onClick={onSkip} style={secondaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              {t.buttons.skipStep}
            </button>
          )}
          <button
            type="button"
            onClick={onContinue}
            style={{ ...primaryBtn, width: 'auto' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118,39,239,0.45)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118,39,239,0.3)' }}
          >
            {t.buttons.continueToBundles} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function StepBundle({ onToggle, onSkip, onBack, onContinue, selectedItems }) {
  const t = useTranslations()
  const jl = useJourneyLocale()
  return (
    <div>
      <StepHeader
        stepNum={3}
        title={t.journey.steps.bundle.title}
        description={t.journey.steps.bundle.desc}
      />
      <WhatsDifferenceStrip activePage="bundles" insideJourney={true} />
      {selectedItems.length > 0 && (
        <div style={{
          background: 'rgba(118,39,239,0.06)', border: '1px solid rgba(118,39,239,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
          display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center',
        }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--goai-violet)', flexShrink: 0 }}>
            {t.labels.added}
          </span>
          {selectedItems.map(b => (
            <span key={b.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
              fontSize: 'var(--text-xs)', color: 'var(--text-primary)',
              background: 'var(--surface-overlay)', border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-full)', padding: '2px var(--space-3)',
            }}>
              {b.name}
              <button
                type="button"
                onClick={() => onToggle(b)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', padding: 1, lineHeight: 0 }}
              >
                <XIcon size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="journey-bundle-grid">
        {BUNDLES.map(bundle => (
          <BundleSelectCard key={bundle.id} bundle={tItem(jl, 'bundles', bundle.id, bundle)} onToggle={onToggle} isSelected={selectedItems.some(b => b.id === bundle.id)} />
        ))}
      </div>
      <div style={{
        marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)',
        borderTop: '1px solid var(--border-default)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--space-3)', flexWrap: 'wrap',
      }}>
        <button
          type="button" onClick={onBack} style={backBtn}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
        >
          {t.buttons.back}
        </button>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          {selectedItems.length === 0 && (
            <button
              type="button" onClick={onSkip} style={secondaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              {t.buttons.skipStep}
            </button>
          )}
          <button
            type="button"
            onClick={onContinue}
            style={{ ...primaryBtn, width: 'auto' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118,39,239,0.45)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118,39,239,0.3)' }}
          >
            {t.buttons.continueToAddons} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function StepAddons({ selectedAddons, onToggle, onContinue, onSkip, onBack }) {
  const t = useTranslations()
  const jl = useJourneyLocale()
  const selectedIds = selectedAddons.map(a => a.id)

  const localizedGroups = ADDON_GROUPS.map((group, gi) => ({
    ...group,
    title: jl?.addonGroupTitles?.[gi] || group.title,
    subtitle: jl?.addonGroupSubtitles?.[gi] !== undefined ? jl.addonGroupSubtitles[gi] : group.subtitle,
    addons: group.addons.map(addon => tItem(jl, 'addons', addon.id, addon)),
  }))

  return (
    <div>
      <StepHeader
        stepNum={4}
        title={t.journey.steps.addons.title}
        description={t.journey.steps.addons.desc}
      />
      <WhatsDifferenceStrip activePage="addons" insideJourney={true} />
      {selectedAddons.length > 0 && (
        <div style={{
          background: 'rgba(118,39,239,0.06)', border: '1px solid rgba(118,39,239,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
          display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center',
        }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--goai-violet)', flexShrink: 0 }}>
            {t.labels.added}
          </span>
          {selectedAddons.map(a => (
            <span key={a.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
              fontSize: 'var(--text-xs)', color: 'var(--text-primary)',
              background: 'var(--surface-overlay)', border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-full)', padding: '2px var(--space-3)',
            }}>
              {a.name}
              <button
                type="button"
                onClick={() => onToggle(a)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', padding: 1, lineHeight: 0 }}
              >
                <XIcon size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
        {localizedGroups.map((group, gi) => (
          <div key={gi}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: group.subtitle ? 'var(--space-2)' : 0 }}>
                {group.title}
              </h3>
              {group.subtitle && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '60ch' }}>
                  {group.subtitle}
                </p>
              )}
            </div>
            <div className="journey-addon-grid">
              {group.addons.map(addon => (
                <AddonSelectCard key={addon.id} addon={addon} isSelected={selectedIds.includes(addon.id)} onToggle={onToggle} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)',
        borderTop: '1px solid var(--border-default)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--space-3)', flexWrap: 'wrap',
      }}>
        <button
          type="button" onClick={onBack} style={backBtn}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
        >
          {t.buttons.back}
        </button>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          {selectedAddons.length === 0 && (
            <button
              type="button" onClick={onSkip} style={secondaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              {t.buttons.skipAddons}
            </button>
          )}
          <button
            type="button"
            onClick={onContinue}
            style={{
              height: 40, padding: '0 var(--space-6)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600,
              background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
              color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)',
              boxShadow: '0 0 24px rgba(118,39,239,0.35)',
              cursor: 'pointer', transition: 'filter 120ms ease, box-shadow 120ms ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(118,39,239,0.5)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(118,39,239,0.35)' }}
          >
            {t.buttons.continueToReview} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ReviewRow({ label, value, lines, onEdit, editLabel = 'Edit', placeholder = 'None selected' }) {
  const hasContent = value || (lines && lines.length > 0)
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 'var(--space-4)', padding: 'var(--space-4) 0',
      borderBottom: '1px solid var(--border-default)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          {label}
        </span>
        {hasContent ? (
          lines ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {lines.map((l, i) => <span key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{l}</span>)}
            </div>
          ) : (
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{value}</span>
          )
        ) : (
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>{placeholder}</span>
        )}
      </div>
      <button
        type="button"
        onClick={onEdit}
        style={{
          ...ghostBtn, height: 28, padding: '0 var(--space-3)', flexShrink: 0,
          fontSize: '0.65rem',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
      >
        <Pencil size={10} /> {editLabel}
      </button>
    </div>
  )
}

function StepReview({ website, packages, bundles, addons, oneOffItems, monthlyItems, quoteItems, oneOffTotal, monthlyTotal, hasQuoteItems, hasFixedItems, onEditWebsite, onEditPackage, onEditBundle, onEditAddons, onPaySecurely, onRequestProposal, onBack }) {
  const t = useTranslations()
  const rv = t.journey.reviewRows
  const pn = (note) => note === 'one-off' ? t.labels.oneOff : note === '/month' ? t.labels.perMonth : (note || '')
  const tp = (price) => translatePrice(price, t)
  return (
    <div>
      <StepHeader
        stepNum={5}
        title={t.journey.steps.review.title}
        description={t.journey.steps.review.desc}
      />
      <WhatsDifferenceStrip activePage="quote" insideJourney={true} />

      {/* Selections summary */}
      <div style={{
        background: 'var(--surface-overlay)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-2) var(--space-6)',
        marginBottom: 'var(--space-6)',
      }}>
        <ReviewRow
          label={rv.websiteLabel}
          value={website ? `${website.name} — ${website.isQuote ? t.labels.quoteRequired : website.price}${website.priceNote ? ' ' + pn(website.priceNote) : ''}` : null}
          onEdit={onEditWebsite}
          editLabel={rv.editWebsite}
          placeholder={rv.noWebsite}
        />
        <ReviewRow
          label={rv.packageLabel}
          lines={packages.length ? packages.map(p =>
            p.isQuote
              ? `${p.name} — ${rv.quoteRequired}`
              : `${p.name} — ${tp(p.price)}${p.priceNote ? ' ' + pn(p.priceNote) : ''}`
          ) : undefined}
          onEdit={onEditPackage}
          editLabel={rv.editPackage}
          placeholder={rv.noPackage}
        />
        <ReviewRow
          label={rv.bundleLabel}
          lines={bundles.length ? bundles.map(b =>
            b.isQuote
              ? `${b.name} — ${rv.quoteRequired}`
              : `${b.name} — ${b.price}${b.priceNote ? ' ' + pn(b.priceNote) : ''}`
          ) : undefined}
          onEdit={onEditBundle}
          editLabel={rv.editBundle}
          placeholder={rv.noBundle}
        />
        <ReviewRow
          label={rv.addonsLabel}
          lines={addons.length ? addons.map(a =>
            a.isQuote
              ? `${a.name} — ${rv.quoteRequired}`
              : `${a.name} — ${a.price}${a.priceNote ? ' ' + pn(a.priceNote) : ''}`
          ) : undefined}
          onEdit={onEditAddons}
          editLabel={rv.editAddons}
          placeholder={rv.noAddons}
        />
      </div>

      {/* Totals */}
      <div style={{ display: 'grid', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }} className="journey-totals-grid">
        {oneOffItems.length > 0 && (
          <div style={{
            background: 'var(--surface-raised)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              {rv.dueToday}
            </p>
            {oneOffItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-1) 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span>{item.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>€{item.amount.toLocaleString('en-IE')}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-default)', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{rv.totalDueToday}</span>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>€{oneOffTotal.toLocaleString('en-IE')}</span>
            </div>
          </div>
        )}
        {monthlyItems.length > 0 && (
          <div style={{
            background: 'var(--surface-raised)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              {rv.monthly}
            </p>
            {monthlyItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-1) 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span>{item.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>€{item.amount}{t.labels.perMonth}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-default)', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{rv.monthlyFrom}</span>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>€{monthlyTotal}{t.labels.perMonth}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quote items notice */}
      {hasQuoteItems && (
        <div style={{
          background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
        }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent-500)', margin: 0 }}>
            {rv.quoteItems}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {quoteItems.map((name, i) => (
              <p key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {name} — <span style={{ color: 'var(--color-accent-500)', fontWeight: 500 }}>{rv.quoteRequired}</span>
              </p>
            ))}
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', margin: 0 }}>
            {rv.quoteNote}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
        <button
          type="button" onClick={onBack} style={{ ...backBtn, marginRight: 'auto' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
        >
          {t.buttons.back}
        </button>

        {/* Request Proposal — primary when quote items present */}
        <button
          type="button"
          onClick={onRequestProposal}
          style={{
            height: 48, padding: '0 var(--space-8)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)', fontWeight: 600,
            background: hasQuoteItems ? 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)' : 'transparent',
            color: hasQuoteItems ? '#FFFFFF' : 'var(--text-primary)',
            border: hasQuoteItems ? 'none' : '1px solid var(--goai-violet)',
            borderRadius: 'var(--radius-md)',
            boxShadow: hasQuoteItems ? '0 0 28px rgba(118,39,239,0.4)' : 'none',
            cursor: 'pointer', transition: 'all 120ms ease',
            fontFamily: 'inherit',
            order: hasQuoteItems ? 0 : 1,
          }}
          onMouseEnter={(e) => {
            if (!hasQuoteItems) {
              e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.border = '1px solid transparent'
            }
          }}
          onMouseLeave={(e) => {
            if (!hasQuoteItems) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.border = '1px solid var(--goai-violet)'
            }
          }}
        >
          {t.buttons.requestProposal}
        </button>

        {/* Pay Securely — primary when only fixed items */}
        {hasFixedItems && (
          <button
            type="button"
            onClick={onPaySecurely}
            style={{
              height: 48, padding: '0 var(--space-8)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600,
              background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
              color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)',
              boxShadow: '0 0 28px rgba(118,39,239,0.4)',
              cursor: 'pointer', transition: 'filter 120ms ease, box-shadow 120ms ease',
              fontFamily: 'inherit',
              order: hasQuoteItems ? 1 : 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118,39,239,0.55)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(118,39,239,0.4)' }}
          >
            <Lock size={14} /> {t.buttons.paySecurely}
          </button>
        )}
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', marginTop: 'var(--space-4)' }}>
        {t.forms.vatNoteReview}
      </p>
    </div>
  )
}

// ─── Payment step ──────────────────────────────────────────────────────────────

function PaySuccessScreen({ hasMonthly }) {
  const t = useTranslations()
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-8)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Check size={28} strokeWidth={2} style={{ color: 'var(--color-success)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '44ch' }}>
        <h2 style={{ fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {t.success.paymentTitle}
        </h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {hasMonthly ? t.success.paymentRecurring : t.success.paymentOneOff}
        </p>
      </div>
    </div>
  )
}

function FormField({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>
        {label} <span style={{ color: '#dc2626' }}>*</span>
      </label>
      {children}
      {error && (
        <span style={{ fontSize: '0.68rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4 }}>
          <AlertCircle size={11} /> {error}
        </span>
      )}
    </div>
  )
}

function StepPayment({ oneOffItems, monthlyItems, oneOffTotal, monthlyTotal, hasMonthlyItems, onBack }) {
  const t = useTranslations()
  const [form, setForm] = useState({ name: '', card: '', expiry: '', cvv: '', postcode: '', email: '', agreed: false })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  }

  const validate = () => {
    const e = {}
    const pl = t.journey.paymentLabels
    if (!form.name.trim()) e.name = pl.errRequired
    if (form.card.replace(/\s/g, '').length < 16) e.card = pl.errCardInvalid
    if (form.expiry.length < 5) e.expiry = pl.errExpiryInvalid
    if (form.cvv.length < 3) e.cvv = pl.errCvvInvalid
    if (!form.postcode.trim()) e.postcode = pl.errRequired
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = pl.errEmailInvalid
    if (!form.agreed) e.agreed = pl.errTermsRequired
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // TODO: Connect to Stripe or payment provider before launch.
  // Card details are held in local component state for display only and are NOT sent to any backend.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const inputBase = (hasError) => ({
    width: '100%', height: 44,
    background: 'var(--surface-subtle)',
    border: `1px solid ${hasError ? '#dc2626' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-md)',
    padding: '0 var(--space-4)',
    color: 'var(--text-primary)',
    fontSize: 'var(--text-sm)', fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 120ms ease',
  })

  if (submitted) return <PaySuccessScreen hasMonthly={hasMonthlyItems} />

  return (
    <div>
      <StepHeader
        stepNum={6}
        title={t.journey.steps.payment.title}
        description={t.journey.steps.payment.desc}
      />

      {/* Compact order summary */}
      <div style={{
        background: 'var(--surface-overlay)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
      }}>
        <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
          {t.journey.paymentLabels.orderSummary}
        </p>
        {oneOffItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span>{item.name}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>€{item.amount.toLocaleString('en-IE')}</span>
          </div>
        ))}
        {monthlyItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span>{item.name}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>€{item.amount}{t.labels.perMonth}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-1)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          {oneOffTotal > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', alignItems: 'baseline' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{t.journey.reviewRows.totalDueToday}</span>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>€{oneOffTotal.toLocaleString('en-IE')}</span>
            </div>
          )}
          {monthlyTotal > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{t.journey.paymentLabels.thenMonthlyFrom}</span>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)' }}>€{monthlyTotal}{t.labels.perMonth}</span>
            </div>
          )}
        </div>
      </div>

      {/* Recurring services notice */}
      {hasMonthlyItems && (
        <div style={{
          background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
          display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
        }}>
          <AlertCircle size={15} style={{ color: 'var(--color-accent-500)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            {t.journey.paymentLabels.recurringNotice}
          </p>
        </div>
      )}

      {/* Payment form */}
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

        <FormField label={t.forms.cardholderName} error={errors.name}>
          <input
            type="text" value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder={t.forms.cardNamePlaceholder}
            style={inputBase(errors.name)}
            onFocus={e => { e.target.style.borderColor = 'var(--goai-violet)' }}
            onBlur={e => { e.target.style.borderColor = errors.name ? '#dc2626' : 'var(--border-default)' }}
          />
        </FormField>

        <FormField label={t.forms.cardNumber} error={errors.card}>
          <div style={{ position: 'relative' }}>
            <input
              type="text" value={form.card}
              onChange={e => update('card', formatCard(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              style={{ ...inputBase(errors.card), paddingRight: 44 }}
              onFocus={e => { e.target.style.borderColor = 'var(--goai-violet)' }}
              onBlur={e => { e.target.style.borderColor = errors.card ? '#dc2626' : 'var(--border-default)' }}
            />
            <CreditCard size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
          </div>
        </FormField>

        <div className="journey-payment-grid">
          <FormField label={t.forms.expiryDate} error={errors.expiry}>
            <input
              type="text" value={form.expiry}
              onChange={e => update('expiry', formatExpiry(e.target.value))}
              placeholder="MM/YY" maxLength={5}
              style={inputBase(errors.expiry)}
              onFocus={e => { e.target.style.borderColor = 'var(--goai-violet)' }}
              onBlur={e => { e.target.style.borderColor = errors.expiry ? '#dc2626' : 'var(--border-default)' }}
            />
          </FormField>
          <FormField label={t.forms.securityCode} error={errors.cvv}>
            <input
              type="password" value={form.cvv}
              onChange={e => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="CVV" maxLength={4}
              style={inputBase(errors.cvv)}
              onFocus={e => { e.target.style.borderColor = 'var(--goai-violet)' }}
              onBlur={e => { e.target.style.borderColor = errors.cvv ? '#dc2626' : 'var(--border-default)' }}
            />
          </FormField>
        </div>

        <div className="journey-payment-grid">
          <FormField label={t.forms.billingPostcode} error={errors.postcode}>
            <input
              type="text" value={form.postcode}
              onChange={e => update('postcode', e.target.value.toUpperCase())}
              placeholder={t.forms.postcodePlaceholder}
              style={inputBase(errors.postcode)}
              onFocus={e => { e.target.style.borderColor = 'var(--goai-violet)' }}
              onBlur={e => { e.target.style.borderColor = errors.postcode ? '#dc2626' : 'var(--border-default)' }}
            />
          </FormField>
          <FormField label={t.forms.emailReceipt} error={errors.email}>
            <input
              type="email" value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="you@example.com"
              style={inputBase(errors.email)}
              onFocus={e => { e.target.style.borderColor = 'var(--goai-violet)' }}
              onBlur={e => { e.target.style.borderColor = errors.email ? '#dc2626' : 'var(--border-default)' }}
            />
          </FormField>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <input
            type="checkbox" id="pay-terms"
            checked={form.agreed}
            onChange={e => update('agreed', e.target.checked)}
            style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--goai-violet)' }}
          />
          <div>
            <label htmlFor="pay-terms" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, cursor: 'pointer' }}>
              {t.forms.agreeTerms}
            </label>
            {errors.agreed && (
              <p style={{ fontSize: '0.68rem', color: '#dc2626', margin: 'var(--space-1) 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                <AlertCircle size={11} /> {errors.agreed}
              </p>
            )}
          </div>
        </div>

        <div style={{
          paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-default)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 'var(--space-3)', flexWrap: 'wrap',
        }}>
          <button
            type="button" onClick={onBack} style={backBtn}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
          >
            {t.buttons.back}
          </button>
          <button
            type="submit"
            style={{
              height: 48, padding: '0 var(--space-8)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600,
              background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
              color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)',
              boxShadow: '0 0 28px rgba(118,39,239,0.4)',
              cursor: 'pointer', transition: 'filter 120ms ease, box-shadow 120ms ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118,39,239,0.55)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(118,39,239,0.4)' }}
          >
            <Lock size={14} /> {t.buttons.paySecurelyNow}
          </button>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          {t.forms.vatNote}
        </p>
      </form>
    </div>
  )
}

// ─── Journey wizard ─────────────────────────────────────────────────────────────

function JourneyWizard() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  const jl = useJourneyLocale()

  // State stores stable IDs only — never translated text
  const [step, setStep] = useState(0)
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null)
  const [selectedPackageIds, setSelectedPackageIds] = useState([])
  const [selectedBundleIds, setSelectedBundleIds] = useState([])
  const [selectedAddonIds, setSelectedAddonIds] = useState([])

  // Flat addon list for ID lookups
  const allAddonsFlat = ADDON_GROUPS.flatMap(g => g.addons)

  // Derive current-language objects from IDs on every render
  // so display names always match the active language
  const selectedWebsite = selectedWebsiteId
    ? tItem(jl, 'websites', selectedWebsiteId, WEBSITES.find(w => w.id === selectedWebsiteId))
    : null
  const selectedPackages = selectedPackageIds
    .map(id => tItem(jl, 'packages', id, PACKAGES.find(p => p.id === id)))
    .filter(Boolean)
  const selectedBundles = selectedBundleIds
    .map(id => tItem(jl, 'bundles', id, BUNDLES.find(b => b.id === id)))
    .filter(Boolean)
  const selectedAddons = selectedAddonIds
    .map(id => tItem(jl, 'addons', id, allAddonsFlat.find(a => a.id === id)))
    .filter(Boolean)

  const goToStep = (s) => {
    setStep(s)
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  // Website — select only, no auto-advance
  const toggleWebsite = (ws) => setSelectedWebsiteId(prev => prev === ws.id ? null : ws.id)
  const skipWebsite = () => { setSelectedWebsiteId(null); goToStep(1) }
  const continueFromWebsite = () => goToStep(1)

  // Packages — multi-select, no auto-advance
  const togglePackage = (pkg) => setSelectedPackageIds(prev =>
    prev.includes(pkg.id) ? prev.filter(id => id !== pkg.id) : [...prev, pkg.id]
  )
  const skipPackage = () => { setSelectedPackageIds([]); goToStep(2) }
  const continueFromPackage = () => goToStep(2)

  // Bundles — multi-select, no auto-advance
  const toggleBundle = (bundle) => setSelectedBundleIds(prev =>
    prev.includes(bundle.id) ? prev.filter(id => id !== bundle.id) : [...prev, bundle.id]
  )
  const skipBundle = () => { setSelectedBundleIds([]); goToStep(3) }
  const continueFromBundle = () => goToStep(3)

  const continueToReview = () => goToStep(4)
  const skipAddons = () => { setSelectedAddonIds([]); goToStep(4) }

  const toggleAddon = (addon) => setSelectedAddonIds(prev =>
    prev.includes(addon.id) ? prev.filter(id => id !== addon.id) : [...prev, addon.id]
  )

  // Derived display data — uses current-language names since selectedWebsite/Packages/etc.
  // are freshly computed from the current jl locale on each render
  const oneOffItems = [
    selectedWebsite && !selectedWebsite.isQuote ? { name: selectedWebsite.name, amount: selectedWebsite.oneOff } : null,
    ...selectedPackages.filter(p => !p.isQuote && p.oneOff > 0).map(p => ({ name: p.oneOff > 0 && p.monthly > 0 ? `${p.name} (${t.pricing.setupLabel})` : p.name, amount: p.oneOff })),
    ...selectedBundles.filter(b => !b.isQuote && b.oneOff > 0).map(b => ({ name: `${b.name} (${t.pricing.setupLabel})`, amount: b.oneOff })),
    ...selectedAddons.filter(a => !a.isQuote && a.oneOff > 0).map(a => ({ name: a.name, amount: a.oneOff })),
  ].filter(Boolean)

  const monthlyItems = [
    ...selectedPackages.filter(p => !p.isQuote && p.monthly > 0).map(p => ({ name: p.name, amount: p.monthly })),
    ...selectedBundles.filter(b => !b.isQuote).map(b => ({ name: b.name, amount: b.monthly })),
    ...selectedAddons.filter(a => !a.isQuote && a.monthly > 0).map(a => ({ name: a.name, amount: a.monthly })),
  ].filter(Boolean)

  const quoteItems = [
    selectedWebsite?.isQuote ? selectedWebsite.name : null,
    ...selectedPackages.filter(p => p.isQuote).map(p => p.name),
    ...selectedBundles.filter(b => b.isQuote).map(b => b.name),
    ...selectedAddons.filter(a => a.isQuote).map(a => a.name),
  ].filter(Boolean)

  const oneOffTotal = oneOffItems.reduce((s, i) => s + i.amount, 0)
  const monthlyTotal = monthlyItems.reduce((s, i) => s + i.amount, 0)
  const hasQuoteItems = quoteItems.length > 0
  const hasFixedItems = oneOffItems.length > 0 || monthlyItems.length > 0

  const handlePaySecurely = () => goToStep(5)

  const handleRequestQuote = () => {
    const summary = {
      website:  selectedWebsite ? `${selectedWebsite.name} — ${selectedWebsite.price}${selectedWebsite.priceNote ? ' ' + selectedWebsite.priceNote : ''}` : null,
      packages: selectedPackages.length ? selectedPackages.map(p => `${p.name} — ${p.price}${p.priceNote ? ' ' + p.priceNote : ''}`).join(', ') : null,
      bundles:  selectedBundles.length ? selectedBundles.map(b => `${b.name} — ${b.price}${b.priceNote ? ' ' + b.priceNote : ''}`).join(', ') : null,
      addons:   selectedAddons.length ? selectedAddons.map(a => `${a.name} (${a.price})`).join(', ') : null,
    }
    navigate('/request-quote', { state: { journeySummary: summary } })
  }

  const fade = reduceMotion
    ? {}
    : { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 }, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }

  return (
    <div>
      <ProgressIndicator currentStep={step} onGoToStep={(s) => s < step && goToStep(s)} />
      <AnimatePresence mode="wait">
        <motion.div key={step} {...fade}>
          {step === 0 && (
            <StepWebsite
              onToggle={toggleWebsite}
              selected={selectedWebsite}
              onSkip={skipWebsite}
              onContinue={continueFromWebsite}
            />
          )}
          {step === 1 && (
            <StepPackage
              onToggle={togglePackage}
              onSkip={skipPackage}
              onBack={() => goToStep(0)}
              onContinue={continueFromPackage}
              selectedItems={selectedPackages}
            />
          )}
          {step === 2 && (
            <StepBundle
              onToggle={toggleBundle}
              onSkip={skipBundle}
              onBack={() => goToStep(1)}
              onContinue={continueFromBundle}
              selectedItems={selectedBundles}
            />
          )}
          {step === 3 && (
            <StepAddons
              selectedAddons={selectedAddons}
              onToggle={toggleAddon}
              onContinue={continueToReview}
              onSkip={skipAddons}
              onBack={() => goToStep(2)}
            />
          )}
          {step === 4 && (
            <StepReview
              website={selectedWebsite}
              packages={selectedPackages}
              bundles={selectedBundles}
              addons={selectedAddons}
              oneOffItems={oneOffItems}
              monthlyItems={monthlyItems}
              quoteItems={quoteItems}
              oneOffTotal={oneOffTotal}
              monthlyTotal={monthlyTotal}
              hasQuoteItems={hasQuoteItems}
              hasFixedItems={hasFixedItems}
              onEditWebsite={() => goToStep(0)}
              onEditPackage={() => goToStep(1)}
              onEditBundle={() => goToStep(2)}
              onEditAddons={() => goToStep(3)}
              onPaySecurely={handlePaySecurely}
              onRequestProposal={handleRequestQuote}
              onBack={() => goToStep(3)}
            />
          )}
          {step === 5 && (
            <StepPayment
              oneOffItems={oneOffItems}
              monthlyItems={monthlyItems}
              oneOffTotal={oneOffTotal}
              monthlyTotal={monthlyTotal}
              hasMonthlyItems={monthlyItems.length > 0}
              onBack={() => goToStep(4)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function Journey() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: reduceMotion ? 0 : 0.04 } },
  }
  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={t.journey.heroTag}
        title={t.journey.heroTitle}
        description={t.journey.heroDesc}
      />

      {/* ── Journey wizard ── */}
      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto' }}>
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <JourneyWizard />
          </motion.div>
        </div>
      </section>

      {/* ── What's the difference? (preserved) ── */}
      <section
        id="whats-the-difference"
        style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-base)', borderBottom: '1px solid var(--border-default)' }}
      >
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--goai-violet)', marginBottom: 'var(--space-3)',
            }}>
              {t.strip.quickRef}
            </p>
            <h2 style={{
              fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))',
              fontWeight: 700, letterSpacing: '-0.01em',
              color: 'var(--text-primary)', lineHeight: 1.2,
            }}>
              {t.strip.heading}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {differenceItems.map((item) => {
              const Icon = item.icon
              const card = t.strip.cards[item.id] || { term: item.term, subtitle: item.subtitle, description: item.description }
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  style={{
                    background: 'var(--surface-raised)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-5)',
                    display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{
                      width: 32, height: 32, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(118, 39, 239, 0.1)',
                      border: '1px solid rgba(118, 39, 239, 0.2)',
                      color: 'var(--goai-violet)',
                    }}>
                      <Icon size={15} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {card.term}
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </section>

      <style>{`
        .journey-website-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); }
        .journey-package-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
        .journey-bundle-grid  { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); }
        .journey-addon-grid   { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-4); }
        .journey-totals-grid  { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
        .journey-payment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
        @media (max-width: 900px) {
          .journey-package-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .journey-website-grid,
          .journey-package-grid,
          .journey-bundle-grid,
          .journey-addon-grid,
          .journey-totals-grid,
          .journey-payment-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
