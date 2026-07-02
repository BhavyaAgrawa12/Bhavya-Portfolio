import { useNavigate } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";
import GlassCard from "../common/GlassCard";
import { engineeringJourney } from "../../data";

export default function JourneyPreview() {
  const navigate = useNavigate();

  return (
    <section id="journey" className="relative py-24">
      <Container className="flex flex-col gap-14">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-blue)]">
            EXPERIENCE
          </p>

          <h2 className="text-4xl font-bold">My Engineering Journey</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[var(--color-text-secondary)]">
            Every project, challenge, and technology I've explored has helped
            shape my journey as a full-stack developer. Here's a quick timeline
            of my growth.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-3xl border-l border-white/10 pl-8">
          {engineeringJourney.map((event) => (
            <div key={event.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.15rem] top-2 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[var(--color-bg)] bg-[var(--color-accent-blue)]" />

              <GlassCard className="group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40">
                <span className="text-sm font-semibold text-[var(--color-accent-blue)]">
                  {event.year}
                </span>

                <h3 className="mt-2 text-xl font-bold">{event.title}</h3>

                <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                  {event.description}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="group transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            onClick={() => navigate("/experience")}
          >
            <span>View Full Experience</span>

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
