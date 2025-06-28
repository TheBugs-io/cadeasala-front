import { Routes, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import LandingHome from "../features/Landing/Landing";
import RegisterForm from "../Features/RegisterPage/RegisterForm";
import LoginPage from "../Features/AuthPage/Login";
import ForgotPasswordForm from "../Features/ForgotPassword/ForgotPasswordForm";

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
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordForm />,
      },
    ],
  },
]);

export default Routes;
