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

// Componentes de usuário autenticado
const AccountPage = lazy(() => import("../Features/AccountPage/AccountPageGeral"));
const RequestReserva = lazy(() => import("../Features/RequestReserva/FormsRequestReserva"));

// Componentes Admin
const DashboardRegistro = lazy(() => import("../Features/Administrador/AdminDashboard/Dashboard"));
const AdminMainPage = lazy(() => import("../Features/Administrador/AdminAccountPage/AdminMainPage"));
const AdminReservasPage = lazy(() => import("../Features/Administrador/AdminReservasPage/AdminReservasPage"));
const PagePedidosReserva = lazy(() => import("../Features/Administrador/AdminAllRequestReserva/PedidosReservas"));
const DetalhesAdmin = lazy(() => import("../Features/DetalhesAdmin/DetalhesAdmin"));
const DashboardSalas = lazy(() => import("../Features/Administrador/AdminSalasController/DashboardSalas"));
const ConfigSala = lazy(() => import("../Features/Administrador/ConfigSala/ConfigSala"));
const AdminAllReservas = lazy(() => import ("../Features/Administrador/AdminAllReservas/AdminAllReservas"));
const CreateSala = lazy(() => import("../Features/Administrador/AdminCreateRoom/AdminCreateRoom"));
const DetalhesPedidoReserva = lazy(() => import("../Features/DetalhesPedidoReserva/DetalhesPedidoReserva"));
const DetalhesReserva = lazy(() => import("../Features/DetalhesReserva/DetalhesReserva"));
const DashboardHistorico = lazy(() => import("../Features/Administrador/AdminDashboardHistorico/DashboardHistorico"));


//Páginas alternativas
const NotFoundPage = lazy(() => import("../Features/ErrorPages/404Error"));

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
        path: "user",
        element: (
          <PrivateRoute allowedTypes={["DISCENTE", "DOCENTE"]}>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <AccountPage />,
          },
          {
            path: "solicitar-reserva/:idSala",
            element: <RequestReserva />,
          }
        ]
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
            path: "dashboard-historico",
            element: <DashboardHistorico />,
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
          {
            path: "dashboard-reservas/detalhes-pedido/:id",
            element: <DetalhesPedidoReserva />,
          },
          {
            path: "dashboard-reservas/detalhes-reserva/:id",
            element: <DetalhesReserva />,
          },
          {
            path: "dashboard-reservas/reservas/:id",
            element: <DetalhesAdmin />,
          },
          {
            path: "dashboard-salas",
            element: <DashboardSalas />,
          },
          {
            path: "dashboard-salas/salas/:id",
            element: <ConfigSala />,
          },
          {
            path: "dashboard-reservas/reservas",
            element: <AdminAllReservas />,
          },
          {
            path: "dashboard-salas/criar-sala",
            element: <CreateSala />,
          }
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
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ],
  },
]);

export default router;