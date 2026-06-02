import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react'
import { useBasket } from '../context/BasketContext'
import { useTranslations } from '../context/LanguageContext'

export default function BasketPanel() {
  const { items, removeItem } = useBasket()
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  if (items.length === 0) return null

  return (
    <>
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
                    {t.basket.title}
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
                  aria-label={t.basket.closeLabel}
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
                      aria-label={`${t.basket.removeItem} ${item.name}`}
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
                  {t.basket.note}
                </p>
                <Link
                  to="/order"
                  onClick={() => setOpen(false)}
                  style={{
                    height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    background: 'linear-gradient(90deg, #293BFF 0%, #7627EF 100%)', color: '#FFFFFF',
                    border: 'none', borderRadius: 'var(--radius-md)',
                    boxShadow: '0 0 24px rgba(118, 39, 239, 0.35)',
                    transition: 'filter 120ms ease, box-shadow 120ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(118, 39, 239, 0.5)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(118, 39, 239, 0.35)' }}
                >
                  {t.basket.proceed} <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
