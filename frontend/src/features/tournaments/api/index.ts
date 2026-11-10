import type { GetTournamentsParams, TournamentResponse } from '@/features/tournaments/types';
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
