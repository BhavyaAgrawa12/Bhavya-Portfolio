import { useQuery } from '@tanstack/react-query';
import { fetchAllSkills } from '../api/skills.api';

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: fetchAllSkills,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
