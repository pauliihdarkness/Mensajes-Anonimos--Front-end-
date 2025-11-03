import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/index.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);