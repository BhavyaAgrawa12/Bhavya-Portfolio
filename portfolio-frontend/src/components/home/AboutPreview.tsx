import { useNavigate } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";
import GlassCard from "../common/GlassCard";

const stats = [
  {
    value: "10+",
    label: "Projects Built",
  },
  {
    value: "20+",
    label: "Technologies",
  },
  {
    value: "3+",
    label: "Years Learning",
  },
];

export default function AboutPreview() {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="relative py-24"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <GlassCard className="group flex aspect-[4/5] w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:border-[var(--color-accent-blue)]/40">
          <div className="text-center">
            <p className="text-xl font-semibold text-white">
              Profile Image
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
              Your profile image will be uploaded
              <br />
              from the Admin Panel.
            </p>
          </div>
        </GlassCard>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-blue)]">
            ABOUT ME
          </p>

          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            Passionate About Building
            <br />
            Modern Software
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-[var(--color-text-secondary)]">
            I'm <strong>Bhavya Agrawal</strong>, a Computer Science student
            and Full Stack Developer passionate about building scalable web
            applications, backend systems, and modern digital experiences.

            <br />
            <br />

            I enjoy transforming ideas into production-ready software while
            continuously learning new technologies, software architecture,
            cloud computing, and backend engineering.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <GlassCard
                key={stat.label}
                hover={false}
                className="group p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40"
              >
                <span className="block text-3xl font-bold text-[var(--color-accent-blue)] transition-transform duration-300 group-hover:scale-110">
                  {stat.value}
                </span>

                <span className="mt-2 block text-sm text-[var(--color-text-secondary)]">
                  {stat.label}
                </span>
              </GlassCard>
            ))}
          </div>

          <Button
            variant="outline"
            className="group mt-10 transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            onClick={() => navigate("/experience")}
          >
            <span>Explore My Journey</span>

            <span className="ml-2 transition-all duration-300 group-hover:translate-x-2">
              →
            </span>
          </Button>
          
        </div>
      </Container>
    </section>
  );
}