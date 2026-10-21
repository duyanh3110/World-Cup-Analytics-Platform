import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link as RouterLink } from 'react-router';
import styles from './AdminInvitationsPage.module.scss';

export function AdminInvitationsPage() {
  const [link, setLink] = useState('');
  const [invitedEmail, setInvitedEmail] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  function handleGenerateInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email') || '').trim();
    // TODO: Replace with an admin-only backend request. This URL is a display fixture.
    const url = new URL('/invite/demo-valid', window.location.origin);
    url.searchParams.set('email', email);
    setInvitedEmail(email);
    setLink(url.toString());
    setCopyStatus('idle');
  }

  async function handleCopyInvitation() {
    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  }

  return (
    <Stack className={styles.page} spacing={3}>
      <Box>
        <Chip label="Admin · UI preview" color="primary" variant="outlined" sx={{ mb: 2 }} />
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Invite a contributor
        </Typography>
        <Typography color="text.secondary">
          Invite someone to propose corrections to historical World Cup data.
        </Typography>
      </Box>
      <Alert severity="info">
        Mock preview. No admin authorization is enforced, no email is sent, and no role is granted.
      </Alert>
      <Paper variant="outlined" className={styles.panel} sx={{ borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box component="form" onSubmit={handleGenerateInvitation}>
            <Stack spacing={2.5}>
              <TextField
                id="contributor-email"
                name="email"
                type="email"
                label="Contributor email address"
                placeholder="contributor@example.com"
                helperText="The recipient will need to use this email to accept their invitation."
                required
                fullWidth
                onChange={() => {
                  setLink('');
                  setCopyStatus('idle');
                }}
              />
              <Button type="submit" variant="contained" size="large" disableElevation>
                Generate mock invitation
              </Button>
            </Stack>
          </Box>
          {link && (
            <Stack spacing={2} aria-live="polite">
              <Divider />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Invitation link ready
              </Typography>
              <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
                For {invitedEmail}
              </Typography>
              <Box className={styles.linkRow}>
                <TextField
                  id="invitation-link"
                  label="Mock invitation link"
                  value={link}
                  fullWidth
                  slotProps={{ input: { readOnly: true } }}
                />
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={handleCopyInvitation}
                  sx={{ flexShrink: 0 }}
                >
                  Copy link
                </Button>
              </Box>
              {copyStatus === 'copied' && <Alert severity="success">Link copied.</Alert>}
              {copyStatus === 'error' && (
                <Alert severity="warning">
                  Clipboard unavailable. Select the link above and copy it manually.
                </Alert>
              )}
              <Link component={RouterLink} to={link.replace(window.location.origin, '')}>
                Preview recipient page
              </Link>
            </Stack>
          )}
        </Stack>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Contributors propose changes. Only admins approve changes to published data.
      </Typography>
      <Divider />
      <Typography variant="subtitle2">Invitation state previews</Typography>
      <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap' }}>
        <Link component={RouterLink} to="/invite/demo-valid">
          Valid
        </Link>
        <Link component={RouterLink} to="/invite/demo-expired">
          Expired
        </Link>
        <Link component={RouterLink} to="/invite/demo-invalid">
          Invalid
        </Link>
        <Link component={RouterLink} to="/invite/demo-accepted">
          Already accepted
        </Link>
      </Stack>
      <Link component={RouterLink} to="/tournaments">
        Back to public statistics
      </Link>
    </Stack>
  );
}
