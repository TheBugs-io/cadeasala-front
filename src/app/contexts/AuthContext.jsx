import { createContext, useState, useContext, useEffect } from 'react';

//Rotas que precisam estar autenticados, mas para QUALQUER TIPO.
//Uso: Você passa esse elemento dentro das rotas, sendo a página, dentro desse elemento.
/*
    <AuthContext>
        <elemento>
    </AuthContext>
*/
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  })

  const login = (userData, authToken) => {
    const userToStore = { ...userData };
    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('token', authToken);
    setUser(userToStore);
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        setUser(getStoredUser());
      }
      if (e.key === 'token') {
        setToken(localStorage.getItem('token'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};