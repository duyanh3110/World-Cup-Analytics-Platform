import { useQuery } from '@tanstack/react-query';
import { getTeamById } from '@/features/teams/api';

export function useTeam(id: string | undefined) {
  const validId = id !== undefined && /^[1-9]\d*$/.test(id);

  return useQuery({
    queryKey: ['teams', 'detail', id],
    queryFn: () => {
      if (!id || !validId) throw new Error('Invalid team ID');
      return getTeamById(id);
    },
    enabled: validId,
    retry: false,
  });
}
