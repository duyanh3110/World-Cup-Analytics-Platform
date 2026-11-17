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
import { TeamMatches } from '@/features/teams/components/TeamMatches';
import { TeamOverview } from '@/features/teams/components/TeamOverview';
import { TeamSquad } from '@/features/teams/components/TeamSquad';
import { useTeam } from '@/features/teams/hooks/useTeam';

const sections = ['Overview', 'Squad', 'Matches'];

export function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [tab, setTab] = useState(0);
  const { data: team, isPending, isError, error, isFetching, refetch } = useTeam(teamId);

  if (!teamId || !/^[1-9]\d*$/.test(teamId)) {
    return (
      <Stack spacing={2}>
        <Alert severity="warning">Invalid team ID.</Alert>
        <Button component={RouterLink} to={paths.tournaments}>
          Back to tournaments
        </Button>
      </Stack>
    );
  }

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress aria-label="Loading team details" />
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
              <Button color="inherit" disabled={isFetching} onClick={() => void refetch()}>
                Retry
              </Button>
            )
          }
        >
          {notFound ? 'Team not found.' : 'Unable to load team details. Please try again.'}
        </Alert>
        <Button component={RouterLink} to={paths.tournaments}>
          Back to tournaments
        </Button>
      </Stack>
    );
  }

  return (
    <Stack component="main" spacing={3}>
      <Stack
        component="header"
        spacing={3}
        sx={{
          p: { xs: 3, md: 5 },
          minHeight: { md: 280 },
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Breadcrumbs aria-label="Breadcrumb" sx={{ color: 'secondary.main', fontSize: '0.75rem' }}>
          <Link component={RouterLink} to={paths.home} color="inherit" underline="hover">
            Home
          </Link>
          <Link component={RouterLink} to={paths.tournaments} color="inherit" underline="hover">
            Tournaments
          </Link>
          <Typography color="inherit" sx={{ fontSize: 'inherit' }} aria-current="page">
            Team details
          </Typography>
        </Breadcrumbs>
        <Typography component="h1" variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.25rem' } }}>
          {team.teamName}
        </Typography>
        <Typography sx={{ opacity: 0.85 }}>
          FIFA code: {team.fifaCode} - Confederation: {team.confederation ?? 'Not available'}
        </Typography>
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, value: number) => setTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Team sections"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        {sections.map((label, index) => (
          <Tab
            key={label}
            label={label}
            id={`team-tab-${index}`}
            aria-controls={`team-panel-${index}`}
          />
        ))}
      </Tabs>

      {sections.map((label, index) => (
        <Box
          key={label}
          role="tabpanel"
          hidden={tab !== index}
          id={`team-panel-${index}`}
          aria-labelledby={`team-tab-${index}`}
          tabIndex={0}
        >
          {index === 0 && tab === 0 && <TeamOverview teamId={teamId} onSelectSection={setTab} />}
          {index === 1 && tab === 1 && <TeamSquad />}
          {index === 2 && tab === 2 && <TeamMatches />}
        </Box>
      ))}
    </Stack>
  );
}
