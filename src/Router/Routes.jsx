import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import NotFoundPage from "../Pages/NotFoundPage";
import LoginPage from "../Pages/LoginPage";
import PerfilUsuarioPage from "../Pages/PerfilUsuarioPage";
import MensajeAnonimoPage from "../Pages/MensajeAnonimoPage";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/user',
    element: <PerfilUsuarioPage />
  },
  {
    path: '/msg/user/:userId',
    element: <MensajeAnonimoPage />
  },
  {
    path: '/*',
    element: <NotFoundPage />
  }
]);


export default Router