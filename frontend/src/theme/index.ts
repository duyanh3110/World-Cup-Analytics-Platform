import { createTheme } from '@mui/material/styles';

export const colors = {
  forest: '#102B27',
  gold: '#C9A65A',
  ivory: '#F6F3EB',
  ink: '#222A2A',
  white: '#FFFFFF',
  sage: '#DCE8E0',
  muted: '#63756D',
  panel: '#315A4C',
} as const;

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.forest,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.gold,
      contrastText: colors.forest,
    },
    background: {
      default: colors.ivory,
      paper: colors.white,
    },
    text: {
      primary: colors.ink,
      secondary: colors.muted,
    },
    divider: colors.sage,
  },
  typography: {
    fontFamily: '"Roboto", Arial, sans-serif',
    h1: {
      fontSize: '4rem',
      lineHeight: 1.1,
      fontWeight: 700,
    },
    h2: {
      fontSize: '3.25rem',
      lineHeight: 1.15,
      fontWeight: 700,
    },
    h3: {
      fontSize: '2.25rem',
      lineHeight: 1.2,
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: {
                variant: 'contained',
                color: 'primary',
              },
              style: {
                '&:hover': {
                  backgroundColor: colors.panel,
                },
              },
            },
          ],
        },
      },
    },
  },
});
