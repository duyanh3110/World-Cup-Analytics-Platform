import { AppProvider } from '@/app/providers/AppProviders';
import { router } from '@/app/router';
import { RouterProvider } from 'react-router';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
