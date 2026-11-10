import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';
import { paths } from '@/app/router/paths';
import { colors } from '@/theme';

// Replace each destination when the corresponding public list route is available.
const archiveItems = [
  {
    title: 'Tournaments',
    description: 'Explore editions and hosts',
    to: paths.tournaments,
    accent: 'primary.main',
  },
  {
    title: 'Teams',
    description: 'Discover national team history',
    to: paths.tournaments,
    accent: 'secondary.main',
  },
  {
    title: 'Matches',
    description: 'Results and match statistics',
    to: paths.tournaments,
    accent: 'primary.main',
  },
];

export function DashboardPage() {
  return (
    <Stack component="main" spacing={{ xs: 4, md: 6 }}>
      <Box
        component="section"
        aria-labelledby="dashboard-heading"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Stack spacing={3} sx={{ p: { xs: 3, sm: 5, md: 6 }, alignItems: 'flex-start' }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700 }}>
            The beautiful game, explained
          </Typography>
          <Typography
            id="dashboard-heading"
            component="h1"
            variant="h2"
            sx={{ fontSize: { xs: '2.25rem', sm: '3.25rem', lg: '4rem' } }}
          >
            EVERY MATCH.
            <br />
            EVERY MOMENT.
          </Typography>
          <Typography sx={{ maxWidth: 480, color: 'primary.contrastText', opacity: 0.85 }}>
            Explore World Cup tournaments, teams and the data behind football history.
          </Typography>
          <Button
            component={Link}
            to={paths.tournaments}
            variant="contained"
            color="secondary"
            disableElevation
            sx={{ borderRadius: 0, px: 3, py: 1.5 }}
          >
            Explore tournaments
          </Button>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: colors.panel,
            borderLeft: { xs: 0, md: '8px solid' },
            borderTop: { xs: '6px solid', md: 0 },
            borderColor: 'secondary.main',
            p: { xs: 3, sm: 5 },
            minHeight: { xs: 160, md: 320 },
          }}
        >
          <Typography
            component="p"
            variant="h3"
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            FOOTBALL
            <br />
            THROUGH DATA
          </Typography>
        </Box>
      </Box>

      <Box component="section" aria-labelledby="archive-heading">
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Explore the archive
        </Typography>
        <Typography
          id="archive-heading"
          component="h2"
          variant="h3"
          sx={{ mt: 1, mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
        >
          A world of football stories
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 3,
          }}
        >
          {archiveItems.map((item) => (
            <Card
              key={item.title}
              elevation={0}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 240,
                borderRadius: 0,
                borderTop: '6px solid',
                borderColor: item.accent,
              }}
            >
              <CardContent sx={{ p: 3, flex: 1 }}>
                <Typography component="h3" variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  {item.title.toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 3, pb: 3 }}>
                <Button
                  component={Link}
                  to={item.to}
                  size="small"
                  endIcon={<ArrowForwardRoundedIcon />}
                  aria-label={`Explore ${item.title.toLowerCase()}`}
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
