import { AccessLayout } from '@/shared/components/AccessLayout';
import { Alert, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link as RouterLink } from 'react-router';

export function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mismatch = data.get('password') !== data.get('confirmPassword');
    setPasswordMismatch(mismatch);
    setSubmitted(!mismatch);
    // TODO: Register a regular USER account. Roles must be assigned by the backend.
  }

  return (
    <AccessLayout
      title="Create your account"
      description="Join as a user. Contributor access is by admin invitation only."
    >
      {submitted && <Alert severity="info">UI preview only. No account has been created.</Alert>}
      <Box component="form" onSubmit={handleRegister}>
        <Stack spacing={2.5}>
          <TextField
            id="register-name"
            name="name"
            label="Full name"
            autoComplete="name"
            required
            fullWidth
          />
          <TextField
            id="register-email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            fullWidth
          />
          <TextField
            id="register-password"
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
          />
          <TextField
            id="register-confirm"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
            error={passwordMismatch}
            helperText={passwordMismatch ? 'Passwords do not match.' : undefined}
            onChange={() => {
              setPasswordMismatch(false);
              setSubmitted(false);
            }}
          />
          <Button type="submit" variant="contained" size="large" disableElevation>
            Create user account
          </Button>
        </Stack>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Sign in
        </Link>
      </Typography>
    </AccessLayout>
  );
}
