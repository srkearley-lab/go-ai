import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSEO } from '../lib/seo'
import { analytics } from '../lib/analytics'

// ── Shared field styles ───────────────────────────────────────────────────────

const inputStyle = {
  width: '100%',
  padding: '9px var(--space-3)',
  fontSize: 'var(--text-base)',
  lineHeight: 1.5,
  color: 'var(--text-primary)',
  background: 'var(--surface-subtle)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-md)',
  outline: 'none',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
  fontFamily: 'inherit',
}

const labelStyle = {
  fontSize: 'var(--text-sm)',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  display: 'block',
  marginBottom: 'var(--space-2)',
}

function Field({ label, id, type = 'text', placeholder, value, onChange, required, hint }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
        style={{ ...inputStyle, borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
    </div>
  )
}

function SelectField({ label, id, options, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <select
        id={id} value={value} onChange={onChange} required={required}
        style={{ ...inputStyle, borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none', appearance: 'none', cursor: 'pointer' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      >
        <option value="" disabled>Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function TextareaField({ label, id, placeholder, value, onChange, rows = 3, required, hint }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <textarea
        id={id} placeholder={placeholder} value={value} onChange={onChange} rows={rows} required={required}
        style={{ ...inputStyle, borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none', resize: 'vertical', minHeight: rows * 28 }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
    </div>
  )
}

function CheckboxGroup({ label, options, selected, onChange }) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {options.map(opt => {
          const checked = selected.includes(opt)
          return (
            <label
              key={opt}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                background: checked ? 'rgba(99,102,241,0.1)' : 'var(--surface-subtle)',
                border: `1px solid ${checked ? 'rgba(99,102,241,0.3)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
                color: checked ? 'var(--color-brand-400)' : 'var(--text-secondary)',
                transition: 'all 120ms ease',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(opt)}
                style={{ display: 'none' }}
              />
              {checked && <CheckCircle size={12} />}
              {opt}
            </label>
          )
        })}
      </div>
    </div>
  )
}

function SectionDivider({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', paddingTop: 'var(--space-2)' }}>
      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', flexShrink: 0 }}>{title}</p>
      <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const PAGE_OPTIONS = ['Home', 'About', 'Services', 'Contact', 'Blog', 'Portfolio', 'Pricing', 'FAQs', 'Testimonials', 'Gallery', 'Booking / Reservations', 'Shop / Products']
const SERVICE_OPTIONS = ['Website Design', 'SEO', 'Social Media Content', 'AI Content & Marketing', 'AI Automation', 'AI Avatar & Video', 'Email Campaigns', 'Proposal Documents', 'Hosting & Care', 'Analytics & Reporting']

export default function Onboarding() {
  const reduceMotion = useReducedMotion()
  useSEO({ title: 'Client Onboarding', description: 'Complete your GO AI onboarding form so we can build your website and digital systems.' })

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    // Business
    businessName: '', businessType: '', existingWebsite: '', targetAudience: '',
    // Brand
    preferredColours: '', logoStatus: '', brandNotes: '',
    // Website
    pagesNeeded: [], otherPages: '', contentStatus: '',
    // Package
    packageSelected: '', servicesNeeded: [], domainStatus: '', hostingStatus: '', paymentStatus: '',
    // Final
    notes: '',
  })

  const set = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))
  const togglePage = (page) => setForm(prev => ({ ...prev, pagesNeeded: prev.pagesNeeded.includes(page) ? prev.pagesNeeded.filter(p => p !== page) : [...prev.pagesNeeded, page] }))
  const toggleService = (svc) => setForm(prev => ({ ...prev, servicesNeeded: prev.servicesNeeded.includes(svc) ? prev.servicesNeeded.filter(s => s !== svc) : [...prev.servicesNeeded, svc] }))

  const handleSubmit = (e) => {
    e.preventDefault()
    analytics.formSubmit('onboarding')
    console.log('Onboarding submission:', form)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <main style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 480, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}
        >
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
            <CheckCircle size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Onboarding received</h1>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              Thank you — we have everything we need to get started. You'll hear from us within 24 hours with confirmation and next steps.
            </p>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Client onboarding"
        title="Let's get started on your project"
        description="Complete this form so we have everything we need to build your website and digital systems. It takes around 10–15 minutes."
      />

      <section style={{ padding: 'var(--space-16) var(--space-8) var(--space-20)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

            {/* Business details */}
            <SectionDivider title="Business details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Business name" id="businessName" placeholder="e.g. Santorini Dream Villas" value={form.businessName} onChange={set('businessName')} required />
              <SelectField label="Business type" id="businessType"
                options={['Villa / Holiday Rental', 'Restaurant / Café', 'Gym / Fitness', 'Hair & Beauty', 'Tourism Company', 'Car / Boat Hire', 'Retail / E-commerce', 'Professional Services', 'Other']}
                value={form.businessType} onChange={set('businessType')} required />
              <Field label="Existing website URL" id="existingWebsite" placeholder="www.example.gr (or leave blank)" value={form.existingWebsite} onChange={set('existingWebsite')} hint="Leave blank if you don't have one yet" />
              <SelectField label="Domain status" id="domainStatus"
                options={['I have a domain already', 'I need a new domain', 'Not sure']}
                value={form.domainStatus} onChange={set('domainStatus')} />
            </div>
            <TextareaField label="Target audience" id="targetAudience" placeholder="Who are your customers? e.g. tourists visiting Santorini, local gym-goers, etc." value={form.targetAudience} onChange={set('targetAudience')} required rows={3} />

            {/* Branding */}
            <SectionDivider title="Branding" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Preferred colours" id="preferredColours" placeholder="e.g. deep blue and gold, or any colour references" value={form.preferredColours} onChange={set('preferredColours')} hint="Describe or name colours — we'll match them to your brand" />
              <SelectField label="Logo status" id="logoStatus"
                options={['I have a logo file (I will send it)', 'I have an image but not the original file', 'I need a logo designed', 'No logo yet']}
                value={form.logoStatus} onChange={set('logoStatus')} />
            </div>
            <TextareaField label="Brand notes" id="brandNotes" placeholder="Any fonts, styles, or references (websites you like) we should know about" value={form.brandNotes} onChange={set('brandNotes')} rows={3} hint="Optional — helps us match your vision" />

            {/* Website */}
            <SectionDivider title="Website" />
            <CheckboxGroup label="Pages needed" options={PAGE_OPTIONS} selected={form.pagesNeeded} onChange={togglePage} />
            <Field label="Other pages (if not listed above)" id="otherPages" placeholder="e.g. Events, Team, Careers" value={form.otherPages} onChange={set('otherPages')} />
            <SelectField label="Content status" id="contentStatus"
              options={['I will provide all text and photos', 'I have some content — GO AI can fill gaps', 'GO AI to write all content', 'Not sure yet']}
              value={form.contentStatus} onChange={set('contentStatus')} required />

            {/* Package */}
            <SectionDivider title="Package & services" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField label="Package selected" id="packageSelected"
                options={['Basic Launch Website (from €450)', 'Starter Business Website (from €750)', 'Business Website (from €1,200)', 'Growth Website (from €1,750)', 'Premium AI-Ready Website (from €2,500+)', 'Website + Hosting Care', 'Website + Social Growth', 'Website + Marketing Engine (Recommended)', 'Website + AI Automation', 'Full AI Growth Package', 'Not decided yet']}
                value={form.packageSelected} onChange={set('packageSelected')} required />
              <SelectField label="Hosting status" id="hostingStatus"
                options={['Included in my package', 'I have existing hosting', 'I need help with hosting', 'Not sure']}
                value={form.hostingStatus} onChange={set('hostingStatus')} />
              <SelectField label="Payment status" id="paymentStatus"
                options={['Not yet paid', 'Deposit paid', 'Fully paid', 'Invoice requested']}
                value={form.paymentStatus} onChange={set('paymentStatus')} />
            </div>
            <CheckboxGroup label="Additional services (select all that apply)" options={SERVICE_OPTIONS} selected={form.servicesNeeded} onChange={toggleService} />

            {/* Notes */}
            <SectionDivider title="Anything else" />
            <TextareaField label="Additional notes or requests" id="notes" placeholder="Anything else we should know — specific features, integrations, deadlines, or questions" value={form.notes} onChange={set('notes')} rows={4} />

            <button
              type="submit"
              style={{
                height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
                border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)',
                cursor: 'pointer', transition: 'background 120ms ease, transform 60ms ease',
                alignSelf: 'flex-start', padding: '0 var(--space-8)',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Send size={15} />
              Submit onboarding form
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
