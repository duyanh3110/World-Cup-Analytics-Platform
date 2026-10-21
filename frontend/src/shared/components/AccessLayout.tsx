import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router';
import styles from './AccessLayout.module.scss';

type AccessLayoutProps = PropsWithChildren<{ title: string; description: string }>;

export function AccessLayout({ title, description, children }: AccessLayoutProps) {
  return (
    <Box className={styles.page}>
      <Paper variant="outlined" className={styles.card} sx={{ borderRadius: 3 }}>
        <Stack
          className={styles.story}
          spacing={4}
          sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText' }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <SportsSoccerRoundedIcon aria-hidden="true" />
            <Typography variant="subtitle2">WORLD CUP ANALYTICS</Typography>
          </Stack>
          <Box>
            <Typography component="h2" variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Every match.
              <br />A deeper insight.
            </Typography>
            <Typography sx={{ opacity: 0.85, lineHeight: 1.8 }}>
              Explore the teams, tournaments, and numbers behind the world’s biggest football stage.
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Statistics are open to everyone. No account needed to explore.
          </Typography>
        </Stack>
        <Stack className={styles.content} spacing={3}>
          <Box>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {title}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Box>
          {children}
          <Link component={RouterLink} to="/tournaments" sx={{ textAlign: 'center' }}>
            Continue as guest
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
}
