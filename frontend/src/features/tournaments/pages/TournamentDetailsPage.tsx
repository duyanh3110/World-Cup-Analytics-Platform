import { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router';
import { paths } from '@/app/router/paths';
import { useTournament } from '@/features/tournaments/hooks/useTournament';
import { TournamentOverview } from '@/features/tournaments/components/TournamentOverview';
import { TournamentTeams } from '@/features/tournaments/components/TournamentTeams';
import { colors } from '@/theme';
import { useTeamCount } from '@/features/tournaments/hooks/useTeamCount';

const sections = ['Overview', 'Teams', 'Matches', 'Statistics'];

export function TournamentDetailsPage() {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const [tab, setTab] = useState(0);
  const {
    data: tournament,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useTournament(tournamentId);
  const { data: teamCount } = useTeamCount(tournamentId);

  if (!tournamentId || !/^[1-9]\d*$/.test(tournamentId)) {
    return (
      <Stack spacing={2}>
        <Alert severity="warning">Invalid tournament ID.</Alert>
        <Button component={RouterLink} to={paths.tournaments}>
          Back to tournaments
        </Button>
      </Stack>
    );
  }

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress aria-label="Loading tournament details" />
      </Box>
    );
  }

  if (isError) {
    const notFound = axios.isAxiosError(error) && error.response?.status === 404;
    return (
      <Stack spacing={2}>
        <Alert
          severity={notFound ? 'info' : 'error'}
          action={
            !notFound && (
              <Button color="inherit" onClick={() => void refetch()} disabled={isFetching}>
                Retry
              </Button>
            )
          }
        >
          {notFound
            ? 'Tournament not found.'
            : 'Unable to load tournament details. Please try again.'}
        </Alert>
        <Button component={RouterLink} to={paths.tournaments}>
          Back to tournaments
        </Button>
      </Stack>
    );
  }

  return (
    <Stack component="main" spacing={3}>
      <Box
        component="header"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '7fr 3fr' },
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Stack spacing={3} sx={{ p: { xs: 3, md: 5 }, minHeight: { md: 280 } }}>
          <Breadcrumbs
            aria-label="Breadcrumb"
            sx={{ color: 'secondary.main', fontSize: '0.75rem' }}
          >
            <Link component={RouterLink} to={paths.home} color="inherit" underline="hover">
              Home
            </Link>
            <Link component={RouterLink} to={paths.tournaments} color="inherit" underline="hover">
              Tournaments
            </Link>
            <Typography color="inherit" sx={{ fontSize: 'inherit' }} aria-current="page">
              Tournament details
            </Typography>
          </Breadcrumbs>
          <Typography component="h1" variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.25rem' } }}>
            {tournament.tournamentName}
          </Typography>
          <Typography sx={{ opacity: 0.85 }}>
            Tournament overview · Host: {tournament.hostCountry ?? 'Not available'}
          </Typography>
        </Stack>
        <Box
          sx={{
            bgcolor: colors.panel,
            color: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Typography component="p" variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>
            {tournament.year}
          </Typography>
        </Box>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, value: number) => setTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Tournament sections"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {sections.map((label, index) => (
          <Tab
            key={label}
            label={label}
            id={`tournament-tab-${index}`}
            aria-controls={`tournament-panel-${index}`}
          />
        ))}
      </Tabs>

      {sections.map((label, index) => (
        <Box
          key={label}
          role="tabpanel"
          hidden={tab !== index}
          id={`tournament-panel-${index}`}
          aria-labelledby={`tournament-tab-${index}`}
          tabIndex={0}
        >
          {index === 0 && tab === 0 && (
            <TournamentOverview
              tournament={tournament}
              teamCount={teamCount}
              onSelectSection={setTab}
            />
          )}
          {index === 1 && tab === 1 && (
            <TournamentTeams key={tournamentId} tournamentId={tournamentId} />
          )}
          {index > 1 && tab === index && (
            <Alert severity="info">{label} data for this tournament is not available yet.</Alert>
          )}
        </Box>
      ))}
    </Stack>
  );
}
