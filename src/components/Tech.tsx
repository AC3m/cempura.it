import { motion, useReducedMotion } from 'framer-motion'

const techGroups = [
  {
    label: 'Systems',
    items: [
      'Distributed Systems',
      'REST APIs',
      'DynamoDB',
      'Kafka / MSK',
    ],
  },
  {
    label: 'Frontend',
    items: [
      'TypeScript',
      'React',
    ],
  },
  {
    label: 'Platform & Operations',
    items: [
      'AWS',
      'Kubernetes',
      'CI/CD',
      'Observability & Reliability',
    ],
  },
];


export function Tech() {
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

  const groupVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.4 },
    },
  }

  return (
    <section className="px-6 py-12 sm:py-16">
      <motion.div
        className="mx-auto max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.h2
          variants={groupVariants}
          className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-text-muted"
        >
          Technology
        </motion.h2>

        <div className="space-y-6">
          {techGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={groupVariants}
              className="text-center"
            >
              <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-text-muted/60">
                {group.label}
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-surface-1 px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
