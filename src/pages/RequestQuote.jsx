import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ChevronRight, Send, Upload, X as XIcon, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'

// ── Shared styles ─────────────────────────────────────────────────────────────

const inputBase = {
  width: '100%',
  padding: '10px var(--space-3)',
  fontSize: 'var(--text-base)',
  lineHeight: 1.5,
  color: 'var(--text-primary)',
  background: 'var(--surface-subtle)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-md)',
  outline: 'none',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const labelBase = {
  fontSize: 'var(--text-sm)',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  marginBottom: 'var(--space-2)',
  display: 'block',
}

const helperBase = {
  fontSize: 'var(--text-xs)',
  color: 'var(--text-tertiary)',
  marginTop: 'var(--space-1)',
  display: 'block',
}

const errorStyle = {
  fontSize: 'var(--text-xs)',
  color: 'var(--color-danger)',
  marginTop: 'var(--space-1)',
  display: 'block',
}

const sectionLabel = {
  fontSize: 'var(--text-xs)',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--goai-violet)',
  marginBottom: 'var(--space-4)',
  display: 'block',
}

// ── URL validation helper ─────────────────────────────────────────────────────

const isValidUrl = (val) =>
  !val || /^(https?:\/\/|www\.)[^\s]+\.[^\s]+/.test(val.trim())

// ── Field components ──────────────────────────────────────────────────────────

function Field({ label, id, type = 'text', placeholder, value, onChange, required, helper, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelBase}>
        {label}{required && <span style={{ color: 'var(--goai-violet)', marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        style={{
          ...inputBase,
          borderColor: error ? 'var(--color-danger)' : focused ? 'var(--goai-violet)' : 'var(--border-default)',
          boxShadow: focused && !error ? '0 0 0 2px rgba(118,39,239,0.18)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {helper && !error && <span style={helperBase}>{helper}</span>}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}

function SelectField({ label, id, options, value, onChange, required, helper, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelBase}>
        {label}{required && <span style={{ color: 'var(--goai-violet)', marginLeft: 2 }}>*</span>}
      </label>
      <select
        id={id} value={value} onChange={onChange} required={required}
        style={{
          ...inputBase,
          borderColor: error ? 'var(--color-danger)' : focused ? 'var(--goai-violet)' : 'var(--border-default)',
          boxShadow: focused && !error ? '0 0 0 2px rgba(118,39,239,0.18)' : 'none',
          appearance: 'none', cursor: 'pointer',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {helper && !error && <span style={helperBase}>{helper}</span>}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}

function TextareaField({ label, id, placeholder, value, onChange, rows = 4, required, helper, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelBase}>
        {label}{required && <span style={{ color: 'var(--goai-violet)', marginLeft: 2 }}>*</span>}
      </label>
      <textarea
        id={id} placeholder={placeholder} value={value} onChange={onChange}
        rows={rows} required={required}
        style={{
          ...inputBase,
          borderColor: error ? 'var(--color-danger)' : focused ? 'var(--goai-violet)' : 'var(--border-default)',
          boxShadow: focused && !error ? '0 0 0 2px rgba(118,39,239,0.18)' : 'none',
          resize: 'vertical', minHeight: rows * 26,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {helper && !error && <span style={helperBase}>{helper}</span>}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}

function ToggleGroup({ label, options, value, onChange, required, helper, error }) {
  return (
    <div>
      <p style={labelBase}>
        {label}{required && <span style={{ color: 'var(--goai-violet)', marginLeft: 2 }}>*</span>}
      </p>
      {helper && <span style={{ ...helperBase, marginBottom: 'var(--space-3)', display: 'block' }}>{helper}</span>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {options.map((opt) => {
          const sel = value === opt
          return (
            <button
              key={opt} type="button" onClick={() => onChange(opt)}
              style={{
                padding: '7px var(--space-4)',
                fontSize: 'var(--text-sm)', fontWeight: sel ? 600 : 400,
                background: sel ? 'rgba(118,39,239,0.12)' : 'var(--surface-subtle)',
                color: sel ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: sel ? '1px solid var(--goai-violet)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >{opt}</button>
          )
        })}
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}

function MultiCheckbox({ label, options, values, onChange, required, helper, error, columns = 2 }) {
  const toggle = (opt) => {
    const next = values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt]
    onChange(next)
  }
  return (
    <div>
      <p style={labelBase}>
        {label}{required && <span style={{ color: 'var(--goai-violet)', marginLeft: 2 }}>*</span>}
      </p>
      {helper && <span style={{ ...helperBase, marginBottom: 'var(--space-3)', display: 'block' }}>{helper}</span>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--space-2)',
      }}
        className="rq-checkbox-grid"
      >
        {options.map((opt) => {
          const checked = values.includes(opt)
          return (
            <button
              key={opt} type="button" onClick={() => toggle(opt)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-4)',
                background: checked ? 'rgba(118,39,239,0.08)' : 'var(--surface-subtle)',
                border: checked ? '1px solid var(--goai-violet)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
                textAlign: 'left',
              }}
            >
              <span style={{
                width: 16, height: 16, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                background: checked ? 'linear-gradient(90deg,#293BFF 0%,#7627EF 100%)' : 'transparent',
                border: checked ? 'none' : '1px solid var(--border-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 120ms ease',
              }}>
                {checked && <Check size={10} color="#fff" strokeWidth={3} />}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: checked ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.3 }}>
                {opt}
              </span>
            </button>
          )
        })}
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}

function CardSelect({ label, options, values, onChange, helper }) {
  const toggle = (opt) => {
    const next = values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt]
    onChange(next)
  }
  return (
    <div>
      <p style={labelBase}>{label}</p>
      {helper && <span style={{ ...helperBase, marginBottom: 'var(--space-3)', display: 'block' }}>{helper}</span>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 'var(--space-3)' }}>
        {options.map((opt) => {
          const sel = values.includes(opt)
          return (
            <button
              key={opt} type="button" onClick={() => toggle(opt)}
              style={{
                padding: 'var(--space-4)',
                background: sel ? 'rgba(118,39,239,0.12)' : 'var(--surface-subtle)',
                border: sel ? '1px solid var(--goai-violet)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                color: sel ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: 'var(--text-sm)', fontWeight: sel ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 120ms ease',
                textAlign: 'left',
              }}
            >{opt}</button>
          )
        })}
      </div>
    </div>
  )
}

function FileUpload({ files, onChange }) {
  // TODO: No file upload backend is configured.
  // Files are stored in local component state only and will not be sent to any server.
  // To enable actual file uploads, integrate a storage service (e.g. AWS S3,
  // Cloudflare R2, Uploadcare) and connect it to your form submission endpoint.
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const added = Array.from(e.target.files || [])
    onChange(prev => [...prev, ...added])
    e.target.value = ''
  }

  const remove = (i) => onChange(prev => prev.filter((_, idx) => idx !== i))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: '2px dashed var(--border-strong)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-10) var(--space-6)',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 120ms ease, background 120ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--goai-violet)'; e.currentTarget.style.background = 'rgba(118,39,239,0.04)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'transparent' }}
      >
        <Upload size={24} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-3)' }} />
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '0 0 var(--space-1)' }}>
          Click to upload files
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
          JPG, PNG, WEBP, PDF, DOC, DOCX — multiple files allowed
        </p>
        <input
          ref={inputRef} type="file" multiple
          accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>

      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {files.map((file, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
            }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.name}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button" onClick={() => remove(i)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-tertiary)', display: 'flex', flexShrink: 0,
                  padding: 'var(--space-1)', borderRadius: 'var(--radius-sm)',
                  transition: 'color 120ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)' }}
                aria-label={`Remove ${file.name}`}
              >
                <XIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Static data ───────────────────────────────────────────────────────────────

const BUSINESS_TYPES = [
  'Restaurant / Café', 'Villa / Holiday Rental', 'Hotel / Accommodation',
  'Gym / Fitness', 'Hair & Beauty Salon', 'Tourism Company', 'Car / Boat Hire',
  'Retail / Shop', 'Professional Services', 'Healthcare / Wellness',
  'Construction / Trades', 'Education / Tutoring', 'Events / Entertainment',
  'Food & Drink', 'E-commerce', 'Other',
]

const CONTACT_OPTIONS = ['Email', 'Phone', 'WhatsApp', 'No preference']

const LOOKING_FOR = ['New website', 'Redesign', 'Add functionality', 'Not sure']

const WEBSITE_TYPES = [
  'Simple business', 'Multi-page', 'Ecommerce', 'Booking',
  'Portfolio', 'Landing page', 'Not sure',
]

const HELP_OPTIONS = [
  'New website build', 'Website redesign', 'Website updates', 'Monthly website support',
  'Hosting and care', 'Extra storage', 'Priority updates', 'Content refresh',
  'SEO basics', 'Google Business Profile', 'Extra pages', 'Contact forms',
  'Booking forms', 'Payment functionality', 'Ecommerce', 'Automation',
  'Integrations', 'AI chatbot', 'CRM', 'Social media', 'Branding', 'Copywriting',
  'Product pages', 'Landing pages', 'Not sure',
]

const BUDGET_OPTIONS = [
  'Under €500', '€500–€1,000', '€1,000–€2,500',
  '€2,500–€5,000', '€5,000+', 'Not sure',
]

const URGENCY_OPTIONS = [
  'ASAP', '2–4 weeks', '1–2 months', '3+ months', 'Flexible',
]

const YN = ['Yes', 'No']

// ── Initial state ─────────────────────────────────────────────────────────────

const INIT = {
  // Section 1
  fullName: '', businessName: '', email: '', phone: '',
  businessType: '', preferredContact: '',
  // Section 2
  hasWebsite: '', currentWebsiteUrl: '', websiteLikeDislike: '',
  lookingFor: '', websiteType: [],
  // Section 3
  helpNeeded: [],
  // Section 4
  hasDomain: '', needsDomain: '', needsHosting: '',
  hasLogo: '', hasBrandColours: '', hasPhotos: '', needsSEO: '',
  sellsProducts: '', productCount: '', paymentNeeded: '',
  takesBookings: '', bookingSystem: '',
  needsAutomation: '', automationTools: '',
  wantsRecommendation: '',
  // Section 5
  linkCurrentWebsite: '', linkInstagram: '', linkFacebook: '',
  linkLinkedIn: '', linkTikTok: '', linkYouTube: '', linkGBP: '',
  linkCompetitor1: '', linkCompetitor2: '', linkCompetitor3: '',
  linkExample1: '', linkExample2: '', linkExample3: '',
  // Section 6
  budget: '', urgency: '', startDate: '',
  // Section 7
  projectDetails: '', businessDetails: '', mustHaveFeatures: '', anythingElse: '',
  // Section 8
  files: [],
  // Review
  consent: false,
}

// ── Validation ────────────────────────────────────────────────────────────────

function validate(step, form) {
  const err = {}

  if (step === 0) {
    if (!form.fullName.trim())    err.fullName    = 'Full name is required.'
    if (!form.businessName.trim()) err.businessName = 'Business name is required.'
    if (!form.email.trim())       err.email       = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email address.'
    if (!form.phone.trim())       err.phone       = 'Phone number is required.'
    if (!form.businessType)       err.businessType = 'Please select your business type.'
    if (!form.preferredContact)   err.preferredContact = 'Please select a preferred contact method.'
  }

  if (step === 1) {
    if (!form.hasWebsite) err.hasWebsite = 'Please select Yes or No.'
    if (form.hasWebsite === 'Yes' && form.currentWebsiteUrl && !isValidUrl(form.currentWebsiteUrl)) {
      err.currentWebsiteUrl = 'Enter a valid URL (e.g. https://example.com).'
    }
    if (!form.lookingFor) err.lookingFor = 'Please select what you are looking for.'
  }

  if (step === 2) {
    if (!form.helpNeeded.length) err.helpNeeded = 'Please select at least one option.'
  }

  // Step 3 (Your Setup) — toggles are optional, conditional fields validated if parent is Yes
  // No blocking validation for step 3

  if (step === 4) {
    const urlFields = [
      'linkCurrentWebsite', 'linkInstagram', 'linkFacebook', 'linkLinkedIn',
      'linkTikTok', 'linkYouTube', 'linkGBP',
      'linkCompetitor1', 'linkCompetitor2', 'linkCompetitor3',
      'linkExample1', 'linkExample2', 'linkExample3',
    ]
    urlFields.forEach(f => {
      if (form[f] && !isValidUrl(form[f])) err[f] = 'Enter a valid URL.'
    })
    if (!form.budget)  err.budget  = 'Please select a budget range.'
    if (!form.urgency) err.urgency = 'Please select urgency.'
  }

  if (step === 5) {
    if (!form.projectDetails.trim()) err.projectDetails = 'Please tell us about your project.'
  }

  if (step === 6) {
    if (!form.consent) err.consent = 'You must agree to be contacted before submitting.'
  }

  return err
}

// ── Progress bar ──────────────────────────────────────────────────────────────

const STEP_LABELS = [
  'Your Details', 'Your Website', 'What You Need',
  'Your Setup', 'Links & Budget', 'Project Details', 'Review & Submit',
]

function ProgressBar({ current }) {
  return (
    <div style={{ marginBottom: 'var(--space-10)' }}>

      {/* Desktop: 7 labelled segments */}
      <div className="rq-progress-desktop">
        <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-3)' }}>
          {STEP_LABELS.map((label, i) => {
            const done = i < current
            const active = i === current
            return (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{
                  height: 3, borderRadius: 'var(--radius-full)',
                  background: done ? 'var(--goai-violet)' : active ? 'var(--goai-blue)' : 'var(--border-default)',
                  transition: 'background 200ms ease',
                }} />
                <span style={{
                  fontSize: '0.58rem', fontWeight: active ? 600 : 400,
                  color: active ? 'var(--text-primary)' : done ? 'var(--goai-violet)' : 'var(--text-tertiary)',
                  transition: 'color 200ms ease',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
          Step {current + 1} of {STEP_LABELS.length}
        </p>
      </div>

      {/* Mobile: compact "Step X of 7 — Name" + single progress bar */}
      <div className="rq-progress-mobile">
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 var(--space-2)' }}>
          Step {current + 1} of {STEP_LABELS.length}
          <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}> — {STEP_LABELS[current]}</span>
        </p>
        <div style={{ display: 'flex', gap: 3 }}>
          {STEP_LABELS.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1, height: 3, borderRadius: 'var(--radius-full)',
                background: i < current ? 'var(--goai-violet)' : i === current ? 'var(--goai-blue)' : 'var(--border-default)',
                transition: 'background 200ms ease',
              }}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

// ── Step 1 — Your Details ─────────────────────────────────────────────────────

function Step1({ form, set, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <span style={sectionLabel}>Contact information</span>
      <div className="rq-grid-2">
        <Field label="Full name" id="fullName" value={form.fullName} onChange={set('fullName')} required error={errors.fullName} />
        <Field label="Business name" id="businessName" value={form.businessName} onChange={set('businessName')} required error={errors.businessName} />
        <Field label="Email address" id="email" type="email" value={form.email} onChange={set('email')} required error={errors.email} />
        <Field label="Phone number" id="phone" type="tel" placeholder="+30 6900 000000" value={form.phone} onChange={set('phone')} required error={errors.phone} />
      </div>
      <SelectField
        label="Business type / Industry" id="businessType"
        options={BUSINESS_TYPES} value={form.businessType} onChange={set('businessType')}
        required error={errors.businessType}
      />
      <ToggleGroup
        label="Preferred contact method"
        options={CONTACT_OPTIONS}
        value={form.preferredContact}
        onChange={(v) => set('preferredContact')({ target: { value: v } })}
        required error={errors.preferredContact}
      />
    </div>
  )
}

// ── Step 2 — Your Website ─────────────────────────────────────────────────────

function Step2({ form, set, setArr, errors }) {
  const reduceMotion = useReducedMotion()
  const fade = { initial: reduceMotion ? {} : { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] }, style: { overflow: 'hidden' } }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <ToggleGroup
        label="Do you currently have a website?"
        options={YN} value={form.hasWebsite}
        onChange={(v) => set('hasWebsite')({ target: { value: v } })}
        required error={errors.hasWebsite}
      />

      <AnimatePresence>
        {form.hasWebsite === 'Yes' && (
          <motion.div key="ws-yes" {...fade}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <Field
                label="Current website URL" id="currentWebsiteUrl" type="url"
                placeholder="https://www.yoursite.com"
                value={form.currentWebsiteUrl} onChange={set('currentWebsiteUrl')}
                error={errors.currentWebsiteUrl}
              />
              <TextareaField
                label="What do you like or dislike about it?" id="websiteLikeDislike"
                placeholder="Tell us what works well and what you'd like to change…"
                value={form.websiteLikeDislike} onChange={set('websiteLikeDislike')} rows={3}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToggleGroup
        label="Are you looking for…"
        options={LOOKING_FOR} value={form.lookingFor}
        onChange={(v) => set('lookingFor')({ target: { value: v } })}
        required error={errors.lookingFor}
      />

      <CardSelect
        label="What type of website? (select all that apply)"
        helper="You can choose more than one."
        options={WEBSITE_TYPES}
        values={form.websiteType}
        onChange={(v) => setArr('websiteType')(v)}
      />
    </div>
  )
}

// ── Step 3 — What You Need ────────────────────────────────────────────────────

function Step3({ form, setArr, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <MultiCheckbox
        label="What do you need help with? (select all that apply)"
        options={HELP_OPTIONS}
        values={form.helpNeeded}
        onChange={setArr('helpNeeded')}
        required error={errors.helpNeeded}
        columns={2}
      />
    </div>
  )
}

// ── Step 4 — Your Setup ───────────────────────────────────────────────────────

function Step4({ form, set }) {
  const reduceMotion = useReducedMotion()
  const fade = { initial: reduceMotion ? {} : { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] }, style: { overflow: 'hidden' } }
  const tog = (key) => (v) => set(key)({ target: { value: v } })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <span style={sectionLabel}>Tell us about your current setup</span>

      <ToggleGroup label="Do you already have a domain?" options={YN} value={form.hasDomain} onChange={tog('hasDomain')} />
      <AnimatePresence>
        {form.hasDomain === 'No' && (
          <motion.div key="nd" {...fade}>
            <ToggleGroup label="Do you need help buying a domain?" options={YN} value={form.needsDomain} onChange={tog('needsDomain')} />
          </motion.div>
        )}
      </AnimatePresence>

      <ToggleGroup label="Do you need hosting?" options={YN} value={form.needsHosting} onChange={tog('needsHosting')} />
      <ToggleGroup label="Do you have a logo?" options={YN} value={form.hasLogo} onChange={tog('hasLogo')} />
      <ToggleGroup label="Do you have brand colours?" options={YN} value={form.hasBrandColours} onChange={tog('hasBrandColours')} />
      <ToggleGroup label="Do you have photos or images ready?" options={YN} value={form.hasPhotos} onChange={tog('hasPhotos')} />
      <ToggleGroup label="Do you need SEO support?" options={YN} value={form.needsSEO} onChange={tog('needsSEO')} />

      <ToggleGroup label="Do you sell products online?" options={YN} value={form.sellsProducts} onChange={tog('sellsProducts')} />
      <AnimatePresence>
        {form.sellsProducts === 'Yes' && (
          <motion.div key="sp" {...fade}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <Field label="Approximate number of products" id="productCount" placeholder="e.g. 50" value={form.productCount} onChange={set('productCount')} />
              <ToggleGroup label="Do you need payment processing on the website?" options={YN} value={form.paymentNeeded} onChange={tog('paymentNeeded')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToggleGroup label="Do you take bookings online?" options={YN} value={form.takesBookings} onChange={tog('takesBookings')} />
      <AnimatePresence>
        {form.takesBookings === 'Yes' && (
          <motion.div key="tb" {...fade}>
            <Field label="What booking system do you use (if any)?" id="bookingSystem" placeholder="e.g. Calendly, Booksy, none" value={form.bookingSystem} onChange={set('bookingSystem')} />
          </motion.div>
        )}
      </AnimatePresence>

      <ToggleGroup label="Do you need automation or integrations?" options={YN} value={form.needsAutomation} onChange={tog('needsAutomation')} />
      <AnimatePresence>
        {form.needsAutomation === 'Yes' && (
          <motion.div key="na" {...fade}>
            <Field label="What tools or systems do you use?" id="automationTools" placeholder="e.g. Mailchimp, WhatsApp, Zapier, CRM name…" value={form.automationTools} onChange={set('automationTools')} />
          </motion.div>
        )}
      </AnimatePresence>

      <ToggleGroup label="Do you want GoAI to recommend the best setup for you?" options={YN} value={form.wantsRecommendation} onChange={tog('wantsRecommendation')} />
    </div>
  )
}

// ── Step 5 — Links & Budget ───────────────────────────────────────────────────

function Step5({ form, set, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <span style={sectionLabel}>Links and inspiration</span>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Share links to help us understand your business and inspiration. All fields are optional.
        </p>
        <div className="rq-grid-2">
          <Field label="Current website" id="lCW" type="url" placeholder="https://" value={form.linkCurrentWebsite} onChange={set('linkCurrentWebsite')} error={errors.linkCurrentWebsite} />
          <Field label="Instagram" id="lIG" type="url" placeholder="https://instagram.com/…" value={form.linkInstagram} onChange={set('linkInstagram')} error={errors.linkInstagram} />
          <Field label="Facebook" id="lFB" type="url" placeholder="https://facebook.com/…" value={form.linkFacebook} onChange={set('linkFacebook')} error={errors.linkFacebook} />
          <Field label="LinkedIn" id="lLI" type="url" placeholder="https://linkedin.com/…" value={form.linkLinkedIn} onChange={set('linkLinkedIn')} error={errors.linkLinkedIn} />
          <Field label="TikTok" id="lTT" type="url" placeholder="https://tiktok.com/…" value={form.linkTikTok} onChange={set('linkTikTok')} error={errors.linkTikTok} />
          <Field label="YouTube" id="lYT" type="url" placeholder="https://youtube.com/…" value={form.linkYouTube} onChange={set('linkYouTube')} error={errors.linkYouTube} />
          <Field label="Google Business Profile" id="lGBP" type="url" placeholder="https://maps.app.goo.gl/…" value={form.linkGBP} onChange={set('linkGBP')} error={errors.linkGBP} />
        </div>
        <div className="rq-grid-3">
          <Field label="Competitor 1" id="lC1" type="url" placeholder="https://" value={form.linkCompetitor1} onChange={set('linkCompetitor1')} error={errors.linkCompetitor1} />
          <Field label="Competitor 2" id="lC2" type="url" placeholder="https://" value={form.linkCompetitor2} onChange={set('linkCompetitor2')} error={errors.linkCompetitor2} />
          <Field label="Competitor 3" id="lC3" type="url" placeholder="https://" value={form.linkCompetitor3} onChange={set('linkCompetitor3')} error={errors.linkCompetitor3} />
          <Field label="Example site 1" id="lE1" type="url" placeholder="https://" value={form.linkExample1} onChange={set('linkExample1')} error={errors.linkExample1} />
          <Field label="Example site 2" id="lE2" type="url" placeholder="https://" value={form.linkExample2} onChange={set('linkExample2')} error={errors.linkExample2} />
          <Field label="Example site 3" id="lE3" type="url" placeholder="https://" value={form.linkExample3} onChange={set('linkExample3')} error={errors.linkExample3} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <span style={sectionLabel}>Budget and timeline</span>
        <div className="rq-grid-2">
          <SelectField label="Budget range" id="budget" options={BUDGET_OPTIONS} value={form.budget} onChange={set('budget')} required error={errors.budget} />
          <SelectField label="How urgent is this?" id="urgency" options={URGENCY_OPTIONS} value={form.urgency} onChange={set('urgency')} required error={errors.urgency} />
        </div>
        <Field label="Preferred start date" id="startDate" type="date" value={form.startDate} onChange={set('startDate')} helper="Optional — leave blank if flexible." />
      </div>
    </div>
  )
}

// ── Step 6 — Project Details ──────────────────────────────────────────────────

function Step6({ form, set, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <span style={sectionLabel}>Tell us about your project</span>
      <TextareaField
        label="Tell us about your project" id="projectDetails" rows={6}
        placeholder="Tell us what you are trying to build or achieve. What does success look like for you?"
        value={form.projectDetails} onChange={set('projectDetails')}
        helper="The more detail you share, the better we can tailor our recommendation."
        required error={errors.projectDetails}
      />
      <TextareaField
        label="Tell us about your business" id="businessDetails" rows={4}
        placeholder="What do you do, who are your customers, where do you operate?"
        value={form.businessDetails} onChange={set('businessDetails')}
      />
      <TextareaField
        label="Must-have features" id="mustHaveFeatures" rows={3}
        placeholder="List anything that must be included — booking forms, payment, specific pages, integrations…"
        value={form.mustHaveFeatures} onChange={set('mustHaveFeatures')}
      />
      <TextareaField
        label="Anything else we should know?" id="anythingElse" rows={3}
        placeholder="Timelines, constraints, previous bad experiences, budget notes, anything at all…"
        value={form.anythingElse} onChange={set('anythingElse')}
      />
    </div>
  )
}

// ── Step 7 — Files & Review ───────────────────────────────────────────────────

function SummaryRow({ label, value }) {
  if (!value || (Array.isArray(value) && !value.length)) return null
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-default)' }}>
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', minWidth: 140, flexShrink: 0, paddingTop: 2 }}>{label}</span>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.5 }}>
        {Array.isArray(value) ? value.join(', ') : value}
      </span>
    </div>
  )
}

function Step7({ form, set, setFiles, errors }) {
  const shortText = (s, max = 120) => s && s.length > max ? s.slice(0, max) + '…' : s

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

      {/* File upload */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <span style={sectionLabel}>Upload files, photos or inspiration</span>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
          Upload logos, photos, screenshots, brochures, or inspiration. Optional.
        </p>
        <FileUpload files={form.files} onChange={setFiles} />
      </div>

      {/* Review summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <span style={sectionLabel}>Review your request</span>
        <div style={{
          background: 'var(--surface-overlay)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5) var(--space-6)',
        }}>
          <SummaryRow label="Name" value={form.fullName} />
          <SummaryRow label="Business" value={form.businessName} />
          <SummaryRow label="Email" value={form.email} />
          <SummaryRow label="Phone" value={form.phone} />
          <SummaryRow label="Business type" value={form.businessType} />
          <SummaryRow label="Contact via" value={form.preferredContact} />
          <SummaryRow label="Has website" value={form.hasWebsite} />
          <SummaryRow label="Current URL" value={form.currentWebsiteUrl} />
          <SummaryRow label="Looking for" value={form.lookingFor} />
          <SummaryRow label="Website type" value={form.websiteType} />
          <SummaryRow label="Help needed" value={form.helpNeeded} />
          <SummaryRow label="Has domain" value={form.hasDomain} />
          <SummaryRow label="Needs hosting" value={form.needsHosting} />
          <SummaryRow label="Has logo" value={form.hasLogo} />
          <SummaryRow label="Has brand colours" value={form.hasBrandColours} />
          <SummaryRow label="Has photos" value={form.hasPhotos} />
          <SummaryRow label="Sells products" value={form.sellsProducts} />
          <SummaryRow label="Takes bookings" value={form.takesBookings} />
          <SummaryRow label="Needs automation" value={form.needsAutomation} />
          <SummaryRow label="Budget" value={form.budget} />
          <SummaryRow label="Urgency" value={form.urgency} />
          <SummaryRow label="Start date" value={form.startDate} />
          <SummaryRow label="Project details" value={shortText(form.projectDetails)} />
          <SummaryRow label="Must-have features" value={shortText(form.mustHaveFeatures)} />
          {form.files.length > 0 && (
            <SummaryRow label="Files attached" value={`${form.files.length} file${form.files.length > 1 ? 's' : ''}`} />
          )}
        </div>
      </div>

      {/* Consent */}
      <label
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
          padding: 'var(--space-4)',
          background: form.consent ? 'rgba(118,39,239,0.06)' : 'var(--surface-subtle)',
          border: errors.consent ? '1px solid var(--color-danger)' : form.consent ? '1px solid var(--goai-violet)' : '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          transition: 'all 120ms ease',
        }}
      >
        <div
          onClick={() => set('consent')({ target: { value: !form.consent } })}
          style={{
            width: 20, height: 20, borderRadius: 'var(--radius-sm)', flexShrink: 0, marginTop: 2,
            background: form.consent ? 'linear-gradient(90deg,#293BFF 0%,#7627EF 100%)' : 'transparent',
            border: form.consent ? 'none' : '1px solid var(--border-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 120ms ease',
          }}
        >
          {form.consent && <Check size={12} color="#fff" strokeWidth={3} />}
        </div>
        <span
          style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5, userSelect: 'none' }}
          onClick={() => set('consent')({ target: { value: !form.consent } })}
        >
          I agree for GoAI to contact me about my quote request.
          <span style={{ color: 'var(--goai-violet)', marginLeft: 4 }}>*</span>
        </span>
      </label>
      {errors.consent && <span style={{ ...errorStyle, marginTop: -'var(--space-4)' }}>{errors.consent}</span>}
    </div>
  )
}

// ── Confirmation ──────────────────────────────────────────────────────────────

function Confirmation({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--space-6)', padding: 'var(--space-12) var(--space-8)',
      }}
    >
      <div style={{
        width: 64, height: 64,
        background: 'rgba(22,163,74,0.1)',
        border: '1px solid rgba(22,163,74,0.25)',
        borderRadius: 'var(--radius-full)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-success)',
      }}>
        <Check size={28} strokeWidth={2.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '48ch' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.15, margin: 0 }}>
          Thanks — your quote request has been submitted.
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          We'll review your details and come back with a tailored recommendation.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
        <Link
          to="/"
          style={{
            height: 44, padding: '0 var(--space-6)',
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)', fontWeight: 600,
            background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF',
            border: 'none', borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 30px rgba(118,39,239,0.35)',
            transition: 'filter 120ms ease, box-shadow 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118,39,239,0.5)' }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118,39,239,0.35)' }}
        >
          Return to Homepage
        </Link>
        <Link
          to="/journey"
          style={{
            height: 44, padding: '0 var(--space-6)',
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)', fontWeight: 500,
            background: 'transparent', color: 'var(--text-primary)',
            border: '1px solid var(--goai-violet)', borderRadius: 'var(--radius-md)',
            transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(90deg,#293BFF 0%,#7627EF 100%)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'transparent' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--goai-violet)' }}
        >
          Start Your Journey <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RequestQuote() {
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const journeySummary = location.state?.journeySummary || null
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => {
    const val = typeof e?.target?.value !== 'undefined' ? e.target.value : e
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
  }

  const setArr = (key) => (val) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
  }

  const setFiles = (updater) => {
    setForm((prev) => ({ ...prev, files: typeof updater === 'function' ? updater(prev.files) : updater }))
  }

  const advance = () => {
    const errs = validate(step, form)
    if (Object.keys(errs).length) { setErrors(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    setErrors({})
    if (step < STEP_LABELS.length - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // TODO: Connect to a backend/webhook to submit form data and files.
      console.log('Quote request submitted:', form)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const back = () => {
    if (step > 0) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const stepProps = { form, set, setArr, errors }

  const isFinalStep = step === STEP_LABELS.length - 1

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Request a Quote"
        title="Request a Quote"
        description="Tell us about your project and we'll come back with a tailored recommendation."
      />

      <section className="rq-section" style={{ padding: 'var(--space-16) var(--space-8) var(--space-24)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {submitted ? (
            <div style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <Confirmation reduceMotion={reduceMotion} />
            </div>
          ) : (
            <motion.div
              className="rq-form-card"
              initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-10)',
              }}
            >
              {journeySummary && (
                <div style={{
                  background: 'rgba(118,39,239,0.06)',
                  border: '1px solid rgba(118,39,239,0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4) var(--space-5)',
                  marginBottom: 'var(--space-8)',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                }}>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--goai-violet)', margin: 0 }}>
                    Your journey selections
                  </p>
                  {journeySummary.website && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}><strong style={{ color: 'var(--text-primary)' }}>Website:</strong> {journeySummary.website}</p>}
                  {journeySummary.package && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}><strong style={{ color: 'var(--text-primary)' }}>Package:</strong> {journeySummary.package}</p>}
                  {journeySummary.bundle && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}><strong style={{ color: 'var(--text-primary)' }}>Bundle:</strong> {journeySummary.bundle}</p>}
                  {journeySummary.addons && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}><strong style={{ color: 'var(--text-primary)' }}>Add-ons:</strong> {journeySummary.addons}</p>}
                </div>
              )}

              <ProgressBar current={step} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduceMotion ? {} : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 'var(--space-6)', margin: '0 0 var(--space-6)' }}>
                    {STEP_LABELS[step]}
                  </h2>

                  {step === 0 && <Step1 {...stepProps} />}
                  {step === 1 && <Step2 {...stepProps} />}
                  {step === 2 && <Step3 {...stepProps} />}
                  {step === 3 && <Step4 {...stepProps} />}
                  {step === 4 && <Step5 {...stepProps} />}
                  {step === 5 && <Step6 {...stepProps} />}
                  {step === 6 && <Step7 form={form} set={set} setFiles={setFiles} errors={errors} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)',
                borderTop: '1px solid var(--border-default)',
              }}>
                <button
                  type="button" onClick={back} disabled={step === 0}
                  style={{
                    height: 40, padding: '0 var(--space-5)',
                    fontSize: 'var(--text-sm)', fontWeight: 500,
                    background: 'transparent',
                    color: step === 0 ? 'var(--text-disabled)' : 'var(--text-secondary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    cursor: step === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 120ms ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { if (step > 0) e.currentTarget.style.background = 'var(--surface-subtle)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  Back
                </button>

                <button
                  type="button" onClick={advance}
                  style={{
                    height: 44, padding: '0 var(--space-8)',
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                    color: '#FFFFFF', border: 'none',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 0 24px rgba(118,39,239,0.35)',
                    cursor: 'pointer',
                    transition: 'filter 120ms ease, box-shadow 120ms ease, transform 60ms ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(118,39,239,0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(118,39,239,0.35)' }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {isFinalStep
                    ? <><Send size={14} /><span>Request My Quote</span></>
                    : <><span>Continue</span><ChevronRight size={15} /></>}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <style>{`
        .rq-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }
        .rq-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-5); }
        .rq-checkbox-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .rq-progress-mobile { display: none; }
        @media (max-width: 640px) {
          .rq-grid-2, .rq-grid-3, .rq-checkbox-grid { grid-template-columns: 1fr !important; }
          .rq-progress-desktop { display: none !important; }
          .rq-progress-mobile { display: block !important; }
          .rq-form-card { padding: var(--space-5) !important; border-radius: var(--radius-lg) !important; }
          .rq-section { padding-left: var(--space-4) !important; padding-right: var(--space-4) !important; padding-bottom: var(--space-20) !important; }
        }
      `}</style>
    </main>
  )
}
