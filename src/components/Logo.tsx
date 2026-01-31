import { motion, useReducedMotion } from 'framer-motion';
import logoSrc from '../assets/logo.png';

interface LogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export function Logo({ size, className = '', animate = true }: LogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const instantVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.img
      src={logoSrc}
      alt="AC logo"
      width={size}
      height={size}
      className={className}
      initial="hidden"
      animate="visible"
      variants={shouldAnimate ? containerVariants : instantVariants}
    />
  );
}

/**
 * Static variant for favicon/footer
 */
export function LogoSmall({
  size = 32,
  className = '',
}: Omit<LogoProps, 'animate'>) {
  return (
    <img
      src={logoSrc}
      alt="AC"
      width={size}
      height={size}
      className={className}
    />
  );
}
