"use client";

import { useState } from "react";
import { LoginCredentials, LoginResponse, AuthError } from "../types";
import { appConfig } from "@/config/app.config";
import { useAuth } from "../components/AuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const { login: setAuthState } = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Actualizar el estado de autenticación
      if (data.token) {
        setAuthState(data.token, data.user);
      }

      // Usar window.location para redirigir en lugar de router.push
      // Esto evita problemas con el estado del router
      window.location.href = appConfig.routes.private.dashboard;
      
      return data;
    } catch (error) {
      const authError: AuthError = {
        message: error instanceof Error ? error.message : "Error desconocido",
      };
      setError(authError);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleLogin,
  };
};