import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { GoAILogo } from './GoAILogo'

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
      <div style={{ maxWidth: 'var(--width-xl)', margin: '0 auto' }}>

        {/* Top row — Brand + Pages + Contact (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12" style={{ borderBottom: '1px solid var(--border-default)' }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GoAILogo size="sm" />
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '26ch' }}>
              AI-powered websites and automation for businesses that want to grow online.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                height: 36, padding: '0 var(--space-4)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                background: '#25d366', color: '#fff',
                border: 'none', borderRadius: 'var(--radius-md)',
                width: 'fit-content', transition: 'background 120ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe5d' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#25d366' }}
            >
              <MessageCircle size={15} />
              WhatsApp us
            </a>
          </div>

          {/* Pages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
              Pages
            </p>
            {[
              ['/websites',  'Websites'],
              ['/packages',  'Packages'],
              ['/bundles',   'Bundles'],
              ['/addons',    'Add-ons'],
              ['/journey',                       'Start Your Journey'],
              ['/journey#whats-the-difference', "What's the Difference?"],
              ['/portfolio',                    'Portfolio'],
              ['/faq',       'FAQ'],
              ['/contact',   'Contact Us'],
            ].map(([href, label]) => (
              <Link key={href} to={href}
                style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', transition: 'color 120ms ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >{label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
              Contact
            </p>
            <a
              href="mailto:hello@goai.example"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', transition: 'color 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <Mail size={13} />
              hello@goai.example
            </a>
            <a
              href="tel:+30000000000"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', transition: 'color 120ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <Phone size={13} />
              +30 000 000 0000
            </a>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <MapPin size={13} style={{ flexShrink: 0, marginTop: 2 }} />
              GoAI Digital Studio, 123 Example Street, Corfu, Greece 49100
            </p>
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
