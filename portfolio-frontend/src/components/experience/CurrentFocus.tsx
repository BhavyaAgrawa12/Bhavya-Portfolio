import { useEffect, useState } from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { getInternships } from '../../services/internshipService';
import type { InternshipEntry } from '../../types/portfolio';

export default function CurrentFocus() {
  const [internships, setInternships] = useState<InternshipEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getInternships()
      .then((data) => {
        if (!isMounted) return;
        setInternships(data);
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
      <Container className="flex flex-col gap-16">
        <div>
          <SectionTitle eyebrow="Internships" title="Current Internships" />
          <div className="mt-8 flex flex-col gap-3">
            {loading ? (
              <GlassCard className="p-10 text-center text-text-secondary">
                Loading internships...
              </GlassCard>
            ) : internships.length > 0 ? (
              internships.map((item) => (
                <div
                  key={item.id}
                  className="glass flex flex-col gap-1 rounded-xl px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-medium">{item.company}</span>
                  <span className="text-sm text-text-secondary">{item.position}</span>
                  <span className="text-sm text-text-secondary">{item.duration}</span>
                </div>
              ))
            ) : (
              <GlassCard className="p-10 text-center text-text-secondary">
                No internships added yet.
              </GlassCard>
            )}
          </div>
        </div>

        <div>
          <SectionTitle eyebrow="Achievements" title="Key Milestones" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <GlassCard className="col-span-full p-10 text-center text-text-secondary">
              No milestones added yet.
            </GlassCard>
          </div>
        </div>

        <div>
          <SectionTitle eyebrow="Goals" title="Professional Aspirations" />
          <div className="mt-10 flex items-center justify-center">
            <GlassCard className="rounded-3xl p-10 text-center text-text-secondary">
              No goals added yet.
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
