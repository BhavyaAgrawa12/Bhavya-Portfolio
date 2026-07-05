import { useQuery } from '@tanstack/react-query';
import { fetchAllProjects, fetchProjectBySlug } from '../api/projects.api';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchAllProjects,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const all = await fetchAllProjects();
      return all.filter((p) => p.featured);
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['projects', slug],
    queryFn: () => fetchProjectBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}
