import { createContext, useContext, useState, useCallback } from 'react'

export const PACKAGE_FORM_TYPES = {
  'Website Only':               ['website'],
  'Hosting & Website Care':     [],
  'Social Media Content':       ['social'],
  'AI Content & Marketing':     ['social'],
  'AI Automation':              ['automation'],
  'AI Avatar & Video Content':  ['social'],
  'Proposal & Sales Documents': [],
  'Website + Hosting Care':     ['website'],
  'Website + Social Growth':    ['website', 'social'],
  'Website + Marketing Engine': ['website', 'social'],
  'Website + AI Automation':    ['website', 'automation'],
  'Full AI Growth Package':     ['website', 'social', 'automation'],
  'Basic Launch Website':       ['website'],
  'Starter Business Website':   ['website'],
  'Business Website':           ['website'],
  'Growth Website':             ['website'],
  'Premium AI-Ready Website':   ['website'],
}

const BasketContext = createContext(null)

export function BasketProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((item) => {
    setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item])
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearBasket = useCallback(() => setItems([]), [])

  const isInBasket = useCallback((id) => items.some(i => i.id === id), [items])

  const neededFormTypes = [...new Set(items.flatMap(i => i.formTypes || []))]

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, clearBasket, isInBasket, neededFormTypes }}>
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  const ctx = useContext(BasketContext)
  if (!ctx) throw new Error('useBasket must be used within BasketProvider')
  return ctx
}
