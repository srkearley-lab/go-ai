// Analytics placeholder — wire up GA4, GTM and Meta Pixel via environment variables
// Vite env vars: VITE_GA_ID, VITE_GTM_ID, VITE_META_PIXEL_ID

export const trackEvent = (eventName, params = {}) => {
  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params)
  }
  // Meta / Facebook Pixel
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', eventName, params)
  }
}

// Predefined events — call these on key user actions
export const analytics = {
  formSubmit:    (form)    => trackEvent('form_submit',    { form_name: form }),
  ctaClick:      (label)   => trackEvent('cta_click',      { label }),
  bookingClick:  ()        => trackEvent('booking_click'),
  pricingView:   (pkg)     => trackEvent('pricing_view',   { package: pkg }),
  paymentStart:  (pkg)     => trackEvent('payment_start',  { package: pkg }),
}
