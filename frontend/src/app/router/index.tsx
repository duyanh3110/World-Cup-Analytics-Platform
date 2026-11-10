import { MainLayout } from '@/app/layouts/MainLayout';
import { ErrorPage } from '@/app/pages/ErrorPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { InvitationPage } from '@/features/invitations/pages/InvitationPage';
import { AdminInvitationsPage } from '@/features/invitations/pages/AdminInvitationsPage';
import { TeamPage } from '@/features/teams/pages/TeamPage';
import { TournamentsPage } from '@/features/tournaments/pages/TournamentsPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { createBrowserRouter } from 'react-router';
import { paths } from './paths';

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: paths.login,
        element: <LoginPage />,
      },
      {
        path: paths.register,
        element: <RegisterPage />,
      },
      {
        path: paths.invitation,
        element: <InvitationPage />,
      },
      {
        path: paths.adminInvitations,
        element: <AdminInvitationsPage />,
      },
      {
        path: paths.tournaments,
        element: <TournamentsPage />,
      },
      {
        path: paths.teamDetails,
        element: <TeamPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
