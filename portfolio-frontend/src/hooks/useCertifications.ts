import { useQuery } from '@tanstack/react-query';
import { fetchAllCertifications } from '../api/certifications.api';

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: fetchAllCertifications,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
