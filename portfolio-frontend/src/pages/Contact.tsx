import Container from '../components/common/Container';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import FAQ from '../components/contact/FAQ';
import { contactCards } from '../data/contact';

export default function Contact() {
  return (
    <Container className="py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Let's Build Something Great Together
          </h1>
          <p className="mt-4 max-w-md text-[var(--color-text-secondary)]">
            Open for internships, freelance work, and collaboration on interesting backend
            problems.
          </p>
          <Button
            variant="primary"
            className="mt-6"
            onClick={() => window.location.href = `mailto:${contactCards[0].value}`}
          >
            Start a Conversation
          </Button>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {contactCards.map(({ icon: Icon, label, value }) => (
              <GlassCard key={label} className="flex flex-col gap-2">
                <Icon size={18} className="text-[var(--color-accent-blue)]" />
                <span className="font-semibold">{label}</span>
                <span className="text-sm text-[var(--color-text-secondary)]">{value}</span>
              </GlassCard>
            ))}
          </div>
        </div>

        <GlassCard className="flex flex-col gap-4 self-start">
          <h2 className="text-xl font-semibold">Reach Out</h2>
          <input
            placeholder="Name"
            aria-label="Name"
            className="glass rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <input
            placeholder="Email"
            aria-label="Email"
            className="glass rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <textarea
            placeholder="Message"
            aria-label="Message"
            rows={5}
            className="glass rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <Button variant="primary">Send Message</Button>
        </GlassCard>
      </div>

      <div className="mt-20">
        <FAQ />
      </div>
    </Container>
  );
}
