import { Outlet, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../Components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "../Components/PrivateRoute";

// Lazy loading dos componentes
const LandingHome = lazy(() => import("../Features/Landing/Landing"));
const LoginPage = lazy(() => import("../Features/AuthPage/Login"));
const ForgotPasswordForm = lazy(() => import("../Features/ForgotPassword/ForgotPasswordForm"));
const ConfirmEmail = lazy(() => import("../Features/ConfirmEmail/ConfirmEmail"));
const ChooseType = lazy(() => import("../Features/RegisterPage/ChooseType"));
const RegisterFormDiscente = lazy(() => import("../Features/RegisterPage/RegisterFormDiscente"));
const RegisterDocenteForm = lazy(() => import("../Features/RegisterPage/RegisterDocenteForm"));
const MapaSalas = lazy(() => import("../Features/SMD-Maps/MapaSalas"));

// Componentes Admin
const DashboardRegistro = lazy(() => import("../Features/Administrador/AdminDashboard/Dashboard"));
const AdminMainPage = lazy(() => import("../Features/Administrador/AdminAccountPage/AdminMainPage"));
const AdminReservasPage = lazy(() => import("../Features/Administrador/AdminReservasPage/AdminReservasPage"));
const PagePedidosReserva = lazy(() => import("../Features/Administrador/AdminAllRequestReserva/PedidosReservas"));

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
        path: "mapa-salas",
        element: <MapaSalas />,
      },
      {
        path: "register",
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
        path: "admin",
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
            path: "dashboard-solicitacoes",
            element: <DashboardRegistro />,
          },
          {
            path: "dashboard-reservas",
            element: <AdminReservasPage />,
          },
          {
            path: "dashboard-reservas/pedidos-reserva",
            element: <PagePedidosReserva />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordForm />,
      },
      {
        path: "confirmar",
        element: <ConfirmEmail />,
      },
    ],
  },
]);

export default router;