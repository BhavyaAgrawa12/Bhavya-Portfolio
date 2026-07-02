import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import GlassCard from "../common/GlassCard";

interface EducationItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
}

const items: EducationItem[] = [
  {
    year: "2023",
    title: "Bachelor of Technology (B.Tech)",
    institution: "Your College Name",
    description:
      "Started my Computer Science journey and built a strong foundation in programming, problem-solving, and software development.",
    tags: ["Computer Science", "Programming"],
  },
  {
    year: "2024",
    title: "Web Development Fundamentals",
    institution: "Self Learning",
    description:
      "Learned the fundamentals of web development, including HTML, CSS, and JavaScript, while building a strong understanding of responsive design and modern web concepts.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    year: "2025",
    title: "Frontend Development",
    institution: "Project-Based Learning",
    description:
      "Built multiple responsive and modern static websites, focusing on clean UI design, user experience, and frontend best practices.",
    tags: ["Responsive Design", "Tailwind CSS", "UI Development"],
  },
  {
    year: "2026",
    title: "Full Stack Development",
    institution: "Real-World Projects",
    description:
      "Developed full-stack applications using React, Node.js, Express, Prisma, and MySQL while working on production-oriented projects such as Hotel PMS, TaskFlow, and my personal portfolio.",
    tags: ["React", "Node.js", "Prisma", "MySQL"],
  },
];
export default function EducationTimeline() {
  return (
    <section className="py-24">
  <Container className="flex flex-col gap-14">
    <SectionTitle
      eyebrow="Education"
      title="Learning Journey"
      subtitle="Academic foundation combined with hands-on experience through real-world software development."
    />

    <div className="relative mx-auto w-full max-w-4xl border-l border-white/10 pl-8">
      {items.map((item) => (
        <div
          key={item.year}
          className="relative pb-10 last:pb-0"
        >
          <span className="absolute -left-[2.15rem] top-3 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[var(--color-bg)] bg-[var(--color-accent-blue)]" />

          <GlassCard className="p-6 transition-all duration-300 hover:-translate-y-1">
            <span className="text-sm font-semibold text-[var(--color-accent-blue)]">
              {item.year}
            </span>

            <h3 className="mt-2 text-xl font-bold">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {item.institution}
            </p>

            <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
              {item.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent-blue)] hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      ))}
    </div>
  </Container>
</section>
  );
}
