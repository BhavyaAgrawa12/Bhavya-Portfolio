import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../common/Container";
import Badge from "../common/Badge";
import Button from "../common/Button";

const socials = [
  {
    icon: Github,
    href: "https://github.com/BhavyaAgrawa12",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/bhavya-agrawal-212052291",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:agrawalbhavya563@gmail.com",
    label: "Email",
  },
];

export default function Hero() {
  const scrollToProjects = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-24 lg:pt-8">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent-purple/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-accent-blue/20 blur-[120px]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <Badge>Available for Opportunities</Badge>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight lg:text-6xl xl:text-7xl">
            Hi, I'm{" "}
            <span className="text-gradient">
              Bhavya Agrawal
            </span>
          </h1>

          <p className="mt-6 text-lg font-medium text-text-secondary">
            Computer Science Student
            <span className="mx-3 text-accent-blue">•</span>
            Full Stack Developer
            <span className="mx-3 text-accent-blue">•</span>
            Backend Developer
          </p>

          <p className="mt-8 max-w-xl leading-8 text-text-secondary">
            I'm a Computer Science student passionate about building scalable
            web applications, backend systems, and modern digital experiences.
            I enjoy transforming ideas into production-ready software while
            continuously learning new technologies and solving real-world
            problems.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={scrollToProjects}
            >
              View Projects
            </Button>

            <Button
              variant="outline"
              onClick={downloadResume}
            >
              Download Resume
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass relative flex aspect-[4/3] items-center justify-center rounded-3xl border border-white/10"
        >
          <div className="text-center">
            <p className="text-lg font-semibold text-white">
              Hero Workspace
            </p>

            <p className="mt-2 text-sm text-text-muted">
              VS Code • Terminal • Dashboard • Analytics
            </p>

            <p className="mt-1 text-xs text-text-muted">
              (We'll replace this with the premium workspace component next.)
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}