import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Roboto", Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});
