import { useQuery } from '@tanstack/react-query';
import { fetchAllEducation } from '../api/education.api';

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: fetchAllEducation,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
