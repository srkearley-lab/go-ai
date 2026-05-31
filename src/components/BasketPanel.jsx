import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react'
import { useBasket } from '../context/BasketContext'

export default function BasketPanel() {
  const { items, removeItem } = useBasket()
  const [open, setOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 'var(--space-8)',
          right: 'var(--space-8)',
          zIndex: 90,
          height: 52,
          padding: '0 var(--space-5)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          background: 'var(--color-brand-500)',
          color: 'var(--color-neutral-0)',
          border: '1px solid var(--color-brand-600)',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-xl)',
          cursor: 'pointer',
          transition: 'background 120ms ease, transform 80ms ease',
          fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        <ShoppingCart size={16} />
        View Basket
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 20, height: 20, borderRadius: '50%',
          background: 'var(--color-neutral-0)', color: 'var(--color-brand-600)',
          fontSize: 'var(--text-xs)', fontWeight: 700,
        }}>
          {items.length}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
                width: '100%', maxWidth: 420,
                background: 'var(--surface-raised)',
                borderLeft: '1px solid var(--border-default)',
                display: 'flex', flexDirection: 'column',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 'var(--space-5) var(--space-6)',
                borderBottom: '1px solid var(--border-default)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <ShoppingCart size={18} color="var(--color-brand-400)" />
                  <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Your Basket
                  </h2>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                    fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-brand-400)',
                  }}>
                    {items.length}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-tertiary)', display: 'flex',
                    padding: 'var(--space-1)', borderRadius: 'var(--radius-md)',
                    transition: 'color 120ms ease, background 120ms ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--surface-subtle)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.background = 'none' }}
                  aria-label="Close basket"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items list */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-4)',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px', lineHeight: 1.3 }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-brand-400)', margin: 0, fontWeight: 500 }}>
                        {item.priceDisplay}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
                        color: 'var(--text-tertiary)', display: 'flex',
                        padding: 'var(--space-1)', borderRadius: 'var(--radius-md)',
                        transition: 'color 120ms ease, background 120ms ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)'; e.currentTarget.style.background = 'var(--surface-overlay)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; e.currentTarget.style.background = 'none' }}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                padding: 'var(--space-5) var(--space-6)',
                borderTop: '1px solid var(--border-default)',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                flexShrink: 0,
              }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0, textAlign: 'center' }}>
                  We'll collect all details on the next step. No payment taken here.
                </p>
                <Link
                  to="/order"
                  onClick={() => setOpen(false)}
                  style={{
                    height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    background: 'var(--color-brand-500)', color: 'var(--color-neutral-0)',
                    border: '1px solid var(--color-brand-600)', borderRadius: 'var(--radius-md)',
                    transition: 'background 120ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-600)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-500)' }}
                >
                  Proceed to Order Form <ArrowRight size={15} />
                </Link>
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  style={{
                    height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'var(--text-sm)', fontWeight: 500,
                    background: 'transparent', color: 'var(--text-secondary)',
                    border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
                    transition: 'background 120ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  Schedule a call instead
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
