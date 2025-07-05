import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import LandingHome from "../features/Landing/Landing";
import LoginPage from "../Features/AuthPage/Login";
import ForgotPasswordForm from "../features/ForgotPassword/ForgotPasswordForm";
import ConfirmEmail from "../features/ConfirmEmail/ConfirmEmail";
import ChooseType from "../features/RegisterPage/ChooseType";
import RegisterFormDiscente from "../features/RegisterPage/RegisterFormDiscente";
import RegisterDocenteForm from "../features/RegisterPage/RegisterDocenteForm";
import DashboardRegistro from "../features/AdminDashboard/Dashboard";
import { AuthProvider } from "../contexts/AuthContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingHome />,
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
          <AuthProvider allowedTypes={["SECRETARIO"]}>
            <Outlet />
          </AuthProvider>
        ),
        children: [
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
