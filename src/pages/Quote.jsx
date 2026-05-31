import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Send, Check, ChevronRight, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'

// ── Shared input styles ───────────────────────────────────────────────────────

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
}

const errorBase = {
  fontSize: 'var(--text-xs)',
  color: 'var(--color-danger)',
  marginTop: 'var(--space-1)',
}

// ── Field components ──────────────────────────────────────────────────────────

function Field({ label, id, type = 'text', placeholder, value, onChange, required, helper, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelBase}>
        {label}
        {required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        style={{
          ...inputBase,
          borderColor: error ? 'var(--color-danger)' : focused ? 'var(--border-focus)' : 'var(--border-default)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {helper && !error && <p style={helperBase}>{helper}</p>}
      {error && <p style={errorBase}>{error}</p>}
    </div>
  )
}

function SelectField({ label, id, options, value, onChange, required, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelBase}>
        {label}
        {required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <select
        id={id} value={value} onChange={onChange} required={required}
        style={{
          ...inputBase,
          borderColor: error ? 'var(--color-danger)' : focused ? 'var(--border-focus)' : 'var(--border-default)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
          appearance: 'none', cursor: 'pointer',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p style={errorBase}>{error}</p>}
    </div>
  )
}

function TextareaField({ label, id, placeholder, value, onChange, rows = 5, required, helper, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelBase}>
        {label}
        {required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <textarea
        id={id} placeholder={placeholder} value={value} onChange={onChange}
        rows={rows} required={required}
        style={{
          ...inputBase,
          borderColor: error ? 'var(--color-danger)' : focused ? 'var(--border-focus)' : 'var(--border-default)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
          resize: 'vertical', minHeight: rows * 26,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {helper && !error && <p style={helperBase}>{helper}</p>}
      {error && <p style={errorBase}>{error}</p>}
    </div>
  )
}

function ToggleGroup({ label, options, value, onChange, required, error }) {
  return (
    <div>
      <p style={labelBase}>
        {label}
        {required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt} type="button"
              onClick={() => onChange(opt)}
              style={{
                padding: '7px var(--space-4)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: selected ? 'var(--color-brand-500)' : 'var(--surface-subtle)',
                color: selected ? 'var(--color-neutral-0)' : 'var(--text-secondary)',
                border: selected ? '1px solid var(--color-brand-600)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {error && <p style={errorBase}>{error}</p>}
    </div>
  )
}

function CheckboxGroup({ label, options, values, onChange, required, error }) {
  const toggle = (opt) => {
    const next = values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]
    onChange(next)
  }
  return (
    <div>
      <p style={labelBase}>
        {label}
        {required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {options.map((opt) => {
          const checked = values.includes(opt)
          return (
            <label
              key={opt}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-4)',
                background: checked ? 'rgba(99,102,241,0.08)' : 'var(--surface-subtle)',
                border: checked ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 'var(--radius-sm)',
                background: checked ? 'var(--color-brand-500)' : 'transparent',
                border: checked ? '1px solid var(--color-brand-600)' : '1px solid var(--border-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 120ms ease',
              }}>
                {checked && <Check size={11} color="#fff" strokeWidth={3} />}
              </div>
              <input type="checkbox" checked={checked} onChange={() => toggle(opt)} style={{ display: 'none' }} />
              <span style={{ fontSize: 'var(--text-sm)', color: checked ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.4 }}>
                {opt}
              </span>
            </label>
          )
        })}
      </div>
      {error && <p style={errorBase}>{error}</p>}
    </div>
  )
}

// ── Progress indicator ────────────────────────────────────────────────────────

const STEP_LABELS = ['About You', 'Your Needs', 'Goals & Timeline', 'Consent']

function ProgressBar({ current }) {
  return (
    <div style={{ marginBottom: 'var(--space-10)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
        {STEP_LABELS.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <div style={{
                height: 3, borderRadius: 'var(--radius-full)',
                background: done || active ? 'var(--color-brand-500)' : 'var(--border-default)',
                transition: 'background 200ms ease',
              }} />
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: active ? 600 : 400,
                color: active ? 'var(--text-primary)' : done ? 'var(--color-brand-400)' : 'var(--text-tertiary)',
                transition: 'color 200ms ease',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
        Step {current + 1} of {STEP_LABELS.length}
      </p>
    </div>
  )
}

// ── Initial form state ────────────────────────────────────────────────────────

const INIT = {
  // Step 1
  name: '',
  email: '',
  businessName: '',
  businessWebsite: '',
  phone: '',
  preferredContact: '',
  // Step 2
  helpNeeded: [],
  hasWebsite: '',
  currentWebsite: '',
  websiteType: '',
  wantsMonthlySupport: '',
  monthlySupport: [],
  // Step 3
  mainGoal: [],
  details: '',
  budget: '',
  startTimeline: '',
  // Step 4
  consent: false,
}

function validate(step, form) {
  const errs = {}
  if (step === 0) {
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.businessName.trim()) errs.businessName = 'Business name is required.'
    if (form.businessWebsite && !/^https?:\/\/.+\..+/.test(form.businessWebsite) && !/^www\..+\..+/.test(form.businessWebsite)) {
      errs.businessWebsite = 'Enter a valid URL (e.g. https://example.com).'
    }
    if (!form.preferredContact) errs.preferredContact = 'Please select a preferred contact method.'
    if (['Phone', 'WhatsApp'].includes(form.preferredContact) && !form.phone.trim()) {
      errs.phone = 'Phone/WhatsApp number is required for this contact method.'
    }
  }
  if (step === 1) {
    if (!form.helpNeeded.length) errs.helpNeeded = 'Please select at least one option.'
    if (!form.hasWebsite) errs.hasWebsite = 'Please select Yes or No.'
    if (!form.wantsMonthlySupport) errs.wantsMonthlySupport = 'Please select an option.'
  }
  if (step === 2) {
    if (!form.mainGoal.length) errs.mainGoal = 'Please select at least one goal.'
    if (!form.details.trim()) errs.details = 'Please tell us more about what you need.'
    if (!form.startTimeline) errs.startTimeline = 'Please select when you want to start.'
  }
  if (step === 3) {
    if (!form.consent) errs.consent = 'You must agree to be contacted before submitting.'
  }
  return errs
}

// ── Step panels ───────────────────────────────────────────────────────────────

const HELP_OPTIONS = [
  'New website', 'Website redesign', 'Hosting and care',
  'Social media content', 'AI content and marketing', 'AI automation',
  'AI avatar and video content', 'Email automation', 'Not sure yet',
]

const WEBSITE_TYPE_OPTIONS = [
  'One-page starter', 'Small business website', 'Premium business website',
  'E-commerce', 'Landing page', 'Not sure yet',
]

const MONTHLY_SUPPORT_OPTIONS = [
  'Hosting and care', 'Social media content', 'AI content and marketing',
  'AI automation', 'AI avatar/video', 'Email automation', 'Not sure yet',
]

const GOAL_OPTIONS = [
  'Get more enquiries', 'Look more professional', 'Sell products online',
  'Save time with automation', 'Improve social media',
  'Improve content and marketing', 'Replace manual admin', 'Other',
]

function Step1({ form, set, errors }) {
  const showPhone = ['Phone', 'WhatsApp'].includes(form.preferredContact)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div className="q-grid-2">
        <Field label="Name" id="name" value={form.name} onChange={set('name')} required error={errors.name} />
        <Field label="Email address" id="email" type="email" value={form.email} onChange={set('email')} required error={errors.email} />
        <Field label="Business name" id="businessName" value={form.businessName} onChange={set('businessName')} required error={errors.businessName} />
        <Field
          label="Business website" id="businessWebsite" type="url"
          value={form.businessWebsite} onChange={set('businessWebsite')}
          helper="If you have a website, add it here so we can review it."
          error={errors.businessWebsite}
        />
      </div>
      <ToggleGroup
        label="Preferred contact method"
        options={['Email', 'Phone', 'WhatsApp']}
        value={form.preferredContact}
        onChange={(v) => set('preferredContact')({ target: { value: v } })}
        required error={errors.preferredContact}
      />
      <AnimatePresence>
        {showPhone && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <Field
              label="Phone / WhatsApp number" id="phone" type="tel"
              placeholder="+353 87 000 0000"
              value={form.phone} onChange={set('phone')}
              required error={errors.phone}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Step2({ form, set, setArr, errors }) {
  const showWebsiteType = form.helpNeeded.includes('New website') || form.helpNeeded.includes('Website redesign')
  const showMonthlyDetail = form.wantsMonthlySupport === 'Yes' || form.wantsMonthlySupport === 'Not sure'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <CheckboxGroup
        label="What do you need help with?"
        options={HELP_OPTIONS}
        values={form.helpNeeded}
        onChange={setArr('helpNeeded')}
        required error={errors.helpNeeded}
      />

      <ToggleGroup
        label="Do you already have a website?"
        options={['Yes', 'No']}
        value={form.hasWebsite}
        onChange={(v) => set('hasWebsite')({ target: { value: v } })}
        required error={errors.hasWebsite}
      />

      <AnimatePresence>
        {form.hasWebsite === 'Yes' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <Field
              label="What is your current website?" id="currentWebsite"
              placeholder="https://www.yoursite.com"
              value={form.currentWebsite} onChange={set('currentWebsite')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWebsiteType && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ToggleGroup
              label="What type of website do you need?"
              options={WEBSITE_TYPE_OPTIONS}
              value={form.websiteType}
              onChange={(v) => set('websiteType')({ target: { value: v } })}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ToggleGroup
        label="Do you want monthly support after the website is built?"
        options={['Yes', 'No', 'Not sure']}
        value={form.wantsMonthlySupport}
        onChange={(v) => set('wantsMonthlySupport')({ target: { value: v } })}
        required error={errors.wantsMonthlySupport}
      />

      <AnimatePresence>
        {showMonthlyDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <CheckboxGroup
              label="Which monthly support interests you?"
              options={MONTHLY_SUPPORT_OPTIONS}
              values={form.monthlySupport}
              onChange={setArr('monthlySupport')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Step3({ form, set, setArr, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <CheckboxGroup
        label="What is your main goal?"
        options={GOAL_OPTIONS}
        values={form.mainGoal}
        onChange={setArr('mainGoal')}
        required error={errors.mainGoal}
      />

      <TextareaField
        label="Tell us more about what you need"
        id="details" rows={5}
        placeholder="Add as much detail as you can. This helps us recommend the right package or bundle."
        value={form.details} onChange={set('details')}
        helper="Add as much detail as you can. This helps us recommend the right package or bundle."
        required error={errors.details}
      />

      <SelectField
        label="Budget range" id="budget"
        options={['Under €500', '€500–€1,000', '€1,000–€2,500', '€2,500–€5,000', '€5,000+', 'Not sure yet']}
        value={form.budget} onChange={set('budget')}
        error={errors.budget}
      />

      <ToggleGroup
        label="How soon do you want to start?"
        options={['Immediately', 'Within 2 weeks', 'Within 1 month', '1–3 months', 'Just researching']}
        value={form.startTimeline}
        onChange={(v) => set('startTimeline')({ target: { value: v } })}
        required error={errors.startTimeline}
      />
    </div>
  )
}

function Step4({ form, set, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div
        style={{
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
        }}
      >
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Review your request
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {[
            ['Name', form.name],
            ['Email', form.email],
            ['Business', form.businessName],
            ['Contact via', form.preferredContact],
            ['Needs', form.helpNeeded.join(', ') || '—'],
            ['Goals', form.mainGoal.join(', ') || '—'],
            ['Timeline', form.startTimeline || '—'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--text-tertiary)', minWidth: 100, flexShrink: 0 }}>{k}</span>
              <span style={{ color: 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <label
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
          padding: 'var(--space-4)',
          background: form.consent ? 'rgba(99,102,241,0.06)' : 'var(--surface-subtle)',
          border: errors.consent ? '1px solid var(--color-danger)' : form.consent ? '1px solid rgba(99,102,241,0.25)' : '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          transition: 'all 120ms ease',
        }}
      >
        <div
          onClick={() => set('consent')({ target: { value: !form.consent } })}
          style={{
            width: 20, height: 20, borderRadius: 'var(--radius-sm)', flexShrink: 0, marginTop: 2,
            background: form.consent ? 'var(--color-brand-500)' : 'transparent',
            border: form.consent ? '1px solid var(--color-brand-600)' : '1px solid var(--border-strong)',
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
          I agree for GoAI to contact me about my enquiry.
          <span style={{ color: 'var(--color-brand-400)', marginLeft: 4 }}>*</span>
        </span>
      </label>
      {errors.consent && <p style={{ ...errorBase, marginTop: -12 }}>{errors.consent}</p>}
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
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.15 }}>
          Thanks — we've received your quote request.
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          We'll review your details and come back to you with the best option for your business.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
        <Link
          to="/"
          style={{
            height: 44, padding: '0 var(--space-6)',
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)', fontWeight: 600,
            background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
            border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)',
            transition: 'background 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
        >
          Return to Homepage
        </Link>
        <Link
          to="/packages"
          style={{
            height: 44, padding: '0 var(--space-6)',
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            fontSize: 'var(--text-sm)', fontWeight: 500,
            background: 'transparent', color: 'var(--text-primary)',
            border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)',
            transition: 'background 120ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          View Packages <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Quote() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
  }

  const setArr = (key) => (val) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
  }

  const advance = () => {
    const errs = validate(step, form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    if (step < 3) setStep(step + 1)
    else {
      console.log('Quote request:', form)
      setSubmitted(true)
    }
  }

  const back = () => { if (step > 0) setStep(step - 1) }

  const stepProps = { form, set, setArr, errors }

  return (
    <main style={{ paddingTop: 64 }}>
      <PageHero
        tag="Get a quote"
        title="Get a Quote Today"
        description="Tell us what you need and we'll recommend the best package or bundle for your business."
      />

      <section style={{ padding: 'var(--space-16) var(--space-8) var(--space-24)', background: 'var(--surface-base)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
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
              <ProgressBar current={step} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduceMotion ? {} : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 'var(--space-6)' }}>
                    {STEP_LABELS[step]}
                  </h2>

                  {step === 0 && <Step1 {...stepProps} />}
                  {step === 1 && <Step2 {...stepProps} />}
                  {step === 2 && <Step3 {...stepProps} />}
                  {step === 3 && <Step4 {...stepProps} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-default)' }}>
                <button
                  type="button" onClick={back}
                  disabled={step === 0}
                  style={{
                    height: 40, padding: '0 var(--space-5)',
                    fontSize: 'var(--text-sm)', fontWeight: 500,
                    background: 'transparent',
                    color: step === 0 ? 'var(--text-disabled)' : 'var(--text-secondary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    cursor: step === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 120ms ease',
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
                    background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
                    border: '1px solid var(--color-brand-600)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background 120ms ease, transform 60ms ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {step < 3 ? (
                    <><span>Continue</span><ChevronRight size={15} /></>
                  ) : (
                    <><Send size={15} /><span>Send My Quote Request</span></>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <style>{`
        .q-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }
        @media (max-width: 640px) { .q-grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
