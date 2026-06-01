import { Link, useLocation } from 'react-router-dom'
import { Globe, FileText, Mail } from 'lucide-react'

export default function MobileBottomBar() {
  const { pathname } = useLocation()

  const items = [
    { label: 'Websites',  icon: Globe,     href: '/websites' },
    { label: 'Get Quote', icon: FileText,   href: '/quote' },
    { label: 'Contact',   icon: Mail,       href: '/contact' },
  ]

  return (
    <>
      {/* Spacer so page content isn't hidden behind bar */}
      <div className="block md:hidden" style={{ height: 64 }} />

      <nav
        className="block md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          background: 'rgba(8,12,24,0.97)',
          borderTop: '1px solid var(--border-default)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
        }}
      >
        {items.map(({ label, icon: Icon, href }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              to={href}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                padding: 'var(--space-3) var(--space-2)',
                textDecoration: 'none',
                color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
                transition: 'color 120ms ease',
              }}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: active ? 600 : 400, lineHeight: 1 }}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
