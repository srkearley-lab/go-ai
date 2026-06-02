import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Send, CheckCircle, ShoppingBag, AlertCircle, CreditCard, Paperclip, X } from 'lucide-react'
import { useBasket } from '../context/BasketContext'
import { useTranslations } from '../context/LanguageContext'
import { useSEO } from '../lib/seo'

// ── Country and business type stable values (never changes with language) ──────

const COUNTRY_VALUES = ['Greece', 'Cyprus', 'UK', 'Germany', 'France', 'Australia', 'USA', 'Other']
const BUSINESS_TYPE_VALUES = [
  'Villa / Holiday Rental', 'Restaurant / Café', 'Gym / Fitness', 'Hair & Beauty',
  'Tourism Company', 'Car / Boat Hire', 'Retail / E-commerce', 'Professional Services',
  'Consultancy', 'Healthcare', 'Other',
]

// ── Validation helpers ────────────────────────────────────────────────────────

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
const isValidPhone = (v) => /^[+\d\s\-().]{7,}$/.test(v.trim())

function validateContact(data, tr) {
  const e = {}
  if (!data.firstName.trim())                  e.firstName    = tr.errFirstName
  if (!data.lastName.trim())                   e.lastName     = tr.errLastName
  if (!data.businessName.trim())               e.businessName = tr.errBusinessName
  if (!data.email.trim() || !isValidEmail(data.email)) e.email = tr.errEmail
  if (!data.phone.trim() || !isValidPhone(data.phone)) e.phone = tr.errPhone
  if (!data.country)                           e.country      = tr.errCountry
  return e
}

function validateReview(consent, tr) {
  return consent ? {} : { consent: tr.errConsent }
}

function hasRecurringCost(items) {
  return items.some(i => /\/mo(nth)?|\/μήνα/i.test(i.priceDisplay))
}

// ── Field components ──────────────────────────────────────────────────────────

const baseInput = {
  width: '100%', padding: '9px var(--space-3)',
  fontSize: 'var(--text-base)', lineHeight: 1.5,
  color: 'var(--text-primary)', background: 'var(--surface-subtle)',
  border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
  outline: 'none', transition: 'border-color 120ms ease, box-shadow 120ms ease',
  fontFamily: 'inherit',
}

const labelStyle = {
  fontSize: 'var(--text-sm)', fontWeight: 500,
  color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)',
}

function ErrorMsg({ msg }) {
  if (!msg) return null
  return (
    <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-danger)', marginTop: 'var(--space-1)' }}>
      <AlertCircle size={11} /> {msg}
    </p>
  )
}

function Field({ label, id, type = 'text', placeholder, value, onChange, required, hint, autoComplete, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={onChange} required={required} autoComplete={autoComplete}
        style={{ ...baseInput, borderColor: error ? 'var(--color-danger)' : focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      <ErrorMsg msg={error} />
      {hint && !error && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
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
        id={id} placeholder={placeholder} value={value} onChange={onChange}
        rows={rows} required={required}
        style={{ ...baseInput, borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none', resize: 'vertical', minHeight: rows * 28 }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
    </div>
  )
}

// SelectField supports both plain string options and {label, value} objects.
// Use {label, value} to display a translated label while storing a stable English value.
function SelectField({ label, id, options, value, onChange, required, hint, error, placeholder }) {
  const [focused, setFocused] = useState(false)
  const t = useTranslations()
  const ph = placeholder || t.orderForm?.selectPlaceholder || 'Select...'
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <select
        id={id} value={value} onChange={onChange} required={required}
        style={{ ...baseInput, borderColor: error ? 'var(--color-danger)' : focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none', appearance: 'none', cursor: 'pointer' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      >
        <option value="" disabled>{ph}</option>
        {options.map(o => typeof o === 'string'
          ? <option key={o} value={o}>{o}</option>
          : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
      <ErrorMsg msg={error} />
      {hint && !error && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
    </div>
  )
}

function CheckboxGroup({ label, options, selected, onChange, hint }) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {options.map(opt => {
          const checked = selected.includes(opt)
          return (
            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', background: checked ? 'rgba(99,102,241,0.1)' : 'var(--surface-subtle)', border: `1px solid ${checked ? 'rgba(99,102,241,0.3)' : 'var(--border-default)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 'var(--text-sm)', color: checked ? 'var(--color-brand-400)' : 'var(--text-secondary)', transition: 'all 120ms ease', userSelect: 'none' }}>
              <input type="checkbox" checked={checked} onChange={() => onChange(opt)} style={{ display: 'none' }} />
              {checked && <Check size={11} strokeWidth={3} />}
              {opt}
            </label>
          )
        })}
      </div>
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>{hint}</p>}
    </div>
  )
}

function YesNoToggle({ label, value, onChange, hint, yesLabel, noLabel }) {
  const t = useTranslations()
  const yes = yesLabel || t.orderForm?.yes || 'Yes'
  const no  = noLabel  || t.orderForm?.no  || 'No'
  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {[true, false].map(opt => {
          const active = value === opt
          return (
            <button key={String(opt)} type="button" onClick={() => onChange(opt)} style={{ height: 36, padding: '0 var(--space-5)', fontSize: 'var(--text-sm)', fontWeight: 500, background: active ? (opt ? 'rgba(22,163,74,0.12)' : 'rgba(220,38,38,0.1)') : 'var(--surface-subtle)', color: active ? (opt ? 'var(--color-success)' : 'var(--color-danger)') : 'var(--text-secondary)', border: `1px solid ${active ? (opt ? 'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.25)') : 'var(--border-default)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 120ms ease', fontFamily: 'inherit' }}>
              {opt ? yes : no}
            </button>
          )
        })}
      </div>
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>{hint}</p>}
    </div>
  )
}

function Divider({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', paddingTop: 'var(--space-2)' }}>
      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', flexShrink: 0, margin: 0 }}>{title}</p>
      <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
    </div>
  )
}

function FileUploadField({ label, files, onAdd, onRemove, hint }) {
  const inputRef = useRef(null)
  const t = useTranslations()
  const chooseFiles = t.orderForm?.chooseFiles || 'Choose files'

  const handleChange = (e) => {
    const picked = Array.from(e.target.files).map(f => ({ name: f.name, size: f.size }))
    onAdd(picked)
    e.target.value = ''
  }

  const fmt = (bytes) => bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1048576).toFixed(1)} MB`

  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <input ref={inputRef} type="file" multiple onChange={handleChange} style={{ display: 'none' }} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', height: 36, padding: '0 var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--surface-subtle)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 120ms ease' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
      >
        <Paperclip size={14} /> {chooseFiles}
      </button>

      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3)', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', minWidth: 0 }}>
                <Paperclip size={12} color="var(--color-brand-400)" />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', flexShrink: 0 }}>({fmt(f.size)})</span>
              </span>
              <button type="button" onClick={() => onRemove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', padding: 'var(--space-1)', borderRadius: 'var(--radius-sm)', transition: 'color 120ms ease', flexShrink: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)' }}
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>{hint}</p>}
    </div>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ steps, currentIndex }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: 'var(--space-1)' }}>
      {steps.map((step, i) => (
        <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? '1 0 auto' : 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < currentIndex ? 'var(--color-success)' : i === currentIndex ? 'var(--color-brand-500)' : 'var(--surface-overlay)', border: `1px solid ${i < currentIndex ? 'var(--color-success)' : i === currentIndex ? 'var(--color-brand-600)' : 'var(--border-default)'}`, fontSize: 'var(--text-xs)', fontWeight: 700, color: i <= currentIndex ? 'var(--color-neutral-0)' : 'var(--text-disabled)', transition: 'all 200ms ease' }}>
              {i < currentIndex ? <Check size={14} strokeWidth={3} /> : i + 1}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: i === currentIndex ? 600 : 400, color: i === currentIndex ? 'var(--text-primary)' : i < currentIndex ? 'var(--color-success)' : 'var(--text-disabled)', whiteSpace: 'nowrap' }}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: i < currentIndex ? 'var(--color-success)' : 'var(--border-default)', margin: '0 var(--space-2)', marginBottom: 'var(--space-5)', transition: 'background 200ms ease' }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Step 1: Customer details ──────────────────────────────────────────────────

function ContactStep({ data, set, errors, tr, countryOptions }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title={tr.dividerYourDetails} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={tr.firstName} id="firstName" placeholder={tr.placeholderFirstName} value={data.firstName} onChange={set('firstName')} required autoComplete="given-name" error={errors.firstName} />
        <Field label={tr.lastName} id="lastName" placeholder={tr.placeholderLastName} value={data.lastName} onChange={set('lastName')} required autoComplete="family-name" error={errors.lastName} />
        <Field label={tr.businessName} id="businessName" placeholder={tr.placeholderBusiness} value={data.businessName} onChange={set('businessName')} required autoComplete="organization" error={errors.businessName} />
        <Field label={tr.emailAddress} id="email" type="email" placeholder="your@email.com" value={data.email} onChange={set('email')} required autoComplete="email" error={errors.email} />
        <Field label={tr.phoneNumber} id="phone" type="tel" placeholder="+30 69..." value={data.phone} onChange={set('phone')} required autoComplete="tel" hint={tr.phoneHint} error={errors.phone} />
        <SelectField label={tr.country} id="country" options={countryOptions} value={data.country} onChange={set('country')} required error={errors.country} />
      </div>
    </div>
  )
}

// ── Step 2: Business and project details ──────────────────────────────────────

function BusinessStep({ data, set, uploads, onAddFiles, onRemoveFile, tr, businessTypeOptions }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title={tr.dividerAboutBusiness} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectField label={tr.businessType} id="businessType" options={businessTypeOptions} value={data.businessType} onChange={set('businessType')} required />
        <Field label={tr.mainServices} id="businessServices" placeholder={tr.placeholderServices} value={data.businessServices} onChange={set('businessServices')} required />
      </div>
      <TextareaField label={tr.targetAudience} id="targetAudience" placeholder={tr.placeholderTargetAudience} value={data.targetAudience} onChange={set('targetAudience')} rows={3} required />
      <Field label={tr.existingWebsite} id="existingWebsite" placeholder="www.example.gr (leave blank if none)" value={data.existingWebsite} onChange={set('existingWebsite')} hint="Leave blank if you don't have one yet" />
      <Divider title={tr.dividerBrandAssets} />
      <FileUploadField
        label={tr.uploadLabel}
        files={uploads}
        onAdd={onAddFiles}
        onRemove={onRemoveFile}
        hint="Logo, brand colours guide, photos, or any reference files. If you prefer, email them to hello@goai.example after submitting."
      />
      <Divider title={tr.dividerProjectTiming} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={tr.preferredLaunchDate} id="launchDate" type="date" value={data.launchDate} onChange={set('launchDate')} hint="Target date — we'll confirm if achievable" />
        <TextareaField label={tr.additionalNotes} id="projectNotes" placeholder={tr.placeholderNotes} value={data.projectNotes} onChange={set('projectNotes')} rows={2} />
      </div>
    </div>
  )
}

// ── Step 3: Package-specific questions ────────────────────────────────────────

const PAGE_OPTIONS = ['Home', 'About', 'Services', 'Contact', 'Blog', 'Portfolio', 'Pricing', 'FAQs', 'Testimonials', 'Gallery', 'Booking / Reservations', 'Team', 'Shop / Products']

function WebsiteSection({ data, set, setMulti }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title="Website details" />
      <YesNoToggle label="Do you already have a website?" value={data.hasWebsite} onChange={(v) => set('hasWebsite')({ target: { value: v } })} hint="This helps us understand what to build or improve" />
      <AnimatePresence mode="wait">
        {data.hasWebsite === true && (
          <motion.div key="yes" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', paddingTop: 'var(--space-2)' }}>
              <Field label="Current website URL" id="existingUrl" placeholder="www.your-current-site.com" value={data.existingUrl} onChange={set('existingUrl')} />
              <TextareaField label="What would you like to improve?" id="improvements" placeholder="e.g. outdated design, not mobile-friendly, needs better SEO..." value={data.improvements} onChange={set('improvements')} rows={3} />
            </div>
          </motion.div>
        )}
        {data.hasWebsite === false && (
          <motion.div key="no" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', paddingTop: 'var(--space-2)' }}>
              <SelectField label="Domain status" id="needsDomain" options={['I already have a domain', 'I need a new domain', 'Not sure yet']} value={data.needsDomain} onChange={set('needsDomain')} hint="We'll help you set this up either way" />
              <SelectField label="Type of website needed" id="websiteType" options={['Informational / Brochure', 'Lead generation / Enquiry-focused', 'Booking / Reservation', 'E-commerce / Online shop', 'Portfolio / Showcase', 'Not sure — advise me']} value={data.websiteType} onChange={set('websiteType')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Divider title="Pages and content" />
      <CheckboxGroup label="Pages required" options={PAGE_OPTIONS} selected={data.pagesNeeded} onChange={(p) => setMulti('pagesNeeded', p)} hint="Select all you need — we'll confirm the scope" />
      <Field label="Any other pages not listed above?" id="otherPages" placeholder="e.g. Events, Careers, Partner login" value={data.otherPages} onChange={set('otherPages')} />
      <Divider title="Branding" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <YesNoToggle label="Do you have a logo?" value={data.hasLogo} onChange={(v) => set('hasLogo')({ target: { value: v } })} />
        <YesNoToggle label="Do you have brand colours?" value={data.hasBrandColors} onChange={(v) => set('hasBrandColors')({ target: { value: v } })} />
        <YesNoToggle label="Do you have photos/images?" value={data.hasImages} onChange={(v) => set('hasImages')({ target: { value: v } })} hint="We can source stock images if not" />
      </div>
      {data.hasBrandColors === false && <Field label="Colours or style you like" id="colourNotes" placeholder="e.g. deep blue and gold, minimal black and white" value={data.colourNotes} onChange={set('colourNotes')} />}
      <Field label="Example websites you like" id="exampleWebsites" placeholder="www.site1.com, www.site2.com" value={data.exampleWebsites} onChange={set('exampleWebsites')} hint="Share any sites whose design or structure you admire" />
    </div>
  )
}

function SocialSection({ data, set, setMulti }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title="Social media" />
      <CheckboxGroup label="Which platforms do you need content for?" options={['Instagram', 'Facebook', 'LinkedIn', 'TikTok']} selected={data.platforms} onChange={(p) => setMulti('platforms', p)} hint="We'll create platform-specific content for each" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectField label="Posting frequency" id="postingFrequency" options={['3 posts per week', '2 posts per week', '1 post per week', 'Daily', 'Flexible — advise me']} value={data.postingFrequency} onChange={set('postingFrequency')} />
        <SelectField label="Tone of voice" id="toneOfVoice" options={['Professional and formal', 'Friendly and approachable', 'Energetic and bold', 'Calm and premium', 'Fun and playful', 'Not sure — advise me']} value={data.toneOfVoice} onChange={set('toneOfVoice')} hint="How should your brand sound?" />
      </div>
      <TextareaField label="Content themes and topics" id="contentThemes" placeholder="e.g. property highlights, local tips, behind the scenes, seasonal offers..." value={data.contentThemes} onChange={set('contentThemes')} rows={3} />
      {data.platforms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.platforms.includes('Instagram') && <Field label="Instagram profile URL" id="instagramUrl" placeholder="instagram.com/yourhandle" value={data.instagramUrl} onChange={set('instagramUrl')} />}
          {data.platforms.includes('Facebook') && <Field label="Facebook page URL" id="facebookUrl" placeholder="facebook.com/yourpage" value={data.facebookUrl} onChange={set('facebookUrl')} />}
          {data.platforms.includes('LinkedIn') && <Field label="LinkedIn profile or page URL" id="linkedinUrl" placeholder="linkedin.com/company/yourpage" value={data.linkedinUrl} onChange={set('linkedinUrl')} />}
          {data.platforms.includes('TikTok') && <Field label="TikTok profile URL" id="tiktokUrl" placeholder="tiktok.com/@yourhandle" value={data.tiktokUrl} onChange={set('tiktokUrl')} />}
        </div>
      )}
      <YesNoToggle label="Do you need us to create images and graphics?" value={data.needsImageCreation} onChange={(v) => set('needsImageCreation')({ target: { value: v } })} hint="We can design social graphics if you don't have a visual team" />
    </div>
  )
}

function AutomationSection({ data, set, setMulti }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title="Automation requirements" />
      <TextareaField label="What process would you like to automate?" id="processToAutomate" placeholder="e.g. when someone enquires via WhatsApp, automatically send a pricing PDF and booking form, then follow up after 48 hours..." value={data.processToAutomate} onChange={set('processToAutomate')} rows={4} required hint="Describe the manual task you want to remove from your day" />
      <CheckboxGroup label="Tools you currently use" options={['WhatsApp Business', 'Gmail / Google Workspace', 'Mailchimp', 'Brevo (Sendinblue)', 'HubSpot', 'Notion', 'Airtable', 'Google Sheets', 'Calendly', 'Stripe', 'Other']} selected={data.toolsUsed} onChange={(t) => setMulti('toolsUsed', t)} hint="Select all that apply — we'll integrate where possible" />
      <TextareaField label="What should happen automatically?" id="whatShouldHappen" placeholder="e.g. send a confirmation message, add the lead to a spreadsheet, notify me on WhatsApp, send a follow-up email after 2 days..." value={data.whatShouldHappen} onChange={set('whatShouldHappen')} rows={4} hint="Be as specific as you like — this is the core of your automation" />
      <Divider title="Notifications" />
      <YesNoToggle label="Do you need to approve anything before it's sent to a customer?" value={data.needsApproval} onChange={(v) => set('needsApproval')({ target: { value: v } })} hint="e.g. review a proposal before it goes out" />
      <Field label="Who should receive system notifications?" id="notificationRecipients" placeholder="e.g. owner@business.com, WhatsApp +30 69..." value={data.notificationRecipients} onChange={set('notificationRecipients')} hint="Name and contact for each person who needs to be notified" />
    </div>
  )
}

function PackageQuestionsStep({ form, setField, setMulti, neededFormTypes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {neededFormTypes.includes('website') && <WebsiteSection data={form.website} set={setField('website')} setMulti={setMulti('website')} />}
      {neededFormTypes.includes('social') && <SocialSection data={form.social} set={setField('social')} setMulti={setMulti('social')} />}
      {neededFormTypes.includes('automation') && <AutomationSection data={form.automation} set={setField('automation')} setMulti={setMulti('automation')} />}
    </div>
  )
}

// ── Step 4: Review / Order summary ────────────────────────────────────────────

function SummaryRow({ label, value }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--border-default)', paddingBottom: 'var(--space-2)' }}>
      <span style={{ color: 'var(--text-tertiary)', flexShrink: 0, minWidth: 130 }}>{label}</span>
      <span style={{ color: 'var(--text-primary)', wordBreak: 'break-word' }}>{value}</span>
    </div>
  )
}

function ReviewStep({ form, items, uploads, consent, setConsent, errors, tr }) {
  const recurring = items.filter(i => /\/mo(nth)?|\/μήνα/i.test(i.priceDisplay))
  const oneOff = items.filter(i => !/\/mo(nth)?|\/μήνα/i.test(i.priceDisplay))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <Divider title={tr.dividerOrderSummary} />

      {/* Packages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <p style={{ ...labelStyle, margin: 0 }}>{tr.selectedPackages} ({items.length})</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</span>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-brand-400)', flexShrink: 0, marginLeft: 'var(--space-3)' }}>{item.priceDisplay}</span>
            </div>
          ))}
        </div>

        {oneOff.length > 0 && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            {tr.oneOffSetup}: {oneOff.map(i => i.name).join(', ')}
          </p>
        )}
        {recurring.length > 0 && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-400)', fontStyle: 'italic' }}>
            {tr.monthlyRecurring}: {recurring.map(i => i.name).join(', ')}
          </p>
        )}
      </div>

      {/* Customer details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <p style={{ ...labelStyle, margin: 0 }}>{tr.dividerYourDetailsReview}</p>
        <div style={{ padding: 'var(--space-4)', background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <SummaryRow label={tr.labelName} value={`${form.contact.firstName} ${form.contact.lastName}`.trim()} />
          <SummaryRow label={tr.labelBusiness} value={form.contact.businessName} />
          <SummaryRow label={tr.labelEmail} value={form.contact.email} />
          <SummaryRow label={tr.labelPhone} value={form.contact.phone} />
          <SummaryRow label={tr.labelCountry} value={form.contact.country} />
          {form.business.existingWebsite && <SummaryRow label={tr.labelExistingWebsite} value={form.business.existingWebsite} />}
          {form.business.businessType && <SummaryRow label={tr.labelBusinessType} value={form.business.businessType} />}
          {form.business.targetAudience && <SummaryRow label={tr.labelTargetAudience} value={form.business.targetAudience} />}
        </div>
      </div>

      {/* Uploaded files */}
      {uploads.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ ...labelStyle, margin: 0 }}>{tr.uploadedFiles} ({uploads.length})</p>
          <div style={{ padding: 'var(--space-4)', background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {uploads.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <Paperclip size={12} color="var(--color-brand-400)" style={{ flexShrink: 0 }} />
                <span style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            File names recorded. If files are large, email them to hello@goai.example after submitting.
          </p>
        </div>
      )}

      {/* Consent */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', cursor: 'pointer' }}>
          <div
            onClick={() => setConsent(v => !v)}
            style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2, borderRadius: 'var(--radius-sm)', background: consent ? 'var(--color-brand-500)' : 'var(--surface-subtle)', border: `1px solid ${errors.consent ? 'var(--color-danger)' : consent ? 'var(--color-brand-600)' : 'var(--border-default)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 120ms ease', cursor: 'pointer' }}
          >
            {consent && <Check size={11} strokeWidth={3} color="#fff" />}
          </div>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {tr.consentText}*
          </span>
        </label>
        <ErrorMsg msg={errors.consent} />
      </div>
    </div>
  )
}

// ── Step 5: Payment ───────────────────────────────────────────────────────────

function PaymentStep({ items, tr }) {
  const recurring = hasRecurringCost(items)
  const oneOff = items.some(i => !/\/mo(nth)?|\/μήνα/i.test(i.priceDisplay) || /one-off|setup|From|εφάπαξ|Ρύθμιση|Από/i.test(i.priceDisplay))
  const steps = recurring ? tr.paymentStepsRecurring : tr.paymentStepsOneOff

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <Divider title={tr.dividerPaymentDetails} />

      <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-400)', flexShrink: 0 }}>
            <CreditCard size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{tr.securePayment}</h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>{tr.paymentSubtitle}</p>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
          {tr.paymentBody}
        </p>

        {recurring && (
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
            <AlertCircle size={16} color="var(--color-accent-500)" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              {tr.recurringNotice}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-default)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>{tr.whatHappensNext}</p>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--color-brand-400)', flexShrink: 0, marginTop: 1 }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Confirmation ──────────────────────────────────────────────────────────────

function Confirmation({ hasRecurring, hasUploads, reduceMotion, tr }) {
  const message = hasRecurring
    ? tr.confirmationRecurring
    : (hasUploads ? tr.confirmationOneOff : tr.confirmationOneOffNoFiles)

  return (
    <main style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 540, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}
      >
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
          <CheckCircle size={32} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {tr.submissionReceived}
          </h1>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, maxWidth: '46ch' }}>
            {message}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Link
            to="/"
            style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)', textDecoration: 'none', transition: 'filter 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}
          >
            {tr.returnHome}
          </Link>
          <Link
            to="/packages"
            style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            {tr.viewPackages}
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function OrderForm() {
  const reduceMotion = useReducedMotion()
  const { items, neededFormTypes, clearBasket } = useBasket()
  const t = useTranslations()
  const tr = t.orderForm || {}

  // Build country and business type options with stable values but translated labels
  const countryOptions = (tr.countryLabels || COUNTRY_VALUES).map((label, i) => ({
    label,
    value: COUNTRY_VALUES[i] || label,
  }))
  const businessTypeOptions = (tr.businessTypeLabels || BUSINESS_TYPE_VALUES).map((label, i) => ({
    label,
    value: BUSINESS_TYPE_VALUES[i] || label,
  }))

  const [submitted, setSubmitted] = useState(false)
  const [submittedWithRecurring, setSubmittedWithRecurring] = useState(false)
  const [submittedWithUploads, setSubmittedWithUploads] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState({})
  const [consent, setConsent] = useState(false)
  const [uploads, setUploads] = useState([])

  const addFiles = (picked) => setUploads(prev => {
    const existing = new Set(prev.map(f => f.name))
    return [...prev, ...picked.filter(f => !existing.has(f.name))]
  })
  const removeFile = (index) => setUploads(prev => prev.filter((_, i) => i !== index))

  useSEO({ title: 'Start Your Order — GO AI', description: 'Complete your GO AI order form. Tell us about your business and what you need — we handle the rest.' })

  const [form, setForm] = useState({
    contact: { firstName: '', lastName: '', businessName: '', email: '', phone: '', country: '' },
    business: { businessType: '', businessServices: '', targetAudience: '', existingWebsite: '', launchDate: '', projectNotes: '' },
    website: { hasWebsite: null, existingUrl: '', improvements: '', needsDomain: '', websiteType: '', pagesNeeded: [], otherPages: '', hasLogo: null, hasBrandColors: null, hasImages: null, colourNotes: '', exampleWebsites: '' },
    social: { platforms: [], postingFrequency: '', toneOfVoice: '', contentThemes: '', instagramUrl: '', facebookUrl: '', linkedinUrl: '', tiktokUrl: '', needsImageCreation: null },
    automation: { processToAutomate: '', toolsUsed: [], whatShouldHappen: '', needsApproval: null, notificationRecipients: '' },
  })

  const steps = useMemo(() => {
    const s = [
      { id: 'contact',  label: tr.stepYourDetails  || 'Your Details' },
      { id: 'business', label: tr.stepYourBusiness  || 'Your Business' },
    ]
    const hasPackageQuestions = neededFormTypes.includes('website') || neededFormTypes.includes('social') || neededFormTypes.includes('automation')
    if (hasPackageQuestions) s.push({ id: 'packages', label: tr.stepProjectDetails || 'Project Details' })
    s.push({ id: 'review',  label: tr.stepReviewOrder  || 'Review Order' })
    s.push({ id: 'payment', label: tr.stepPayment      || 'Payment' })
    return s
  }, [neededFormTypes, tr])

  const currentStep = steps[currentIndex]

  const setField = (section) => (key) => (e) =>
    setForm(prev => ({ ...prev, [section]: { ...prev[section], [key]: e.target.value } }))

  const setMulti = (section) => (key, value) =>
    setForm(prev => {
      const arr = prev[section][key]
      return { ...prev, [section]: { ...prev[section], [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] } }
    })

  const handleNext = () => {
    let stepErrors = {}
    if (currentStep.id === 'contact') stepErrors = validateContact(form.contact, tr)
    if (currentStep.id === 'review')  stepErrors = validateReview(consent, tr)

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})
    setCurrentIndex(i => i + 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const recurring = hasRecurringCost(items)
    const submission = {
      submittedAt: new Date().toISOString(),
      customer: {
        name: `${form.contact.firstName} ${form.contact.lastName}`.trim(),
        business: form.contact.businessName,
        email: form.contact.email,
        phone: form.contact.phone,
        country: form.contact.country, // stable English value always stored
      },
      project: form.business,
      uploadedFiles: uploads.map(f => f.name),
      selectedPackages: items.map(i => ({ name: i.name, price: i.priceDisplay })),
      packageAnswers: {
        ...(neededFormTypes.includes('website') ? { website: form.website } : {}),
        ...(neededFormTypes.includes('social') ? { social: form.social } : {}),
        ...(neededFormTypes.includes('automation') ? { automation: form.automation } : {}),
      },
      hasRecurring: recurring,
    }
    console.log('GO AI Order Submission:', JSON.stringify(submission, null, 2))
    setSubmittedWithRecurring(recurring)
    setSubmittedWithUploads(uploads.length > 0)
    clearBasket()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) return <Confirmation hasRecurring={submittedWithRecurring} hasUploads={submittedWithUploads} reduceMotion={reduceMotion} tr={tr} />

  // Empty basket guard
  if (items.length === 0) {
    return (
      <main style={{ paddingTop: 64, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <div style={{ maxWidth: 480, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: 'var(--surface-overlay)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>{tr.basketEmpty || 'Your basket is empty'}</h1>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{tr.basketEmptyBody || 'Add services from our packages or bundles pages to get started with your order.'}</p>
          </div>
          <Link to="/packages" style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}>
            {tr.browsePackages || 'Browse Packages'} <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    )
  }

  const isPaymentStep = currentStep.id === 'payment'
  const isReviewStep  = currentStep.id === 'review'
  const reviewBtnLabel = hasRecurringCost(items)
    ? (tr.continueToPaymentSetup || 'Continue to Payment Setup')
    : (tr.continueToPayment || 'Continue to Secure Payment')
  const n = items.length
  const subtitle = n === 1
    ? (tr.subtitleSingular || '1 package selected · No payment taken here')
    : (tr.subtitlePlural || `{n} packages selected · No payment taken here`).replace('{n}', n)

  return (
    <main style={{ paddingTop: 64, background: 'var(--surface-base)' }}>
      {/* Header */}
      <div style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-default)', padding: 'var(--space-8) var(--space-8) var(--space-6)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', marginBottom: 'var(--space-2)' }}>{tr.tag || 'Order form'}</p>
            <h1 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
              {tr.title || 'Tell us about your project'}
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
              {subtitle}
            </p>
          </div>
          <ProgressBar steps={steps} currentIndex={currentIndex} />
        </div>
      </div>

      {/* Form */}
      <section style={{ padding: 'var(--space-10) var(--space-8) var(--space-20)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <form onSubmit={isPaymentStep ? handleSubmit : (e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={reduceMotion ? {} : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, x: -12 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentStep.id === 'contact'  && <ContactStep data={form.contact} set={setField('contact')} errors={errors} tr={tr} countryOptions={countryOptions} />}
                {currentStep.id === 'business' && <BusinessStep data={form.business} set={setField('business')} uploads={uploads} onAddFiles={addFiles} onRemoveFile={removeFile} tr={tr} businessTypeOptions={businessTypeOptions} />}
                {currentStep.id === 'packages' && <PackageQuestionsStep form={form} setField={setField} setMulti={setMulti} neededFormTypes={neededFormTypes} />}
                {currentStep.id === 'review'   && <ReviewStep form={form} items={items} uploads={uploads} consent={consent} setConsent={setConsent} errors={errors} tr={tr} />}
                {currentStep.id === 'payment'  && <PaymentStep items={items} tr={tr} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-default)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <button
                type="button"
                onClick={() => { setErrors({}); setCurrentIndex(i => i - 1) }}
                disabled={currentIndex === 0}
                style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: currentIndex === 0 ? 'var(--text-disabled)' : 'var(--text-primary)', border: `1px solid ${currentIndex === 0 ? 'var(--border-default)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-md)', cursor: currentIndex === 0 ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'background 120ms ease' }}
                onMouseEnter={(e) => { if (currentIndex > 0) e.currentTarget.style.background = 'var(--surface-raised)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <ArrowLeft size={14} /> {tr.back || 'Back'}
              </button>

              {!isPaymentStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 24px rgba(118, 39, 239, 0.35)', cursor: 'pointer', fontFamily: 'inherit', transition: 'filter 120ms ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}
                >
                  {isReviewStep ? reviewBtnLabel : (tr.continue || 'Continue')} <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-md)', boxShadow: '0 0 24px rgba(118, 39, 239, 0.35)', cursor: 'pointer', fontFamily: 'inherit', transition: 'filter 120ms ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}
                >
                  <Send size={14} /> {tr.continue || 'Continue'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
