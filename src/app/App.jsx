import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import { RouterProvider } from "react-router-dom";
import { router } from "../app/routes/Routes";
import "./App.css"

const App = () => {
  return (
    <PrivateRoute>
      <RouterProvider router={router} />
    </PrivateRoute>
  );
};

export default App;