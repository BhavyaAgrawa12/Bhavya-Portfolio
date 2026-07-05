import { useQuery } from '@tanstack/react-query';
import { fetchPortfolio } from '../api/portfolio.api';

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    staleTime: 0,           // always refetch — portfolio changes in admin must appear instantly
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
