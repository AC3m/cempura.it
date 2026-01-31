import { motion, useReducedMotion } from 'framer-motion';

const strengths = [
  'Turning ambiguity into execution',
  'Predictable roadmap delivery',
  'Autonomy with accountability',
  'Business-aligned execution',
  'Growing senior engineers',
];

export function Strengths() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
  };

  return (
    <section className="px-6 py-12 sm:py-16">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-8 text-sm font-semibold uppercase tracking-wider text-text-muted"
        >
          How I work
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
        >
          {strengths.map((strength) => (
            <motion.span
              key={strength}
              variants={itemVariants}
              className="cursor-default rounded-full border border-border bg-surface-1 px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:border-accent/40 hover:text-accent"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {strength}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
