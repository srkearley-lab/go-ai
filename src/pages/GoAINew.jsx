import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useLanguage } from '../context/LanguageContext'
import {
  Globe, FileText, Search, Mail, Video, MessageCircle,
  House, Dumbbell, UtensilsCrossed, Coffee, Scissors, Map, Car, Anchor,
  MessageSquare, Zap, Check, Lock, TrendingUp, ArrowRight, Sparkles,
} from 'lucide-react'
import '../styles/goai-new.css'

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY')

/* ---- Language helper ---- */
const LANG_MAP = { en: 'EN', gr: 'GR' }
const tr = (obj, lang) => (obj && typeof obj === 'object' ? obj[lang] || obj.EN : obj) || ''

/* ---- Translations ---- */
const T = {
  EN: {
    hero_badge: 'Now taking new clients in Greece',
    hero_headline_a: 'AI-powered websites for ',
    hero_headline_b: 'local businesses in Greece',
    hero_sub: 'GO AI builds premium websites, automation, SEO, content and digital systems for villas, restaurants, gyms, salons, tourism businesses and local service providers.',
    proof_1: 'Websites live in 7 days',
    proof_2: 'WhatsApp-managed',
    proof_3: 'Local SEO included',
    proof_4: 'No tech skills needed',
    pricing_tag: 'Pricing',
    pricing_title: 'Simple, transparent pricing',
    pricing_desc: 'One clear price. No hidden fees. Cancel any time.',
    pricing_note: 'Prices shown are starting prices. GO AI is currently VAT exempt. Final pricing may vary.',
    best_for: 'Best for:',
    get_started: 'Get Started',
    pay_now: 'Pay Now',
    services_tag: 'What we do',
    services_title: 'Everything your business needs online',
    services_desc: 'We handle your entire digital presence — so you can focus on running your business.',
    industries_tag: 'Industries',
    industries_title: 'Built for local businesses in Greece',
    industries_desc: 'We specialise in the businesses that drive Greek tourism and everyday life.',
    how_tag: 'How it works',
    how_title: 'From idea to live in 3 steps',
    how_desc: 'No long briefs, no design reviews, no waiting weeks. We keep it simple.',
    cta_tag: 'Free audit',
    cta_title: 'Request your free digital improvement plan',
    cta_body: 'Tell us about your business and we\'ll send a personalised plan showing exactly what we\'d build — and what it would cost. No commitment.',
    cta_btn: 'Request my free plan',
    cta_wa: 'Message on WhatsApp',
  },
  GR: {
    hero_badge: 'Δεχόμαστε νέους πελάτες στην Ελλάδα',
    hero_headline_a: 'AI-powered ιστοσελίδες για ',
    hero_headline_b: 'τοπικές επιχειρήσεις στην Ελλάδα',
    hero_sub: 'Η GO AI δημιουργεί premium ιστοσελίδες, αυτοματισμούς, SEO, περιεχόμενο και ψηφιακά συστήματα για βίλες, εστιατόρια, γυμναστήρια, κομμωτήρια, τουριστικές επιχειρήσεις και τοπικούς επαγγελματίες.',
    proof_1: 'Ιστοσελίδες σε 7 ημέρες',
    proof_2: 'Διαχείριση μέσω WhatsApp',
    proof_3: 'Τοπικό SEO περιλαμβάνεται',
    proof_4: 'Χωρίς τεχνικές γνώσεις',
    pricing_tag: 'Τιμές',
    pricing_title: 'Απλές, διαφανείς τιμές',
    pricing_desc: 'Μία ξεκάθαρη τιμή. Χωρίς κρυφές χρεώσεις. Ακύρωση οποτεδήποτε.',
    pricing_note: 'Οι τιμές είναι αρχικές. Η GO AI είναι απαλλαγμένη από ΦΠΑ. Η τελική τιμή μπορεί να διαφέρει.',
    best_for: 'Ιδανικό για:',
    get_started: 'Ξεκινήστε',
    pay_now: 'Πληρωμή Τώρα',
    services_tag: 'Τι κάνουμε',
    services_title: 'Ό,τι χρειάζεται η επιχείρησή σας online',
    services_desc: 'Αναλαμβάνουμε όλη την ψηφιακή σας παρουσία — για να εστιάσετε εσείς στην επιχείρησή σας.',
    industries_tag: 'Κλάδοι',
    industries_title: 'Φτιαγμένο για τοπικές επιχειρήσεις στην Ελλάδα',
    industries_desc: 'Ειδικευόμαστε στις επιχειρήσεις που κινούν τον ελληνικό τουρισμό και την καθημερινότητα.',
    how_tag: 'Πώς λειτουργεί',
    how_title: 'Από την ιδέα στο online σε 3 βήματα',
    how_desc: 'Χωρίς μεγάλα briefs, χωρίς ατελείωτες παρουσιάσεις, χωρίς αναμονή εβδομάδων. Απλά πράγματα.',
    cta_tag: 'Δωρεάν αξιολόγηση',
    cta_title: 'Ζητήστε το δωρεάν πλάνο ψηφιακής βελτίωσης',
    cta_body: 'Πείτε μας για την επιχείρησή σας και θα στείλουμε ένα εξατομικευμένο πλάνο που δείχνει ακριβώς τι θα φτιάχναμε — και πόσο θα κόστιζε. Χωρίς δέσμευση.',
    cta_btn: 'Ζητήστε το δωρεάν πλάνο',
    cta_wa: 'Μήνυμα στο WhatsApp',
  },
}

const PACKAGES = [
  {
    cid: 'basic-launch-website',
    name: { EN: 'Starter Website', GR: 'Starter Ιστοσελίδα' },
    price: { EN: 'From €450', GR: 'Από €450' },
    unit: { EN: 'one-off', GR: 'εφάπαξ' },
    amountCents: 45000,
    popular: false,
    badge: null,
    description: {
      EN: 'A clean, professional website for small businesses that need to get online quickly and look credible.',
      GR: 'Μια καθαρή, επαγγελματική ιστοσελίδα για μικρές επιχειρήσεις που θέλουν να μπουν online γρήγορα και αξιόπιστα.',
    },
    bestFor: {
      EN: 'Small local businesses, cafés, salons, trades and early-stage businesses.',
      GR: 'Μικρές τοπικές επιχειρήσεις, καφέ, κομμωτήρια, μάστορες και νέες επιχειρήσεις.',
    },
  },
  {
    cid: 'business-website',
    name: { EN: 'Business Website', GR: 'Business Ιστοσελίδα' },
    price: { EN: 'From €750', GR: 'Από €750' },
    unit: { EN: 'one-off', GR: 'εφάπαξ' },
    amountCents: 75000,
    popular: true,
    badge: { EN: 'Most Popular', GR: 'Πιο Δημοφιλές' },
    description: {
      EN: 'A stronger business website with better structure, more content sections, an enquiry flow, and room to add automation or marketing support.',
      GR: 'Μια πιο δυνατή επαγγελματική ιστοσελίδα με καλύτερη δομή, περισσότερες ενότητες, ροή αιτημάτων και χώρο για αυτοματισμούς ή marketing.',
    },
    bestFor: {
      EN: 'Villas, restaurants, gyms, clinics, tourism businesses and growing local businesses.',
      GR: 'Βίλες, εστιατόρια, γυμναστήρια, κλινικές, τουριστικές και αναπτυσσόμενες τοπικές επιχειρήσεις.',
    },
  },
  {
    cid: 'premium-ai-website',
    name: { EN: 'Premium AI-Ready Website', GR: 'Premium AI-Ready Ιστοσελίδα' },
    price: { EN: 'From €1,500+', GR: 'Από €1.500+' },
    unit: { EN: 'one-off', GR: 'εφάπαξ' },
    amountCents: 150000,
    popular: false,
    badge: { EN: 'Premium', GR: 'Premium' },
    description: {
      EN: 'A more advanced website with premium design, a stronger customer journey, AI assistant support and automation-ready sections for scalable growth.',
      GR: 'Μια πιο προηγμένη ιστοσελίδα με premium σχεδιασμό, ισχυρότερη διαδρομή πελάτη, υποστήριξη AI βοηθού και έτοιμες ενότητες αυτοματισμού.',
    },
    bestFor: {
      EN: 'Businesses that want a higher-end website, AI automation, proposal journeys and WhatsApp flows.',
      GR: 'Επιχειρήσεις που θέλουν premium ιστοσελίδα, AI αυτοματισμούς, διαδρομές προτάσεων και ροές WhatsApp.',
    },
  },
]

const SERVICES = [
  { Icon: Globe,         title: { EN: 'Websites', GR: 'Ιστοσελίδες' }, description: { EN: 'Fast, mobile-first websites designed to convert visitors into bookings and enquiries — built in under 7 days.', GR: 'Γρήγορες, mobile-first ιστοσελίδες σχεδιασμένες να μετατρέπουν επισκέπτες σε κρατήσεις — έτοιμες σε λιγότερο από 7 ημέρες.' } },
  { Icon: FileText,      title: { EN: 'AI Proposals', GR: 'AI Προτάσεις' }, description: { EN: 'Professional proposals generated in minutes and sent directly to your clients — personalised, polished, on brand.', GR: 'Επαγγελματικές προτάσεις σε λίγα λεπτά, που στέλνονται απευθείας στους πελάτες σας — εξατομικευμένες και άρτιες.' } },
  { Icon: Search,        title: { EN: 'Local SEO', GR: 'Τοπικό SEO' }, description: { EN: 'Get found on Google by people searching in your area. We handle keywords, schema, maps and monthly reporting.', GR: 'Σας βρίσκουν στο Google οι πελάτες της περιοχής σας. Αναλαμβάνουμε λέξεις-κλειδιά, schema, χάρτες και μηνιαίες αναφορές.' } },
  { Icon: Mail,          title: { EN: 'Email Automation', GR: 'Email Αυτοματισμοί' }, description: { EN: 'Welcome flows, follow-up sequences, and seasonal campaigns — all automated so you never miss a lead.', GR: 'Ροές καλωσορίσματος, ακολουθίες follow-up και εποχικές καμπάνιες — όλα αυτόματα, ώστε να μην χάνετε ποτέ ένα lead.' } },
  { Icon: Video,         title: { EN: 'Video Ads', GR: 'Video Διαφημίσεις' }, description: { EN: 'Short-form video content for Instagram and TikTok — scripted, edited and optimised to drive local enquiries.', GR: 'Σύντομα βίντεο για Instagram και TikTok — με σενάριο, μοντάζ και βελτιστοποίηση που φέρνει τοπικά αιτήματα.' } },
  { Icon: MessageCircle, title: { EN: 'WhatsApp Control', GR: 'WhatsApp Control' }, description: { EN: 'Manage bookings, send automated replies and track enquiries — all from your WhatsApp, from anywhere.', GR: 'Διαχειριστείτε κρατήσεις, στείλτε αυτόματες απαντήσεις και παρακολουθήστε αιτήματα — από το WhatsApp σας, από παντού.' } },
]

const INDUSTRIES = [
  { Icon: House,           label: { EN: 'Villa Rentals', GR: 'Βίλες' } },
  { Icon: Dumbbell,        label: { EN: 'Gyms & Fitness', GR: 'Γυμναστήρια' } },
  { Icon: UtensilsCrossed, label: { EN: 'Restaurants', GR: 'Εστιατόρια' } },
  { Icon: Coffee,          label: { EN: 'Cafés', GR: 'Καφετέριες' } },
  { Icon: Scissors,        label: { EN: 'Hair & Beauty', GR: 'Κομμωτήρια & Beauty' } },
  { Icon: Map,             label: { EN: 'Tourism Companies', GR: 'Τουριστικές Επιχειρήσεις' } },
  { Icon: Car,             label: { EN: 'Car Hire', GR: 'Ενοικιάσεις Αυτοκινήτων' } },
  { Icon: Anchor,          label: { EN: 'Boat Hire', GR: 'Ενοικιάσεις Σκαφών' } },
]

const STEPS = [
  { Icon: MessageSquare, number: 1, title: { EN: 'Tell us about your business', GR: 'Πείτε μας για την επιχείρησή σας' }, description: { EN: "Fill in our short form or message us on WhatsApp. We'll ask a few quick questions about your goals.", GR: 'Συμπληρώστε τη σύντομη φόρμα ή στείλτε μήνυμα στο WhatsApp. Θα κάνουμε λίγες γρήγορες ερωτήσεις.' } },
  { Icon: Zap,           number: 2, title: { EN: 'We build everything', GR: 'Τα φτιάχνουμε όλα' }, description: { EN: 'Your website, content, SEO and automation flows — done within 7 days. No meetings, no back-and-forth.', GR: 'Ιστοσελίδα, περιεχόμενο, SEO και αυτοματισμοί — έτοιμα σε 7 ημέρες. Χωρίς συναντήσεις.' } },
  { Icon: MessageCircle, number: 3, title: { EN: 'You manage via WhatsApp', GR: 'Διαχειρίζεστε μέσω WhatsApp' }, description: { EN: 'Control bookings, review reports and request updates directly from your phone. No dashboards to learn.', GR: 'Ελέγξτε κρατήσεις, δείτε αναφορές και ζητήστε αλλαγές απευθείας από το κινητό σας.' } },
]

/* ---- Stripe checkout handler ---- */
async function handleCheckout(pkg, lang) {
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: pkg.cid,
        packageName: tr(pkg.name, lang),
        amount: pkg.amountCents,
      }),
    })
    const { url, error } = await res.json()
    if (error) throw new Error(error)
    window.location.href = url
  } catch (err) {
    console.error('Checkout error:', err)
    alert('Payment unavailable — please contact us on WhatsApp.')
  }
}

/* ============================================================
   Section components
   ============================================================ */

function Hero({ lang, t }) {
  const PROOF_KEYS = ['proof_1', 'proof_2', 'proof_3', 'proof_4']
  return (
    <section className="gn-hero">
      <div className="gn-container">
        <div className="gn-hero-inner">
          <span className="gn-chip">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gn-success)', flexShrink: 0 }} />
            {t('hero_badge')}
          </span>

          <h1>
            {t('hero_headline_a')}
            <span style={{ color: 'var(--gn-brand-ink)' }}>{t('hero_headline_b')}</span>
          </h1>

          <p className="gn-hero-sub">{t('hero_sub')}</p>

          <div className="gn-hero-actions">
            <a href="/contact" className="gn-btn gn-btn-primary gn-btn-lg">
              <Sparkles size={18} /> {lang === 'EN' ? 'Request Proposal' : 'Ζητήστε Πρόταση'}
            </a>
            <a href="/services" className="gn-btn gn-btn-secondary gn-btn-lg">
              {lang === 'EN' ? 'View Services' : 'Δείτε τις Υπηρεσίες'}
            </a>
          </div>

          <div className="gn-proof-row">
            {PROOF_KEYS.map((k) => (
              <span key={k} className="gn-proof-item">
                <Check size={14} style={{ color: 'var(--gn-brand-ink)' }} />
                {t(k)}
              </span>
            ))}
          </div>

          {/* Browser mockup */}
          <div className="gn-browser-wrap">
            <div className="gn-browser">
              <div className="gn-browser-bar">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                  <span key={c} className="gn-browser-dot" style={{ background: c }} />
                ))}
                <div className="gn-browser-url">
                  <Lock size={10} />
                  <span>santorinidreamvillas.gr</span>
                </div>
              </div>
              <div className="gn-browser-body">
                <img
                  src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80"
                  alt="Sample villa website"
                  className="gn-browser-img"
                />
                <div className="gn-browser-overlay" />
                <div className="gn-browser-nav-bar">
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>Santorini Dream</span>
                  <div style={{ display: 'flex', gap: 22 }}>
                    {['Villas', 'Gallery', 'Rates', 'Book'].map((tx) => (
                      <span key={tx} style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, fontWeight: 500 }}>{tx}</span>
                    ))}
                  </div>
                </div>
                <div className="gn-browser-content">
                  <span style={{ color: 'rgba(255,255,255,.9)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' }}>Caldera views · Oia</span>
                  <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, maxWidth: '16ch', margin: 0 }}>
                    Your private villa above the Aegean
                  </h3>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', height: 40, padding: '0 20px', borderRadius: 999, background: 'var(--gn-brand)', color: '#fff', fontSize: 13, fontWeight: 700 }}>
                      Check availability
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 40, padding: '0 18px', borderRadius: 999, background: 'rgba(255,255,255,.16)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,.3)' }}>
                      <MessageCircle size={14} /> WhatsApp
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="gn-float-chip">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'color-mix(in srgb, var(--gn-success) 14%, transparent)', border: '1px solid color-mix(in srgb, var(--gn-success) 30%, transparent)', color: 'var(--gn-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--gn-ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>+38%</p>
                <p style={{ fontSize: 11, color: 'var(--gn-ink-3)', marginTop: 3 }}>direct bookings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection({ lang, t }) {
  const [loading, setLoading] = useState(null)

  const handlePay = async (pkg) => {
    setLoading(pkg.cid)
    await handleCheckout(pkg, lang)
    setLoading(null)
  }

  return (
    <section className="gn-section" id="pricing" style={{ borderBottom: '1px solid var(--gn-line)' }}>
      <div className="gn-container">
        <div className="gn-section-head">
          <span className="gn-eyebrow">{t('pricing_tag')}</span>
          <h2>{t('pricing_title')}</h2>
          <p>{t('pricing_desc')}</p>
        </div>

        <div className="gn-packages-grid">
          {PACKAGES.map((pkg) => {
            const badge = pkg.badge ? tr(pkg.badge, lang) : null
            return (
              <div key={pkg.cid} className={`gn-pkg${pkg.popular ? ' popular' : ''}`}>
                {badge && <div className="gn-pkg-badge">{badge}</div>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <h3 style={{ fontSize: 'var(--gn-text-xl)', letterSpacing: '-0.02em', paddingRight: badge ? 80 : 0 }}>
                    {tr(pkg.name, lang)}
                  </h3>
                  <div>
                    <span className="gn-pkg-price">{tr(pkg.price, lang)}</span>
                    <span className="gn-pkg-price-unit">{tr(pkg.unit, lang)}</span>
                  </div>
                  <p style={{ fontSize: 'var(--gn-text-sm)', color: 'var(--gn-ink-2)', lineHeight: 1.6 }}>
                    {tr(pkg.description, lang)}
                  </p>
                </div>

                <hr className="gn-pkg-divider" />

                <div style={{ flex: 1 }}>
                  <p className="gn-pkg-bestfor-label">{t('best_for')}</p>
                  <p style={{ fontSize: 'var(--gn-text-sm)', color: 'var(--gn-ink-2)', lineHeight: 1.6 }}>
                    {tr(pkg.bestFor, lang)}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    onClick={() => handlePay(pkg)}
                    disabled={loading === pkg.cid}
                    className={`gn-btn gn-btn-primary${pkg.popular ? '' : ''}`}
                    style={{ justifyContent: 'center', width: '100%', opacity: loading === pkg.cid ? 0.7 : 1 }}
                  >
                    {loading === pkg.cid ? '...' : t('pay_now')}
                  </button>
                  <a
                    href="/contact"
                    className="gn-btn gn-btn-outline"
                    style={{ justifyContent: 'center', width: '100%' }}
                  >
                    {t('get_started')}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ marginTop: 32, textAlign: 'center', fontSize: 'var(--gn-text-sm)', color: 'var(--gn-ink-3)' }}>
          {t('pricing_note')}
        </p>
      </div>
    </section>
  )
}

function ServicesSection({ lang, t }) {
  return (
    <section className="gn-section" id="services">
      <div className="gn-container">
        <div className="gn-section-head">
          <span className="gn-eyebrow">{t('services_tag')}</span>
          <h2>{t('services_title')}</h2>
          <p>{t('services_desc')}</p>
        </div>

        <div className="gn-services-grid">
          {SERVICES.map(({ Icon, title, description }, i) => (
            <div key={i} className="gn-card gn-card-hover" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="gn-icon-badge">
                <Icon size={22} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h3 style={{ fontSize: 'var(--gn-text-lg)', letterSpacing: '-0.01em' }}>{tr(title, lang)}</h3>
                <p style={{ fontSize: 'var(--gn-text-sm)', color: 'var(--gn-ink-2)', lineHeight: 1.65 }}>{tr(description, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustriesSection({ lang, t }) {
  return (
    <section className="gn-section gn-section-alt">
      <div className="gn-container">
        <div className="gn-section-head">
          <span className="gn-eyebrow">{t('industries_tag')}</span>
          <h2>{t('industries_title')}</h2>
          <p>{t('industries_desc')}</p>
        </div>

        <div className="gn-industries-grid">
          {INDUSTRIES.map(({ Icon, label }, i) => (
            <div key={i} className="gn-industry-tile">
              <div className="gn-icon-badge" style={{ width: 48, height: 48, borderRadius: '50%' }}>
                <Icon size={22} />
              </div>
              <span style={{ fontSize: 'var(--gn-text-sm)', fontWeight: 600, color: 'var(--gn-ink)' }}>
                {tr(label, lang)}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="/industries" className="gn-btn gn-btn-secondary" style={{ gap: 8 }}>
            {lang === 'EN' ? 'See all industries' : 'Δείτε όλους τους κλάδους'}
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection({ lang, t }) {
  return (
    <section className="gn-section">
      <div className="gn-container">
        <div className="gn-section-head">
          <span className="gn-eyebrow">{t('how_tag')}</span>
          <h2>{t('how_title')}</h2>
          <p>{t('how_desc')}</p>
        </div>

        <div className="gn-steps-grid">
          {STEPS.map(({ Icon, number, title, description }, i) => (
            <div key={i} className="gn-step">
              {i < STEPS.length - 1 && <div className="gn-step-line" />}
              <div className="gn-step-icon-wrap">
                <div className="gn-step-icon">
                  <Icon size={24} />
                </div>
                <div className="gn-step-num">{number}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h3 style={{ fontSize: 'var(--gn-text-lg)' }}>{tr(title, lang)}</h3>
                <p style={{ fontSize: 'var(--gn-text-sm)', color: 'var(--gn-ink-2)', lineHeight: 1.65, maxWidth: '28ch', margin: '0 auto' }}>
                  {tr(description, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ lang, t }) {
  return (
    <div className="gn-cta-band">
      <span className="gn-eyebrow">{t('cta_tag')}</span>
      <h2>{t('cta_title')}</h2>
      <p style={{ fontSize: 'var(--gn-text-lg)', color: 'var(--gn-ink-2)', maxWidth: '52ch', lineHeight: 1.6 }}>
        {t('cta_body')}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <a href="/contact" className="gn-btn gn-btn-primary gn-btn-lg">
          <Sparkles size={18} /> {t('cta_btn')}
        </a>
        <a href="https://wa.me/30XXXXXXXXXX" className="gn-btn gn-btn-wa gn-btn-lg" target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> {t('cta_wa')}
        </a>
      </div>
    </div>
  )
}

/* ============================================================
   Page root
   ============================================================ */
export default function GoAINew() {
  const { language } = useLanguage()
  const lang = LANG_MAP[language] || 'EN'
  const t = (key) => T[lang]?.[key] || T.EN[key] || key

  return (
    <div className="goai-page">
      <Hero lang={lang} t={t} />
      <PricingSection lang={lang} t={t} />
      <ServicesSection lang={lang} t={t} />
      <IndustriesSection lang={lang} t={t} />
      <HowItWorksSection lang={lang} t={t} />
      <CTASection lang={lang} t={t} />
    </div>
  )
}
