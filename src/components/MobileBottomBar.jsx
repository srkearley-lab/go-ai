import { Link, useLocation } from 'react-router-dom'
import { Package, ShoppingCart, Mail } from 'lucide-react'
import { useBasket } from '../context/BasketContext'

export default function MobileBottomBar() {
  const { items } = useBasket()
  const { pathname } = useLocation()
  const count = items.length

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
          paddingBottom: 'env(safe-area-inset-bottom)',
          display: 'flex',
        }}
      >
        {[
          { label: 'Packages', icon: Package, href: '/packages' },
          { label: count > 0 ? `Basket (${count})` : 'Basket', icon: ShoppingCart, href: '/order', highlight: count > 0 },
          { label: 'Contact', icon: Mail, href: '/contact' },
        ].map(({ label, icon: Icon, href, highlight }) => {
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
                color: highlight
                  ? 'var(--color-brand-400)'
                  : active
                  ? 'var(--text-primary)'
                  : 'var(--text-tertiary)',
                transition: 'color 120ms ease',
                position: 'relative',
              }}
            >
              {highlight && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  right: '30%',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-brand-500)',
                }} />
              )}
              <Icon size={20} strokeWidth={active || highlight ? 2.2 : 1.8} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: active || highlight ? 600 : 400, lineHeight: 1 }}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
