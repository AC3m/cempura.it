import { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  const bannerVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      y: prefersReducedMotion ? 0 : 100,
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface-1 p-5 shadow-xl backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 sm:items-center">
                <Cookie className="h-5 w-5 flex-shrink-0 text-accent" />
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-text-secondary">
                    This site uses cookies to analyze traffic and improve your
                    experience. Your data is never sold or shared.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 sm:flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="flex min-h-[44px] items-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text-secondary transition-all hover:bg-surface-3 hover:text-text-primary"
                  aria-label="Decline cookies"
                >
                  <X className="h-4 w-4" />
                  <span>Decline</span>
                </button>
                <button
                  onClick={handleAccept}
                  className="flex min-h-[44px] items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-all hover:bg-accent-hover"
                  aria-label="Accept cookies"
                >
                  <span>Accept</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
