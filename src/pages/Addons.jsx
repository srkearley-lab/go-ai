import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ShoppingCart, MessageCircle, Zap } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useBasket } from '../context/BasketContext'

// ── Add-on data ───────────────────────────────────────────────────────────────

const groups = [
  {
    id: 'website',
    title: 'Website Add-ons',
    addons: [
      {
        id: 'addon-extra-page',
        name: 'Extra Website Page',
        price: '€100',
        priceNote: 'one-off',
        bestFor: 'Businesses needing more pages than their package includes',
        includes: [
          'One additional page',
          'Matched styling to existing site',
          'Mobile check',
          'Navigation update',
        ],
        note: null,
        cta: 'basket',
      },
      {
        id: 'addon-landing-page',
        name: 'Landing Page',
        price: '€150',
        priceNote: 'one-off',
        bestFor: 'Campaigns, ads, promotions, lead generation',
        includes: [
          'Standalone page',
          'Headline and CTA structure',
          'Form placement',
          'Mobile layout',
        ],
        note: null,
        cta: 'basket',
      },
      {
        id: 'addon-form-upgrade',
        name: 'Website Form Upgrade',
        price: '€75',
        priceNote: 'one-off',
        bestFor: 'Better enquiry, quote, or booking capture',
        includes: [
          'Custom fields',
          'Required field setup',
          'Dropdowns and confirmation',
          'Routing setup',
        ],
        note: null,
        cta: 'basket',
      },
      {
        id: 'addon-whatsapp-chat',
        name: 'WhatsApp Click-to-Chat Setup',
        price: '€30',
        priceNote: 'one-off',
        bestFor: 'Businesses preferring WhatsApp conversations',
        includes: [
          'Button and link setup',
          'Key page placement',
          'Mobile click-to-chat',
        ],
        note: null,
        cta: 'basket',
      },
    ],
  },
  {
    id: 'support',
    title: 'Monthly Support Add-ons',
    addons: [
      {
        id: 'addon-hosting-care',
        name: 'Hosting & Website Care',
        price: '€30',
        priceNote: '/month',
        bestFor: 'Businesses wanting technical care without managing it',
        includes: [
          'Hosting and managed storage',
          'Uptime monitoring',
          'Security checks and backups',
          'Minor fixes',
          'SSL and domain support',
        ],
        note: 'Domain renewals, third-party licences, major redesigns and advanced development work are not included.',
        cta: 'basket',
      },
      {
        id: 'addon-extra-storage',
        name: 'Extra Website Storage',
        price: '€10',
        priceNote: '/month',
        bestFor: 'Businesses with larger galleries, PDFs, or media',
        includes: [
          'Extra managed storage',
          'Image and PDF support',
          'Storage monitoring',
        ],
        note: 'Only needed if you exceed the storage included in Hosting & Website Care.',
        cta: 'basket',
      },
      {
        id: 'addon-priority-updates',
        name: 'Priority Updates',
        price: '€30',
        priceNote: '/month',
        bestFor: 'Businesses that need fast turnaround on changes',
        includes: [
          'Priority handling',
          'Faster response times',
          'Text, image and price updates',
        ],
        note: null,
        cta: 'basket',
      },
      {
        id: 'addon-content-refresh',
        name: 'Monthly Content Refresh',
        price: '€50',
        priceNote: '/month',
        bestFor: 'Businesses wanting their site kept fresh',
        includes: [
          'One monthly content refresh',
          'Content and image updates',
          'Improvement notes',
        ],
        note: null,
        cta: 'basket',
      },
      {
        id: 'addon-seo-basics',
        name: 'SEO Basics',
        price: '€50',
        priceNote: '/month',
        bestFor: 'Businesses wanting better local search visibility',
        includes: [
          'Page title tidy-up',
          'Meta descriptions',
          'Heading checks',
          'Local keyword alignment',
        ],
        note: null,
        cta: 'basket',
      },
      {
        id: 'addon-gbp-support',
        name: 'Google Business Profile Support',
        price: '€40',
        priceNote: '/month',
        bestFor: 'Businesses wanting a well-managed Google presence',
        includes: [
          'Profile content support',
          'Monthly posts',
          'Photo and service updates',
        ],
        note: null,
        cta: 'basket',
      },
    ],
  },
  {
    id: 'automation',
    title: 'Automation and AI Add-ons',
    subtitle: 'All automation and AI add-ons require a quote. Tell us what you need and we\'ll assess scope and cost.',
    addons: [
      {
        id: 'addon-simple-automation',
        name: 'Simple Automation',
        price: 'Quote required',
        priceNote: null,
        bestFor: 'Businesses with a repetitive task they want automated',
        includes: [],
        note: null,
        cta: 'quote',
      },
      {
        id: 'addon-email-automation',
        name: 'Email Automation',
        price: 'Quote required',
        priceNote: null,
        bestFor: 'Businesses wanting automated follow-ups and email flows',
        includes: [],
        note: null,
        cta: 'quote',
      },
      {
        id: 'addon-ai-content-workflow',
        name: 'AI Content Workflow',
        price: 'Quote required',
        priceNote: null,
        bestFor: 'Businesses wanting AI to power their content creation',
        includes: [],
        note: null,
        cta: 'quote',
      },
      {
        id: 'addon-ai-avatar-video',
        name: 'AI Avatar / Video Content',
        price: 'Quote required',
        priceNote: null,
        bestFor: 'Businesses wanting AI-generated video for social media',
        includes: [],
        note: null,
        cta: 'quote',
      },
    ],
  },
  {
    id: 'setup',
    title: 'Setup Add-ons',
    addons: [
      {
        id: 'addon-email-setup',
        name: 'Business Email Setup Support',
        price: '€50',
        priceNote: 'one-off',
        bestFor: 'Businesses needing a professional email address set up',
        includes: [
          'Email provider configuration',
          'Domain verification',
          'Basic inbox setup',
        ],
        note: 'External licence costs (e.g. Google Workspace, Microsoft 365) are not included.',
        cta: 'basket',
      },
      {
        id: 'addon-domain-connection',
        name: 'Domain Connection Support',
        price: '€40',
        priceNote: 'one-off',
        bestFor: 'Businesses needing help connecting a domain to their website',
        includes: [
          'DNS configuration',
          'Domain pointing',
          'Connection verification',
        ],
        note: 'Domain purchase and renewal costs are not included.',
        cta: 'basket',
      },
      {
        id: 'addon-tracking-setup',
        name: 'Tracking Setup',
        price: '€60',
        priceNote: 'one-off',
        bestFor: 'Businesses wanting proper analytics and ad tracking in place',
        includes: [
          'Google Analytics setup',
          'Meta Pixel or GTM placement',
          'Basic event tracking',
        ],
        note: null,
        cta: 'basket',
      },
      {
        id: 'addon-health-check',
        name: 'Website Health Check',
        price: '€50',
        priceNote: 'one-off',
        bestFor: 'Businesses wanting a review of their existing website',
        includes: [
          'Speed and mobile check',
          'Broken link scan',
          'SEO basics review',
          'Summary report with recommendations',
        ],
        note: null,
        cta: 'basket',
      },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function FeatureItem({ text }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
      <span style={{
        width: 16, height: 16, flexShrink: 0, marginTop: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(118, 39, 239, 0.1)',
        border: '1px solid rgba(118, 39, 239, 0.2)',
        borderRadius: '50%',
        color: 'var(--goai-violet)',
      }}>
        <Check size={9} strokeWidth={3} />
      </span>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>{text}</span>
    </li>
  )
}

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
        transition: 'all 120ms ease', fontFamily: 'inherit',
      }}
      onMouseEnter={(e) => { if (!inBasket) e.currentTarget.style.filter = 'brightness(1.1)' }}
      onMouseLeave={(e) => { if (!inBasket) e.currentTarget.style.filter = 'brightness(1)' }}
    >
      {inBasket
        ? <><Check size={11} strokeWidth={3} /> In Basket</>
        : <><ShoppingCart size={11} /> Add to Basket</>}
    </button>
  )
}

function AddonCard({ addon, variants }) {
  const basketItem = {
    id: addon.id,
    name: addon.name,
    priceDisplay: addon.priceNote ? `${addon.price} ${addon.priceNote}` : addon.price,
    formTypes: [],
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
          {addon.name}
        </h3>
        {addon.cta !== 'quote' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
              {addon.price}
            </span>
            {addon.priceNote && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{addon.priceNote}</span>
            )}
          </div>
        )}
      </div>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Best for: </span>
        {addon.bestFor}
      </p>

      {addon.includes.length > 0 && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 0 }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {addon.includes.map(f => <FeatureItem key={f} text={f} />)}
          </ul>
        </>
      )}

      {addon.note && (
        <p style={{
          fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', lineHeight: 1.5, fontStyle: 'italic',
          background: 'var(--surface-subtle)', border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-sm)', padding: 'var(--space-3)',
        }}>
          {addon.note}
        </p>
      )}

      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
        {addon.cta === 'basket' && <BasketButton item={basketItem} />}

        {addon.cta === 'contact' && (
          <Link
            to="/contact"
            style={{
              height: 36, padding: '0 var(--space-4)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)', fontWeight: 600,
              background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
              color: '#FFFFFF', border: 'none',
              boxShadow: '0 0 20px rgba(118, 39, 239, 0.3)',
              borderRadius: 'var(--radius-md)',
              transition: 'filter 120ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}
          >
            <MessageCircle size={12} /> Contact Us
          </Link>
        )}

        {addon.cta === 'quote' && (
          <Link
            to="/request-quote"
            style={{
              height: 36, padding: '0 var(--space-4)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)', fontWeight: 600,
              background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
              color: '#FFFFFF', border: 'none',
              boxShadow: '0 0 20px rgba(118, 39, 239, 0.3)',
              borderRadius: 'var(--radius-md)',
              transition: 'filter 120ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}
          >
            <Zap size={12} /> Get a Quote
          </Link>
        )}
      </div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Addons() {
  const reduceMotion = useReducedMotion()

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: reduceMotion ? 0 : 0.04 } },
  }
  const cardVariants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Add-ons"
        title="Add-ons"
        description="Need something extra without moving to a full bundle? Add-ons let you bolt extra support, hosting, storage, pages, updates, automation, or content services onto your website package."
      />

      <section style={{ padding: 'var(--space-12) var(--space-8)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>

          {/* Groups */}
          {groups.map((group) => (
            <div key={group.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <h2 style={{
                  fontSize: 'clamp(var(--text-md), 2.5vw, var(--text-lg))',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}>
                  {group.title}
                </h2>
                {group.subtitle && (
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '60ch' }}>
                    {group.subtitle}
                  </p>
                )}
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                style={group.addons.length < 4 ? { gridTemplateColumns: undefined } : {}}
              >
                {group.addons.map(addon => (
                  <AddonCard key={addon.id} addon={addon} variants={cardVariants} />
                ))}
              </motion.div>
            </div>
          ))}

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            All prices exclude Greek VAT (24%). Add-ons are available as standalone services or alongside any package.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', background: 'var(--surface-raised)', borderTop: '1px solid var(--border-default)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--goai-violet)' }}>
              Not sure which add-ons you need?
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Not sure which add-ons you need?
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '48ch' }}>
              Tell us what you are trying to improve and we will recommend the right package, bundle, or add-ons.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/request-quote"
              style={{
                height: 44, padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center',
                fontSize: 'var(--text-sm)', fontWeight: 600,
                background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                color: '#FFFFFF', border: 'none',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)',
                transition: 'filter 120ms ease, box-shadow 120ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
            >
              Get a Quote Today
            </Link>
            <Link
              to="/contact"
              style={{
                height: 44, padding: '0 var(--space-6)',
                display: 'inline-flex', alignItems: 'center',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: 'transparent', color: 'var(--text-primary)',
                border: '1px solid var(--goai-violet)',
                borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease, color 120ms ease, border 120ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.border = '1px solid transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.border = '1px solid var(--goai-violet)' }}
            >
              Contact GoAI
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
