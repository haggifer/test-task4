import React, { ReactElement } from 'react';
import { Box, Typography } from "@mui/material";

export default function Footer(): ReactElement {
  return (
    <Box component="header" sx={theme => ({
      display: 'flex',
      justifyContent: 'center',
      background: theme.palette.accent[50],
    })}>
      <Box sx={theme => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: theme.extra.maxContentWidth,
        height: theme.extra.footerHeight,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '15px 20px',
      })}>
        <Typography variant="body1" sx={{
          fontWeight: 500,
        }}>© 2023 All rights reserved.</Typography>
      </Box>
    </Box>
  )
}
