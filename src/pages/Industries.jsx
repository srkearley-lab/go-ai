import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, MessageCircle } from 'lucide-react'
import {
  Home as HomeIcon, Dumbbell, UtensilsCrossed, Coffee,
  Scissors, Map, Car, Anchor,
  Globe, FileText, Search, Mail, Video, MessageSquare,
  CalendarCheck, Star, Users, TrendingUp,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { useTranslations } from '../context/LanguageContext'

const WHATSAPP = '#'

// ── Industry data ─────────────────────────────────────────────────────────────
// Stable IDs and English fallback content. Translations merge on top via industryData.

const industries = [
  {
    id: 'villa-rentals',
    icon: HomeIcon,
    label: 'Villa Rentals',
    tagline: 'Turn direct enquiries into confirmed bookings — automatically',
    description:
      'Villa owners in Greece face a flood of enquiries during peak season across WhatsApp, email and Instagram simultaneously. Bookings slip through the cracks, guests expect instant responses, and most villa websites haven\'t been updated in years.',
    painPoint:
      '"We get 40 WhatsApp messages a day in July. Half of them never get a proper reply because we\'re busy with guests already staying."',
    cta: 'Get a free plan for my villa rentals',
    builds: [
      { id: 'booking-website',       icon: Globe,          label: 'Booking-ready website',         detail: 'Availability calendar, photo gallery, rates and instant enquiry form' },
      { id: 'whatsapp-bot',          icon: MessageSquare,  label: 'WhatsApp enquiry bot',          detail: 'Instant automated responses with pricing and availability 24/7' },
      { id: 'email-followup',        icon: Mail,           label: 'Email follow-up sequence',      detail: 'Nurture cold enquiries into confirmed bookings automatically' },
      { id: 'ai-proposals',          icon: FileText,       label: 'AI group booking proposals',    detail: 'Professional proposals for families and corporate groups in minutes' },
      { id: 'local-seo',             icon: Search,         label: 'Local SEO for villa searches',  detail: 'Rank for "villa rental Mykonos", "villa Crete with pool" etc.' },
      { id: 'review-automation',     icon: Star,           label: 'Review request automation',     detail: 'Post-stay email and WhatsApp sequence to collect 5-star reviews' },
    ],
  },
  {
    id: 'gyms-fitness',
    icon: Dumbbell,
    label: 'Gyms & Fitness',
    tagline: 'Fill every class and keep members coming back',
    description:
      'Gym owners pour money into Instagram but can\'t track what converts. Trial memberships start strong then drop off. Members leave quietly and nobody follows up. The front desk is too busy to chase leads manually.',
    painPoint:
      '"We sign up 20 trial members a month. Maybe 6 convert to full membership. We never find out why the others left."',
    cta: 'Get a free plan for my gym',
    builds: [
      { id: 'class-website',         icon: Globe,          label: 'Class schedule website',        detail: 'Live timetable, trainer profiles, membership options and online signup' },
      { id: 'trial-nurture',         icon: Mail,           label: 'Trial member nurture flow',     detail: 'Automated emails from day 1 through week 4 to convert trials to members' },
      { id: 'class-reminders',       icon: MessageSquare,  label: 'WhatsApp class reminders',      detail: 'Automated booking confirmations and pre-class reminders via WhatsApp' },
      { id: 'local-seo',             icon: Search,         label: 'Local SEO',                     detail: 'Rank for "gym [city]", "personal trainer [area]", "CrossFit near me"' },
      { id: 'video-ads',             icon: Video,          label: 'Short-form video ads',          detail: 'Instagram and TikTok content showing your gym, classes and results' },
      { id: 'performance-report',    icon: TrendingUp,     label: 'Monthly performance report',    detail: 'Track leads, signups, retention and what\'s working each month' },
    ],
  },
  {
    id: 'restaurants',
    icon: UtensilsCrossed,
    label: 'Restaurants',
    tagline: 'More covers, more reviews, more regulars',
    description:
      'Restaurants in Greek tourist areas are fully booked in summer but struggle mid-week and shoulder season. Tourists can\'t find them on Google. Menus online are outdated. Negative reviews go unanswered.',
    painPoint:
      '"We have 40 empty covers on Tuesday nights in May while the tourist traps down the road are full — even though our food is much better."',
    cta: 'Get a free plan for my restaurant',
    builds: [
      { id: 'restaurant-website',    icon: Globe,          label: 'Restaurant website with menu',  detail: 'Digital menu, photo gallery, reservation form and Google Maps integration' },
      { id: 'google-business',       icon: Search,         label: 'Google Business optimisation',  detail: 'Photos, hours, menu items and keyword-rich description for local search' },
      { id: 'review-automation',     icon: Star,           label: 'Review growth automation',      detail: 'Post-meal WhatsApp message asking happy diners for a Google review' },
      { id: 'reservation-bot',       icon: MessageSquare,  label: 'Reservation confirmation bot',  detail: 'WhatsApp confirmations, reminders and post-visit follow-up' },
      { id: 'loyalty-email',         icon: Mail,           label: 'Loyalty email campaigns',       detail: 'Monthly specials and seasonal menus sent to your email list' },
      { id: 'food-video',            icon: Video,          label: 'Food & atmosphere reels',       detail: 'Monthly video content showing dishes, ambience and chef behind the scenes' },
    ],
  },
  {
    id: 'cafes',
    icon: Coffee,
    label: 'Cafés',
    tagline: 'Build a loyal local following — and get found by tourists too',
    description:
      'Cafés live and die by foot traffic and word of mouth. But tourists in Greece increasingly check Google before they walk in, and a café with no online presence or poor photos loses covers to competitors every single day.',
    painPoint:
      '"Someone walked in and said they almost didn\'t come because our Google photos look nothing like the café does now."',
    cta: 'Get a free plan for my café',
    builds: [
      { id: 'brand-website',         icon: Globe,          label: 'Brand-forward website',         detail: 'Story, menu, gallery and opening hours — clean and mobile-first' },
      { id: 'google-business',       icon: Search,         label: 'Google Business profile',       detail: 'Fresh photos, category tags and regular posts to dominate local search' },
      { id: 'review-flow',           icon: Star,           label: 'Review collection flow',        detail: 'QR code or WhatsApp follow-up to build your star rating consistently' },
      { id: 'loyalty-email',         icon: Mail,           label: 'Loyalty email list',            detail: 'Monthly specials, new menu items and seasonal updates to regulars' },
      { id: 'instagram-content',     icon: Video,          label: 'Instagram content',             detail: 'Weekly short-form videos — coffee craft, seasonal drinks, team moments' },
      { id: 'whatsapp-orders',       icon: MessageSquare,  label: 'WhatsApp order enquiries',      detail: 'Automated replies for catering and large order enquiries' },
    ],
  },
  {
    id: 'hair-beauty',
    icon: Scissors,
    label: 'Hair & Beauty',
    tagline: 'Keep your calendar full without chasing a single client',
    description:
      'Salons lose revenue to no-shows, last-minute cancellations and clients who forget to rebook. The quality of work is high but the online presence — Instagram, Google, website — doesn\'t reflect it.',
    painPoint:
      '"I spend the first hour of every Monday chasing people about their appointments for the week. I should be doing hair."',
    cta: 'Get a free plan for my beauty business',
    builds: [
      { id: 'portfolio-website',     icon: Globe,          label: 'Portfolio website',             detail: 'Services, pricing, before-and-after gallery and online booking link' },
      { id: 'appointment-reminders', icon: MessageSquare,  label: 'WhatsApp appointment reminders',detail: '48-hour and 2-hour reminders that cut no-shows by up to 60%' },
      { id: 'rebooking-automation',  icon: Mail,           label: 'Rebooking automation',          detail: 'Post-appointment email and WhatsApp nudging clients to book their next visit' },
      { id: 'review-sequence',       icon: Star,           label: 'Review request sequence',       detail: 'Automated ask for a Google review 24 hours after each appointment' },
      { id: 'local-seo',             icon: Search,         label: 'Local SEO',                     detail: 'Rank for "hair salon [city]", "balayage [area]", "nail bar near me"' },
      { id: 'before-after-content',  icon: Video,          label: 'Before-and-after content',      detail: 'Short-form video ads showcasing your best work for Instagram and TikTok' },
    ],
  },
  {
    id: 'tourism',
    icon: Map,
    label: 'Tourism Companies',
    tagline: 'Sell more tours and automate the booking process end to end',
    description:
      'Tour operators in Greece spend hours answering the same questions, writing custom proposals and chasing payment confirmations. OTAs take 20–25% commission on every booking. Direct booking should be easier.',
    painPoint:
      '"Every group enquiry means 10 emails back and forth before we even confirm the price. We need that time for operations, not sales admin."',
    cta: 'Get a free plan for my tourism business',
    builds: [
      { id: 'tour-website',          icon: Globe,          label: 'Tour booking website',          detail: 'Full tour listing, availability, group pricing and direct booking form' },
      { id: 'ai-proposals',          icon: FileText,       label: 'AI group proposals',            detail: 'Custom proposals generated and sent in minutes for any group size' },
      { id: 'booking-bot',           icon: MessageSquare,  label: 'WhatsApp booking bot',          detail: 'Answers FAQs, sends availability, confirms bookings automatically' },
      { id: 'pre-tour-email',        icon: Mail,           label: 'Pre-tour email sequence',       detail: 'Confirmation, packing list, meeting point and excitement-building emails' },
      { id: 'international-seo',     icon: Search,         label: 'International SEO',             detail: 'Rank for "[tour type] Greece", "[island] tours", "day trip from [city]"' },
      { id: 'destination-video',     icon: Video,          label: 'Destination video ads',         detail: 'Short highlight reels of your tours for Instagram and paid social' },
    ],
  },
  {
    id: 'car-hire',
    icon: Car,
    label: 'Car Hire',
    tagline: 'Fill your fleet every day of the season with direct bookings',
    description:
      'Car hire companies in Greece compete head-to-head with OTAs and aggregators that dominate Google. The companies winning direct bookings have fast websites, instant quote tools and smart follow-up — most don\'t.',
    painPoint:
      '"We match the big companies on price and our cars are newer. But tourists book with them because they show up first on Google."',
    cta: 'Get a free plan for my car hire',
    builds: [
      { id: 'direct-booking-site',   icon: Globe,          label: 'Direct booking website',        detail: 'Fleet listing, instant pricing calculator and online reservation form' },
      { id: 'google-ads',            icon: Search,         label: 'Google Ads for high-intent searches', detail: '"car hire [island]", "rent a car [airport]" — targeted paid search' },
      { id: 'booking-confirmation',  icon: MessageSquare,  label: 'WhatsApp booking confirmation', detail: 'Instant confirmations, pickup reminders and return-day messages' },
      { id: 'seasonal-email',        icon: Mail,           label: 'Seasonal email campaigns',      detail: 'Early-season offers and loyalty discounts to past customers' },
      { id: 'local-seo',             icon: Search,         label: 'Local SEO',                     detail: 'Organic ranking for location-based car hire searches year-round' },
      { id: 'conversion-tracking',   icon: TrendingUp,     label: 'Conversion tracking',           detail: 'Know exactly which channel sends bookings and which wastes budget' },
    ],
  },
  {
    id: 'boat-hire',
    icon: Anchor,
    label: 'Boat Hire',
    tagline: 'More charters, more direct bookings, less commission',
    description:
      'Boat hire and charter businesses in Greece pay 20–30% to platforms for every booking. Direct bookings should dominate — but most operators have outdated websites, slow enquiry responses and no follow-up system.',
    painPoint:
      '"GetYourGuide sent us 60% of our bookings last season. We gave away €18,000 in commission. We need to own those customers ourselves."',
    cta: 'Get a free plan for my boat hire',
    builds: [
      { id: 'charter-website',       icon: Globe,          label: 'Charter booking website',       detail: 'Boat specs, route gallery, capacity, pricing and instant enquiry form' },
      { id: 'ai-proposals',          icon: FileText,       label: 'AI charter proposals',          detail: 'Professional proposals for private and group charters sent in minutes' },
      { id: 'charter-automation',    icon: MessageSquare,  label: 'WhatsApp charter automation',   detail: 'Instant replies to enquiries with availability, pricing and booking link' },
      { id: 'charter-reels',         icon: Video,          label: 'Charter highlight reels',       detail: 'Stunning short-form video content of your boats and routes for social' },
      { id: 'international-seo',     icon: Search,         label: 'International SEO',             detail: 'Rank for "boat hire [island]", "private charter [destination]"' },
      { id: 'post-charter-review',   icon: Mail,           label: 'Post-charter review flow',      detail: 'Automated sequence collecting reviews and nudging repeat bookings' },
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function QuickNav({ localizedIndustries }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--surface-raised)',
        borderBottom: '1px solid var(--border-default)',
        padding: 'var(--space-4) var(--space-8)',
        position: 'sticky',
        top: 64,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--width-xl)',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        {localizedIndustries.map(({ id, icon: Icon, label }) => (
          <a
            key={id}
            href={`#${id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              height: 32,
              padding: '0 var(--space-3)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-full)',
              transition: 'color 120ms ease, background 120ms ease, border-color 120ms ease',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'var(--surface-subtle)'
              e.currentTarget.style.borderColor = 'var(--border-strong)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'var(--border-default)'
            }}
          >
            <Icon size={12} />
            {label}
          </a>
        ))}
      </div>
    </motion.div>
  )
}

function FeatureRow({ id, icon: Icon, label, detail }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
      <div
        style={{
          width: 32, height: 32, flexShrink: 0,
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-brand-400)',
        }}
      >
        <Icon size={15} />
      </div>
      <div>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 'var(--space-1)' }}>
          {label}
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
          {detail}
        </p>
      </div>
    </div>
  )
}

function IndustrySection({ industry, index, whatWeBuild }) {
  const reduceMotion = useReducedMotion()
  const { id, icon: Icon, label, tagline, description, painPoint, cta, builds } = industry

  const isAlt = index % 2 !== 0

  return (
    <section
      id={id}
      style={{
        padding: 'var(--space-20) var(--space-8)',
        background: isAlt ? 'var(--surface-subtle)' : 'var(--surface-base)',
        borderBottom: '1px solid var(--border-default)',
        scrollMarginTop: 120,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--width-xl)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          alignItems: 'start',
        }}
        className="industry-grid"
      >
        {/* Left — narrative */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
        >
          {/* Icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: 44, height: 44,
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-brand-400)',
                flexShrink: 0,
              }}
            >
              <Icon size={22} />
            </div>
            <span
              style={{
                fontSize: 'var(--text-xs)', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--color-brand-400)',
              }}
            >
              {label}
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h2
              style={{
                fontSize: 'clamp(var(--text-lg), 2.5vw, var(--text-xl))',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              {tagline}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {description}
            </p>
          </div>

          {/* Pain point quote */}
          <blockquote
            style={{
              borderLeft: '2px solid var(--border-strong)',
              paddingLeft: 'var(--space-4)',
              margin: 0,
            }}
          >
            <p style={{ fontSize: 'var(--text-sm)', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-tertiary)' }}>
              {painPoint}
            </p>
          </blockquote>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                height: 36, padding: '0 var(--space-4)',
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
              {cta} <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {/* Right — what we build */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
            }}
          >
            {whatWeBuild}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {builds.map((b, bi) => (
              <FeatureRow key={`${id}-build-${bi}`} id={b.id} icon={b.icon} label={b.label} detail={b.detail} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .industry-grid { grid-template-columns: 1fr !important; gap: var(--space-10) !important; }
        }
      `}</style>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Industries() {
  const reduceMotion = useReducedMotion()
  const t = useTranslations()
  const ti = t.pages.industries

  // Merge English static data with translations (industryData is only in gr section)
  const localizedIndustries = industries.map(industry => {
    const td = t.industryData?.[industry.id]
    if (!td) return industry
    return {
      ...industry,
      label:       td.label,
      tagline:     td.tagline,
      description: td.description,
      painPoint:   td.painPoint,
      cta:         td.cta,
      builds:      td.builds
        ? td.builds.map((b, i) => ({ ...industry.builds[i], label: b.label, detail: b.detail }))
        : industry.builds,
    }
  })

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag={ti.tag}
        title={ti.title}
        description={ti.description}
      />

      <QuickNav localizedIndustries={localizedIndustries} />

      {localizedIndustries.map((industry, i) => (
        <IndustrySection
          key={industry.id}
          industry={industry}
          index={i}
          whatWeBuild={ti.whatWeBuild}
        />
      ))}

      {/* ── CTA ── */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-8)',
          background: 'var(--surface-raised)',
          borderTop: '1px solid var(--border-default)',
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
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 'var(--space-8)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-500)' }}>
              {ti.ctaTag}
            </p>
            <h2 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {ti.ctaTitle}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              {ti.ctaBody}
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
              {ti.ctaPrimary}
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
              {ti.ctaWhatsApp}
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
