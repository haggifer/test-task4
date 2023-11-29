import React, { ReactElement, useEffect } from 'react';
import Header from "../Header/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultPublicPath } from "../../../routing/routes/publicRoutes";
import Footer from "../Footer/Footer";

export default function PageLayout(): ReactElement {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(defaultPublicPath)
    }
  }, [location.pathname]);

  return (
    <>
      <Header/>

      <Box component="main" sx={() => ({
        display: 'flex',
        justifyContent: 'center',
      })}>
        <Box sx={theme => ({
          width: '100%',
          maxWidth: theme.extra.maxContentWidth,
          height: `calc(100vh - ${theme.extra.headerHeight}px - ${theme.extra.footerHeight}px)`,
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '15px 20px',
        })}>
          <Outlet/>
        </Box>
      </Box>

      <Footer/>
    </>
  );
}
