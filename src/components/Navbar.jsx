import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { GoAILogo } from './GoAILogo'
import { useBasket } from '../context/BasketContext'

const navLinks = [
  { label: 'Websites',  href: '/websites' },
  { label: 'Packages',  href: '/packages' },
  { label: 'Bundles',   href: '/bundles' },
  { label: 'Add-ons',   href: '/addons' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'FAQ',       href: '/faq' },
  { label: 'Contact',   href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const { items } = useBasket()
  const basketCount = items.length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const isActive = (href) => location.pathname === href.split('#')[0]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: 'background 180ms ease, border-color 180ms ease, backdrop-filter 180ms ease',
          background: scrolled ? 'rgba(8,12,24,0.94)' : 'rgba(8,12,24,0.6)',
          borderBottom: scrolled ? '1px solid var(--border-default)' : '1px solid transparent',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--width-xl)',
            margin: '0 auto',
            padding: '0 var(--space-6)',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <GoAILogo size="md" />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: 'var(--space-1)', flex: 1, justifyContent: 'center' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  color: isActive(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'color 120ms ease, background 120ms ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--surface-raised)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = isActive(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: basket + CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            {/* Basket */}
            <Link
              to="/order"
              style={{
                height: 36,
                padding: '0 var(--space-3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                color: basketCount > 0 ? 'var(--color-brand-400)' : 'var(--text-tertiary)',
                background: basketCount > 0 ? 'rgba(99,102,241,0.08)' : 'transparent',
                border: `1px solid ${basketCount > 0 ? 'rgba(99,102,241,0.25)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-md)',
                transition: 'all 120ms ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-raised)'; e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = basketCount > 0 ? 'rgba(99,102,241,0.08)' : 'transparent'; e.currentTarget.style.color = basketCount > 0 ? 'var(--color-brand-400)' : 'var(--text-tertiary)' }}
            >
              <ShoppingCart size={13} />
              {basketCount > 0 ? `Basket (${basketCount})` : 'Basket'}
            </Link>

            {/* Get a Quote Today */}
            <Link
              to="/quote"
              style={{
                height: 36,
                padding: '0 var(--space-4)',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 0 30px rgba(118, 39, 239, 0.35)',
                transition: 'filter 120ms ease, box-shadow 120ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(118, 39, 239, 0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(118, 39, 239, 0.35)' }}
            >
              Get a Quote Today
            </Link>
          </div>

          {/* Mobile: basket count + burger */}
          <div className="flex md:hidden" style={{ alignItems: 'center', gap: 'var(--space-2)' }}>
            {basketCount > 0 && (
              <Link
                to="/order"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  height: 32, padding: '0 var(--space-3)',
                  fontSize: 'var(--text-xs)', fontWeight: 600,
                  color: 'var(--color-brand-400)',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <ShoppingCart size={12} />
                {basketCount}
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 64, left: 0, right: 0,
              zIndex: 49,
              background: 'rgba(8,12,24,0.98)',
              borderBottom: '1px solid var(--border-default)',
              padding: 'var(--space-4) var(--space-6) var(--space-6)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'var(--space-3) 0',
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: isActive(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border-default)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-brand-500)' }} />
                )}
              </Link>
            ))}

            {/* Mobile CTA row */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
              <Link
                to="/quote"
                style={{
                  flex: 1, minWidth: 140,
                  height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF',
                  border: 'none', borderRadius: 'var(--radius-md)',
                  boxShadow: '0 0 24px rgba(118, 39, 239, 0.35)',
                  textDecoration: 'none',
                }}
              >
                Get a Quote Today
              </Link>
              <Link
                to="/order"
                style={{
                  height: 44, padding: '0 var(--space-4)',
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                  fontSize: 'var(--text-sm)', fontWeight: 500,
                  color: basketCount > 0 ? 'var(--color-brand-400)' : 'var(--text-secondary)',
                  background: basketCount > 0 ? 'rgba(99,102,241,0.1)' : 'var(--surface-raised)',
                  border: `1px solid ${basketCount > 0 ? 'rgba(99,102,241,0.25)' : 'var(--border-default)'}`,
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                }}
              >
                <ShoppingCart size={15} />
                {basketCount > 0 ? `Basket (${basketCount})` : 'Basket'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
