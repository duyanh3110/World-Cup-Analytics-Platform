import { MainLayout } from '@/app/layouts/MainLayout';
import { ErrorPage } from '@/app/pages/ErrorPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
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
