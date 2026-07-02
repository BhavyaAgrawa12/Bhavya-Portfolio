import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import GlassCard from "../common/GlassCard";

interface JourneyEntry {
  label: string;
  title: string;
  body: string;
}

const entries: JourneyEntry[] = [
  {
    label: "01 • How I Started Programming",
    title: "Discovering Code: The Magic of Python",
    body: "My programming journey began with Python. It introduced me to problem-solving and showed me how software could transform ideas into real-world solutions.",
  },
  {
    label: "02 • Why Backend",
    title: "Building the Engine Behind Every Application",
    body: "As I explored web development, I became fascinated by backend systems, APIs, authentication, databases, and how everything works behind the scenes.",
  },
  {
    label: "03 • Learning Through Projects",
    title: "Turning Knowledge Into Real Applications",
    body: "From static websites to full-stack applications like Hotel PMS, TaskFlow, and my Portfolio, every project helped me improve my development skills and engineering mindset.",
  },
  {
    label: "04 • Looking Ahead",
    title: "Growing as a Software Engineer",
    body: "My goal is to continue building scalable software, deepen my backend expertise, contribute to impactful projects, and grow into a skilled full-stack engineer.",
  },
];

export default function MyJourney() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 py-24"
    >
      <Container className="max-w-5xl">
        <SectionTitle
          eyebrow="Journey"
          title="My Journey in Narrative"
          subtitle="Every milestone, project, and challenge has helped shape my path into software engineering."
        />

        <div className="mt-16 relative border-l border-white/10 pl-8">
          {entries.map((entry) => (
            <div
              key={entry.title}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-[2.2rem] top-2 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[var(--color-bg)] bg-[var(--color-accent-blue)]" />

              <GlassCard className="group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-blue)]">
                  {entry.label}
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  {entry.title}
                </h3>

                <p className="mt-4 leading-8 text-[var(--color-text-secondary)]">
                  {entry.body}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}