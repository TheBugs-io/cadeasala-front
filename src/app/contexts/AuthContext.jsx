import { createContext, useState, useContext, useEffect } from "react";

//Rotas que precisam estar autenticados, mas para QUALQUER TIPO.
//Uso: Você passa esse elemento dentro das rotas, sendo a página, dentro desse elemento.
/*
    <AuthContext>
        <elemento>
    </AuthContext>
*/
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.warn("Erro ao fazer parse do usuário:", e);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (userData, authToken) => {
    const userToStore = { ...userData };
    localStorage.setItem("user", JSON.stringify(userToStore));
    localStorage.setItem("token", authToken);
    setUser(userToStore);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
