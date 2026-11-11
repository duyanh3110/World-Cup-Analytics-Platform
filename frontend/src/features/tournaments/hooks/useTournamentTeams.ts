import { useQuery } from '@tanstack/react-query';
import { getTournamentTeams } from '@/features/tournaments/api';
import type { GetTournamentTeamsParams } from '@/features/tournaments/types';

export function useTournamentTeams({
  id,
  page = 0,
  pageSize = 10,
  sortBy = 'team.teamName',
  sortOrder = 'desc',
}: GetTournamentTeamsParams) {
  return useQuery({
    queryKey: ['tournamentTeams', id, { page, pageSize, sortBy, sortOrder }],
    queryFn: () => getTournamentTeams({ id, page, pageSize, sortBy, sortOrder }),
  });
}
