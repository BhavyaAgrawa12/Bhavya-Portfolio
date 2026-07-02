import { motion } from 'framer-motion';
import Container from '../common/Container';

export default function ExperienceHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24">
      <div className="pointer-events-none absolute -top-20 right-1/3 h-80 w-80 rounded-full bg-[var(--color-accent-blue)]/20 blur-[120px]" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-[var(--color-accent-blue)]">Hero</span>
          <h1 className="mt-2 text-4xl font-bold uppercase leading-tight sm:text-5xl">
            My Engineering Journey
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl"
        />
      </Container>
    </section>
  );
}
