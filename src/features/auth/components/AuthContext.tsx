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

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Verificar tanto cookies como localStorage para compatibilidad
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth_token='))
          ?.split('=')[1] || AuthService.getToken();

        if (token) {
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

    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, []);

  const login = (token: string, user: LoginResponse["user"]) => {
    // Guardar en localStorage y cookies para consistencia
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
      // Limpiar todo de manera sincrónica primero
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      });
      
      // Limpiar localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
      }
      
      // Limpiar cookies
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      
      // Llamar al servicio de logout
      await AuthService.logout();
      
      // Redirigir usando window.location para forzar recarga
      window.location.href = appConfig.routes.public.login;
      
    } catch (error) {
      console.error("Error during logout:", error);
      // Si falla, igualmente limpiar y redirigir
      if (typeof window !== "undefined") {
        window.location.href = appConfig.routes.public.login;
      }
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};