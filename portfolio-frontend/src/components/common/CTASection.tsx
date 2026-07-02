import Container from "../common/Container";
import Button from "../common/Button";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  title = "Let's Build Something Great Together",
  subtitle = "I'm currently looking for internships, freelance opportunities, and exciting projects where I can build impactful software and continue growing as a Full Stack Developer.",
}: CTASectionProps) {
  return (
    <section
      id="contact"
      className="relative py-24"
    >
      <Container>
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-20 text-center">

          {/* Background Glow */}

          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-accent-blue)]/10 blur-[120px]" />

          <div className="relative">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-blue)]">
              LET'S CONNECT
            </p>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              {title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-[var(--color-text-secondary)]">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

  <Button
    variant="primary"
    className="group"
    onClick={() => {
      window.location.href = "mailto:agrawalbhavya563.com";
    }}
  >
    Contact Me

    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </Button>

  <Button
    variant="outline"
    className="transition-all duration-300 hover:border-[var(--color-ac cent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
    onClick={() => {
      window.open("/resume.pdf", "_blank");
    }}
  >
    Download Resume
  </Button>

</div>

          </div>

        </div>
      </Container>
    </section>
  );
}