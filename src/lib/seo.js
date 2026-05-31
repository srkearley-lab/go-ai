import { useEffect } from 'react'

const SITE_NAME = 'GO AI'
const DEFAULT_DESC = 'GO AI builds modern websites, AI automation, lead funnels and monthly growth packages for businesses that want to look professional, save time and scale faster.'
const DEFAULT_IMAGE = '/logo.png'

export function useSEO({ title, description = DEFAULT_DESC, ogImage = DEFAULT_IMAGE } = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — AI-powered websites and automation`

  useEffect(() => {
    document.title = fullTitle

    const set = (sel, attr, val) => {
      let el = document.querySelector(sel)
      if (!el) {
        el = document.createElement('meta')
        if (attr === 'name') el.name = sel.match(/\[name="(.+?)"\]/)?.[1] || ''
        if (attr === 'property') el.setAttribute('property', sel.match(/\[property="(.+?)"\]/)?.[1] || '')
        document.head.appendChild(el)
      }
      el.setAttribute('content', val)
    }

    set('meta[name="description"]',        'name',     description)
    set('meta[property="og:title"]',       'property', fullTitle)
    set('meta[property="og:description"]', 'property', description)
    set('meta[property="og:image"]',       'property', ogImage)
    set('meta[property="og:type"]',        'property', 'website')
    set('meta[name="twitter:card"]',       'name',     'summary_large_image')
    set('meta[name="twitter:title"]',      'name',     fullTitle)
    set('meta[name="twitter:description"]','name',     description)
  }, [fullTitle, description, ogImage])
}
