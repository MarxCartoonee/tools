import React from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.scss';
import {
  Bank,
  Cesar,
  Dutch,
  Error,
  Goofs,
  Home,
  Horses,
  Jwt,
  Swedish,
} from './pages';

type Theme = '98' | 'XP';

const themes: Record<Theme, string> = {
  '98': 'public/98.scss',
  XP: 'public/xp.scss',
};

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'bank',
          element: <Bank />,
        },
        {
          path: 'jwt',
          element: <Jwt />,
        },
        {
          path: 'goofs',
          element: <Goofs />,
        },
        {
          path: 'swedish',
          element: <Swedish />,
        },
        {
          path: 'dutch',
          element: <Dutch />,
        },
        {
          path: 'horses',
          element: <Horses />,
          errorElement: <Error />,
        },
        {
          path: 'cesar',
          element: <Cesar />,
        },
      ],
    },
  ],
  {
    basename: '/tools/',
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeSwitcherProvider defaultTheme="98" themeMap={themes}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeSwitcherProvider>
  </React.StrictMode>
);
