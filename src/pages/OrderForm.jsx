import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Send, CheckCircle, ShoppingBag } from 'lucide-react'
import { useBasket } from '../context/BasketContext'
import { useSEO } from '../lib/seo'

// ── Field components ──────────────────────────────────────────────────────────

const inputStyle = {
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

function Field({ label, id, type = 'text', placeholder, value, onChange, required, hint, autoComplete }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--color-brand-400)', marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={onChange} required={required} autoComplete={autoComplete}
        style={{ ...inputStyle, borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none' }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
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
        style={{ ...inputStyle, borderColor: focused ? 'var(--border-focus)' : 'var(--border-default)', boxShadow: focused ? 'var(--shadow-focus)' : 'none', resize: 'vertical', minHeight: rows * 28 }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
    </div>
  )
}

function SelectField({ label, id, options, value, onChange, required, hint }) {
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
      {hint && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>{hint}</p>}
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
            <label
              key={opt}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                background: checked ? 'rgba(99,102,241,0.1)' : 'var(--surface-subtle)',
                border: `1px solid ${checked ? 'rgba(99,102,241,0.3)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                fontSize: 'var(--text-sm)',
                color: checked ? 'var(--color-brand-400)' : 'var(--text-secondary)',
                transition: 'all 120ms ease', userSelect: 'none',
              }}
            >
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

function YesNoToggle({ label, value, onChange, hint }) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {[true, false].map(opt => {
          const active = value === opt
          return (
            <button
              key={String(opt)}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                height: 36, padding: '0 var(--space-5)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: active ? (opt ? 'rgba(22,163,74,0.12)' : 'rgba(220,38,38,0.1)') : 'var(--surface-subtle)',
                color: active ? (opt ? 'var(--color-success)' : 'var(--color-danger)') : 'var(--text-secondary)',
                border: `1px solid ${active ? (opt ? 'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.25)') : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                transition: 'all 120ms ease', fontFamily: 'inherit',
              }}
            >
              {opt ? 'Yes' : 'No'}
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

// ── Progress indicator ────────────────────────────────────────────────────────

function ProgressBar({ steps, currentIndex }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: 'var(--space-1)' }}>
      {steps.map((step, i) => (
        <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? '1 0 auto' : 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i < currentIndex ? 'var(--color-success)' : i === currentIndex ? 'var(--color-brand-500)' : 'var(--surface-overlay)',
              border: `1px solid ${i < currentIndex ? 'var(--color-success)' : i === currentIndex ? 'var(--color-brand-600)' : 'var(--border-default)'}`,
              fontSize: 'var(--text-xs)', fontWeight: 700,
              color: i <= currentIndex ? 'var(--color-neutral-0)' : 'var(--text-disabled)',
              transition: 'all 200ms ease',
            }}>
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

// ── Step: Contact Details ─────────────────────────────────────────────────────

function ContactStep({ data, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title="Your details" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="First name" id="firstName" placeholder="e.g. Maria" value={data.firstName} onChange={set('firstName')} required autoComplete="given-name" />
        <Field label="Last name" id="lastName" placeholder="e.g. Papadopoulos" value={data.lastName} onChange={set('lastName')} autoComplete="family-name" />
        <Field label="Business name" id="businessName" placeholder="e.g. Santorini Dream Villas" value={data.businessName} onChange={set('businessName')} required autoComplete="organization" />
        <Field label="Email address" id="email" type="email" placeholder="your@email.com" value={data.email} onChange={set('email')} required autoComplete="email" />
        <Field label="Phone number" id="phone" type="tel" placeholder="+30 69..." value={data.phone} onChange={set('phone')} autoComplete="tel" hint="Include country code for fastest response" />
        <SelectField label="Country" id="country" options={['Greece', 'Cyprus', 'UK', 'Germany', 'France', 'Australia', 'USA', 'Other']} value={data.country} onChange={set('country')} required />
      </div>
      <Field label="Existing website URL" id="existingWebsite" placeholder="www.example.gr (leave blank if none)" value={data.existingWebsite} onChange={set('existingWebsite')} hint="Leave blank if you don't have one yet" />
    </div>
  )
}

// ── Step: Website Details ─────────────────────────────────────────────────────

const PAGE_OPTIONS = ['Home', 'About', 'Services', 'Contact', 'Blog', 'Portfolio', 'Pricing', 'FAQs', 'Testimonials', 'Gallery', 'Booking / Reservations', 'Team', 'Shop / Products']

function WebsiteStep({ data, set, setMulti }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title="Website details" />

      <YesNoToggle
        label="Do you already have a website?"
        value={data.hasWebsite}
        onChange={(v) => set('hasWebsite')({ target: { value: v } })}
        hint="This helps us understand what to build or improve"
      />

      <AnimatePresence mode="wait">
        {data.hasWebsite === true && (
          <motion.div key="yes" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', paddingTop: 'var(--space-2)' }}>
              <Field label="Current website URL" id="existingUrl" placeholder="www.your-current-site.com" value={data.existingUrl} onChange={set('existingUrl')} />
              <TextareaField label="What would you like to improve?" id="improvements" placeholder="e.g. outdated design, not mobile-friendly, needs better SEO, slow loading..." value={data.improvements} onChange={set('improvements')} rows={3} />
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

      <Divider title="Business information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectField label="Business type" id="businessType" options={['Villa / Holiday Rental', 'Restaurant / Café', 'Gym / Fitness', 'Hair & Beauty', 'Tourism Company', 'Car / Boat Hire', 'Retail / E-commerce', 'Professional Services', 'Consultancy', 'Healthcare', 'Other']} value={data.businessType} onChange={set('businessType')} required />
        <Field label="Main services or products" id="businessServices" placeholder="e.g. luxury villa rentals, private tours, personal training" value={data.businessServices} onChange={set('businessServices')} required />
      </div>
      <TextareaField label="Target audience" id="targetAudience" placeholder="Who are your ideal customers? e.g. European tourists visiting Santorini, local families, corporate clients..." value={data.targetAudience} onChange={set('targetAudience')} rows={3} required />

      <Divider title="Pages and content" />
      <CheckboxGroup label="Pages required" options={PAGE_OPTIONS} selected={data.pagesNeeded} onChange={(p) => setMulti('pagesNeeded', p)} hint="Select all you need — we'll confirm the scope" />
      <Field label="Any other pages not listed above?" id="otherPages" placeholder="e.g. Events, Careers, Partner login" value={data.otherPages} onChange={set('otherPages')} />

      <Divider title="Branding assets" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <YesNoToggle label="Do you have a logo?" value={data.hasLogo} onChange={(v) => set('hasLogo')({ target: { value: v } })} />
        <YesNoToggle label="Do you have brand colours?" value={data.hasBrandColors} onChange={(v) => set('hasBrandColors')({ target: { value: v } })} />
        <YesNoToggle label="Do you have photos/images?" value={data.hasImages} onChange={(v) => set('hasImages')({ target: { value: v } })} hint="We can source stock images if not" />
      </div>
      {data.hasBrandColors === false && (
        <Field label="Colours or style you like" id="colourNotes" placeholder="e.g. deep blue and gold, minimal black and white, bright and energetic" value={data.colourNotes} onChange={set('colourNotes')} />
      )}

      <Divider title="References and timing" />
      <Field label="Example websites you like" id="exampleWebsites" placeholder="www.site1.com, www.site2.com" value={data.exampleWebsites} onChange={set('exampleWebsites')} hint="Share any sites whose design or structure you admire" />
      <Field label="Preferred launch date" id="launchDate" type="date" value={data.launchDate} onChange={set('launchDate')} hint="Gives us a target — we'll confirm if achievable" />
      <TextareaField label="Additional notes" id="notes" placeholder="Anything else about your website — specific features, integrations, special requirements..." value={data.notes} onChange={set('notes')} rows={3} />
    </div>
  )
}

// ── Step: Social Media ────────────────────────────────────────────────────────

function SocialStep({ data, set, setMulti }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title="Social media setup" />
      <CheckboxGroup
        label="Which platforms do you need content for?"
        options={['Instagram', 'Facebook', 'LinkedIn', 'TikTok']}
        selected={data.platforms}
        onChange={(p) => setMulti('platforms', p)}
        hint="We'll create platform-specific content for each"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectField label="Posting frequency" id="postingFrequency" options={['3 posts per week', '2 posts per week', '1 post per week', 'Daily', 'Flexible — advise me']} value={data.postingFrequency} onChange={set('postingFrequency')} />
        <SelectField label="Tone of voice" id="toneOfVoice" options={['Professional and formal', 'Friendly and approachable', 'Energetic and bold', 'Calm and premium', 'Fun and playful', 'Not sure — advise me']} value={data.toneOfVoice} onChange={set('toneOfVoice')} hint="How should your brand sound?" />
      </div>
      <TextareaField label="Content themes and topics" id="contentThemes" placeholder="e.g. property highlights, local tips, behind the scenes, seasonal offers, customer stories..." value={data.contentThemes} onChange={set('contentThemes')} rows={3} hint="Tell us what kind of content fits your brand" />

      <Divider title="Current profiles" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.platforms.includes('Instagram') && <Field label="Instagram profile URL" id="instagramUrl" placeholder="instagram.com/yourhandle" value={data.instagramUrl} onChange={set('instagramUrl')} />}
        {data.platforms.includes('Facebook') && <Field label="Facebook page URL" id="facebookUrl" placeholder="facebook.com/yourpage" value={data.facebookUrl} onChange={set('facebookUrl')} />}
        {data.platforms.includes('LinkedIn') && <Field label="LinkedIn profile or page URL" id="linkedinUrl" placeholder="linkedin.com/company/yourpage" value={data.linkedinUrl} onChange={set('linkedinUrl')} />}
        {data.platforms.includes('TikTok') && <Field label="TikTok profile URL" id="tiktokUrl" placeholder="tiktok.com/@yourhandle" value={data.tiktokUrl} onChange={set('tiktokUrl')} />}
      </div>

      <Divider title="Content creation" />
      <YesNoToggle
        label="Do you need us to create images and graphics?"
        value={data.needsImageCreation}
        onChange={(v) => set('needsImageCreation')({ target: { value: v } })}
        hint="We can design social graphics if you don't have a visual team"
      />
    </div>
  )
}

// ── Step: Automation ──────────────────────────────────────────────────────────

function AutomationStep({ data, set, setMulti }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Divider title="Automation requirements" />
      <TextareaField
        label="What process would you like to automate?"
        id="processToAutomate"
        placeholder="e.g. when someone enquires via WhatsApp, automatically send a pricing PDF and booking form, then follow up after 48 hours..."
        value={data.processToAutomate}
        onChange={set('processToAutomate')}
        rows={4}
        required
        hint="Describe the manual task you want to remove from your day"
      />
      <CheckboxGroup
        label="Tools you currently use"
        options={['WhatsApp Business', 'Gmail / Google Workspace', 'Mailchimp', 'Brevo (Sendinblue)', 'HubSpot', 'Notion', 'Airtable', 'Google Sheets', 'Calendly', 'Stripe', 'Other']}
        selected={data.toolsUsed}
        onChange={(t) => setMulti('toolsUsed', t)}
        hint="Select all that apply — we'll integrate where possible"
      />
      <TextareaField
        label="What should happen automatically?"
        id="whatShouldHappen"
        placeholder="e.g. send a confirmation message, add the lead to a spreadsheet, notify me on WhatsApp, send a follow-up email after 2 days..."
        value={data.whatShouldHappen}
        onChange={set('whatShouldHappen')}
        rows={4}
        hint="Be as specific as you like — this is the core of your automation"
      />

      <Divider title="Approval and notifications" />
      <YesNoToggle
        label="Do you need to approve anything before it's sent to a customer?"
        value={data.needsApproval}
        onChange={(v) => set('needsApproval')({ target: { value: v } })}
        hint="e.g. review a proposal before it goes out, approve a booking before confirming"
      />
      <Field
        label="Who should receive system notifications?"
        id="notificationRecipients"
        placeholder="e.g. owner@business.com, WhatsApp +30 69..."
        value={data.notificationRecipients}
        onChange={set('notificationRecipients')}
        hint="Name and contact for each person who needs to be notified by the automation"
      />
    </div>
  )
}

// ── Step: Review ──────────────────────────────────────────────────────────────

function ReviewStep({ form, items, notes, setNotes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <Divider title="Review your order" />

      {/* Selected packages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <p style={{ ...labelStyle, margin: 0 }}>Selected packages ({items.length})</p>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</span>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-brand-400)' }}>{item.priceDisplay}</span>
          </div>
        ))}
      </div>

      {/* Contact summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <p style={{ ...labelStyle, margin: 0 }}>Your details</p>
        <div style={{ padding: 'var(--space-4)', background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {[
            { label: 'Name', value: `${form.contact.firstName} ${form.contact.lastName}`.trim() },
            { label: 'Business', value: form.contact.businessName },
            { label: 'Email', value: form.contact.email },
            { label: 'Phone', value: form.contact.phone || '—' },
            { label: 'Country', value: form.contact.country },
            { label: 'Existing website', value: form.contact.existingWebsite || 'None' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--text-tertiary)', flexShrink: 0, minWidth: 120 }}>{label}</span>
              <span style={{ color: 'var(--text-primary)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <TextareaField
        label="Final notes or questions"
        id="finalNotes"
        placeholder="Anything else you'd like us to know before we start — deadlines, budget constraints, special requirements..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
      />

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
        By submitting this form you agree to be contacted by the GO AI team regarding your selected packages. No payment is collected at this stage.
      </p>
    </div>
  )
}

// ── Confirmation ──────────────────────────────────────────────────────────────

function Confirmation({ reduceMotion }) {
  return (
    <main style={{ paddingTop: 64, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 520, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-8)' }}
      >
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
          <CheckCircle size={32} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Order received — thank you!
          </h1>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
            We've received your package selections and all your details. The GO AI team will be in touch within 24 hours to confirm your order and outline next steps.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', maxWidth: 360 }}>
          {[
            'We review your selections and brief',
            'You receive a confirmation and project outline',
            'Work begins within 1–2 business days',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0 }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>{i + 1}</span>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Link to="/" style={{ height: 40, padding: '0 var(--space-5)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}>Back to homepage</Link>
          <Link to="/book" style={{ height: 40, padding: '0 var(--space-5)', display: 'inline-flex', alignItems: 'center', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>Schedule a call too</Link>
        </div>
      </motion.div>
    </main>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function OrderForm() {
  const reduceMotion = useReducedMotion()
  const { items, neededFormTypes, clearBasket } = useBasket()
  const [submitted, setSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [finalNotes, setFinalNotes] = useState('')

  useSEO({ title: 'Start Your Order — GO AI', description: 'Complete your GO AI order form. Tell us about your business and what you need — we handle the rest.' })

  const [form, setForm] = useState({
    contact: { firstName: '', lastName: '', businessName: '', email: '', phone: '', country: '', existingWebsite: '' },
    website: { hasWebsite: null, existingUrl: '', improvements: '', needsDomain: '', websiteType: '', businessType: '', businessServices: '', targetAudience: '', pagesNeeded: [], otherPages: '', hasLogo: null, hasBrandColors: null, hasImages: null, colourNotes: '', exampleWebsites: '', launchDate: '', notes: '' },
    social: { platforms: [], postingFrequency: '', toneOfVoice: '', contentThemes: '', instagramUrl: '', facebookUrl: '', linkedinUrl: '', tiktokUrl: '', needsImageCreation: null },
    automation: { processToAutomate: '', toolsUsed: [], whatShouldHappen: '', needsApproval: null, notificationRecipients: '' },
  })

  const steps = useMemo(() => {
    const s = [{ id: 'contact', label: 'Your Details' }]
    if (neededFormTypes.includes('website')) s.push({ id: 'website', label: 'Website' })
    if (neededFormTypes.includes('social')) s.push({ id: 'social', label: 'Social Media' })
    if (neededFormTypes.includes('automation')) s.push({ id: 'automation', label: 'Automation' })
    s.push({ id: 'review', label: 'Review & Send' })
    return s
  }, [neededFormTypes])

  const currentStep = steps[currentIndex]

  const setField = (section) => (key) => (e) => setForm(prev => ({ ...prev, [section]: { ...prev[section], [key]: e.target.value } }))
  const setMulti = (section) => (key, value) => setForm(prev => {
    const arr = prev[section][key]
    return { ...prev, [section]: { ...prev[section], [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] } }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const submission = {
      submittedAt: new Date().toISOString(),
      customer: {
        name: `${form.contact.firstName} ${form.contact.lastName}`.trim(),
        business: form.contact.businessName,
        email: form.contact.email,
        phone: form.contact.phone,
        country: form.contact.country,
        existingWebsite: form.contact.existingWebsite,
      },
      selectedPackages: items.map(i => ({ name: i.name, price: i.priceDisplay })),
      packageAnswers: {
        ...(neededFormTypes.includes('website') ? { website: form.website } : {}),
        ...(neededFormTypes.includes('social') ? { social: form.social } : {}),
        ...(neededFormTypes.includes('automation') ? { automation: form.automation } : {}),
      },
      notes: finalNotes,
    }
    console.log('GO AI Order Submission:', JSON.stringify(submission, null, 2))
    clearBasket()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) return <Confirmation reduceMotion={reduceMotion} />

  // Empty basket guard
  if (items.length === 0) {
    return (
      <main style={{ paddingTop: 64, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <div style={{ maxWidth: 480, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: 'var(--surface-overlay)', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Your basket is empty</h1>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>Add packages from the pricing page to get started with your order.</p>
          </div>
          <Link to="/pricing" style={{ height: 44, padding: '0 var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 500, background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)', border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'background 120ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}>
            Browse Packages <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 64, background: 'var(--surface-base)' }}>
      {/* Header */}
      <div style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-default)', padding: 'var(--space-8) var(--space-8) var(--space-6)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-brand-400)', marginBottom: 'var(--space-2)' }}>Order form</p>
            <h1 style={{ fontSize: 'clamp(var(--text-lg), 3vw, var(--text-xl))', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
              Tell us about your project
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
              {items.length} package{items.length !== 1 ? 's' : ''} selected · No payment taken here
            </p>
          </div>
          <ProgressBar steps={steps} currentIndex={currentIndex} />
        </div>
      </div>

      {/* Form */}
      <section style={{ padding: 'var(--space-10) var(--space-8) var(--space-20)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <form onSubmit={currentStep.id === 'review' ? handleSubmit : (e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={reduceMotion ? {} : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, x: -12 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentStep.id === 'contact' && <ContactStep data={form.contact} set={setField('contact')} />}
                {currentStep.id === 'website' && <WebsiteStep data={form.website} set={setField('website')} setMulti={setMulti('website')} />}
                {currentStep.id === 'social' && <SocialStep data={form.social} set={setField('social')} setMulti={setMulti('social')} />}
                {currentStep.id === 'automation' && <AutomationStep data={form.automation} set={setField('automation')} setMulti={setMulti('automation')} />}
                {currentStep.id === 'review' && <ReviewStep form={form} items={items} notes={finalNotes} setNotes={setFinalNotes} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-default)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <button
                type="button"
                onClick={() => setCurrentIndex(i => i - 1)}
                disabled={currentIndex === 0}
                style={{
                  height: 44, padding: '0 var(--space-6)',
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                  fontSize: 'var(--text-sm)', fontWeight: 500,
                  background: 'transparent', color: currentIndex === 0 ? 'var(--text-disabled)' : 'var(--text-primary)',
                  border: `1px solid ${currentIndex === 0 ? 'var(--border-default)' : 'var(--border-strong)'}`,
                  borderRadius: 'var(--radius-md)', cursor: currentIndex === 0 ? 'default' : 'pointer',
                  fontFamily: 'inherit', transition: 'background 120ms ease',
                }}
                onMouseEnter={(e) => { if (currentIndex > 0) e.currentTarget.style.background = 'var(--surface-raised)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <ArrowLeft size={14} /> Back
              </button>

              {currentStep.id !== 'review' ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(i => i + 1)}
                  style={{
                    height: 44, padding: '0 var(--space-6)',
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)', fontWeight: 500,
                    background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
                    border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'background 120ms ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    height: 44, padding: '0 var(--space-6)',
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
                    border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'background 120ms ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
                >
                  <Send size={14} /> Submit Order
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
