import { Outlet } from 'react-router';
import { Box, Container } from '@mui/material';

export function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
