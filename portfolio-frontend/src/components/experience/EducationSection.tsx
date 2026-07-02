import { useEffect, useState } from 'react';
import { Cloud, ShieldCheck, Building2, FileBadge } from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { getEducation } from '../../services/educationService';
import { getCertifications } from '../../services/certificationService';
import type { CertificationEntry, EducationEntry } from '../../types/portfolio';

const certificationIcons = {
  cloud: Cloud,
  security: ShieldCheck,
  architecture: Building2,
  default: FileBadge,
} as const;

export default function EducationSection() {
  const [educationList, setEducationList] = useState<EducationEntry[]>([]);
  const [certificationList, setCertificationList] = useState<CertificationEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getEducation(), getCertifications()])
      .then(([education, certifications]) => {
        if (!isMounted) return;
        setEducationList(education);
        setCertificationList(certifications);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle eyebrow="Education" title="Education" />

        <div className="grid gap-4 sm:grid-cols-2">
          {loading ? (
            <GlassCard className="col-span-full p-10 text-center text-text-secondary">
              Loading education data...
            </GlassCard>
          ) : educationList.length > 0 ? (
            educationList.map((entry) => (
              <GlassCard key={entry.id}>
                <h3 className="font-semibold">{entry.institution}</h3>
                <p className="text-sm text-text-secondary">{entry.degree}</p>
                {entry.coursework?.length ? (
                  <ul className="mt-3 list-inside list-disc text-sm text-text-secondary">
                    {entry.coursework.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-text-secondary">No coursework added yet.</p>
                )}
              </GlassCard>
            ))
          ) : (
            <GlassCard className="col-span-full p-10 text-center text-text-secondary">
              No education entries have been added yet.
            </GlassCard>
          )}
        </div>

        <SectionTitle title="Certifications" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <GlassCard className="col-span-full p-10 text-center text-text-secondary">
              Loading certifications...
            </GlassCard>
          ) : certificationList.length > 0 ? (
            certificationList.map((cert) => {
              const Icon = certificationIcons[cert.icon ?? 'default'] ?? FileBadge;
              return (
                <GlassCard key={cert.id} className="flex flex-col items-center gap-2 py-8 text-center">
                  <Icon size={32} className="text-[var(--color-accent-blue)]" />
                  <h4 className="font-semibold">{cert.title}</h4>
                  {cert.status && <span className="text-xs text-[var(--color-text-muted)]">{cert.status}</span>}
                </GlassCard>
              );
            })
          ) : (
            <GlassCard className="col-span-full p-10 text-center text-text-secondary">
              No certifications have been added yet.
            </GlassCard>
          )}
        </div>
      </Container>
    </section>
  );
}
