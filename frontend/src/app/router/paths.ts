export const paths = {
  home: '/',
  tournaments: '/tournaments',
  teamDetails: '/teams/:teamId',
  login: '/login',
  register: '/register',
  invitation: '/invite/:token',
  adminInvitations: '/admin/invitations',
} as const;
