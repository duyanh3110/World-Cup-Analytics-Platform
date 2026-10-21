import { AccessLayout } from '@/shared/components/AccessLayout';
import { Alert, Box, Button, Chip, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router';
import { getMockInvitation } from '../mocks/mockInvitations';

export function InvitationPage() {
  const { token } = useParams();
  const [params] = useSearchParams();
  // Remount form state when the invitation changes.
  return (
    <InvitationContent key={token + params.toString()} token={token} email={params.get('email')} />
  );
}

function InvitationContent({ token, email }: { token?: string; email: string | null }) {
  const invitation = getMockInvitation(token, email);
  const [mode, setMode] = useState<'register' | 'existing'>('register');
  const [submitted, setSubmitted] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  function handleAcceptInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mismatch = mode === 'register' && data.get('password') !== data.get('confirmPassword');
    setPasswordMismatch(mismatch);
    setSubmitted(!mismatch);
    // TODO: Verify invitation, authenticate or register, and accept through the backend.
    // The invited email must be verified before granting contributor access.
  }

  const messages = {
    expired: ['Invitation expired', 'Ask your admin for a new invitation link.'],
    invalid: [
      'Invitation not found',
      'This invitation link is invalid. Check the link or contact your admin.',
    ],
    accepted: [
      'Invitation already accepted',
      'This invitation has already been used. Sign in with your existing account.',
    ],
  } as const;

  if (invitation.status !== 'valid') {
    const [title, description] = messages[invitation.status];
    return (
      <AccessLayout title={title} description={description}>
        <Alert severity={invitation.status === 'accepted' ? 'info' : 'warning'}>
          {invitation.status === 'accepted'
            ? 'No further action is needed on this invitation.'
            : 'You cannot accept this invitation.'}
        </Alert>
        <Button component={RouterLink} to="/login" variant="contained">
          Go to sign in
        </Button>
      </AccessLayout>
    );
  }

  return (
    <AccessLayout
      title="You’re invited"
      description="Help keep World Cup history accurate as a contributor."
    >
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Chip label="Contributor invitation" color="primary" variant="outlined" />
        <Chip label="Valid · mock preview" size="small" />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Propose data corrections for admin review. Changes are published only after approval.
      </Typography>
      <Tabs
        value={mode}
        variant="fullWidth"
        aria-label="Invitation account options"
        onChange={(_, value: 'register' | 'existing') => {
          setMode(value);
          setSubmitted(false);
          setPasswordMismatch(false);
        }}
      >
        <Tab
          id="invite-register-tab"
          aria-controls="invite-account-panel"
          label="New account"
          value="register"
        />
        <Tab
          id="invite-existing-tab"
          aria-controls="invite-account-panel"
          label="Existing account"
          value="existing"
        />
      </Tabs>
      <Box
        id="invite-account-panel"
        role="tabpanel"
        aria-labelledby={mode === 'register' ? 'invite-register-tab' : 'invite-existing-tab'}
      >
        <Box component="form" key={mode} onSubmit={handleAcceptInvitation}>
          <Stack spacing={2.5}>
            {submitted && (
              <Alert severity="info">
                UI preview only. The invitation has not been accepted and no permissions have
                changed.
              </Alert>
            )}
            {mode === 'register' && (
              <TextField
                id="invite-name"
                name="name"
                label="Full name"
                autoComplete="name"
                required
                fullWidth
              />
            )}
            <TextField
              id="invite-email"
              name="email"
              label="Invited email"
              type="email"
              value={invitation.email}
              fullWidth
              slotProps={{ input: { readOnly: true } }}
              helperText="Contributor access is tied to this email address."
            />
            <TextField
              id="invite-password"
              name="password"
              label={mode === 'register' ? 'Create password' : 'Account password'}
              type="password"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              required
              fullWidth
            />
            {mode === 'register' && (
              <TextField
                id="invite-confirm"
                name="confirmPassword"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                error={passwordMismatch}
                helperText={passwordMismatch ? 'Passwords do not match.' : undefined}
                onChange={() => setPasswordMismatch(false)}
              />
            )}
            <Button type="submit" variant="contained" size="large" disableElevation>
              {mode === 'register'
                ? 'Create account & accept invitation'
                : 'Sign in & accept invitation'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </AccessLayout>
  );
}
