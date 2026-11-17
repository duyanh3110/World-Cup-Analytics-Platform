import { apiClient } from '@/shared/api/client';
import type { TeamOverviewResponse, TeamResponse } from '@/features/teams/types';

export async function getTeamById(id: string): Promise<TeamResponse> {
  const response = await apiClient.get<TeamResponse>(`/teams/${encodeURIComponent(id)}`);
  return response.data;
}

export async function getTeamOverview(id: string): Promise<TeamOverviewResponse> {
  const response = await apiClient.get<TeamOverviewResponse>(
    `/teams/${encodeURIComponent(id)}/overview`,
  );
  return response.data;
}
