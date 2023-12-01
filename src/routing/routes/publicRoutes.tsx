import { RouteObject } from "react-router-dom";
import React from "react";
import Exchange from "../../pages/public/Exchange/Exchange";

export const defaultPublicPath = '/';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Exchange/>
    ),
  },
]