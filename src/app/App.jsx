import { RouterProvider } from "react-router-dom";
import { router } from "../app/routes/Routes";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { AcessibilidadeProvider } from "../app/contexts/AcessibilityContext";

const App = () => {
  return (
    <AuthProvider>
      <AcessibilidadeProvider>
        <RouterProvider router={router} />
      </AcessibilidadeProvider>
    </AuthProvider>
  );
};

export default App;
