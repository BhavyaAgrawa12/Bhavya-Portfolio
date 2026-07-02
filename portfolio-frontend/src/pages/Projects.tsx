import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import Container from "../components/common/Container";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import ProjectCard from "../components/projects/ProjectCard";
import { getProjects } from "../services/projectService";
import type { Project } from "../types/portfolio";

const filters = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Academic",
  "Personal",
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [projectData, setProjectData] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjectData);
  }, []);

  const filteredProjects = useMemo(() => {
    return projectData.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      if (activeFilter === "All") return matchesSearch;

      return (
        project.category === activeFilter &&
        matchesSearch
      );
    });
  }, [activeFilter, projectData, search]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/3 top-0 h-96 w-96 rounded-full bg-[var(--color-accent-blue)]/10 blur-[140px]" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge>Portfolio</Badge>

            <h1 className="mt-6 text-5xl font-black leading-tight lg:text-6xl">
              Building Software That
              <br />
              <span className="text-gradient">
                Solves Real-World Problems
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-[var(--color-text-secondary)]">
              A collection of full-stack applications, backend systems,
              responsive websites, and modern software built throughout my
              engineering journey.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("project-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container>
        {/* Search + Filters */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="glass flex w-full max-w-md items-center gap-3 rounded-2xl px-5 py-3 transition-all duration-300 focus-within:border focus-within:border-[var(--color-accent-blue)]">
            <Search
              size={18}
              className="text-[var(--color-text-muted)]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-xl px-5 py-2.5 text-sm transition-all duration-300 ${
                  activeFilter === filter
                    ? "glass border border-[var(--color-accent-blue)] text-white"
                    : "text-[var(--color-text-secondary)] hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}

        <div
          id="project-grid"
          className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))
          ) : (
            <div className="glass col-span-full rounded-3xl p-12 text-center text-[var(--color-text-secondary)]">
              No projects added yet.
            </div>
          )}
        </div>

        {/* Stats */}

        <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ["7+", "Projects"],
            ["20+", "Technologies"],
            ["4+", "Full Stack Apps"],
            ["100%", "Responsive"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="glass rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)]/40"
            >
              <h2 className="text-4xl font-black text-[var(--color-accent-blue)]">
                {value}
              </h2>

              <p className="mt-3 text-[var(--color-text-secondary)]">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="glass mt-24 rounded-3xl p-16 text-center">
          <h2 className="text-4xl font-bold">
            Have an Idea?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[var(--color-text-secondary)]">
            I'm always excited to collaborate on innovative projects,
            solve challenging problems, and build high-quality software.
            Let's create something impactful together.
          </p>

          <Button
            variant="primary"
            className="mt-8"
            onClick={() => (window.location.href = "/contact")}
          >
            Let's Work Together
          </Button>
        </div>
      </Container>
    </>
  );
}