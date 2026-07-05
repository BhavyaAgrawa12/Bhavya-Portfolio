import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../api/dashboard.api';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 60 * 1000, // 1 min — dashboard data changes more frequently
    retry: 2,
  });
}
