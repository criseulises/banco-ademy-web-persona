/**
 * Configuración del Carrusel de Login
 * 
 * Centraliza la configuración de todos los carruseles de la aplicación.
 * Facilita el mantenimiento y modificación de parámetros.
 */

export const carouselConfig = {
  /**
   * Configuración del carrusel de login
   */
  login: {
    // Intervalo de auto-play en milisegundos
    autoPlayInterval: 5000, // 5 segundos
    
    // Mostrar indicadores de navegación (puntos)
    showIndicators: true,
    
    // Mostrar controles de navegación (flechas)
    showControls: false,
    
    // Pausar auto-play al hacer hover
    pauseOnHover: true,
    
    // Duración de la transición en ms
    transitionDuration: 700,
    
    // Tipo de transición
    transitionEasing: "ease-in-out",
  },
  
  /**
   * Configuración de slides individuales
   */
  slides: {
    branchLocator: {
      id: "branch-locator",
      title: "Sucursales",
      enabled: true,
    },
    appDownload: {
      id: "app-download",
      title: "App Móvil",
      enabled: true,
    },
    credimejoras: {
      id: "credimejoras",
      title: "Credimejoras",
      enabled: false, // Deshabilitado por defecto
    },
  },
} as const;

export type CarouselConfig = typeof carouselConfig;