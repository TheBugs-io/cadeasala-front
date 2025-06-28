import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true; // Substitua pela sua lógica de autenticação

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;