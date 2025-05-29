import { createContext, ReactNode, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { User } from "../services/types";
import { AuthService } from "../services";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const userString = localStorage.getItem("user");

      if (!token || !userString) {
        throw new Error("No hay sesión guardada");
      }

      const user = JSON.parse(userString) as User;
      setUser(user);
    } catch (error) {
      console.error("Error en checkAuth:", error);
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (identifier: string, password: string) => {
    const { user } = await AuthService.login({ identifier, password });
    setUser(user);
    navigate("/courses");
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
