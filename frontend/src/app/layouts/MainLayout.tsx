import { Outlet } from 'react-router';
import { Box, Container } from '@mui/material';
import { MainNavigation } from './MainNavigation';

export function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <MainNavigation />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
