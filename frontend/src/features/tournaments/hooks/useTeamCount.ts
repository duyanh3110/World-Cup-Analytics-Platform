import { getTeamCountByTournament } from '@/features/tournaments/api';
import { useQuery } from '@tanstack/react-query';

export function useTeamCount(tournamentId: string | undefined) {
  const validId = tournamentId !== undefined && /^[1-9]\d*$/.test(tournamentId);

  return useQuery({
    queryKey: ['tournaments', 'teamCount', tournamentId],
    queryFn: () => {
      if (!tournamentId || !validId) throw new Error('Invalid tournament ID');
      return getTeamCountByTournament(tournamentId);
    },
    enabled: validId,
    retry: false,
  });
}
