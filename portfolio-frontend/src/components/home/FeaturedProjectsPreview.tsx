import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import ProjectCard from "../projects/ProjectCard";
import { projects } from "../../data/";

export default function projectsPreview() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      id="projects"
      className="relative py-24"
    >
      <Container className="flex flex-col gap-14">
        <SectionTitle
          eyebrow="PORTFOLIO"
          title="Featured Projects"
          subtitle="A collection of projects that showcase my experience in full-stack development, backend engineering, modern UI design, and scalable software architecture."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="group transition-all duration-300 hover:border-accent-blue hover:bg-accent-blue/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            onClick={() => {
              window.location.href = "/projects";
            }}
          >
            <span>View All Projects</span>

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>
      </Container>
    </section>
  );
}