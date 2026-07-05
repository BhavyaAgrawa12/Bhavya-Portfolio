import { motion } from 'framer-motion';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useEducation } from '../../hooks/useEducation';
import { staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';
import DescriptionLines from '../../lib/descriptionLines';

export default function EducationTimeline() {
  const { data: educationList = [], isLoading } = useEducation();

  return (
    <section className="py-24">
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="Education"
          title="Learning Journey"
          subtitle="Academic foundation combined with hands-on experience through real-world software development."
        />

        {isLoading ? (
          <LoadingSpinner message="Loading education…" />
        ) : educationList.length > 0 ? (
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative mx-auto w-full max-w-4xl border-l border-white/10 pl-8"
          >
            {educationList.map((item) => {
              const year = item.startDate ? new Date(item.startDate).getFullYear().toString() : '';
              return (
                <motion.div key={item.id} variants={staggerItem} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.15rem] top-3 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[var(--color-bg-base)] bg-[var(--color-accent-blue)]" />
                  <GlassCard className="p-6 transition-all duration-300 hover:-translate-y-1">
                    {year && <span className="text-sm font-semibold text-[var(--color-accent-blue)]">{year}</span>}
                    <h3 className="mt-2 text-xl font-bold">{item.degree}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {item.institution}{item.location ? ` • ${item.location}` : ''}
                    </p>
                    {item.description && (
                      <DescriptionLines text={item.description} className="mt-4" />
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <GlassCard className="p-10 text-center text-[var(--color-text-secondary)]">
            No education entries added yet.
          </GlassCard>
        )}
      </Container>
    </section>
  );
}
