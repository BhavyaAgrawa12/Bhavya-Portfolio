import { Github, ExternalLink, ImageIcon } from 'lucide-react';

import GlassCard from '../common/GlassCard';
import type { Project } from '../../types/portfolio';

const statusStyles: Record<Project['status'], string> = {
  Live: 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20',
  'In Development': 'bg-amber-500/10 text-amber-400 border border-amber-400/20',
  Archived: 'bg-white/10 text-[var(--color-text-secondary)] border border-white/10',
};

export default function ProjectCard({ project }: { project: Project }) {
  const openUrl = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation(); // don't navigate to detail page when clicking a link button
    if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
  };

  const hasGithub = project.githubUrl && project.githubUrl !== '#';
  const hasLive = project.liveUrl && project.liveUrl !== '#';

  return (
    <GlassCard
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-accent-blue)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,.45)]"
      onClick={() => { window.location.href = `/projects/${project.id}`; }}
    >
      {/* Thumbnail */}
      <div className="flex aspect-video items-center justify-center border-b border-white/10 bg-[var(--color-bg-elevated)] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
            <ImageIcon size={34} />
            <span className="text-sm">Project Preview</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>

        <p className="mt-4 flex-1 leading-7 text-[var(--color-text-secondary)]">
          {project.shortDescription || project.description}
        </p>

        {/* Tech pills */}
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

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={(e) => openUrl(e, project.githubUrl)}
            disabled={!hasGithub}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              hasGithub
                ? 'border-white/10 bg-white/5 text-[var(--color-text-primary)] hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10'
                : 'cursor-not-allowed border-white/5 bg-white/3 text-[var(--color-text-muted)] opacity-50'
            }`}
          >
            <Github size={15} />
            <span>GitHub</span>
          </button>

          <button
            onClick={(e) => openUrl(e, project.liveUrl)}
            disabled={!hasLive}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              hasLive
                ? 'bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] text-white hover:opacity-90'
                : 'cursor-not-allowed bg-white/5 text-[var(--color-text-muted)] opacity-50'
            }`}
          >
            <ExternalLink size={15} />
            <span>Live Demo</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
