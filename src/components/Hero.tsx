import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { trackClick } from '../lib/analytics';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Transform scroll position into padding values with px units
  const paddingY = useTransform(
    scrollY,
    [0, 200],
    prefersReducedMotion ? ['64px', '64px'] : ['64px', '16px']
  );

  // Scale down the content
  const scale = useTransform(
    scrollY,
    [0, 200],
    prefersReducedMotion ? [1, 1] : [1, 0.85]
  );

  // Reduce the min-height dynamically
  const minHeight = useTransform(
    scrollY,
    [0, 200],
    prefersReducedMotion ? ['100vh', '100vh'] : ['100vh', 'auto']
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center bg-background px-6"
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        minHeight: minHeight,
      }}
    >
      <motion.div
        className="flex max-w-2xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          scale,
        }}
      >
        <motion.div variants={itemVariants} className="text-accent">
          <Logo size={258} className="sm:h-72 sm:w-72" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="-mt-6 mb-3 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
        >
          Artur Cempura
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="mb-6 text-xl font-medium text-accent sm:text-2xl"
        >
          Engineering Manager / Software Engineering Team Lead
        </motion.p>

        {/* Statement */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-lg text-lg leading-relaxed text-text-secondary sm:text-xl"
        >
          I lead teams building reliable, high-performance systems. Led product
          teams of up to 9 engineers delivering high-traffic, customer-facing
          systems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <motion.a
            href="mailto:cempura.artur@gmail.com"
            onClick={() => trackClick('email')}
            className="group flex min-h-[48px] items-center justify-center gap-3 rounded-xl bg-accent px-6 py-3 font-medium text-background transition-all hover:bg-accent-hover hover:shadow-md"
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            aria-label="Send email"
          >
            <Mail className="h-5 w-5" />
            <span>Get in touch</span>
            <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/arturcempura/"
            onClick={() => trackClick('linkedin')}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[48px] items-center justify-center gap-3 rounded-xl border border-border bg-surface-1 px-6 py-3 font-medium text-text-primary transition-all hover:bg-surface-2 hover:border-text-muted"
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn</span>
            <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
