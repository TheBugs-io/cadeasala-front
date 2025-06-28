import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    //TODO: Passar depois as lógicas de autenticação
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;