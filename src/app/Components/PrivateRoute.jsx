import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//Rotas que precisam estar autenticados dependendo do tipo
//Uso: Você passa esse elemento dentro das rotas junto com o tipo permitido, mas antes das páginas filhas, tipo:
/*
{
  path: "admin",
  element: (
    <PrivateRoute allowedTypes={["SECRETARIO"]}>
      <AdminLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <AdminDashboard /> },
     //Outras páginas ou rotas aqui
  ],
}
*/
function PrivateRoute({ children, allowedTypes }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedTypes.includes(user.tipo)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default PrivateRoute;
