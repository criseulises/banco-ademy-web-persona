/**
 * Configuración central de la aplicación
 */

export const appConfig = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
    timeout: 30000, // 30 segundos
  },

  // Auth Configuration
  auth: {
    tokenKey: "auth_token",
    refreshTokenKey: "refresh_token",
    tokenExpirationKey: "token_expiration",
  },

  // App Information
  app: {
    name: "Banco ADEMI",
    version: "1.0.0",
    description: "Portal de Clientes - Credimejoras",
  },

  // Routes
  routes: {
    public: {
      login: "/login",
      forgotPassword: "/forgot-password",
      resetPassword: "/reset-password",
    },
    private: {
      dashboard: "/dashboard",
      profile: "/profile",
      transactions: "/transactions",
      loans: "/loans",
    },
  },

  // Feature Flags
  features: {
    enableBiometrics: false,
    enableNotifications: true,
    enableChat: false,
  },
} as const;

export type AppConfig = typeof appConfig;