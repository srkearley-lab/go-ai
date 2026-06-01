import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { translations } from '../translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('goai-language', 'gr')
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

// Returns the full translations object for the current language.
// Usage: const t = useTranslations()  →  t.nav.websites, t.buttons.addToBasket, etc.
export function useTranslations() {
  const { language } = useLanguage()
  return translations[language]
}
