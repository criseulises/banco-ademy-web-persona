/**
 * Formatea una fecha a formato relativo en español
 * Ejemplo: "Hace 5 minutos", "Ayer", "24 de junio, 2025"
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  // Menos de 1 hora: "Hace X minutos"
  if (diffMins < 60) {
    if (diffMins < 1) return 'Justo ahora';
    return `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
  }

  // Menos de 24 horas: "Hace X horas"
  if (diffHours < 24) {
    return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  }

  // Ayer
  if (diffDays === 1) {
    return 'Ayer';
  }

  // Menos de 7 días: "Hace X días"
  if (diffDays < 7) {
    return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
  }

  // Más de 7 días: fecha formateada
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month}, ${year}`;
}

/**
 * Formatea una fecha a formato corto
 * Ejemplo: "07/02/2026"
 */
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
