export const paths = {
  home: '/',
  tournaments: '/tournaments',
  tournamentDetails: '/tournaments/:tournamentId',
  teamDetails: '/teams/:teamId',
  login: '/login',
  register: '/register',
  invitation: '/invite/:token',
  adminInvitations: '/admin/invitations',
} as const;
