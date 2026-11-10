import { useQuery } from '@tanstack/react-query';
import { getTournamentById } from '@/features/tournaments/api';

export function useTournament(id: string | undefined) {
  // Keep IDs as strings to avoid losing precision when routing a Java Long.
  const validId = id !== undefined && /^[1-9]\d*$/.test(id);

  return useQuery({
    queryKey: ['tournaments', 'detail', id],
    queryFn: () => {
      if (!id || !validId) throw new Error('Invalid tournament ID');
      return getTournamentById(id);
    },
    enabled: validId,
    retry: false,
  });
}
