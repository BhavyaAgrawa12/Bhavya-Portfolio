import { fetchAllProjects, fetchProjectBySlug } from '../api/projects.api';
import type { ApiProject } from '../types/api';
import { mediaUrl } from '../lib/mediaUrl';

const STATUS_MAP: Record<string, string> = {
  LIVE: 'Live',
  IN_DEVELOPMENT: 'In Development',
  ARCHIVED: 'Archived',
};

const CATEGORY_MAP: Record<string, string> = {
  FULL_STACK: 'Full Stack',
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  ACADEMIC: 'Academic',
  PERSONAL: 'Personal',
};

export function adaptProject(p: ApiProject) {
  return {
    id: p.slug,
    _dbId: p.id,
    title: p.title,
    slug: p.slug,
    category: (CATEGORY_MAP[p.category] ?? p.category) as
      | 'Full Stack' | 'Frontend' | 'Backend' | 'Academic' | 'Personal',
    featured: p.featured,
    shortDescription: p.shortDescription,
    description: p.description,
    // Use mediaUrl() — returns Cloudinary URLs unchanged, handles legacy /uploads/ paths
    image: mediaUrl(p.thumbnail?.fileUrl) ?? '',
    gallery: p.images.map((img) => mediaUrl(img.media.fileUrl) ?? ''),
    status: (STATUS_MAP[p.status] ?? p.status) as 'Live' | 'In Development' | 'Archived',
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
