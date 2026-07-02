import { Github, ExternalLink, ImageIcon } from "lucide-react";

import GlassCard from "../common/GlassCard";
import Button from "../common/Button";

import type { Project } from "../../types/portfolio";

const statusStyles: Record<Project["status"], string> = {
  Live:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20",

  "In Development":
    "bg-amber-500/10 text-amber-400 border border-amber-400/20",

  Archived:
    "bg-white/10 text-[var(--color-text-secondary)] border border-white/10",
};

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <GlassCard className="group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-accent-blue)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,.45)]">

      {/* Project Image */}

      <div className="flex aspect-video items-center justify-center border-b border-white/10 bg-[var(--color-bg-elevated)]">

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
            <ImageIcon size={34} />

            <span className="text-sm">
              Project Preview
            </span>
          </div>
        )}

      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-6">

        <div className="flex items-start justify-between gap-4">

          <h3 className="text-xl font-bold">
            {project.title}
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>

        </div>

        <p className="mt-4 flex-1 leading-7 text-[var(--color-text-secondary)]">
          {project.description}
        </p>

        {/* Technologies */}

        <div className="mt-5 flex flex-wrap gap-2">

          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-secondary)] transition duration-300 hover:border-[var(--color-accent-blue)] hover:text-white"
            >
              {tech}
            </span>
          ))}

        </div>

        {/* Buttons */}

        <div className="mt-6 flex gap-3">

          <Button
            variant="outline"
            className="flex-1"
          >
            <Github size={16} />

            <span>GitHub</span>
          </Button>

          <Button
            variant="primary"
            className="flex-1"
          >
            <ExternalLink size={16} />

            <span>Live Demo</span>
          </Button>

        </div>

      </div>

    </GlassCard>
  );
}