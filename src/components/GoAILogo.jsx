export function GoAILogo({ size = 'md' }) {
  const sizes = { sm: 'text-xl', md: 'text-2xl', lg: 'text-3xl' }

  return (
    <span
      className={`font-black tracking-tight ${sizes[size]}`}
      style={{
        background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      GO
      <span
        style={{
          WebkitTextFillColor: 'var(--text-primary)',
          backgroundClip: 'unset',
          background: 'none',
        }}
      >
        AI
      </span>
    </span>
  )
}
