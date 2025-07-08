import { RouterProvider } from "react-router-dom";
import { router } from "../app/routes/Routes";
import "./App.css"
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;