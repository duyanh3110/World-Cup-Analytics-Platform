import { AccessLayout } from '@/shared/components/AccessLayout';
import { Alert, Box, Button, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link as RouterLink } from 'react-router';

export function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Authenticate with the backend and load the current user's role.
    setSubmitted(true);
  }

  return (
    <AccessLayout
      title="Welcome back"
      description="One sign-in for users, contributors, and admins."
    >
      {submitted && <Alert severity="info">UI preview only. You have not been signed in.</Alert>}
      <Box component="form" onSubmit={handleLogin}>
        <Stack spacing={2.5}>
          <TextField
            id="login-email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="username"
            required
            fullWidth
          />
          <TextField
            id="login-password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
          />
          <Button type="submit" variant="contained" size="large" fullWidth disableElevation>
            Sign in
          </Button>
        </Stack>
      </Box>
      <Divider />
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        New here?{' '}
        <Link component={RouterLink} to="/register">
          Create a user account
        </Link>
      </Typography>
    </AccessLayout>
  );
}
