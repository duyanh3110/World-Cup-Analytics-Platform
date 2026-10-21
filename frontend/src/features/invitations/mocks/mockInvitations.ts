export type InvitationStatus = 'valid' | 'expired' | 'invalid' | 'accepted';

export interface InvitationPreview {
  status: InvitationStatus;
  email: string;
}

// Display fixtures only. Tokens and email parameters here prove no identity or permissions.
export function getMockInvitation(
  token: string | undefined,
  email?: string | null,
): InvitationPreview {
  const status: InvitationStatus =
    token === 'demo-valid'
      ? 'valid'
      : token === 'demo-expired'
        ? 'expired'
        : token === 'demo-accepted'
          ? 'accepted'
          : 'invalid';
  return { status, email: email || 'contributor@example.com' };
}
