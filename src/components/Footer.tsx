import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export function Footer() {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.4 },
    },
  }

  return (
    <motion.footer
      className="border-t border-border/50 px-6 py-10"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 text-sm text-text-muted sm:flex-row">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Kraków, PL · Open to remote</span>
        </div>
      </div>
    </motion.footer>
  )
}
