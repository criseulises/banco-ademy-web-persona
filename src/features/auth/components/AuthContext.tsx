"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthState, LoginResponse } from "@/features/auth/types";
import { AuthService } from "@/features/auth/services/authService";
import { appConfig } from "@/config/app.config";

interface AuthContextType extends AuthState {
  login: (token: string, user: LoginResponse["user"]) => void;
  logout: () => Promise<void>;
  updateUser: (user: Partial<LoginResponse["user"]>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });

  // Verificar autenticación al cargar - SOLO UNA VEZ
  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuth = AuthService.isAuthenticated();
        const token = AuthService.getToken();

        if (isAuth && token) {
          // Obtener usuario de localStorage si existe
          const storedUser = localStorage.getItem("user");
          const user = storedUser ? JSON.parse(storedUser) : null;
          
          setAuthState({
            isAuthenticated: true,
            token,
            user,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
          error: null,
        });
      }
    };

    // Solo verificar en el cliente
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, []); // Array de dependencias vacío para ejecutar solo una vez

  const login = (token: string, user: LoginResponse["user"]) => {
    // Guardar usuario en localStorage
    if (user && typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    
    setAuthState({
      isAuthenticated: true,
      token,
      user: user || null,
      isLoading: false,
      error: null,
    });
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      });
      
      router.push(appConfig.routes.public.login);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUser = (userData: Partial<LoginResponse["user"]>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev;
      
      const updatedUser = { ...prev.user, ...userData };
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      return {
        ...prev,
        user: updatedUser,
      };
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para usar el contexto de autenticación
 * @returns Contexto de autenticación
 * @throws Error si se usa fuera del AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};