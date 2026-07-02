import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Check,
} from 'lucide-react';
import Container from '../components/common/Container';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import DetailSection from '../components/projects/DetailSection';
import { getProject, getProjects } from '../services/projectService';
import type { Project } from '../types/portfolio';

const statusStyles = {
  Live: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'In Development': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Archived: 'bg-white/10 text-gray-400 border border-white/10',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getProjects(), getProject(id ?? '')]).then(
      ([allProjects, selectedProject]) => {
        if (!isMounted) return;

        setProjects(allProjects);
        setProject(selectedProject);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [id]);

  const navigation = useMemo(() => {
    if (!project) return { prev: undefined, next: undefined };

    const index = projects.findIndex((item) => item.id === project.id);
    if (index === -1 || projects.length === 0) {
      return { prev: undefined, next: undefined };
    }

    return {
      prev: projects[(index - 1 + projects.length) % projects.length],
      next: projects[(index + 1) % projects.length],
    };
  }, [project, projects]);

  const galleryItems = useMemo(() => {
    if (project?.gallery?.length) {
      return project.gallery;
    }

    return Array.from({ length: 3 });
  }, [project]);

  const openProjectUrl = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <Container className="py-20">
        <div className="glass rounded-3xl p-16 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-accent-blue)]">
            Loading Project
          </p>
          <h1 className="mt-4 text-4xl font-bold">Preparing project details…</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            Fetching the latest project data. If this takes longer than expected, please refresh the page.
          </p>
        </div>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="py-20">
        <div className="glass rounded-3xl p-16 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-accent-blue)]">
            Project Not Found
          </p>
          <h1 className="mt-4 text-4xl font-bold">We couldn't locate that project</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            The requested project may have been removed or the link may be incorrect. Please return to the projects page and continue exploring.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/projects"
              className="glass inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm hover:bg-white/6"
            >
              <ChevronLeft size={16} /> Back to Projects
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const { prev, next } = navigation;

  return (
    <Container className="py-20">
      <div className="mb-6">
        <Link
          to="/projects"
          className="glass inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm hover:bg-white/6"
        >
          <ChevronLeft size={18} />
          Back to Projects
        </Link>
      </div>

      <GlassCard className="overflow-hidden p-0">
        <div className="aspect-video w-full bg-bg-elevated">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--color-text-secondary)]">
              <ImageIcon size={32} />
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-accent-blue)]">
                {project.category}
              </p>
              <h1 className="mt-4 text-4xl font-bold">{project.title}</h1>
              <p className="mt-4 text-[var(--color-text-secondary)]">{project.shortDescription}</p>
            </div>

            <span
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${statusStyles[project.status]}`}
            >
              {project.status}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && project.githubUrl !== '#' && (
              <Button variant="outline" onClick={() => openProjectUrl(project.githubUrl)}>
                <Github size={16} />
                GitHub
              </Button>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <Button variant="primary" onClick={() => openProjectUrl(project.liveUrl)}>
                <ExternalLink size={16} />
                Live Demo
              </Button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.length > 0 ? (
              project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-[var(--color-text-secondary)]">No technologies listed yet.</span>
            )}
          </div>
        </div>
      </GlassCard>

      <DetailSection title="Project Overview">
        {project.description ? (
          <p className="text-[var(--color-text-secondary)]">{project.description}</p>
        ) : (
          <p className="text-[var(--color-text-secondary)]">No overview is available for this project yet.</p>
        )}
      </DetailSection>

      <DetailSection title="Gallery">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((image, index) => (
            <GlassCard key={index} className="aspect-4/3 p-0 overflow-hidden">
              {typeof image === 'string' && image ? (
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[var(--color-text-secondary)]">
                  <ImageIcon size={28} />
                  <span className="text-sm">No gallery images provided yet.</span>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </DetailSection>

      <DetailSection title="Key Features">
        {project.features.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <GlassCard key={feature} className="flex items-start gap-3 p-6">
                <Check className="mt-1 h-4 w-4 text-emerald-300" />
                <p className="font-semibold">{feature}</p>
              </GlassCard>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)]">No key features are defined yet.</p>
        )}
      </DetailSection>

      <DetailSection title="Tech Stack">
        {project.technologies.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)]">Tech stack details are pending.</p>
        )}
      </DetailSection>

      <DetailSection title="Challenges">
        {project.challenges.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.challenges.map((challenge) => (
              <GlassCard key={challenge} className="p-6">
                <p className="text-[var(--color-text-secondary)]">{challenge}</p>
              </GlassCard>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)]">No challenge notes have been added yet.</p>
        )}
      </DetailSection>

      <DetailSection title="What I Learned">
        {project.learnings.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.learnings.map((learning) => (
              <GlassCard key={learning} className="p-6">
                <p className="text-[var(--color-text-secondary)]">{learning}</p>
              </GlassCard>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)]">Learning outcomes will be updated soon.</p>
        )}
      </DetailSection>

      <DetailSection title="Related Projects">
        {prev || next ? (
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            {prev && (
              <Link
                to={`/projects/${prev.id}`}
                className="glass rounded-lg px-5 py-4 text-sm hover:bg-white/6"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                  <ChevronLeft size={16} /> Previous Project
                </div>
                <div className="mt-2 font-semibold">{prev.title}</div>
              </Link>
            )}

            {next && (
              <Link
                to={`/projects/${next.id}`}
                className="glass rounded-lg px-5 py-4 text-sm hover:bg-white/6"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                  Next Project <ChevronRight size={16} />
                </div>
                <div className="mt-2 font-semibold">{next.title}</div>
              </Link>
            )}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)]">No related projects are available right now.</p>
        )}
      </DetailSection>

      <DetailSection title="Interested in this project?">
        <p className="text-[var(--color-text-secondary)]">Let’s build something together.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && project.liveUrl !== '#' ? (
            <Button variant="primary" onClick={() => openProjectUrl(project.liveUrl)}>
              Launch Live Project
            </Button>
          ) : null}
          {project.githubUrl && project.githubUrl !== '#' ? (
            <Button variant="outline" onClick={() => openProjectUrl(project.githubUrl)}>
              View Source Code
            </Button>
          ) : null}
          <Link
            to="/projects"
            className="glass inline-flex items-center rounded-lg px-5 py-3 text-sm hover:bg-white/6"
          >
            ← Back to Projects
          </Link>
        </div>
      </DetailSection>
    </Container>
  );
}
