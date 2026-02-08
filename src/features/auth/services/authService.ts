import { LoginCredentials, LoginResponse } from "../types";
import { appConfig } from "@/config/app.config";

const { api, auth } = appConfig;

export class AuthService {
  /**
   * Realiza el login del usuario
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error de conexión. Por favor, intente nuevamente.");
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  static async logout(): Promise<void> {
    try {
      // En desarrollo, usar la API local
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      this.clearSession();
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    // Verificar cookies primero (lo que usa el middleware)
    const hasCookie = document.cookie
      .split('; ')
      .some(row => row.startsWith('auth_token='));
    
    // Verificar localStorage como backup
    const hasLocalStorage = this.getToken() !== null;
    
    return hasCookie || hasLocalStorage;
  }

  /**
   * Obtiene el token de autenticación
   */
  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(auth.tokenKey);
  }

  /**
   * Guarda el token de autenticación
   */
  static setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(auth.tokenKey, token);
    
    // Calcular expiración
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    localStorage.setItem(auth.tokenExpirationKey, expirationDate.toISOString());
  }

  /**
   * Limpia toda la sesión del usuario
   */
  static clearSession(): void {
    if (typeof window === "undefined") return;
    
    // Limpiar localStorage
    localStorage.removeItem(auth.tokenKey);
    localStorage.removeItem(auth.refreshTokenKey);
    localStorage.removeItem(auth.tokenExpirationKey);
    localStorage.removeItem("user");
    
    // Limpiar cookies (fallback)
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}