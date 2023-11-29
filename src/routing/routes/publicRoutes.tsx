import { RouteObject } from "react-router-dom";
import React from "react";
import Currencies from "../../pages/public/Currencies/Currencies";

export const defaultPublicPath = '/';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Currencies/>
    ),
  },
]