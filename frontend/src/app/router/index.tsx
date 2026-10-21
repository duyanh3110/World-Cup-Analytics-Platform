import { MainLayout } from '@/app/layouts/MainLayout';
import { ErrorPage } from '@/app/pages/ErrorPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { InvitationPage } from '@/features/invitations/pages/InvitationPage';
import { AdminInvitationsPage } from '@/features/invitations/pages/AdminInvitationsPage';
import { TeamPage } from '@/features/teams/pages/TeamPage';
import { TournamentsPage } from '@/features/tournaments/pages/TournamentsPage';
import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/tournaments" replace />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/invite/:token',
        element: <InvitationPage />,
      },
      {
        path: '/admin/invitations',
        element: <AdminInvitationsPage />,
      },
      {
        path: '/tournaments',
        element: <TournamentsPage />,
      },
      {
        path: '/teams/:teamId',
        element: <TeamPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
