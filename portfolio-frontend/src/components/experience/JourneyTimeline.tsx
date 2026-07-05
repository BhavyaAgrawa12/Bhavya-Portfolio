import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';
import { engineeringJourney } from '../../data/timeline';

export default function JourneyTimeline() {
  // Timeline uses static data from data/timeline.ts (personal narrative, not DB-driven)
  const timeline = engineeringJourney;
  const loading = false;

  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle eyebrow="Timeline" title="Engineering Journey" align="left" />

        {loading ? (
          <LoadingSpinner />
        ) : timeline.length > 0 ? (
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative flex flex-col gap-10 border-l border-white/10 pl-8"
          >
            {timeline.map((event) => (
              <motion.div key={event.year} variants={staggerItem} className="relative">
                <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-4 border-[var(--color-bg-base)] bg-[var(--color-accent-blue)]" />
                <GlassCard className="p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40">
                  <span className="text-sm font-bold text-[var(--color-accent-blue)]">{event.year}</span>
                  <h3 className="mt-2 text-xl font-bold">{event.title}</h3>
                  {event.description && (
                    <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{event.description}</p>
                  )}
                </GlassCard>
              </motion.div>
            ))}

            {/* Future node */}
            <motion.div variants={staggerItem} className="relative">
              <span className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-4 border-[var(--color-bg-base)] bg-[var(--color-text-muted)]" />
              <GlassCard className="p-6 opacity-60">
                <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">Future</span>
                <h3 className="mt-2 text-xl font-bold">AWS · Docker · System Design</h3>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                  Deepening cloud expertise, containerisation, and large-scale system design.
                </p>
              </GlassCard>
            </motion.div>
          </motion.div>
        ) : (
          <GlassCard className="p-10 text-center text-[var(--color-text-secondary)]">
            No timeline events available yet.
          </GlassCard>
        )}
      </Container>
    </section>
  );
}
