import type {
  GetTournamentsParams,
  GetTournamentTeamsParams,
  TournamentResponse,
  TournamentTeamResponse,
} from '@/features/tournaments/types';
import { apiClient } from '@/shared/api/client';
import type { PageResponse } from '@/shared/types';

export async function getTournaments({
  page = 0,
  pageSize = 10,
  sortBy = 'year',
  sortOrder = 'desc',
}: GetTournamentsParams): Promise<PageResponse<TournamentResponse>> {
  const response = await apiClient.get<PageResponse<TournamentResponse>>('/tournaments', {
    params: {
      page,
      size: pageSize,
      sort: `${sortBy},${sortOrder}`,
    },
  });

  return response.data;
}

export async function getTournamentTeams({
  id,
  page = 0,
  pageSize = 10,
  sortBy = 'team.teamName',
  sortOrder = 'desc',
}: GetTournamentTeamsParams): Promise<PageResponse<TournamentTeamResponse>> {
  const response = await apiClient.get<PageResponse<TournamentTeamResponse>>(
    `/tournaments/${encodeURIComponent(id)}/teams`,
    {
      params: {
        page,
        size: pageSize,
        sort: `${sortBy},${sortOrder}`,
      },
    },
  );

  return response.data;
}

export async function getTournamentById(id: string): Promise<TournamentResponse> {
  const response = await apiClient.get<TournamentResponse>(
    `/tournaments/${encodeURIComponent(id)}`,
  );
  return response.data;
}

export async function getTeamCountByTournament(tournamentId: string): Promise<number> {
  const response = await apiClient.get<number>(
    `/tournaments/${encodeURIComponent(tournamentId)}/teams/count`,
  );
  return response.data;
}
