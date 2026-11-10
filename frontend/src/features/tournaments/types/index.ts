export type TournamentResponse = {
  id: number;
  tournamentName: string;
  year: number;
  hostCountry: string | null;
  startDate: string | null;
  endDate: string | null;
};

export type GetTournamentsParams = {
  page?: number;
  pageSize?: number;
  sortBy?: 'year' | 'tournamentName' | 'hostCountry';
  sortOrder?: 'asc' | 'desc';
};
