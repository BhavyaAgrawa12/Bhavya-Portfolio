import { useQuery } from '@tanstack/react-query';
import { fetchAllInternships } from '../api/internships.api';

export function useInternships() {
  return useQuery({
    queryKey: ['internships'],
    queryFn: fetchAllInternships,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
