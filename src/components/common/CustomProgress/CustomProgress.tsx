import React, { ReactElement } from 'react';
import { Box, CircularProgress, SxProps } from '@mui/material';
import { CircularProgressProps } from '@mui/material/CircularProgress/CircularProgress';

interface IProps extends CircularProgressProps {
  sx?: SxProps;
}

export default function CustomProgress({
  sx,
  ...progressProps
}: IProps): ReactElement {
  return (
    <Box
      className={progressProps.className}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(sx || {}),
      }}
      data-testid="custom-progress"
    >
      <CircularProgress {...progressProps} />
    </Box>
  );
}
