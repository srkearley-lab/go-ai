import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Globe, Package, Layers, PlusCircle, FileText,
  ArrowRight, Check, X as XIcon, ShoppingCart, Pencil,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { useBasket } from '../context/BasketContext'

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
    id: 'pkg-hosting-care',
    name: 'Hosting & Website Care',
    price: '€100',
    priceNote: '/month',
    oneOff: 0,
    monthly: 100,
    isQuote: false,
    bestFor: 'Businesses wanting hosting and technical care managed',
    features: ['Reliable managed hosting', 'Security monitoring and backups', 'Up to 2 hrs content updates/month', 'Performance monitoring'],
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
    name: 'Website and Hosting Care',
    badge: 'Peace of Mind',
    price: '€90',
    priceNote: '/month',
    oneOff: 0,
    monthly: 90,
    isQuote: false,
    bestFor: 'Businesses wanting a website kept fast, secure and up to date',
    features: ['Professional website build', 'Reliable managed hosting', 'Monthly security and backups', 'Up to 2 hours of updates/month'],
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
    bestFor: 'Businesses building an online presence and active social media',
    features: ['Professional website build', 'Managed hosting included', '12 social posts/month', 'Captions, hashtags, scheduling'],
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
    bestFor: 'Growing businesses wanting a complete digital presence',
    features: ['Professional website build', 'Managed hosting', 'Monthly SEO blog posts', 'Email newsletter campaigns', '12 social posts/month', 'Google ranking monitoring'],
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
    features: ['Professional website build', 'Managed hosting', 'WhatsApp enquiry automation', 'Email follow-up sequences', 'CRM lead tracking'],
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
    features: ['Full website build and hosting', 'Monthly social media content', 'SEO blog posts and email campaigns', 'WhatsApp automation and CRM', 'AI Avatar and Video content', 'Dedicated account manager'],
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
    ],
  },
  {
    title: 'Monthly Support Add-ons',
    addons: [
      { id: 'addon-hosting-care', name: 'Hosting & Website Care', price: '€30', priceNote: '/month', oneOff: 0, monthly: 30, isQuote: false, bestFor: 'Businesses wanting technical care without managing it', features: ['Hosting and managed storage', 'Uptime monitoring', 'Security checks and backups', 'SSL and domain support'] },
      { id: 'addon-extra-storage', name: 'Extra Website Storage', price: '€10', priceNote: '/month', oneOff: 0, monthly: 10, isQuote: false, bestFor: 'Businesses with larger galleries, PDFs, or media', features: ['Extra managed storage', 'Image and PDF support', 'Storage monitoring'] },
      { id: 'addon-priority-updates', name: 'Priority Updates', price: '€30', priceNote: '/month', oneOff: 0, monthly: 30, isQuote: false, bestFor: 'Businesses needing fast turnaround on changes', features: ['Priority handling', 'Faster response times', 'Text, image and price updates'] },
      { id: 'addon-content-refresh', name: 'Monthly Content Refresh', price: '€50', priceNote: '/month', oneOff: 0, monthly: 50, isQuote: false, bestFor: 'Businesses wanting their site kept fresh', features: ['One monthly content refresh', 'Content and image updates', 'Improvement notes'] },
      { id: 'addon-seo-basics', name: 'SEO Basics', price: '€50', priceNote: '/month', oneOff: 0, monthly: 50, isQuote: false, bestFor: 'Businesses wanting better local search visibility', features: ['Page title tidy-up', 'Meta descriptions', 'Heading checks', 'Local keyword alignment'] },
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
      { id: 'addon-ai-avatar-video', name: 'AI Avatar / Video Content', price: 'Quote required', priceNote: null, oneOff: 0, monthly: 0, isQuote: true, bestFor: 'Businesses wanting AI-generated video for social media', features: [] },
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
  { icon: Globe,      term: 'Websites',    subtitle: 'One-off website builds',      description: 'One-off website builds for businesses that need a professional online presence.' },
  { icon: Package,    term: 'Packages',    subtitle: 'Structured service options',   description: 'Structured service options that combine key website features into clear, ready-made choices.' },
  { icon: Layers,     term: 'Bundles',     subtitle: 'Monthly support plans',        description: 'Monthly support plans for businesses that want ongoing updates, improvements, hosting support, content changes, and digital growth support.' },
  { icon: PlusCircle, term: 'Add-ons',     subtitle: 'Optional extras',              description: 'Optional extras that can be added to a website, package, or bundle, such as storage, hosting support, extra pages, forms, automation, integrations, or additional features.' },
  { icon: FileText,   term: 'Get a Quote', subtitle: 'Tailored recommendation',      description: 'Best for customers who are unsure what they need or want a tailored recommendation based on their business.' },
]

// ─── Shared helpers ─────────────────────────────────────────────────────────────

const BADGE_COLORS = {
  'Entry Level':     { bg: 'rgba(22,163,74,0.08)',   border: 'rgba(22,163,74,0.18)',   color: 'var(--color-success)' },
  'Starter':         { bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.2)',   color: 'var(--color-brand-400)' },
  'Recommended':     { bg: 'var(--color-brand-500)', border: 'var(--color-brand-600)', color: 'var(--color-neutral-0)' },
  'Best for Growth': { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-400)' },
  'Premium':         { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)',  color: 'var(--color-accent-400)' },
  'Peace of Mind':   { bg: 'rgba(22,163,74,0.1)',    border: 'rgba(22,163,74,0.2)',    color: 'var(--color-success)' },
  'Growth':          { bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.2)',   color: 'var(--color-accent-500)' },
  'Automation':      { bg: 'rgba(99,102,241,0.1)',   border: 'rgba(99,102,241,0.2)',   color: 'var(--color-brand-400)' },
}

function Badge({ label }) {
  const c = BADGE_COLORS[label] || { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', color: 'var(--color-brand-400)' }
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

const STEP_LABELS = ['Website', 'Package', 'Bundle', 'Add-ons', 'Review & Complete']

function ProgressIndicator({ currentStep, onGoToStep }) {
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-3)', overflowX: 'auto', paddingBottom: 2 }}>
        {STEP_LABELS.map((label, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <div
              key={label}
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
        Step {currentStep + 1} of {STEP_LABELS.length}
      </p>
    </div>
  )
}

// ─── Selection cards ────────────────────────────────────────────────────────────

function WebsiteSelectCard({ website, onToggle, isSelected }) {
  const hl = website.highlighted
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
          Best for: {website.bestFor}
        </p>
      </div>
      <div>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {website.price}
        </span>
        {website.priceNote && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginLeft: 'var(--space-2)' }}>
            {website.priceNote}
          </span>
        )}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
        {website.features.map(f => <FeatureItem key={f} text={f} />)}
      </ul>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'auto' }}>
        <button
          type="button"
          onClick={() => onToggle(website)}
          style={isSelected ? selectedBtn : primaryBtn}
          onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118,39,239,0.45)' } }}
          onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118,39,239,0.3)' } }}
        >
          {isSelected ? <><Check size={13} strokeWidth={2.5} /> Selected</> : 'Select this website'}
        </button>
        <Link
          to="/websites"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--color-brand-400)', textAlign: 'center', display: 'block', padding: 'var(--space-1)', transition: 'color 120ms ease', textDecoration: 'none' }}
        >
          Learn more ↗
        </Link>
      </div>
    </div>
  )
}

function PackageSelectCard({ pkg, onToggle, isSelected }) {
  return (
    <div style={{
      background: 'var(--surface-raised)',
      border: `1px solid ${isSelected ? 'var(--color-success)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
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
          {pkg.price}
        </span>
        {pkg.priceNote && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginLeft: 'var(--space-1)' }}>
            {pkg.priceNote}
          </span>
        )}
      </div>
      {pkg.features.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flex: 1 }}>
          {pkg.features.map(f => <FeatureItem key={f} text={f} />)}
        </ul>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'auto', paddingTop: 'var(--space-1)' }}>
        <button
          type="button"
          onClick={() => onToggle(pkg)}
          style={isSelected ? { ...selectedBtn, height: 36, fontSize: 'var(--text-xs)' } : { ...primaryBtn, height: 36, fontSize: 'var(--text-xs)' }}
          onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1.1)' } }}
          onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1)' } }}
        >
          {isSelected ? <><Check size={11} strokeWidth={2.5} /> Selected</> : 'Select this package'}
        </button>
        <Link
          to="/packages"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--color-brand-400)', textAlign: 'center', display: 'block', padding: 'var(--space-1)', transition: 'color 120ms ease', textDecoration: 'none' }}
        >
          Learn more ↗
        </Link>
      </div>
    </div>
  )
}

function BundleSelectCard({ bundle, onToggle, isSelected }) {
  const hl = bundle.highlighted
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
        Best for: {bundle.bestFor}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
          {bundle.price}
        </span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{bundle.priceNote}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
        {bundle.features.map(f => <FeatureItem key={f} text={f} />)}
      </ul>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'auto' }}>
        <button
          type="button"
          onClick={() => onToggle(bundle)}
          style={isSelected ? selectedBtn : primaryBtn}
          onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118,39,239,0.45)' } }}
          onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(118,39,239,0.3)' } }}
        >
          {isSelected ? <><Check size={13} strokeWidth={2.5} /> Added</> : 'Add this bundle'}
        </button>
        <Link
          to="/bundles"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--color-brand-400)', textAlign: 'center', display: 'block', padding: 'var(--space-1)', transition: 'color 120ms ease', textDecoration: 'none' }}
        >
          Learn more ↗
        </Link>
      </div>
    </div>
  )
}

function AddonSelectCard({ addon, isSelected, onToggle }) {
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
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{addon.priceNote}</span>
            )}
          </div>
        )}
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.58rem' }}>Best for: </span>
        {addon.bestFor}
      </p>
      {addon.features.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', flex: 1 }}>
          {addon.features.map(f => <FeatureItem key={f} text={f} />)}
        </ul>
      )}
      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-1)' }}>
        <button
          type="button"
          onClick={() => onToggle(addon)}
          style={{
            height: 36, padding: '0 var(--space-4)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-xs)', fontWeight: 600,
            background: isSelected ? 'rgba(22,163,74,0.1)' : 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
            color: isSelected ? 'var(--color-success)' : '#FFFFFF',
            border: isSelected ? '1px solid rgba(22,163,74,0.3)' : 'none',
            borderRadius: 'var(--radius-md)', cursor: 'pointer',
            boxShadow: isSelected ? 'none' : '0 0 16px rgba(118,39,239,0.3)',
            transition: 'all 120ms ease', fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.filter = 'brightness(1.1)' }}
          onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.filter = 'brightness(1)' }}
        >
          {isSelected
            ? <><Check size={11} strokeWidth={3} /> {addon.isQuote ? 'Quote added' : 'Added'}</>
            : addon.isQuote ? 'Request a quote' : 'Add this add-on'}
        </button>
      </div>
    </div>
  )
}

// ─── Step screens ───────────────────────────────────────────────────────────────

function StepHeader({ stepNum, title, description }) {
  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--goai-violet)', marginBottom: 'var(--space-2)' }}>
        Step {stepNum} of 5
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

function StepWebsite({ onToggle, selected }) {
  return (
    <div>
      <StepHeader
        stepNum={1}
        title="Choose Your Website"
        description="Start with the right website tier for your business. Prices shown are one-off build costs."
      />
      <div className="journey-website-grid">
        {WEBSITES.map(ws => (
          <WebsiteSelectCard key={ws.id} website={ws} onToggle={onToggle} isSelected={selected?.id === ws.id} />
        ))}
      </div>
    </div>
  )
}

function StepPackage({ onToggle, onSkip, onBack, selected }) {
  return (
    <div>
      <StepHeader
        stepNum={2}
        title="Choose Your Package"
        description="Select an individual service to add to your build. This is optional — you can skip and choose later."
      />
      <div className="journey-package-grid">
        {PACKAGES.map(pkg => (
          <PackageSelectCard key={pkg.id} pkg={pkg} onToggle={onToggle} isSelected={selected?.id === pkg.id} />
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
          ← Back
        </button>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', margin: 0 }}>
            Not sure? <Link to="/packages" style={{ color: 'var(--color-brand-400)', textDecoration: 'none' }}>Browse all packages</Link>
          </p>
          <button
            type="button" onClick={onSkip} style={secondaryBtn}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            Skip this step
          </button>
        </div>
      </div>
    </div>
  )
}

function StepBundle({ onToggle, onSkip, onBack, selected }) {
  return (
    <div>
      <StepHeader
        stepNum={3}
        title="Add a Monthly Bundle"
        description="Monthly bundles combine ongoing support, hosting, content, and growth into one price. Optional — skip if not needed."
      />
      <div className="journey-bundle-grid">
        {BUNDLES.map(bundle => (
          <BundleSelectCard key={bundle.id} bundle={bundle} onToggle={onToggle} isSelected={selected?.id === bundle.id} />
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
          ← Back
        </button>
        <button
          type="button" onClick={onSkip} style={secondaryBtn}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          Skip monthly bundle
        </button>
      </div>
    </div>
  )
}

function StepAddons({ selectedAddons, onToggle, onContinue, onSkip, onBack }) {
  const selectedIds = selectedAddons.map(a => a.id)
  return (
    <div>
      <StepHeader
        stepNum={4}
        title="Add Optional Extras"
        description="Bolt on specific features or services to your setup. You can add as many as you need, or skip and continue to review."
      />
      {selectedAddons.length > 0 && (
        <div style={{
          background: 'rgba(118,39,239,0.06)', border: '1px solid rgba(118,39,239,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
          display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center',
        }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--goai-violet)', flexShrink: 0 }}>
            Added:
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
        {ADDON_GROUPS.map(group => (
          <div key={group.title}>
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
          ← Back
        </button>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          {selectedAddons.length === 0 && (
            <button
              type="button" onClick={onSkip} style={secondaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Skip add-ons
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
            Continue to review <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ReviewRow({ label, value, onEdit }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 'var(--space-4)', padding: 'var(--space-4) 0',
      borderBottom: '1px solid var(--border-default)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          {label}
        </span>
        <span style={{ fontSize: 'var(--text-sm)', color: value ? 'var(--text-primary)' : 'var(--text-tertiary)', fontStyle: value ? 'normal' : 'italic' }}>
          {value || 'None selected'}
        </span>
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
        <Pencil size={10} /> Edit
      </button>
    </div>
  )
}

function StepReview({ website, pkg, bundle, addons, oneOffItems, monthlyItems, quoteItems, oneOffTotal, monthlyTotal, hasQuoteItems, hasFixedItems, onEditWebsite, onEditPackage, onEditBundle, onEditAddons, onBuyNow, onRequestQuote, onBack }) {
  return (
    <div>
      <StepHeader
        stepNum={5}
        title="Review & Complete"
        description="Check your selections below, then proceed to checkout or request a quote."
      />

      {/* Summary */}
      <div style={{
        background: 'var(--surface-overlay)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-2) var(--space-6)',
        marginBottom: 'var(--space-6)',
      }}>
        <ReviewRow
          label="Website"
          value={website ? `${website.name} — ${website.price}${website.priceNote ? ' ' + website.priceNote : ''}` : null}
          onEdit={onEditWebsite}
        />
        <ReviewRow
          label="Package"
          value={pkg ? `${pkg.name} — ${pkg.price}${pkg.priceNote ? ' ' + pkg.priceNote : ''}` : null}
          onEdit={onEditPackage}
        />
        <ReviewRow
          label="Monthly bundle"
          value={bundle ? `${bundle.name} — ${bundle.price}${bundle.priceNote}` : null}
          onEdit={onEditBundle}
        />
        <ReviewRow
          label="Add-ons"
          value={addons.length ? addons.map(a => `${a.name} (${a.price}${a.priceNote ? ' ' + a.priceNote : ''})`).join(', ') : null}
          onEdit={onEditAddons}
        />
      </div>

      {/* Totals */}
      <div style={{
        display: 'grid', gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
      }}
        className="journey-totals-grid"
      >
        {oneOffItems.length > 0 && (
          <div style={{
            background: 'var(--surface-raised)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              One-off costs
            </p>
            {oneOffItems.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-1) 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span>{item.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>€{item.amount.toLocaleString('en-IE')}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-default)', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>Total one-off</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)' }}>€{oneOffTotal.toLocaleString('en-IE')}</span>
            </div>
          </div>
        )}
        {monthlyItems.length > 0 && (
          <div style={{
            background: 'var(--surface-raised)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              Monthly costs
            </p>
            {monthlyItems.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-1) 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span>{item.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', flexShrink: 0 }}>€{item.amount}/mo</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-default)', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>Total monthly</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)' }}>€{monthlyTotal}/mo</span>
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
        }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent-500)', marginBottom: 'var(--space-1)' }}>
            Items requiring a quote
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {quoteItems.join(', ')}
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
          ← Back
        </button>
        {hasFixedItems && (
          <button
            type="button"
            onClick={onBuyNow}
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
            <ShoppingCart size={15} /> Buy Now / Checkout
          </button>
        )}
        <button
          type="button"
          onClick={onRequestQuote}
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
          Request a Quote
        </button>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic', marginTop: 'var(--space-4)' }}>
        All prices exclude Greek VAT (24%). Fixed prices confirmed on enquiry based on final scope.
      </p>
    </div>
  )
}

// ─── Journey wizard ─────────────────────────────────────────────────────────────

function JourneyWizard() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { addItem } = useBasket()

  const [step, setStep] = useState(0)
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedBundle, setSelectedBundle] = useState(null)
  const [selectedAddons, setSelectedAddons] = useState([])

  const goToStep = (s) => {
    setStep(s)
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const toggleWebsite = (ws) => {
    if (selectedWebsite?.id === ws.id) { setSelectedWebsite(null) }
    else { setSelectedWebsite(ws); goToStep(1) }
  }
  const togglePackage = (pkg) => {
    if (selectedPackage?.id === pkg.id) { setSelectedPackage(null) }
    else { setSelectedPackage(pkg); goToStep(2) }
  }
  const skipPackage = () => { setSelectedPackage(null); goToStep(2) }
  const toggleBundle = (bundle) => {
    if (selectedBundle?.id === bundle.id) { setSelectedBundle(null) }
    else { setSelectedBundle(bundle); goToStep(3) }
  }
  const skipBundle = () => { setSelectedBundle(null); goToStep(3) }
  const continueToReview = () => goToStep(4)
  const skipAddons = () => { setSelectedAddons([]); goToStep(4) }

  const toggleAddon = (addon) => {
    setSelectedAddons(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    )
  }

  const oneOffItems = [
    selectedWebsite && !selectedWebsite.isQuote ? { name: selectedWebsite.name, amount: selectedWebsite.oneOff } : null,
    selectedPackage && !selectedPackage.isQuote && selectedPackage.oneOff > 0 ? { name: `${selectedPackage.name} (setup)`, amount: selectedPackage.oneOff } : null,
    ...selectedAddons.filter(a => !a.isQuote && a.oneOff > 0).map(a => ({ name: a.name, amount: a.oneOff })),
  ].filter(Boolean)

  const monthlyItems = [
    selectedPackage && !selectedPackage.isQuote && selectedPackage.monthly > 0 ? { name: selectedPackage.name, amount: selectedPackage.monthly } : null,
    selectedBundle && !selectedBundle.isQuote ? { name: selectedBundle.name, amount: selectedBundle.monthly } : null,
    ...selectedAddons.filter(a => !a.isQuote && a.monthly > 0).map(a => ({ name: a.name, amount: a.monthly })),
  ].filter(Boolean)

  const quoteItems = [
    selectedWebsite?.isQuote ? selectedWebsite.name : null,
    selectedPackage?.isQuote ? selectedPackage.name : null,
    selectedBundle?.isQuote ? selectedBundle.name : null,
    ...selectedAddons.filter(a => a.isQuote).map(a => a.name),
  ].filter(Boolean)

  const oneOffTotal = oneOffItems.reduce((s, i) => s + i.amount, 0)
  const monthlyTotal = monthlyItems.reduce((s, i) => s + i.amount, 0)
  const hasQuoteItems = quoteItems.length > 0
  const hasFixedItems = oneOffItems.length > 0 || monthlyItems.length > 0

  const handleBuyNow = () => {
    if (selectedWebsite && !selectedWebsite.isQuote) {
      addItem({ id: selectedWebsite.id, name: selectedWebsite.name, priceDisplay: `${selectedWebsite.price} one-off`, formTypes: ['website'] })
    }
    if (selectedPackage && !selectedPackage.isQuote) {
      addItem({ id: selectedPackage.id, name: selectedPackage.name, priceDisplay: selectedPackage.priceNote ? `${selectedPackage.price} ${selectedPackage.priceNote}` : selectedPackage.price, formTypes: [] })
    }
    if (selectedBundle && !selectedBundle.isQuote) {
      addItem({ id: selectedBundle.id, name: selectedBundle.name, priceDisplay: `${selectedBundle.price}${selectedBundle.priceNote}`, formTypes: [] })
    }
    selectedAddons.filter(a => !a.isQuote).forEach(a => {
      addItem({ id: a.id, name: a.name, priceDisplay: a.priceNote ? `${a.price} ${a.priceNote}` : a.price, formTypes: [] })
    })
    navigate('/order')
  }

  const handleRequestQuote = () => {
    const summary = {
      website: selectedWebsite ? `${selectedWebsite.name} — ${selectedWebsite.price}${selectedWebsite.priceNote ? ' ' + selectedWebsite.priceNote : ''}` : null,
      package: selectedPackage ? `${selectedPackage.name} — ${selectedPackage.price}${selectedPackage.priceNote ? ' ' + selectedPackage.priceNote : ''}` : null,
      bundle: selectedBundle ? `${selectedBundle.name} — ${selectedBundle.price}${selectedBundle.priceNote}` : null,
      addons: selectedAddons.length ? selectedAddons.map(a => `${a.name} (${a.price})`).join(', ') : null,
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
          {step === 0 && <StepWebsite onToggle={toggleWebsite} selected={selectedWebsite} />}
          {step === 1 && <StepPackage onToggle={togglePackage} onSkip={skipPackage} onBack={() => goToStep(0)} selected={selectedPackage} />}
          {step === 2 && <StepBundle onToggle={toggleBundle} onSkip={skipBundle} onBack={() => goToStep(1)} selected={selectedBundle} />}
          {step === 3 && <StepAddons selectedAddons={selectedAddons} onToggle={toggleAddon} onContinue={continueToReview} onSkip={skipAddons} onBack={() => goToStep(2)} />}
          {step === 4 && (
            <StepReview
              website={selectedWebsite}
              pkg={selectedPackage}
              bundle={selectedBundle}
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
              onBuyNow={handleBuyNow}
              onRequestQuote={handleRequestQuote}
              onBack={() => goToStep(3)}
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
        tag="Start Your Journey"
        title="Start Your GoAI Journey"
        description="Build your perfect setup step by step. Choose your website, add services, and review your full package before committing."
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
              Quick reference
            </p>
            <h2 style={{
              fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))',
              fontWeight: 700, letterSpacing: '-0.01em',
              color: 'var(--text-primary)', lineHeight: 1.2,
            }}>
              What's the difference?
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
              return (
                <motion.div
                  key={item.term}
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
                        {item.term}
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {item.description}
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
        @media (max-width: 900px) {
          .journey-package-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .journey-website-grid,
          .journey-package-grid,
          .journey-bundle-grid,
          .journey-addon-grid,
          .journey-totals-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
