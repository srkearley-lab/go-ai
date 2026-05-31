import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { GoAILogo } from './GoAILogo'

const links = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Portfolio', href: '/portfolio' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 180ms ease, border-color 180ms ease, backdrop-filter 180ms ease',
          background: scrolled ? 'rgba(8,12,24,0.92)' : 'transparent',
          borderBottom: scrolled ? `1px solid var(--border-default)` : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--width-xl)',
            margin: '0 auto',
            padding: '0 var(--space-8)',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <GoAILogo size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 'var(--space-1)' }}>
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: location.pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'color 120ms ease, background 120ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'var(--surface-raised)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = location.pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 'var(--space-3)' }}>
            <Link
              to="/book"
              style={{
                height: 36,
                padding: '0 var(--space-4)',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                background: 'var(--color-brand-500)',
                color: 'var(--color-neutral-0)',
                border: '1px solid var(--color-brand-600)',
                borderRadius: 'var(--radius-md)',
                transition: 'background 120ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="flex md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              top: 64,
              left: 0,
              right: 0,
              zIndex: 49,
              background: 'rgba(8,12,24,0.97)',
              borderBottom: `1px solid var(--border-default)`,
              padding: 'var(--space-4) var(--space-6) var(--space-6)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  display: 'block',
                  padding: 'var(--space-3) 0',
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  borderBottom: `1px solid var(--border-default)`,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                marginTop: 'var(--space-4)',
                height: 40,
                padding: '0 var(--space-6)',
                alignItems: 'center',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                background: 'var(--color-brand-500)',
                color: 'var(--color-neutral-0)',
                border: '1px solid var(--color-brand-600)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              Request Proposal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
