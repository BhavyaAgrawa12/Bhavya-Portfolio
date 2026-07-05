import { motion } from 'framer-motion';
import { Briefcase, Trophy } from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useInternships } from '../../hooks/useInternships';
import { useAchievements } from '../../hooks/useAchievements';
import { staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';
import DescriptionLines from '../../lib/descriptionLines';

export default function CurrentFocus() {
  const { data: internships = [], isLoading: intLoading } = useInternships();
  const { data: achievements = [], isLoading: achLoading } = useAchievements();

  const EMP_LABELS: Record<string, string> = {
    FULL_TIME: 'Full Time', PART_TIME: 'Part Time',
    INTERNSHIP: 'Internship', FREELANCE: 'Freelance',
  };

  const formatDateRange = (start: string | null, end: string | null) => {
    const s = start ? new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null;
    const e = end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';
    if (!s) return null;
    return `${s} – ${e}`;
  };

  return (
    <section className="py-20">
      <Container className="flex flex-col gap-16">

        {/* ── Internships ───────────────────────────────────────── */}
        <div>
          <SectionTitle eyebrow="Experience" title="Internships & Work" align="left" />
          <div className="mt-8 flex flex-col gap-5">
            {intLoading ? <LoadingSpinner /> : internships.length > 0 ? (
              <motion.div
                variants={staggerContainer(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="flex flex-col gap-5"
              >
                {internships.map((item) => {
                  const dateRange = formatDateRange(item.startDate, item.endDate);
                  return (
                    <motion.div key={item.id} variants={staggerItem}>
                      <GlassCard className="rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-blue)]/10">
                              <Briefcase size={18} className="text-[var(--color-accent-blue)]" />
                            </div>
                            <div>
                              <h3 className="font-bold">{item.company}</h3>
                              <p className="text-sm text-[var(--color-accent-blue)]">{item.position}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-muted)]">
                              {EMP_LABELS[item.employmentType] ?? item.employmentType}
                            </span>
                            {dateRange && (
                              <span className="text-xs text-[var(--color-text-muted)]">{dateRange}</span>
                            )}
                          </div>
                        </div>
                        {item.description && (
                          <DescriptionLines text={item.description} className="mt-4" />
                        )}
                        {item.location && (
                          <p className="mt-3 text-xs text-[var(--color-text-muted)]">📍 {item.location}</p>
                        )}
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <GlassCard className="p-10 text-center text-[var(--color-text-secondary)]">
                No internships added yet.
              </GlassCard>
            )}
          </div>
        </div>

        {/* ── Achievements ──────────────────────────────────────── */}
        <div>
          <SectionTitle eyebrow="Achievements" title="Key Milestones" align="left" />
          <div className="mt-8">
            {achLoading ? <LoadingSpinner /> : achievements.length > 0 ? (
              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {achievements.map((ach) => {
                  const dateLabel = ach.date
                    ? new Date(ach.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : null;
                  return (
                    <motion.div key={ach.id} variants={staggerItem}>
                      <GlassCard className="group flex h-full flex-col gap-3 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent-blue)]/40">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                          <Trophy size={20} className="text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{ach.title}</h3>
                          {dateLabel && (
                            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{dateLabel}</p>
                          )}
                        </div>
                        {ach.description && (
                          <DescriptionLines text={ach.description} className="mt-1" />
                        )}
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <GlassCard className="p-10 text-center text-[var(--color-text-secondary)]">
                No achievements added yet.
              </GlassCard>
            )}
          </div>
        </div>

      </Container>
    </section>
  );
}
