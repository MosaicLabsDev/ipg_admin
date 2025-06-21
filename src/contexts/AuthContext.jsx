import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario ya está autenticado al cargar la app
    const authStatus = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('currentUser');
    
    if (authStatus === 'true' && user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
    
    setLoading(false);
  }, []);

  const login = (username) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  const value = {
    isAuthenticated,
    currentUser,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
} 