import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import type { TournamentResponse } from '@/features/tournaments/types';

type TournamentOverviewProps = {
  tournament: TournamentResponse;
  teamCount: number | undefined;
  onSelectSection: (section: number) => void;
};

export function TournamentOverview({
  tournament,
  teamCount,
  onSelectSection,
}: TournamentOverviewProps) {
  const summary = [
    { label: 'Host', value: tournament.hostCountry ?? 'Not available' },
    { label: 'Edition', value: tournament.year },
    { label: 'Matches', value: '—' },
    { label: 'Teams', value: teamCount !== undefined ? String(teamCount) : '—' },
  ];

  return (
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
                <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Match totals are not available yet.
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
                onClick={() => onSelectSection(item.section)}
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
  );
}
