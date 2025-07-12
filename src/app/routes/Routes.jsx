import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import LandingHome from "../features/Landing/Landing";
import LoginPage from "../Features/AuthPage/Login";
import ForgotPasswordForm from "../features/ForgotPassword/ForgotPasswordForm";
import ConfirmEmail from "../features/ConfirmEmail/ConfirmEmail";
import ChooseType from "../features/RegisterPage/ChooseType";
import RegisterFormDiscente from "../features/RegisterPage/RegisterFormDiscente";
import RegisterDocenteForm from "../features/RegisterPage/RegisterDocenteForm";
import MapaSalas from "../features/SMD-Maps/MapaSalas";
{/* Rotas que precisam de autenticação, mas pra qualquer tipo */}
import { AuthProvider } from "../contexts/AuthContext";
{/* Rotas privadas / ADMIN */}
import PrivateRoute from "../Components/PrivateRoute";
import DashboardRegistro from "../features/AdminDashboard/Dashboard";
import AdminMainPage from "../features/AdminAccountPage/AdminMainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <LandingHome />,
      },
      {
        path: "/mapa-salas",
        element: <MapaSalas />,
      },
      {
        path: "/register",
        children: [
          {
            index: true,
            element: <ChooseType />,
          },
          {
            path: "form-discente",
            element: <RegisterFormDiscente />,
          },
          {
            path: "form-docente",
            element: <RegisterDocenteForm />,
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute allowedTypes={["SECRETARIO"]}>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminMainPage />,
          },
          {
            path: "dashboard",
            element: <DashboardRegistro />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordForm />,
      },
      {
        path: "/confirmar",
        element: <ConfirmEmail />,
      },
    ],
  },
]);

export default router;
