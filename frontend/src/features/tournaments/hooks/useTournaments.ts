import { useQuery } from '@tanstack/react-query';
import { getTournaments } from '@/features/tournaments/api';
import type { GetTournamentsParams } from '@/features/tournaments/types';

export function useTournaments({
  page = 0,
  pageSize = 10,
  sortBy = 'year',
  sortOrder = 'desc',
}: GetTournamentsParams = {}) {
  return useQuery({
    queryKey: ['tournaments', { page, pageSize, sortBy, sortOrder }],
    queryFn: () => getTournaments({ page, pageSize, sortBy, sortOrder }),
  });
}
