import { motion, useReducedMotion } from 'framer-motion'
import { Users, TrendingUp, GitMerge } from 'lucide-react'

const impacts = [
  {
    icon: Users,
    title: 'Team scaling',
    description: 'Built and grown high-performing engineering teams',
  },
  {
    icon: TrendingUp,
    title: 'Product impact',
    description: 'Shipped changes with measurable business outcomes',
  },
  {
    icon: GitMerge,
    title: 'Cross-functional',
    description: 'Bridge engineering, product, and operations',
  },
]

export function Impact() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.4 },
    },
  }

  return (
    <section className="px-6 py-12 sm:py-16">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-8 text-sm font-semibold uppercase tracking-wider text-text-muted"
        >
          What I do
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {impacts.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group rounded-2xl bg-surface-1 p-6 shadow-lg transition-all duration-200 hover:bg-surface-2 hover:shadow-xl sm:p-7 text-center"
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-accent transition-colors group-hover:bg-surface-3 mx-auto"
                  whileHover={prefersReducedMotion ? undefined : { rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
