import PageLayout from "../components/layout/PageLayout/PageLayout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routes/publicRoutes";
import { serviceRoutes } from "./routes/serviceRoutes";

export const router = createBrowserRouter([
  {
    element: (
      <PageLayout/>
    ),
    path: '/',
    children: [
      ...publicRoutes,
      ...serviceRoutes,
    ],
  },
])