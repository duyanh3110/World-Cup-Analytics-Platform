import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router';
import { paths } from '@/app/router/paths';

const navigationItems = [
  { label: 'Home', to: paths.home },
  { label: 'Tournaments', to: paths.tournaments },
];

export function MainNavigation() {
  return (
    <AppBar component="header" position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: { xs: 1, sm: 4 }, flexWrap: 'wrap', py: 1 }}>
          <Typography
            component={Link}
            to={paths.home}
            variant="h6"
            sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, flexShrink: 0 }}
          >
            WCA
          </Typography>

          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
              gap: 1,
            }}
          >
            {navigationItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                end
                color="inherit"
                sx={{
                  borderRadius: 0,
                  borderBottom: '2px solid transparent',
                  '&.active': {
                    borderBottomColor: 'secondary.main',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Button
            component={Link}
            to={paths.login}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Sign in
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
