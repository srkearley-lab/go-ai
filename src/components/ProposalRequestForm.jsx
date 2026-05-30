import { useState } from 'react'
import { Send } from 'lucide-react'

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
}

const labelStyle = {
  fontSize: 'var(--text-sm)',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  marginBottom: 'var(--space-2)',
  display: 'block',
}

function Field({ label, id, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          ...inputStyle,
          borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function SelectField({ label, id, options, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          ...inputStyle,
          borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
          appearance: 'none',
          cursor: 'pointer',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="" disabled>Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function TextareaField({ label, id, placeholder, value, onChange, rows = 4, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        style={{
          ...inputStyle,
          borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)',
          boxShadow: focused ? 'var(--shadow-focus)' : 'none',
          resize: 'vertical',
          minHeight: rows * 24,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default function ProposalRequestForm({ onSubmit }) {
  const [form, setForm] = useState({
    businessName: '',
    businessType: '',
    location: '',
    currentWebsite: '',
    email: '',
    whatsapp: '',
    needs: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        style={{
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-default)',
          borderLeft: '3px solid var(--color-brand-500)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}
      >
        <div
          style={{
            width: 48, height: 48,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 'var(--radius-full)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-brand-400)',
          }}
        >
          <Send size={20} />
        </div>
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>
          Request received
        </h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: '40ch' }}>
          We'll review your details and send your free digital improvement plan via WhatsApp within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Business name" id="businessName" placeholder="Santorini Villas" value={form.businessName} onChange={set('businessName')} required />
        <SelectField
          label="Business type" id="businessType"
          options={['Villa / Holiday Rental', 'Restaurant / Café', 'Gym / Fitness', 'Hair & Beauty Salon', 'Tourism Company', 'Car / Boat Hire', 'Other']}
          value={form.businessType} onChange={set('businessType')} required
        />
        <Field label="Location" id="location" placeholder="Santorini, Greece" value={form.location} onChange={set('location')} required />
        <Field label="Current website" id="currentWebsite" placeholder="www.example.gr (or none)" value={form.currentWebsite} onChange={set('currentWebsite')} />
        <Field label="Email address" id="email" type="email" placeholder="you@example.gr" value={form.email} onChange={set('email')} required />
        <Field label="WhatsApp number" id="whatsapp" type="tel" placeholder="+30 6900 000000" value={form.whatsapp} onChange={set('whatsapp')} required />
      </div>

      <TextareaField
        label="What do you need help with?"
        id="needs"
        placeholder="Tell us about your business goals, what you'd like to improve, or any specific requests..."
        value={form.needs}
        onChange={set('needs')}
        rows={4}
        required
      />

      <button
        type="submit"
        style={{
          height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
          fontSize: 'var(--text-sm)', fontWeight: 500,
          background: 'var(--color-brand-500)',
          color: 'var(--color-neutral-0)',
          border: '1px solid var(--color-brand-600)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          padding: '0 var(--space-6)',
          transition: 'background 120ms ease, transform 60ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(1px)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <Send size={15} />
        Send my request
      </button>
    </form>
  )
}
