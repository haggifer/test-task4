import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { themeConfig } from './utils/configs/themeConfig';
import { SWRConfig } from 'swr';
import { fetcher } from './api/api';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme(themeConfig)}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <App />
      </SWRConfig>
    </ThemeProvider>
  </React.StrictMode>,
);
