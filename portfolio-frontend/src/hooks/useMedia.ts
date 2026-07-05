import { useQuery } from '@tanstack/react-query';
import { fetchAllMedia } from '../api/media.api';

export function useMedia() {
  return useQuery({
    queryKey: ['media'],
    queryFn: fetchAllMedia,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}
