import React, { ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { router } from './routing/router';
import CustomProgress from './components/common/CustomProgress';
import { RouterProvider } from 'react-router-dom';

import './assets/scss/index.scss';

export default function App(): ReactElement {
  return (
    <>
      <CssBaseline enableColorScheme />

      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} fallbackElement={<CustomProgress />} />
      </StyledEngineProvider>
    </>
  );
}
