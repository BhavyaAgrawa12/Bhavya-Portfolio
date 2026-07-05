import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useEducation } from '../../hooks/useEducation';
import { useCertifications } from '../../hooks/useCertifications';
import { staggerContainer, staggerItem, VIEWPORT } from '../../lib/motion';
import { mediaUrl } from '../../lib/mediaUrl';
import DescriptionLines from '../../lib/descriptionLines';

export default function EducationSection() {
  const { data: educationList = [], isLoading: eduLoading } = useEducation();
  const { data: certificationList = [], isLoading: certLoading } = useCertifications();
  const loading = eduLoading || certLoading;

  return (
    <section className="py-20">
      <Container className="flex flex-col gap-16">

        {/* ── Education ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          <SectionTitle eyebrow="Education" title="Academic Background" align="left" />

          {loading ? <LoadingSpinner /> : educationList.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="grid gap-5 sm:grid-cols-2"
            >
              {educationList.map((entry) => {
                const startYear = entry.startDate ? new Date(entry.startDate).getFullYear() : null;
                const endYear = entry.endDate ? new Date(entry.endDate).getFullYear() : 'Present';
                return (
                  <motion.div key={entry.id} variants={staggerItem}>
                    <GlassCard className="flex h-full flex-col gap-3 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-blue)]/10">
                          <Award size={20} className="text-[var(--color-accent-blue)]" />
                        </div>
                        {startYear && (
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-muted)]">
                            {startYear} – {endYear}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{entry.institution}</h3>
                        <p className="mt-1 text-sm font-medium text-[var(--color-accent-blue)]">{entry.degree}</p>
                        {entry.location && (
                          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{entry.location}</p>
                        )}
                      </div>
                      {entry.description && (
                        <DescriptionLines text={entry.description} className="mt-1" />
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
        </div>

        {/* ── Certifications ────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          <SectionTitle eyebrow="Certifications" title="Licenses & Certificates" align="left" />

          {loading ? <LoadingSpinner /> : certificationList.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {certificationList.map((cert) => {
                // cert is ApiCertification — image is under certificateImage relation
                const imgUrl = mediaUrl(cert.certificateImage?.fileUrl);
                const issueLabel = cert.issueDate
                  ? new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                  : null;
                return (
                  <motion.div key={cert.id} variants={staggerItem}>
                    <GlassCard className="group flex flex-col gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent-blue)]/40">
                      {imgUrl ? (
                        <img src={imgUrl} alt={cert.title} className="h-14 w-auto object-contain" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-blue)]/10">
                          <Award size={22} className="text-[var(--color-accent-blue)]" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold leading-snug">{cert.title}</h4>
                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{cert.issuer}</p>
                        {issueLabel && (
                          <p className="mt-1 text-xs text-[var(--color-text-muted)]">{issueLabel}</p>
                        )}
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-[var(--color-accent-blue)] transition hover:opacity-80"
                        >
                          <ExternalLink size={12} /> View Credential
                        </a>
                      )}
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <GlassCard className="p-10 text-center text-[var(--color-text-secondary)]">
              No certifications added yet.
            </GlassCard>
          )}
        </div>

      </Container>
    </section>
  );
}
