import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import type { TournamentResponse } from '@/features/tournaments/types';
import { colors } from '@/theme';

type TournamentCardProps = {
  tournament: TournamentResponse;
  alternate?: boolean;
};

export function TournamentCard({ tournament, alternate = false }: TournamentCardProps) {
  function handleViewTournament() {
    // TODO: Navigate to the tournament detail route when it is available.
    console.log('Redirect to tournament detail view:', tournament.id);
  }

  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        aria-hidden="true"
        sx={{ height: 72, bgcolor: alternate ? colors.panel : 'primary.main' }}
      />
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Typography component="h3" variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
          {tournament.year} / {tournament.hostCountry ?? 'Host not available'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {tournament.tournamentName}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={handleViewTournament}
          aria-label={`View ${tournament.tournamentName}`}
        >
          View tournament
        </Button>
      </CardActions>
    </Card>
  );
}
