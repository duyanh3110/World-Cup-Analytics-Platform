import { QueryProvider } from './QueryProvider';
import { theme } from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { PropsWithChildren } from 'react';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
