export type TournamentResponse = {
  id: number;
  tournamentName: string;
  year: number;
  hostCountry: string | null;
  startDate: string | null;
  endDate: string | null;
};

export type TournamentTeamResponse = {
  id: number;
  tournamentId: number;
  teamId: number;
  teamName: string;
  fifaCode: string;
  confederation: string | null;
  groupLetter: string | null;
  fifaRankingPreTournament: number | null;
};

export type GetTournamentsParams = {
  page?: number;
  pageSize?: number;
  sortBy?: 'year' | 'tournamentName' | 'hostCountry';
  sortOrder?: 'asc' | 'desc';
};

export type GetTournamentTeamsParams = {
  id: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'team.teamName' | 'team.fifaCode' | 'team.confederation';
  sortOrder?: 'asc' | 'desc';
};
