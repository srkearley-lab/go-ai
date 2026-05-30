import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

const WHATSAPP = '#'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--surface-raised)',
        borderTop: '1px solid var(--border-default)',
        padding: 'var(--space-16) var(--space-8) var(--space-8)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--width-xl)',
          margin: '0 auto',
        }}
      >
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid var(--border-default)' }}>
          {/* Brand */}
          <div className="md:col-span-1" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span
                style={{
                  width: 28, height: 28,
                  background: 'var(--color-brand-500)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--text-xs)', fontWeight: 700,
                  color: 'var(--color-neutral-0)',
                }}
              >G</span>
              <span style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                GO AI
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '26ch' }}>
              AI-powered websites and automation for businesses in Greece.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                height: 36,
                padding: '0 var(--space-4)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: '#25d366',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                width: 'fit-content',
                transition: 'background 120ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
            >
              <MessageCircle size={15} />
              WhatsApp us
            </a>
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
              Pages
            </p>
            {[
              ['/', 'Home'],
              ['/services', 'Services'],
              ['/industries', 'Industries'],
              ['/portfolio', 'Portfolio'],
              ['/automation', 'Automation'],
            ].map(([href, label]) => (
              <Link key={href} to={href} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', transition: 'color 120ms ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >{label}</Link>
            ))}
          </div>

          {/* Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
              Services
            </p>
            {['Website Design', 'SEO', 'WhatsApp Automation', 'Email Automation', 'Video Ads', 'AI Proposals'].map((s) => (
              <span key={s} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{s}</span>
            ))}
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
              Contact
            </p>
            <Link to="/contact" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', transition: 'color 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              Request a Proposal
            </Link>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Greece</p>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ paddingTop: 'var(--space-6)' }}
        >
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} GO AI. All rights reserved.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Built with AI. Powered by results.
          </p>
        </div>
      </div>
    </footer>
  )
}
