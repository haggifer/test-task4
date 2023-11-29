import React, { ReactElement } from 'react';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { defaultPublicPath } from "../../../routing/routes/publicRoutes";

export default function Header(): ReactElement {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Box component="header" sx={theme => ({
      display: 'flex',
      justifyContent: 'center',
      background: theme.palette.accent[50],
    })}>
      <Box sx={theme => ({
        display: 'flex',
        justifyContent: isXs ? 'center' : undefined,
        width: '100%',
        maxWidth: theme.extra.maxContentWidth,
        height: theme.extra.headerHeight,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '15px 20px',
      })}>
        <Link to={defaultPublicPath}>
          <Box component={Logo} sx={{
            height: '100%',
            objectFit: 'contain',
          }}/>
        </Link>
      </Box>
    </Box>
  )
}
