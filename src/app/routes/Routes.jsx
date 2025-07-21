import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout";
import LandingHome from "../Features/Landing/Landing";
import LoginPage from "../Features/AuthPage/Login";
import ForgotPasswordForm from "../Features/ForgotPassword/ForgotPasswordForm";
import ConfirmEmail from "../Features/ConfirmEmail/ConfirmEmail";
import ChooseType from "../Features/RegisterPage/ChooseType";
import RegisterFormDiscente from "../Features/RegisterPage/RegisterFormDiscente";
import RegisterDocenteForm from "../Features/RegisterPage/RegisterDocenteForm";
import MapaSalas from "../Features/SMD-Maps/MapaSalas";
{/* Rotas que precisam de autenticação, mas pra qualquer tipo */}
import { AuthProvider } from "../contexts/AuthContext";
{/* Rotas privadas / ADMIN */}
import PrivateRoute from "../Components/PrivateRoute";
import DashboardRegistro from "../Features/AdminDashboard/Dashboard";
import AdminMainPage from "../Features/AdminAccountPage/AdminMainPage";
import DetalhesAdmin from "../Features/DetalhesAdmin/DetalhesAdmin";

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
      path: "/detalhes-teste/:id",
      element: <DetalhesAdmin />,
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
