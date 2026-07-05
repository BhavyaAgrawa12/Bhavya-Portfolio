import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT } from '../../lib/motion';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={`flex flex-col gap-3 ${alignment}`}
    >
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-accent-blue)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-[var(--color-text-secondary)]">{subtitle}</p>
      )}
    </motion.div>
  );
}
