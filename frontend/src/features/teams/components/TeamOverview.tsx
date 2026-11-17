import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useTeamOverview } from '@/features/teams/hooks/useTeamOverview';

type TeamOverviewProps = {
  teamId: string;
  onSelectSection: (section: number) => void;
};

export function TeamOverview({ teamId, onSelectSection }: TeamOverviewProps) {
  const { data, isPending, isError, isFetching, refetch } = useTeamOverview(teamId);

  if (isPending) {
    return <CircularProgress aria-label="Loading team overview" />;
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" disabled={isFetching} onClick={() => void refetch()}>
            Retry
          </Button>
        }
      >
        Unable to load team overview. Please try again.
      </Alert>
    );
  }

  const summary = [
    { label: 'Matches', value: data.recordedMatches },
    { label: 'Goals', value: data.recordedGoals ?? '—' },
  ];

  return (
    <Stack spacing={4}>
      <Box component="section" aria-labelledby="team-summary-heading">
        <Typography
          id="team-summary-heading"
          component="h2"
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          TEAM AT A GLANCE
        </Typography>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}
        >
          {summary.map((item) => (
            <Card key={item.label} elevation={0} sx={{ borderRadius: 0 }}>
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography component="p" variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Card elevation={0} sx={{ borderRadius: 0 }}>
        <CardActionArea onClick={() => onSelectSection(1)} sx={{ minHeight: 170 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography
              component="h3"
              variant="h6"
              color="primary"
              sx={{ mb: 1, fontWeight: 700 }}
            >
              Players
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Squad information by tournament
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
