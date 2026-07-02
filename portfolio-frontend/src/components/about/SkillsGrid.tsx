import {
  Code2,
  Server,
  Database,
  Wrench,
} from "lucide-react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import GlassCard from "../common/GlassCard";

const categories = [
  {
    icon: Code2,
    title: "Frontend",
    color: "text-orange-400",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Framer Motion",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "text-emerald-400",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "Prisma",
      "Socket.IO",
    ],
  },
  {
    icon: Database,
    title: "Database",
    color: "text-[var(--color-accent-blue)]",
    skills: [
      "MySQL",
      "MongoDB",
      "SQLite",
    ],
  },
  {
    icon: Wrench,
    title: "Tools",
    color: "text-red-400",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "Docker",
      "Figma",
    ],
  },
];

export default function SkillsGrid() {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          eyebrow="Toolbox"
          title="Tech Stack"
          subtitle="Technologies I use to design, build, and deploy modern software."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, color, skills }) => (
            <GlassCard
              key={title}
              className="group flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <Icon
                    size={26}
                    className={`${color} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>

                <h3 className="text-xl font-semibold">
                  {title}
                </h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}