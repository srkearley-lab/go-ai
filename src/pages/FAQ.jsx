import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSEO } from '../lib/seo'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const faqs = [
  {
    category: 'Getting Started',
    items: [
      { q: 'Do I have to buy a monthly package?', a: 'No. You can get a website for a one-off cost with no ongoing commitment. Monthly packages are optional and can be added whenever you\'re ready.' },
      { q: 'Can I just pay for a website?', a: 'Yes. Our website packages start from €450 one-off. They include professionally designed, mobile-responsive websites with basic SEO and a contact form.' },
      { q: 'Can I add monthly packages later?', a: 'Absolutely. Many clients start with a website and add SEO, social media, or automation as they grow. There\'s no minimum contract — start and stop any time.' },
      { q: 'What is the best package for a startup?', a: 'We recommend the Basic Launch Website (€450) or the Starter Business Website (€750). Once you\'re established, the Website + Marketing Engine bundle is the most popular growth package.' },
    ],
  },
  {
    category: 'Websites',
    items: [
      { q: 'What if I already have a website?', a: 'We can rebuild or redesign it, or just add our monthly services to your existing site. We\'ll assess it and recommend the best approach.' },
      { q: 'How long does a website take?', a: 'Most websites are ready within 5–7 working days of receiving your onboarding form. More complex builds may take slightly longer.' },
      { q: 'What happens after I pay?', a: 'You\'ll receive a link to our client onboarding form. Once completed, we begin building straight away. You\'ll receive a review link before anything goes live.' },
      { q: 'Do you build e-commerce websites?', a: 'Yes — we can build shop or product pages. Let us know your requirements on the order form and we\'ll confirm the scope and pricing.' },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { q: 'Can you help with AI avatars and videos?', a: 'Yes — AI Avatar & Video Content is one of our monthly add-ons. We create 8 AI-generated videos per month, including a custom digital avatar, optimised for Instagram and TikTok.' },
      { q: 'What is AI automation?', a: 'AI automation means using tools like WhatsApp bots, email sequences and CRM systems to handle repetitive customer communication automatically — so you never miss a lead.' },
      { q: 'Do I need any technical knowledge?', a: 'None at all. We handle all the technical setup. You manage everything through WhatsApp or a simple dashboard — no code, no complexity.' },
    ],
  },
  {
    category: 'Pricing & Billing',
    items: [
      { q: 'Are prices in euros?', a: 'Yes. All prices are in euros and exclude Greek VAT (24%) where applicable. We\'ll confirm the final amount before you proceed.' },
      { q: 'Is there a setup fee?', a: 'Some monthly add-ons have a one-off setup cost. This is clearly shown on the pricing page alongside the monthly rate. Bundles include setup in the package price.' },
      { q: 'Can I cancel monthly services?', a: 'Yes. There\'s no minimum contract period. You can cancel any monthly service with 30 days notice. One-off purchases are non-refundable once work has started.' },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  return (
    <div style={{ borderBottom: '1px solid var(--border-default)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--space-4)', padding: 'var(--space-5) 0',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5 }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
          style={{ flexShrink: 0, color: 'var(--text-tertiary)', display: 'flex' }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', paddingBottom: 'var(--space-5)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const reduceMotion = useReducedMotion()
  useSEO({
    title: 'FAQ — GO AI',
    description: 'Common questions about GO AI websites, packages, AI automation, pricing and how it all works.',
  })

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="FAQ"
        title="Common questions answered"
        description="Everything you need to know about websites, packages, automation and how GO AI works. Can't find your answer? Get in touch."
      />

      <section style={{ padding: 'var(--space-16) var(--space-8) var(--space-20)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {faqs.map(({ category, items }) => (
            <motion.div
              key={category}
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', marginBottom: 'var(--space-4)' }}>
                {category}
              </p>
              {items.map(({ q, a }, i) => <FAQItem key={i} q={q} a={a} />)}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-16) var(--space-8)', background: 'var(--surface-subtle)', borderTop: '1px solid var(--border-default)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 'var(--width-md)', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}
        >
          <div>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
              Still have questions?
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Send us a message and we'll get back to you within a few hours.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link
              to="/pricing"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
            >
              View Packages <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Send Us an Email
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
