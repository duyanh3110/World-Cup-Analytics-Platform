export type TeamResponse = {
  id: number;
  teamName: string;
  fifaCode: string;
  confederation: string | null;
};

export type TeamOverviewResponse = {
  recordedMatches: number;
  recordedGoals: number | null;
};
