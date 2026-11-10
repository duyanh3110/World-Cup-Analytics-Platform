import { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardContent,
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
import { colors } from '@/theme';

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

  const summary = [
    { label: 'Host', value: tournament.hostCountry ?? 'Not available' },
    { label: 'Edition', value: tournament.year },
    { label: 'Matches', value: '—' },
    { label: 'Teams', value: '—' },
  ];

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
          {index === 0 ? (
            <Stack spacing={4}>
              <Box component="section" aria-labelledby="tournament-summary-heading">
                <Typography
                  id="tournament-summary-heading"
                  component="h2"
                  variant="subtitle2"
                  sx={{ mb: 2, fontWeight: 700 }}
                >
                  THE TOURNAMENT AT A GLANCE
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 2,
                  }}
                >
                  {summary.map((item) => (
                    <Card key={item.label} elevation={0} sx={{ borderRadius: 0 }}>
                      <CardContent>
                        <Typography variant="overline" color="text.secondary">
                          {item.label}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="p"
                          color="primary"
                          sx={{ fontWeight: 700 }}
                        >
                          {item.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 1 }}
                >
                  Match and team totals are not available yet.
                </Typography>
              </Box>

              <Box component="section" aria-labelledby="tournament-explore-heading">
                <Typography
                  id="tournament-explore-heading"
                  component="h2"
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 700 }}
                >
                  EXPLORE TOURNAMENT DATA
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 2,
                  }}
                >
                  {[
                    {
                      title: 'Participating teams',
                      description: 'Browse national teams and squads',
                      section: 1,
                    },
                    {
                      title: 'Matches & results',
                      description: 'Explore fixtures, scores and statistics',
                      section: 2,
                    },
                  ].map((item) => (
                    <Card key={item.title} elevation={0} sx={{ borderRadius: 0 }}>
                      <CardActionArea
                        onClick={() => setTab(item.section)}
                        sx={{ minHeight: 170, height: '100%', alignItems: 'flex-start' }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            component="h3"
                            variant="h6"
                            color="primary"
                            sx={{ mb: 1, fontWeight: 700 }}
                          >
                            {item.title}
                          </Typography>
                          <Typography variant="body2">{item.description}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Stack>
          ) : (
            <Alert severity="info">{label} data for this tournament is not available yet.</Alert>
          )}
        </Box>
      ))}
    </Stack>
  );
}
