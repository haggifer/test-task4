import { ThemeOptions } from '@mui/material/styles';
import { PaletteColor, PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette;
    extra: {
      headerHeight: number;
      footerHeight: number;
      maxContentWidth: number;
    };
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
    extra?: {
      headerHeight: number;
      footerHeight: number;
      maxContentWidth: number;
    };
  }

  interface Palette {
    primary: PaletteColor;
    accent: Record<number, string>;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    accent: Record<number, string>;
  }
}

export const themeConfig: ThemeOptions = {
  spacing: 5,
  components: {
    MuiButton: {
      styleOverrides: {
        root: () => ({
          minHeight: '40px',
          borderRadius: '10px',
          padding: '5px 20px',
          fontSize: '14px',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&, &:hover, &:active': {
            borderWidth: '2px',
          },
        }),
      },
    },
  },
  palette: {
    primary: {
      main: '#294eb5',
    },
    accent: {
      50: '#e7e9f6',
      100: '#c2c9e9',
      200: '#99a6d9',
      300: '#7083cb',
      400: '#4f68c0',
      500: '#294eb5',
      600: '#2247ab',
      700: '#163d9f',
      800: '#073394',
      900: '#00217f',
    },
  },
  extra: {
    headerHeight: 100,
    footerHeight: 100,
    maxContentWidth: 1000,
  },
};
