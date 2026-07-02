import { useEffect, useState } from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { getEngineeringJourney } from '../../services/timelineService';
import type { TimelineEvent } from '../../types/portfolio';

export default function JourneyTimeline() {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getEngineeringJourney()
      .then((events) => {
        if (!isMounted) return;
        setTimeline(events);
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
        <SectionTitle eyebrow="Timeline" title="Engineering Journey" align="left" />

        {loading ? (
          <GlassCard className="p-10 text-center text-text-secondary">
            Loading timeline events...
          </GlassCard>
        ) : timeline.length > 0 ? (
          <div className="relative flex flex-col gap-12 border-l border-white/10 pl-8">
            {timeline.map((event) => (
              <div key={event.year} className="relative">
                <span className="absolute -left-[2.6rem] top-1 h-3 w-3 rounded-full bg-[var(--color-accent-blue)]" />
                <span className="text-2xl font-bold text-[var(--color-accent-blue)]">{event.year}</span>
                <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                {event.description && (
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{event.description}</p>
                )}
                <div className="glass mt-3 aspect-video w-full max-w-md rounded-xl" />
              </div>
            ))}

            <div className="relative">
              <span className="absolute -left-[2.6rem] top-1 h-3 w-3 rounded-full bg-[var(--color-text-muted)]" />
              <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">Future</span>
              <h3 className="mt-1 text-lg font-semibold">AWS | Docker | System Design</h3>
            </div>
          </div>
        ) : (
          <GlassCard className="p-10 text-center text-text-secondary">
            No timeline events are available yet.
          </GlassCard>
        )}
      </Container>
    </section>
  );
}
