"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Usuario = {
  id: number;
  nombre: string;
  email: string;
  rol: "patron" | "empleado";
};

type AuthContextType = {
  usuario: Usuario | null;
  login: (userData: Usuario) => void;
  logout: () => void;
};

// Contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  usuario: null,
  login: () => {},
  logout: () => {},
});

// Hook personalizado para consumir el contexto
export const useAuth = () => useContext(AuthContext);

// Provider del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("usuario");
    if (userFromStorage) {
      setUsuario(JSON.parse(userFromStorage));
    }
  }, []);

  const login = (userData: Usuario) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
