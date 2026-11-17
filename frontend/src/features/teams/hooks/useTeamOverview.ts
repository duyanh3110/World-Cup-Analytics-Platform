import { getTeamOverview } from '@/features/teams/api';
import { useQuery } from '@tanstack/react-query';

export function useTeamOverview(id: string | undefined) {
  const validId = id !== undefined && /^[1-9]\d*$/.test(id);

  return useQuery({
    queryKey: ['teams', 'overview', id],
    queryFn: () => {
      if (!validId) {
        throw new Error('Invalid team ID');
      }
      return getTeamOverview(id);
    },
    enabled: validId,
    retry: false,
  });
}
