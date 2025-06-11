import { createTheme, ThemeOptions } from '@mui/material/styles';

const commonSettings: ThemeOptions = {
  typography: {
    fontFamily: '"Fira Code", "Source Code Pro", monospace',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontFamily: '"Fira Code", monospace',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
        },
      },
    },
  },
};

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#00bcd4',
            },
            secondary: {
              main: '#4caf50',
            },
            background: {
              default: '#f0f0f0',
              paper: '#ffffff',
            },
            text: {
              primary: '#111',
              secondary: '#333',
            },
          }
        : {
            primary: {
              main: '#00e5ff',
            },
            secondary: {
              main: '#76ff03',
            },
            background: {
              default: '#0d0d0d',
              paper: '#1a1a1a',
            },
            text: {
              primary: '#ffffff',
              secondary: '#aaaaaa',
            },
          }),
    },
    ...commonSettings,
  });
