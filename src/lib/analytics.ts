export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackClick(buttonName: string) {
  trackEvent('cta_click', { button_name: buttonName });
}
