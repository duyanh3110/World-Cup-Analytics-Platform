import { Box, Button, Typography } from '@mui/material';
import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const status = isRouteErrorResponse(error) ? error.status : 500;

  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h3">{status}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Something went wrong
      </Typography>

      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>
        Back to home
      </Button>
    </Box>
  );
}
