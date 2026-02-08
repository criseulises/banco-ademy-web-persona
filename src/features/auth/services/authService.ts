import { LoginCredentials, LoginResponse } from "../types";
import { appConfig } from "@/config/app.config";

const { api, auth } = appConfig;

export class AuthService {
  /**
   * Realiza el login del usuario
   * @param credentials - Credenciales del usuario
   * @returns Respuesta del servidor con token y datos del usuario
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${api.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        signal: AbortSignal.timeout(api.timeout),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar token en localStorage
      if (data.token) {
        this.setToken(data.token);
        if (data.refreshToken) {
          this.setRefreshToken(data.refreshToken);
        }
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("La solicitud ha tardado demasiado. Por favor, intente nuevamente.");
        }
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
      const token = this.getToken();
      
      if (token) {
        await fetch(`${api.baseUrl}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      this.clearSession();
    }
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si hay un token válido
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Verificar si el token ha expirado
    const expiration = localStorage.getItem(auth.tokenExpirationKey);
    if (expiration) {
      const expirationDate = new Date(expiration);
      if (expirationDate < new Date()) {
        this.clearSession();
        return false;
      }
    }

    return true;
  }

  /**
   * Obtiene el token de autenticación
   * @returns Token de autenticación o null
   */
  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(auth.tokenKey);
  }

  /**
   * Guarda el token de autenticación
   * @param token - Token a guardar
   */
  private static setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(auth.tokenKey, token);
    
    // Calcular y guardar la expiración (ejemplo: 24 horas)
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    localStorage.setItem(auth.tokenExpirationKey, expirationDate.toISOString());
  }

  /**
   * Obtiene el refresh token
   * @returns Refresh token o null
   */
  private static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(auth.refreshTokenKey);
  }

  /**
   * Guarda el refresh token
   * @param refreshToken - Refresh token a guardar
   */
  private static setRefreshToken(refreshToken: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(auth.refreshTokenKey, refreshToken);
  }

  /**
   * Limpia toda la sesión del usuario
   */
  private static clearSession(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(auth.tokenKey);
    localStorage.removeItem(auth.refreshTokenKey);
    localStorage.removeItem(auth.tokenExpirationKey);
  }

  /**
   * Refresca el token de autenticación
   * @returns Nueva respuesta con token actualizado
   */
  static async refreshToken(): Promise<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await fetch(`${api.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        this.clearSession();
        throw new Error(data.message || "Error al refrescar el token");
      }

      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      this.clearSession();
      throw error;
    }
  }
}