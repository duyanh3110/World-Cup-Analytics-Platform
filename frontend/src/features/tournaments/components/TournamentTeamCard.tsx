import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { colors } from '@/theme';
import type { TournamentTeamResponse } from '@/features/tournaments/types';

type TournamentTeamCardProps = {
  team: TournamentTeamResponse;
  alternate?: boolean;
};

export function TournamentTeamCard({ team, alternate = false }: TournamentTeamCardProps) {
  function handleViewTeam() {
    // TODO: Navigate to the team detail page after integrating real team data.
    console.log('Redirect to team detail view:', team.teamName);
  }
  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        aria-hidden="true"
        sx={{
          height: 72,
          bgcolor: alternate ? colors.panel : 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          component="h3"
          variant="h6"
          sx={{ color: 'primary.contrastText', fontWeight: 700 }}
        >
          {team.teamName}
        </Typography>
      </Box>
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            FIFA Code:
          </Box>{' '}
          {team.fifaCode}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Confederation:
          </Box>{' '}
          {team.confederation ?? 'Confederation not available'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Group:
          </Box>{' '}
          {team.groupLetter ?? 'Group not assigned'}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={handleViewTeam}
          aria-label={`View ${team.teamName}`}
        >
          View team
        </Button>
      </CardActions>
    </Card>
  );
}
