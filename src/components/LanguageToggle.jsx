import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      style={{
        display: 'flex',
        gap: 2,
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        padding: 2,
        flexShrink: 0,
      }}
      role="group"
      aria-label="Language selector"
    >
      {(['gr', 'en']).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          aria-label={lang === 'gr' ? 'Ελληνικά' : 'English'}
          style={{
            height: 28,
            minWidth: 32,
            padding: '0 var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: language === lang ? 'var(--goai-violet)' : 'transparent',
            color: language === lang ? '#fff' : 'var(--text-tertiary)',
            border: 'none',
            borderRadius: 'calc(var(--radius-md) - 2px)',
            cursor: 'pointer',
            transition: 'background 120ms ease, color 120ms ease',
            fontFamily: 'inherit',
            lineHeight: 1,
          }}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
