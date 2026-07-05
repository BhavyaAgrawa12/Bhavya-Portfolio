/**
 * Thin adapter so existing page-level useEffect calls keep working.
 * These delegate to the real API hooks; for components that still call
 * these functions directly we do a plain fetch here.
 * New components should use the useProjects() / useProject() hooks instead.
 */
import { fetchAllProjects, fetchProjectBySlug } from '../api/projects.api';
import type { ApiProject } from '../types/api';

// Map backend ProjectStatus to frontend display value
const STATUS_MAP: Record<string, string> = {
  LIVE: 'Live',
  IN_DEVELOPMENT: 'In Development',
  ARCHIVED: 'Archived',
};

// Map backend ProjectCategory to frontend display value
const CATEGORY_MAP: Record<string, string> = {
  FULL_STACK: 'Full Stack',
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  ACADEMIC: 'Academic',
  PERSONAL: 'Personal',
};

export function adaptProject(p: ApiProject) {
  return {
    id: p.slug, // frontend routes by slug
    _dbId: p.id,
    title: p.title,
    slug: p.slug,
    category: (CATEGORY_MAP[p.category] ?? p.category) as
      | 'Full Stack'
      | 'Frontend'
      | 'Backend'
      | 'Academic'
      | 'Personal',
    featured: p.featured,
    shortDescription: p.shortDescription,
    description: p.description,
    image: p.thumbnail?.fileUrl
      ? `${import.meta.env.VITE_UPLOADS_BASE_URL}${p.thumbnail.fileUrl}`
      : '',
    gallery: p.images.map(
      (img) => `${import.meta.env.VITE_UPLOADS_BASE_URL}${img.media.fileUrl}`,
    ),
    status: (STATUS_MAP[p.status] ?? p.status) as
      | 'Live'
      | 'In Development'
      | 'Archived',
    technologies: p.technologies.map((t) => t.technology.name),
    features: (p.features as string[]) ?? [],
    challenges: (p.challenges as string[]) ?? [],
    learnings: (p.learnings as string[]) ?? [],
    githubUrl: p.githubUrl ?? '#',
    liveUrl: p.liveUrl ?? '#',
  };
}

export async function getProjects() {
  const data = await fetchAllProjects();
  return data.map(adaptProject);
}

export async function getFeaturedProjects() {
  const data = await fetchAllProjects();
  return data.filter((p) => p.featured).map(adaptProject);
}

export async function getProject(slugOrId: string) {
  try {
    const data = await fetchProjectBySlug(slugOrId);
    return adaptProject(data);
  } catch {
    return undefined;
  }
}

export async function getProjectsByCategory(category: string) {
  const data = await fetchAllProjects();
  if (category === 'All') return data.map(adaptProject);
  return data
    .filter((p) => CATEGORY_MAP[p.category] === category)
    .map(adaptProject);
}
