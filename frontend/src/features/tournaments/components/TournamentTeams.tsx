import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { TournamentTeamCard } from '@/features/tournaments/components/TournamentTeamCard';
import { useTournamentTeams } from '@/features/tournaments/hooks/useTournamentTeams';

type TournamentTeamsProps = {
  tournamentId: string;
};

export function TournamentTeams({ tournamentId }: TournamentTeamsProps) {
  const [page, setPage] = useState(0);
  const {
    data: teamsPage,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useTournamentTeams({ id: tournamentId, page, pageSize: 6 });

  return (
    <Stack component="section" spacing={3} aria-labelledby="participating-teams-heading">
      <Typography
        id="participating-teams-heading"
        component="h2"
        variant="h6"
        sx={{ fontWeight: 700 }}
      >
        PARTICIPATING TEAMS
      </Typography>

      {isPending ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress aria-label="Loading teams" />
        </Box>
      ) : isError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" disabled={isFetching} onClick={() => void refetch()}>
              Retry
            </Button>
          }
        >
          Unable to load teams. Please try again.
        </Alert>
      ) : (
        <>
          {teamsPage.data.length === 0 ? (
            <Alert severity="info">No teams available on this page.</Alert>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  md: 'repeat(3, minmax(0, 1fr))',
                },
                gap: 3,
              }}
            >
              {teamsPage.data.map((team, index) => (
                <TournamentTeamCard key={team.id} team={team} alternate={index % 2 === 1} />
              ))}
            </Box>
          )}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
          >
            <Typography variant="body2" color="text.secondary" role="status">
              {teamsPage.data.length > 0
                ? `Showing ${teamsPage.page * teamsPage.size + 1}–${teamsPage.page * teamsPage.size + teamsPage.data.length} of ${teamsPage.totalCounts} teams`
                : `Showing 0 of ${teamsPage.totalCounts} teams`}
            </Typography>
            {teamsPage.totalPages > 0 && (
              <Pagination
                aria-label="Team pages"
                count={teamsPage.totalPages}
                page={page + 1}
                onChange={(_, value) => setPage(value - 1)}
                color="primary"
                shape="rounded"
                size="small"
                disabled={isFetching}
              />
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}
