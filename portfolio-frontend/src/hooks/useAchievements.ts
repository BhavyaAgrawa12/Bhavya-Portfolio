import { useQuery } from '@tanstack/react-query';
import { fetchAllAchievements } from '../api/achievements.api';

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: fetchAllAchievements,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
