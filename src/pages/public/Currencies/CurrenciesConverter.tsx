import React, { ReactElement } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";

export default function Currencies(): ReactElement {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const upLg = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <></>
  );
}
