export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken?: string;
  user: User;
  message: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: AuthError | null;
}



/**
 * Slide individual del carrusel de login
 */
export interface CarouselSlide {
  id: string;
  component: React.ComponentType;
  duration?: number; // Duración en milisegundos (opcional)
}

/**
 * Configuración del carrusel
 */
export interface CarouselConfig {
  slides: CarouselSlide[];
  autoPlayInterval?: number; // Intervalo de auto-play en ms (default: 5000)
  showIndicators?: boolean; // Mostrar indicadores de navegación
  showControls?: boolean; // Mostrar controles prev/next
  pauseOnHover?: boolean; // Pausar al hacer hover
}