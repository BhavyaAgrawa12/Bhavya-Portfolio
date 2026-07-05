import { useQuery } from '@tanstack/react-query';
import { fetchAllTechnologies } from '../api/technologies.api';

export function useTechnologies() {
  return useQuery({
    queryKey: ['technologies'],
    queryFn: fetchAllTechnologies,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
